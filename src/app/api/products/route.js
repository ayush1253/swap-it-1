import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log('Received data:', data); // Log the received data
    
    // Validate required fields
    if (!data.title || !data.description || !data.price || !data.category || !data.condition || !data.college || !data.image) {
      console.log('Missing required fields:', {
        title: !data.title,
        description: !data.description,
        price: !data.price,
        category: !data.category,
        condition: !data.condition,
        college: !data.college,
        image: !data.image
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const product = await Product.create(data);
    console.log('Created product:', product); // Log the created product
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error); // Log the full error
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const college = searchParams.get('college') || '';
    
    let filter = {};
    
    // Apply search query filter
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ];
    }
    
    // Apply college filter
    if (college) {
      filter.college = college;
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error); // Log the full error
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 