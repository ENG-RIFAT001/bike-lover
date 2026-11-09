'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Phone, Mail, MapPin, FileText, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function CustomerProfilePage() {
  const customer = {
    fullName: 'Tanvir Hasan',
    fatherName: 'Late M. A. Hasan',
    motherName: 'Rokeya Begum',
    dateOfBirth: '1992-05-14',
    mobile: '+8801711223344',
    email: 'tanvir.hasan@gmail.com',
    nidNumber: '19922692011234567',
    drivingLicenseNumber: 'DK-092831/2021',
    presentAddress: 'Flat 4B, House 12, Road 4, Shantinagar, Dhaka-1217',
    permanentAddress: 'Village: Khilgaon, Thana: Daudkandi, Dist: Cumilla',
    transactions: [
      {
        id: 'TXN-20261101-102',
        type: 'SALE',
        date: '2026-11-01',
        bike: 'Yamaha YZF R15 V3 Dual ABS (2022)',
        chassis: 'ME1RG4512399',
        amount: 425000,
        agreementStatus: 'SIGNED',
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex items-center space-x-3">
        <Link href="/admin/customers" className="text-gray-500 hover:text-black">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900">Customer Lifetime History</h1>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#111827] text-white flex items-center justify-center font-black text-xl">
              TH
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{customer.fullName}</h2>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <span>NID: <strong className="font-mono">{customer.nidNumber}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">✓ Verified Client</span>
              </div>
            </div>
          </div>
          <Link
            href={`/admin/sales/new?customerId=c1`}
            className="px-4 py-2 bg-[#DC2626] text-white font-bold rounded-xl text-xs shadow-md text-center"
          >
            Create New Sale
          </Link>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-gray-400 uppercase font-semibold">Mobile Number</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.mobile}</div>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold">Email</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.email}</div>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold">Driving License</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5 font-mono">{customer.drivingLicenseNumber}</div>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold">Father's Name</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.fatherName}</div>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold">Mother's Name</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.motherName}</div>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold">Date of Birth</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.dateOfBirth}</div>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 uppercase font-semibold">Present Address</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.presentAddress}</div>
          </div>
          <div className="sm:col-span-1">
            <span className="text-gray-400 uppercase font-semibold">Permanent Address</span>
            <div className="font-bold text-gray-900 text-sm mt-0.5">{customer.permanentAddress}</div>
          </div>
        </div>
      </div>

      {/* Transaction & Agreement Records */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-base text-gray-900">Motorcycle Deals & Signed Agreements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4">Transaction ID</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Motorcycle Model</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Digital Agreement</th>
                <th className="py-2.5 px-4 text-right">Official Pad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customer.transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-3 px-4 font-bold text-gray-900">{tx.id}</td>
                  <td className="py-3 px-4">{tx.date}</td>
                  <td className="py-3 px-4 font-medium">{tx.bike}</td>
                  <td className="py-3 px-4 font-bold text-gray-950">{formatCurrency(tx.amount)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      ✓ {tx.agreementStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/pad-print?txn=${tx.id}`}
                      className="text-[#DC2626] font-bold hover:underline"
                    >
                      Print Pad Invoice
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
