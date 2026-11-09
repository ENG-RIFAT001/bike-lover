'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileCheck, RefreshCw } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#111827] text-white overflow-hidden py-20 lg:py-28 border-b-4 border-[#DC2626]">
      
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-red-950/70 text-[#DC2626] border border-red-800/60 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <span>★ Dhaka's Premier Certified Motorcycle Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              BUY, SELL & EXCHANGE <br />
              <span className="text-[#DC2626]">CERTIFIED</span> BIKES
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bike Lover delivers 100% physically inspected motorcycles, instant digital purchase agreements, verified BRTA ownership transfers, and official company pad invoices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/bikes"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-red-900/50 transition-all text-base"
              >
                <span>Browse Available Bikes</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/bike-selling-guide"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-semibold px-6 py-4 rounded-xl transition-colors text-base"
              >
                <span>Sell Your Bike</span>
              </Link>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800/80 text-left">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Papers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Digital Agreement</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Easy Exchange</span>
              </div>
            </div>

          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1000&auto=format&fit=crop&q=80"
                alt="Bike Lover Showroom Premium Motorcycle"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">Official Dealership</div>
                  <div className="text-white font-black text-xl">Japani Bazar, Sonir Akhra, Dhaka</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
