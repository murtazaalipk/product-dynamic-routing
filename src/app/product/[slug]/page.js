'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ProductDetail() {
const products = useSelector((state) => state.products);
  const { slug } = useParams();

  // Find product by matching slugified title
  const product = products.find(p => slugify(p.title) === slug);

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }

 // const { id } = useParams();
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products`)
  //     .then(res => res.json())
  //     .then(data => {
  //       const withSlugs = data.products.map(p => ({
  //         ...p,
  //         slug: slugify(p.title)
  //       }))
  //       const found = withSlugs.find(p => p.slug === slug);
  //       setProduct(found);
  //     });

  // }, [slug]);

  // if (!product) return <p>Loading...</p>;

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
