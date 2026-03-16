import React, { useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';

function ResetPasswordContent() {
  const useDocusaurusContext = require('@docusaurus/useDocusaurusContext').default;
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:4000';

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        padding: '2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderRadius: '1rem',
          background: 'var(--ifm-background-surface-color)',
          textAlign: 'center',
        }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Invalid Reset Link</h2>
          <p style={{
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <a href="/forgot-password" className="button button--primary button--lg" style={{ width: '100%', marginBottom: '1rem' }}>
            Request New Link
          </a>
          <p style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-500)', marginBottom: '0' }}>
            <a href="/login" style={{ fontWeight: 500 }}>Back to sign in</a>
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        padding: '2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderRadius: '1rem',
          background: 'var(--ifm-background-surface-color)',
          textAlign: 'center',
        }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Password Reset</h2>
          <p style={{
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}>
            Your password has been reset. You can now sign in with your new password.
          </p>
          <a href="/login" className="button button--primary button--lg" style={{ width: '100%' }}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '2rem',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '1rem',
        background: 'var(--ifm-background-surface-color)',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Reset Password</h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)',
          fontSize: '0.9375rem',
          marginBottom: '1.5rem',
        }}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                background: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                background: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'var(--ifm-color-danger)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="button button--primary button--lg"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', marginBottom: '0' }}>
          <a href="/login" style={{ fontWeight: 500 }}>Back to sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Layout title="Reset Password" description="Reset your Lex AI password">
      <BrowserOnly fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          Loading...
        </div>
      }>
        {() => <ResetPasswordContent />}
      </BrowserOnly>
    </Layout>
  );
}
