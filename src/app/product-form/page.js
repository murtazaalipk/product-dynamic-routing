'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';


// Utility function to slugify product titles
function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ProductForm() {

 // get products from redux store
  const products = useSelector((state) => state.formProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

 
  const categories = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  return (
    <div>
      <h1>All Products</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <select onChange={e => setCategory(e.target.value)} defaultValue="">
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filtered.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', margin: 10, padding: 10, width: 200 }}>
            <Link href={`/product/${slugify(product.title)}?source=formData`}>
              <img src={product.images} width="100%" />
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
