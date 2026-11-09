'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#111827] text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#DC2626] flex items-center justify-center font-black text-2xl text-white shadow-md transform group-hover:scale-105 transition-transform">
              BL
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white">BIKE <span className="text-[#DC2626]">LOVER</span></span>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Sonir Akhra, Dhaka</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/bikes" className="text-gray-300 hover:text-[#DC2626] transition-colors font-semibold">Used Bikes</Link>
            
            {/* Brands Dropdown */}
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                Brands
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-[#1f2937] rounded-lg shadow-xl py-2 hidden group-hover:block border border-gray-700">
                <Link href="/brand/yamaha" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#DC2626] hover:text-white">Yamaha Bikes</Link>
                <Link href="/brand/honda" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#DC2626] hover:text-white">Honda Bikes</Link>
                <Link href="/brand/suzuki" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#DC2626] hover:text-white">Suzuki Bikes</Link>
                <Link href="/brand/tvs" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#DC2626] hover:text-white">TVS Bikes</Link>
                <Link href="/brand/bajaj" className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#DC2626] hover:text-white">Bajaj Bikes</Link>
              </div>
            </div>

            <Link href="/bike-buying-guide" className="text-gray-300 hover:text-white transition-colors">Buying Guide</Link>
            <Link href="/registration-transfer-guide" className="text-gray-300 hover:text-white transition-colors">BRTA Transfer</Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Showroom</span>
            </a>
            <Link
              href="/admin/login"
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#1f2937] border-t border-gray-800 px-4 pt-3 pb-6 space-y-3">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-gray-200 font-medium">Home</Link>
          <Link href="/bikes" onClick={() => setIsOpen(false)} className="block py-2 text-[#DC2626] font-bold">All Used Bikes</Link>
          <Link href="/brand/yamaha" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Yamaha Used Bikes</Link>
          <Link href="/brand/honda" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Honda Used Bikes</Link>
          <Link href="/brand/suzuki" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Suzuki Used Bikes</Link>
          <Link href="/bike-buying-guide" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Buying Guide</Link>
          <Link href="/admin/login" onClick={() => setIsOpen(false)} className="block py-2 text-amber-400 font-semibold">Admin Login</Link>
        </div>
      )}
    </header>
  );
}
