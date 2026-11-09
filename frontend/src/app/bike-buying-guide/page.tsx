import React from 'react';

export const metadata = {
  title: 'Complete Used Bike Buying Guide Bangladesh | Bike Lover Tips',
  description: 'How to buy a second-hand motorcycle in Bangladesh: document verification, physical inspection checklist, and transfer paperwork.',
};

export default function BikeBuyingGuidePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">Buyer Education</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            The Ultimate Guide to Buying a Used Motorcycle in Bangladesh
          </h1>

          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              Purchasing a second-hand bike can save you 30% to 50% compared to a brand new showroom price. However, caution is required. Follow these essential steps:
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-4">1. Verify Chassis & Engine Numbers</h3>
            <p>
              Always physically inspect the chassis number punched on the steering head and the engine number on the engine casing. They must match the Blue Book (Smart Card) exactly without signs of tampering.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-4">2. Check BRTA Tax Token & Fitness Validity</h3>
            <p>
              Ensure the tax token is updated. In Bangladesh, expired tax tokens incur late fees. At Bike Lover, all vehicles have clearly documented tax records.
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-4">3. Execute a Written Digital Agreement</h3>
            <p>
              Never buy a motorcycle with just verbal agreement. Demand a signed and sealed transaction agreement detailing the seller NID, buyer NID, chassis number, and handover time.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
