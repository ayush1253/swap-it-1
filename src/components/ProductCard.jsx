'use client';

import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, GraduationCap, Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement favorite functionality
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors duration-300">
        <div className="relative h-48 w-full group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 z-10"
          >
            {product.condition}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 z-10 text-white hover:text-red-500 hover:bg-white/90"
            onClick={handleFavorite}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-900"
                }`}
              />
            )}
          </Button>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full">
                <Package className="h-4 w-4" />
                <span>{product.category}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full">
                <GraduationCap className="h-4 w-4" />
                <span>{product.college}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full hover:scale-[1.02] transition-transform">
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Seller</DialogTitle>
                <DialogDescription>
                  Here are the seller's contact details to proceed with your purchase.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Seller Information</h4>
                  <p className="text-sm text-gray-600">Name: {product.sellerName}</p>
                  <p className="text-sm text-gray-600">Email: {product.email}</p>
                  <p className="text-sm text-gray-600">Phone: {product.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Product Details</h4>
                  <p className="text-sm text-gray-600">Title: {product.title}</p>
                  <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                  <p className="text-sm text-gray-600">Condition: {product.condition}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 