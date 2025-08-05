"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  Star,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { href: "/dashboard/doctor", label: "ড্যাশবোর্ড", icon: User },
  {
    href: "/dashboard/doctor/appointments",
    label: "অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা",
    icon: Calendar,
  },
  { href: "/dashboard/doctor/patients", label: "রোগীর বিস্তারিত", icon: Users },
  {
    href: "/dashboard/doctor/prescriptions",
    label: "প্রেসক্রিপশন আপলোড",
    icon: FileText,
  },
  {
    href: "/dashboard/doctor/availability",
    label: "উপস্থিতি সেট করুন",
    icon: Clock,
  },
  { href: "/dashboard/doctor/reviews", label: "রেটিং ও মন্তব্য", icon: Star },
  {
    href: "/dashboard/doctor/analytics",
    label: "পরিসংখ্যান ও আয়",
    icon: BarChart3,
  },
  {
    href: "/dashboard/doctor/profile",
    label: "প্রোফাইল সম্পাদনা",
    icon: Settings,
  },
];

export default function DoctorDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: sidebarOpen ? 0 : "-100%" }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:relative lg:translate-x-0 lg:shadow-none"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-sky-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-sky-100 text-sky-800">
                      ডা
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sky-800">
                      ডা. রহিম উদ্দিন
                    </h3>
                    <p className="text-sm text-sky-600">হৃদরোগ বিশেষজ্ঞ</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-sky-100 text-sky-800 font-medium"
                          : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-sky-100">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                লগ আউট
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Top bar */}
          <div className="bg-white shadow-sm border-b border-sky-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold text-sky-800">
                ডাক্তার ড্যাশবোর্ড
              </h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Page content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
