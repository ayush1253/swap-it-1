'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProductForm() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    college: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setProduct({ ...product, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate all required fields
      if (!product.title || !product.description || !product.price || !product.category || !product.condition || !product.college || !product.image) {
        throw new Error('Please fill in all required fields');
      }

      // Convert image to data URL
      let imageUrl = null;
      if (product.image instanceof File) {
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(product.image);
        });
      }

      // Create product data
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      console.log('Sending product data:', productData); // Debug log

      // Send to API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload product');
      }

      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error('Upload error:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[50vh]">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="college" className="block mb-1">College</label>
        <select
          id="college"
          name="college"
          value={product.college}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select your college</option>
          <option value="Lokmanya Tilak College of Engineering and Technology">Lokmanya Tilak College of Engineering and Technology</option>
          <option value="SIES">SIES</option>
          <option value="Datta Meghe">Datta Meghe</option>
          <option value="K.J.Somaiya">K.J.Somaiya</option>
          <option value="V.J.T.I">V.J.T.I</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block mb-1">Category</label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          <option value="books">Books</option>
          <option value="stationery">Stationery</option>
          <option value="academic">Academic Material</option>
        </select>
      </div>

      <div>
        <label htmlFor="condition" className="block mb-1">Condition</label>
        <select
          id="condition"
          name="condition"
          value={product.condition}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select condition</option>
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block mb-1">Product Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
          accept="image/*"
          required
        />
      </div>

      <button 
        type="submit" 
        className="flex flex-1 item-center justify-center bg-black text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Product'}
      </button>
    </form>
  );
}