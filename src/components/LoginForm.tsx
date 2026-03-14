import React, { useState } from 'react';

interface Props {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function LoginForm({ onSubmit, isLoading, error }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--ifm-color-danger-contrast-background)',
          color: 'var(--ifm-color-danger-dark)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}>
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '0.625rem 0.75rem',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            background: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
          }}
        />
      </div>
      <div>
        <label htmlFor="login-password" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          style={{
            width: '100%',
            padding: '0.625rem 0.75rem',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            background: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="button button--primary button--lg"
        style={{ width: '100%' }}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
