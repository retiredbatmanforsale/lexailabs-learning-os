'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export default function ForgotPasswordPage() {
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navigation />
        <div className="flex-1 flex justify-center items-center min-h-[70vh] px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-serif text-neutral-900 mb-3">Check Your Email</h2>
            <p className="text-neutral-500 mb-6">
              If an account with that email exists, we&apos;ve sent a password reset link.
              Check your inbox and spam folder.
            </p>
            <Button asChild className="w-full mb-4">
              <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                Open Gmail
              </a>
            </Button>
            <p className="text-sm text-neutral-500">
              <Link href="/login" className="font-medium text-neutral-900 hover:underline">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="flex-1 flex justify-center items-center min-h-[70vh] px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">
          <h2 className="text-2xl font-serif text-neutral-900 text-center mb-2">Forgot Password</h2>
          <p className="text-center text-neutral-500 text-sm mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" loading={isLoading} className="w-full">
              Send Reset Link
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-neutral-500">
            <Link href="/login" className="font-medium text-neutral-900 hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
