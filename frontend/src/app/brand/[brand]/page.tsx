import React from 'react';
import Link from 'next/link';
import BikeCard from '@/components/bikes/BikeCard';
import { Bike } from '@/types';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
  return {
    title: `${brandName} Used Bikes in Bangladesh | Certified Second Hand Showroom`,
    description: `Browse certified used ${brandName} motorcycles at Bike Lover Sonir Akhra, Dhaka. 100% verified papers, best price, and digital sales agreement.`,
  };
}

export default async function BrandBikesPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

  const sampleBikes: Bike[] = [
    {
      id: 'b1',
      bikeId: `BL-${brandName}-01`,
      brand: brandName,
      model: `${brandName} Premium Edition 160`,
      year: 2023,
      color: 'Black & Red',
      registrationNumber: 'Dhaka Metro LA-33-4455',
      chassisNumber: 'ME1RG99112233',
      engineNumber: 'ENG88442211',
      mileage: 11000,
      purchasePrice: 190000,
      salePrice: 220000,
      condition: 'EXCELLENT',
      status: 'AVAILABLE',
      slug: `${brand.toLowerCase()}-premium-160-2023`,
      isFeatured: true,
      isPublished: true,
      images: [{ url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80' }],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/bikes" className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-[#DC2626]">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Bikes</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">Brand Showcase</span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">{brandName} Used Bikes in Bangladesh</h1>
          <p className="text-gray-600 text-sm mt-2 max-w-3xl leading-relaxed">
            Looking for authentic second-hand {brandName} motorcycles in Dhaka? Bike Lover guarantees transparent condition, original documents, verified engine performance, and instant ownership handover.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
}
