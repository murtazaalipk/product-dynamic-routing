'use client';
import Link from 'next/link';

export default function Header({ page }) {
  const isHome = page === 'home';

  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          Redux State Management with Dynamic Routing
        </h1>

        <Link
          href={isHome ? '/form' : '/'}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          {isHome ? 'Go to Form' : 'Go to Home'}
        </Link>
      </div>
    </header>
  );
}
