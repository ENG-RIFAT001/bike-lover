'use client';

import React from 'react';
import Link from 'next/link';
import { Bike } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gauge, Shield, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BikeCard({ bike }: { bike: Bike }) {
  const imageUrl = bike.images && bike.images.length > 0 
    ? bike.images[0].url 
    : 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80';

  const statusVariant = 
    bike.status === 'AVAILABLE' ? 'success' : 
    bike.status === 'RESERVED' ? 'warning' : 'danger';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Image with status tag */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={`${bike.brand} ${bike.model} ${bike.year}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={statusVariant}>
            {bike.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-white text-xs font-semibold">
          {bike.condition}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            {bike.brand}
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#DC2626] transition-colors mt-1 line-clamp-1">
            {bike.model} {bike.variant ? `(${bike.variant})` : ''}
          </h3>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Year: <strong>{bike.year}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Gauge className="w-3.5 h-3.5 text-gray-400" />
              <span>Mileage: <strong>{bike.mileage?.toLocaleString()} km</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 col-span-2">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">Reg: <strong>{bike.registrationNumber || 'Registration Transferable'}</strong></span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-medium">Selling Price</span>
            <span className="text-xl font-black text-gray-950">
              {formatCurrency(bike.salePrice)}
            </span>
          </div>
          <Link
            href={`/bike/${bike.slug || bike.id}`}
            className="inline-flex items-center space-x-1 bg-[#111827] group-hover:bg-[#DC2626] text-white text-xs font-bold px-3.5 py-2.5 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
