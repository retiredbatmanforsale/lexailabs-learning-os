import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '6eb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'd54'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'ab6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '753'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '553'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '570'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'ca2'),
    exact: true
  },
  {
    path: '/accept-invite',
    component: ComponentCreator('/accept-invite', '81a'),
    exact: true
  },
  {
    path: '/admin',
    component: ComponentCreator('/admin', 'a78'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'aae'),
    exact: true
  },
  {
    path: '/blog/2024/04/24/welcome',
    component: ComponentCreator('/blog/2024/04/24/welcome', '870'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '2aa'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'ac0'),
    exact: true
  },
  {
    path: '/blog/tags/announcement',
    component: ComponentCreator('/blog/tags/announcement', 'd6e'),
    exact: true
  },
  {
    path: '/blog/tags/welcome',
    component: ComponentCreator('/blog/tags/welcome', 'f29'),
    exact: true
  },
  {
    path: '/contribute',
    component: ComponentCreator('/contribute', 'b1b'),
    exact: true
  },
  {
    path: '/fellowship',
    component: ComponentCreator('/fellowship', 'ca8'),
    exact: true
  },
  {
    path: '/forgot-password',
    component: ComponentCreator('/forgot-password', '3ba'),
    exact: true
  },
  {
    path: '/login',
    component: ComponentCreator('/login', '075'),
    exact: true
  },
  {
    path: '/reset-password',
    component: ComponentCreator('/reset-password', '6ba'),
    exact: true
  },
  {
    path: '/subscribe',
    component: ComponentCreator('/subscribe', '6f3'),
    exact: true
  },
  {
    path: '/courses',
    component: ComponentCreator('/courses', 'a44'),
    routes: [
      {
        path: '/courses',
        component: ComponentCreator('/courses', 'b15'),
        routes: [
          {
            path: '/courses',
            component: ComponentCreator('/courses', 'bcb'),
            routes: [
              {
                path: '/courses/tracks/ai-engineering/agentic-ai-multi-agent-systems/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/agentic-ai-multi-agent-systems/intro', 'b3a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/ai-research/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/ai-research/intro', 'd97'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/attention-is-all-you-need-transformer/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/attention-is-all-you-need-transformer/intro', '623'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/intro', 'd94'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson01-problems-rnns',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson01-problems-rnns', '43b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson02-token-embeddings',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson02-token-embeddings', '569'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson03-positional-embeddings',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson03-positional-embeddings', '57d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson04-attention',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson04-attention', '824'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson05-masking',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson05-masking', 'cf4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson06-residual',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson06-residual', 'fe8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson07-layernorm',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson07-layernorm', '4a1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson08-ffn',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson08-ffn', '510'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson09-next-token-pred',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson09-next-token-pred', '02b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/build-and-train-gpt/lesson10-decoder-only-transformer',
                component: ComponentCreator('/courses/tracks/ai-engineering/build-and-train-gpt/lesson10-decoder-only-transformer', '82f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/deep-computer-vision-cnn/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/deep-computer-vision-cnn/intro', '2c0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/deep-neural-networks/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/deep-neural-networks/intro', '662'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/deep-sequence-modelling-rnn/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/deep-sequence-modelling-rnn/intro', '997'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/intro',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/intro', '6c1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson01-line-linear-models',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson01-line-linear-models', '75b'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson02-model-equation-line',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson02-model-equation-line', 'ce7'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson03-loss-function-ssr',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson03-loss-function-ssr', '5b3'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson04-optimizer-gradient-descent',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson04-optimizer-gradient-descent', '663'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson05-visualization-linear-regression',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson05-visualization-linear-regression', '0f7'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson06-multivariate-linear-regression',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson06-multivariate-linear-regression', '4b5'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson07-implement-linear-regression-scratch',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson07-implement-linear-regression-scratch', '5fe'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson08-shortcomings-linear-regression',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson08-shortcomings-linear-regression', 'ad4'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson09-why-not-for-classification',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson09-why-not-for-classification', '7e3'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson10-intuition-logistic-regression',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson10-intuition-logistic-regression', '9dd'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson11-model-equation-logistic',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson11-model-equation-logistic', '30a'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson12-loss-function-bce',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson12-loss-function-bce', '1f6'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-engineering/foundations-of-regression/lesson13-gradient-descent-logistic',
                component: ComponentCreator('/courses/tracks/ai-engineering/foundations-of-regression/lesson13-gradient-descent-logistic', '27d'),
                exact: true
              },
              {
                path: '/courses/tracks/ai-for-leaders/',
                component: ComponentCreator('/courses/tracks/ai-for-leaders/', '0b0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-for-leaders/ai-literacy/intro',
                component: ComponentCreator('/courses/tracks/ai-for-leaders/ai-literacy/intro', '18f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-for-leaders/generative-ai-for-everyone/intro',
                component: ComponentCreator('/courses/tracks/ai-for-leaders/generative-ai-for-everyone/intro', '198'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-for-leaders/llms-101/intro',
                component: ComponentCreator('/courses/tracks/ai-for-leaders/llms-101/intro', '207'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tracks/ai-for-leaders/prompt-engineering/intro',
                component: ComponentCreator('/courses/tracks/ai-for-leaders/prompt-engineering/intro', 'd5d'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '4cd'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
