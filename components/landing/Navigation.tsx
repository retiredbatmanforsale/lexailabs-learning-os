'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Network,
  Cpu,
  Blocks,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useCourseLink } from '@/hooks/useCourseLink';
import {
  courseCategories,
  engineeringSubcategories,
  getEngineeringBySubcategory,
} from '@/data/courses';

const COURSES_URL = process.env.NEXT_PUBLIC_COURSES_URL ?? '';

const categoryKeys = ['AI for Leaders', 'AI for Engineers'] as const;

const subcategoryIcons: Record<string, typeof TrendingUp> = {
  Foundations: TrendingUp,
  'Deep Learning': Network,
  'Transformers & LLMs': Cpu,
  'Applied AI': Blocks,
};

// Find the subcategory with the most courses to use as default
function getDefaultSubcategory(): string {
  const grouped = getEngineeringBySubcategory();
  let maxSub: string = engineeringSubcategories[0];
  let maxCount = 0;
  for (const sub of engineeringSubcategories) {
    const count = (grouped[sub] || []).length;
    if (count > maxCount) {
      maxCount = count;
      maxSub = sub;
    }
  }
  return maxSub;
}

const defaultSubcategory = getDefaultSubcategory();

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    defaultSubcategory
  );
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, hasAccess } = useAuth();
  const { handleCourseClick } = useCourseLink();

  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? 'U';
  const engineeringGrouped = getEngineeringBySubcategory();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExternalLink = (href: string) => href.startsWith('http');

  const buildCourseHref = (courseHref: string) => `${COURSES_URL}${courseHref}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <Image
              src="/assets/lexailogo.svg"
              alt="Lex AI Labs"
              width={72}
              height={72}
              priority
              className="w-10 h-10 sm:w-12 sm:h-12 p-1 mr-2 sm:p-2"
            />
            <span className="text-3xl md:text-4xl font-serif italic text-neutral-900 tracking-tight">
              Lex AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {categoryKeys.map((category) => {
              const isEngineering = category === 'AI for Engineers';

              return (
                <div
                  key={category}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveDropdown(category);
                    if (isEngineering) setActiveSubcategory(defaultSubcategory);
                  }}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                    {category}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === category ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === category && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={`absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden z-50 ${
                          isEngineering
                            ? 'w-[580px] -left-36 p-0'
                            : 'w-[300px] left-1/2 -translate-x-1/2 py-2 px-1'
                        }`}
                      >
                        {isEngineering ? (
                          /* ── AI for Engineers: sidebar + content layout ── */
                          <div className="flex">
                            {/* Left — sub-categories */}
                            <div className="w-[180px] py-2 flex-shrink-0 border-r border-neutral-100">
                              {engineeringSubcategories.map((sub) => {
                                const isActive = activeSubcategory === sub;

                                return (
                                  <button
                                    key={sub}
                                    onMouseEnter={() => setActiveSubcategory(sub)}
                                    className={`w-full text-left px-5 py-2.5 text-[13px] font-medium transition-colors ${
                                      isActive
                                        ? 'text-neutral-900 bg-neutral-50'
                                        : 'text-neutral-500 hover:text-neutral-700'
                                    }`}
                                  >
                                    {sub}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Right — courses for active sub-category */}
                            <div className="flex-1 py-2 px-2">
                              {(engineeringGrouped[activeSubcategory] || []).map((course) => {
                                const href = buildCourseHref(course.href);
                                const external = isExternalLink(href);
                                const Icon = course.icon;

                                const content = (
                                  <div className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-50 transition-colors">
                                    <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[13px] font-medium text-neutral-900">
                                        {course.title}
                                      </p>
                                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                                        {course.description}
                                      </p>
                                    </div>
                                  </div>
                                );

                                return external ? (
                                  <a
                                    key={course.id}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => handleCourseClick(e, href)}
                                  >
                                    {content}
                                  </a>
                                ) : (
                                  <Link key={course.id} href={href} onClick={(e) => handleCourseClick(e, href)}>
                                    {content}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          /* ── AI for Leaders: simple list ── */
                          <div>
                            {courseCategories[category].map((course) => {
                              const href = buildCourseHref(course.href);
                              const external = isExternalLink(href);
                              const Icon = course.icon;

                              const content = (
                                <div className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-50 transition-colors">
                                  <Icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-neutral-900">
                                      {course.title}
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                                      {course.description}
                                    </p>
                                  </div>
                                </div>
                              );

                              return external ? (
                                <a
                                  key={course.id}
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => handleCourseClick(e, href)}
                                >
                                  {content}
                                </a>
                              ) : (
                                <Link key={course.id} href={href} onClick={(e) => handleCourseClick(e, href)}>
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Auth CTA — Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && hasAccess ? (
              <>
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                  {userInitial}
                </div>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : isAuthenticated && !hasAccess ? (
              <>
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                  {userInitial}
                </div>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-full hover:opacity-80 transition-all"
                >
                  Subscribe
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-neutral-900 border border-neutral-200 rounded-full hover:opacity-80 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/login?tab=register"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-full hover:opacity-80 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 rounded-xl hover:bg-neutral-100/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src="/assets/lexailogo.svg"
                    alt="Lex AI"
                    width={72}
                    height={72}
                    className="w-8 h-8"
                  />
                  <span className="text-2xl font-serif italic text-neutral-900">Lex AI</span>
                </Link>
                <button
                  className="p-2 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="px-4 py-6">
                <div className="space-y-1">
                  {/* AI for Leaders — simple accordion */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <button
                      className="flex items-center justify-between w-full py-4 px-4 text-lg font-medium text-neutral-900 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === 'AI for Leaders' ? null : 'AI for Leaders')
                      }
                    >
                      AI for Leaders
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                          activeDropdown === 'AI for Leaders' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'AI for Leaders' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 space-y-1 pb-2">
                            {courseCategories['AI for Leaders'].map((course) => {
                              const href = buildCourseHref(course.href);
                              const external = isExternalLink(href);
                              const Icon = course.icon;

                              const content = (
                                <div className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors">
                                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4 h-4 text-neutral-500" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-neutral-800">
                                      {course.title}
                                    </p>
                                  </div>
                                </div>
                              );

                              return external ? (
                                <a
                                  key={course.id}
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => { handleCourseClick(e, href); setMobileMenuOpen(false); }}
                                >
                                  {content}
                                </a>
                              ) : (
                                <Link
                                  key={course.id}
                                  href={href}
                                  onClick={(e) => { handleCourseClick(e, href); setMobileMenuOpen(false); }}
                                >
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* AI for Engineers — nested sub-category accordions */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <button
                      className="flex items-center justify-between w-full py-4 px-4 text-lg font-medium text-neutral-900 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === 'AI for Engineers' ? null : 'AI for Engineers')
                      }
                    >
                      AI for Engineers
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                          activeDropdown === 'AI for Engineers' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'AI for Engineers' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pb-2">
                            {engineeringSubcategories.map((sub) => {
                              const SubIcon = subcategoryIcons[sub] || Blocks;
                              return (
                                <div key={sub}>
                                  <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                                    <SubIcon className="w-3.5 h-3.5 text-neutral-400" />
                                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                      {sub}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    {(engineeringGrouped[sub] || []).map((course) => {
                                      const href = buildCourseHref(course.href);
                                      const external = isExternalLink(href);
                                      const Icon = course.icon;

                                      const content = (
                                        <div className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors">
                                          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-neutral-500" />
                                          </div>
                                          <p className="text-sm font-medium text-neutral-800">
                                            {course.title}
                                          </p>
                                        </div>
                                      );

                                      return external ? (
                                        <a
                                          key={course.id}
                                          href={href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => { handleCourseClick(e, href); setMobileMenuOpen(false); }}
                                        >
                                          {content}
                                        </a>
                                      ) : (
                                        <Link
                                          key={course.id}
                                          href={href}
                                          onClick={(e) => { handleCourseClick(e, href); setMobileMenuOpen(false); }}
                                        >
                                          {content}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 pt-6 border-t border-neutral-100 space-y-3"
                >
                  {isAuthenticated && hasAccess ? (
                    <>
                      <div className="flex items-center gap-3 py-2 px-4">
                        <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                          {userInitial}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">
                          {user?.name}
                        </span>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-3 w-full py-4 text-base font-medium text-white bg-neutral-900 rounded-2xl hover:opacity-80 active:scale-[0.98] transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </>
                  ) : isAuthenticated && !hasAccess ? (
                    <>
                      <div className="flex items-center gap-3 py-2 px-4">
                        <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
                          {userInitial}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">
                          {user?.name}
                        </span>
                      </div>
                      <Link
                        href="/subscribe"
                        className="flex items-center justify-center gap-3 w-full py-4 text-base font-medium text-white bg-neutral-900 rounded-2xl hover:opacity-80 active:scale-[0.98] transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Subscribe
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block w-full text-center py-3 px-4 rounded-2xl border border-neutral-200 text-neutral-900 text-base font-medium hover:opacity-80 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/login?tab=register"
                        className="flex items-center justify-center gap-3 w-full py-4 text-base font-medium text-white bg-neutral-900 rounded-2xl hover:opacity-80 active:scale-[0.98] transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
