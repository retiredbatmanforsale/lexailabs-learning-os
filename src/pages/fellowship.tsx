import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { JSX } from 'react';

export default function Fellowship(): JSX.Element {
  return (
    <Layout
      title="Lex AI Fellowship"
      description="Lex AI Fellowship – Shaping India's AI Generation. Career-transforming programs for Engineers and Leaders.">
      <main className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-white min-h-screen">
        {/* Hero Section */}
        <div className="py-32 md:py-24 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 z-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)',
            }}
          />
          <div className="container">
            <h1 className="text-5xl md:text-[4rem] font-extrabold mb-2 bg-gradient-to-br from-white to-[#e0e7ff] bg-clip-text text-transparent relative z-[1]">Lex AI</h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#ff9933] mb-6 relative z-[1]">Trusted Voice of AI Education in India</p>
            <p className="text-lg md:text-xl text-white/80 max-w-[700px] mx-auto mb-12 leading-relaxed relative z-[1]">
            Deep, technical, transformative programs built for ambitious engineers and leaders.
            </p>
            <div className="flex gap-6 justify-center flex-wrap relative z-[1]">
                <a
                  href="https://www.lexailabs.com/ai-fellowship"
                  className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 font-semibold text-lg rounded-lg shadow-[0_8px_25px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all no-underline border-none"
                  target="_blank"
                  rel="noopener noreferrer">
                  Apply Now
                </a>
              <a
                href="https://lexailabs.com/consultation"
                className="border-2 border-indigo-500 bg-[#16213e]/90 hover:bg-indigo-500/30 text-white px-8 py-4 font-semibold text-lg rounded-lg hover:-translate-y-0.5 transition-all no-underline"
                target="_blank"
                rel="noopener noreferrer">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="py-24 md:py-16">
            {/* Lex AI Introduction */}
            <div className="text-center max-w-[900px] mx-auto mb-24 md:mb-16 px-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">About Lex AI</h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                <strong>Lex AI Technologies Private Limited</strong> is the holding company behind <strong>AI Seekhega India</strong>, dedicated to democratizing AI education
                and empowering India's workforce with cutting-edge AI skills. Our flagship program, the <strong>Lex AI Fellowship</strong>,
                offers specialized tracks designed for different professional needs.
              </p>
            </div>

            {/* Programs Section */}
            <div className="max-w-[1200px] mx-auto px-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">Choose Your AI Journey</h2>

              {/* AI Fellowship for Engineers */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-[20px] p-8 md:p-12 mb-12 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] hover:border-indigo-500/40 transition-all">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 text-center md:text-left">
                  <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shrink-0 [&_svg]:w-7 [&_svg]:h-7">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white m-0">AI Fellowship</h3>
                    <p className="text-lg text-[#ff9933] mt-2 font-medium m-0">For Engineers</p>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
                  A career-transforming program that equips engineers to become Machine Learning Engineers
                  and Applied Scientists at leading tech firms.
                </p>

                <div>
                  <h4 className="text-xl md:text-2xl text-white mb-6 font-semibold">Learning Outcomes:</h4>
                  <ul className="list-none p-0 m-0 mb-10">
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🤖</span>
                      <strong>Machine Learning & Deep Learning</strong>
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">📊</span>
                      <strong>Maths for AI</strong> - Linear Algebra, Probability, Stats, Calculus
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🔧</span>
                      <strong>Applied ML & DL</strong> with real-world case studies
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🚀</span>
                      <strong>Transformers & Large Language Models</strong>
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🏆</span>
                      <strong>Competing in Kaggle Competitions</strong>
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">💼</span>
                      <strong>Preparing for ML Interviews</strong>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <a
                    href="https://www.lexailabs.com/ai-fellowship"
                    className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-7 py-3.5 font-semibold text-lg rounded-lg shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all no-underline border-none inline-block"
                    target="_blank"
                    rel="noopener noreferrer">
                    Apply for Engineers Program
                  </a>
                </div>
              </div>

              {/* AI for Leaders */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-[20px] p-8 md:p-12 mb-12 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] hover:border-indigo-500/40 transition-all">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 text-center md:text-left">
                  <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shrink-0 [&_svg]:w-7 [&_svg]:h-7">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white m-0">AI for Leaders</h3>
                    <p className="text-lg text-[#ff9933] mt-2 font-medium m-0">For C-Suite, Managers, PMs, Leaders</p>
                  </div>
                </div>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
                  A program that helps leaders understand, apply, and drive AI adoption inside their organizations.
                </p>

                <div>
                  <h4 className="text-xl md:text-2xl text-white mb-6 font-semibold">Learning Outcomes:</h4>
                  <ul className="list-none p-0 m-0 mb-10">
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🧠</span>
                      <strong>Deep AI Understanding</strong> → How AI systems are designed & work at a conceptual level
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">⚡</span>
                      <strong>Productivity Mastery</strong> → Using AI tools for leadership workflows
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">🎯</span>
                      <strong>Agent Opportunities</strong> → Spot AI-agent opportunities inside teams
                    </li>
                    <li className="flex items-start gap-4 py-4 border-b border-indigo-500/10 last:border-b-0 text-base md:text-lg text-white/90 leading-relaxed">
                      <span className="text-2xl shrink-0 mt-0.5">📋</span>
                      <strong>Custom Playbook</strong> → Industry-specific AI adoption playbook
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <a
                    href="https://www.lexailabs.com/ai-for-leaders"
                    className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-7 py-3.5 font-semibold text-lg rounded-lg shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all no-underline border-none inline-block"
                    target="_blank"
                    rel="noopener noreferrer">
                    Apply for Leaders Program
                  </a>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="text-center py-24 md:py-16 px-8 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 rounded-[20px] mt-24 md:mt-16 backdrop-blur-lg border border-indigo-500/20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career with AI?</h2>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-[600px] mx-auto leading-relaxed">
                Join thousands of professionals who have accelerated their careers through Lex AI Fellowship
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <a
                  href="https://www.lexailabs.com/ai-fellowship"
                  className="bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 font-semibold text-lg rounded-lg shadow-[0_8px_25px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all no-underline border-none"
                  target="_blank"
                  rel="noopener noreferrer">
                  Apply Now
                </a>
                <a
                  href="https://lexailabs.com/curriculum"
                  className="border-2 border-indigo-500 bg-[#16213e]/90 hover:bg-indigo-500/30 text-white px-8 py-4 font-semibold text-lg rounded-lg hover:-translate-y-0.5 transition-all no-underline"
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
