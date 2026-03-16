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
    ],
    curriculumLink: '/courses/machine-learning/intro',
  },
];
