'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Edit, Trash2, Eye, Bike, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminBikesPage() {
  const [search, setSearch] = useState('');
  const [bikes, setBikes] = useState([
    {
      id: '1',
      bikeId: 'BL-0001',
      brand: 'Yamaha',
      model: 'YZF R15 V3 Dual ABS',
      year: 2022,
      color: 'Racing Blue',
      registrationNumber: 'Dhaka Metro LA-45-8910',
      chassisNumber: 'ME1RG4512399',
      engineNumber: 'G3J4E992384',
      mileage: 12500,
      purchasePrice: 380000,
      salePrice: 425000,
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      id: '2',
      bikeId: 'BL-0002',
      brand: 'Yamaha',
      model: 'FZS V3 ABS Vintage',
      year: 2023,
      color: 'Matte Green',
      registrationNumber: 'Dhaka Metro HA-12-3490',
      chassisNumber: 'ME1RG1234500',
      engineNumber: 'G1J2E889912',
      mileage: 8200,
      purchasePrice: 215000,
      salePrice: 245000,
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
    {
      id: '3',
      bikeId: 'BL-0003',
      brand: 'Honda',
      model: 'CB Hornet 160R CBS',
      year: 2021,
      color: 'Striking Green',
      registrationNumber: 'Dhaka Metro GA-78-1123',
      chassisNumber: 'ME1RG5566778',
      engineNumber: 'H1K2E334455',
      mileage: 18400,
      purchasePrice: 145000,
      salePrice: 172000,
      condition: 'GOOD',
      status: 'SOLD',
    },
    {
      id: '4',
      bikeId: 'BL-0004',
      brand: 'Suzuki',
      model: 'Gixxer SF Fi Disc',
      year: 2022,
      color: 'Metallic Triton Blue',
      registrationNumber: 'Dhaka Metro LA-99-4321',
      chassisNumber: 'ME1RG8899001',
      engineNumber: 'S2M3E445566',
      mileage: 14100,
      purchasePrice: 210000,
      salePrice: 238000,
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this bike from inventory?')) {
      setBikes(bikes.filter((b) => b.id !== id));
    }
  };

  const filtered = bikes.filter(
    (b) =>
      b.brand.toLowerCase().includes(search.toLowerCase()) ||
      b.model.toLowerCase().includes(search.toLowerCase()) ||
      b.bikeId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Motorcycle Inventory Management</h1>
          <p className="text-xs text-gray-500">Track purchase prices, listing values, chassis and engine numbers.</p>
        </div>
        <Link
          href="/admin/bikes/add"
          className="inline-flex items-center space-x-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Motorcycle</span>
        </Link>
      </div>

      {/* Search & Counts */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, Brand, Model, Reg..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <strong>{filtered.length}</strong> of {bikes.length} bikes in stock
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Bike ID</th>
                <th className="py-3 px-4">Brand & Model</th>
                <th className="py-3 px-4">Year & Color</th>
                <th className="py-3 px-4">Reg & Chassis</th>
                <th className="py-3 px-4">Purchase Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((bike) => (
                <tr key={bike.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{bike.bikeId}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{bike.brand} {bike.model}</div>
                    <div className="text-[10px] text-gray-400">{bike.mileage} km | {bike.condition}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>{bike.year}</div>
                    <div className="text-[10px] text-gray-500">{bike.color}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div>{bike.registrationNumber}</div>
                    <div className="text-[10px] text-gray-400">CH: {bike.chassisNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-600">{formatCurrency(bike.purchasePrice)}</td>
                  <td className="py-3.5 px-4 font-black text-gray-950">{formatCurrency(bike.salePrice)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      bike.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {bike.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/bike/${bike.id}`}
                      className="inline-block p-1.5 text-gray-500 hover:text-black rounded"
                      title="View Public Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(bike.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded cursor-pointer"
                      title="Delete Bike"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
