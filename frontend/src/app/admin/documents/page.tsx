'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Printer, Download, Eye } from 'lucide-react';

export default function AdminDocumentsPage() {
  const docs = [
    { id: 'doc-1', title: 'Sale Invoice - Yamaha R15 V3', type: 'SALE_INVOICE', ref: 'TXN-20261101-102', customer: 'Tanvir Hasan', date: '2026-11-01' },
    { id: 'doc-2', title: 'Legal Agreement - Yamaha R15 V3', type: 'CUSTOMER_AGREEMENT', ref: 'AGR-20261101-001', customer: 'Tanvir Hasan', date: '2026-11-01' },
    { id: 'doc-3', title: 'Purchase Release Voucher - Honda Hornet', type: 'PURCHASE_INVOICE', ref: 'TXN-20261101-101', customer: 'Kamrul Islam', date: '2026-11-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Official Pad & Document Center</h1>
        <p className="text-xs text-gray-500">Every customer agreement, purchase voucher and sales invoice printed on company letterhead.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Document Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Reference No</th>
              <th className="py-3 px-4">Party Name</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {docs.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="py-3.5 px-4 font-bold text-gray-900">{d.title}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800">
                    {d.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono">{d.ref}</td>
                <td className="py-3.5 px-4 font-medium">{d.customer}</td>
                <td className="py-3.5 px-4">{d.date}</td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <Link
                    href={`/admin/pad-print?txn=${d.ref}`}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-[#111827] text-white hover:bg-[#DC2626] rounded-lg text-xs font-bold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Pad</span>
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
