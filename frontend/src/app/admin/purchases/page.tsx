'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Printer } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminPurchasesPage() {
  const purchases = [
    {
      id: 'TXN-20261101-101',
      seller: 'Kamrul Islam',
      mobile: '+8801933445566',
      bike: 'Honda CB Hornet 160R CBS (2021)',
      chassis: 'ME1RG5566778',
      amount: 145000,
      date: '2026-11-01',
      status: 'ACQUIRED',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Motorcycle Purchases (Inbound Stock)</h1>
          <p className="text-xs text-gray-500">Record bikes acquired from sellers with purchase release voucher.</p>
        </div>
        <Link
          href="/admin/purchases/new"
          className="inline-flex items-center space-x-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Bike Purchase</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Voucher ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Seller Name</th>
              <th className="py-3 px-4">Motorcycle Acquired</th>
              <th className="py-3 px-4">Purchase Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {purchases.map((p) => (
              <tr key={p.id}>
                <td className="py-3.5 px-4 font-bold text-gray-900">{p.id}</td>
                <td className="py-3.5 px-4">{p.date}</td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-gray-900">{p.seller}</div>
                  <div className="text-[10px] text-gray-400">{p.mobile}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-800">{p.bike}</td>
                <td className="py-3.5 px-4 font-black text-gray-900">{formatCurrency(p.amount)}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-blue-100 text-blue-800">
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/admin/pad-print?txn=${p.id}&type=PURCHASE`}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#DC2626]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Pad Voucher</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
