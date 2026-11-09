'use client';

import React, { useState } from 'react';
import { BUSINESS_INFO, DEVELOPER_INFO } from '@/lib/constants';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Showroom & Platform Settings</h1>
        <p className="text-xs text-gray-500">Official company contact, address, developer credit and terms configuration.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <h3 className="font-bold text-sm text-[#DC2626] uppercase tracking-wider">Business Identity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Dealership Business Name</label>
            <input type="text" readOnly value={BUSINESS_INFO.name} className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Showroom Address</label>
            <input type="text" readOnly value={BUSINESS_INFO.address} className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
            <input type="text" readOnly value={BUSINESS_INFO.phone} className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-xl font-mono" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Official Email</label>
            <input type="text" readOnly value={BUSINESS_INFO.email} className="w-full p-2.5 bg-gray-100 border border-gray-300 rounded-xl" />
          </div>
        </div>

        <h3 className="font-bold text-sm text-[#DC2626] uppercase tracking-wider pt-4 border-t">Developer Information</h3>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2 text-gray-600">
          <div><strong>Agency:</strong> {DEVELOPER_INFO.name}</div>
          <div><strong>Website:</strong> <a href={DEVELOPER_INFO.website} target="_blank" className="text-[#DC2626] underline">{DEVELOPER_INFO.website}</a></div>
          <div><strong>Credit Line:</strong> {DEVELOPER_INFO.creditText}</div>
          <div className="text-[10px] text-gray-400 pt-1">{DEVELOPER_INFO.copyrightNotice}</div>
        </div>

      </div>
    </div>
  );
}
