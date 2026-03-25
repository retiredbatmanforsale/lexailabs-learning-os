'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { team } from '@/data/team';

const companyLogos: Record<string, string> = {
  Google: '/assets/logos/google.png',
  Amazon: '/assets/logos/amazon.png',
  Oracle: '/assets/logos/oracle.png',
  Qualcomm: '/assets/logos/qualcomm.png',
  MathWorks: '/assets/logos/mathworks.png',
  'DGLiger Consulting': '/assets/logos/dgliger.png',
  'Lex AI Labs': '/assets/lexailogo.svg',
};

const avatarGradients = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-teal-500 to-green-500',
  'from-fuchsia-500 to-pink-500',
  'from-rose-500 to-orange-500',
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface MemberCardProps {
  member: (typeof team)[0];
  index: number;
}

function MemberCard({ member, index }: MemberCardProps) {
  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <div className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] mx-2 md:mx-3">
      <div className="group relative">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="280px"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-white font-semibold text-4xl">
                {getInitials(member.name)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 md:mt-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col items-start min-w-0">
              <h3 className="font-medium text-neutral-900 text-lg md:text-xl truncate max-w-full">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-neutral-500">{member.role}</p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              {/* Company Logo */}
              <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center p-1.5">
                {companyLogos[member.company] ? (
                  <Image
                    src={companyLogos[member.company]}
                    alt={member.company}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain rounded-[2px]"
                  />
                ) : (
                  <span className="text-[8px] md:text-[10px] font-medium text-neutral-600 text-center leading-tight">
                    {member.company}
                  </span>
                )}
              </div>
              {/* LinkedIn Button */}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full text-blue-500 hover:opacity-80 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                >
                  <LinkedinIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...team, ...team];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-radial from-coral-50 to-transparent rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-10 md:mb-16 px-4"
        >
          <span className="text-[10px] md:text-xs font-medium text-neutral-400 uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6 block">
            Team, Advisors, Instructors &amp; Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.1]">
            The People Behind
            <span className="text-blue-500 italic mt-1">{" "}Lex AI</span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto mt-4 md:mt-6">
            Engineers, founders, and leaders from Google, Amazon, CMU and India&apos;s
            top AI companies
          </p>
        </motion.div>

        {/* Team Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

          <div
            className="flex sm:animate-sm-marquee-slow animate-marquee-slow"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {doubled.map((member, index) => (
              <MemberCard
                key={`member-${member.name}-${index}`}
                member={member}
                index={index % team.length}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-3 md:gap-4 mt-10 md:mt-16 px-4"
        >
          <div className="flex -space-x-2">
            {team.slice(0, 4).map((member, i) => {
              const gradient = avatarGradients[i % avatarGradients.length];
              return (
                <div
                  key={member.name}
                  className={`relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden ring-2 ring-neutral-50 bg-gradient-to-br ${gradient} flex items-center justify-center`}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <span className="text-white font-medium text-[8px] md:text-[10px]">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs md:text-sm text-neutral-600">
            Learn from <span className="font-semibold text-neutral-900">9+ industry mentors</span>{' '}
            who ship AI at scale
          </p>
        </motion.div>
      </div>
    </section>
  );
}
