import React from 'react';

export const metadata = {
  title: 'BRTA Motorcycle Ownership Transfer Guide Bangladesh | Bike Lover',
  description: 'How to legally transfer BRTA bike registration in Bangladesh. Form T.O, Form T.T.O, fee calculation, and biometric verification.',
};

export default function RegistrationTransferGuidePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
          <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">Legal & Compliance</span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
            BRTA Motorcycle Ownership Transfer Guide in Bangladesh
          </h1>

          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              In Bangladesh, maintaining motorcycle ownership in someone else's name is legally risky. Here is how to complete BRTA ownership transfer:
            </p>

            <h3 className="text-lg font-bold text-gray-900 pt-3">Required Documents:</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-700">
              <li>Original BRTA Registration Certificate / Smart Card.</li>
              <li>Updated Tax Token & Fitness Certificate.</li>
              <li>Form 'T.O' (Transfer of Ownership) signed by the registered owner.</li>
              <li>Form 'T.T.O' signed by the buyer.</li>
              <li>Notarized Affidavit on 300 BDT stamp confirming handover.</li>
              <li>National ID (NID) photocopy of both Buyer and Seller.</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-900 pt-4">Bike Lover Showroom Assistance</h3>
            <p>
              When you purchase any motorcycle from Bike Lover, our documentation team assists you with preparing all paperwork, affidavits, and digital agreements to ensure smooth BRTA transfer.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
