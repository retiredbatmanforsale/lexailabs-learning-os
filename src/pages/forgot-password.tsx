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
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="w-full max-w-[480px] p-10 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)] text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center text-[2rem]">
            &#9993;
          </div>
          <h2 className="mb-3">Check Your Email</h2>
          <p className="text-[var(--ifm-color-emphasis-600)] text-base leading-relaxed mb-6">
            If an account with that email exists, we've sent a password reset link.
            Check your inbox and spam folder.
          </p>
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--lg w-full inline-flex items-center justify-center gap-2 mb-4"
          >
            Open Gmail &#8599;
          </a>
          <p className="text-sm text-[var(--ifm-color-emphasis-500)] mb-0">
            <a href="/login" className="font-medium">Back to sign in</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-8">
      <div className="w-full max-w-[420px] p-8 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)]">
        <h2 className="text-center mb-2">Forgot Password</h2>
        <p className="text-center text-[var(--ifm-color-emphasis-600)] text-[0.9375rem] mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1.5 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)] box-border"
            />
          </div>

          {error && (
            <p className="text-[var(--ifm-color-danger)] text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="button button--primary button--lg w-full mb-4"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-sm mb-0">
          <a href="/login" className="font-medium">Back to sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Layout title="Forgot Password" description="Reset your Lex AI password">
      <BrowserOnly fallback={
        <div className="flex justify-center items-center min-h-[70vh]">
          Loading...
        </div>
      }>
        {() => <ForgotPasswordContent />}
      </BrowserOnly>
    </Layout>
  );
}
