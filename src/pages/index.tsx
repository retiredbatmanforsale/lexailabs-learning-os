import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { BookOpen, Users, Zap, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';
import styles from './index.module.css';

// Company logos with names
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

// Featured courses data
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

// ============================================================================
// Hero Section - Centered, no logo
// ============================================================================

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroBadge}>
          <BookOpen size={14} />
          <span>AI-Powered Learning Platform</span>
        </div>
        <h1 className={styles.heroTitle}>
          Build AI capability
          <br />
          <span className={styles.heroHighlight}>for yourself</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Learn from industry experts and gain practical skills in Machine
          Learning, Deep Learning, Generative AI, and AI Applications with our
          comprehensive course suite.
        </p>
        <div className={styles.heroActions}>
          <a
            href="#featured-courses"
            className={styles.primaryButton}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('featured-courses')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Courses
            <ArrowRight size={18} />
          </a>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Resources</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Learners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Trusted By Section (Animated Marquee with names)
// ============================================================================

function TrustedBySection() {
  return (
    <section className={styles.trustedBy}>
      <div className={styles.trustedByHeader}>
        <p className={styles.trustedByLabel}>
          Our alumni work at leading companies worldwide
        </p>
      </div>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {[...companyLogos, ...companyLogos].map((logo, i) => (
            <div key={`${logo.name}-${i}`} className={styles.logoItem}>
              <img
                src={logo.src}
                alt={logo.name}
                className={styles.companyLogo}
              />
              <span className={styles.companyName}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Featured Courses Section
// ============================================================================

function FeaturedCoursesSection() {
  return (
    <section id="featured-courses" className={styles.courses}>
      <div className={styles.sectionContainer}>
        <div className={styles.coursesSectionHeader}>
          <span className={styles.coursesLabel}>Featured Courses</span>
          <h2 className={styles.sectionTitle}>Start Your AI Journey</h2>
          <p className={styles.sectionSubtitle}>
            Hand-picked courses to help you build practical AI skills, whether
            you're a developer or business professional.
          </p>
        </div>
        <div className={styles.coursesGrid}>
          {featuredCourses.map((course) => (
            <Link
              key={course.title}
              to={course.href}
              className={styles.courseCard}
            >
              <div
                className={styles.courseImage}
                style={{ background: course.gradient }}
              >
                <BookOpen size={32} color={course.iconColor} />
              </div>
              <div className={styles.courseContent}>
                <span
                  className={styles.courseBadge}
                  style={{ color: course.iconColor }}
                >
                  {course.badge}
                </span>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>
                  {course.description}
                </p>
                <span className={styles.courseLink}>
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

// ============================================================================
// Features Section
// ============================================================================

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
    <section className={styles.features}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Why Learn with Lex AI?</h2>
        <p className={styles.sectionSubtitle}>
          Everything you need to master AI and Machine Learning, in one place.
        </p>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Instructor Section
// ============================================================================

function InstructorSection() {
  return (
    <section className={styles.instructor}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Meet Your Instructor</h2>
        <p className={styles.sectionSubtitle}>
          Learn from industry experts with real-world experience
        </p>
        <div className={styles.instructorCard}>
          <div className={styles.instructorAvatar}>
            <img src={instructorPic} alt="Puru Kathuria - Lead Instructor" />
          </div>
          <div className={styles.instructorInfo}>
            <div className={styles.instructorHeader}>
              <h3 className={styles.instructorName}>Puru Kathuria</h3>
              <span className={styles.instructorBadge}>Lead Instructor</span>
            </div>
            <p className={styles.instructorCompany}>
              Founder, Lex AI | Former Software Engineer at Google
            </p>
            <ul className={styles.instructorBio}>
              <li>
                At Google, worked on Backend Engineering, Distributed Systems,
                and AI for Cloud Security products
              </li>
              <li>
                Teaches Applied AI (Machine Learning, Deep Learning, LLMs) at
                Lex AI
              </li>
              <li>
                Previously at MathWorks, focused on self-driving cars, motion
                planning, and speech recognition
              </li>
              <li>
                Founded a Deep Learning Book Club, fostering a community of
                learners
              </li>
            </ul>
            <div className={styles.instructorCredentials}>
              <span className={styles.credentialBadge} data-variant="green">
                CS Engineering with ML &amp; AI focus
              </span>
              <span className={styles.credentialBadge} data-variant="blue">
                Former SWE at Google
              </span>
              <span className={styles.credentialBadge} data-variant="coral">
                Former SWE at MathWorks
              </span>
              <span className={styles.credentialBadge} data-variant="coral">
                Trained 500+ students
              </span>
            </div>
            <div className={styles.instructorSocials}>
              <a
                href="https://www.linkedin.com/in/purukathuria/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/purukathuria"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/purukathuria"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
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

// ============================================================================
// CTA Section
// ============================================================================

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.sectionContainer}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Start Your AI Journey?
          </h2>
          <p className={styles.ctaDescription}>
            Join hundreds of learners building the future with AI. Start for
            free, learn at your own pace.
          </p>
          <div className={styles.ctaActions}>
            <Link
              to="/courses/machine-learning/intro"
              className={styles.primaryButton}
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/fellowship" className={styles.outlineButton}>
              AI Fellowship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Page
// ============================================================================

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
