# LexAI LMS - Component Audit Report

> Reference document for replicating the LexAI LMS design system in another project.
> Generated from codebase analysis.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design System Foundation](#design-system-foundation)
3. [UI Primitives (Tatva Design System)](#ui-primitives-tatva-design-system)
4. [Custom LMS Components](#custom-lms-components)
5. [Page Composition Map](#page-composition-map)
6. [Component Dependency Graph](#component-dependency-graph)
7. [Global CSS & Theme Tokens](#global-css--theme-tokens)
8. [Font System](#font-system)
9. [Color System](#color-system)
10. [Spacing & Radius Tokens](#spacing--radius-tokens)
11. [Files to Copy](#files-to-copy)
12. [Migration Prompt for Other Project](#migration-prompt-for-other-project)

---

## Architecture Overview

```
lms/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, providers, global CSS)
│   ├── globals.css               # All design tokens, theme, base styles
│   ├── (marketing)/              # Public pages (home, about, courses)
│   ├── (auth)/                   # Login, Signup
│   ├── (dashboard)/              # My Learning
│   ├── (admin)/                  # Admin panel
│   └── learn/[courseId]/[lessonId]/ # Learning player
├── components/
│   ├── index.ts                  # Barrel export (re-exports ui/ + custom/)
│   └── custom/                   # LMS-specific components
│       ├── index.tsx             # Barrel export for custom components
│       ├── Navbar/               # LMS navigation bar
│       ├── Footer/               # Site footer
│       ├── HeroSection/          # Landing page hero
│       ├── CourseCard/           # Course listing card
│       ├── CourseBanner/         # Course detail page banner
│       ├── EnrollCard/           # Enrollment/pricing sidebar card
│       ├── CourseContentAccordion/ # Expandable course curriculum
│       ├── CourseDetailSections/ # TrustedBy, WhatYoullLearn, CourseIncludes, CourseStatsBar
│       ├── InstructorSection/    # Instructor profile section
│       ├── ReviewSection/        # Student reviews with ratings
│       ├── ModuleTimeline/       # Learning player sidebar (module/lesson list)
│       ├── VideoPlayer/          # Custom HTML5 video player
│       ├── LessonNavigation/     # Previous/Next lesson buttons
│       ├── TableOfContents/      # Sticky sidebar TOC with scroll spy
│       ├── MarkdownContent/      # Rendered markdown content
│       ├── MDXContent/           # MDX renderer with code blocks
│       └── PaymentButton/        # Razorpay payment integration
├── ui/                           # Tatva Design System (UI primitives)
│   ├── components/               # All primitive UI components
│   ├── primitives/               # Low-level primitives (InputWrapper, Listbox)
│   ├── lib/                      # Icon system, utilities
│   └── index.ts                  # Barrel export
├── lib/
│   ├── utils.ts                  # cn() utility (clsx + tailwind-merge)
│   ├── data.ts                   # Static data (instructor info)
│   ├── api/                      # API client, endpoints, types
│   ├── hooks/                    # Custom hooks (payment)
│   └── contexts/                 # Auth context
├── tailwind.config.ts            # Tailwind config (uses tatva preset)
├── tailwind-preset.js            # Tatva design system Tailwind preset
└── public/                       # Static assets (logos, images)
```

---

## Design System Foundation

The project uses a **two-layer component architecture**:

### Layer 1: Tatva Design System (`ui/`)
Generic, reusable UI primitives. Framework-agnostic styling. These are the **root components**.

### Layer 2: Custom LMS Components (`components/custom/`)
LMS-specific components composed from Tatva primitives. These contain business logic and domain-specific styling.

### Import Pattern
All components are imported via `@/components`:
```tsx
import { Button, Text, Icon, CourseCard, CourseBanner } from "@/components";
```

---

## UI Primitives (Tatva Design System)

These are the **root/base components** from `ui/components/`. Every custom component is built on top of these.

| Component | File | Purpose | Used By |
|-----------|------|---------|---------|
| **Button** | `ui/components/Button/` | Primary CTA, ghost, outline, secondary, success variants. Sizes: sm, md, lg. Supports icon, iconPosition, width="full", isLoading, tooltip | Navbar, Footer, HeroSection, CourseCard, EnrollCard, LessonNavigation, PaymentButton, InstructorSection, ReviewSection |
| **Text** | `ui/components/Text/` | Typography component. Variants: `display-sm`, `heading-lg/md/sm/xs`, `body-lg/md/sm/xs`, `label-sm/md`. Tones: default, secondary, tertiary, brand, positive, inverse | Every component |
| **Icon** | `ui/components/Icon/` | Icon system. Sizes: xs, sm, md, lg, xl. Tones: secondary, tertiary, brand, inverse, success, warning | CourseCard, EnrollCard, CourseBanner, CourseContentAccordion, ModuleTimeline, VideoPlayer, LessonNavigation, ReviewSection, Footer |
| **Badge** | `ui/components/Badge/` | Label badges. Variants: brand, default, indigo, orange, green, pink, coral, yellow. Sizes: sm, md, lg. Type: label | Navbar, CourseCard, CourseBanner, InstructorSection, PaymentButton |
| **Avatar** | `ui/components/Avatar/` | User avatar with fallback initials. Sizes: sm, md, lg | Navbar, ReviewSection |
| **Menu** | `ui/components/Menu/` | Dropdown menu with options. Props: options (label, icon, onClick), align | Navbar (user dropdown) |
| **Divider** | `ui/components/Divider/` | Horizontal divider line | EnrollCard |
| **Breadcrumbs** | `ui/components/Breadcrumbs/` | Navigation breadcrumbs. Props: items (label, href, isActive), size | CourseBanner |
| **Accordion** | `ui/components/Accordion/` | Expandable sections | (Available, not directly used - custom accordion built instead) |
| **Card** | `ui/components/Card/` | Container card | (Available for use) |
| **Input** | `ui/components/Input/` | Text input field | (Available - login/signup use raw HTML inputs) |
| **Select** | `ui/components/Select/` | Dropdown select | Admin pages |
| **Checkbox** | `ui/components/Checkbox/` | Checkbox input | (Available) |
| **Radio** | `ui/components/Radio/` | Radio button | (Available) |
| **Switch** | `ui/components/Switch/` | Toggle switch | (Available) |
| **Textarea** | `ui/components/Textarea/` | Multi-line text input | Admin pages |
| **Tabs** | `ui/components/Tabs/` | Tab navigation | (Available) |
| **Dialog** | `ui/components/Dialog/` | Modal dialog | Admin pages |
| **Sheet** | `ui/components/Sheet/` | Side panel | (Available) |
| **Tooltip** | `ui/components/Tooltip/` | Hover tooltip (TooltipProvider wraps app) | Button tooltip prop |
| **Toast/Toaster** | `ui/components/Toast/` | Toast notifications (success, error, info, warning) | Login, Signup, Payment |
| **Skeleton** | `ui/components/Skeleton/` | Loading skeleton | (Available) |
| **Chip** | `ui/components/Chip/` | Small tag/chip | (Available) |
| **Tag** | `ui/components/Tag/` | Categorization tag | (Available) |
| **TagInput** | `ui/components/TagInput/` | Tag input field | Admin pages |
| **Slider** | `ui/components/Slider/` | Range slider | (Available) |
| **Table** | `ui/components/Table/` | Data table with toolbar, pagination | Admin pages |
| **MetricCard** | `ui/components/MetricCard/` | Dashboard metric display | Admin dashboard |
| **Loader** | `ui/components/Loader/` | Loading spinner | (Available) |
| **EmptyState** | `ui/components/EmptyState/` | Empty state illustration | (Available) |
| **KeyValue** | `ui/components/KeyValue/` | Key-value pair display | (Available) |
| **List** | `ui/components/List/` | Structured list | (Available) |
| **Stepper** | `ui/components/Stepper/` | Multi-step wizard | (Available) |
| **Form** | `ui/components/Form/` | Form with field renderer | Admin pages |
| **FileUpload** | `ui/components/FileUpload/` | File upload with drag & drop | Admin pages |
| **DateRangePicker** | `ui/components/DateRangePicker/` | Date range selection | (Available) |
| **ChatInput** | `ui/components/ChatInput/` | Chat-style input | (Available) |
| **Header** | `ui/components/Header/` | Page header | Admin pages |
| **Sidebar** | `ui/components/Sidebar/` | Navigation sidebar | (Available) |
| **Navbar** | `ui/components/Navbar/` | Generic navbar (different from LMS Navbar) | (Available) |
| **AnnouncementBanner** | `ui/components/AnnouncementBanner/` | Top announcement bar | (Available) |
| **AssetContainer** | `ui/components/AssetContainer/` | Media/asset wrapper | (Available) |
| **Filters** | `ui/components/Filters/` | Filter controls | (Available) |

### Primitives
| Primitive | File | Purpose |
|-----------|------|---------|
| **InputWrapper** | `ui/primitives/InputWrapper.tsx` | Shared input styling wrapper |
| **Listbox** | `ui/primitives/Listbox.tsx` | Accessible listbox primitive |
| **SharedTokens** | `ui/components/tokens/shared/` | Shared design tokens |

---

## Custom LMS Components

### 1. Navbar (`components/custom/Navbar/`)
**Purpose:** Main site navigation bar
**Uses UI primitives:** `Text`, `Button`, `Avatar`, `Menu`, `Badge`
**Props:**
- `navItems` - Navigation links (default: Courses, Learning Paths, Pricing)
- `isLoggedIn`, `user`, `isPremium` - Auth state
- `onGetStarted`, `onLogin`, `onLogout` - Action handlers
- `variant` - "default" (with bg) | "transparent"
**Features:** Logo, nav links, auth buttons, user menu with avatar, premium badge

### 2. Footer (`components/custom/Footer/`)
**Purpose:** Site footer with links, socials, contact info
**Uses UI primitives:** `Text`, `Button` (icon-only for socials)
**Props:**
- `sections` - Link sections (default: Platform, Resources, Legal)
- `contact` - Email/phone
- `socials` - Social media links (linkedin, twitter, youtube, instagram, github)
- `copyright` - Copyright text
**Features:** Desktop grid layout, mobile stacked layout, social icon buttons, brand logo

### 3. HeroSection (`components/custom/HeroSection/`)
**Purpose:** Landing page hero (generic reusable version)
**Uses UI primitives:** `Text`, `Button`
**Props:** `headline`, `subtitle`, `ctaText`, `secondaryCtaText`, background, handlers
**Note:** The actual home page uses a custom inline HeroSection (not this component) with background image, gradient glows, and a product screenshot

### 4. CourseCard (`components/custom/CourseCard/`)
**Purpose:** Course listing card with 3 states
**Uses UI primitives:** `Text`, `Badge`, `Button`, `Icon`
**Props:** `title`, `description`, `image`, `badge`, `coursesCount`, `studentsCount`, `progress`, `onStartLearning`
**States:**
- **not-started** (gray border, "Start learning" primary CTA)
- **in-progress** (blue border, liquid progress bar CTA)
- **completed** (green border, check overlay, "Review course" CTA)
**Features:** Image with fallback, badge with icon, student count, course count, state-aware styling

### 5. CourseBanner (`components/custom/CourseBanner/`)
**Purpose:** Course detail page header/banner
**Uses UI primitives:** `Text`, `Badge`, `Avatar`, `Icon`, `Breadcrumbs`
**Props:** `title`, `description`, `badge`, `badgeVariant`, `tags`, `image`, `breadcrumbs`, `instructor`, `stats`
**Features:** Breadcrumb nav, badge + tags row, title, description, stats row (students, duration, level, modules, lessons), banner image (3:2 grid)

### 6. EnrollCard (`components/custom/EnrollCard/`)
**Purpose:** Sidebar enrollment/pricing card
**Uses UI primitives:** `Text`, `Button`, `Icon`, `Divider`
**Props:** `price`, `originalPrice`, `isEnrolled`, `progress`, `stats`, `onEnroll`, `onContinue`, `sticky`
**Features:** Price display with discount, progress bar (if enrolled), CTA button, course stats list (video hours, modules, chapters, certificate)

### 7. CourseContentAccordion (`components/custom/CourseContentAccordion/`)
**Purpose:** Expandable course curriculum/syllabus
**Uses UI primitives:** `Text`, `Icon`, `Badge`
**Props:** `modules`, `courseId`, `activeLessonId`, `onLessonClick`, `onPreviewClick`
**Features:** Expand all/collapse all, module headers with stats, lesson items with type icons (video/article/quiz/assignment), status icons (completed/locked/available), preview buttons, progress bars, duration display

### 8. CourseDetailSections (`components/custom/CourseDetailSections/`)
**Purpose:** Collection of 4 sub-components for course detail pages
**Uses UI primitives:** `Text`, `Icon`, `Badge`

| Sub-component | Purpose | Key Props |
|---------------|---------|-----------|
| `TrustedBySection` | Company logo marquee | `logos`, `title` |
| `WhatYoullLearnSection` | Learning outcomes checklist (2-column) | `outcomes`, `title` |
| `CourseIncludesSection` | Course includes grid (video hours, etc.) | `items` (icon, label, value) |
| `CourseStatsBar` | Rating + students + premium badge bar | `rating`, `studentsCount`, `isPremium` |

### 9. InstructorSection (`components/custom/InstructorSection/`)
**Purpose:** Instructor profile showcase
**Uses UI primitives:** `Text`, `Badge`, `Button` (icon-only socials)
**Props:** `name`, `role`, `bio`, `bioPoints`, `avatar`, `company`, `credentials`, `socials`
**Features:** Large avatar, name + role badge, company, bio (paragraph or bullet points), credentials as colorful rotating badges, social links (linkedin, twitter, github, email, website, instagram, youtube)

### 10. ReviewSection (`components/custom/ReviewSection/`)
**Purpose:** Student reviews with rating distribution
**Uses UI primitives:** `Text`, `Avatar`, `Icon`, `Button`
**Props:** `stats` (average, total, distribution), `reviews`, `onHelpfulClick`, `onLoadMore`, `hasMore`
**Features:** Star ratings (coral color), rating distribution bars, review cards with author avatar, "helpful" button, load more, empty state

### 11. ModuleTimeline (`components/custom/ModuleTimeline/`)
**Purpose:** Learning player sidebar with module/lesson navigation
**Uses UI primitives:** `Text`, `Icon`
**Props:** `courseTitle`, `modules`, `activeLessonId`, `onLessonClick`, `progress`, `collapsed`, `onToggleCollapse`
**Features:** Collapsible sidebar (80px collapsed / 320px expanded), progress bar, module expand/collapse, lesson type icons, completion indicators, active lesson highlighting

### 12. VideoPlayer (`components/custom/VideoPlayer/`)
**Purpose:** Custom HTML5 video player
**Uses UI primitives:** `Text`, `Icon`
**Props:** `src`, `poster`, `title`, `autoPlay`, `onEnded`, `onProgress`, `onPlay`, `onPause`, `initialTime`
**Features:** Play/pause, mute, fullscreen, skip 10s, volume control, playback speed (0.5x-2x), progress bar, keyboard shortcuts (space, k, m, f, arrows), auto-hide controls, loading spinner

### 13. LessonNavigation (`components/custom/LessonNavigation/`)
**Purpose:** Previous/Next lesson navigation bar
**Uses UI primitives:** `Text`, `Button`, `Icon`
**Variants:** `LessonNavigation` (full with mark complete) + `LessonNavigationCompact` (minimal)
**Props:** `previousLesson`, `nextLesson`, handlers, `isCompleted`

### 14. TableOfContents (`components/custom/TableOfContents/`)
**Purpose:** Sticky sidebar table of contents with scroll spy
**Uses UI primitives:** `Text`
**Props:** `items` (id, title, level 1-3), `activeId`, `onItemClick`, `title`
**Features:** Scroll spy hook, heading level indentation, smooth scroll, active state highlighting

### 15. MarkdownContent (`components/custom/MarkdownContent/`)
**Purpose:** Renders markdown content with react-markdown
**Dependencies:** `react-markdown`, `remark-gfm`, `rehype-slug`, `react-syntax-highlighter`

### 16. MDXContent (`components/custom/MDXContent/`)
**Purpose:** MDX content renderer with prose styling
**Exports:** `MDXContent`, `Prose`, `CodeBlock`, `Callout`, `mdxComponents`

### 17. PaymentButton (`components/custom/PaymentButton/`)
**Purpose:** Razorpay payment integration button
**Uses UI primitives:** `Button`, `Text`, `Badge`
**Variants:** "button" | "badge" | "card"
**Features:** Auth-aware (login redirect if not authenticated), payment status check, loading skeleton, premium/institution badge display

---

## Page Composition Map

### Home Page (`app/(marketing)/page.tsx`)
```
<main>
  ├── HeroSection (inline - custom, NOT the reusable component)
  │   Uses: Image, Button, Icon, Link
  │   Features: bg image, gradient glows, CTA buttons, product screenshot
  │
  ├── TrustedBySection (inline - marquee animation)
  │   Uses: Image, Text
  │   Companies: Google, Amazon, Qualcomm, PwC, Flipkart, MathWorks, IIT Gandhinagar, IIT Hyderabad
  │
  ├── FeaturedCoursesSection (inline)
  │   Uses: CourseCard, Text, Icon, Button, Link
  │   Features: loading skeletons, 3-col grid, "View All" CTA
  │
  ├── InstructorSection (custom component)
  │
  ├── TestimonialsSection (inline)
  │   Uses: Text
  │   Features: quote cards, avatar initials, 3-col grid
  │
  ├── PersonasSection (inline)
  │   Uses: Text, Icon, Link
  │   Personas: Engineers, Product Managers, Business Leaders, Career Changers
  │
  └── SubscriptionSection (inline)
      Uses: Text, Icon, Link
      Features: gradient bg, glassmorphism card, feature checklist
```

### Course Detail Page (`app/(marketing)/courses/[id]/page.tsx`)
```
<main>
  ├── CourseBanner
  │
  ├── Main Content (2-col grid)
  │   ├── Left Column (2/3)
  │   │   ├── WhatYoullLearn section (inline)
  │   │   ├── Prerequisites section (inline)
  │   │   └── CourseContentAccordion
  │   │
  │   └── Right Column (1/3)
  │       └── SubscriptionCard (inline)
  │           Uses: Button, Text, Icon, PaymentButton, Link
  │
  ├── CourseIncludesSection (inline)
  │
  ├── InstructorSection
  │
  └── CTA Section (inline gradient banner)
      Uses: Text, PaymentButton, Link
```

### Login Page (`app/(auth)/login/page.tsx`)
```
<div> (50/50 split layout)
  ├── Left: Form
  │   ├── Logo (Image + Text)
  │   ├── Header (Text)
  │   ├── Verification messages
  │   ├── Google Sign-In button (inline)
  │   ├── Divider (inline)
  │   ├── Email input (raw HTML input)
  │   ├── Password input (raw HTML input)
  │   ├── Remember me + Forgot password
  │   ├── Submit Button (UI Button component)
  │   └── Sign up link
  │
  └── Right: Decorative
      ├── Gradient background
      ├── Background image
      └── Course preview image
```

### Signup Page (`app/(auth)/signup/page.tsx`)
Similar to Login with name field added.

### Courses List Page (`app/(marketing)/courses/page.tsx`)
```
Uses: CourseCard, Text, Button, Icon, Link
Features: Search, category filter, course grid
```

### Learning Player (`app/learn/[courseId]/[lessonId]/page.tsx`)
```
<div> (sidebar + main layout)
  ├── ModuleTimeline (sidebar)
  └── Main Content
      ├── VideoPlayer / MarkdownContent
      ├── LessonNavigation
      └── TableOfContents (for articles)
```

### Marketing Layout (`app/(marketing)/layout.tsx`)
```
├── Navbar (LMS custom)
├── {children}
└── Footer
```

---

## Component Dependency Graph

```
components/index.ts
  ├── exports from ui/ (all Tatva primitives)
  └── exports from components/custom/ (all LMS components)

UI Primitives (Layer 1 - no LMS dependencies):
  Button, Text, Icon, Badge, Avatar, Menu, Divider, Breadcrumbs,
  Tooltip, Toast, Input, Select, Dialog, etc.

Custom Components (Layer 2 - depend on Layer 1):
  Navbar         → Text, Button, Avatar, Menu, Badge
  Footer         → Text, Button
  HeroSection    → Text, Button
  CourseCard     → Text, Badge, Button, Icon
  CourseBanner   → Text, Badge, Avatar, Icon, Breadcrumbs
  EnrollCard     → Text, Button, Icon, Divider
  CourseContentAccordion → Text, Icon, Badge
  InstructorSection → Text, Badge, Button
  ReviewSection  → Text, Avatar, Icon, Button
  ModuleTimeline → Text, Icon
  VideoPlayer    → Text, Icon
  LessonNavigation → Text, Button, Icon
  TableOfContents → Text
  PaymentButton  → Button, Text, Badge
  CourseDetailSections → Text, Icon, Badge
  MarkdownContent → (react-markdown, syntax highlighter)
  MDXContent     → (mdx renderer)
```

---

## Global CSS & Theme Tokens

### File: `app/globals.css`

The entire design system is defined via CSS custom properties in `globals.css` and exposed to Tailwind via `@theme` block.

### Key CSS Sections:
1. **Font Configuration** - CSS variables for font families
2. **Design Tokens Light Mode** - All `:root` variables
3. **Design Tokens Dark Mode** - `.dark` class overrides
4. **Scrollbar Styling** - Custom thin auto-hide scrollbar
5. **Tailwind v4 @theme Block** - Maps CSS vars to Tailwind utilities
6. **Base Styles** - Body font, heading weights
7. **Marquee Animation** - For TrustedBy section

---

## Font System

### Current Fonts (configured in `app/layout.tsx`):
- **Plus Jakarta Sans** (`--font-jakarta`) - Body text, UI, headings. Weights: 200-800
- **Lora** (`--font-lora`) - Serif font for long-form reading (course content, articles)

### Planned Fonts (for new project):
- **Instrument Serif** - Main headings (display font)
- **Plus Jakarta Sans** - Body text, UI elements (keep consistent)

### Font CSS Variables:
```css
--tatva-family-matter: var(--font-jakarta), "Plus Jakarta Sans", system-ui, sans-serif;
--tatva-family-season: var(--font-lora), "Lora", Georgia, serif;
```

### Tailwind Font Utilities:
```css
--font-sans: var(--font-jakarta), "Plus Jakarta Sans", system-ui, sans-serif;
--font-serif: var(--font-lora), "Lora", Georgia, serif;
--font-matter: var(--tatva-family-matter);
--font-season: var(--tatva-family-season);
```

### Typography Scale:
| Token | Size | Usage |
|-------|------|-------|
| `text-tatva-body-xs` | 12px | Captions, metadata |
| `text-tatva-body-sm` | 14px | Body text, descriptions |
| `text-tatva-body-md` | 16px | Standard body |
| `text-tatva-body-lg` | 18px | Lead paragraphs |
| `text-tatva-label-sm` | 12px | Form labels, badges |
| `text-tatva-label-md` | 14px | Section labels |
| `text-tatva-heading-xs` | 16px | Card titles |
| `text-tatva-heading-sm` | 20px | Section sub-headings |
| `text-tatva-heading-md` | 24px | Section headings |
| `text-tatva-heading-lg` | 28px | Page headings |
| `text-tatva-display-sm` | 32px | Hero headings |

---

## Color System

### LMS Primary (Blue - Interaction/Trust)
| Token | Hex | Usage |
|-------|-----|-------|
| `lms-primary-50` | #EFF6FF | Soft backgrounds |
| `lms-primary-100` | #DBEAFE | Hover backgrounds |
| `lms-primary-200` | #BFDBFE | Light accents |
| `lms-primary-300` | #93C5FD | Borders |
| `lms-primary-400` | #60A5FA | Icons |
| `lms-primary-500` | #3B82F6 | **Primary CTA**, buttons |
| `lms-primary-600` | #2563EB | Hover state |
| `lms-primary-700` | #1D4ED8 | Active state |
| `lms-primary-800` | #1E40AF | Dark accents |
| `lms-primary-900` | #1E3A8A | Darkest |

### LMS Coral (Accent - Emotion/Highlights)
| Token | Hex | Usage |
|-------|-----|-------|
| `lms-coral-50` | #FFF7F5 | Light tint |
| `lms-coral-100` | #FFF5F2 | Warm card tint, article type bg |
| `lms-coral-200` | #FFDCD0 | Light accents |
| `lms-coral-300` | #FFC8B2 | Rating bars |
| `lms-coral-400` | #FFB494 | Progress bars |
| `lms-coral-500` | #FF7F50 | **Achievements, badges, stars** |
| `lms-coral-600` | #E66437 | Hover state |
| `lms-coral-700` | #C85028 | Advanced level text |

### Tatva Neutrals
| Token | Light | Usage |
|-------|-------|-------|
| `tatva-background-primary` | #FFFFFF | Page background |
| `tatva-background-secondary` | #F5F5F5 | Card backgrounds, sections |
| `tatva-background-tertiary` | #F0F0F0 | Progress bar tracks |
| `tatva-background-black` | #141414 | Dark buttons |
| `tatva-content-primary` | #141414 | Main text |
| `tatva-content-secondary` | #666666 | Secondary text |
| `tatva-content-tertiary` | #999999 | Muted text, metadata |
| `tatva-content-quaternary` | #B3B3B3 | Placeholder text |
| `tatva-border-primary` | #F0F0F0 | Default borders |
| `tatva-border-secondary` | #E6E6E6 | Stronger borders |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `lms-success` | #16A34A | Completed states |
| `lms-warning` | #F59E0B | Warnings |
| `lms-error` | #DC2626 | Errors |
| `tatva-positive-background` | #E5EDE2 | Success bg (muted sage) |
| `tatva-positive-content` | #5C8A50 | Success text (olive) |
| `tatva-danger-background` | #FBEAEA | Error bg (soft pink) |
| `tatva-danger-content` | #C84646 | Error text (muted red) |

### Accent Color Scales
Full 50-900 scales for: **Indigo, Orange, Green, Pink, Red, Yellow**
(All mapped via `--tatva-{color}-{shade}` variables)

---

## Spacing & Radius Tokens

### Spacing (base unit = 2px):
```
tatva-0: 0px     tatva-1: 2px     tatva-2: 4px     tatva-3: 6px
tatva-4: 8px     tatva-5: 10px    tatva-6: 12px    tatva-8: 16px
tatva-10: 20px   tatva-12: 24px   tatva-14: 28px   tatva-16: 32px
tatva-18: 36px   tatva-20: 40px   tatva-22: 44px   tatva-24: 48px
tatva-26: 52px   tatva-28: 56px   tatva-30: 60px   tatva-32: 64px
tatva-36: 72px   tatva-40: 80px
```

### Border Radius:
```
tatva-xs: 4px    tatva-sm: 8px    tatva-md: 12px
tatva-lg: 20px   tatva-xl: 28px   tatva-full: 9999px
```

### Shadows:
```
tatva-l1: subtle shadow (1px offset)
tatva-l2: medium shadow (4px offset)
```

---

## Files to Copy to Other Project

### Must-Have (Core Design System):
```
ui/                              # Entire Tatva design system folder
├── components/                  # All UI primitives
├── primitives/                  # InputWrapper, Listbox
├── lib/                         # Icons, utilities
├── index.ts                     # Barrel export
├── tailwind-preset.js           # Tailwind preset
└── tailwind.config.ts           # UI-specific config

app/globals.css                  # All design tokens (copy CSS variables + @theme)
tailwind-preset.js               # Root-level Tailwind preset
lib/utils.ts                     # cn() utility function
```

### Components to Copy (pick what you need):
```
components/custom/Navbar/        # If you need the LMS navbar
components/custom/Footer/        # If you need the footer
components/custom/CourseCard/     # For course listing cards
components/custom/CourseBanner/   # For course detail headers
components/custom/EnrollCard/     # For pricing sidebar
components/custom/CourseContentAccordion/ # For curriculum display
components/custom/InstructorSection/     # For instructor profiles
components/custom/ReviewSection/  # For reviews
components/custom/VideoPlayer/    # For video playback
components/custom/ModuleTimeline/ # For learning sidebar
components/custom/LessonNavigation/ # For prev/next navigation
components/custom/TableOfContents/ # For article TOC
components/custom/CourseDetailSections/ # TrustedBy, WhatYoullLearn, etc.
```

### npm Dependencies Required:
```json
{
  "class-variance-authority": "^0.7.1",
  "lucide-react": "^0.563.0",
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-slider": "^1.3.6",
  "@radix-ui/react-switch": "^1.2.6",
  "@radix-ui/react-tabs": "^1.1.13",
  "@radix-ui/react-tooltip": "^1.2.8",
  "@radix-ui/react-collapsible": "^1.1.12",
  "@radix-ui/react-radio-group": "^1.3.8",
  "@hugeicons/core-free-icons": "^3.1.1",
  "@hugeicons/react": "^1.1.4",
  "sonner": "^2.0.7",
  "react-markdown": "^10.1.0",
  "react-syntax-highlighter": "^16.1.0",
  "rehype-slug": "^6.0.0",
  "remark-gfm": "^4.0.1",
  "cmdk": "^1.1.1",
  "date-fns": "^4.1.0",
  "react-day-picker": "^9.13.1",
  "react-dropzone": "^14.4.0"
}
```

---

## Migration Prompt for Other Project

Use the following prompt when setting up the other project:

---

### Prompt: LexAI LMS UI Migration

```
I am migrating the LexAI LMS design system to a plain React + TypeScript project (non-Next.js).
The source project uses Next.js App Router, Tailwind CSS v4, and a two-layer component system.

**My project structure:**
- Plain React with TSX files
- Each component has its own .tsx and .css file
- No Tailwind yet (needs to be set up)

**What I need:**

1. **Set up Tailwind CSS v4** with the same design tokens from the LexAI LMS.
   - Copy the CSS custom properties from globals.css (:root and .dark)
   - Set up the @theme block for Tailwind utilities
   - Configure the same spacing, radius, shadow, and typography tokens

2. **Font configuration:**
   - Set up Instrument Serif for headings (display/heading variants)
   - Set up Plus Jakarta Sans for body text and UI
   - Map to the same CSS variables: --font-jakarta, --font-lora (replace Lora with Instrument Serif)

3. **Copy the UI component folder** (`ui/`) into my project's components directory.
   - These components use: @radix-ui primitives, class-variance-authority, HugeIcons, Tailwind classes
   - Adapt any Next.js-specific imports (Image → <img>, Link → <a> or react-router Link)

4. **Copy only the needed custom components** based on the sections I specify below.

5. **Replace Next.js specific patterns:**
   - `next/image` → standard `<img>` or a custom Image component
   - `next/link` → `<a>` or react-router `<Link>`
   - `next/font/google` → direct Google Fonts CDN or @fontsource
   - `"use client"` directives → remove (not needed in plain React)
   - `useRouter` from `next/navigation` → react-router's `useNavigate`

**Sections I need (tell me which sections you want):**
- [ ] Navbar
- [ ] Hero Section
- [ ] Trusted By / Logo Marquee
- [ ] Featured Courses Grid (CourseCard)
- [ ] Personas / Who Is This For
- [ ] Testimonials
- [ ] Instructor Section
- [ ] Subscription CTA
- [ ] Footer
- [ ] Course Detail Page (CourseBanner, Accordion, Includes, Reviews)
- [ ] Learning Player (VideoPlayer, ModuleTimeline, LessonNavigation)
- [ ] Login / Signup Pages
- [ ] Admin Dashboard

**As a product manager, also suggest:**
- What sections/pages an LMS should have (that may be missing)
- What links should be in the navbar and footer
- What social links an instructor should have (LinkedIn, YouTube, Twitter, GitHub, etc.)
- What images/assets I'll need
- What contact info I should configure
- Any UX improvements over the current design

**Ask me about:**
- Do we have a YouTube channel?
- Do we have a Twitter/X account?
- Do we have a GitHub organization?
- What email should be used for contact?
- What phone number (if any)?
- What is the pricing model?
- Do we need a blog section?
- Do we need a community/forum link?
- What LMS features do we need? (certificates, quizzes, assignments, etc.)
- What course categories exist?
- Do we need multi-language support?
- Do we need dark mode?
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| UI Primitive Components | 38 |
| Custom LMS Components | 17 (+ 4 sub-components in CourseDetailSections) |
| App Pages | 16 |
| Route Groups | 4 (marketing, auth, dashboard, admin) |
| Color Scales | 9 (primary, coral, indigo, orange, green, pink, red, yellow, neutrals) |
| Typography Variants | 11 |
| Spacing Tokens | 24 |
| Radius Tokens | 6 |
| Fonts | 2 (Plus Jakarta Sans, Lora) |
