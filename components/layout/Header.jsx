"use client";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/auth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="truncate text-lg font-bold text-sky-900 sm:text-xl">
              ডাক্তার এখানে
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <Link
              href="/contact"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              হোম
            </Link>
            <Link
              href="/doctors"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              ডাক্তার
            </Link>
            <Link
              href="/hospitals"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              হাসপাতাল
            </Link>
            <Link
              href="/blood-donors"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              রক্তদাতা
            </Link>
            <Link href="/ambulance" className="text-sky-800 hover:text-sky-600 font-medium transition-colors">অ্যাম্বুলেন্স</Link>
            <Link
              href="/blog"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              ব্লগ
            </Link>
            <Link
              href="/"
              className="text-sky-800 hover:text-sky-600 font-medium transition-colors"
            >
              যোগাযোগ
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {!loading && (user ? <><Link href="/account" className="max-w-32 truncate text-sm font-medium text-sky-800">{user.name || user.personalDetails?.name}</Link><Button variant="outline" onClick={logout}>লগআউট</Button></> : <><Button asChild variant="ghost" className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"><Link href="/login">লগইন</Link></Button><Button asChild className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6"><Link href="/signup">সাইন আপ</Link></Button></>)}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden min-h-11 min-w-11 p-2 rounded-lg text-sky-700 hover:bg-sky-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto py-4 border-t border-sky-100">
            <div className="flex flex-col space-y-1">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                হোম
              </Link>

              <Link
                href="/doctors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                ডাক্তার
              </Link>

              <Link
                href="/hospitals"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                হাসপাতাল
              </Link>

              <Link
                href="/blood-donors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                রক্তদাতা
              </Link>

              <Link href="/ambulance" onClick={() => setMobileMenuOpen(false)} className="text-sky-800 hover:text-sky-600 font-medium py-3">অ্যাম্বুলেন্স</Link>
              <Link href="/appointment" onClick={() => setMobileMenuOpen(false)} className="text-sky-800 hover:text-sky-600 font-medium py-3">অ্যাপয়েন্টমেন্ট</Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                ব্লগ
              </Link>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                যোগাযোগ
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-sky-100">
                {!loading && (user ? <><Link href="/account" onClick={() => setMobileMenuOpen(false)} className="py-2 font-medium text-sky-800">{user.name || user.personalDetails?.name}</Link><Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>লগআউট</Button></> : <><Button asChild variant="ghost" className="justify-start text-sky-700"><Link href="/login" onClick={() => setMobileMenuOpen(false)}>লগইন</Link></Button><Button asChild className="bg-sky-500 text-white"><Link href="/signup" onClick={() => setMobileMenuOpen(false)}>সাইন আপ</Link></Button></>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
