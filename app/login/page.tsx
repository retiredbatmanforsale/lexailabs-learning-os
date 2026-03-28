'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, hasAccess, loginWithGoogle, loginWithEmail, register } = useAuth();

  const tabParam = searchParams.get('tab');
  const [mode, setMode] = useState<'login' | 'register' | 'verify-email'>(
    tabParam === 'register' ? 'register' : 'login'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Sync mode with URL tab parameter changes (only when tabParam changes)
  useEffect(() => {
    if (tabParam === 'register') {
      setMode((prev) => (prev === 'verify-email' ? prev : 'register'));
    } else if (tabParam === null) {
      setMode((prev) => (prev === 'verify-email' ? prev : 'login'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam]);

  const rawRedirect = searchParams.get('redirect');
  const redirect =
    rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : hasAccess
        ? '/courses/tracks/ai-for-leaders/'
        : '/subscribe';

  const verified = searchParams.get('verified');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (verified === 'true') {
      setSuccessMessage('Email verified! You can now sign in.');
    }
    if (errorParam === 'invalid_token') {
      setError('Invalid or expired verification link.');
    }
    if (errorParam === 'token_expired') {
      setError('Verification link has expired. Please register again.');
    }
  }, [verified, errorParam]);

  useEffect(() => {
    if (isAuthenticated) {
      if (redirect.startsWith('http') || redirect.startsWith('/courses')) {
        // Full-page navigation for external URLs and course paths (served via rewrite)
        window.location.href = redirect;
      } else {
        router.push(redirect);
      }
    }
  }, [isAuthenticated, redirect, router]);

  const handleGoogleSuccess = async (credential: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithGoogle(credential);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: unknown) {
      const apiErr = err as { data?: { code?: string }; message?: string };
      if (apiErr.data?.code === 'B2B_PREAPPROVED') {
        setPrefilledEmail(email);
        setMode('register');
        setError(null);
        setSuccessMessage(
          apiErr.message || 'Your institution has pre-approved your access. Create an account to get started.'
        );
      } else {
        setError(apiErr.message || 'Sign-in failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
      setRegisteredEmail(email);
      setMode('verify-email');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'verify-email') {
    return (
      <div className="flex-1 flex justify-center items-center min-h-[80vh] px-4 py-12 pt-28">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-serif text-neutral-900 mb-3">Check Your Email</h2>
          <p className="text-neutral-500 mb-1">We&apos;ve sent a verification link to</p>
          <p className="font-semibold text-neutral-900 mb-4">{registeredEmail}</p>
          <p className="text-sm text-neutral-400 mb-8">
            Click the verification link in the email to activate your account.
            If you don&apos;t see it, check your spam folder.
          </p>
          <Button asChild className="w-full mb-4">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
              Open Gmail
            </a>
          </Button>
          <p className="text-sm text-neutral-500">
            Already verified?{' '}
            <button
              onClick={() => { setMode('login'); setError(null); setSuccessMessage(null); }}
              className="font-medium text-neutral-900 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center min-h-[80vh] px-4 py-12 pt-28">
      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-neutral-900 mb-2">
            {mode === 'login' ? 'Welcome back' : 'Get started'}
          </h2>
          <p className="text-sm text-neutral-500">
            {mode === 'login'
              ? 'Sign in to continue your learning journey'
              : 'Create your account to start learning AI'}
          </p>
        </div>

        {successMessage && mode === 'login' && (
          <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-xl text-sm">
            {successMessage}
          </div>
        )}

        {/* Google Sign-In */}
        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google sign-in failed')}
        />

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <hr className="flex-1 border-neutral-200" />
          <span className="text-neutral-400 text-xs uppercase tracking-wider">or</span>
          <hr className="flex-1 border-neutral-200" />
        </div>

        {/* Forms */}
        {mode === 'login' ? (
          <>
            <LoginForm
              onSubmit={handleEmailLogin}
              isLoading={isLoading}
              error={error}
            />
            <p className="text-center mt-6 text-sm text-neutral-500">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => { setMode('register'); setError(null); setSuccessMessage(null); setPrefilledEmail(''); }}
                className="font-medium text-neutral-900 hover:underline"
              >
                Create one
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              error={error}
              successMessage={successMessage}
              initialEmail={prefilledEmail}
            />
            <p className="text-center mt-6 text-sm text-neutral-500">
              Already have an account?{' '}
              <button
                onClick={() => { setMode('login'); setError(null); setSuccessMessage(null); setPrefilledEmail(''); }}
                className="font-medium text-neutral-900 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background — coral gradient matching hero */}
      <div className="fixed inset-0 bg-gradient-coral" />
      <div className="fixed inset-0 grain" />
      <div className="fixed top-20 left-1/4 w-72 h-72 bg-coral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <Suspense fallback={
          <div className="flex-1 flex justify-center items-center min-h-[80vh]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
          </div>
        }>
          <LoginContent />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
