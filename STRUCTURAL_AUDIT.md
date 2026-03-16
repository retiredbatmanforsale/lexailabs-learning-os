# Structural Audit: lexailabs-learning-os

> **Branch:** `staging`
> **Date:** 2026-03-16
> **Purpose:** Full project audit to prepare for Tatva/LexAI design system migration

---

## Table of Contents

1. [Framework & Build System](#1-framework--build-system)
2. [Styling System](#2-styling-system)
3. [Component Inventory](#3-component-inventory)
4. [Page & Route Structure](#4-page--route-structure)
5. [Content Structure](#5-content-structure)
6. [Assets](#6-assets)
7. [LMS-Specific Features](#7-lms-specific-features)
8. [File Tree](#8-file-tree)
9. [Pain Points & Migration Concerns](#9-pain-points--migration-concerns)

---

## 1. Framework & Build System

### Framework Identity

| Property | Value |
|----------|-------|
| **Primary Framework** | **Docusaurus 3.1.1** (NOT Astro despite the README) |
| **UI Library** | React 18.2.0 |
| **Language** | TypeScript 5.2.2 |
| **Bundler** | Webpack (built into Docusaurus) |
| **CSS Processing** | PostCSS 8.5.6 + Autoprefixer 10.4.21 |
| **Node Requirement** | >= 18.0 |

The README references "Astro Starter Kit" but this is a **Docusaurus project**. There are vestigial Astro files (`astro.config.mjs`, `src/layouts/Layout.astro`, `src/components/Welcome.astro`, `src/pages/index.astro`) that are unused. Docusaurus is the actual runtime.

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/core` | 3.1.1 | Core framework |
| `@docusaurus/preset-classic` | 3.1.1 | Docs/blog/pages preset |
| `@mdx-js/react` | ^3.0.0 | MDX rendering |
| `clsx` | ^2.0.0 | Conditional classnames |
| `dotenv` | ^17.3.1 | Environment variables |
| `lucide-react` | ^0.542.0 | Icon library |
| `prism-react-renderer` | ^2.3.0 | Code syntax highlighting |
| `react` / `react-dom` | ^18.2.0 | UI library |
| `rehype-katex` | ^7.0.1 | Math rendering (KaTeX) |
| `remark-math` | ^6.0.0 | Math in markdown |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/module-type-aliases` | 3.1.1 | Type definitions |
| `@docusaurus/tsconfig` | 3.1.1 | TS config base |
| `@docusaurus/types` | 3.1.1 | Type definitions |
| `@tailwindcss/postcss` | ^4.1.12 | Tailwind PostCSS plugin |
| `@tailwindcss/typography` | ^0.5.16 | Prose styling |
| `autoprefixer` | ^10.4.21 | CSS vendor prefixes |
| `postcss` | ^8.5.6 | CSS processing |
| `tailwindcss` | ^4.1.12 | Utility CSS framework |
| `typescript` | ~5.2.2 | Type checking |

### NPM Scripts

| Script | Command |
|--------|---------|
| `start` | `docusaurus start` |
| `build` | `docusaurus build` |
| `deploy` | `docusaurus deploy` |
| `serve` | `docusaurus serve` |
| `typecheck` | `tsc` |
| `swizzle` | `docusaurus swizzle` |
| `clear` | `docusaurus clear` |

### Config Files

| File | Purpose |
|------|---------|
| `docusaurus.config.ts` | Main config (routes, navbar, footer, plugins, theme) |
| `tsconfig.json` | Extends `@docusaurus/tsconfig`, targets ESNext |
| `tailwind.config.js` | Tailwind v3-style config (content, theme.extend, plugins) |
| `postcss.config.js` | Uses `@tailwindcss/postcss` + `autoprefixer` |
| `sidebars.ts` | Explicit sidebar structure for 6 course categories |
| `astro.config.mjs` | **VESTIGIAL, unused** |

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `API_URL` | Backend auth service URL (Google Cloud Run) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `RAZORPAY_KEY_ID` | Razorpay payment gateway key |

---

## 2. Styling System

### How CSS is Handled

The project uses a **hybrid approach** with three co-existing styling systems:

| Approach | Where Used | Files |
|----------|-----------|-------|
| **CSS Modules** (`.module.css`) | Page layouts, footer, visualizations | 6 files |
| **Plain CSS** | CurriculumTree component | 1 file |
| **Tailwind utility classes** | Tutorial components (LogisticRegression) | Via `tailwind.css` |
| **Infima CSS variables** | Global theme, Docusaurus defaults | `custom.css` |
| **Inline styles** (`style={{}}`) | Login, subscribe, auth components | 11+ components |

### CSS Files Inventory

| File | Purpose | Method |
|------|---------|--------|
| `src/css/custom.css` | **Global theme** - brand colors, typography, buttons, cards | CSS variables (Infima) |
| `src/css/tailwind.css` | Tailwind directives + tutorial component classes | `@tailwind` + `@layer` |
| `src/pages/index.module.css` | Homepage (hero, courses, features, instructor, CTA) | CSS Modules |
| `src/pages/fellowship.module.css` | Fellowship page | CSS Modules |
| `src/theme/Footer/styles.module.css` | Custom footer | CSS Modules |
| `src/components/AIVisualization.module.css` | Neural network canvas | CSS Modules |
| `src/components/BrainIcon.module.css` | Brain icon decoration | CSS Modules |
| `src/components/BrainVisualization.module.css` | Brain SVG visualization | CSS Modules |
| `src/components/HomepageFeatures/styles.module.css` | Feature cards | CSS Modules |
| `src/components/CurriculumTree.css` | Curriculum navigator (dark theme) | Plain CSS |

### Tailwind Configuration

Tailwind v4 is installed but configured with a **v3-style config file** (`tailwind.config.js`):

- `preflight: false` (to avoid conflicting with Docusaurus/Infima)
- Custom colors: `indian-saffron` (#ff9933), `indian-green` (#138808), `indian-blue` (#0066ff), `accent-orange/green/blue`
- Custom animations: `fade-in`, `slide-up`, `pulse-gentle`
- `@tailwindcss/typography` plugin enabled
- Only actively used in the LogisticRegression tutorial components

### CSS Custom Properties (Design Tokens)

#### LexAI Brand Tokens (defined in `custom.css :root`)

```css
--lexai-blue-500:        #3b82f6   /* Primary Blue */
--lexai-blue-600:        #2563eb   /* Primary Blue Hover */
--lexai-coral-500:       #ff7f50   /* Accent Coral */
--lexai-content-primary: #141414   /* Text */
--lexai-bg-primary:      #ffffff   /* Background */
```

#### Infima Theme Variables (mapped from brand tokens)

```css
/* Primary */
--ifm-color-primary:          var(--lexai-blue-500)
--ifm-color-primary-dark:     var(--lexai-blue-600)
--ifm-color-primary-darker:   #1d4ed8
--ifm-color-primary-darkest:  #1e3a8a
--ifm-color-primary-light:    #60a5fa
--ifm-color-primary-lighter:  #93c5fd
--ifm-color-primary-lightest: #bfdbfe

/* Secondary */
--ifm-color-secondary:          var(--lexai-coral-500)
--ifm-color-secondary-dark:     #f9735c
--ifm-color-secondary-darker:   #ea5f3f
--ifm-color-secondary-darkest:  #c2410c
--ifm-color-secondary-light:    #ff9a73
--ifm-color-secondary-lighter:  #ffc2a6
--ifm-color-secondary-lightest: #ffe0cf

/* Semantic */
--ifm-color-success:  #10b981
--ifm-color-info:     #0ea5e9
--ifm-color-warning:  #f59e0b
--ifm-color-error:    #ef4444

/* Typography */
--ifm-font-family-base:    'Plus Jakarta Sans', system-ui, ...
--ifm-heading-font-family: 'Instrument Serif', Georgia, ...
--ifm-font-size-base:      16px
--ifm-line-height-base:    1.6

/* Layout */
--ifm-spacing-horizontal:  1.5rem
--ifm-spacing-vertical:    1.5rem
--ifm-global-radius:       0.5rem
--ifm-button-border-radius: 0.375rem
```

### Color Palette (All Hardcoded Values Found)

#### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Blue 500 | `#3b82f6` | Primary buttons, links, badges, feature icons |
| Blue 600 | `#2563eb` | Hover states |
| Coral 500 | `#ff7f50` | Secondary accent, course labels |
| Content Primary | `#141414` | Headings, body text |

#### Neutral Grays (hardcoded across 10+ files)

| Hex | Usage |
|-----|-------|
| `#ffffff` | Backgrounds, button text |
| `#fafbff` | Card hover background |
| `#fafafa` | Section alternating backgrounds |
| `#f9fafb` | Light backgrounds |
| `#f8fafc` | Light backgrounds |
| `#f5f5f5` | Social button backgrounds |
| `#f3f4f6` | Light gray backgrounds |
| `#f0f0f0` | Borders, dividers |
| `#eff6ff` | Blue tinted backgrounds |
| `#e5e7eb` | Table borders |
| `#e5e5e5` | Outline button borders |
| `#dbeafe` | Hover borders (blue tint) |
| `#d4d4d4` | Hover borders, bullet dots |
| `#d1d5db` | Input borders |
| `#999999` | Tertiary text (labels, dates) |
| `#6b7280` | Medium gray text |
| `#666666` | Secondary text (descriptions) |
| `#555555` | Company name text |
| `#374151` | Medium dark text |
| `#1f2937` | Dark text |

#### Semantic Colors (hardcoded)

| Purpose | Hex Values |
|---------|-----------|
| Success | `#10b981`, `#059669`, `#16a34a` |
| Warning | `#f59e0b` |
| Error | `#ef4444`, `#dc2626` |
| Info | `#0ea5e9` |

#### CurriculumTree Dark Theme (standalone palette)

```
Background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e)
Indian flag accents: rgba(255,153,51), rgba(0,123,255), rgba(19,136,8)
Gradient accents: #4f46e5, #7c3aed, #6366f1, #8b5cf6
```

### Font Stack

#### Loaded via Google Fonts CDN (in `docusaurus.config.ts` stylesheets)

| Font | Weights | Usage |
|------|---------|-------|
| **Instrument Serif** | 400 (regular, italic) | Display headings (h1, h2, h3), navbar brand title |
| **Plus Jakarta Sans** | 400, 500, 600, 700 | Body text, UI elements, buttons, nav items |
| **Lora** | 400, 500, 600, 700 | Documentation/long-form reading content |

#### Code Font Stack (CSS only, not loaded)

```css
'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, monospace
```

#### Additional CDN

- KaTeX CSS from jsdelivr CDN for math rendering

#### Font-Family Assignments

| Element | Font |
|---------|------|
| h1, h2, h3 | `'Instrument Serif', Georgia, 'Times New Roman', serif` |
| h4, h5, h6 | `'Plus Jakarta Sans', system-ui, ...` |
| Body / UI | `'Plus Jakarta Sans', system-ui, ...` |
| Docs / prose | `'Lora', Georgia, 'Times New Roman', serif` |
| Code | `'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, monospace` |
| Navbar brand | `'Instrument Serif', Georgia, serif` |

---

## 3. Component Inventory

### Complete Component Table

| # | Component | File Path | Type | Styling | Purpose |
|---|-----------|-----------|------|---------|---------|
| 1 | **Root** | `src/theme/Root.tsx` | Layout wrapper | None | AuthProvider + RouteProtector |
| 2 | **Navbar Content** | `src/theme/Navbar/Content/index.tsx` | Theme override | None | Extends navbar with auth buttons |
| 3 | **Footer** | `src/theme/Footer/index.tsx` | Theme override | CSS Module | Custom footer (social, contact, links) |
| 4 | **NavbarAuthButtons** | `src/components/NavbarAuthButtons.tsx` | Reusable | Inline styles | Login/user dropdown in navbar |
| 5 | **AuthGuard** | `src/components/AuthGuard.tsx` | Reusable | Inline styles | Route protection wrapper |
| 6 | **AccessDenied** | `src/components/AccessDenied.tsx` | Reusable | Inline styles | Access denied message + CTA |
| 7 | **GoogleSignInButton** | `src/components/GoogleSignInButton.tsx` | Reusable | Google SDK | Google OAuth button |
| 8 | **LoginForm** | `src/components/LoginForm.tsx` | Reusable | Inline styles | Email/password login form |
| 9 | **RegisterForm** | `src/components/RegisterForm.tsx` | Reusable | Inline styles | Registration form |
| 10 | **PaymentButton** | `src/components/PaymentButton.tsx` | Reusable | Inline styles | Razorpay one-time payment |
| 11 | **SubscriptionButton** | `src/components/SubscriptionButton.tsx` | Reusable | Inline styles | Razorpay subscription |
| 12 | **AIVisualization** | `src/components/AIVisualization.tsx` | Reusable | CSS Module | Canvas 3D neural network animation |
| 13 | **BrainIcon** | `src/components/BrainIcon.tsx` | Reusable | CSS Module | SVG brain icon with decoration |
| 14 | **BrainVisualization** | `src/components/BrainVisualization.tsx` | Reusable | CSS Module | SVG brain architecture diagram |
| 15 | **HomepageFeatures** | `src/components/HomepageFeatures/index.tsx` | Reusable | CSS Module | 3-column feature cards |
| 16 | **CurriculumTree** | `src/components/CurriculumTree.jsx` | Reusable | Plain CSS | Interactive curriculum navigator (dark theme) |
| 17 | **LogisticRegressionTutorial** | `src/components/LogisticRegression/LogisticRegressionTutorial.tsx` | Page-level | Tailwind | Tutorial container with 4 sections |
| 18 | **LinearModelSection** | `src/components/LogisticRegression/LinearModelSection.tsx` | Section | Tailwind | Interactive regression line canvas |
| 19 | **SigmoidSection** | `src/components/LogisticRegression/SigmoidSection.tsx` | Section | Tailwind | Sigmoid curve visualization canvas |
| 20 | **DecisionBoundarySection** | `src/components/LogisticRegression/DecisionBoundarySection.tsx` | Section | Tailwind | Decision boundary visualization canvas |
| 21 | **TrainingSection** | `src/components/LogisticRegression/TrainingSection.tsx` | Section | Tailwind | Gradient descent training canvas |
| 22 | **Welcome** | `src/components/Welcome.astro` | Astro | Scoped | **VESTIGIAL** - unused Astro welcome |

### Supporting Files (not components)

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Auth state management (Context + Provider) |
| `src/hooks/useAuth.ts` | Thin wrapper hook around AuthContext |
| `src/services/api.ts` | API client (`apiFetch` + token handling) |
| `src/components/LogisticRegression/utils/canvas.ts` | Canvas drawing utilities |
| `src/components/LogisticRegression/utils/math.ts` | Math computation utilities |

### Component Categories

| Category | Components |
|----------|-----------|
| **Navigation** | NavbarAuthButtons, Navbar/Content (theme override) |
| **Footer** | Footer (theme override) |
| **Auth/Forms** | LoginForm, RegisterForm, GoogleSignInButton, AuthGuard, AccessDenied |
| **Payment** | PaymentButton, SubscriptionButton |
| **Cards** | HomepageFeatures, CourseCards (inline in index.tsx) |
| **Visualizations** | AIVisualization, BrainIcon, BrainVisualization |
| **Interactive Tutorials** | LogisticRegressionTutorial + 4 sub-sections |
| **Content Navigation** | CurriculumTree |
| **Layout Wrappers** | Root |

### Components Using Inline Styles (no CSS file)

- `NavbarAuthButtons.tsx`
- `AuthGuard.tsx`
- `AccessDenied.tsx`
- `LoginForm.tsx`
- `RegisterForm.tsx`
- `PaymentButton.tsx`
- `SubscriptionButton.tsx`
- `src/pages/login.tsx`
- `src/pages/subscribe.tsx`
- `src/pages/forgot-password.tsx`
- `src/pages/reset-password.tsx`

---

## 4. Page & Route Structure

### Pages

| Route | File | Layout | Styling | Key Components |
|-------|------|--------|---------|----------------|
| `/` | `src/pages/index.tsx` | `@theme/Layout` | CSS Module | HeroSection, TrustedBySection, FeaturedCoursesSection, FeaturesSection, InstructorSection, CTASection (all inline sub-components) |
| `/login` | `src/pages/login.tsx` | `@theme/Layout` + BrowserOnly | Inline styles | GoogleSignInButton, LoginForm, RegisterForm |
| `/subscribe` | `src/pages/subscribe.tsx` | `@theme/Layout` + BrowserOnly | Inline styles | SubscriptionButton |
| `/fellowship` | `src/pages/fellowship.tsx` | `@theme/Layout` | CSS Module | Inline sections |
| `/forgot-password` | `src/pages/forgot-password.tsx` | `@theme/Layout` + BrowserOnly | Inline styles | Inline form |
| `/reset-password` | `src/pages/reset-password.tsx` | `@theme/Layout` + BrowserOnly | Inline styles | Inline form (requires `?token=` param) |
| `/contribute` | `src/pages/contribute.mdx` | Default MDX | Markdown | Contribution guidelines |
| `/blog` | Auto-generated | Docusaurus Blog | Default | Blog listing |
| `/courses/*` | `docs/**/*.mdx` | Docusaurus Docs | Default | **Protected by AuthGuard** |

### Course Routes (39 MDX files)

```
/courses/ai-for-leaders/          (7 lessons)
  intro, curriculum-tree, curriculum-overview,
  machine-learning-fundamentals,
  classification-regression-supervised-unsupervised,
  algorithms-high-level-overview, classical-ml-in-market

/courses/machine-learning/        (3 lessons)
  intro, supervised-learning, logistic_regression_tutorial

/courses/deep-learning/           (4 lessons)
  intro, perceptron, CNNS, RNNs

/courses/language-models/         (22 lessons)
  intro, Tokenization, AttentionMechanism, NNTraining,
  NNInference, NNInternals, PostTraining, EvolutionGpt2,
  BaseModels, Hallucinations, LLMIdentity, ThinkingInTokens,
  LLMInconsistencies, PostTrainingReinforcementLearning,
  LoRAFineTuning, RAGAgents, ThinkingRL, ReinforcementLearning,
  LLMJudgement, Multimodality, Evaluation, AccessingLLMs,
  QueryToResponse

/courses/tutorials/               (1 tutorial)
  logistic-regression

/courses/resources/               (1 page)
  intro
```

### Layout Hierarchy

```
<Root>                            --> AuthProvider + RouteProtector
  └─ <@theme/Layout>             --> Navbar + Footer (Docusaurus shell)
      └─ <AuthGuard>             --> Only for /courses/* routes
          └─ Page Content
```

### Navigation Links

#### Navbar (defined in `docusaurus.config.ts`)

- **Logo** (Lex AI) -> `/`
- **Dropdown "Courses"** (left):
  - AI for Leaders -> `/courses/ai-for-leaders/intro`
  - Machine Learning -> `/courses/machine-learning/intro`
  - Deep Learning -> `/courses/deep-learning/intro`
  - Language Models -> `/courses/language-models/intro`
  - Resources -> `/courses/resources/intro`
- **"AI Fellowship"** -> `/fellowship` (left)
- **Dropdown "Tutorials"** (left):
  - Interactive Logistic Regression -> `/courses/tutorials/logistic-regression`
- **Auth buttons** (right, via NavbarAuthButtons):
  - Unauthenticated: "Login" -> `/login`
  - Authenticated no access: "Subscribe" -> `/subscribe`
  - Authenticated: User avatar dropdown with Sign Out

#### Footer (custom component in `src/theme/Footer/`)

| Section | Links |
|---------|-------|
| **Connect (Social)** | LinkedIn, Twitter/X, Instagram, YouTube, Facebook |
| **Get in Touch** | puru@lexailabs.com, +91 99966 92323 |
| **Quick Links** | Individuals, Enterprises, Institutions, Higher Education, Schools (K-12) (all -> lexailabs.com) |
| **Policies** | Refund Policy, Privacy Policy, Terms of Service (all -> lexailabs.com) |
| **Tagline** | "Build Intelligence. Build India. #AISeekhegaIndia" |

---

## 5. Content Structure

| Property | Value |
|----------|-------|
| **Content Format** | MDX (39 files) + embedded images |
| **Content Location** | `/docs/` directory |
| **Route Prefix** | `/courses/` (via `routeBasePath` in docusaurus.config.ts) |
| **Sidebar Config** | Explicit in `sidebars.ts` (6 categories) |
| **Math Support** | KaTeX via remark-math + rehype-katex |
| **Code Highlighting** | Prism (Python, R, Julia configured) |
| **Video Embedding** | Raw YouTube iframes in MDX |
| **Total Content Lines** | ~9,445 across all docs |

### Frontmatter Fields

```yaml
---
title: "Course Title"
description: "Course description"
keywords: [keyword1, keyword2]
sidebar_position: 1
---
```

### Sidebar Structure (`sidebars.ts`)

6 explicit categories with ordered items:
1. AI for Leaders (7 items)
2. Machine Learning (3 items)
3. Deep Learning (4 items)
4. Language Models (22 items)
5. Interactive Tutorials (1 item)
6. Resources (1 item)

---

## 6. Assets

### Images & Logos

| Category | Count | Location |
|----------|-------|----------|
| **Brand Logo SVGs** | 4 | `static/img/lexailogo.svg`, `lexai-logo.svg`, `logo.svg`, `public/favicon.svg` |
| **Company/institution logos** | 15 PNGs | `src/assets/logos/` |
| **Instructor photo** | 1 JPEG | `src/assets/instructor-pic.jpeg` |
| **Course content images** | 91 PNGs | `docs/deep-learning/` (CNN: 40, RNN: 44), `docs/machine-learning/` (6) |
| **AI for Leaders images** | 3 PNGs | `static/img/ai-for-leaders/` |
| **Social card** | 1 JPG | `static/img/social-card.jpg` |
| **Favicon** | 2 | `static/img/favicon.ico`, `public/favicon.svg` |

### Company Logos (`src/assets/logos/`)

Amazon, Demandbase, Flipkart, Google, IIITD, IIT, IIT Gandhi Nagar, IIT Hyderabad, Mathworks, Meesho, Microsoft, Oracle, PwC, Qualcomm, SingleStore

### Icon Library

- **lucide-react** (^0.542.0) - Used in Footer, NavbarAuthButtons, Homepage, Tutorial sections
- No icon sprite sheets or custom SVG icon system

### Static Files

| File | Location | Purpose |
|------|----------|---------|
| `robots.txt` | `static/` | Blocks `/courses/` from crawlers, points to sitemap |
| `favicon.ico` | `static/img/` | ICO format favicon |
| `social-card.jpg` | `static/img/` | Open Graph social sharing image |

### Vestigial Assets

- `src/assets/astro.svg` - Astro framework logo (unused)
- `src/assets/background.svg` - Background pattern (unused)

---

## 7. LMS-Specific Features

| Feature | Status | Implementation |
|---------|--------|---------------|
| Course content | Implemented | MDX files in `/docs/` via Docusaurus |
| Course navigation | Implemented | Docusaurus sidebar + navbar dropdowns |
| Route protection | Implemented | AuthGuard wrapping `/courses/*` |
| Authentication | Implemented | JWT + Google OAuth + email/password |
| Token refresh | Implemented | Auto-refresh every 14 minutes |
| Subscriptions | Implemented | 3-tier Razorpay integration (Monthly/Quarterly/Yearly) |
| Subscription mgmt | Implemented | View status, cancel subscription |
| Interactive tutorial | Implemented | Logistic Regression with 4 canvas-based sections |
| Math rendering | Implemented | KaTeX via remark-math + rehype-katex |
| Code highlighting | Implemented | Prism (Python, R, Julia) |
| Video embedding | Minimal | Raw YouTube iframes in MDX |
| Progress tracking | Session-only | Not persisted across sessions |
| Quizzes/assessments | Not implemented | - |
| Certificates | Not implemented | - |
| User dashboard | Not implemented | Subscribe page shows subscription status only |
| Full-text search | Partial | Docusaurus default search only |

### Authentication Flow

- **AuthContext** (`src/contexts/AuthContext.tsx`) manages user state
- **useAuth hook** (`src/hooks/useAuth.ts`) provides access to context
- **Access types**: `premium` | `subscription` | `institution` | `null`
- **Route protection**: `Root.tsx` -> `RouteProtector` -> `AuthGuard` for `/courses/*`

### API Integration

- **Service layer**: `src/services/api.ts` with `apiFetch()` function
- **Auth endpoints**: `/auth/google`, `/auth/login`, `/auth/register`, `/auth/refresh`, `/auth/logout`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/me`
- **Subscription endpoints**: `/subscriptions/plans`, `/subscriptions/create`, `/subscriptions/verify`, `/subscriptions/status`, `/subscriptions/cancel`, `/subscriptions/cancel-created`
- **Payment endpoints**: `/payments/create-order`, `/payments/verify`
- **Token handling**: Bearer token in Authorization header, automatic 401 retry with refresh

### External Integrations

| Service | Purpose |
|---------|---------|
| Google Identity Services | OAuth sign-in |
| Razorpay | Payment processing (subscriptions + one-time) |
| Google Fonts CDN | Font loading |
| jsdelivr CDN | KaTeX CSS |

---

## 8. File Tree

```
lexailabs-learning-os/
├── .env                              # API_URL, GOOGLE_CLIENT_ID, RAZORPAY_KEY_ID
├── .gitignore
├── README.md                         # Astro template README (misleading)
├── COLOR-SYSTEM.md                   # Color system documentation
├── COMPONENT_AUDIT.md                # Previous component audit
├── astro.config.mjs                  # VESTIGIAL - empty Astro config
├── docusaurus.config.ts              # MAIN CONFIG
├── package.json                      # Docusaurus 3.1.1 + React 18 + Tailwind 4
├── package-lock.json
├── postcss.config.js                 # @tailwindcss/postcss + autoprefixer
├── sidebars.ts                       # 6 course categories, explicit ordering
├── tailwind.config.js                # v3-style config (preflight disabled)
├── tsconfig.json                     # Extends @docusaurus/tsconfig
│
├── blog/                             # Blog content (MDX)
│
├── docs/                             # COURSE CONTENT (39 MDX files, ~9,445 lines)
│   ├── ai-for-leaders/               # 7 lessons
│   ├── deep-learning/                # 4 lessons + 85 content images
│   │   └── cnn_images/
│   ├── language-models/              # 22 lessons
│   ├── machine-learning/             # 3 lessons
│   │   └── logistic_regression_tutorial_files/  # 6 tutorial output PNGs
│   ├── resources/                    # 1 page
│   └── tutorials/                    # 1 interactive tutorial
│
├── public/
│   ├── assets/lexailogo.svg
│   └── favicon.svg
│
├── static/
│   ├── robots.txt
│   └── img/
│       ├── favicon.ico
│       ├── lexai-logo.svg
│       ├── lexailogo.svg
│       ├── logo.svg
│       ├── social-card.jpg
│       └── ai-for-leaders/           # 3 course illustration PNGs
│
└── src/                              # 63 source files
    ├── assets/
    │   ├── astro.svg                 # VESTIGIAL
    │   ├── background.svg            # VESTIGIAL
    │   ├── instructor-pic.jpeg
    │   └── logos/                     # 15 company PNGs
    │
    ├── components/
    │   ├── AccessDenied.tsx           # Inline styles
    │   ├── AIVisualization.tsx        # CSS Module
    │   ├── AIVisualization.module.css
    │   ├── AuthGuard.tsx              # Inline styles
    │   ├── BrainIcon.tsx              # CSS Module
    │   ├── BrainIcon.module.css
    │   ├── BrainVisualization.tsx     # CSS Module
    │   ├── BrainVisualization.module.css
    │   ├── CurriculumTree.jsx         # Plain CSS (dark theme)
    │   ├── CurriculumTree.css
    │   ├── GoogleSignInButton.tsx     # Google SDK styles
    │   ├── LoginForm.tsx              # Inline styles
    │   ├── NavbarAuthButtons.tsx      # Inline styles
    │   ├── PaymentButton.tsx          # Inline styles
    │   ├── RegisterForm.tsx           # Inline styles
    │   ├── SubscriptionButton.tsx     # Inline styles
    │   ├── Welcome.astro              # VESTIGIAL
    │   ├── HomepageFeatures/
    │   │   ├── index.tsx              # CSS Module
    │   │   └── styles.module.css
    │   └── LogisticRegression/
    │       ├── LogisticRegressionTutorial.tsx  # Tailwind
    │       ├── LinearModelSection.tsx          # Tailwind
    │       ├── SigmoidSection.tsx              # Tailwind
    │       ├── DecisionBoundarySection.tsx     # Tailwind
    │       ├── TrainingSection.tsx             # Tailwind
    │       └── utils/
    │           ├── canvas.ts
    │           └── math.ts
    │
    ├── contexts/
    │   └── AuthContext.tsx             # Auth state management
    │
    ├── css/
    │   ├── custom.css                 # GLOBAL THEME (brand tokens + Infima vars)
    │   └── tailwind.css               # @tailwind directives + tutorial classes
    │
    ├── hooks/
    │   └── useAuth.ts                 # Thin wrapper around AuthContext
    │
    ├── layouts/
    │   └── Layout.astro               # VESTIGIAL
    │
    ├── pages/
    │   ├── index.tsx                  # Homepage
    │   ├── index.module.css           # Homepage styles
    │   ├── index.astro                # VESTIGIAL
    │   ├── login.tsx                  # Auth page (inline styles)
    │   ├── subscribe.tsx              # Pricing page (inline styles)
    │   ├── fellowship.tsx             # Fellowship page
    │   ├── fellowship.module.css      # Fellowship styles
    │   ├── forgot-password.tsx        # Password reset request (inline styles)
    │   ├── reset-password.tsx         # Password reset form (inline styles)
    │   └── contribute.mdx             # Contribution guide
    │
    ├── services/
    │   └── api.ts                     # API client (apiFetch + token handling)
    │
    └── theme/
        ├── Root.tsx                   # AuthProvider + RouteProtector
        ├── Footer/
        │   ├── index.tsx              # Custom footer
        │   └── styles.module.css      # Footer styles
        └── Navbar/
            └── Content/
                └── index.tsx          # Navbar + auth buttons
```

---

## 9. Pain Points & Migration Concerns

### Hardcoded Styles That Need Tokenization

1. **~90+ hardcoded hex colors** across CSS modules and inline styles. The same grays (`#666666`, `#f0f0f0`, `#141414`) appear in 10+ files independently. These must be consolidated into design tokens.

2. **Font-family declarations repeated in every CSS module class** - `font-family: 'Plus Jakarta Sans', system-ui, sans-serif` appears 20+ times in `index.module.css` alone. Should be a single token/variable.

3. **Spacing values** (`padding: 5rem 0`, `gap: 0.75rem`, `margin-bottom: 1.5rem`) are all magic numbers with no consistent scale.

4. **Border radius** values vary inconsistently: `0.375rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `9999px`.

### Inline Styles That Should Be Componentized

All auth-related pages and components use **inline `style={{}}` objects** instead of CSS files:
- `login.tsx`, `subscribe.tsx`, `forgot-password.tsx`, `reset-password.tsx`
- `NavbarAuthButtons.tsx`, `AuthGuard.tsx`, `AccessDenied.tsx`
- `LoginForm.tsx`, `RegisterForm.tsx`, `PaymentButton.tsx`, `SubscriptionButton.tsx`

### Inconsistent Patterns

| Issue | Details |
|-------|---------|
| **3 styling approaches coexist** | CSS Modules + Tailwind + Inline styles |
| **Dark theme is fragmented** | CurriculumTree has its own dark theme; Docusaurus `data-theme='dark'` CSS exists but switch is disabled; tutorials use Tailwind dark classes |
| **Button styles are scattered** | `.primaryButton` in CSS module, `.button--primary` in custom.css, inline `style={{}}` buttons in auth pages, `.tutorial-button-primary` in Tailwind layer |
| **Color mode disabled but CSS exists** | `disableSwitch: true` + `defaultMode: 'light'` but dark mode CSS variables are still defined |
| **Vestigial Astro files** | `astro.config.mjs`, `Layout.astro`, `Welcome.astro`, `index.astro` serve no purpose |
| **Tailwind version mismatch** | Tailwind v4 package installed but config is v3-style; `preflight: false` disables reset; only used in tutorial components |
| **Two color systems** | Tailwind config has `indian-saffron`/`indian-green`/`indian-blue`; custom.css has `--lexai-blue`/`--lexai-coral`; these are separate, unrelated systems |

### Tatva Design System Status

The `ui/` directory with the Tatva design system (`tailwind-preset.js`, `theme.css`, `fonts.css`, component library) **does NOT exist on the `staging` branch**. This means:

- The Tatva token system (`--tatva-*` CSS variables, `font-matter`/`font-season` families) has **not yet been integrated**
- Migration to Tatva would be a **greenfield integration**, not an update of a partial setup
- All current styling relies on ad-hoc `--lexai-*` brand tokens + hardcoded hex values + Infima defaults

### What Needs to Change for Tatva/LexAI Design System Adoption

1. **Replace all hardcoded hex colors** with Tatva design tokens (`--tatva-*` variables mapped through `tailwind-preset.js`)
2. **Unify styling approach** - pick one: Tailwind utilities + CSS Modules for complex layouts
3. **Extract inline styles** from 11+ auth/payment components into proper CSS or Tailwind classes
4. **Consolidate font declarations** - stop repeating font-family in every class; use Tatva's `font-matter` / `font-season` tokens
5. **Remove vestigial Astro files** - they add confusion
6. **Standardize button component** - currently 4+ different button styling approaches
7. **Create shared card component** - course cards, feature cards, and credential badges all use similar but slightly different patterns
8. **Normalize spacing scale** - adopt Tailwind's default spacing or define custom scale in preset
9. **Resolve Tailwind v3/v4 config mismatch** - either migrate config to v4 CSS-first approach or pin to v3
10. **Integrate Tatva preset** into `tailwind.config.js` and replace `--lexai-*` tokens with `--tatva-*` equivalents

---

## Verified Summary Stats

| Metric | Count |
|--------|-------|
| Source files in `src/` | 63 |
| React components (TSX/JSX) | 20 |
| Vestigial Astro files | 4 |
| Theme overrides | 3 |
| Pages | 8 |
| CSS files | 10 |
| CSS Modules | 6 |
| MDX content files | 39 |
| Course categories | 6 |
| Company logos | 15 |
| Static assets | 11 |
| Context providers | 1 |
| Custom hooks | 1 |
| Services | 1 |
| Utility files | 2 |
