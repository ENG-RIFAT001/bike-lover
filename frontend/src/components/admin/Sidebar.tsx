"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Bike,
  ShoppingCart,
  Package,
  Users,
  FileText,
  BarChart3,
  FolderOpen,
  UserCog,
  Settings,
  Database,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bikes", href: "/admin/bikes", icon: Bike },
  { label: "Sales", href: "/admin/sales", icon: ShoppingCart },
  { label: "Purchases", href: "/admin/purchases", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Agreements", href: "/admin/agreements", icon: FileText },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Delivery Challan", href: "/admin/cash-memo", icon: FileText },
  { label: "Documents", href: "/admin/documents", icon: FolderOpen },
  { label: "Users", href: "/admin/users", icon: UserCog, roles: ["OWNER"] },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Backups", href: "/admin/backups", icon: Database },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  userRole = "STAFF",
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const filteredNav = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827] text-white">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-gray-700/50 py-4",
          collapsed ? "px-3 justify-center" : "px-5 gap-3"
        )}
      >
        <div className="flex-shrink-0 w-9 h-9 bg-[#DC2626] rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-lg font-bold text-white">Bike Lover</span>
            <p className="text-[10px] text-gray-400 leading-none">
              Admin Panel
            </p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="ml-auto hidden lg:flex p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {filteredNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-[#DC2626] text-white shadow-lg shadow-red-900/30"
                  : "text-gray-400 hover:bg-gray-700/50 hover:text-white",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                )}
              />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-[#F59E0B] text-[#111827] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-gray-700/50">
          <p className="text-[10px] text-gray-500 text-center">
            Powered by{" "}
            <span className="text-[#F59E0B] font-medium">WebCraftersPro</span>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
          >
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={onClose}
                className="p-1.5 rounded-md bg-gray-700 text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
