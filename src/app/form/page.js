'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/formSlice';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...form, price: parseFloat(form.price), images: [form.image] }));
    router.push('/product-form');
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4"
>
  <h2 className="text-2xl font-semibold text-center">Add Product</h2>

  <input
    name="title"
    value={form.title}
    onChange={handleChange}
    placeholder="Title"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    placeholder="Description"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    rows="4"
  />

  <input
    name="category"
    value={form.category}
    onChange={handleChange}
    placeholder="Category"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    name="price"
    type="number"
    value={form.price}
    onChange={handleChange}
    placeholder="Price"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    name="image"
    value={form.image}
    onChange={handleChange}
    placeholder="Image URL"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
  >
    Add Product
  </button>
</form>

  );
}
