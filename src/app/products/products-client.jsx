'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

export default function ProductsClient({ initialProducts, userId }) {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}&limit=12`);
      const data = await response.json();
      
      if (data.products) {
        setProducts(prev => [...prev, ...data.products]);
        setFilteredProducts(prev => [...prev, ...data.products]);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const searchTerm = query.toLowerCase();
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.condition) {
      filtered = filtered.filter(product => 
        product.condition.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        }
        return product.price >= min;
      });
    }

    if (filters.college) {
      filtered = filtered.filter(product => 
        product.college.toLowerCase() === filters.college.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground mt-1">Browse through our collection of items</p>
          </div>
          {userId && (
            <Button asChild>
              <a href="/upload">Upload Product</a>
            </Button>
          )}
        </div>

        {/* Search and Filter Section */}
        <ProductFilters onSearch={handleSearch} onFilter={handleFilter} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
} 