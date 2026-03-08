import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const config: Config = {
  title: 'Lex AI',
  tagline: 'Lex AI – community-driven platform for Machine Learning, Deep Learning, and Language Models',
  favicon: 'img/lexai-logo.svg',

  // Set the production url of your site here
  url: 'https://ai-ml-docs.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ai-ml-community', // Usually your GitHub org/user name.
  projectName: 'ai-ml-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ai-ml-community/ai-ml-docs/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ai-ml-community/ai-ml-docs/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    navbar: {
      logo: {
        alt: 'Lex AI',
        src: 'img/lexai-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/login',
          label: 'Login',
          position: 'right',
        },
        {
          to: '/signup',
          label: 'Get Started',
          position: 'right',
          className: 'navbar-get-started-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            {
              label: 'All Courses',
              to: '/docs/machine-learning/intro',
            },
            {
              label: 'AI for Leaders',
              to: '/docs/ai-for-leaders/intro',
            },
            {
              label: 'Deep Learning',
              to: '/docs/deep-learning/intro',
            },
            {
              label: 'Language Models',
              to: '/docs/language-models/intro',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ai-ml-community/ai-ml-docs',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/QtzYHmfw',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of Service',
              to: '/terms',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} Lex AI Technologies Pvt Ltd. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'r', 'julia'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-mQ93GR66B8fYB1+K+9a6UA+6QK9lQ8l+Q5p3p3Z5p3p3Z5p3p3Z5p3p3Z5p3p3Z5',
        crossorigin: 'anonymous',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap',
        type: 'text/css',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;