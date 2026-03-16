import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory, useLocation } from '@docusaurus/router';

function LoginPageContent() {
  const { useAuth } = require('../hooks/useAuth');
  const GoogleSignInButton = require('../components/GoogleSignInButton').default;
  const LoginForm = require('../components/LoginForm').default;
  const RegisterForm = require('../components/RegisterForm').default;

  const [mode, setMode] = useState<'login' | 'register' | 'verify-email'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const { isAuthenticated, hasAccess, loginWithGoogle, loginWithEmail, register } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const rawRedirect = params.get('redirect');
  const redirect = (rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//'))
    ? rawRedirect
    : (hasAccess ? '/courses/machine-learning/intro' : '/subscribe');
  const verified = params.get('verified');
  const errorParam = params.get('error');

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
      history.push(redirect);
    }
  }, [isAuthenticated, redirect, history]);

  const handleGoogleSuccess = async (credential: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithGoogle(credential);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      if (err.data?.code === 'B2B_PREAPPROVED') {
        setPrefilledEmail(email);
        setMode('register');
        setError(null);
        setSuccessMessage(
          err.message || 'Your institution has pre-approved your access. Create an account to get started.'
        );
      } else {
        setError(err.message || 'Sign-in failed');
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
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'verify-email') {
    return (
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="w-full max-w-[480px] p-10 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)] text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center text-[2rem]">
            &#9993;
          </div>
          <h2 className="mb-3">Check Your Email</h2>
          <p className="text-[var(--ifm-color-emphasis-600)] text-base leading-relaxed mb-2">
            We've sent a verification link to
          </p>
          <p className="font-semibold text-[1.0625rem] text-[var(--ifm-font-color-base)] mb-6">
            {registeredEmail}
          </p>
          <p className="text-[var(--ifm-color-emphasis-500)] text-[0.9375rem] leading-relaxed mb-8">
            Click the verification link in the email to activate your account.
            If you don't see it, check your spam folder.
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
            Already verified?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode('login');
                setError(null);
                setSuccessMessage(null);
              }}
              className="font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-8">
      <div className="w-full max-w-[420px] p-8 border border-[var(--ifm-color-emphasis-200)] rounded-2xl bg-[var(--ifm-background-surface-color)]">
        <h2 className="text-center mb-6">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google sign-in failed')}
        />

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-1 border-t border-[var(--ifm-color-emphasis-200)]" />
          <span className="text-[var(--ifm-color-emphasis-500)] text-sm">or</span>
          <hr className="flex-1 border-t border-[var(--ifm-color-emphasis-200)]" />
        </div>

        {mode === 'login' ? (
          <>
            <LoginForm
              onSubmit={handleEmailLogin}
              isLoading={isLoading}
              error={error}
            />
            <p className="text-center mt-4 text-sm">
              Don't have an account?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('register');
                  setError(null);
                  setSuccessMessage(null);
                  setPrefilledEmail('');
                }}
                className="font-medium"
              >
                Create one
              </a>
            </p>
            <p className="text-center text-sm">
              <a href="/forgot-password" className="text-[var(--ifm-color-emphasis-500)]">
                Forgot password?
              </a>
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
            <p className="text-center mt-4 text-sm">
              Already have an account?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('login');
                  setError(null);
                  setSuccessMessage(null);
                  setPrefilledEmail('');
                }}
                className="font-medium"
              >
                Sign in
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Layout title="Sign In" description="Sign in to access Lex AI courses">
      <BrowserOnly fallback={
        <div className="flex justify-center items-center min-h-[70vh]">
          Loading...
        </div>
      }>
        {() => <LoginPageContent />}
      </BrowserOnly>
    </Layout>
  );
}
