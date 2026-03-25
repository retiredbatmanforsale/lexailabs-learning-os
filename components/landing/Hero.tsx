'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { companies } from '@/data/companies';

const stats = [
  { value: '500+', label: 'Learners' },
  { value: '12', label: 'Structured Courses' },
  { value: '9+', label: 'Industry Mentors' },
];

const doubled = [...companies, ...companies];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-coral" />
      <div className="absolute inset-0 grain" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-coral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral-100/60 text-coral-700 rounded-full text-xs font-medium uppercase tracking-wider mb-6">
              Transform Your Career with AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-neutral-900 leading-[1.1] mb-6"
          >
            Go from zero AI knowledge to{' '}
            <span className="italic text-blue-500">building real AI systems</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Learn from Google, Amazon, and Oracle engineers. Master ML, Deep
            Learning, and LLMs through structured, hands-on courses.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center mb-12"
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="#courses">
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-8 md:gap-12">
                {index > 0 && (
                  <div className="w-px h-8 bg-neutral-300" />
                )}
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-serif text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trusted By — integrated into hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 pb-12 md:pb-16"
      >
        <p className="text-center text-sm text-neutral-400 uppercase tracking-wider mb-6">
          Our alumni work at leading companies worldwide
        </p>

        <div className="relative">
          {/* Fade edges matching hero coral gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-coral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-coral-50 to-transparent z-10 pointer-events-none" />

          <div className="flex items-center animate-marquee-slow">
            {doubled.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2.5 mx-6 md:mx-8"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
