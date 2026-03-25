'use client';

import Image from 'next/image';
import { companies } from '@/data/companies';

export default function TrustedBy() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-neutral-400 uppercase tracking-[0.2em]">
          Our alumni work at leading companies worldwide
        </p>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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
    </section>
  );
}
