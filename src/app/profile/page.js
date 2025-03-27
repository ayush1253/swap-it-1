'use client';

import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserProducts from '@/components/UserProducts';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.fullName} />
          <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user.fullName}</h1>
        <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card className="p-6">
            <UserProducts />
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card className="p-6">
            <p className="text-center text-gray-600">Your favorite products will appear here.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="p-6">
            <p className="text-center text-gray-600">Profile settings will be available soon.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 