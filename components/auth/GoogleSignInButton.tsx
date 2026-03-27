'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

interface Props {
  onSuccess: (credential: string) => void;
  onError?: () => void;
}

// Module-level state so initialize() is only called once across all mounts
let gsiInitialized = false;
let gsiCallbackRef: {
  onSuccess: (credential: string) => void;
  onError?: () => void;
} | null = null;

function ensureGsiInitialized(clientId: string) {
  if (gsiInitialized || !window.google) return;
  gsiInitialized = true;

  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: (response: { credential: string }) => {
      if (response.credential) {
        gsiCallbackRef?.onSuccess(response.credential);
      } else {
        gsiCallbackRef?.onError?.();
      }
    },
  });
}

export default function GoogleSignInButton({ onSuccess, onError }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Always keep the module-level callback ref pointing to the latest props
  useEffect(() => {
    gsiCallbackRef = { onSuccess, onError };
    return () => {
      gsiCallbackRef = null;
    };
  }, [onSuccess, onError]);

  useEffect(() => {
    if (!clientId || !buttonRef.current) return;

    const renderButton = () => {
      if (!window.google || !buttonRef.current) return;
      ensureGsiInitialized(clientId);
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 350,
        text: 'signin_with',
      });
    };

    if (window.google) {
      renderButton();
      return;
    }

    // Only load the script if it hasn't been loaded yet
    const existing = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );
    if (existing) {
      // Script exists but hasn't loaded yet — wait for it
      existing.addEventListener('load', renderButton);
      return () => existing.removeEventListener('load', renderButton);
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = renderButton;
    document.head.appendChild(script);
  }, [clientId]);

  if (!clientId) {
    return null;
  }

  return <div ref={buttonRef} className="flex justify-center" />;
}
