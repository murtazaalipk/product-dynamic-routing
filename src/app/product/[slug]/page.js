'use client';
import { useParams , useSearchParams} from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ProductDetail() {
const { items, loading, error } = useSelector((state) => state.products)

  const { slug } = useParams();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

if (source === 'formData') {
  const products = useSelector((state) => state.formProducts);
  const product = products.find(p => slugify(p.title) === slug);
  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images} width="300" />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
    </div>
  );

}

  // Find product by matching slugified title
  const product = items.find(p => slugify(p.title) === slug);

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images} width="300" />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}
