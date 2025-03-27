'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Trash2, Edit } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function UserProducts() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?userId=${user?.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch products');
        }

        // Ensure data.products is an array
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProducts();
    }
  }, [user?.id]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Update the products list after successful deletion
      setProducts(prevProducts => 
        prevProducts.filter(product => product._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">You haven&apos;t uploaded any products yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product._id} className="p-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(product._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
              >
                <a href={`/products/${product._id}/edit`}>
                  <Edit className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 