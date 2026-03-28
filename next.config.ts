import type { NextConfig } from "next";

/**
 * The origin where the Docusaurus course content is hosted.
 * Staging falls back to production Docusaurus since both share the same content.
 */
const DOCUSAURUS_ORIGIN =
  process.env.DOCUSAURUS_URL || 'https://learn.lexailabs.com';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  async rewrites() {
    return {
      // afterFiles: checked AFTER public/ and pages, so no conflict with Next.js assets
      afterFiles: [
        // Docusaurus course pages
        {
          source: '/courses/:path*',
          destination: `${DOCUSAURUS_ORIGIN}/courses/:path*`,
        },
        // Docusaurus JS/CSS bundles (public/assets/ has logos/team/testimonials, no js/ or css/)
        {
          source: '/assets/js/:path*',
          destination: `${DOCUSAURUS_ORIGIN}/assets/js/:path*`,
        },
        {
          source: '/assets/css/:path*',
          destination: `${DOCUSAURUS_ORIGIN}/assets/css/:path*`,
        },
        // Docusaurus images
        {
          source: '/img/:path*',
          destination: `${DOCUSAURUS_ORIGIN}/img/:path*`,
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
