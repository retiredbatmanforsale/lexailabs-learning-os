'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Crown, Star, Zap, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { COURSES_URL } from '@/lib/utils';
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

const PLAN_META: Record<
  string,
  {
    period: string;
    periodShort: string;
    badge?: string;
    highlight?: boolean;
    icon: typeof Zap;
    monthlyBreakdown?: (price: number) => string;
    savings?: string;
  }
> = {
  MONTHLY: {
    period: 'per month',
    periodShort: '/mo',
    icon: Zap,
  },
  QUARTERLY: {
    period: 'per quarter',
    periodShort: '/qtr',
    badge: 'Most Popular',
    highlight: true,
    icon: Star,
    monthlyBreakdown: (price: number) =>
      `₹${Math.round(price / 3).toLocaleString('en-IN')}/mo`,
    savings: 'Save ~11%',
  },
  YEARLY: {
    period: 'per year',
    periodShort: '/yr',
    badge: 'Best Value',
    icon: Crown,
    monthlyBreakdown: (price: number) =>
      `₹${Math.round(price / 12).toLocaleString('en-IN')}/mo`,
    savings: 'Save ~30%',
  },
};

const FEATURES = [
  'Full access to all 12 courses',
  'Hands-on projects & worksheets',
  'Private community access',
  'Certificate of completion',
  'Mentor support & feedback',
  'New courses as they launch',
];

const defaultCourseRedirect = `${COURSES_URL}/courses/tracks/ai-for-leaders/`;

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
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
        <Footer />
      </div>
    );
  }

  // Active subscription view
  if (isAuthenticated && hasAccess && subscription) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div className="fixed inset-0 bg-gradient-coral" />
        <div className="fixed inset-0 grain" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <div className="flex-1 flex items-center justify-center px-4 py-16 pt-28">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-serif text-neutral-900 mb-3">You&apos;re Subscribed!</h1>
              <p className="text-neutral-500 mb-6">
                You have premium access to all courses.
              </p>

              {subscription.status === 'active' && (
                <div className="p-5 bg-neutral-50 rounded-2xl text-left space-y-2 mb-6">
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Plan:</span>{' '}
                    {(subscription.planType as string) || 'Premium'}
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
                    className="mt-3 text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                  </button>
                </div>
              )}

              <Button asChild size="lg" className="w-full rounded-full">
                <a href={defaultCourseRedirect}>
                  Go to Courses
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Not logged in prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div className="fixed inset-0 bg-gradient-coral" />
        <div className="fixed inset-0 grain" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <div className="flex-1 flex items-center justify-center px-4 py-16 pt-28">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-10 text-center">
              <h1 className="text-3xl font-serif text-neutral-900 mb-4">
                Start learning AI today
              </h1>
              <p className="text-neutral-500 mb-8">
                Sign in to view subscription plans and get access to all courses.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/login?redirect=/subscribe">Sign In to Subscribe</Link>
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Loading plans
  if (plansLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex justify-center items-center min-h-[70vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        </div>
        <Footer />
      </div>
    );
  }

  // ── Pricing cards ──
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 bg-gradient-coral" />
      <div className="fixed inset-0 grain" />
      <div className="fixed top-20 left-1/4 w-72 h-72 bg-coral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 pt-28">
          {/* Header */}
          <div className="text-center mb-12 max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-sm text-neutral-600 rounded-full text-xs font-medium uppercase tracking-wider mb-5">
              Simple Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-neutral-900 mb-4 leading-[1.1]">
              One plan,{' '}
              <span className="italic text-blue-500">full access.</span>
            </h1>
            <p className="text-lg text-neutral-500 leading-relaxed">
              Every plan includes all courses, projects, community, and mentor support. Pick the duration that works for you.
            </p>
          </div>

          {paymentError && (
            <div className="max-w-lg w-full mb-6 p-3.5 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100">
              {paymentError}
            </div>
          )}

          {/* Cards */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 md:items-end">
            {plans.map((plan) => {
              const meta = PLAN_META[plan.planType] || {
                period: '',
                periodShort: '',
                icon: Zap,
              };
              const Icon = meta.icon;
              const isHighlighted = meta.highlight;

              return (
                <div
                  key={plan.planType}
                  className={`relative bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col transition-all duration-300 ${
                    isHighlighted
                      ? 'border-2 border-blue-500 shadow-xl shadow-blue-500/10 md:scale-105 md:-my-4 z-10'
                      : 'border border-neutral-200/60 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Badge */}
                  {meta.badge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-semibold text-white whitespace-nowrap ${
                        isHighlighted ? 'bg-blue-500' : 'bg-coral-500'
                      }`}
                    >
                      {meta.badge}
                    </div>
                  )}

                  <div className="p-7 md:p-8 flex flex-col flex-1">
                    {/* Plan name + icon */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isHighlighted
                            ? 'bg-blue-50 text-blue-500'
                            : 'bg-neutral-50 text-neutral-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {plan.label}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-5xl font-bold tracking-tight ${
                            isHighlighted ? 'text-blue-600' : 'text-neutral-900'
                          }`}
                        >
                          {plan.priceDisplay}
                        </span>
                        <span className="text-neutral-400 text-sm font-medium">
                          {meta.periodShort}
                        </span>
                      </div>
                      {meta.monthlyBreakdown && (
                        <p className="text-sm text-neutral-400 mt-1.5">
                          {meta.monthlyBreakdown(plan.price)} billed{' '}
                          {plan.planType === 'QUARTERLY' ? 'quarterly' : 'annually'}
                          {meta.savings && (
                            <span className="ml-1.5 text-green-600 font-medium">
                              &middot; {meta.savings}
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {FEATURES.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-neutral-600"
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              isHighlighted ? 'text-blue-500' : 'text-green-500'
                            }`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <SubscriptionButton
                      planType={plan.planType}
                      onSuccess={() => {
                        window.location.href = defaultCourseRedirect;
                      }}
                      onError={(err) => setPaymentError(err)}
                      variant={isHighlighted ? 'highlighted' : 'default'}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-neutral-400 text-xs">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure payments via Razorpay</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <span>Cancel anytime</span>
            <span className="hidden sm:inline">·</span>
            <span>Instant access after payment</span>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
