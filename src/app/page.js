'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/redux/productSlice';


// Utility function to slugify product titles
function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function HomePage() {

  // get products from redux store
  // const products = useSelector((state) => state.products);
  // const [search, setSearch] = useState('');
  // const [category, setCategory] = useState('');


  //get products from dummyjson api
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const { items, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;


  // fetch products from dummyjson api
  // const [products, setProducts] = useState([]);
  // const [search, setSearch] = useState('');
  // const [category, setCategory] = useState('');
  // useEffect(() => {
  //   fetch('https://dummyjson.com/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data.products));
  // }, []);

  const categories = [...new Set(items.map(p => p.category))];

  const filtered = items.filter(p =>
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
            <Link href={`/product/${slugify(product.title)}?source=fetchData`}>
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
