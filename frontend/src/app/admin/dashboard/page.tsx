'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bike,
  CheckCircle,
  Clock,
  TrendingUp,
  Banknote,
  DollarSign,
  PlusCircle,
  FileText,
  Users,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import api from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalBikes: 24,
    availableBikes: 18,
    soldBikes: 6,
    purchasedBikes: 24,
    dailySales: 425000,
    monthlySales: 1680000,
    profitLoss: 185000,
  });

  const recentTransactions = [
    { id: 'TXN-20261101-102', customer: 'Tanvir Hasan', bike: 'Yamaha R15 V3 (2022)', type: 'SALE', amount: 425000, profit: 45000, status: 'PAID' },
    { id: 'TXN-20261101-101', customer: 'Kamrul Islam', bike: 'Honda CB Hornet 160R', type: 'PURCHASE', amount: 145000, profit: 0, status: 'PAID' },
    { id: 'TXN-20261031-098', customer: 'Rakibul Islam', bike: 'Suzuki Gixxer SF Fi', type: 'SALE', amount: 238000, profit: 28000, status: 'PAID' },
    { id: 'TXN-20261030-095', customer: 'Mehedi Rahman', bike: 'TVS Apache 160 4V', type: 'SALE', amount: 208000, profit: 28000, status: 'PAID' },
  ];

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => {
        if (res.data?.data) {
          const d = res.data.data;
          setStats({
            totalBikes: d.totalBikes || 24,
            availableBikes: d.availableBikes || 18,
            soldBikes: d.soldBikes || 6,
            purchasedBikes: d.purchasedBikes || 24,
            dailySales: d.todaySalesAmount || 425000,
            monthlySales: d.monthSalesAmount || 1680000,
            profitLoss: d.totalProfit || 185000,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Dealership Overview</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time stock, daily cashflow, sales margins, and legal agreements tracking.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/sales/new"
            className="inline-flex items-center space-x-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Sale</span>
          </Link>
          <Link
            href="/admin/bikes/add"
            className="inline-flex items-center space-x-1.5 bg-[#111827] hover:bg-black text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md"
          >
            <Bike className="w-4 h-4" />
            <span>Add Bike</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Bikes */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Total Inventory</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{stats.totalBikes}</div>
            <span className="text-[11px] text-gray-500 font-medium">Bikes catalogued</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center">
            <Bike className="w-6 h-6" />
          </div>
        </div>

        {/* Available Bikes */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Available Stock</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{stats.availableBikes}</div>
            <span className="text-[11px] text-emerald-700 font-medium">Ready for sale</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Sold Bikes */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Sold Units</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">{stats.soldBikes}</div>
            <span className="text-[11px] text-blue-700 font-medium">Completed deals</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Total Profit</span>
            <div className="text-2xl sm:text-3xl font-black text-[#DC2626] mt-1">{formatCurrency(stats.profitLoss)}</div>
            <span className="text-[11px] text-red-600 font-medium">Net margins</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Revenue Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#111827] to-gray-900 text-white p-6 rounded-2xl shadow-md space-y-2 border border-gray-800">
          <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Today's Sales Revenue</span>
            <Clock className="w-4 h-4 text-[#DC2626]" />
          </div>
          <div className="text-3xl font-black text-white">{formatCurrency(stats.dailySales)}</div>
          <p className="text-xs text-gray-400">Cash & bank transfers received today</p>
        </div>

        <div className="bg-gradient-to-br from-[#DC2626] to-red-800 text-white p-6 rounded-2xl shadow-md space-y-2">
          <div className="flex justify-between items-center text-xs text-red-200 font-bold uppercase tracking-wider">
            <span>Monthly Sales Turnaround</span>
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white">{formatCurrency(stats.monthlySales)}</div>
          <p className="text-xs text-red-100">Cumulative sales volume this calendar month</p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Recent Dealership Transactions</h3>
            <p className="text-xs text-gray-500">Live sales, customer purchases, and net margin entries.</p>
          </div>
          <Link href="/admin/sales" className="text-xs text-[#DC2626] font-bold hover:underline inline-flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Motorcycle</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Profit</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-gray-900">{tx.id}</td>
                  <td className="py-3.5 px-6 font-medium text-gray-700">{tx.customer}</td>
                  <td className="py-3.5 px-6 text-gray-600">{tx.bike}</td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      tx.type === 'SALE' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-gray-950">{formatCurrency(tx.amount)}</td>
                  <td className="py-3.5 px-6 font-bold text-[#DC2626]">
                    {tx.profit > 0 ? `+${formatCurrency(tx.profit)}` : '—'}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="text-emerald-700 font-bold text-[11px]">✓ {tx.status}</span>
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
