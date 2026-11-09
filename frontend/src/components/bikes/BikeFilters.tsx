'use client';

import React from 'react';
import { BIKE_BRANDS } from '@/lib/constants';

interface BikeFiltersProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  minPrice: string;
  maxPrice: string;
  onChangePrice: (min: string, max: string) => void;
  onReset: () => void;
}

export default function BikeFilters({
  selectedBrand,
  onSelectBrand,
  selectedStatus,
  onSelectStatus,
  minPrice,
  maxPrice,
  onChangePrice,
  onReset,
}: BikeFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-bold text-gray-900 text-base">Filter Motorcycles</h3>
        <button
          onClick={onReset}
          className="text-xs text-[#DC2626] font-semibold hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => onSelectBrand(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#DC2626] focus:outline-none"
        >
          <option value="">All Brands</option>
          {BIKE_BRANDS.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onSelectStatus(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#DC2626] focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="RESERVED">Reserved</option>
          <option value="SOLD">Sold</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Price Range (BDT)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ৳"
            value={minPrice}
            onChange={(e) => onChangePrice(e.target.value, maxPrice)}
            className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
          />
          <input
            type="number"
            placeholder="Max ৳"
            value={maxPrice}
            onChange={(e) => onChangePrice(minPrice, e.target.value)}
            className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
          />
        </div>
      </div>

    </div>
  );
}
