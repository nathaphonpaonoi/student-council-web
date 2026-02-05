/**
 * ======================================================================
 * Navigation Component - เมนูนำทาง
 * ======================================================================
 * Component นี้แสดงเมนูนำทางหลักของเว็บไซต์
 * ประกอบด้วย:
 * - โลโก้ที่กลับไปหน้าแรก
 * - Desktop menu (แสดงเมนูแนวนอน)
 * - Mobile menu (Slide-in modal menu สำหรับมือถือ)
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

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-950 shadow-2xl relative mb-2">
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
                <span className="text-white font-medium hidden sm:inline">👤 {currentUser?.username}</span>
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
                  className="bg-white text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition font-medium text-sm hidden sm:inline-block"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition font-medium text-sm hidden sm:inline-block"
                >
                  สมัคร
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-blue-200 transition"
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
      </div>

      {/* Mobile Menu - Overlay Modal */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Modal */}
          <div className="fixed top-16 left-0 right-0 bg-blue-700 border-b-4 border-blue-900 shadow-2xl z-50 md:hidden max-h-96 overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                🏠 หน้าแรก
              </Link>
              <Link
                href="/academics"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                📚 วิชาการ
              </Link>
              <Link
                href="/accounting"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                💰 บัญชี
              </Link>
              <Link
                href="/activities"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                🎉 กิจกรรม
              </Link>
              <Link
                href="/contact"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                📞 ติดต่อเรา
              </Link>
              <Link
                href="/about"
                onClick={handleMenuItemClick}
                className="block text-white hover:bg-blue-600 transition font-medium py-3 px-3 rounded"
              >
                ℹ️ เกี่ยวกับเรา
              </Link>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-blue-600 pt-3 mt-3">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="text-white font-medium py-2 px-3">
                      👤 {currentUser?.username}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        handleMenuItemClick();
                      }}
                      className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded transition font-medium"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      onClick={handleMenuItemClick}
                      className="block bg-white text-blue-600 hover:bg-blue-100 px-3 py-3 rounded transition font-medium text-center"
                    >
                      เข้าสู่ระบบ
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={handleMenuItemClick}
                      className="block bg-green-500 hover:bg-green-600 text-white px-3 py-3 rounded transition font-medium text-center"
                    >
                      สมัครสมาชิก
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
