# LexaiLabs LMS - Integration Prompt for Claude Code

## Project Context

This is a lightweight LMS for **LexaiLabs** with:
- **8 courses total**: 3 non-engineering, 5 engineering
- **Single instructor**: Co-founder of LexaiLabs (shown on landing page)
- **Content delivery**: MDX files rendered via Mintlify
- **Content types**: Video, PDF, text, audio - all embedded in MDX files
- **Layout for course content**: Left panel = module timeline, Right panel = table of contents

---

## UI Components

I have a `/ui` folder with pre-built Tatva Design System components. Follow `/ui/README.md` for setup.

**Key components for this project:**
- `Navbar` - Top navigation bar
- `Card` - Course cards, resource cards
- `List` + `ListGroup` - Module/lesson lists with status indicators
- `Accordion` - Collapsible module groups
- `Button`, `Badge`, `Text` - Basic elements
- `Input`, `Form` - Forms for auth/reviews

---

## Build Order (DFS Approach)

We will build **one page at a time**, completing each fully before moving to the next. Follow this exact order:

---

## Phase 1: Landing Page

### Route: `/` (Landing Page)

**Purpose**: Showcase LexaiLabs, the instructor, and link to courses.

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Navbar]                                                               │
│  Logo | Home | Explore Courses | About          [Sign In] [Sign Up]   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                         HERO SECTION                                   │
│    "Master AI & Technology with LexaiLabs"                            │
│    Subtitle about the mission                                          │
│    [Explore Courses Button]                                            │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│    ABOUT THE INSTRUCTOR                                                │
│    ┌──────────────────────────────────────────────────────────┐       │
│    │  [Large Avatar]   Name: Co-founder                       │       │
│    │                   Bio text...                             │       │
│    │                   Credentials, experience                 │       │
│    └──────────────────────────────────────────────────────────┘       │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│    COURSE CATEGORIES PREVIEW                                           │
│    "8 Courses to Transform Your Skills"                               │
│                                                                        │
│    Non-Engineering (3)        Engineering (5)                         │
│    [Preview cards]            [Preview cards]                         │
│                                                                        │
│    [View All Courses Button]                                           │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│    TESTIMONIALS / SOCIAL PROOF (optional)                             │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│    FOOTER                                                              │
└────────────────────────────────────────────────────────────────────────┘
```

**Components to use**:
- `Navbar` - variant="bordered", sticky=true
- Custom hero section (can be custom styled)
- `Card` - for instructor showcase
- `Button` - CTAs

**What to implement**:
1. Create basic page layout with Navbar
2. Hero section with headline and CTA
3. Instructor section with photo and bio
4. Course preview section (just thumbnails, links to /courses)
5. Footer

**After this is DONE, move to Phase 2.**

---

## Phase 2: Courses Page

### Route: `/courses` (Course Catalog)

**Purpose**: Show all 8 courses organized by category.

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Navbar]                                                               │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│    Explore Our Courses                                                 │
│                                                                        │
│    ─────────────────────────────────────────────────────────────────  │
│                                                                        │
│    NON-ENGINEERING COURSES                                             │
│    Subtitle: "Business, strategy, and soft skills"                    │
│                                                                        │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│    │ [Thumbnail]  │  │ [Thumbnail]  │  │ [Thumbnail]  │               │
│    │ Course Title │  │ Course Title │  │ Course Title │               │
│    │ X modules    │  │ X modules    │  │ X modules    │               │
│    │ [Price Badge]│  │ [Price Badge]│  │ [Price Badge]│               │
│    └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                        │
│    ─────────────────────────────────────────────────────────────────  │
│                                                                        │
│    ENGINEERING COURSES                                                 │
│    Subtitle: "Technical skills and hands-on projects"                 │
│                                                                        │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│    │ [Thumbnail]  │  │ [Thumbnail]  │  │ [Thumbnail]  │               │
│    │ Course Title │  │ Course Title │  │ Course Title │               │
│    │ X modules    │  │ X modules    │  │ X modules    │               │
│    │ [Price Badge]│  │ [Price Badge]│  │ [Price Badge]│               │
│    └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                        │
│    ┌──────────────┐  ┌──────────────┐                                 │
│    │ [Thumbnail]  │  │ [Thumbnail]  │                                 │
│    │ Course Title │  │ Course Title │                                 │
│    └──────────────┘  └──────────────┘                                 │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Components to use**:
- `Card` - direction="vertical", size="lg" for course cards
- `Badge` - for price/free indicator
- `Text` - section headings
- `Divider` - between sections

**Card metadata per course**:
- Thumbnail image
- Course title
- Number of modules
- Price (or "Free" badge)
- Category badge (optional)

**On card click**: Navigate to `/courses/[courseId]`

**After this is DONE, move to Phase 3.**

---

## Phase 3: Course Detail Page

### Route: `/courses/[courseId]` (Course Details)

**Purpose**: Show full course information before purchase/enrollment.

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Navbar]                                                               │
├────────────────────────────────────────────────────────────────────────┤
│ [Breadcrumbs: Courses > Course Name]                                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                                                                  │  │
│  │   [Course Banner/Thumbnail - Large]                             │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─────────────────────────────────┬───────────────────────────────┐  │
│  │                                 │                               │  │
│  │  Course Title (heading-lg)      │   ENROLL CARD                │  │
│  │  Short description              │   ┌───────────────────────┐  │  │
│  │                                 │   │ Price: $49            │  │  │
│  │  ─────────────────────────────  │   │                       │  │  │
│  │                                 │   │ [Enroll Now Button]   │  │  │
│  │  WHAT YOU'LL LEARN              │   │                       │  │  │
│  │  • Learning outcome 1           │   │ Includes:             │  │  │
│  │  • Learning outcome 2           │   │ • X video hours       │  │  │
│  │  • Learning outcome 3           │   │ • X modules           │  │  │
│  │  • Learning outcome 4           │   │ • Certificate         │  │  │
│  │                                 │   └───────────────────────┘  │  │
│  │  ─────────────────────────────  │                               │  │
│  │                                 │                               │  │
│  │  COURSE CONTENT                 │                               │  │
│  │  ┌─────────────────────────┐   │                               │  │
│  │  │ ▼ Module 1: Intro       │   │                               │  │
│  │  │   • Chapter 1           │   │                               │  │
│  │  │   • Chapter 2           │   │                               │  │
│  │  │ ▶ Module 2: Deep Dive   │   │                               │  │
│  │  │ ▶ Module 3: Advanced    │   │                               │  │
│  │  └─────────────────────────┘   │                               │  │
│  │                                 │                               │  │
│  │  ─────────────────────────────  │                               │  │
│  │                                 │                               │  │
│  │  REVIEWS                        │                               │  │
│  │  [Review cards / comment list]  │                               │  │
│  │                                 │                               │  │
│  │  [Add a Review Form]            │                               │  │
│  │                                 │                               │  │
│  └─────────────────────────────────┴───────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

**Components to use**:
- `Breadcrumbs` - navigation trail
- `Card` - for enroll sidebar card (sticky)
- `AccordionRoot` + `AccordionItem` - for course content modules
- `List` - for chapters within modules
- `Button` - Enroll CTA
- `Badge` - price, module count
- `Text` - headings, descriptions
- `Textarea` + `Button` - review form

**Course content structure**:
```
AccordionRoot
  └── AccordionItem (Module 1)
        └── ListGroup variant="seamless"
              ├── List (Chapter 1)
              ├── List (Chapter 2)
              └── List (Chapter 3)
  └── AccordionItem (Module 2)
        └── ...
