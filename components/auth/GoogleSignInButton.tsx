'use client';

import { useEffect, useRef, useCallback } from 'react';

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

export default function GoogleSignInButton({ onSuccess, onError }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const initializedRef = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Keep refs up to date without triggering re-initialization
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  const initializeGoogle = useCallback(() => {
    if (!window.google || !buttonRef.current || initializedRef.current) return;

    initializedRef.current = true;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: { credential: string }) => {
        if (response.credential) {
          onSuccessRef.current(response.credential);
        } else {
          onErrorRef.current?.();
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      width: 350,
      text: 'signin_with',
    });
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return;

    if (window.google) {
      initializeGoogle();
      return;
    }

    // Only load the script if it hasn't been loaded yet
    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    }
  }, [clientId, initializeGoogle]);

  if (!clientId) {
    return null;
  }

  return <div ref={buttonRef} className="flex justify-center" />;
}
