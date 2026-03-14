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
  const redirect = params.get('redirect') || (hasAccess ? '/courses/machine-learning/intro' : '/subscribe');
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
          err.data.organizationName
            ? `Your institution (${err.data.organizationName}) has pre-approved your access. Create an account to get started.`
            : 'Your institution has pre-approved your access. Create an account to get started.'
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
            marginBottom: '0.5rem',
          }}>
            We've sent a verification link to
          </p>
          <p style={{
            fontWeight: 600,
            fontSize: '1.0625rem',
            color: 'var(--ifm-font-color-base)',
            marginBottom: '1.5rem',
          }}>
            {registeredEmail}
          </p>
          <p style={{
            color: 'var(--ifm-color-emphasis-500)',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}>
            Click the verification link in the email to activate your account.
            If you don't see it, check your spam folder.
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
            Already verified?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode('login');
                setError(null);
                setSuccessMessage(null);
              }}
              style={{ fontWeight: 500 }}
            >
              Sign in
            </a>
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
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>

        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google sign-in failed')}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0',
        }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--ifm-color-emphasis-200)' }} />
          <span style={{ color: 'var(--ifm-color-emphasis-500)', fontSize: '0.875rem' }}>or</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--ifm-color-emphasis-200)' }} />
        </div>

        {mode === 'login' ? (
          <>
            <LoginForm
              onSubmit={handleEmailLogin}
              isLoading={isLoading}
              error={error}
            />
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
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
                style={{ fontWeight: 500 }}
              >
                Create one
              </a>
            </p>
            <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>
              <a href="/forgot-password" style={{ color: 'var(--ifm-color-emphasis-500)' }}>
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
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
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
                style={{ fontWeight: 500 }}
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          Loading...
        </div>
      }>
        {() => <LoginPageContent />}
      </BrowserOnly>
    </Layout>
  );
}
