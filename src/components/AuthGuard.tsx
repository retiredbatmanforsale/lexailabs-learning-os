import React from 'react';
import { useAuth } from '../hooks/useAuth';
import BrowserOnly from '@docusaurus/BrowserOnly';
import AccessDenied from './AccessDenied';

interface Props {
  children: React.ReactNode;
}

function AuthGuardInner({ children }: Props) {
  const { isAuthenticated, hasAccess, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-500)' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !hasAccess) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}

export default function AuthGuard({ children }: Props) {
  return (
    <BrowserOnly fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-500)' }}>
          Loading...
        </div>
      </div>
    }>
      {() => <AuthGuardInner>{children}</AuthGuardInner>}
    </BrowserOnly>
  );
}
