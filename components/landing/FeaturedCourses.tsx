'use client';

import { motion } from 'framer-motion';
import { Monitor, Play, Download } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { featuredCourses } from '@/data/courses';
import { useCourseLink } from '@/hooks/useCourseLink';
import { COURSES_URL } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const thumbnailAccents: Record<string, string> = {
  'ai-literacy': 'from-neutral-100 via-coral-50 to-coral-100',
  'prompt-engineering': 'from-slate-100 via-slate-50 to-neutral-100',
  'foundations-of-regression': 'from-blue-50 via-blue-100 to-indigo-100',
  'deep-neural-networks': 'from-violet-50 via-purple-100 to-violet-100',
  'attention-is-all-you-need': 'from-emerald-50 via-teal-100 to-emerald-100',
  'build-and-train-gpt': 'from-indigo-50 via-blue-100 to-indigo-100',
};

function CourseThumbnail({ title, icon: Icon, courseId }: { title: string; icon: LucideIcon; courseId: string }) {
  const gradient = thumbnailAccents[courseId] || 'from-neutral-800 to-neutral-700';

  return (
    <div className={`aspect-[16/10] relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center p-6`}>
      {/* Large watermark icon */}
      <Icon className="absolute right-4 bottom-4 w-24 h-24 text-neutral-900/[0.05]" strokeWidth={1} />
      {/* Title */}
      <div className="relative z-10 text-center px-4">
        <p className="text-neutral-800 font-serif italic text-2xl md:text-3xl leading-snug">
          {title}
        </p>
      </div>
    </div>
  );
}

function getLevelColor(level: string) {
  switch (level) {
    case 'Beginner':
      return 'text-green-600';
    case 'Intermediate':
      return 'text-blue-600';
    case 'Advanced':
      return 'text-purple-600';
    default:
      return 'text-neutral-600';
  }
}

export default function FeaturedCourses() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { handleCourseClick } = useCourseLink();

  return (
    <section ref={ref} id="courses" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em] mb-4 block">
            Our Courses
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.1]">
            Master AI,{' '}
            <span className="italic text-blue-500">step by step.</span>
          </h2>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="bg-white border border-neutral-200 rounded-3xl h-full flex flex-col p-2.5">
                {/* Thumbnail */}
                <CourseThumbnail
                  title={course.title}
                  icon={course.icon}
                  courseId={course.id}
                />

                {/* Content */}
                <div className="pt-4 pb-1.5 px-1 flex flex-col flex-1">
                  {/* Level */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Monitor className={`w-4 h-4 ${getLevelColor(course.level)}`} />
                    <span className={`text-sm font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 leading-tight">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5 flex-1">
                    {course.description}
                  </p>

                  {/* CTA */}
                  {course.curriculumUrl ? (
                    <div className="flex gap-3">
                      <Link
                        href={`${COURSES_URL}${course.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleCourseClick(e, `${COURSES_URL}${course.href}`)}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white bg-neutral-900 rounded-full hover:opacity-80 transition-all"
                      >
                        Start learning
                        <Play className="w-4 h-4 fill-current" />
                      </Link>
                      <a
                        href={course.curriculumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-medium text-neutral-900 border border-neutral-200 rounded-full hover:opacity-80 transition-all"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ) : (
                    <Link
                      href={`${COURSES_URL}${course.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleCourseClick(e, `${COURSES_URL}${course.href}`)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white bg-neutral-900 rounded-full hover:opacity-80 transition-all"
                    >
                      Start learning
                      <Play className="w-4 h-4 fill-current" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
