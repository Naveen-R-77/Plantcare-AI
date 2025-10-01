import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = new ObjectId(decoded.userId);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 401 });
    }

    // Get database connection
    const db = await getDatabase();
    const messagesCollection = db.collection('chat_messages');

    // Clear all messages for this user
    await messagesCollection.deleteMany({ userId: userId });

    console.log(`Chat history cleared for user: ${userId}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Chat history cleared successfully' 
    });

  } catch (error) {
    console.error('Error clearing chat history:', error);
    return NextResponse.json(
      { error: 'Failed to clear chat history' },
      { status: 500 }
    );
  }
}
