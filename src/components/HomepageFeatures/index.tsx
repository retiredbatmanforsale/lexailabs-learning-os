import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: React.ReactNode;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Community-Driven',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    description: (
      <>
        Built by the community, for the community. Anyone can contribute 
        by submitting pull requests to improve or add new content.
      </>
    ),
  },
  {
    title: 'Comprehensive Coverage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    description: (
      <>
        From foundational Machine Learning concepts to cutting-edge Language Models,
        our platform covers the full spectrum of AI technologies.
      </>
    ),
  },
  {
    title: 'Interactive Examples',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    ),
    description: (
      <>
        Learn by reading and playing with the code with interactive examples that
        let you learn and experiment with algorithms.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>What is AI Seekhega India?</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}