'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, FileText, Rocket } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Briefcase,
    title: 'Crack AI interviews at top companies',
    description:
      'Our curriculum is designed around real interview patterns from Google, Amazon, Meta, and top startups. Practice with problems that actually get asked.',
  },
  {
    icon: Rocket,
    title: 'Transition from SWE to ML Engineer',
    description:
      'Structured learning path that bridges the gap from software engineering to machine learning, with hands-on projects at every step.',
  },
  {
    icon: FileText,
    title: 'Read and implement research papers',
    description:
      'Go beyond tutorials. Learn to read, understand, and implement cutting-edge ML research papers with guided walkthroughs.',
  },
  {
    icon: Code2,
    title: 'Build production AI applications',
    description:
      'Ship real AI products — not just notebooks. Learn deployment, monitoring, and scaling of ML systems in production.',
  },
];

const stats = [
  { value: '1,000+', label: 'Active Learners' },
  { value: '90%', label: 'Completion Rate' },
  { value: '4.9/5', label: 'Avg Rating' },
];

export default function WhyLexAI() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-4 block">
            Why Lex AI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.1]">
            Real outcomes,{' '}
            <span className="italic text-blue-500">not just lectures.</span>
          </h2>
        </motion.div>

        {/* Feature Cards — alternating layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="bg-white rounded-2xl border border-neutral-100 p-6 md:p-8 flex gap-5 items-start"
              >
                <div className="w-12 h-12 bg-coral-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-coral-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-neutral-900 rounded-2xl p-8 md:p-10"
        >
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-serif text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
