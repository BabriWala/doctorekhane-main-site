"use client";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-sky-900">
              ডাক্তার এখানে
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
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
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-sky-700 hover:text-sky-900 hover:bg-sky-50"
            >
              লগইন
            </Button>
            <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-6">
              সাইন আপ
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-sky-700 hover:bg-sky-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <div className="md:hidden py-4 border-t border-sky-100">
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                হোম
              </Link>
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                ডাক্তার
              </Link>
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                হাসপাতাল
              </Link>
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                রক্তদাতা
              </Link>
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                ব্লগ
              </Link>
              <Link
                href="#"
                className="text-sky-800 hover:text-sky-600 font-medium py-2"
              >
                যোগাযোগ
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-sky-100">
                <Button variant="ghost" className="text-sky-700 justify-start">
                  লগইন
                </Button>
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                  সাইন আপ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
