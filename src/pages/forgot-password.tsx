import React, { useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

function ForgotPasswordContent() {
  const useDocusaurusContext = require('@docusaurus/useDocusaurusContext').default;
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:4000';

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
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
          maxWidth: '480px',
          padding: '2.5rem',
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderRadius: '1rem',
          background: 'var(--ifm-background-surface-color)',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            background: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
          }}>
            &#9993;
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Check Your Email</h2>
          <p style={{
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}>
            If an account with that email exists, we've sent a password reset link.
            Check your inbox and spam folder.
          </p>
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--lg"
            style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}
          >
            Open Gmail &#8599;
          </a>
          <p style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-500)', marginBottom: '0' }}>
            <a href="/login" style={{ fontWeight: 500 }}>Back to sign in</a>
          </p>
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
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Forgot Password</h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)',
          fontSize: '0.9375rem',
          marginBottom: '1.5rem',
        }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', marginBottom: '0' }}>
          <a href="/login" style={{ fontWeight: 500 }}>Back to sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Layout title="Forgot Password" description="Reset your Lex AI password">
      <BrowserOnly fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          Loading...
        </div>
      }>
        {() => <ForgotPasswordContent />}
      </BrowserOnly>
    </Layout>
  );
}
