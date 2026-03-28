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
      e.preventDefault();
      if (!isAuthenticated) {
        router.push('/login?tab=register');
        return;
      }
      if (!hasAccess) {
        router.push('/subscribe');
        return;
      }
      // Full-page navigation so the server-side rewrite proxies to Docusaurus
      window.location.href = href;
    },
    [isAuthenticated, hasAccess, router]
  );

  return { handleCourseClick, isAuthenticated, hasAccess };
}
