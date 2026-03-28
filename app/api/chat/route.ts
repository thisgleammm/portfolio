import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Initialize the Neon database connection
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // 1. Create table if it doesn't exist
    // Note: We normally do this via migrations, but for simplicity here we ensure the table exists.
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(100) NOT NULL,
        user_name VARCHAR(100) NOT NULL,
        user_image TEXT,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Fetch the 100 most recent messages, ordered chronologically
    const messages = await sql`
      SELECT 
        id, 
        user_id as "userId", 
        user_name as "userName", 
        user_image as "userImage", 
        content, 
        created_at as "timestamp"
      FROM (
        SELECT * FROM messages ORDER BY created_at DESC LIMIT 100
      ) sub
      ORDER BY created_at ASC;
    `;
    
    return NextResponse.json(messages);
  } catch (err) {
    console.error('Error fetching chat history:', err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.userId || !body.content || !body.userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the new message and return the record
    const result = await sql`
      INSERT INTO messages (user_id, user_name, user_image, content)
      VALUES (${body.userId}, ${body.userName}, ${body.userImage || ''}, ${body.content})
      RETURNING 
        id, 
        user_id as "userId", 
        user_name as "userName", 
        user_image as "userImage", 
        content, 
        created_at as "timestamp";
    `;

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error('Error sending message:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
