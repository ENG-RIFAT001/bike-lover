import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Yamaha Used Bikes in Bangladesh | R15, FZS, MT-15 at Bike Lover',
  description: 'Buy certified second-hand Yamaha bikes in Dhaka: R15 V3, R15 V4, FZS V3, FZ-X, MT-15. Verified papers, transparent digital agreement, showroom at Sonir Akhra.',
};

export default function YamahaUsedBikesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest">SEO Dedicated Hub</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Yamaha Used Bikes in Bangladesh
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Yamaha is the leading brand for performance, durability, and premium road presence in Bangladesh. At <strong>Bike Lover</strong>, we stock carefully selected, physically inspected Yamaha motorcycles with original papers and genuine mileage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-gray-900">Yamaha R15 Series (V3 & V4)</h3>
              <p className="text-xs text-gray-500 mt-1">Dual Channel ABS, VVA Engine, Track Performance.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="font-bold text-gray-900">Yamaha FZS Series (V2, V3 & V4)</h3>
              <p className="text-xs text-gray-500 mt-1">Comfortable commuter, fuel efficient Fi engine with ABS.</p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/brand/yamaha"
              className="inline-flex items-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm"
            >
              <span>Browse All Yamaha Bikes in Stock</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
