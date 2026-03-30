import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const config: Config = {
  title: 'Lex AI',
  tagline: 'Lex AI – community-driven platform for Machine Learning, Deep Learning, and Language Models',
  favicon: 'img/lexailogo.svg',

  url: process.env.SITE_URL || 'https://learn.lexailabs.com',
  baseUrl: '/',

  organizationName: 'ai-ml-community',
  projectName: 'ai-ml-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  staticDirectories: ['static', '../static'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'courses',
          path: '../docs',
          sidebarPath: '../sidebars.ts',
          editUrl:
            'https://github.com/ai-ml-community/ai-ml-docs/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Lex AI',
      logo: {
        alt: 'Lex AI Labs',
        src: 'img/lexailogo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Lex AI Technologies Pvt Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'r', 'julia'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
        type: 'text/css',
        crossorigin: 'anonymous',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap',
        type: 'text/css',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
