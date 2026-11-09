'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';

export default function NewSalePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerId: 'c1',
    bikeId: '1',
    salePrice: 425000,
    costPrice: 380000,
    paymentMethod: 'CASH',
    notes: 'Sold on official company pad with 100% genuine papers verified.',
  });

  const profit = Number(formData.salePrice) - Number(formData.costPrice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transactions', {
        type: 'SALE',
        bikeId: formData.bikeId,
        customerId: formData.customerId,
        amount: formData.salePrice,
        salePrice: formData.salePrice,
        purchasePrice: formData.costPrice,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        generatePdf: true,
      });
      router.push('/admin/sales');
    } catch {
      router.push('/admin/sales');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Execute Motorcycle Sale</h1>
        <p className="text-xs text-gray-500">Completing this transaction updates inventory to SOLD and generates official pad invoice.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <div>
          <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Select Buyer Customer</label>
          <select
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
          >
            <option value="c1">Tanvir Hasan (+8801711223344) - NID: 19922692011234567</option>
            <option value="c2">Rakibul Islam (+8801822334455) - NID: 19892691098765432</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Select Available Motorcycle</label>
          <select
            value={formData.bikeId}
            onChange={(e) => setFormData({ ...formData, bikeId: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
          >
            <option value="1">Yamaha YZF R15 V3 (2022) - Cost: ৳ 380,000</option>
            <option value="2">Yamaha FZS V3 (2023) - Cost: ৳ 215,000</option>
            <option value="4">Suzuki Gixxer SF Fi (2022) - Cost: ৳ 210,000</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Actual Selling Price (BDT)</label>
            <input
              type="number"
              required
              value={formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            >
              <option value="CASH">Cash Payment</option>
              <option value="BANK_TRANSFER">Bank Transfer / Cheque</option>
              <option value="BKASH_NAGAD">bKash / Nagad</option>
            </select>
          </div>
        </div>

        {/* Real-time Profit Preview */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase">Estimated Net Profit Margin</div>
            <div className="text-xs text-emerald-600">Sale Price (৳ {formData.salePrice.toLocaleString()}) minus Purchase Cost (৳ {formData.costPrice.toLocaleString()})</div>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            +{formatCurrency(profit)}
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
            Confirm Sale & Generate Pad Invoice
          </button>
        </div>

      </form>
    </div>
  );
}
