'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPublic } from '@/lib/auth-utils';

interface AuthContextType {
  currentUser: UserPublic | null;
  login: (user: UserPublic) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserPublic | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load auth user', err);
    }
  }, []);

  const login = (user: UserPublic) => {
    setCurrentUser(user);
    localStorage.setItem('auth_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isLoggedIn: currentUser !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
