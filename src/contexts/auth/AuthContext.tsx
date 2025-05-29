'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from './authStore';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/auth/callback', '/confirm-email','/'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, checkSession } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Check session on mount and route changes
  useEffect(() => {
    const hasAuthCookie = document.cookie.includes('sb-'); // Supabase cookie prefix
    if (hasAuthCookie) {
      checkSession();
    } else {
      console.log(pathname);
      if (!publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  // Handle route protection
  // useEffect(() => {
  //   if (!loading) {
  //     if (!user && !publicRoutes.includes(pathname)) {
  //       router.push('/login');
  //     } else if (user && publicRoutes.includes(pathname)) {
  //       router.push('/tailor');
  //     }
  //   }
  // }, [user, loading, pathname, router]);

  return <>{children}</>;
} 