import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  initialEmail?: string;
}

export default function RegisterForm({
  onSubmit,
  isLoading,
  error,
  successMessage,
  initialEmail = '',
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(name, email, password);
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
      {successMessage && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--ifm-color-success-contrast-background)',
          color: 'var(--ifm-color-success-dark)',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}>
          {successMessage}
        </div>
      )}
      <div>
        <label htmlFor="register-name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Full Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Smith"
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
        <label htmlFor="register-email" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Email
        </label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Min. 8 characters"
            style={{
              width: '100%',
              padding: '0.625rem 2.5rem 0.625rem 0.75rem',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              background: 'var(--ifm-background-color)',
              color: 'var(--ifm-font-color-base)',
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
      <button
        type="submit"
        disabled={isLoading}
        className="button button--primary button--lg"
        style={{ width: '100%' }}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
