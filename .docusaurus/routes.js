import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '847'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'c84'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd08'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'b1f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'd3b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'f40'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'dc9'),
    exact: true
  },
  {
    path: '/courses',
    component: ComponentCreator('/courses', '86e'),
    routes: [
      {
        path: '/courses',
        component: ComponentCreator('/courses', '02f'),
        routes: [
          {
            path: '/courses',
            component: ComponentCreator('/courses', '4ca'),
            routes: [
              {
                path: '/courses/ai-for-engineering/agentic-ai/intro',
                component: ComponentCreator('/courses/ai-for-engineering/agentic-ai/intro', 'e44'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/ai-research/intro',
                component: ComponentCreator('/courses/ai-for-engineering/ai-research/intro', '43c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/attention-is-all-you-need/intro',
                component: ComponentCreator('/courses/ai-for-engineering/attention-is-all-you-need/intro', 'c31'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/attention-multi-head-attention',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/attention-multi-head-attention', '8fe'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/causal-masking',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/causal-masking', '551'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/decoder-only-transformer',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/decoder-only-transformer', 'da8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/feed-forward-neural-networks',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/feed-forward-neural-networks', 'b93'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/generation-of-next-tokens',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/generation-of-next-tokens', 'd38'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/intro',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/intro', '8da'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/layer-normalization',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/layer-normalization', 'a6f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/positional-embeddings',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/positional-embeddings', '5af'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/problem-with-rnns-lstms',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/problem-with-rnns-lstms', '969'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/residual-connections',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/residual-connections', 'd9c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/token-embeddings',
                component: ComponentCreator('/courses/ai-for-engineering/build-and-train-your-own-gpt2-model/token-embeddings', '06f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/deep-computer-vision-cnn/intro',
                component: ComponentCreator('/courses/ai-for-engineering/deep-computer-vision-cnn/intro', 'a1c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/deep-neural-networks/intro',
                component: ComponentCreator('/courses/ai-for-engineering/deep-neural-networks/intro', 'ec0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/deep-sequence-modelling-rnn/intro',
                component: ComponentCreator('/courses/ai-for-engineering/deep-sequence-modelling-rnn/intro', 'de9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/foundations-of-regression/intro',
                component: ComponentCreator('/courses/ai-for-engineering/foundations-of-regression/intro', 'c72'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-engineering/tree-based-algorithms-classical-ml/intro',
                component: ComponentCreator('/courses/ai-for-engineering/tree-based-algorithms-classical-ml/intro', 'e83'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/ai-literacy/intro',
                component: ComponentCreator('/courses/ai-for-leaders/ai-literacy/intro', '298'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/algorithms-high-level-overview',
                component: ComponentCreator('/courses/ai-for-leaders/algorithms-high-level-overview', '457'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/classical-ml-in-market',
                component: ComponentCreator('/courses/ai-for-leaders/classical-ml-in-market', '489'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/classification-regression-supervised-unsupervised',
                component: ComponentCreator('/courses/ai-for-leaders/classification-regression-supervised-unsupervised', '8d1'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/curriculum-overview',
                component: ComponentCreator('/courses/ai-for-leaders/curriculum-overview', '83d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/curriculum-tree',
                component: ComponentCreator('/courses/ai-for-leaders/curriculum-tree', '80b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/curriculum-visual-tree',
                component: ComponentCreator('/courses/ai-for-leaders/curriculum-visual-tree', 'c4b'),
                exact: true
              },
              {
                path: '/courses/ai-for-leaders/genai-for-everyone/intro',
                component: ComponentCreator('/courses/ai-for-leaders/genai-for-everyone/intro', '6b0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/intro',
                component: ComponentCreator('/courses/ai-for-leaders/intro', '084'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/llms-101/intro',
                component: ComponentCreator('/courses/ai-for-leaders/llms-101/intro', 'c2e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/machine-learning-fundamentals',
                component: ComponentCreator('/courses/ai-for-leaders/machine-learning-fundamentals', 'c67'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/ai-for-leaders/prompt-engineering/intro',
                component: ComponentCreator('/courses/ai-for-leaders/prompt-engineering/intro', 'ec7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/build-gpt/l0-intro',
                component: ComponentCreator('/courses/build-gpt/l0-intro', '1b3'),
                exact: true
              },
              {
                path: '/courses/build-gpt/l1-problems-rnns',
                component: ComponentCreator('/courses/build-gpt/l1-problems-rnns', '7fe'),
                exact: true
              },
              {
                path: '/courses/build-gpt/l2-token-embeddings',
                component: ComponentCreator('/courses/build-gpt/l2-token-embeddings', '051'),
                exact: true
              },
              {
                path: '/courses/build-gpt/l3-positional-embeddings',
                component: ComponentCreator('/courses/build-gpt/l3-positional-embeddings', '2f5'),
                exact: true
              },
              {
                path: '/courses/deep-learning/CNNS',
                component: ComponentCreator('/courses/deep-learning/CNNS', 'b12'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/deep-learning/intro',
                component: ComponentCreator('/courses/deep-learning/intro', 'e06'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/deep-learning/perceptron',
                component: ComponentCreator('/courses/deep-learning/perceptron', '143'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/deep-learning/RNNs',
                component: ComponentCreator('/courses/deep-learning/RNNs', 'd39'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/AccessingLLMs',
                component: ComponentCreator('/courses/language-models/AccessingLLMs', 'edf'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/AttentionMechanism',
                component: ComponentCreator('/courses/language-models/AttentionMechanism', 'c5f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/BaseModels',
                component: ComponentCreator('/courses/language-models/BaseModels', 'e25'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/Evaluation',
                component: ComponentCreator('/courses/language-models/Evaluation', '530'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/EvolutionGpt2',
                component: ComponentCreator('/courses/language-models/EvolutionGpt2', '9b3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/Hallucinations',
                component: ComponentCreator('/courses/language-models/Hallucinations', 'c8f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/intro',
                component: ComponentCreator('/courses/language-models/intro', '87b'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/LLMIdentity',
                component: ComponentCreator('/courses/language-models/LLMIdentity', 'f6f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/LLMInconsistencies',
                component: ComponentCreator('/courses/language-models/LLMInconsistencies', 'ea5'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/LLMJudgement',
                component: ComponentCreator('/courses/language-models/LLMJudgement', '451'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/LoRAFineTuning',
                component: ComponentCreator('/courses/language-models/LoRAFineTuning', 'ca3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/Multimodality',
                component: ComponentCreator('/courses/language-models/Multimodality', '8e6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/NNInference',
                component: ComponentCreator('/courses/language-models/NNInference', 'b73'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/NNInternals',
                component: ComponentCreator('/courses/language-models/NNInternals', 'b4c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/NNTraining',
                component: ComponentCreator('/courses/language-models/NNTraining', 'd07'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/PostTraining',
                component: ComponentCreator('/courses/language-models/PostTraining', '431'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/PostTrainingReinforcementLearning',
                component: ComponentCreator('/courses/language-models/PostTrainingReinforcementLearning', '337'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/QueryToResponse',
                component: ComponentCreator('/courses/language-models/QueryToResponse', '016'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/RAGAgents',
                component: ComponentCreator('/courses/language-models/RAGAgents', 'eb7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/ReinforcementLearning',
                component: ComponentCreator('/courses/language-models/ReinforcementLearning', '454'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/ThinkingInTokens',
                component: ComponentCreator('/courses/language-models/ThinkingInTokens', '44a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/ThinkingRL',
                component: ComponentCreator('/courses/language-models/ThinkingRL', 'b2d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/language-models/Tokenization',
                component: ComponentCreator('/courses/language-models/Tokenization', '28f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/machine-learning/intro',
                component: ComponentCreator('/courses/machine-learning/intro', '476'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/machine-learning/logistic_regression_tutorial',
                component: ComponentCreator('/courses/machine-learning/logistic_regression_tutorial', 'd42'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/machine-learning/supervised-learning',
                component: ComponentCreator('/courses/machine-learning/supervised-learning', 'c19'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/resources/intro',
                component: ComponentCreator('/courses/resources/intro', 'dd2'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/courses/tutorials/logistic-regression',
                component: ComponentCreator('/courses/tutorials/logistic-regression', 'f06'),
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
    path: '*',
    component: ComponentCreator('*'),
  },
];
