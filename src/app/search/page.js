'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const selectedCollege = searchParams.get('college') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Build the API URL with query parameters
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (selectedCollege) params.append('college', selectedCollege);
        
        const response = await fetch(`/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        
        // Get unique colleges from the products
        const uniqueColleges = [...new Set(data.map(product => product.college))];
        setColleges(uniqueColleges);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, selectedCollege]);

  const handleCollegeChange = (e) => {
    const newCollege = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (newCollege) {
      params.set('college', newCollege);
    } else {
      params.delete('college');
    }
    router.push(`/search?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedCollege}
            onChange={handleCollegeChange}
            className="p-2 border rounded-md bg-white"
          >
            <option value="">All Colleges</option>
            {colleges.map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {products.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No products found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 