import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Honda Used Bikes in Bangladesh | CB Hornet, X-Blade, SP 125',
  description: 'Certified second-hand Honda motorcycles in Dhaka. Best price on CB Hornet, X-Blade, Livo, Shine with verified ownership transfer.',
};

export default function HondaUsedBikesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest">Honda Hub</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Honda Used Bikes in Bangladesh</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Honda bikes are celebrated for bulletproof engine reliability and exceptional mileage. Bike Lover provides authentic used Honda bikes with official printed invoice and BRTA transfer support.
          </p>
          <div className="pt-4">
            <Link
              href="/brand/honda"
              className="inline-flex items-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm"
            >
              <span>Explore Available Honda Bikes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
