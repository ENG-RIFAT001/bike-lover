'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Eye, CheckCircle, Clock, ExternalLink, Send } from 'lucide-react';

export default function AdminAgreementsPage() {
  const [agreements, setAgreements] = useState([
    {
      id: 'AGR-20261101-001',
      token: 'sec-tok-98214-tanvir',
      customer: 'Tanvir Hasan',
      mobile: '+8801711223344',
      bike: 'Yamaha YZF R15 V3 (2022)',
      status: 'SIGNED',
      signedAt: '2026-11-01 11:42 AM',
      ip: '103.239.252.14',
    },
    {
      id: 'AGR-20261031-002',
      token: 'sec-tok-11209-rakib',
      customer: 'Rakibul Islam',
      mobile: '+8801822334455',
      bike: 'Suzuki Gixxer SF Fi Disc',
      status: 'VIEWED',
      signedAt: 'Pending',
      ip: '103.145.118.90',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Digital Legal Agreements & E-Signatures</h1>
        <p className="text-xs text-gray-500">Track online agreement links, customer digital signatures, IP timestamps, and legal audit trails.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Agreement ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Vehicle Model</th>
              <th className="py-3 px-4">Signing Status</th>
              <th className="py-3 px-4">Timestamp & IP</th>
              <th className="py-3 px-4">Secure Link</th>
              <th className="py-3 px-4 text-right">View Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agreements.map((agr) => (
              <tr key={agr.id} className="hover:bg-gray-50">
                <td className="py-3.5 px-4 font-bold text-gray-900">{agr.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-gray-900">{agr.customer}</div>
                  <div className="text-[10px] text-gray-400">{agr.mobile}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-800">{agr.bike}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    agr.status === 'SIGNED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {agr.status === 'SIGNED' ? '✓ SIGNED' : '⏳ ' + agr.status}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-gray-900">{agr.signedAt}</div>
                  <div className="text-[10px] text-gray-400 font-mono">IP: {agr.ip}</div>
                </td>
                <td className="py-3.5 px-4">
                  <Link
                    href={`/agreement/${agr.token}`}
                    target="_blank"
                    className="inline-flex items-center space-x-1 text-[#DC2626] font-bold hover:underline"
                  >
                    <span>Sign Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/admin/agreements/${agr.id}`}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-[#111827] hover:text-white rounded-lg text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Audit Trail</span>
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
