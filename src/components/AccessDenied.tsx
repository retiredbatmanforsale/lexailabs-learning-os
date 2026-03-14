import React from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from '../hooks/useAuth';

export default function AccessDenied() {
  const { isAuthenticated, accessType, organizationName } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <h1>Sign in to access courses</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-600)', maxWidth: '500px' }}>
          This content requires authentication. Sign in or create an account to continue.
        </p>
        <Link
          to="/login"
          className="button button--primary button--lg"
          style={{ marginTop: '1rem' }}
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (accessType === 'institution') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <h1>You already have access!</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-600)' }}>
          You have access through <strong>{organizationName}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1>Unlock Premium Access</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-600)', maxWidth: '500px' }}>
        Get full access to all courses, tutorials, and resources with a one-time payment.
      </p>
      <Link
        to="/subscribe"
        className="button button--primary button--lg"
        style={{ marginTop: '1rem' }}
      >
        Subscribe Now
      </Link>
    </div>
  );
}
