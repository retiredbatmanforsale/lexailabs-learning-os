'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';

export default function CourseNotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-coral" />
      <div className="fixed inset-0 grain" />
      <div className="fixed top-20 left-1/4 w-72 h-72 bg-coral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        <div className="flex-1 flex items-center justify-center px-4 py-16 pt-28">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-amber-500" />
            </div>

            <h1 className="text-3xl font-serif text-neutral-900 mb-3">
              Course Not Found
            </h1>
            <p className="text-neutral-500 mb-8 leading-relaxed">
              This course isn&apos;t available yet. Explore our other courses
              to start your AI learning journey.
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full rounded-full"
                onClick={() =>
                  document.getElementById('courses')
                    ? document.getElementById('courses')!.scrollIntoView({ behavior: 'smooth' })
                    : (window.location.href = '/#courses')
                }
              >
                <Link href="/#courses" className="flex items-center justify-center gap-2 w-full">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
