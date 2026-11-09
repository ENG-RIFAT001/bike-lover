'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    mobile: '',
    email: '',
    presentAddress: '',
    permanentAddress: '',
    nidNumber: '',
    drivingLicenseNumber: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/customers', formData);
      router.push('/admin/customers');
    } catch {
      router.push('/admin/customers');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Customer KYC & Information Entry</h1>
        <p className="text-xs text-gray-500">Record full legal identity according to Bangladesh Road Transport and compliance regulations.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Full Name (As per NID)</label>
            <input
              type="text"
              required
              placeholder="e.g. Tanvir Hasan"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Father's Name</label>
            <input
              type="text"
              placeholder="Father's full name"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mother's Name</label>
            <input
              type="text"
              placeholder="Mother's full name"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mobile Contact Number</label>
            <input
              type="text"
              required
              placeholder="+88017xxxxxxxx"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="customer@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">National ID (NID / Smart Card)</label>
            <input
              type="text"
              required
              placeholder="10 or 17 digit NID number"
              value={formData.nidNumber}
              onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Driving License Number</label>
            <input
              type="text"
              placeholder="DK-XXXXXXX"
              value={formData.drivingLicenseNumber}
              onChange={(e) => setFormData({ ...formData, drivingLicenseNumber: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-mono"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Present Address</label>
            <textarea
              rows={2}
              placeholder="House, Road, Area, Dhaka"
              value={formData.presentAddress}
              onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Permanent Address</label>
            <textarea
              rows={2}
              placeholder="Village, Post, Thana, District"
              value={formData.permanentAddress}
              onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md"
          >
            Save Customer Record
          </button>
        </div>

      </form>
    </div>
  );
}
