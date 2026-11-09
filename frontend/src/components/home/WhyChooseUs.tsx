import React from 'react';
import { ShieldCheck, FileText, Banknote, RefreshCw } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      title: 'Legally Verified Documents',
      desc: 'All chassis numbers, engine numbers and BRTA registration documents are thoroughly checked before stocking.',
      icon: ShieldCheck,
    },
    {
      title: 'Digital E-Signature Agreement',
      desc: 'Secure digital sales agreement sent straight to customer phone/email with timestamp, IP, and legal protection.',
      icon: FileText,
    },
    {
      title: 'Official Pad Printing',
      desc: 'Every purchase and sale invoice is issued on company official pad with authorized signatures and showroom seal.',
      icon: Banknote,
    },
    {
      title: 'Instant Fair Value Exchange',
      desc: 'Bring your current motorcycle and upgrade to your desired model in less than 30 minutes at Sonir Akhra showroom.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">Dealership Excellence</h2>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Why Choose Bike Lover</h3>
          <p className="text-gray-500 text-sm mt-3">
            We eliminate fraud and insecurity in Bangladesh's used motorcycle industry with digital documentation and legal transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#DC2626] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626] text-white flex items-center justify-center mb-5 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
