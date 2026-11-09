import React from 'react';
import { Award, Users, Bike, CheckCircle } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { label: 'Bikes Delivered', value: '1,500+', icon: Bike },
    { label: 'Satisfied Customers', value: '2,800+', icon: Users },
    { label: 'Verified Ownerships', value: '100%', icon: CheckCircle },
    { label: 'Years Of Excellence', value: '8+ Years', icon: Award },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
