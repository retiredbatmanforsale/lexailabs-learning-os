import React, { useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
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
  const { siteConfig } = useDocusaurusContext();
  const clientId = siteConfig.customFields?.googleClientId as string;

  useEffect(() => {
    if (!clientId) return;

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => {
          if (response.credential) {
            onSuccess(response.credential);
          } else {
            onError?.();
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
      });
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    // Load Google Identity Services SDK
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.head.appendChild(script);

    return () => {
      // Cleanup: don't remove script as other components may use it
    };
  }, [clientId, onSuccess, onError]);

  if (!clientId) {
    return null;
  }

  return <div ref={buttonRef} style={{ display: 'flex', justifyContent: 'center' }} />;
}
