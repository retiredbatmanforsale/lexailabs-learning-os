import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { BookOpen, Users, Zap, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

const companyLogos = [
  { name: 'Google', src: require('@site/src/assets/logos/google.png').default },
  { name: 'Microsoft', src: require('@site/src/assets/logos/microsoft.png').default },
  { name: 'Amazon', src: require('@site/src/assets/logos/amazon.png').default },
  { name: 'Flipkart', src: require('@site/src/assets/logos/flipkart.png').default },
  { name: 'Oracle', src: require('@site/src/assets/logos/oracle.png').default },
  { name: 'Qualcomm', src: require('@site/src/assets/logos/qualcomm.png').default },
  { name: 'PwC', src: require('@site/src/assets/logos/pwc.png').default },
  { name: 'Meesho', src: require('@site/src/assets/logos/meesho.png').default },
  { name: 'MathWorks', src: require('@site/src/assets/logos/mathworks.png').default },
  { name: 'Demandbase', src: require('@site/src/assets/logos/demandbase.png').default },
  { name: 'SingleStore', src: require('@site/src/assets/logos/singlestore.png').default },
  { name: 'IIT', src: require('@site/src/assets/logos/iit.png').default },
  { name: 'IIT Gandhinagar', src: require('@site/src/assets/logos/iitgandhinagar.png').default },
  { name: 'IIT Hyderabad', src: require('@site/src/assets/logos/iithyderabad.png').default },
  { name: 'IIIT Delhi', src: require('@site/src/assets/logos/iiitd.png').default },
];

const instructorPic = require('@site/src/assets/instructor-pic.jpeg').default;

const featuredCourses = [
  {
    title: 'AI for Leaders',
    description:
      'Understand AI strategy, capabilities, and implementation for business leaders and decision makers.',
    href: '/courses/ai-for-leaders/intro',
    badge: 'Beginner',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    iconColor: '#3b82f6',
  },
  {
    title: 'Machine Learning',
    description:
      'Master supervised, unsupervised, and reinforcement learning algorithms with hands-on examples.',
    href: '/courses/machine-learning/intro',
    badge: 'Intermediate',
    gradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    iconColor: '#16a34a',
  },
  {
    title: 'Deep Learning',
    description:
      'Dive into neural networks, CNNs, RNNs, transformers, and advanced architectures driving AI.',
    href: '/courses/deep-learning/intro',
    badge: 'Advanced',
    gradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    iconColor: '#9333ea',
  },
  {
    title: 'Language Models',
    description:
      'Understand LLMs, tokenization, fine-tuning, prompt engineering, and emerging capabilities.',
    href: '/courses/language-models/intro',
    badge: 'Intermediate',
    gradient: 'linear-gradient(135deg, #fff5f2 0%, #ffdcd0 100%)',
    iconColor: '#ff7f50',
  },
  {
    title: 'Resources',
    description:
      'Curated datasets, libraries, research papers, and tutorials to support your learning journey.',
    href: '/courses/resources/intro',
    badge: 'All Levels',
    gradient: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
    iconColor: '#ca8a04',
  },
];

function HeroSection() {
  return (
    <section className="py-24 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-[960px] mx-auto px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-sm font-medium mb-6">
          <BookOpen size={14} />
          <span>AI-Powered Learning Platform</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.1] text-[#141414] mb-6 font-serif">
          Build AI capability
          <br />
          <span className="text-blue-500">for yourself</span>
        </h1>
        <p className="text-lg text-[#666] leading-relaxed mb-10 max-w-[600px] mx-auto">
          Learn from industry experts and gain practical skills in Machine
          Learning, Deep Learning, Generative AI, and AI Applications with our
          comprehensive course suite.
        </p>
        <div className="flex gap-3 justify-center mb-12 flex-col md:flex-row items-center">
          <a
            href="#featured-courses"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl no-underline transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('featured-courses')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Courses
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="flex items-center gap-6 justify-center">
          <div>
            <span className="text-4xl font-normal text-[#141414] font-serif">5</span>
            <span className="text-[15px] text-[#999] font-medium ml-2">Courses</span>
          </div>
          <div className="w-px h-12 bg-[#e5e5e5]" />
          <div>
            <span className="text-4xl font-normal text-[#141414] font-serif">100+</span>
            <span className="text-[15px] text-[#999] font-medium ml-2">Resources</span>
          </div>
          <div className="w-px h-12 bg-[#e5e5e5]" />
          <div>
            <span className="text-4xl font-normal text-[#141414] font-serif">500+</span>
            <span className="text-[15px] text-[#999] font-medium ml-2">Learners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  return (
    <section className="py-14 bg-[#fafafa]">
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-[#999] mb-0">
          Our alumni work at leading companies worldwide
        </p>
      </div>
      <div className="overflow-hidden relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[100px] z-10 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[100px] z-10 bg-gradient-to-l from-[#fafafa] to-transparent" />
        <div className="flex items-center gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...companyLogos, ...companyLogos].map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="flex-shrink-0 flex items-center gap-2">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-9 w-auto max-w-9 object-contain"
              />
              <span className="text-lg font-semibold text-[#555] whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCoursesSection() {
  return (
    <section id="featured-courses" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#fff5f2] border border-[#ffdcd0] text-[#ff7f50] text-[13px] font-semibold rounded-full mb-4">Featured Courses</span>
          <h2 className="text-center text-3xl md:text-4xl font-normal text-[#141414] mb-3 font-serif">Start Your AI Journey</h2>
          <p className="text-center text-[17px] text-[#666] mb-12 max-w-[560px] mx-auto">
            Hand-picked courses to help you build practical AI skills, whether
            you're a developer or business professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.title}
              to={course.href}
              className="flex flex-col border border-[#f0f0f0] rounded-2xl overflow-hidden bg-white hover:border-[#d4d4d4] transition-colors no-underline text-inherit group"
            >
              <div
                className="aspect-video flex items-center justify-center"
                style={{ background: course.gradient }}
              >
                <BookOpen size={32} color={course.iconColor} />
              </div>
              <div className="p-5 pb-6 flex flex-col flex-1">
                <span
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: course.iconColor }}
                >
                  {course.badge}
                </span>
                <h3 className="text-xl font-normal text-[#141414] mb-2 font-serif">{course.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed mb-4 flex-1">
                  {course.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 mt-auto group-hover:text-blue-600">
                  Start learning <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <BookOpen size={24} />,
    title: 'Structured Courses',
    description:
      'From foundational ML concepts to cutting-edge Language Models, learn through well-organized, comprehensive curricula.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Interactive Learning',
    description:
      'Experiment with algorithms through interactive tutorials. Learn by doing with hands-on code examples and visualizations.',
  },
  {
    icon: <Users size={24} />,
    title: 'Community Driven',
    description:
      'Built by the community, for the community. Contribute, collaborate, and grow together with fellow AI practitioners.',
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="text-center text-3xl md:text-4xl font-normal text-[#141414] mb-3 font-serif">Why Learn with Lex AI?</h2>
        <p className="text-center text-[17px] text-[#666] mb-12 max-w-[560px] mx-auto">
          Everything you need to master AI and Machine Learning, in one place.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[480px] lg:max-w-none mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 border border-[#f0f0f0] rounded-3xl bg-white hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-500 mb-5">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#141414] mb-2">{feature.title}</h3>
              <p className="text-[15px] text-[#666] leading-relaxed m-0">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="text-center text-3xl md:text-4xl font-normal text-[#141414] mb-3 font-serif">Meet Your Instructor</h2>
        <p className="text-center text-[17px] text-[#666] mb-12 max-w-[560px] mx-auto">
          Learn from industry experts with real-world experience
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 p-10 border border-[#f0f0f0] rounded-2xl bg-[#fafafa] max-w-[960px] mx-auto text-center md:text-left">
          <div className="flex-shrink-0">
            <img
              src={instructorPic}
              alt="Puru Kathuria - Lead Instructor"
              className="w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full object-cover border-[3px] border-[#f0f0f0]"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5 flex-col md:flex-row">
              <h3 className="text-2xl font-normal text-[#141414] m-0 font-serif">Puru Kathuria</h3>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-500 text-[13px] font-medium rounded-full">Lead Instructor</span>
            </div>
            <p className="text-[15px] text-[#999] mb-4 mt-0">
              Founder, Lex AI | Former Software Engineer at Google
            </p>
            <ul className="list-none p-0 m-0 mb-5">
              <li className="flex items-start gap-3 text-[15px] text-[#666] leading-relaxed mb-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4d4d4] before:shrink-0 before:mt-2">
                At Google, worked on Backend Engineering, Distributed Systems,
                and AI for Cloud Security products
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#666] leading-relaxed mb-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4d4d4] before:shrink-0 before:mt-2">
                Teaches Applied AI (Machine Learning, Deep Learning, LLMs) at
                Lex AI
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#666] leading-relaxed mb-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4d4d4] before:shrink-0 before:mt-2">
                Previously at MathWorks, focused on self-driving cars, motion
                planning, and speech recognition
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#666] leading-relaxed mb-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4d4d4] before:shrink-0 before:mt-2">
                Founded a Deep Learning Book Club, fostering a community of
                learners
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-start">
              <span className="inline-block px-3 py-1 text-[13px] font-medium rounded-full bg-green-50 text-green-600">
                CS Engineering with ML &amp; AI focus
              </span>
              <span className="inline-block px-3 py-1 text-[13px] font-medium rounded-full bg-blue-50 text-blue-500">
                Former SWE at Google
              </span>
              <span className="inline-block px-3 py-1 text-[13px] font-medium rounded-full bg-[#fff5f2] text-[#ff7f50]">
                Former SWE at MathWorks
              </span>
              <span className="inline-block px-3 py-1 text-[13px] font-medium rounded-full bg-[#fff5f2] text-[#ff7f50]">
                Trained 500+ students
              </span>
            </div>
            <div className="flex gap-2 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/purukathuria/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0f0f0] text-[#666] hover:bg-blue-500 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/purukathuria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0f0f0] text-[#666] hover:bg-blue-500 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/purukathuria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0f0f0] text-[#666] hover:bg-blue-500 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-[#fafafa] border-t border-[#f0f0f0]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="text-4xl font-normal text-[#141414] mb-4 font-serif">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-[17px] text-[#666] mb-8 leading-relaxed">
            Join hundreds of learners building the future with AI. Start for
            free, learn at your own pace.
          </p>
          <div className="flex gap-3 justify-center flex-col md:flex-row items-center">
            <Link
              to="/courses/machine-learning/intro"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl no-underline transition-colors"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/fellowship"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-transparent text-[#141414] font-semibold border-[1.5px] border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] hover:bg-[#fafafa] no-underline transition-colors"
            >
              AI Fellowship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Home"
      description="Learn AI, Machine Learning, Deep Learning and Language Models with structured courses, interactive tutorials, and a thriving community."
    >
      <HeroSection />
      <TrustedBySection />
      <main>
        <FeaturedCoursesSection />
        <FeaturesSection />
        <InstructorSection />
        <CTASection />
      </main>
    </Layout>
  );
}
