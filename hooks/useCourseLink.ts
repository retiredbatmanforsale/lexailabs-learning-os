'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const REFRESH_TOKEN_KEY = 'lexai_refresh_token';

/**
 * Returns a click handler for course links that gates access behind auth.
 * - Not authenticated → redirect to /login?tab=register
 * - Authenticated but no access → redirect to /subscribe
 * - Authenticated with access → redirect to course URL with JWT tokens
 */
export function useCourseLink() {
  const router = useRouter();
  const { isAuthenticated, hasAccess, getAccessToken } = useAuth();

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

      // Append auth tokens to the course URL for cross-domain auth
      const token = getAccessToken();
      const rt = localStorage.getItem(REFRESH_TOKEN_KEY);
      const url = new URL(href, window.location.origin);
      if (token) url.searchParams.set('token', token);
      if (rt) url.searchParams.set('rt', rt);

      window.location.href = url.toString();
    },
    [isAuthenticated, hasAccess, getAccessToken, router]
  );

  return { handleCourseClick, isAuthenticated, hasAccess };
}
