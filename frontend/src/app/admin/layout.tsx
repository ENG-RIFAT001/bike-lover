'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const storedUser = localStorage.getItem('admin_user') || localStorage.getItem('bike_lover_user');
    if (!storedUser) {
      // Set default demo owner session if none set
      const defaultOwner = {
        name: 'Bike Lover Owner',
        email: 'admin@bikelover.com',
        role: 'OWNER',
      };
      localStorage.setItem('admin_user', JSON.stringify(defaultOwner));
      setUser(defaultOwner);
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: 'Admin', email: 'admin@bikelover.com', role: 'OWNER' });
      }
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
