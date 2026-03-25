'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Password
        </label>
        <Input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" loading={isLoading} className="w-full">
        Sign In
      </Button>

      <p className="text-center text-sm text-neutral-500">
        <Link href="/forgot-password" className="hover:text-neutral-900 transition-colors">
          Forgot password?
        </Link>
      </p>
    </form>
  );
}
