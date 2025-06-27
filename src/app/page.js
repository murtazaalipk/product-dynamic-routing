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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Products Fetch From API</h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          defaultValue=""
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
          >
            <Link href={`/product/${slugify(product.title)}?source=fetchData`}>
              <img
                src={Array.isArray(product.images) ? product.images[0] : product.images}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            </Link>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
