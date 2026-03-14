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
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaymentButton({ onSuccess, onError }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshTokens } = useAuth();
  const { siteConfig } = useDocusaurusContext();
  const razorpayKeyId = siteConfig.customFields?.razorpayKeyId as string;

  const handlePayment = async () => {
    if (!window.Razorpay) {
      onError?.('Payment system is loading. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      const orderData = await apiFetch<{
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
      }>('/payments/create-order', { method: 'POST' });

      const options = {
        key: orderData.keyId || razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Lex AI',
        description: 'Premium Access',
        order_id: orderData.orderId,
        prefill: {
          email: user?.email || '',
          name: user?.name || '',
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await apiFetch('/payments/verify', {
              method: 'POST',
              body: JSON.stringify(response),
            });

            // Refresh tokens to get updated hasAccess
            await refreshTokens();
            onSuccess?.();
          } catch (err: any) {
            onError?.(err.message || 'Payment verification failed');
          }
        },
        theme: {
          color: '#4f46e5',
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
      onError?.(err.message || 'Failed to create payment order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="button button--primary button--lg"
      style={{ minWidth: '200px' }}
    >
      {isLoading ? 'Processing...' : 'Subscribe Now'}
    </button>
  );
}
