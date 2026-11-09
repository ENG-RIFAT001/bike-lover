import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Used Bikes Bangladesh | Second Hand Motorcycle Marketplace Dhaka',
  description: 'Buy and sell used motorcycles safely in Bangladesh. Transparent pricing, physical inspection, legal digital agreement, and BRTA paper transfer.',
};

export default function UsedBikesBangladeshPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-widest">National Marketplace</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Certified Used Bikes in Bangladesh
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Buying a used motorcycle in Bangladesh often comes with risks of fraudulent documents, tampered odometers, or unrecorded mechanical issues. <strong>Bike Lover</strong> provides a trusted, legally verified dealership experience in Dhaka.
          </p>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-start space-x-3 text-sm text-gray-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>100% Legal Guarantee:</strong> All chassis and engine numbers verified with BRTA records.</span>
            </div>
            <div className="flex items-start space-x-3 text-sm text-gray-700">
              <FileCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Digital E-Signatures:</strong> Automated, legally compliant digital agreements sent to your phone.</span>
            </div>
            <div className="flex items-start space-x-3 text-sm text-gray-700">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Official Pad Invoice:</strong> Every transaction printed on official company letterhead with showroom seal.</span>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/bikes"
              className="inline-flex items-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-sm"
            >
              <span>Explore All Certified Bikes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
