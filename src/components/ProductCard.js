import { useState, useEffect } from 'react';

export default function ProductCard({ product, onDelete }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (product.image) {
      if (product.image instanceof Blob || product.image instanceof File) {
        // If it's a Blob or File object (unlikely after localStorage), create object URL
        setImageUrl(URL.createObjectURL(product.image));
      } else if (typeof product.image === 'string' && product.image.startsWith('data:')) {
        // If it's a data URL (likely scenario after localStorage), use it directly
        setImageUrl(product.image);
      } else {
        // If it's neither, set to null or a placeholder
        setImageUrl(null);
      }
    }
  }, [product.image]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      {imageUrl && (
        <img 
          src={imageUrl}
          alt={product.title} 
          className="w-full h-65 object-cover mb-4 rounded"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2 overflow-hidden">{product.description}</p>
      <p className="text-lg font-bold mb-2">₹{product.price}</p>
      <div className="flex flex-col gap-2 text-sm text-gray-500">
        <div className="flex justify-between">
          <span>{product.category}</span>
          <span>{product.condition}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-medium">{product.college}</span>
          {onDelete && (
            <button 
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}