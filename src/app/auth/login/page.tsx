'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyPassword, getUserByEmailOrUsername, User } from '@/lib/auth-utils';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername.trim() || !password.trim()) {
      setError('กรุณากรอกอีเมล/ชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setLoading(true);

    try {
      const USERS_KEY = 'auth_users';
      const raw = localStorage.getItem(USERS_KEY);
      const users: User[] = raw ? JSON.parse(raw) : [];

      const user = getUserByEmailOrUsername(users, emailOrUsername);

      if (!user) {
        setError('ไม่พบบัญชี');
        setLoading(false);
        return;
      }

      if (!verifyPassword(password, user.passwordHash)) {
        setError('รหัสผ่านไม่ถูกต้อง');
        setLoading(false);
        return;
      }

      // Successful login
      login({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">🔐 เข้าสู่ระบบ</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              อีเมลหรือชื่อผู้ใช้
            </label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="อีเมลหรือชื่อผู้ใช้"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
          >
            {loading ? '⏳ กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">ยังไม่มีบัญชี?</p>
          <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </div>
  );
}
