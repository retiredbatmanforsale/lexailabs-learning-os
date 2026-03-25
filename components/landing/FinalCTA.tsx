'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';

export default function FinalCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative bg-neutral-900 rounded-3xl overflow-hidden grain"
        >
          {/* Gradient blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 py-16 md:py-24 px-6 md:px-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.1] mb-4">
              Ready to start your{' '}
              <span className="italic text-coral-400">AI journey?</span>
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-8">
              Join 500+ learners building the future with AI
            </p>
            <Button
              asChild
              variant="white"
              size="lg"
              className="rounded-full px-10"
            >
              <Link href="/login?tab=register">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