```

**On module/chapter click**: Navigate to `/learn/[courseId]/[chapterId]`

**After this is DONE, move to Phase 4.**

---

## Phase 4: Course Content View (MDX + Mintlify)

### Route: `/learn/[courseId]/[chapterId]` (Learning View)

**Purpose**: Render MDX content with Mintlify, module navigation on left, TOC on right.

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Navbar - minimal, with back button]                                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ ┌────────────┬──────────────────────────────────────┬───────────────┐ │
│ │            │                                      │               │ │
│ │  MODULE    │         MDX CONTENT                  │  TABLE OF     │ │
│ │  TIMELINE  │         (Mintlify)                   │  CONTENTS     │ │
│ │            │                                      │               │ │
│ │  Course    │  ┌────────────────────────────────┐ │  On this page │ │
│ │  Title     │  │                                │ │               │ │
│ │            │  │  # Chapter Title               │ │  • Section 1  │ │
│ │  ▼ Module 1│  │                                │ │  • Section 2  │ │
│ │    Ch 1 ✓  │  │  Content with:                 │ │  • Section 3  │ │
│ │    Ch 2 ✓  │  │  - Text                        │ │               │ │
│ │    Ch 3 ▶  │  │  - Embedded video              │ │               │ │
│ │            │  │  - Code blocks                 │ │               │ │
│ │  ▶ Module 2│  │  - Images                      │ │               │ │
│ │    Ch 1 🔒 │  │  - PDFs (embedded)             │ │               │ │
│ │    Ch 2 🔒 │  │  - Audio players               │ │               │ │
│ │            │  │                                │ │               │ │
│ │  ▶ Module 3│  │                                │ │               │ │
│ │            │  │                                │ │               │ │
│ │            │  └────────────────────────────────┘ │               │ │
│ │            │                                      │               │ │
│ │            │  [Previous] [Mark Complete] [Next]   │               │ │
│ │            │                                      │               │ │
│ └────────────┴──────────────────────────────────────┴───────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

**Left Panel (Module Timeline)**:
- `AccordionRoot` for modules
- `ListGroup` variant="seamless" for chapters
- `List` with `status` prop:
  - `completed` - green checkmark
  - `in-progress` - play icon
  - `locked` - lock icon
- `List` with `active` prop for current chapter (indigo bg)

**Center (MDX Content)**:
- Mintlify renders the MDX file
- All content types (video, PDF, audio, code) are embedded in MDX
- Navigation buttons at bottom: Previous, Mark Complete, Next

**Right Panel (Table of Contents)**:
- Auto-generated from MDX headings
- Sticky scroll-spy highlighting current section

**After this is DONE, move to Phase 5.**

---

## Phase 5: Authentication

### Route: `/auth/signin`

**Layout**:
```
┌─────────────────────────────────────┐
│           [Logo]                    │
│     Sign in to your account         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Email                        │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ Password                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Sign In Button - full width]      │
│                                     │
│  Don't have an account? Sign up     │
└─────────────────────────────────────┘
```

**Components**: `Card`, `Input`, `Button`, `Text`

### Route: `/auth/signup`

Same as signin with additional fields: Name, Confirm Password

**After this is DONE, move to Phase 6.**

---

## Phase 6: User Dashboard

### Route: `/dashboard` (My Learning)

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Navbar with user menu]                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Welcome back, {Name}!                                                 │
│                                                                        │
│  MY COURSES                                                            │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐           │
│  │ [Course thumb] │  │ [Course thumb] │  │ [Course thumb] │           │
│  │ Course Title   │  │ Course Title   │  │ Course Title   │           │
│  │ ████████░░ 75% │  │ ██████░░░░ 60% │  │ ██░░░░░░░░ 20% │           │
│  │ [Continue]     │  │ [Continue]     │  │ [Continue]     │           │
│  └────────────────┘  └────────────────┘  └────────────────┘           │
│                                                                        │
│  COMPLETED COURSES                                                     │
│  [List of completed courses with certificates]                         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**After this is DONE, move to Phase 7.**

---

## Phase 7: Admin - Course Management

### Route: `/admin/courses`

**Purpose**: Admin can view, create, edit, delete courses.

**Layout**:
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Admin Navbar]                                                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Courses                                           [+ Create Course]   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ Image │ Title            │ Category │ Modules │ Status │ Actions │ │
│  │───────────────────────────────────────────────────────────────────│ │
│  │ [img] │ ML Fundamentals  │ Eng      │ 5       │ Live   │ ⋮       │ │
│  │ [img] │ Business 101     │ Non-Eng  │ 4       │ Draft  │ ⋮       │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Route: `/admin/courses/new` and `/admin/courses/[id]/edit`

**Purpose**: Create/edit course with modules and chapters.

**Form sections**:
1. Basic Info (title, description, category, price, thumbnail)
2. Modules (add/edit/reorder modules)
3. Chapters per module (link to MDX files or upload)

**After this is DONE, the core LMS is complete.**

---

## Data Models Reference

```typescript
// Course
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: "engineering" | "non-engineering";
  price: number; // 0 for free
  status: "draft" | "published";
  modules: Module[];
  createdAt: Date;
}

