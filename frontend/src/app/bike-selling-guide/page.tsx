import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Sell Your Motorcycle in Dhaka | Instant Cash & Transfer at Bike Lover',
  description: 'Sell your bike in 30 minutes at Japani Bazar, Sonir Akhra showroom. Instant cash payment, safe legal documentation, hassle-free transfer.',
};

export default function BikeSellingGuidePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">Instant Selling</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            Sell or Exchange Your Motorcycle in 30 Minutes
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tired of endless online bargaining and unsafe meetings? Bring your bike to <strong>Bike Lover</strong> at Sonir Akhra, Dhaka for fair evaluation and immediate bank/cash settlement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-black text-2xl text-[#DC2626]">01</div>
              <div className="font-bold text-sm text-gray-900 mt-1">Bring to Showroom</div>
              <div className="text-xs text-gray-500 mt-1">Japani Bazar, Sonir Akhra</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-black text-2xl text-[#DC2626]">02</div>
              <div className="font-bold text-sm text-gray-900 mt-1">15-Min Evaluation</div>
              <div className="text-xs text-gray-500 mt-1">Fair market price offered</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="font-black text-2xl text-[#DC2626]">03</div>
              <div className="font-bold text-sm text-gray-900 mt-1">Instant Cash & Pad Voucher</div>
              <div className="text-xs text-gray-500 mt-1">Signed purchase release</div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center justify-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call For Bike Valuation</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Photos on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
