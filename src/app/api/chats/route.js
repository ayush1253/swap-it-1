import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Chat from '@/models/Chat';

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, participantId } = await request.json();

    if (!productId || !participantId) {
      return NextResponse.json(
        { error: 'Product ID and participant ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if a chat already exists between these participants for this product
    const existingChat = await Chat.findOne({
      productId,
      $or: [
        { participant1Id: userId, participant2Id: participantId },
        { participant1Id: participantId, participant2Id: userId },
      ],
    });

    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    // Create a new chat
    const chat = await Chat.create({
      productId,
      participant1Id: userId,
      participant2Id: participantId,
      messages: [],
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    await connectDB();

    // Build the query
    const query = {
      $or: [
        { participant1Id: userId },
        { participant2Id: userId },
      ],
    };

    // Add product filter if specified
    if (productId) {
      query.productId = productId;
    }

    // Get chats sorted by last message
    const chats = await Chat.find(query)
      .sort({ lastMessage: -1 })
      .populate('productId', 'title price image');

    return NextResponse.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
} 