// Module
interface Module {
  id: string;
  title: string;
  order: number;
  chapters: Chapter[];
}

// Chapter
interface Chapter {
  id: string;
  title: string;
  order: number;
  mdxPath: string; // path to MDX file
  duration?: number; // estimated read time in minutes
}

// User
interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  enrollments: Enrollment[];
}

// Enrollment
interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: ChapterProgress[];
  enrolledAt: Date;
}

// ChapterProgress
interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  completedAt?: Date;
}

// Review
interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}
```

---

## Component Quick Reference

| Use Case | Component | Key Props |
|----------|-----------|-----------|
| Top navigation | `Navbar` | navItems, actions, user, variant="bordered" |
| Course card | `Card` | direction="vertical", size="lg" |
| Module group | `AccordionItem` | heading, subtitle, badge |
| Chapter list | `ListGroup` | variant="seamless" |
| Chapter item | `List` | status, active, onClick |
| Resource file | `Card` | variant="compact", topRightIcon |
| Price tag | `Badge` | variant="green" or "default" |
| CTA button | `Button` | variant="primary" |
| Forms | `Input`, `Textarea`, `Select` | - |
| Section heading | `Text` | variant="heading-md" |
| Tables | `Table` | columns, data |

---

## Instructions for Claude Code

1. **Start with Phase 1** (Landing Page)
2. Build completely, test in browser
3. Only when Phase 1 is working, move to Phase 2
4. Continue in order through all phases
5. Ask if you need clarification on any phase before building
6. Do NOT skip ahead or build multiple phases at once
