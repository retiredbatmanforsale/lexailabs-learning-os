import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import { Eye, EyeOff } from 'lucide-react';

interface InviteInfo {
  email: string;
  name: string | null;
  organizationName: string;
}

function AcceptInviteContent() {
  const useDocusaurusContext = require('@docusaurus/useDocusaurusContext').default;
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:4000';

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setError('Invalid invitation link.');
      return;
    }

    fetch(`${apiUrl}/auth/invite-info?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Invalid invitation');
        setInviteInfo(data);
        if (data.name) setName(data.name);
      })
      .catch((err) => {
        setError(err.message || 'This invitation link is invalid or has expired.');
      })
      .finally(() => setIsLoading(false));
  }, [token, apiUrl]);

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

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiUrl}/auth/accept-invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login?verified=true';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        padding: '2rem',
      }}>
        <p style={{ color: 'var(--ifm-color-emphasis-600)' }}>Validating invitation...</p>
      </div>
    );
  }

  if (error && !inviteInfo) {
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
          <h2 style={{ marginBottom: '0.75rem' }}>Invalid Invitation</h2>
          <p style={{
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}>
            {error}
          </p>
          <a href="/login" className="button button--primary button--lg" style={{ width: '100%' }}>
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

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
          <h2 style={{ marginBottom: '0.75rem' }}>Account Created</h2>
          <p style={{
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}>
            Your account has been set up. Redirecting you to sign in...
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
        <h2 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
          Set Up Your Account
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)',
          fontSize: '0.9375rem',
          marginBottom: '1.5rem',
        }}>
          {inviteInfo?.organizationName}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={inviteInfo?.email || ''}
              readOnly
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                background: 'var(--ifm-color-emphasis-100)',
                color: 'var(--ifm-color-emphasis-600)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
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
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={{
                  width: '100%',
                  padding: '0.625rem 2.5rem 0.625rem 0.75rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '0.625rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                style={{
                  width: '100%',
                  padding: '0.625rem 2.5rem 0.625rem 0.75rem',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '0.625rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ color: 'var(--ifm-color-danger)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="button button--primary button--lg"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {isSubmitting ? 'Setting up...' : 'Continue'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', marginBottom: '0' }}>
          Already have an account?{' '}
          <a href="/login" style={{ fontWeight: 500 }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Layout title="Accept Invitation" description="Set up your Lex AI account">
      <BrowserOnly fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          Loading...
        </div>
      }>
        {() => <AcceptInviteContent />}
      </BrowserOnly>
    </Layout>
  );
}
