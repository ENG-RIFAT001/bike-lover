import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import BrandSection from '@/components/home/BrandSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ContactSection from '@/components/home/ContactSection';
import BikeCard from '@/components/bikes/BikeCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Bike } from '@/types';

// Mock featured bikes fallback for immediate display
const SAMPLE_FEATURED_BIKES: Bike[] = [
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
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />

      {/* Featured Bikes Showcase */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">
                Hand-Picked Inventory
              </span>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
                Featured Motorcycles
              </h2>
            </div>
            <Link
              href="/bikes"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-bold text-[#DC2626] hover:text-red-700"
            >
              <span>View All Available Bikes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_FEATURED_BIKES.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>
      </section>

      <BrandSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
