import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { JSX } from 'react';
import styles from './fellowship.module.css';

export default function Fellowship(): JSX.Element {
  return (
    <Layout
      title="Lex AI Fellowship"
      description="Lex AI Fellowship – Shaping India's AI Generation. Career-transforming programs for Engineers and Leaders.">
      <main className={styles.fellowshipPage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.heroTitle}>Lex AI</h1>
            <p className={styles.heroTagline}>Trusted Voice of AI Education in India</p>
            <p className={styles.heroSubtitle}>
            Deep, technical, transformative programs built for ambitious engineers and leaders.
            </p>
            <div className={styles.heroButtons}>
                <a
                  href="https://www.lexailabs.com/ai-fellowship"
                  className={clsx('button button--primary button--lg', styles.primaryButton)}
                  target="_blank"
                  rel="noopener noreferrer">
                  Apply Now
                </a>
              <a
                href="https://lexailabs.com/consultation"
                className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                target="_blank"
                rel="noopener noreferrer">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.contentSection}>
            {/* Lex AI Introduction */}
            <div className={styles.introSection}>
              <h2 className={styles.sectionTitle}>About Lex AI</h2>
              <p className={styles.introText}>
                <strong>Lex AI Technologies Private Limited</strong> is the holding company behind <strong>AI Seekhega India</strong>, dedicated to democratizing AI education 
                and empowering India's workforce with cutting-edge AI skills. Our flagship program, the <strong>Lex AI Fellowship</strong>, 
                offers specialized tracks designed for different professional needs.
              </p>
            </div>

            {/* Programs Section */}
            <div className={styles.programsSection}>
              <h2 className={styles.sectionTitle}>Choose Your AI Journey</h2>
              
              {/* AI Fellowship for Engineers */}
              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <div className={styles.programIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.programTitle}>AI Fellowship</h3>
                    <p className={styles.programAudience}>For Engineers</p>
                  </div>
                </div>
                
                <p className={styles.programValue}>
                  A career-transforming program that equips engineers to become Machine Learning Engineers 
                  and Applied Scientists at leading tech firms.
                </p>
                
                <div className={styles.learningOutcomes}>
                  <h4>Learning Outcomes:</h4>
                  <ul className={styles.outcomesList}>
                    <li>
                      <span className={styles.outcomeIcon}>🤖</span>
                      <strong>Machine Learning & Deep Learning</strong>
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>📊</span>
                      <strong>Maths for AI</strong> - Linear Algebra, Probability, Stats, Calculus
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>🔧</span>
                      <strong>Applied ML & DL</strong> with real-world case studies
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>🚀</span>
                      <strong>Transformers & Large Language Models</strong>
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>🏆</span>
                      <strong>Competing in Kaggle Competitions</strong>
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>💼</span>
                      <strong>Preparing for ML Interviews</strong>
                    </li>
                  </ul>
                </div>
                
                <div className={styles.programCta}>
                  <a
                    href="https://www.lexailabs.com/ai-fellowship"
                    className={clsx('button button--primary', styles.programButton)}
                    target="_blank"
                    rel="noopener noreferrer">
                    Apply for Engineers Program
                  </a>
                </div>
              </div>

              {/* AI for Leaders */}
              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <div className={styles.programIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.programTitle}>AI for Leaders</h3>
                    <p className={styles.programAudience}>For C-Suite, Managers, PMs, Leaders</p>
                  </div>
                </div>
                
                <p className={styles.programValue}>
                  A program that helps leaders understand, apply, and drive AI adoption inside their organizations.
                </p>
                
                <div className={styles.learningOutcomes}>
                  <h4>Learning Outcomes:</h4>
                  <ul className={styles.outcomesList}>
                    <li>
                      <span className={styles.outcomeIcon}>🧠</span>
                      <strong>Deep AI Understanding</strong> → How AI systems are designed & work at a conceptual level
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>⚡</span>
                      <strong>Productivity Mastery</strong> → Using AI tools for leadership workflows
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>🎯</span>
                      <strong>Agent Opportunities</strong> → Spot AI-agent opportunities inside teams
                    </li>
                    <li>
                      <span className={styles.outcomeIcon}>📋</span>
                      <strong>Custom Playbook</strong> → Industry-specific AI adoption playbook
                    </li>
                  </ul>
                </div>
                
                <div className={styles.programCta}>
                  <a
                    href="https://www.lexailabs.com/ai-for-leaders"
                    className={clsx('button button--primary', styles.programButton)}
                    target="_blank"
                    rel="noopener noreferrer">
                    Apply for Leaders Program
                  </a>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div className={styles.finalCtaSection}>
              <h2 className={styles.ctaTitle}>Ready to Transform Your Career with AI?</h2>
              <p className={styles.ctaSubtitle}>
                Join thousands of professionals who have accelerated their careers through Lex AI Fellowship
              </p>
              <div className={styles.finalCtaButtons}>
                <a
                  href="https://www.lexailabs.com/ai-fellowship"
                  className={clsx('button button--primary button--lg', styles.primaryButton)}
                  target="_blank"
                  rel="noopener noreferrer">
                  Apply Now
                </a>
                <a
                  href="https://lexailabs.com/curriculum"
                  className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                  target="_blank"
                  rel="noopener noreferrer">
                  Explore Curriculum
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 