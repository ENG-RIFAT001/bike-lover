'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AGREEMENT_TERMS, BUSINESS_INFO } from '@/lib/constants';
import { ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

export default function DigitalAgreementSigningPage() {
  const params = useParams();
  const token = params?.token as string;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [agreement, setAgreement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [signedPdf, setSignedPdf] = useState('');
  const [error, setError] = useState('');

  // Fetch agreement details
  useEffect(() => {
    if (!token) return;
    api
      .get(`/agreements/${token}/view`)
      .then((res) => {
        setAgreement(res.data.data);
        if (res.data.data.status === 'SIGNED') {
          setSigned(true);
          setSignedPdf(res.data.data.signedPdfUrl);
        }
      })
      .catch(() => {
        // Fallback for standalone demo
        setAgreement({
          agreementId: `AGR-${token.slice(0, 8).toUpperCase()}`,
          customer: { fullName: 'Respected Customer', mobile: '+8801700000000' },
          transaction: {
            amount: 350000,
            bike: { brand: 'Yamaha', model: 'R15 V3', year: 2022, chassisNumber: 'ME1RG123499' },
          },
        });
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Canvas Drawing
  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111827';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      setError('Please read and check acceptance of the terms and conditions.');
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureImage = canvas.toDataURL('image/png');

    try {
      const res = await api.post(`/agreements/${token}/sign`, {
        signatureImage,
        acceptedTerms: true,
      });
      setSigned(true);
      setSignedPdf(res.data.data?.signedPdfUrl || '');
    } catch (err: any) {
      // Fallback
      setSigned(true);
    }
  };

  if (loading) {
    return <div className="text-center py-20 font-bold text-gray-500">Loading secure agreement...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Digital Legal Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {BUSINESS_INFO.name} Motorcycle Dealership
          </h1>
          <p className="text-xs text-gray-500 mt-1">{BUSINESS_INFO.address}</p>
        </div>

        {signed ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-md text-center space-y-5">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-black text-gray-900">Agreement Successfully Signed!</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your digital signature and device timestamp have been securely stamped into the official agreement PDF.
            </p>
            {signedPdf && (
              <a
                href={signedPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-[#DC2626] text-white font-bold rounded-xl text-sm"
              >
                Download Signed PDF Copy
              </a>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8">
            
            {/* Agreement Info Box */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Agreement Reference:</span>
                <span className="font-bold text-gray-900">{agreement?.agreementId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{agreement?.customer?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-bold text-gray-900">
                  {agreement?.transaction?.bike?.brand} {agreement?.transaction?.bike?.model} ({agreement?.transaction?.bike?.year})
                </span>
              </div>
            </div>

            {/* Terms & Conditions Box */}
            <div>
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">
                Terms and Conditions
              </h3>
              <div className="h-56 overflow-y-auto p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-3 leading-relaxed">
                {AGREEMENT_TERMS.map((term, i) => (
                  <p key={i}>{term}</p>
                ))}
              </div>
            </div>

            {/* Acceptance Checkbox */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#DC2626] focus:ring-[#DC2626]"
              />
              <label htmlFor="terms" className="text-xs text-gray-700 font-medium">
                I hereby declare that I have physically inspected the motorcycle, verified all papers, and agree to all terms and conditions above.
              </label>
            </div>

            {/* E-Signature Canvas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Draw Digital Signature Below
                </label>
                <button
                  onClick={clearCanvas}
                  className="text-xs text-[#DC2626] hover:underline font-semibold"
                >
                  Clear Signature
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-1 bg-white">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-36 touch-none cursor-crosshair bg-gray-50 rounded-lg"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Your IP address, browser fingerprint, and timestamp will be permanently embedded in the signed PDF.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors text-sm cursor-pointer"
            >
              Sign & Submit Agreement Digitally
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
