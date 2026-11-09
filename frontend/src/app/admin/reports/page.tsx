'use client';

import React, { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('daily');

  const handleExportExcel = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/reports/export/excel`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dealership Analytics & Reports</h1>
          <p className="text-xs text-gray-500">Generate Daily, Monthly, Yearly Sales, Inventory & Profit & Loss statements.</p>
        </div>
        <button
          onClick={handleExportExcel}
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export All Transactions (Excel)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {['daily', 'monthly', 'yearly', 'inventory', 'pnl'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              reportType === tab
                ? 'border-[#DC2626] text-[#DC2626]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'pnl' ? 'Profit & Loss' : `${tab} Report`}
          </button>
        ))}
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase">Report Sales Volume</span>
          <div className="text-2xl font-black text-gray-900">{formatCurrency(1680000)}</div>
          <span className="text-[11px] text-emerald-600 font-medium">6 completed deliveries</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase">Stock Acquisition Cost</span>
          <div className="text-2xl font-black text-gray-900">{formatCurrency(1495000)}</div>
          <span className="text-[11px] text-gray-500 font-medium">Procurement outlay</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase">Net Gross Profit</span>
          <div className="text-2xl font-black text-[#DC2626]">+{formatCurrency(185000)}</div>
          <span className="text-[11px] text-red-600 font-medium">11.01% average margin</span>
        </div>
      </div>

      {/* Report Records Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-gray-900">Period Transaction Breakdown</h3>
          <span className="text-xs text-gray-400">Date: {new Date().toLocaleDateString('en-GB')}</span>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase border-b border-gray-200">
            <tr>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Ref ID</th>
              <th className="py-2.5 px-4">Customer</th>
              <th className="py-2.5 px-4">Motorcycle</th>
              <th className="py-2.5 px-4">Sale Amount</th>
              <th className="py-2.5 px-4">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-3 px-4">2026-11-01</td>
              <td className="py-3 px-4 font-bold">TXN-20261101-102</td>
              <td className="py-3 px-4">Tanvir Hasan</td>
              <td className="py-3 px-4">Yamaha R15 V3 (2022)</td>
              <td className="py-3 px-4 font-bold text-gray-900">{formatCurrency(425000)}</td>
              <td className="py-3 px-4 font-bold text-emerald-600">+{formatCurrency(45000)}</td>
            </tr>
            <tr>
              <td className="py-3 px-4">2026-10-31</td>
              <td className="py-3 px-4 font-bold">TXN-20261031-098</td>
              <td className="py-3 px-4">Rakibul Islam</td>
              <td className="py-3 px-4">Suzuki Gixxer SF Fi</td>
              <td className="py-3 px-4 font-bold text-gray-900">{formatCurrency(238000)}</td>
              <td className="py-3 px-4 font-bold text-emerald-600">+{formatCurrency(28000)}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
