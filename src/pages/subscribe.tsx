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

interface PlanCard {
  planType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  label: string;
  price: string;
  period: string;
  badge?: string;
  highlight?: boolean;
}

const PLANS: PlanCard[] = [
  {
    planType: 'MONTHLY',
    label: 'Monthly',
    price: '\u20B9499',
    period: '/month',
  },
  {
    planType: 'QUARTERLY',
    label: 'Quarterly',
    price: '\u20B91,199',
    period: '/3 months',
    badge: 'Most Popular',
    highlight: true,
  },
  {
    planType: 'YEARLY',
    label: 'Yearly',
    price: '\u20B93,999',
    period: '/year',
    badge: 'Best Value',
  },
];

function SubscribePageContent() {
  const { useAuth } = require('../hooks/useAuth');
  const SubscriptionButton = require('../components/SubscriptionButton').default;
  const { apiFetch } = require('../services/api');

  const { isAuthenticated, hasAccess, accessType, organizationName, isLoading, refreshTokens } = useAuth();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [cancelling, setCancelling] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push('/login?redirect=/subscribe');
    }
  }, [isLoading, isAuthenticated, history]);

  useEffect(() => {
    if (isAuthenticated && (accessType === 'subscription' || accessType === 'premium')) {
      apiFetch('/subscriptions/status')
        .then((data: any) => setSubscriptionInfo(data.subscription))
        .catch(() => {});
    }
  }, [isAuthenticated, accessType]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        color: '#666666',
      }}>
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        padding: '2rem',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem',
          border: '1px solid #f0f0f0',
          borderRadius: '0.75rem',
          background: '#ffffff',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            fontSize: '2rem',
            color: '#141414',
            marginBottom: '1.5rem',
          }}>
            Your Subscription
          </h2>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 1rem',
            background: '#eff6ff',
            color: '#3b82f6',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '1rem',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}>
            {planLabel} Plan
          </div>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            color: '#666666',
            fontSize: '0.9375rem',
            marginBottom: '0.25rem',
          }}>
            Status: <strong style={{ color: '#141414' }}>{subscriptionInfo.status}</strong>
          </p>

          {subscriptionInfo.currentPeriodEnd && (
            <p style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              color: '#666666',
              fontSize: '0.9375rem',
              marginBottom: '1.5rem',
            }}>
              {subscriptionInfo.cancelledAt ? 'Access until: ' : 'Next billing date: '}
              <strong style={{ color: '#141414' }}>
                {new Date(subscriptionInfo.currentPeriodEnd).toLocaleDateString()}
              </strong>
            </p>
          )}

          {paymentError && (
            <div style={{
              padding: '0.75rem 1rem',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}>
              {paymentError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              onClick={() => history.push('/courses/machine-learning/intro')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem 1.75rem',
                background: '#3b82f6',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#2563eb'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#3b82f6'; }}
            >
              Go to Courses
            </button>
            {!subscriptionInfo.cancelledAt && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1.75rem',
                  background: 'transparent',
                  color: '#dc2626',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #fca5a5',
                  cursor: cancelling ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s ease',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#fef2f2'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent'; }}
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontWeight: 400,
          fontSize: '2.5rem',
          color: '#141414',
          marginBottom: '0.75rem',
        }}>
          You already have access!
        </h1>
        {accessType === 'institution' ? (
          <p style={{
            fontSize: '1.125rem',
            color: '#666666',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}>
            You have access through <strong style={{ color: '#141414' }}>{organizationName}</strong>.
          </p>
        ) : (
          <p style={{
            fontSize: '1.125rem',
            color: '#666666',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}>
            You have premium access. Enjoy all courses!
          </p>
        )}
        <button
          onClick={() => history.push('/courses/machine-learning/intro')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
            padding: '0.75rem 1.75rem',
            background: '#3b82f6',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#2563eb'; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#3b82f6'; }}
        >
          Go to Courses
        </button>
      </div>
    );
  }

  // ─── Pricing cards view ──────────────────────────────────────
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 1rem',
          background: '#eff6ff',
          color: '#3b82f6',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: 500,
          marginBottom: '1.25rem',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}>
          Choose Your Plan
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontWeight: 400,
          fontSize: '3rem',
          color: '#141414',
          marginBottom: '0.75rem',
          lineHeight: 1.1,
        }}>
          Start learning AI today
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#666666',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}>
          Get full access to all courses, tutorials, and resources.
        </p>
      </div>

      {paymentError && (
        <div style={{
          padding: '0.75rem 1rem',
          background: '#fef2f2',
          color: '#dc2626',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto 1.5rem',
          textAlign: 'center',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}>
          {paymentError}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch',
      }}>
        {PLANS.map((plan) => (
          <div
            key={plan.planType}
            style={{
              padding: '2rem',
              border: plan.highlight ? '2px solid #3b82f6' : '1px solid #f0f0f0',
              borderRadius: '0.75rem',
              background: '#ffffff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'border-color 0.2s ease',
            }}
          >
            {plan.badge && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: plan.highlight ? '#3b82f6' : '#ff7f50',
                color: '#ffffff',
                padding: '0.25rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}>
                {plan.badge}
              </div>
            )}

            <h3 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              fontSize: '1.5rem',
              color: '#141414',
              marginBottom: '0.5rem',
              marginTop: plan.badge ? '0.75rem' : 0,
            }}>
              {plan.label}
            </h3>

            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: '0.25rem',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}>
              {plan.price}
            </div>

            <p style={{
              color: '#666666',
              marginBottom: '1.5rem',
              fontSize: '0.9375rem',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}>
              {plan.period}
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.5rem 0',
              textAlign: 'left',
              flex: 1,
            }}>
              {FEATURES.map((item) => (
                <li key={item} style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: '0.9375rem',
                  color: '#333333',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}>
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.875rem' }}>&#10003;</span>
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
        ))}
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Layout title="Subscribe" description="Get access to all Lex AI courses">
      <BrowserOnly fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          color: '#666666',
        }}>
          Loading...
        </div>
      }>
        {() => <SubscribePageContent />}
      </BrowserOnly>
    </Layout>
  );
}
