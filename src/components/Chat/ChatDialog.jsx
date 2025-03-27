'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/Nav/icons';
import ChatWindow from './ChatWindow';

export default function ChatDialog({ productId, sellerId }) {
  const { user } = useUser();
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && sellerId) {
      fetchOrCreateChat();
    }
  }, [user, sellerId]);

  const fetchOrCreateChat = async () => {
    try {
      setLoading(true);
      setError('');

      // First, try to find an existing chat
      const response = await fetch(`/api/chats?productId=${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }

      const chats = await response.json();
      const existingChat = chats.find(
        (chat) =>
          (chat.participant1Id === user.id && chat.participant2Id === sellerId) ||
          (chat.participant1Id === sellerId && chat.participant2Id === user.id)
      );

      if (existingChat) {
        setChatId(existingChat._id);
        return;
      }

      // If no existing chat, create a new one
      const createResponse = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          participantId: sellerId,
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create chat');
      }

      const newChat = await createResponse.json();
      setChatId(newChat._id);
    } catch (error) {
      console.error('Error handling chat:', error);
      setError('Failed to start chat');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Button disabled>
        <Icons.messageSquare className="mr-2 h-4 w-4" />
        Sign in to chat
      </Button>
    );
  }

  if (user.id === sellerId) {
    return null; // Don't show chat button for product owner
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.messageSquare className="mr-2 h-4 w-4" />
          Chat with seller
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chat about this product</DialogTitle>
        </DialogHeader>
        {error ? (
          <div className="p-4 bg-red-50 text-red-500 text-sm">
            {error}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-8">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        ) : chatId ? (
          <ChatWindow
            chatId={chatId}
            productId={productId}
            otherUserId={sellerId}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 