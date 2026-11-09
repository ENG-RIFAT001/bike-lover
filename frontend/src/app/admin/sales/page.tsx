'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Printer, FileText, Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminSalesPage() {
  const [sales, setSales] = useState([
    {
      id: 'TXN-20261101-102',
      customer: 'Tanvir Hasan',
      mobile: '+8801711223344',
      bike: 'Yamaha YZF R15 V3 (2022)',
      reg: 'Dhaka Metro LA-45-8910',
      purchasePrice: 380000,
      salePrice: 425000,
      profit: 45000,
      date: '2026-11-01',
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'PAID',
    },
    {
      id: 'TXN-20261031-098',
      customer: 'Rakibul Islam',
      mobile: '+8801822334455',
      bike: 'Suzuki Gixxer SF Fi Disc (2022)',
      reg: 'Dhaka Metro LA-99-4321',
      purchasePrice: 210000,
      salePrice: 238000,
      profit: 28000,
      date: '2026-10-31',
      paymentMethod: 'CASH',
      paymentStatus: 'PAID',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Sales Transactions & Invoicing</h1>
          <p className="text-xs text-gray-500">Every motorcycle sale automatically calculates net profit margin and generates official pad invoices.</p>
        </div>
        <Link
          href="/admin/sales/new"
          className="inline-flex items-center space-x-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Motorcycle Sale</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Invoice / Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Buyer Customer</th>
                <th className="py-3 px-4">Motorcycle Details</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Net Profit</th>
                <th className="py-3 px-4 text-right">Official Pad Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{sale.id}</td>
                  <td className="py-3.5 px-4">{sale.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{sale.customer}</div>
                    <div className="text-[10px] text-gray-400">{sale.mobile}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{sale.bike}</div>
                    <div className="text-[10px] text-gray-400">{sale.reg}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-semibold">{formatCurrency(sale.purchasePrice)}</td>
                  <td className="py-3.5 px-4 font-black text-gray-950">{formatCurrency(sale.salePrice)}</td>
                  <td className="py-3.5 px-4 font-black text-emerald-600">+{formatCurrency(sale.profit)}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/admin/pad-print?txn=${sale.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#DC2626] transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Pad Invoice</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
