import React from 'react';
import { notFound } from 'next/navigation';
import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import ChatDialog from '@/components/Chat/ChatDialog';

export default async function ProductPage({ params }) {
  const { userId } = getAuth();
  await connectDB();

  const product = await Product.findById(params.id);
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">
              ${product.price}
            </p>
            <div className="prose max-w-none mb-6">
              <p>{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-1">Category</h3>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Condition</h3>
                <p className="text-muted-foreground">{product.condition}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">College</h3>
                <p className="text-muted-foreground">{product.college}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">{product.location}</p>
              </div>
            </div>
            {userId && userId !== product.userId && (
              <ChatDialog
                productId={product._id}
                sellerId={product.userId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 