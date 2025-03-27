import { currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import ProductsClient from './products-client';

export default async function ProductsPage() {
  const user = await currentUser();
  const userId = user?.id;
  
  await connectDB();
  const products = await Product.find({ status: 'active' })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  // Serialize the products to plain objects
  const serializedProducts = products.map(product => ({
    _id: product._id.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    condition: product.condition,
    college: product.college,
    image: product.image,
    userId: product.userId,
    status: product.status,
    views: product.views,
    favorites: product.favorites,
    location: product.location,
    contact: product.contact,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return <ProductsClient initialProducts={serializedProducts} userId={userId} />;
}