# LexAI Labs LMS - Color System

## Design Philosophy

The LexAI LMS uses a **Blue Primary + Coral Accent** color strategy to create a professional, trustworthy learning environment while maintaining emotional connection through warm highlights.

**Blue = Interaction** (trust, cognition, learning, stability)
**Coral = Emotion** (success, progress, highlights, CTAs)

This separation makes the UI feel intentional and mature, similar to Notion, Stripe, and Coursera.

---

## 1. Primary Colors (Functional Brand Blue)

Used as the main interactive color inside the LMS.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--lms-primary-500` | #3B82F6 | 59 130 246 | Primary buttons, active states, links |
| `--lms-primary-600` | #2563EB | 37 99 235 | Hover states, pressed buttons |
| `--lms-primary-50` | #EFF6FF | 239 246 255 | Soft backgrounds, active card tints |

### Tailwind Classes
```css
bg-lms-primary          /* #3B82F6 - Primary button */
bg-lms-primary-hover    /* #2563EB - Hover state */
bg-lms-primary-soft     /* #EFF6FF - Soft background */
text-lms-primary        /* #3B82F6 - Links, active text */
border-lms-primary      /* #3B82F6 - Active borders */
```

---

## 2. Secondary Accent (Brand Coral)

Used for emotional highlights, progress, and completion states.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--lms-coral-500` | #FF7F50 | 255 127 80 | Success moments, badges, achievements |
| `--lms-coral-400` | #FFB494 | 255 180 148 | Progress bars, hover glow |
| `--lms-coral-100` | #FFF5F2 | 255 245 242 | Warm card tint backgrounds |

### Tailwind Classes
```css
bg-lms-coral            /* #FF7F50 - Achievement badges */
bg-lms-coral-soft       /* #FFB494 - Progress bars */
bg-lms-coral-tint       /* #FFF5F2 - Warm background */
text-lms-coral          /* #FF7F50 - Highlight text */
```

---

## 3. Neutral Foundation

Already premium SaaS level from Tatva - do NOT change.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--tatva-content-primary` | #171717 | 23 23 23 | Headings, dark nav, primary text |
| `--tatva-content-secondary` | #525252 | 82 82 82 | Secondary text, descriptions |
| `--tatva-background-tertiary` | #E5E5E5 | 229 229 229 | Dividers, subtle borders |
| `--tatva-background-secondary` | #FAFAFA | 250 250 250 | Section backgrounds |
| `--tatva-background-primary` | #FFFFFF | 255 255 255 | Cards, content areas |

---

## 4. Semantic Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--lms-success` | #16A34A | 22 163 74 | Completed lessons, success states |
| `--lms-warning` | #F59E0B | 245 158 11 | Warnings, attention needed |
| `--lms-error` | #DC2626 | 220 38 38 | Errors, failed states |
| `--lms-info` | #3B82F6 | (same as primary) | Info messages |

---

## 5. UI Application Guide

### Buttons
```
Primary CTA      -> bg-lms-primary hover:bg-lms-primary-hover
Secondary        -> bg-tatva-background-secondary border-tatva-border
Ghost            -> bg-transparent hover:bg-tatva-background-secondary
```

### Progress & Completion
```
Progress bar     -> gradient from coral-400 to coral-500
Completed badge  -> bg-lms-success/10 text-lms-success
Certificate      -> border-lms-coral accent
```

### Cards & Dashboard
```
Card background  -> bg-white (tatva-background-primary)
Card hover       -> border-lms-primary/20 (subtle blue tint)
Active card      -> bg-lms-primary-50 border-lms-primary
```

### Navigation
```
Top bar          -> bg-white border-b border-tatva-border
Active tab       -> border-b-2 border-lms-primary text-lms-primary
Inactive tab     -> text-tatva-content-secondary
Focus ring       -> ring-lms-primary ring-2
```

### Status Indicators
```
Completed        -> text-lms-success (green checkmark)
In Progress      -> text-lms-primary (blue play icon)
Locked           -> text-tatva-content-tertiary (gray lock)
```

---

## 6. CSS Variables Reference

```css
:root {
  /* LMS Primary - Blue */
  --lms-primary-50: 239 246 255;   /* #EFF6FF */
  --lms-primary-100: 219 234 254;  /* #DBEAFE */
  --lms-primary-200: 191 219 254;  /* #BFDBFE */
  --lms-primary-300: 147 197 253;  /* #93C5FD */
  --lms-primary-400: 96 165 250;   /* #60A5FA */
  --lms-primary-500: 59 130 246;   /* #3B82F6 */
  --lms-primary-600: 37 99 235;    /* #2563EB */
  --lms-primary-700: 29 78 216;    /* #1D4ED8 */
  --lms-primary-800: 30 64 175;    /* #1E40AF */
  --lms-primary-900: 30 58 138;    /* #1E3A8A */

  /* LMS Coral - Accent */
  --lms-coral-100: 255 245 242;    /* #FFF5F2 */
  --lms-coral-200: 255 220 208;    /* #FFDCD0 */
  --lms-coral-300: 255 200 178;    /* #FFC8B2 */
  --lms-coral-400: 255 180 148;    /* #FFB494 */
  --lms-coral-500: 255 127 80;     /* #FF7F50 */
  --lms-coral-600: 230 100 55;     /* #E66437 */
  --lms-coral-700: 200 80 40;      /* #C85028 */

  /* Semantic */
  --lms-success: 22 163 74;        /* #16A34A */
  --lms-warning: 245 158 11;       /* #F59E0B */
  --lms-error: 220 38 38;          /* #DC2626 */
}

.dark {
  /* Dark mode adjustments */
  --lms-primary-500: 96 165 250;   /* Lighter blue for dark mode */
  --lms-primary-600: 59 130 246;
  --lms-primary-50: 30 58 138;     /* Dark blue background */

  --lms-coral-500: 255 140 100;
  --lms-coral-400: 255 160 130;
  --lms-coral-100: 50 30 25;
}
```

---

## 7. Component Color Mapping

| Component | Light Mode | Dark Mode |
|-----------|------------|-----------|
| Button Primary | bg-lms-primary-500 | bg-lms-primary-500 |
| Button Primary Hover | bg-lms-primary-600 | bg-lms-primary-400 |
| Link | text-lms-primary-500 | text-lms-primary-400 |
| Active Tab Underline | border-lms-primary-500 | border-lms-primary-400 |
| Progress Bar Fill | bg-lms-coral-500 | bg-lms-coral-400 |
| Completed Icon | text-lms-success | text-lms-success (brighter) |
| Card Active | bg-lms-primary-50 | bg-lms-primary-900/50 |
| Focus Ring | ring-lms-primary-500 | ring-lms-primary-400 |

---

## 8. Accessibility Notes

- Primary blue (#3B82F6) passes WCAG AA for large text on white
- For small text, use #2563EB (primary-600) for better contrast
- Coral (#FF7F50) should not be used for text - use for decorative elements only
- Success green (#16A34A) passes WCAG AA on white backgrounds
- Always pair colored backgrounds with appropriate contrast text

---

## 9. Quick Reference

```
Blue (Interaction)     Coral (Emotion)        Neutral (Foundation)
─────────────────      ───────────────        ────────────────────
#3B82F6 primary        #FF7F50 accent         #171717 heading
#2563EB hover          #FFB494 progress       #525252 body
#EFF6FF soft           #FFF5F2 tint           #E5E5E5 border
                                               #FAFAFA surface
                                               #FFFFFF card
```
