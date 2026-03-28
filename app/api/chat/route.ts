import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { auth, currentUser } from '@clerk/nextjs/server';

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
    // 1. SERVER-SIDE AUTHENTICATION (Never trust client identity payload)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No valid session found' }, { status: 401 });
    }

    // 2. FETCH VERIFIED USER DATA FROM CLERK
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: User lookup failed' }, { status: 401 });
    }

    const verifiedUserName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous';
    const verifiedUserImage = user.imageUrl || '';

    // 3. PARSE & VALIDATE PAYLOAD
    const body = await req.json();
    const content = body?.content?.trim();
    
    if (!content) {
      return NextResponse.json({ error: 'Missing content field' }, { status: 400 });
    }

    if (content.length > 1500) {
      return NextResponse.json({ error: 'Content exceeds maximum allowed length of 1500 characters' }, { status: 400 });
    }

    // 4. INSERT VERIFIED DATA INTO DATABASE
    const result = await sql`
      INSERT INTO messages (user_id, user_name, user_image, content)
      VALUES (${userId}, ${verifiedUserName}, ${verifiedUserImage}, ${content})
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
