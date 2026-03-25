'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
];

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="stories"
      className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-coral-50 to-transparent rounded-full blur-3xl pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-4 block">
            Transformation Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.1]">
            Careers Transformed,{' '}
            <span className="italic text-blue-500">Results That Speak.</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => {
            const avatarGradient = avatarGradients[index % avatarGradients.length];
            const viewLink = testimonial.postLink || testimonial.linkedin;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="bg-neutral-50/80 rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(0,0,0,0.03)] flex flex-col h-[460px]">
                  <div className="flex flex-col flex-1 min-h-0 px-6 pt-5 pb-6">
                    {/* Top row: quote icon + view link */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <QuoteIcon className="w-5 h-5 text-orange-400" />
                      {viewLink && (
                        <Link
                          href={viewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                          {testimonial.source === 'linkedin' ? 'view on linkedin' : 'from feedback'}
                        </Link>
                      )}
                    </div>

                    {/* Content — scrollable, hidden scrollbar */}
                    <div className="flex-1 min-h-0 overflow-y-auto hide-scroll mb-5">
                      {testimonial.content.split('\n\n').map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-neutral-600 text-[14px] leading-[1.75] mb-3 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Author — bottom */}
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60 flex-shrink-0">
                      {testimonial.image ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradient} flex-shrink-0`}
                        >
                          <span className="text-white font-semibold text-xs">
                            {getInitials(testimonial.name)}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-neutral-900 text-sm leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-neutral-400 text-xs truncate mt-0.5">
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
                          <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
