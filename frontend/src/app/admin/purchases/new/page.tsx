'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function NewPurchasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerMobile: '',
    sellerNid: '',
    brand: 'Yamaha',
    model: '',
    year: 2022,
    color: 'Black',
    chassisNumber: '',
    engineNumber: '',
    registrationNumber: '',
    purchasePrice: '',
    salePriceExpected: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/purchases');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Purchase Motorcycle From Seller</h1>
        <p className="text-xs text-gray-500">Record seller information and add motorcycle directly to showroom inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <h3 className="font-bold text-sm text-[#DC2626] uppercase tracking-wider">Seller Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Seller Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kamrul Islam"
              value={formData.sellerName}
              onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mobile Contact</label>
            <input
              type="text"
              required
              placeholder="+88017xxxxxxxx"
              value={formData.sellerMobile}
              onChange={(e) => setFormData({ ...formData, sellerMobile: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Seller NID Number</label>
            <input
              type="text"
              required
              placeholder="10/17 digit NID"
              value={formData.sellerNid}
              onChange={(e) => setFormData({ ...formData, sellerNid: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>
        </div>

        <h3 className="font-bold text-sm text-[#DC2626] uppercase tracking-wider pt-3 border-t">Motorcycle Specs & Financials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Brand & Model</label>
            <input
              type="text"
              required
              placeholder="e.g. Honda CB Hornet"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Chassis Number</label>
            <input
              type="text"
              required
              placeholder="Full chassis stamp"
              value={formData.chassisNumber}
              onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Engine Number</label>
            <input
              type="text"
              required
              placeholder="Full engine stamp"
              value={formData.engineNumber}
              onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Purchase Price Paid (BDT)</label>
            <input
              type="number"
              required
              placeholder="Amount paid to seller"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold"
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
          >
            Confirm Purchase & Stock Motorcycle
          </button>
        </div>

      </form>
    </div>
  );
}
