'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import { AGREEMENT_TERMS } from '@/lib/constants';

export default function AgreementDetailPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center space-x-3">
        <Link href="/admin/agreements" className="text-gray-500 hover:text-black">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900">Digital Agreement Audit Record</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Verification Banner */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <div>
              <div className="text-sm font-bold text-emerald-900">Legally Verified E-Signature Document</div>
              <div className="text-xs text-emerald-700">Digital footprint validated under Bangladesh IT laws.</div>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold">
            COMPLETED & ARCHIVED
          </span>
        </div>

        {/* Audit Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 block font-semibold">Signer Full Name</span>
            <span className="font-bold text-gray-900">Tanvir Hasan</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold">NID Number</span>
            <span className="font-bold text-gray-900 font-mono">19922692011234567</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold">Signing Timestamp</span>
            <span className="font-bold text-gray-900">2026-11-01 11:42:18 BST</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold">IP Address</span>
            <span className="font-bold text-gray-900 font-mono">103.239.252.14</span>
          </div>
        </div>

        {/* Signature Preview */}
        <div className="border border-gray-200 rounded-xl p-5 bg-white">
          <span className="text-xs font-bold uppercase text-gray-500 block mb-2">Stored Digital Signature Image</span>
          <div className="h-28 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center font-serif text-2xl italic text-gray-800">
            Tanvir Hasan (E-Signed)
          </div>
        </div>

        {/* Accepted Terms */}
        <div>
          <span className="text-xs font-bold uppercase text-gray-500 block mb-2">Acknowledged Legal Declarations</span>
          <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-2 max-h-48 overflow-y-auto">
            {AGREEMENT_TERMS.map((t, idx) => (
              <p key={idx}>{t}</p>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
