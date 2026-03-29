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
    let content = body?.content?.trim();
    
    if (!content) {
      return NextResponse.json({ error: 'Missing content field' }, { status: 400 });
    }

    // 4. RATE LIMITING (Prevent spam)
    // Rule: api-security (Max 10 messages / minute / user)
    const rateLimitCheck = await sql`
      SELECT count(*) as count 
      FROM messages 
      WHERE user_id = ${userId} 
      AND created_at > now() - interval '1 minute'
    `;

    if (parseInt(rateLimitCheck[0].count) >= 10) {
      return NextResponse.json({ 
        error: 'Too many messages. Please wait a minute before sending more.' 
      }, { status: 429 });
    }

    // 5. XSS SANITIZATION (Basic HTML escaping)
    // Rule: frontend-security (Protect against script injection)
    content = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    if (content.length > 1500) {
      return NextResponse.json({ error: 'Content too long' }, { status: 400 });
    }

    // 6. INSERT VERIFIED DATA INTO DATABASE
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
