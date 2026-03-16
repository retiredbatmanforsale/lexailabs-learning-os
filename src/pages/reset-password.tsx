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
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="w-full max-w-[420px] p-8 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)] text-center">
          <h2 className="mb-3">Invalid Reset Link</h2>
          <p className="text-[var(--ifm-color-emphasis-600)] text-base leading-relaxed mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <a href="/forgot-password" className="button button--primary button--lg w-full mb-4">
            Request New Link
          </a>
          <p className="text-sm text-[var(--ifm-color-emphasis-500)] mb-0">
            <a href="/login" className="font-medium">Back to sign in</a>
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
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="w-full max-w-[420px] p-8 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)] text-center">
          <h2 className="mb-3">Password Reset</h2>
          <p className="text-[var(--ifm-color-emphasis-600)] text-base leading-relaxed mb-6">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <a href="/login" className="button button--primary button--lg w-full">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-8">
      <div className="w-full max-w-[420px] p-8 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)]">
        <h2 className="text-center mb-2">Reset Password</h2>
        <p className="text-center text-[var(--ifm-color-emphasis-600)] text-[0.9375rem] mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1.5 text-sm font-medium">
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
              className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)] box-border"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1.5 text-sm font-medium">
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
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-center text-sm mb-0">
          <a href="/login" className="font-medium">Back to sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Layout title="Reset Password" description="Reset your Lex AI password">
      <BrowserOnly fallback={
        <div className="flex justify-center items-center min-h-[70vh]">
          Loading...
        </div>
      }>
        {() => <ResetPasswordContent />}
      </BrowserOnly>
    </Layout>
  );
}
