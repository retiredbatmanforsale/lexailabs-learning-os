'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/api';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: Record<string, unknown>) => void) => void;
    };
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
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

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
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Subscription verification failed';
            onError?.(message);
          }
        },
        modal: {
          ondismiss: () => {
            apiFetch('/subscriptions/cancel-created', {
              method: 'POST',
              body: JSON.stringify({ subscriptionId: data.subscriptionId }),
            }).catch(() => {});
          },
        },
        theme: {
          color: '#3b82f6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: Record<string, unknown>) => {
        const error = response.error as Record<string, unknown> | undefined;
        onError?.(
          (error?.description as string) || 'Payment failed. Please try again.'
        );
      });
      razorpay.open();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create subscription';
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      loading={isLoading}
      className="w-full"
    >
      Subscribe
    </Button>
  );
}
