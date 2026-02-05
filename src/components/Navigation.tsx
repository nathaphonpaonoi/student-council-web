/**
 * ======================================================================
 * Navigation Component - เมนูนำทาง
 * ======================================================================
 * Component นี้แสดงเมนูนำทางหลักของเว็บไซต์
 * ประกอบด้วย:
 * - โลโก้ที่กลับไปหน้าแรก
 * - Desktop menu (แสดงเมนูแนวนอน)
 * - Mobile menu (hamburger menu สำหรับมือถือ)
 * - Auth buttons (เข้าสู่ระบบ/สมัคร/ออกจากระบบ) ที่มุมขวาบน
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
  // state สำหรับเปิด/ปิด mobile menu เมื่อใช้โทรศัพท์
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout, isLoggedIn } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-white font-bold text-2xl">🏫 สภานักเรียน</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              หน้าแรก
            </Link>
            <Link
              href="/academics"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              วิชาการ
            </Link>
            <Link
              href="/accounting"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              บัญชี
            </Link>
            <Link
              href="/activities"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              กิจกรรม
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              ติดต่อเรา
            </Link>
            {/* ลิงก์ไปหน้าเกี่ยวกับเรา */}
            <Link
              href="/about"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              เกี่ยวกับเรา
            </Link>
          </div>

          {/* Auth Section - Top Right */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <span className="text-white font-medium">👤 {currentUser?.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition font-medium text-sm"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-white text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition font-medium text-sm"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition font-medium text-sm"
                >
                  สมัคร
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-blue-200 transition ml-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              หน้าแรก
            </Link>
            <Link
              href="/academics"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              วิชาการ
            </Link>
            <Link
              href="/accounting"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              บัญชี
            </Link>
            <Link
              href="/activities"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              กิจกรรม
            </Link>
            <Link
              href="/contact"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              ติดต่อเรา
            </Link>
            {/* ลิงก์ไปหน้าเกี่ยวกับเรา (Mobile) */}
            <Link
              href="/about"
              className="block text-white hover:text-blue-200 transition font-medium py-2"
            >
              เกี่ยวกับเรา
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
