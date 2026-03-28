'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { testimonials } from '@/data/testimonials';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarGradients = [
  'from-coral-400 to-orange-400',
  'from-blue-400 to-cyan-400',
  'from-violet-400 to-purple-400',
  'from-emerald-400 to-teal-400',
  'from-pink-400 to-rose-400',
];

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const avatarGradient = avatarGradients[index % avatarGradients.length];
  const viewLink = testimonial.postLink || testimonial.linkedin;

  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] mx-2 md:mx-3">
      <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col h-[280px]">
        <div className="flex flex-col flex-1 min-h-0 px-5 pt-4 pb-5">
          {/* Top row: quote icon + view link */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <QuoteIcon className="w-4 h-4 text-coral-400" />
            {viewLink && (
              <Link
                href={viewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {testimonial.source === 'linkedin' ? 'view on linkedin' : 'from feedback'}
              </Link>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-y-auto hide-scroll mb-4">
            <p className="text-neutral-600 text-[13px] leading-[1.7]">
              {testimonial.content.split('\n\n')[0]}
            </p>
          </div>

          {/* Author — bottom */}
          <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 flex-shrink-0">
            {testimonial.image ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ) : (
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${avatarGradient} flex-shrink-0`}
              >
                <span className="text-white font-semibold text-[10px]">
                  {getInitials(testimonial.name)}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-neutral-900 text-[13px] leading-tight">
                {testimonial.name}
              </h4>
              <p className="text-neutral-400 text-[11px] truncate mt-0.5">
                {testimonial.role}
              </p>
            </div>
            {testimonial.linkedin && (
              <Link
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${testimonial.name}'s LinkedIn`}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isPaused, setIsPaused] = useState(false);

  // Split testimonials into two rows
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  // Double for seamless looping
  const row1Doubled = [...row1, ...row1];
  const row2Doubled = [...row2, ...row2];

  return (
    <section
      ref={ref}
      id="stories"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 md:mb-14 px-4"
        >
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-4 block">
            Transformation Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.1]">
            Careers Transformed,{' '}
            <span className="italic text-blue-500">Results That Speak.</span>
          </h2>
        </motion.div>

        {/* Two-row scrolling testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 md:space-y-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Row 1 — scrolls left */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className="flex animate-marquee-slow"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {row1Doubled.map((testimonial, index) => (
                <TestimonialCard
                  key={`row1-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={index % row1.length}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (reverse) */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className="flex animate-marquee-slow-reverse"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {row2Doubled.map((testimonial, index) => (
                <TestimonialCard
                  key={`row2-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  index={(index % row2.length) + mid}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
