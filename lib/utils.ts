import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Courses URL — environment-specific.
 * Production: set NEXT_PUBLIC_COURSES_URL explicitly.
 * Staging / fallback: defaults to staging URL.
 */
export const COURSES_URL =
  process.env.NEXT_PUBLIC_COURSES_URL || 'https://staging.learn.lexailabs.com';
