'use client';

import React, { useState } from 'react';
import { UserPlus, Shield, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Bike Lover Admin', email: 'admin@bikelover.com', role: 'OWNER', phone: '+8801700000000', isActive: true },
    { id: 'u2', name: 'Bike Lover Manager', email: 'manager@bikelover.com', role: 'MANAGER', phone: '+8801700000001', isActive: true },
    { id: 'u3', name: 'Bike Lover Staff', email: 'staff@bikelover.com', role: 'STAFF', phone: '+8801700000002', isActive: true },
  ]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">User Access & Staff Roles</h1>
          <p className="text-xs text-gray-500">Role-based permissions: Owner (Full), Manager (Inventory & Sales), Staff (Entries).</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-600 font-bold uppercase border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="py-3.5 px-4 font-bold text-gray-900">{u.name}</td>
                <td className="py-3.5 px-4">{u.email}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    u.role === 'OWNER' ? 'bg-purple-100 text-purple-800' :
                    u.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono">{u.phone}</td>
                <td className="py-3.5 px-4">
                  <span className="text-emerald-700 font-bold text-[11px]">✓ ACTIVE</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
