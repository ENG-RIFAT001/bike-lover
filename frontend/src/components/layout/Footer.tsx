import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, DEVELOPER_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-8 border-t-4 border-[#DC2626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: About Dealership */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#DC2626] flex items-center justify-center font-black text-xl text-white">
                BL
              </div>
              <span className="text-2xl font-black text-white tracking-wider">
                BIKE <span className="text-[#DC2626]">LOVER</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dhaka's trusted motorcycle dealership for genuine used bikes, transparent ownership transfer, digital sale agreements, and verified buy/sell/exchange services.
            </p>
            <div className="pt-2 text-xs text-gray-500">
              Showroom Open: 10:00 AM – 9:00 PM (Everyday)
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-[#DC2626] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bikes" className="hover:text-white transition-colors">Browse All Bikes</Link></li>
              <li><Link href="/used-bikes-bangladesh" className="hover:text-white transition-colors">Used Bikes Bangladesh</Link></li>
              <li><Link href="/bike-buying-guide" className="hover:text-white transition-colors">Bike Buying Guide</Link></li>
              <li><Link href="/bike-selling-guide" className="hover:text-white transition-colors">Bike Selling Guide</Link></li>
              <li><Link href="/registration-transfer-guide" className="hover:text-white transition-colors">BRTA Registration Guide</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-[#DC2626] pl-2.5">
              Top Brands
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/yamaha-used-bikes" className="hover:text-[#DC2626] transition-colors">Yamaha Used Bikes</Link></li>
              <li><Link href="/honda-used-bikes" className="hover:text-[#DC2626] transition-colors">Honda Used Bikes</Link></li>
              <li><Link href="/brand/suzuki" className="hover:text-[#DC2626] transition-colors">Suzuki Used Bikes</Link></li>
              <li><Link href="/brand/tvs" className="hover:text-[#DC2626] transition-colors">TVS Used Bikes</Link></li>
              <li><Link href="/brand/bajaj" className="hover:text-[#DC2626] transition-colors">Bajaj Used Bikes</Link></li>
            </ul>
          </div>

          {/* Col 4: Showroom Address & Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-[#DC2626] pl-2.5">
              Showroom Location
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Developer Credit & Copyright Section (MANDATORY REQUIREMENT) */}
        <div className="mt-8 pt-6 text-center space-y-3 text-xs text-gray-400">
          <p className="font-semibold text-gray-300">
            {DEVELOPER_INFO.footerText}
          </p>

          <p className="text-sm">
            <span>Website Designed & Developed By </span>
            <a
              href={DEVELOPER_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2626] hover:text-red-400 font-bold inline-flex items-center space-x-1 underline decoration-red-500 underline-offset-4"
            >
              <span>{DEVELOPER_INFO.name}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 inline" />
            </a>
          </p>

          <p>
            <a
              href={DEVELOPER_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {DEVELOPER_INFO.poweredBy}
            </a>
          </p>

          <p className="text-[11px] text-gray-500 max-w-4xl mx-auto leading-relaxed">
            {DEVELOPER_INFO.copyrightNotice}
          </p>
        </div>

      </div>
    </footer>
  );
}
