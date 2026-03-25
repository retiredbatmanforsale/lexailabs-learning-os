'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/api';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import SubscriptionButton from '@/components/auth/SubscriptionButton';
import { Button } from '@/components/ui/button';

interface Plan {
  planType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  label: string;
  price: number;
  priceDisplay: string;
}

const PLAN_META: Record<string, { period: string; badge?: string; highlight?: boolean; icon: typeof Zap }> = {
  MONTHLY: { period: '/month', icon: Zap },
  QUARTERLY: { period: '/quarter', badge: 'Most Popular', highlight: true, icon: Star },
  YEARLY: { period: '/year', badge: 'Best Value', icon: Crown },
};

const FEATURES = [
  'All courses included',
  'Hands-on projects',
  'Community access',
  'Certificate of completion',
  'Mentor support',
  'New content updates',
];

const coursesUrl = process.env.NEXT_PUBLIC_COURSES_URL || '';

export default function SubscribePage() {
  const router = useRouter();
  const { isAuthenticated, hasAccess, isLoading: authLoading } = useAuth();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Record<string, unknown> | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    apiFetch<{ plans: Plan[] }>('/subscriptions/plans')
      .then((data) => setPlans(data.plans))
      .catch(() => {
        setPlans([
          { planType: 'MONTHLY', label: 'Monthly', price: 299, priceDisplay: '₹299' },
          { planType: 'QUARTERLY', label: 'Quarterly', price: 799, priceDisplay: '₹799' },
          { planType: 'YEARLY', label: 'Yearly', price: 2499, priceDisplay: '₹2,499' },
        ]);
      })
      .finally(() => setPlansLoading(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated && hasAccess) {
      apiFetch<{ subscription: Record<string, unknown> }>('/subscriptions/status')
        .then((data) => setSubscription(data.subscription))
        .catch(() => {});
    }
  }, [isAuthenticated, hasAccess]);

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    setCancelling(true);
    try {
      await apiFetch('/subscriptions/cancel', { method: 'POST' });
      setSubscription((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to cancel subscription';
      setPaymentError(message);
    } finally {
      setCancelling(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <Navigation />
        <div className="flex-1 flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
        <Footer />
      </>
    );
  }

  // Active subscription view
  if (isAuthenticated && hasAccess && subscription) {
    return (
      <>
        <Navigation />
        <div className="flex-1 max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-serif text-neutral-900 mb-3">You&apos;re Subscribed!</h1>
          <p className="text-neutral-500 mb-2">
            You have premium access. Enjoy all courses!
          </p>

          {subscription.status === 'active' && (
            <div className="mt-6 p-6 bg-neutral-50 rounded-2xl text-left space-y-2">
              <p className="text-sm text-neutral-600">
                <span className="font-medium">Plan:</span> {(subscription.planType as string) || 'Premium'}
              </p>
              {subscription.currentEnd ? (
                <p className="text-sm text-neutral-600">
                  <span className="font-medium">Next billing:</span>{' '}
                  {new Date(subscription.currentEnd as string).toLocaleDateString()}
                </p>
              ) : null}
              <button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="mt-4 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          )}

          <Button asChild size="lg" className="mt-8">
            <a href={`${coursesUrl}/courses/machine-learning/intro`}>
              Go to Courses
            </a>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  // Not logged in prompt
  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif text-neutral-900 mb-4">
            Start learning AI today
          </h1>
          <p className="text-neutral-500 mb-8">
            Sign in to view subscription plans and get access to all courses.
          </p>
          <Button asChild size="lg">
            <Link href="/login?redirect=/subscribe">Sign In to Subscribe</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  // Loading plans
  if (plansLoading) {
    return (
      <>
        <Navigation />
        <div className="flex-1 flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
        <Footer />
      </>
    );
  }

  // Pricing cards
  return (
    <>
      <Navigation />
      <div className="flex-1 max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            Choose Your Plan
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-3 leading-[1.1]">
            Start learning AI today
          </h1>
          <p className="text-lg text-neutral-500 max-w-lg mx-auto">
            Get full access to all courses, tutorials, and resources.
          </p>
        </div>

        {paymentError && (
          <div className="max-w-lg mx-auto mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center">
            {paymentError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const meta = PLAN_META[plan.planType] || { period: '', icon: Zap };
            const Icon = meta.icon;

            return (
              <div
                key={plan.planType}
                className={`relative bg-white rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 ${
                  meta.highlight
                    ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]'
                    : 'border border-neutral-100 hover:shadow-lg'
                }`}
              >
                {meta.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap ${
                      meta.highlight ? 'bg-blue-500' : 'bg-coral-500'
                    }`}
                  >
                    {meta.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-10 h-10 mx-auto mb-3 bg-neutral-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="text-xl font-serif text-neutral-900 mb-2">
                    {plan.label}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-blue-600">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-neutral-400">{meta.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <SubscriptionButton
                  planType={plan.planType}
                  onSuccess={() => {
                    window.location.href = `${coursesUrl}/courses/machine-learning/intro`;
                  }}
                  onError={(err) => setPaymentError(err)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
