import type { LucideIcon } from 'lucide-react';
import {
  BrainCog,
  Terminal,
  Bot,
  MessageSquare,
  TrendingUp,
  Network,
  Eye,
  Waves,
  Focus,
  Cpu,
  Microscope,
  Blocks,
} from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: 'AI for Leaders' | 'AI for Engineers';
  subcategory?: string;
  href: string;
  thumbnail: string;
  featured: boolean;
  outcomes: string[];
  icon: LucideIcon;
  curriculumUrl?: string;
  students?: string;
  courseCount?: number;
}

export const courses: Course[] = [
  // -- AI for Leaders --
  {
    id: 'ai-literacy',
    title: 'AI Literacy',
    description: 'Core AI concepts and terminology for business leaders',
    level: 'Beginner',
    category: 'AI for Leaders',
    href: '/courses/tracks/ai-for-leaders/ai-literacy/intro',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Understand core AI concepts and terminology',
      'Evaluate AI solutions for business problems',
      'Communicate with technical teams effectively',
    ],
    icon: BrainCog,
    students: '2.1k',
    courseCount: 1,
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Craft effective prompts to get the best out of any LLM',
    level: 'Beginner',
    category: 'AI for Leaders',
    href: '/courses/tracks/ai-for-leaders/prompt-engineering/intro',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Craft effective prompts for any LLM',
      'Build prompt templates for business workflows',
      'Evaluate and iterate on prompt quality',
    ],
    icon: Terminal,
    students: '1.8k',
    courseCount: 1,
  },
  {
    id: 'generative-ai-for-everyone',
    title: 'Generative AI for Everyone',
    description: 'Understand generative AI and its real-world applications',
    level: 'Beginner',
    category: 'AI for Leaders',
    href: '/courses/tracks/ai-for-leaders/generative-ai-for-everyone/intro',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Understand how generative AI works',
      'Apply GenAI tools in your workflow',
      'Lead AI adoption in your organization',
    ],
    icon: Bot,
    students: '1.2k',
    courseCount: 1,
  },
  {
    id: 'llms-101',
    title: 'LLMs 101',
    description: 'Large Language Models 101',
    level: 'Intermediate',
    category: 'AI for Leaders',
    href: '/courses/tracks/ai-for-leaders/llms-101/intro',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Understand LLM architectures at a high level',
      'Evaluate LLM capabilities and limitations',
      'Make informed LLM adoption decisions',
    ],
    icon: MessageSquare,
    students: '950',
    courseCount: 1,
  },

  // -- AI for Engineers --
  {
    id: 'foundations-of-regression',
    title: 'Foundations of Regression',
    description: 'Learn linear and logistic regression from scratch, understand loss functions, gradient descent, and build ML models.',
    level: 'Intermediate',
    category: 'AI for Engineers',
    subcategory: 'Foundations',
    href: '/courses/tracks/ai-engineering/foundations-of-regression/intro',
    thumbnail: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Implement linear & logistic regression from scratch',
      'Understand loss functions and gradient descent',
      'Build production-ready ML models',
    ],
    icon: TrendingUp,
    students: '4.5k',
    courseCount: 1,
  },
  {
    id: 'deep-neural-networks',
    title: 'Deep Neural Networks',
    description: 'Design, train, and optimize deep neural networks. Understand backpropagation and implement DNNs from scratch.',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Deep Learning',
    href: '/courses/tracks/ai-engineering/deep-neural-networks/intro',
    thumbnail: 'https://images.unsplash.com/photo-1614850523011-8f49ffc73908?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Design and train neural network architectures',
      'Understand backpropagation and optimization',
      'Implement DNNs from scratch in Python',
    ],
    icon: Network,
    students: '3.2k',
    courseCount: 1,
  },
  {
    id: 'deep-computer-vision-cnn',
    title: 'Deep Computer Vision: CNN',
    description: 'Convolutional neural networks and modern computer vision systems',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Deep Learning',
    href: '/courses/tracks/ai-engineering/deep-computer-vision-cnn/intro',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Build image classification systems',
      'Implement CNNs and understand convolution operations',
      'Apply transfer learning techniques',
    ],
    icon: Eye,
    students: '2.8k',
    courseCount: 1,
  },
  {
    id: 'deep-sequence-modelling-rnn',
    title: 'Deep Sequence Modelling: RNN',
    description: 'Recurrent neural networks and practical sequence modelling techniques',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Deep Learning',
    href: '/courses/tracks/ai-engineering/deep-sequence-modelling-rnn/intro',
    thumbnail: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Build sequence-to-sequence models',
      'Implement LSTMs and GRUs',
      'Handle time-series and text data',
    ],
    icon: Waves,
    students: '1.9k',
    courseCount: 1,
  },
  {
    id: 'attention-is-all-you-need',
    title: 'Attention Is All You Need',
    description: 'Deep dive into attention mechanisms, multi-head attention, and the transformer architecture from the ground up.',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Transformers & LLMs',
    href: '/courses/tracks/ai-engineering/attention-is-all-you-need-transformer/intro',
    thumbnail: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Understand self-attention and multi-head attention',
      'Implement transformer architecture from scratch',
      'Read and implement research papers',
    ],
    icon: Focus,
    students: '3.8k',
    courseCount: 1,
  },
  {
    id: 'build-and-train-gpt',
    title: 'Build & Train Your Own GPT',
    description: 'Build a GPT-2 model from scratch, train it on custom datasets, and understand tokenization and text generation.',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Transformers & LLMs',
    href: '/courses/tracks/ai-engineering/build-and-train-gpt/intro',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop',
    featured: true,
    outcomes: [
      'Build a GPT model from scratch',
      'Train on custom datasets',
      'Understand tokenization and generation',
    ],
    icon: Cpu,
    students: '5.1k',
    courseCount: 1,
  },
  {
    id: 'ai-research',
    title: 'AI Research',
    description: 'AI research and emerging technologies',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Applied AI',
    href: '/courses/tracks/ai-engineering/ai-research/intro',
    thumbnail: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Read and implement research papers',
      'Stay updated with latest AI breakthroughs',
      'Contribute to open-source AI projects',
    ],
    icon: Microscope,
    students: '1.5k',
    courseCount: 1,
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    description: 'Agentic AI and multi-agent systems',
    level: 'Advanced',
    category: 'AI for Engineers',
    subcategory: 'Applied AI',
    href: '/courses/tracks/ai-engineering/agentic-ai-multi-agent-systems/intro',
    thumbnail: 'https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?w=600&h=400&fit=crop',
    featured: false,
    outcomes: [
      'Build autonomous AI agents',
      'Design multi-agent systems',
      'Implement tool use and planning',
    ],
    icon: Blocks,
    students: '2.4k',
    courseCount: 1,
  },
];

export const courseCategories = {
  'AI for Leaders': courses.filter((c) => c.category === 'AI for Leaders'),
  'AI for Engineers': courses.filter((c) => c.category === 'AI for Engineers'),
};

// Sub-categories for AI for Engineers dropdown
export const engineeringSubcategories = [
  'Foundations',
  'Deep Learning',
  'Transformers & LLMs',
  'Applied AI',
] as const;

export function getEngineeringBySubcategory() {
  const grouped: Record<string, Course[]> = {};
  for (const sub of engineeringSubcategories) {
    grouped[sub] = courses.filter(
      (c) => c.category === 'AI for Engineers' && c.subcategory === sub
    );
  }
  return grouped;
}

export const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);
