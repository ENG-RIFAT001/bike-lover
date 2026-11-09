'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Gauge,
  FileText,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function BikeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [requestSent, setRequestSent] = useState(false);

  // Bike Details Data
  const bike = {
    name: 'Yamaha YZF R15 V3 Dual Channel ABS',
    brand: 'Yamaha',
    model: 'YZF R15 V3',
    variant: 'Dual Channel ABS',
    year: 2022,
    color: 'Racing Blue',
    registrationNumber: 'Dhaka Metro LA-45-8910',
    chassisNumber: 'ME1RG45123998124',
    engineNumber: 'G3J4E99238471',
    mileage: 12500,
    condition: 'EXCELLENT',
    sellingPrice: 425000,
    status: 'AVAILABLE',
    description:
      'Super fresh condition Yamaha YZF R15 V3 Dual Channel ABS (2022 model) in iconic Racing Blue. First party owner, Dhaka Metro registration with 2-year tax token valid. Engine is 100% original, untouched, and serviced only at authorized Yamaha centers. No accident history. Tires are in 85% condition. Ready for physical inspection and instant digital agreement transfer at Bike Lover Sonir Akhra showroom.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&auto=format&fit=crop&q=80',
    ],
  };

  const [activeImage, setActiveImage] = useState(bike.images[0]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bike.name,
    image: bike.images,
    description: bike.description,
    brand: {
      '@type': 'Brand',
      name: bike.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: bike.sellingPrice,
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: BUSINESS_INFO.name,
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/bikes"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-[#DC2626]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Motorcycles</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 aspect-[16/10] shadow-sm relative">
              <img
                src={activeImage}
                alt={bike.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                ✓ Verified Showroom Stock
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-3 gap-3">
              {bike.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`rounded-xl overflow-hidden aspect-[16/10] border-2 transition-all cursor-pointer ${
                    activeImage === img ? 'border-[#DC2626] ring-2 ring-red-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Comprehensive Specifications Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-8">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">
                Detailed Motorcycle Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Brand</span>
                  <span className="font-bold text-gray-900">{bike.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Model</span>
                  <span className="font-bold text-gray-900">{bike.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Manufacturing Year</span>
                  <span className="font-bold text-gray-900">{bike.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Color</span>
                  <span className="font-bold text-gray-900">{bike.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Registration Number</span>
                  <span className="font-bold text-[#DC2626]">{bike.registrationNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Mileage Odometer</span>
                  <span className="font-bold text-gray-900">{bike.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Chassis Number</span>
                  <span className="font-bold text-gray-900">{bike.chassisNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Engine Number</span>
                  <span className="font-bold text-gray-900">{bike.engineNumber}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-2">Showroom Notes & Inspection Summary</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{bike.description}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Price & Action CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
              <div>
                <span className="text-xs uppercase font-bold text-gray-400">Total Showroom Price</span>
                <div className="text-3xl sm:text-4xl font-black text-[#111827] mt-1">
                  {formatCurrency(bike.sellingPrice)}
                </div>
                <span className="inline-block mt-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ✓ Includes Digital Sale Agreement & Pad Receipt
                </span>
              </div>

              {/* Action Buttons: Call Now, WhatsApp, Request Info */}
              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full flex items-center justify-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Showroom Now</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Bike%20Lover,%20I%20am%20interested%20in%20${encodeURIComponent(bike.name)}%20priced%20at%20${bike.sellingPrice}%20BDT.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Message on WhatsApp</span>
                </a>

                <button
                  onClick={() => setRequestSent(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-gray-200 font-bold py-3 px-4 rounded-xl transition-colors text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Paperwork Info</span>
                </button>

                {requestSent && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 text-center font-medium">
                    ✓ Request logged! Showroom representative will contact you shortly.
                  </div>
                )}
              </div>

              {/* Transparency Guarantees */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% physically inspected engine & chassis numbers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Pad invoice + Digital E-Agreement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Assistance in BRTA ownership transfer paperwork</span>
                </div>
              </div>

            </div>

            {/* Showroom Visit Box */}
            <div className="bg-[#111827] text-white rounded-2xl p-6 border border-gray-800 space-y-3">
              <h4 className="font-bold text-sm text-amber-400">Want to test ride this bike?</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Visit our Sonir Akhra showroom located at Japani Bazar. Bring your NID/Driving License for an instant physical test drive.
              </p>
              <div className="text-xs font-semibold text-gray-400 pt-1">
                Showroom Address: {BUSINESS_INFO.address}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
