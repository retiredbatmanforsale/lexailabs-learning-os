import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import AuthGuard from '../components/AuthGuard';

function RouteProtector({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isCourseRoute = location.pathname.startsWith('/courses');

  if (isCourseRoute) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return <>{children}</>;
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <BrowserOnly
      fallback={<>{children}</>}
    >
      {() => (
        <AuthProvider>
          <RouteProtector>{children}</RouteProtector>
        </AuthProvider>
      )}
    </BrowserOnly>
  );
}
