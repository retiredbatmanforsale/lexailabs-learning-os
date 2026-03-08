import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
    path: '/docs',
    component: ComponentCreator('/docs', '832'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '92d'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '2a5'),
            routes: [
              {
                path: '/docs/ai-for-leaders/algorithms-high-level-overview',
                component: ComponentCreator('/docs/ai-for-leaders/algorithms-high-level-overview', '69d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/classical-ml-in-market',
                component: ComponentCreator('/docs/ai-for-leaders/classical-ml-in-market', 'f59'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/classification-regression-supervised-unsupervised',
                component: ComponentCreator('/docs/ai-for-leaders/classification-regression-supervised-unsupervised', '3bb'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/curriculum-overview',
                component: ComponentCreator('/docs/ai-for-leaders/curriculum-overview', '105'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/curriculum-tree',
                component: ComponentCreator('/docs/ai-for-leaders/curriculum-tree', '1fd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/curriculum-visual-tree',
                component: ComponentCreator('/docs/ai-for-leaders/curriculum-visual-tree', '1b3'),
                exact: true
              },
              {
                path: '/docs/ai-for-leaders/intro',
                component: ComponentCreator('/docs/ai-for-leaders/intro', '743'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/ai-for-leaders/machine-learning-fundamentals',
                component: ComponentCreator('/docs/ai-for-leaders/machine-learning-fundamentals', 'f92'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/deep-learning/CNNS',
                component: ComponentCreator('/docs/deep-learning/CNNS', 'ada'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/deep-learning/intro',
                component: ComponentCreator('/docs/deep-learning/intro', '516'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/deep-learning/perceptron',
                component: ComponentCreator('/docs/deep-learning/perceptron', '9a8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/deep-learning/RNNs',
                component: ComponentCreator('/docs/deep-learning/RNNs', 'a74'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/AccessingLLMs',
                component: ComponentCreator('/docs/language-models/AccessingLLMs', 'e71'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/AttentionMechanism',
                component: ComponentCreator('/docs/language-models/AttentionMechanism', '1a4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/BaseModels',
                component: ComponentCreator('/docs/language-models/BaseModels', 'b91'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Evaluation',
                component: ComponentCreator('/docs/language-models/Evaluation', '93f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/EvolutionGpt2',
                component: ComponentCreator('/docs/language-models/EvolutionGpt2', '886'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Hallucinations',
                component: ComponentCreator('/docs/language-models/Hallucinations', '879'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/intro',
                component: ComponentCreator('/docs/language-models/intro', 'f09'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMIdentity',
                component: ComponentCreator('/docs/language-models/LLMIdentity', '4c6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMInconsistencies',
                component: ComponentCreator('/docs/language-models/LLMInconsistencies', '015'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMJudgement',
                component: ComponentCreator('/docs/language-models/LLMJudgement', 'a53'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LoRAFineTuning',
                component: ComponentCreator('/docs/language-models/LoRAFineTuning', 'd12'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Multimodality',
                component: ComponentCreator('/docs/language-models/Multimodality', 'b42'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNInference',
                component: ComponentCreator('/docs/language-models/NNInference', '856'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNInternals',
                component: ComponentCreator('/docs/language-models/NNInternals', '9f7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNTraining',
                component: ComponentCreator('/docs/language-models/NNTraining', '978'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/PostTraining',
                component: ComponentCreator('/docs/language-models/PostTraining', '0e9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/PostTrainingReinforcementLearning',
                component: ComponentCreator('/docs/language-models/PostTrainingReinforcementLearning', '0f0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/QueryToResponse',
                component: ComponentCreator('/docs/language-models/QueryToResponse', 'c1c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/RAGAgents',
                component: ComponentCreator('/docs/language-models/RAGAgents', '995'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ReinforcementLearning',
                component: ComponentCreator('/docs/language-models/ReinforcementLearning', '18d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ThinkingInTokens',
                component: ComponentCreator('/docs/language-models/ThinkingInTokens', 'bd0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ThinkingRL',
                component: ComponentCreator('/docs/language-models/ThinkingRL', '729'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Tokenization',
                component: ComponentCreator('/docs/language-models/Tokenization', '47a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/intro',
                component: ComponentCreator('/docs/machine-learning/intro', '79e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/logistic_regression_tutorial',
                component: ComponentCreator('/docs/machine-learning/logistic_regression_tutorial', 'f31'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/supervised-learning',
                component: ComponentCreator('/docs/machine-learning/supervised-learning', '039'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/resources/intro',
                component: ComponentCreator('/docs/resources/intro', '8d8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/tutorials/logistic-regression',
                component: ComponentCreator('/docs/tutorials/logistic-regression', '0be'),
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
