'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ProductDetail() {

  const { slug } = useParams();

 // const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then(res => res.json())
      .then(data => {
        const withSlugs = data.products.map(p => ({
          ...p,
          slug: slugify(p.title)
        }))
        const found = withSlugs.find(p => p.slug === slug);
        setProduct(found);
      });

  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} width="300" />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}
