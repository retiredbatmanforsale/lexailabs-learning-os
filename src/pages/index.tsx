import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { Navbar } from "../../components/custom/Navbar";
import { Footer } from "../../components/custom/Footer";

// ============================================================================
// Data
// ============================================================================

const trustedLogos = [
  { name: "Google", logo: "/logos/google.png" },
  { name: "Amazon", logo: "/logos/amazon.png" },
  { name: "Qualcomm", logo: "/logos/qualcomm.png" },
  { name: "PwC", logo: "/logos/pwc.png" },
  { name: "Flipkart", logo: "/logos/flipkart.png" },
  { name: "MathWorks", logo: "/logos/mathworks.png" },
  { name: "IIT Gandhinagar", logo: "/logos/iitgandhinagar.png" },
  { name: "IIT Hyderabad", logo: "/logos/iithyderabad.png" },
];

const courses = [
  {
    title: "AI for Leaders",
    description:
      "Understand AI strategy, governance, and how to lead AI-driven transformation in your organization.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    badge: "Non-Engineering",
    lessons: 12,
    duration: "6 hours",
    href: "/docs/ai-for-leaders/intro",
  },
  {
    title: "Machine Learning Foundations",
    description:
      "Master supervised, unsupervised, and reinforcement learning algorithms with hands-on projects.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80",
    badge: "Engineering",
    lessons: 24,
    duration: "15 hours",
    href: "/docs/machine-learning/intro",
  },
  {
    title: "Deep Learning",
    description:
      "Dive into neural networks, CNNs, RNNs, transformers, and advanced architectures driving AI breakthroughs.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&q=80",
    badge: "Engineering",
    lessons: 20,
    duration: "12 hours",
    href: "/docs/deep-learning/intro",
  },
  {
    title: "Language Models",
    description:
      "Understand LLMs, tokenization, fine-tuning techniques, prompt engineering, and emerging capabilities.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80",
    badge: "Engineering",
    lessons: 16,
    duration: "10 hours",
    href: "/docs/language-models/intro",
  },
  {
    title: "AI Resources & Tools",
    description:
      "Curated datasets, libraries, research papers, and tutorials for AI and ML practitioners.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80",
    badge: "Learning Path",
    lessons: 10,
    duration: "5 hours",
    href: "/docs/resources/intro",
  },
];

const testimonials = [
  {
    name: "Abhinav Srivastava",
    role: "Consultant, Deloitte",
    text: "Puru made machine learning easy to grasp. He turned complex topics into clear, manageable lessons throughout LexAI Fellowship.",
    initials: "AS",
  },
  {
    name: "Harneet Kaur Bajga",
    role: "UX Researcher, MathWorks",
    text: "With Puru's practical teaching, I gained real-world ML skills that made a difference in my career.",
    initials: "HK",
  },
  {
    name: "Rahul Mehta",
    role: "ML Engineer, Google",
    text: "Learning ML with Puru was intuitive. He truly makes advanced concepts accessible for anyone serious about AI.",
    initials: "RM",
  },
];

