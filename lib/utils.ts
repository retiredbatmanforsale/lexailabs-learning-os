import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Courses URL prefix for building course links.
 * Empty string = relative paths (courses served from same domain via Next.js rewrites).
 * Set NEXT_PUBLIC_COURSES_URL only if courses are on a separate domain.
 */
export const COURSES_URL = process.env.NEXT_PUBLIC_COURSES_URL || '';
