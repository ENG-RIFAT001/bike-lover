'use client';

import React, { useState, useMemo } from 'react';
import BikeCard from '@/components/bikes/BikeCard';
import BikeFilters from '@/components/bikes/BikeFilters';
import BikeSearch from '@/components/bikes/BikeSearch';
import { Bike } from '@/types';

const INITIAL_BIKES: Bike[] = [
  {
    id: '1',
    bikeId: 'BL-0001',
    brand: 'Yamaha',
    model: 'YZF R15 V3 Dual ABS',
    variant: 'Dual Channel ABS',
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
    slug: 'yamaha-r15-v3-dual-abs-2022-bl0001',
    isFeatured: true,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80' }],
  },
  {
    id: '2',
    bikeId: 'BL-0002',
    brand: 'Yamaha',
    model: 'FZS V3 ABS Vintage',
    variant: 'ABS Fi',
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
    slug: 'yamaha-fzs-v3-abs-vintage-2023-bl0002',
    isFeatured: true,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80' }],
  },
  {
    id: '3',
    bikeId: 'BL-0003',
    brand: 'Honda',
    model: 'CB Hornet 160R CBS',
    variant: 'CBS Edition',
    year: 2021,
    color: 'Striking Green',
    registrationNumber: 'Dhaka Metro GA-78-1123',
    chassisNumber: 'ME1RG5566778',
    engineNumber: 'H1K2E334455',
    mileage: 18400,
    purchasePrice: 145000,
    salePrice: 172000,
    condition: 'GOOD',
    status: 'AVAILABLE',
    slug: 'honda-cb-hornet-160r-cbs-2021-bl0003',
    isFeatured: true,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80' }],
  },
  {
    id: '4',
    bikeId: 'BL-0004',
    brand: 'Suzuki',
    model: 'Gixxer SF Fi Disc',
    variant: 'Special Edition',
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
    slug: 'suzuki-gixxer-sf-fi-disc-2022-bl0004',
    isFeatured: true,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80' }],
  },
  {
    id: '5',
    bikeId: 'BL-0005',
    brand: 'TVS',
    model: 'Apache RTR 160 4V SmartXonnect',
    variant: 'Double Disc ABS',
    year: 2023,
    color: 'Racing Red',
    registrationNumber: 'Dhaka Metro GA-55-9081',
    chassisNumber: 'ME1RG7788990',
    engineNumber: 'T4E5R667788',
    mileage: 9500,
    purchasePrice: 180000,
    salePrice: 208000,
    condition: 'EXCELLENT',
    status: 'AVAILABLE',
    slug: 'tvs-apache-rtr-160-4v-2023-bl0005',
    isFeatured: false,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&auto=format&fit=crop&q=80' }],
  },
  {
    id: '6',
    bikeId: 'BL-0006',
    brand: 'Bajaj',
    model: 'Pulsar NS 160 Twin Disc',
    variant: 'FI ABS',
    year: 2022,
    color: 'Pewter Grey',
    registrationNumber: 'Dhaka Metro HA-88-2341',
    chassisNumber: 'ME1RG3322110',
    engineNumber: 'B6J7K889900',
    mileage: 15300,
    purchasePrice: 165000,
    salePrice: 195000,
    condition: 'GOOD',
    status: 'AVAILABLE',
    slug: 'bajaj-pulsar-ns-160-2022-bl0006',
    isFeatured: false,
    isPublished: true,
    images: [{ url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80' }],
  },
];

export default function BikesPage() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredBikes = useMemo(() => {
    return INITIAL_BIKES.filter((bike) => {
      if (selectedBrand && bike.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (selectedStatus && bike.status !== selectedStatus) return false;
      if (minPrice && bike.salePrice < Number(minPrice)) return false;
      if (maxPrice && bike.salePrice > Number(maxPrice)) return false;
      if (search) {
        const query = search.toLowerCase();
        const match =
          bike.brand.toLowerCase().includes(query) ||
          bike.model.toLowerCase().includes(query) ||
          (bike.registrationNumber && bike.registrationNumber.toLowerCase().includes(query)) ||
          bike.bikeId.toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'year') return b.year - a.year;
      return b.id.localeCompare(a.id);
    });
  }, [search, selectedBrand, selectedStatus, minPrice, maxPrice, sortBy]);

  const handleReset = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedStatus('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <span className="text-xs text-[#DC2626] font-bold uppercase tracking-widest">
            Inventory Catalogue
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
            Certified Used Motorcycles
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Displaying {filteredBikes.length} available bikes ready for physical inspection in Sonir Akhra showroom.
          </p>
        </div>

        {/* Top Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="w-full sm:max-w-md">
            <BikeSearch value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-semibold text-gray-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg p-2.5 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
            >
              <option value="latest">Latest Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year">Newest Model Year</option>
            </select>
          </div>
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BikeFilters
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onChangePrice={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              onReset={handleReset}
            />
          </div>

          {/* Bikes Card Grid */}
          <div className="lg:col-span-3">
            {filteredBikes.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <p className="text-gray-500 font-medium">No motorcycles found matching your filter criteria.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-[#DC2626] text-white rounded-lg text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBikes.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
