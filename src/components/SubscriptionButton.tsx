import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '../hooks/useAuth';
import { apiFetch } from '../services/api';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface Props {
  planType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function SubscriptionButton({ planType, onSuccess, onError }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshTokens } = useAuth();
  const { siteConfig } = useDocusaurusContext();
  const razorpayKeyId = siteConfig.customFields?.razorpayKeyId as string;

  const handleSubscribe = async () => {
    if (!window.Razorpay) {
      onError?.('Payment system is loading. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiFetch<{
        subscriptionId: string;
        keyId: string;
      }>('/subscriptions/create', {
        method: 'POST',
        body: JSON.stringify({ planType }),
      });

      const options = {
        key: data.keyId || razorpayKeyId,
        subscription_id: data.subscriptionId,
        name: 'Lex AI',
        description: `${planType.charAt(0) + planType.slice(1).toLowerCase()} Subscription`,
        prefill: {
          email: user?.email || '',
          name: user?.name || '',
        },
        handler: async (response: {
          razorpay_subscription_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await apiFetch('/subscriptions/verify', {
              method: 'POST',
              body: JSON.stringify(response),
            });

            await refreshTokens();
            onSuccess?.();
          } catch (err: any) {
            onError?.(err.message || 'Subscription verification failed');
          }
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        onError?.(
          response.error?.description || 'Payment failed. Please try again.'
        );
      });
      razorpay.open();
    } catch (err: any) {
      onError?.(err.message || 'Failed to create subscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0.75rem 1.75rem',
        background: isLoading ? '#93c5fd' : '#3b82f6',
        color: '#ffffff',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '0.75rem',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s ease',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
      onMouseEnter={(e) => {
        if (!isLoading) (e.target as HTMLButtonElement).style.background = '#2563eb';
      }}
      onMouseLeave={(e) => {
        if (!isLoading) (e.target as HTMLButtonElement).style.background = '#3b82f6';
      }}
    >
      {isLoading ? 'Processing...' : 'Subscribe'}
    </button>
  );
}
