import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 bg-[var(--ifm-color-danger-contrast-background)] text-[var(--ifm-color-danger-dark)] rounded-lg text-sm">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="px-4 py-3 bg-[var(--ifm-color-success-contrast-background)] text-[var(--ifm-color-success-dark)] rounded-lg text-sm">
          {successMessage}
        </div>
      )}
      <div>
        <label htmlFor="register-name" className="block mb-1 font-medium">
          Full Name
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Smith"
          className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)]"
        />
      </div>
      <div>
        <label htmlFor="register-email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)]"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="Min. 8 characters"
          className="w-full px-3 py-2.5 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-base bg-[var(--ifm-background-color)] text-[var(--ifm-font-color-base)]"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="button button--primary button--lg w-full"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
