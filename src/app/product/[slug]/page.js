'use client';
import { useParams, useSearchParams , useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

function slugify(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function ProductDetail() {
  const { items, loading, error } = useSelector((state) => state.products);
  const router = useRouter();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  if (source === 'formData') {
    const products = useSelector((state) => state.formProducts);
    const product = products.find((p) => slugify(p.title) === slug);
    if (!product) {
      return <p className="text-center mt-10 text-red-500">Product not found.</p>;
    }
    return (
      <div className=" max-w-96 mx-auto p-6 mt-10 bg-white rounded-lg shadow">
        {/* Return Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Return
        </button>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.title}</h1>
        <img
          src={product.images}
          alt={product.title}
          width="300"
          className="w-full h-auto rounded mb-4"
        />
        <p className="text-lg font-semibold text-green-600 mb-1">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-gray-700">{product.description}</p>
      </div>
    );
  }

  const product = items.find((p) => slugify(p.title) === slug);

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }
  if (loading) return <p className="text-center mt-10 text-blue-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className=" max-w-96 mx-auto p-6 mt-10 bg-white rounded-lg shadow">
      {/* Return Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Return
        </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.title}</h1>
      <img
        src={product.images}
        alt={product.title}
        width="300"
        className="w-full h-auto rounded mb-4"
      />
      <p className="text-lg font-semibold text-green-600 mb-1">
        <strong>Price:</strong> ${product.price}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
