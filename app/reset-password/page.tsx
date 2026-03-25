'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-[70vh] px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 text-center">
          <h2 className="text-2xl font-serif text-neutral-900 mb-3">Invalid Reset Link</h2>
          <p className="text-neutral-500 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Button asChild className="w-full mb-4">
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
          <p className="text-sm text-neutral-500">
            <Link href="/login" className="font-medium text-neutral-900 hover:underline">
              Back to sign in
            </Link>
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-[70vh] px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-serif text-neutral-900 mb-3">Password Reset</h2>
          <p className="text-neutral-500 mb-6">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">
        <h2 className="text-2xl font-serif text-neutral-900 text-center mb-2">Reset Password</h2>
        <p className="text-center text-neutral-500 text-sm mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" loading={isLoading} className="w-full">
            Reset Password
          </Button>
        </form>

        <p className="text-center mt-4 text-sm text-neutral-500">
          <Link href="/login" className="font-medium text-neutral-900 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={
        <div className="flex-1 flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
      <Footer />
    </>
  );
}
