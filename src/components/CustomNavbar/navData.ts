import {
  Briefcase,
  Brain,
  Layers,
  MessageSquare,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

export interface NavCourse {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}

export interface NavDropdownData {
  label: string;
  courses: NavCourse[];
  curriculumLink?: string;
}

export const navDropdowns: NavDropdownData[] = [
  {
    label: 'AI for Leaders',
    courses: [
      {
        icon: Briefcase,
        title: 'AI for Leaders',
        description: 'Strategic AI adoption for business leaders and managers',
        to: '/courses/ai-for-leaders/intro',
      },
      {
        icon: Briefcase,
        title: 'AI Literacy',
        description: 'AI literacy for business leaders and managers',
        to: '/courses/ai-for-leaders/ai-literacy/intro',
      },
      {
        icon: Briefcase,
        title: 'Prompt Engineering',
        description: 'Prompt engineering for business leaders and managers',
        to: '/courses/ai-for-leaders/prompt-engineering/intro',
      },
      {
        icon: Briefcase,
        title: 'Generative AI for Everyone',
        description: 'Modern AI Systems and Generative AI for Everyone',
        to: '/courses/ai-for-leaders/genai-for-everyone/intro',
      },
      {
        icon: Briefcase,
        title: 'LLMs 101',
        description: 'Large Language Models 101',
        to: '/courses/ai-for-leaders/llms-101/intro',
      },
    ],
    curriculumLink: '/courses/ai-for-leaders/intro',
  },
  {
    label: 'AI for Engineers',
    courses: [
      {
        icon: Brain,
        title: 'Machine Learning',
        description: 'Supervised, unsupervised, and reinforcement learning fundamentals',
        to: '/courses/machine-learning/intro',
      },
      {
        icon: Layers,
        title: 'Deep Learning',
        description: 'Neural networks, CNNs, RNNs, and modern architectures',
        to: '/courses/deep-learning/intro',
      },
      {
        icon: MessageSquare,
        title: 'Language Models',
        description: 'Transformers, LLMs, prompt engineering, and fine-tuning',
        to: '/courses/language-models/intro',
      },
      {
        icon: BookOpen,
        title: 'Resources',
        description: 'Datasets, papers, tools, and community resources',
        to: '/courses/resources/intro',
      },
      {
        icon: BookOpen,
        title: 'Deep Sequence Modelling: RNN',
        description: 'Recurrent neural networks and practical sequence modelling techniques',
        to: '/courses/deep-sequence-modelling-rnn/intro',
      },
      {
        icon: BookOpen,
        title: 'Deep Computer Vision: CNN',
        description: 'Convolutional neural networks and modern computer vision systems',
        to: '/courses/deep-computer-vision-cnn/intro',
      },
      {
        icon: BookOpen,
        title: 'Attention Is All You Need',
        description: 'Attention mechanisms and transformer models',
        to: '/courses/attention-is-all-you-need/intro',
      },
      {
        icon: BookOpen,
        title: 'Build and Train Your Own GPT2 Model',
        description: 'Building and training your own GPT2 model',
        to: '/courses/build-and-train-your-own-gpt2-model/intro',
      },
      {
        icon: BookOpen,
        title: 'Deep Neural Networks',
        description: 'Deep neural networks and advanced architectures',
        to: '/courses/deep-neural-networks/intro',
      },
      {
        icon: BookOpen,
        title: 'Foundations of Regression',
        description: 'Foundations of regression and linear regression',
        to: '/courses/foundations-of-regression/intro',
      },
      {
        icon: BookOpen,
        title: 'Tree-Based Algorithms (Classical ML)',
        description: 'Tree-based algorithms and classical machine learning',
        to: '/courses/tree-based-algorithms-classical-ml/intro',
      },
      {
        icon: BookOpen,
        title: 'AI Research',
        description: 'AI research and emerging technologies',
        to: '/courses/ai-research/intro',
      },
      {
        icon: BookOpen,
        title: 'Agentic AI',
        description: 'Agentic AI and AI agents',
        to: '/courses/agentic-ai/intro',
      },
    ],
    curriculumLink: '/courses/machine-learning/intro',
  },
];