// ============================================================================
// Sections
// ============================================================================

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-16 md:pb-24 md:pt-20">
      {/* Gradient blobs for warm/cool background */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-200/40 via-rose-100/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -top-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-blue-200/30 via-indigo-100/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-t from-purple-100/20 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Build AI capability{" "}
          <span
            className="italic"
            style={{ fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif" }}
          >
            for yourself
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
          Learn from industry experts and gain practical skills in Machine
          Learning, Deep Learning, Generative AI, and AI Applications with our
          comprehensive course suite.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/docs/machine-learning/intro"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white no-underline shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:text-white hover:no-underline hover:shadow-xl"
          >
            Explore Courses
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <button
            onClick={() => alert("Preview coming soon!")}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
          >
            <svg className="size-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Preview
          </button>
        </div>

        {/* Course Preview Image */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-200/30 via-purple-100/20 to-orange-200/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xl">
            <img
              src="/course-page-image.png"
              alt="Lex AI Platform Preview"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBySection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/60 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Our alumni work at leading companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trustedLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex shrink-0 items-center"
            >
              <img
                src={logo.logo}
                alt={logo.name}
                className="h-7 w-auto object-contain sm:h-8"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  title,
  description,
  image,
  badge,
  lessons,
  duration,
  href,
}: {
  title: string;
  description: string;
  image: string;
  badge: string;
  lessons: number;
  duration: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white no-underline shadow-sm transition-all hover:border-gray-300 hover:shadow-lg hover:no-underline"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
            {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
          </div>
          <span className="inline-flex items-center text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-0.5">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCoursesSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600">
            Featured Courses
          </span>
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Start Your AI Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Hand-picked courses to help you build practical AI skills, whether
            you&apos;re a developer or business professional.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/docs/machine-learning/intro"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 no-underline hover:text-blue-700 hover:underline"
          >
            View All {courses.length} Courses
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet Your Instructor
          </h2>
          <p className="text-lg text-gray-500">
            Learn from industry experts with real-world experience
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:items-start md:gap-12 md:p-12">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="size-44 overflow-hidden rounded-2xl border-4 border-gray-100 shadow-lg md:size-52">
                <img
                  src="/puru-pic.jpeg"
                  alt="Puru Kathuria"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 flex flex-col items-center gap-3 md:flex-row">
                <h3 className="text-2xl font-bold text-gray-900">
                  Puru Kathuria
                </h3>
              </div>
              <div className="mb-5 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Founder, Lex AI
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  Former Software Engineer at Google
                </span>
              </div>

              <ul className="mb-6 space-y-3 text-left">
                {[
                  "At Google, worked on Backend Engineering, Distributed Systems, and AI for Cloud Security products",
                  "Teaches Applied AI (Machine Learning, Deep Learning, LLMs) at Lex AI",
                  "Previously at MathWorks, focused on self-driving cars, motion planning, and speech recognition",
                  "Founded a Deep Learning Book Club, fostering a community of learners",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm leading-relaxed text-gray-600">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Credentials */}
              <div className="mb-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Credentials
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Computer Science Engineering with ML & AI focus",
                    "Former Software Engineer at Google",
                    "Former SWE at MathWorks",
                    "Trained 500+ students",
                  ].map((cred) => (
                    <span
                      key={cred}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="flex justify-center gap-3 md:justify-start">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/purukathuria" },
                  { label: "Twitter", href: "https://twitter.com/lexailabs" },
                  { label: "GitHub", href: "https://github.com/lexailabs" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 no-underline transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-500">
            Join thousands of learners who have transformed their careers
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Quote mark */}
              <div className="mb-4 text-4xl font-bold leading-none text-orange-400">
                &ldquo;
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubscriptionCTASection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gray-900 px-8 py-16 text-center shadow-2xl md:px-16">
          <span className="mb-6 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-xs font-semibold text-orange-400">
            One Subscription
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Unlock All Courses
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-400">
            Get lifetime access to all published and upcoming courses.
            Start your AI journey with everything you need in one place.
          </p>

          {/* Checklist */}
          <div className="mx-auto mb-10 flex max-w-md flex-col gap-3 text-left sm:grid sm:grid-cols-2">
            {[
              "All courses included",
              "Hands-on projects",
              "Learn at your own pace",
              "New courses added quarterly",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg className="size-5 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full border-2 border-orange-500 px-8 py-3.5 font-semibold text-orange-400 no-underline transition-all hover:bg-orange-500 hover:text-white hover:no-underline"
          >
            Get Started &mdash; Free Trial
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function Home() {
  return (
    <>
      <Head>
        <title>Lex AI - Build AI Capability for Yourself</title>
        <meta
          name="description"
          content="Learn Machine Learning, Deep Learning, and Language Models with structured courses, hands-on projects, and expert instruction."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar
        navItems={[
          { label: "Courses", href: "/docs/machine-learning/intro" },
          { label: "About", href: "/docs/ai-for-leaders/intro" },
        ]}
        onLogin={() => (window.location.href = "/login")}
        onGetStarted={() => (window.location.href = "/signup")}
      />

      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturedCoursesSection />
        <InstructorSection />
        <TestimonialsSection />
        <SubscriptionCTASection />
      </main>

      <Footer />
    </>
  );
}
