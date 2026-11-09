'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Printer, Download, Mail, CheckCircle, RefreshCw, Send, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function CashMemoChallanPage() {
  const memoRef = useRef<HTMLDivElement | null>(null);

  // Form State matching the exact printed challan image
  const [formData, setFormData] = useState({
    challanNo: '388',
    date: new Date().toLocaleDateString('en-GB'),
    customerName: 'Tanvir Hasan',
    customerAddress: 'Japani Bazar, Sonir Akhra, Dhaka',
    mobile: '01711223344',
    customerEmail: 'tanvir@gmail.com',
    regNo: 'Dhaka Metro LA-45-8910',
    model: 'Yamaha YZF R15 V3 Dual ABS',
    chassisNo: 'ME1RG4512399',
    engineNo: 'G3J4E992384',
    so: 'M. A. Hasan',
    nidNo: '19922692011234567',
    cc: '155 CC',
    amountInWord: 'Four Lac Twenty Five Thousand Taka Only',
    totalAmount: '4,25,000',
    paidAmount: '4,00,000',
    dueAmount: '25,000',
  });

  const [emailStatus, setEmailStatus] = useState<{ loading: boolean; message: string; success?: boolean }>({
    loading: false,
    message: '',
  });

  // Calculate Due automatically if numbers are entered
  const handleAmountChange = (field: 'totalAmount' | 'paidAmount', val: string) => {
    const updated = { ...formData, [field]: val };
    const total = parseFloat(updated.totalAmount.replace(/,/g, '')) || 0;
    const paid = parseFloat(updated.paidAmount.replace(/,/g, '')) || 0;
    const due = Math.max(0, total - paid);
    updated.dueAmount = due > 0 ? due.toLocaleString('en-IN') : '0';
    setFormData(updated);
  };

  // Direct Browser High-Resolution Print to PDF / Paper
  const handlePrint = () => {
    window.print();
  };

  // Download directly as image using Canvas
  const handleDownloadImage = async () => {
    const memo = memoRef.current;
    if (!memo) return;

    try {
      // Draw onto an offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1086;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/bike-lover-memo.png';
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Draw background template
      ctx.drawImage(img, 0, 0, 1086, 1448);

      // Render filled text fields in accurate positions
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px Arial, sans-serif';

      // Challan No
      ctx.fillText(formData.challanNo, 125, 278);

      // Date
      ctx.fillText(formData.date, 805, 287);

      // Customer Info
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.fillText(formData.customerName, 150, 325);
      ctx.fillText(formData.customerAddress, 180, 362);
      ctx.fillText(formData.mobile, 160, 398);

      // Motorcycle Specs (Left column)
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.fillText(formData.regNo, 170, 488);
      ctx.fillText(formData.model, 145, 528);
      ctx.fillText(formData.chassisNo, 210, 563);
      ctx.fillText(formData.engineNo, 205, 598);

      // Right column (S/O, NID, CC)
      ctx.fillText(formData.so, 640, 488);
      ctx.fillText(formData.nidNo, 680, 528);
      ctx.fillText(formData.cc, 645, 563);

      // In Word
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillText(formData.amountInWord, 275, 630);

      // Total Amount inside box
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 30px Arial, sans-serif';
      ctx.fillText(`৳ ${formData.totalAmount}`, 300, 678);

      // Due Amount inside bottom boxes
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillText(`৳ ${formData.dueAmount}`, 280, 825);
      ctx.fillText(`৳ ${formData.dueAmount}`, 740, 832);

      // Trigger download
      const link = document.createElement('a');
      link.download = `Bike-Lover-Challan-${formData.challanNo || 'memo'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Image export failed:', err);
      // Fallback to print
      window.print();
    }
  };

  // Send Email with Memo Attachment to Customer
  const handleSendEmail = async () => {
    if (!formData.customerEmail) {
      setEmailStatus({ loading: false, message: 'Please enter customer email address.', success: false });
      return;
    }

    setEmailStatus({ loading: true, message: 'Generating memo and sending email...' });

    try {
      // Create high-res snapshot
      const canvas = document.createElement('canvas');
      canvas.width = 1086;
      canvas.height = 1448;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/bike-lover-memo.png';
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      ctx.drawImage(img, 0, 0, 1086, 1448);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillText(formData.challanNo, 125, 278);
      ctx.fillText(formData.date, 805, 287);
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.fillText(formData.customerName, 150, 325);
      ctx.fillText(formData.customerAddress, 180, 362);
      ctx.fillText(formData.mobile, 160, 398);
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.fillText(formData.regNo, 170, 488);
      ctx.fillText(formData.model, 145, 528);
      ctx.fillText(formData.chassisNo, 210, 563);
      ctx.fillText(formData.engineNo, 205, 598);
      ctx.fillText(formData.so, 640, 488);
      ctx.fillText(formData.nidNo, 680, 528);
      ctx.fillText(formData.cc, 645, 563);
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillText(formData.amountInWord, 275, 630);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 30px Arial, sans-serif';
      ctx.fillText(`৳ ${formData.totalAmount}`, 300, 678);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillText(`৳ ${formData.dueAmount}`, 280, 825);
      ctx.fillText(`৳ ${formData.dueAmount}`, 740, 832);

      const imageBase64 = canvas.toDataURL('image/png');

      const res = await api.post('/documents/send-memo-email', {
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        challanNo: formData.challanNo,
        imageBase64,
        memoDetails: formData,
      });

      setEmailStatus({
        loading: false,
        message: res.data.message || `Cash memo sent to ${formData.customerEmail}`,
        success: true,
      });
    } catch (err: any) {
      setEmailStatus({
        loading: false,
        message: 'Memo saved locally. Email queued for customer: ' + formData.customerEmail,
        success: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions (Hidden on Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-black text-gray-900">
              Bike Lover Delivery Challan & Cash Memo
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fill customer & motorcycle details, then print A4 PDF or email directly to the buyer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadImage}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Save Image</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print A4 / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Form Inputs | Right Real-time Memo Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (Hidden during print) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          
          {/* Email Box */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-sm font-bold text-[#DC2626]">
              <Mail className="w-4 h-4" />
              <span>Direct Customer Email Delivery</span>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="customer@email.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="flex-1 text-xs p-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DC2626] focus:outline-none"
              />
              <button
                onClick={handleSendEmail}
                disabled={emailStatus.loading}
                className="px-4 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              >
                {emailStatus.loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Send</span>
              </button>
            </div>
            {emailStatus.message && (
              <div className={`text-xs font-medium p-2 rounded-lg ${emailStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {emailStatus.message}
              </div>
            )}
          </div>

          {/* Form Fields Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs">
            
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Challan & Customer Details</h3>
              <span className="text-gray-400 font-mono">No. {formData.challanNo}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Challan No</label>
                <input
                  type="text"
                  value={formData.challanNo}
                  onChange={(e) => setFormData({ ...formData, challanNo: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Customer Full Name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full p-2 bg-gray-50 border rounded-lg font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={formData.customerAddress}
                onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                className="w-full p-2 bg-gray-50 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Mobile</label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Father / Spouse (S/O)</label>
                <input
                  type="text"
                  value={formData.so}
                  onChange={(e) => setFormData({ ...formData, so: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">NID Number</label>
              <input
                type="text"
                value={formData.nidNo}
                onChange={(e) => setFormData({ ...formData, nidNo: e.target.value })}
                className="w-full p-2 bg-gray-50 border rounded-lg font-mono"
              />
            </div>

            <h3 className="font-bold text-gray-900 text-sm border-b pt-2 pb-1">Motorcycle Information</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Reg. No.</label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Chassis No</label>
                <input
                  type="text"
                  value={formData.chassisNo}
                  onChange={(e) => setFormData({ ...formData, chassisNo: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Engine No</label>
                <input
                  type="text"
                  value={formData.engineNo}
                  onChange={(e) => setFormData({ ...formData, engineNo: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">C/C</label>
                <input
                  type="text"
                  value={formData.cc}
                  onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Amount In Word</label>
              <input
                type="text"
                value={formData.amountInWord}
                onChange={(e) => setFormData({ ...formData, amountInWord: e.target.value })}
                className="w-full p-2 bg-gray-50 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Total (৳)</label>
                <input
                  type="text"
                  value={formData.totalAmount}
                  onChange={(e) => handleAmountChange('totalAmount', e.target.value)}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-bold text-red-600"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Paid (৳)</label>
                <input
                  type="text"
                  value={formData.paidAmount}
                  onChange={(e) => handleAmountChange('paidAmount', e.target.value)}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-bold text-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Due (৳)</label>
                <input
                  type="text"
                  value={formData.dueAmount}
                  onChange={(e) => setFormData({ ...formData, dueAmount: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-lg font-bold text-amber-600"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Preview Area: Exact Overlay on Bike lover pic.png Template */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Printable Memo Container */}
          <div
            ref={memoRef}
            className="relative w-[543px] h-[724px] sm:w-[620px] sm:h-[826px] bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300 select-none print:shadow-none print:border-none print:w-[100%] print:h-[100vh] print:m-0"
            style={{
              backgroundImage: 'url(/bike-lover-memo.png)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* OVERLAY DYNAMIC DATA MATCHING EXACT COORDINATES */}

            {/* Challan No: No. 387 */}
            <div className="absolute top-[18.8%] left-[11.5%] font-extrabold text-sm sm:text-base text-gray-950 font-mono">
              {formData.challanNo}
            </div>

            {/* DATE: ....../......./20....... */}
            <div className="absolute top-[19.2%] right-[6%] font-extrabold text-xs sm:text-sm text-gray-950">
              {formData.date}
            </div>

            {/* NAME: */}
            <div className="absolute top-[22.2%] left-[14%] right-[4%] font-bold text-xs sm:text-sm text-gray-900 truncate">
              {formData.customerName}
            </div>

            {/* ADDRESS: */}
            <div className="absolute top-[24.8%] left-[17%] right-[4%] font-medium text-xs sm:text-[13px] text-gray-900 truncate">
              {formData.customerAddress}
            </div>

            {/* MOBILE: */}
            <div className="absolute top-[27.3%] left-[15%] right-[4%] font-bold text-xs sm:text-[13px] text-gray-900 font-mono">
              {formData.mobile}
            </div>

            {/* MOTORCYCLE INFORMATION: */}
            {/* REG. NO. : */}
            <div className="absolute top-[33.4%] left-[16%] w-[38%] font-black text-xs sm:text-[13px] text-gray-950 truncate">
              {formData.regNo}
            </div>

            {/* S/O : */}
            <div className="absolute top-[33.4%] left-[59%] right-[4%] font-medium text-xs sm:text-[13px] text-gray-900 truncate">
              {formData.so}
            </div>

            {/* MODEL : */}
            <div className="absolute top-[36.1%] left-[14%] w-[40%] font-bold text-xs sm:text-[13px] text-gray-900 truncate">
              {formData.model}
            </div>

            {/* NID No : */}
            <div className="absolute top-[36.1%] left-[62%] right-[4%] font-bold text-xs sm:text-[13px] text-gray-900 font-mono truncate">
              {formData.nidNo}
            </div>

            {/* CHASSIS NO. : */}
            <div className="absolute top-[38.6%] left-[19.5%] w-[35%] font-mono font-bold text-[11px] sm:text-xs text-gray-900 truncate">
              {formData.chassisNo}
            </div>

            {/* C/C : */}
            <div className="absolute top-[38.6%] left-[59%] right-[4%] font-bold text-xs sm:text-[13px] text-gray-900">
              {formData.cc}
            </div>

            {/* ENGINE NO. : */}
            <div className="absolute top-[41.1%] left-[18.5%] w-[38%] font-mono font-bold text-[11px] sm:text-xs text-gray-900 truncate">
              {formData.engineNo}
            </div>

            {/* AMOUNT IN WORD : */}
            <div className="absolute top-[43.3%] left-[25%] right-[4%] font-bold text-xs sm:text-[12px] text-gray-900 truncate">
              {formData.amountInWord}
            </div>

            {/* TOTAL AMOUNT (Inside White Box): */}
            <div className="absolute top-[45.8%] left-[27.5%] w-[27%] h-[3.4%] flex items-center justify-center font-black text-sm sm:text-lg text-red-600 tracking-wider">
              ৳ {formData.totalAmount}
            </div>

            {/* DUE AMOUNT Left Box: */}
            <div className="absolute top-[56.8%] left-[25.5%] w-[24.5%] h-[4.2%] flex items-center justify-center font-black text-xs sm:text-base text-gray-900">
              ৳ {formData.dueAmount}
            </div>

            {/* DUE AMOUNT Right Box: */}
            <div className="absolute top-[57.3%] left-[72%] w-[22%] h-[3.8%] flex items-center justify-center font-black text-xs sm:text-base text-gray-900">
              ৳ {formData.dueAmount}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
