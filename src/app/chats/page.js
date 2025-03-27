import ChatList from '@/components/Chat/ChatList';

export default function ChatsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Conversations</h1>
        <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)]">
          <ChatList />
        </div>
      </div>
    </div>
  );
} 