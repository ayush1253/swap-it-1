import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    await connectDB();

    // Build search query
    const searchQuery = {
      status: 'active',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { college: { $regex: query, $options: 'i' } }
      ]
    };

    // Fetch products
    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .lean();

    // Serialize the products
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

    return NextResponse.json({ products: serializedProducts });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
} 