'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Returns a click handler for course links that gates access behind auth.
 * - Not authenticated → redirect to /login?tab=register
 * - Authenticated but no access → redirect to /subscribe
 * - Authenticated with access → navigate to course URL
 */
export function useCourseLink() {
  const router = useRouter();
  const { isAuthenticated, hasAccess } = useAuth();

  const handleCourseClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isAuthenticated) {
        e.preventDefault();
        router.push('/login?tab=register');
        return;
      }
      if (!hasAccess) {
        e.preventDefault();
        router.push('/subscribe');
        return;
      }
      // User has access — let the link navigate normally
    },
    [isAuthenticated, hasAccess, router]
  );

  return { handleCourseClick, isAuthenticated, hasAccess };
}
