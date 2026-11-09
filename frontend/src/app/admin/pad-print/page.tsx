'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Printer, ArrowLeft } from 'lucide-react';
import { BUSINESS_INFO, DEVELOPER_INFO, AGREEMENT_TERMS } from '@/lib/constants';

function PadPrintContent() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txn') || 'TXN-20261101-102';
  const type = searchParams.get('type') || 'SALE';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      
      {/* Print Controls (Hidden when printing) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex items-center justify-between no-print">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#DC2626] text-white rounded-xl text-sm font-bold shadow-md hover:bg-red-700 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print A4 Official Company Pad</span>
        </button>
      </div>

      {/* Official A4 Sheet */}
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-10 sm:p-14 border border-gray-300 min-h-[1050px] flex flex-col justify-between text-gray-900 font-sans print:shadow-none print:border-none print:p-8">
        
        <div>
          {/* Top Decorative Red Accent */}
          <div className="h-2 bg-[#DC2626] -mx-10 sm:-mx-14 -mt-10 sm:-mt-14 mb-8" />

          {/* OFFICIAL COMPANY PAD HEADER */}
          <div className="flex justify-between items-start border-b-2 border-[#DC2626] pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-black tracking-wider text-[#111827]">
                BIKE <span className="text-[#DC2626]">LOVER</span>
              </h1>
              <p className="text-xs font-semibold text-gray-600 mt-1">{BUSINESS_INFO.address}</p>
              <p className="text-[11px] text-gray-500">
                Phone: {BUSINESS_INFO.phone} | Email: {BUSINESS_INFO.email} | Web: {BUSINESS_INFO.website}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-[#111827] text-white px-4 py-1.5 rounded text-xs font-black uppercase tracking-wider">
                {type === 'SALE' ? 'OFFICIAL SALE INVOICE' : 'PURCHASE VOUCHER'}
              </div>
              <div className="text-[11px] font-mono text-gray-600 mt-2">
                REF: <strong>{txnId}</strong>
              </div>
              <div className="text-[11px] text-gray-500">
                Date: {new Date().toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>

          {/* Customer & Transaction Meta */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs mb-6">
            <div>
              <span className="text-gray-500 uppercase font-bold text-[10px] block">Customer / Party Info</span>
              <div className="font-bold text-sm text-gray-900 mt-0.5">Tanvir Hasan</div>
              <div className="text-gray-600">Mobile: +8801711223344</div>
              <div className="text-gray-600">NID: 19922692011234567</div>
              <div className="text-gray-600">Address: Shantinagar, Dhaka</div>
            </div>
            <div>
              <span className="text-gray-500 uppercase font-bold text-[10px] block">Dealership Terms</span>
              <div className="text-gray-600 mt-0.5">Payment Method: <strong>Bank Transfer / Cash</strong></div>
              <div className="text-gray-600">Payment Status: <strong className="text-emerald-700">PAID & SETTLED</strong></div>
              <div className="text-gray-600">Handover Location: <strong>Sonir Akhra Showroom</strong></div>
            </div>
          </div>

          {/* Item Specification Table */}
          <table className="w-full text-left text-xs mb-6 border border-gray-300">
            <thead className="bg-[#111827] text-white uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">SL</th>
                <th className="py-2.5 px-3">Motorcycle Description</th>
                <th className="py-2.5 px-3">Reg & Chassis No</th>
                <th className="py-2.5 px-3 text-right">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-3 font-bold align-top">01</td>
                <td className="py-4 px-3">
                  <div className="font-bold text-sm text-gray-900">Yamaha YZF R15 V3 Dual Channel ABS</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    Year: 2022 | Color: Racing Blue | Mileage: 12,500 km
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Engine No: G3J4E99238471
                  </div>
                </td>
                <td className="py-4 px-3 font-mono text-[11px]">
                  <div>Reg: <strong>Dhaka Metro LA-45-8910</strong></div>
                  <div>Chassis: ME1RG45123998124</div>
                </td>
                <td className="py-4 px-3 text-right font-black text-sm text-gray-900 align-top">
                  ৳ 425,000
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td colSpan={3} className="py-3 px-3 text-right uppercase text-[11px]">Net Total Payable:</td>
                <td className="py-3 px-3 text-right font-black text-base text-[#DC2626]">৳ 425,000</td>
              </tr>
            </tfoot>
          </table>

          {/* Terms Snippet */}
          <div className="text-[10px] text-gray-500 space-y-1 mb-8">
            <div className="font-bold text-gray-700 uppercase">Declaration:</div>
            <p>1. Buyer acknowledges physical test drive, engine verification, and document inspection prior to handover.</p>
            <p>2. Bike Lover provides genuine legal ownership transfer guarantee under Bangladesh Laws.</p>
          </div>
        </div>

        {/* BOTTOM AREA: Signatures, Seal Area, Developer Credit */}
        <div>
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-200 text-center text-xs mb-8">
            <div>
              <div className="border-t border-gray-400 w-36 mx-auto pt-1 font-bold text-gray-700">
                Customer Signature
              </div>
            </div>
            <div>
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full mx-auto flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Official Seal
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 w-36 mx-auto pt-1 font-bold text-gray-700">
                Authorized Signature
              </div>
              <div className="text-[10px] text-gray-400">Bike Lover Showroom</div>
            </div>
          </div>

          {/* MANDATORY DEVELOPER FOOTER */}
          <div className="pt-4 border-t border-gray-200 text-center text-[9px] text-gray-400 space-y-1">
            <div>
              © 2026 {BUSINESS_INFO.name}. All Rights Reserved. | {DEVELOPER_INFO.creditText} | {DEVELOPER_INFO.website}
            </div>
            <div>
              {DEVELOPER_INFO.copyrightNotice}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function PadPrintPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm font-bold">Loading print document...</div>}>
      <PadPrintContent />
    </Suspense>
  );
}
