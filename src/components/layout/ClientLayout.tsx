'use client';

import { AuthProvider } from '@/contexts/auth/AuthContext';
import Navbar from '@/components/common/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
} 