import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';

const FEATURES = [
  'All Machine Learning courses',
  'All Deep Learning courses',
  'Language Models & LLM courses',
  'AI for Leaders track',
  'Interactive tutorials',
  'Regular content updates',
];

const PLAN_META: Record<string, { badge?: string; highlight?: boolean; period: string }> = {
  MONTHLY: { period: '/month' },
  QUARTERLY: { badge: 'Most Popular', highlight: true, period: '/3 months' },
  YEARLY: { badge: 'Best Value', period: '/year' },
};

interface PlanFromAPI {
  planType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  label: string;
  price: number;
  priceDisplay: string;
  interval: string;
}

function SubscribePageContent() {
  const { useAuth } = require('../hooks/useAuth');
  const SubscriptionButton = require('../components/SubscriptionButton').default;
  const { apiFetch } = require('../services/api');
  const useDocusaurusContext = require('@docusaurus/useDocusaurusContext').default;

  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:4000';

  const { isAuthenticated, hasAccess, accessType, organizationName, isLoading, refreshTokens } = useAuth();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [plans, setPlans] = useState<PlanFromAPI[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push('/login?redirect=/subscribe');
    }
  }, [isLoading, isAuthenticated, history]);

  // Fetch plans directly from backend URL (no auth needed, avoids race with setApiUrl)
  useEffect(() => {
    fetch(`${apiUrl}/subscriptions/plans`)
      .then((res) => res.json())
      .then((data) => setPlans(data.plans))
      .catch(() => {})
      .finally(() => setPlansLoading(false));
  }, [apiUrl]);

  useEffect(() => {
    if (isAuthenticated && (accessType === 'subscription' || accessType === 'premium')) {
      apiFetch('/subscriptions/status')
        .then((data: any) => setSubscriptionInfo(data.subscription))
        .catch(() => {});
    }
  }, [isAuthenticated, accessType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-[#666]">
        Loading...
      </div>
    );
  }

  // ─── Subscription management view ────────────────────────────
  if (hasAccess && accessType === 'subscription' && subscriptionInfo) {
    const handleCancel = async () => {
      if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of the current billing period.')) {
        return;
      }
      setCancelling(true);
      try {
        await apiFetch('/subscriptions/cancel', { method: 'POST' });
        await refreshTokens();
        setSubscriptionInfo((prev: any) => ({
          ...prev,
          cancelledAt: new Date().toISOString(),
        }));
      } catch (err: any) {
        setPaymentError(err.message || 'Failed to cancel subscription');
      } finally {
        setCancelling(false);
      }
    };

    const planLabel = subscriptionInfo.planType
      ? subscriptionInfo.planType.charAt(0) + subscriptionInfo.planType.slice(1).toLowerCase()
      : 'Subscription';

    return (
      <div className="flex justify-center items-center min-h-[70vh] p-8">
        <div className="w-full max-w-[480px] p-10 border border-[#f0f0f0] rounded-xl bg-white text-center">
          <h2 className="font-serif font-normal text-[2rem] text-[#141414] mb-6">
            Your Subscription
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-sm font-medium mb-4">
            {planLabel} Plan
          </div>

          <p className="text-[#666] text-[15px] mb-1">
            Status: <strong className="text-[#141414]">{subscriptionInfo.status}</strong>
          </p>

          {subscriptionInfo.currentPeriodEnd && (
            <p className="text-[#666] text-[15px] mb-6">
              {subscriptionInfo.cancelledAt ? 'Access until: ' : 'Next billing date: '}
              <strong className="text-[#141414]">
                {new Date(subscriptionInfo.currentPeriodEnd).toLocaleDateString()}
              </strong>
            </p>
          )}

          {paymentError && (
            <div className="px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
              {paymentError}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => history.push('/courses/machine-learning/intro')}
              className="inline-flex items-center justify-center px-7 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl border-none cursor-pointer transition-colors"
            >
              Go to Courses
            </button>
            {!subscriptionInfo.cancelledAt && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="inline-flex items-center justify-center px-7 py-3 bg-transparent text-red-600 font-semibold rounded-xl border border-red-300 hover:bg-red-50 cursor-pointer transition-colors disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Already has access (legacy premium or institution) ──────
  if (hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
        <h1 className="font-serif font-normal text-[2.5rem] text-[#141414] mb-3">
          You already have access!
        </h1>
        {accessType === 'institution' ? (
          <p className="text-lg text-[#666]">
            You have access through <strong className="text-[#141414]">{organizationName}</strong>.
          </p>
        ) : (
          <p className="text-lg text-[#666]">
            You have premium access. Enjoy all courses!
          </p>
        )}
        <button
          onClick={() => history.push('/courses/machine-learning/intro')}
          className="inline-flex items-center justify-center gap-2 mt-6 px-7 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl border-none cursor-pointer transition-colors"
        >
          Go to Courses
        </button>
      </div>
    );
  }

  // ─── Pricing cards view ──────────────────────────────────────
  if (plansLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-[#666]">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="p-16 md:p-8 max-w-[1100px] mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-sm font-medium mb-5">
          Choose Your Plan
        </div>
        <h1 className="font-serif font-normal text-5xl md:text-4xl text-[#141414] mb-3 leading-tight">
          Start learning AI today
        </h1>
        <p className="text-lg text-[#666] max-w-[560px] mx-auto leading-relaxed">
          Get full access to all courses, tutorials, and resources.
        </p>
      </div>

      {paymentError && (
        <div className="px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm mb-6 max-w-[600px] mx-auto text-center">
          {paymentError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 items-stretch">
        {plans.map((plan) => {
          const meta = PLAN_META[plan.planType] || { period: '' };
          return (
            <div
              key={plan.planType}
              className={`p-8 border rounded-xl bg-white text-center flex flex-col relative transition-colors ${
                meta.highlight ? 'border-2 border-blue-500' : 'border-[#f0f0f0]'
              }`}
            >
              {meta.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap text-white ${
                    meta.highlight ? 'bg-blue-500' : 'bg-[#ff7f50]'
                  }`}
                >
                  {meta.badge}
                </div>
              )}

              <h3 className={`font-serif font-normal text-2xl text-[#141414] mb-2 ${meta.badge ? 'mt-3' : 'mt-0'}`}>
                {plan.label}
              </h3>

              <div className="text-[2.5rem] font-bold text-blue-500 mb-1">
                {plan.priceDisplay}
              </div>

              <p className="text-[#666] mb-6 text-[15px]">
                {meta.period}
              </p>

              <ul className="list-none p-0 m-0 mb-6 flex-1 text-left">
                {FEATURES.map((item) => (
                  <li key={item} className="py-2 border-b border-[#f5f5f5] flex items-center gap-2.5 text-[15px] text-[#333]">
                    <span className="text-emerald-500 font-bold text-sm">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>

              <SubscriptionButton
                planType={plan.planType}
                onSuccess={() => history.push('/courses/machine-learning/intro')}
                onError={(err: string) => setPaymentError(err)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Layout title="Subscribe" description="Get access to all Lex AI courses">
      <BrowserOnly fallback={
        <div className="flex justify-center items-center min-h-[70vh] text-[#666]">
          Loading...
        </div>
      }>
        {() => <SubscribePageContent />}
      </BrowserOnly>
    </Layout>
  );
}
