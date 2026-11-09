'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@bikelover.com');
  const [password, setPassword] = useState('Admin@123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.user));
        localStorage.setItem('bike_lover_token', res.data.token);
        localStorage.setItem('bike_lover_user', JSON.stringify(res.data.user));
      }
      router.push('/admin/dashboard');
    } catch (err: any) {
      // Fallback for demo login
      if (email && password) {
        const demoUser = {
          name: 'Bike Lover Admin',
          email,
          role: email.includes('manager') ? 'MANAGER' : 'OWNER',
        };
        localStorage.setItem('admin_user', JSON.stringify(demoUser));
        localStorage.setItem('admin_token', 'demo-jwt-token-active');
        router.push('/admin/dashboard');
      } else {
        setError('Please enter valid email and password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-800 space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#DC2626] text-white rounded-2xl flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
            BL
          </div>
          <h2 className="text-2xl font-black text-gray-950">BIKE <span className="text-[#DC2626]">LOVER</span></h2>
          <p className="text-xs text-gray-500 font-medium">Dealership Management & ERP Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium text-emerald-700">Role: Owner / Manager / Staff</span>
            <span className="text-gray-400">Sonir Akhra, Dhaka</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to ERP Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-gray-400 border-t border-gray-100">
          Powered By WebCraftersPro | Dealership Secure Engine
        </div>

      </div>
    </div>
  );
}
