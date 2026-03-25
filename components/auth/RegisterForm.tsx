'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-sm">
          {successMessage}
        </div>
      )}

      <div>
        <label htmlFor="reg-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Full Name
        </label>
        <Input
          id="reg-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Email
        </label>
        <Input
          id="reg-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Password
        </label>
        <Input
          id="reg-password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" loading={isLoading} className="w-full">
        Create Account
      </Button>
    </form>
  );
}
