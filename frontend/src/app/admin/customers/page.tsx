'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Eye, Phone, UserCheck, Shield } from 'lucide-react';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 'c1',
      fullName: 'Tanvir Hasan',
      mobile: '+8801711223344',
      email: 'tanvir@gmail.com',
      nidNumber: '19922692011234567',
      drivingLicenseNumber: 'DK-092831',
      presentAddress: 'House 12, Road 4, Shantinagar, Dhaka',
      purchasesCount: 1,
      createdAt: '2026-10-15',
    },
    {
      id: 'c2',
      fullName: 'Rakibul Islam',
      mobile: '+8801822334455',
      email: 'rakib@gmail.com',
      nidNumber: '19892691098765432',
      drivingLicenseNumber: 'DK-114422',
      presentAddress: 'Japani Bazar, Sonir Akhra, Dhaka',
      purchasesCount: 1,
      createdAt: '2026-10-20',
    },
    {
      id: 'c3',
      fullName: 'Kamrul Islam (Seller)',
      mobile: '+8801933445566',
      email: 'kamrul@yahoo.com',
      nidNumber: '19852693044556677',
      drivingLicenseNumber: 'N/A',
      presentAddress: 'Dania, Jatrabari, Dhaka',
      purchasesCount: 0,
      createdAt: '2026-10-28',
    },
  ]);

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.nidNumber.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Customer & Client Database</h1>
          <p className="text-xs text-gray-500">Verified NID, Driving License, Contact, and Transaction Records.</p>
        </div>
        <Link
          href="/admin/customers/add"
          className="inline-flex items-center space-x-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Customer</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, mobile, NID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          />
        </div>
        <span className="text-xs text-gray-500">{filtered.length} customers found</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">NID / Smart Card</th>
                <th className="py-3 px-4">Driving License</th>
                <th className="py-3 px-4">Present Address</th>
                <th className="py-3 px-4">Deals</th>
                <th className="py-3 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{c.fullName}</td>
                  <td className="py-3.5 px-4">
                    <div>{c.mobile}</div>
                    <div className="text-[10px] text-gray-400">{c.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-700">{c.nidNumber}</td>
                  <td className="py-3.5 px-4 text-gray-600">{c.drivingLicenseNumber}</td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{c.presentAddress}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      {c.purchasesCount} deals
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/customers/${c.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-[#111827] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>History</span>
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
