import React from 'react';
import Link from 'next/link';
import { BIKE_BRANDS } from '@/lib/constants';

export default function BrandSection() {
  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Popular Brands</h2>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Explore By Top Manufacturers</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
          {BIKE_BRANDS.slice(0, 6).map((brand) => (
            <Link
              key={brand}
              href={`/brand/${brand.toLowerCase()}`}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#DC2626] hover:shadow-md transition-all group flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-800 font-black flex items-center justify-center text-sm group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                {brand.slice(0, 2).toUpperCase()}
              </div>
              <span className="mt-3 font-bold text-gray-900 group-hover:text-[#DC2626] text-sm">
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
