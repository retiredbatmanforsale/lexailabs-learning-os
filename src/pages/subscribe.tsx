import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useHistory } from '@docusaurus/router';

function SubscribePageContent() {
  const { useAuth } = require('../hooks/useAuth');
  const PaymentButton = require('../components/PaymentButton').default;

  const { isAuthenticated, hasAccess, accessType, organizationName, isLoading } = useAuth();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push('/login?redirect=/subscribe');
    }
  }, [isLoading, isAuthenticated, history]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        Loading...
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <h1>You already have access!</h1>
        {accessType === 'institution' ? (
          <p style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-600)' }}>
            You have access through <strong>{organizationName}</strong>.
          </p>
        ) : (
          <p style={{ fontSize: '1.125rem', color: 'var(--ifm-color-emphasis-600)' }}>
            You have premium access. Enjoy all courses!
          </p>
        )}
        <button
          onClick={() => history.push('/courses/machine-learning/intro')}
          className="button button--primary button--lg"
          style={{ marginTop: '1rem' }}
        >
          Go to Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        padding: '2.5rem',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '1rem',
        background: 'var(--ifm-background-surface-color)',
        textAlign: 'center',
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Premium Access</h1>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--ifm-color-primary)', marginBottom: '0.5rem' }}>
          &#8377;3,999
        </div>
        <p style={{ color: 'var(--ifm-color-emphasis-600)', marginBottom: '1.5rem' }}>
          One-time payment for lifetime access
        </p>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 2rem 0',
          textAlign: 'left',
        }}>
          {[
            'All Machine Learning courses',
            'All Deep Learning courses',
            'Language Models & LLM courses',
            'AI for Leaders track',
            'Interactive tutorials',
            'Lifetime access & updates',
          ].map((item) => (
            <li key={item} style={{
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--ifm-color-emphasis-100)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ color: 'var(--ifm-color-success)', fontWeight: 700 }}>&#10003;</span>
              {item}
            </li>
          ))}
        </ul>

        {paymentError && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--ifm-color-danger-contrast-background)',
            color: 'var(--ifm-color-danger-dark)',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}>
            {paymentError}
          </div>
        )}

        <PaymentButton
          onSuccess={() => history.push('/courses/machine-learning/intro')}
          onError={(err) => setPaymentError(err)}
        />
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Layout title="Subscribe" description="Get premium access to all Lex AI courses">
      <BrowserOnly fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          Loading...
        </div>
      }>
        {() => <SubscribePageContent />}
      </BrowserOnly>
    </Layout>
  );
}
