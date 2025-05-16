'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ResumeKit</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/tailor" className="btn-secondary">
                  Tailor Resume
                </Link>
                <Link href="/kit" className="btn-primary">
                  My Kit
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="text-sm text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 