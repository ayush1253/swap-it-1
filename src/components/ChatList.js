import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Package, User } from 'lucide-react';

export default function ChatList() {
  const { user } = useUser();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!chats.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <MessageSquare className="h-12 w-12 text-gray-400" />
        <p className="text-gray-500">No messages yet</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {chats.map((chat) => {
              const otherParticipantId = chat.participant1Id === user.id ? chat.participant2Id : chat.participant1Id;
              const lastMessage = chat.messages[chat.messages.length - 1];
              const unreadCount = chat.messages.filter(
                (m) => !m.read && m.senderId !== user.id
              ).length;

              return (
                <Button
                  key={chat._id}
                  variant="ghost"
                  className="w-full justify-start space-x-4 p-4 h-auto"
                  onClick={() => router.push(`/chats/${chat._id}`)}
                >
                  <div className="relative">
                    <User className="h-8 w-8" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">User {otherParticipantId}</p>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Package className="h-4 w-4" />
                      <span className="truncate">{chat.productId.title}</span>
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 