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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 bg-[var(--ifm-color-danger-contrast-background)] text-[var(--ifm-color-danger-dark)] rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)]"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)]"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="button button--primary button--lg w-full"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
