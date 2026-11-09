import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Tanvir Hasan',
      bike: 'Yamaha FZS V3 (2022)',
      text: 'Bought my Yamaha FZS from Bike Lover Sonir Akhra. The digital agreement was sent directly to my phone, and the BRTA paper transfer was seamless!',
      stars: 5,
    },
    {
      name: 'Rakibul Islam',
      bike: 'Honda CB Hornet 160R',
      text: 'Exchanged my old bike for a fresh Hornet. Got reasonable price evaluation and official printed invoice. Highly trustworthy showroom.',
      stars: 5,
    },
    {
      name: 'Mehedi Rahman',
      bike: 'Suzuki Gixxer SF Fi',
      text: 'The best thing about Bike Lover is complete paperwork transparency. No hidden mechanical faults. Genuine used bike platform!',
      stars: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Customer Feedback</h2>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">What Riders Say About Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-400 mb-3">
                  {[...Array(r.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">"{r.text}"</p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100">
                <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                <div className="text-xs text-[#DC2626] font-medium">{r.bike}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
