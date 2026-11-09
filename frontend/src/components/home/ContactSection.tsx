import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Visit Showroom</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Come Check Out Your Next Ride In Person
            </h3>
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              We are located at Japani Bazar, Sonir Akhra, Dhaka. Stop by for test rides, document inspection, or to evaluate your existing bike for instant cash or exchange.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <MapPin className="w-6 h-6 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Physical Address</h4>
                  <p className="text-gray-600 text-xs mt-1">{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <Phone className="w-6 h-6 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Direct Phone</h4>
                  <p className="text-gray-600 text-xs mt-1">{BUSINESS_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <Clock className="w-6 h-6 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Showroom Timing</h4>
                  <p className="text-gray-600 text-xs mt-1">Saturday – Friday: 10:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center space-x-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom</span>
              </a>
            </div>

          </div>

          {/* Location Map / Card */}
          <div className="bg-[#111827] text-white p-8 rounded-3xl border border-gray-800 shadow-xl space-y-6">
            <h4 className="text-xl font-bold">Directions to Showroom</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              From Jatrabari Flyover, head towards Sonir Akhra. Located at Japani Bazar main road. Parking space available for visitors.
            </p>
            <div className="h-64 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 relative overflow-hidden text-center p-6">
              <div>
                <MapPin className="w-10 h-10 text-[#DC2626] mx-auto mb-2 animate-bounce" />
                <div className="font-bold text-sm text-white">Bike Lover Dealership</div>
                <div className="text-xs text-gray-400 mt-1">Japani Bazar, Sonir Akhra, Dhaka</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
