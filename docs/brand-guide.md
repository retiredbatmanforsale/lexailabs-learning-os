# LexAI Labs Brand Guide

A comprehensive guide to colors and typography for creating brand-aligned visualizations, animations, and content.

---

## Color Philosophy

- **Blue** = Interaction, trust, cognition, learning (Primary brand color)
- **Coral/Orange** = Emotion, highlights, achievements, glows, gradients (Accent - minimal use)
- **Black/Dark** = Primary text, content hierarchy
- **Green** = Success states, completion

---

## Primary Colors (Blue)

The primary blue palette is used for interactive elements, CTAs, links, and to highlight important information.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary 50 | `#EFF6FF` | `239, 246, 255` | Soft backgrounds, hover states |
| Primary 100 | `#DBEAFE` | `219, 234, 254` | Light backgrounds |
| Primary 200 | `#BFDBFE` | `191, 219, 254` | Borders, dividers |
| Primary 300 | `#93C5FD` | `147, 197, 253` | Secondary elements |
| Primary 400 | `#60A5FA` | `96, 165, 250` | Icons, secondary buttons |
| **Primary 500** | `#3B82F6` | `59, 130, 246` | **Main CTA, primary buttons, links** |
| Primary 600 | `#2563EB` | `37, 99, 235` | Hover states |
| Primary 700 | `#1D4ED8` | `29, 78, 216` | Active/pressed states |
| Primary 800 | `#1E40AF` | `30, 64, 175` | Dark accents |
| Primary 900 | `#1E3A8A` | `30, 58, 138` | Very dark blue |

### For Animations/Visualizations
- **Main elements**: Use `#3B82F6` (Primary 500)
- **Highlights/glow**: Use `#60A5FA` (Primary 400) or `#93C5FD` (Primary 300)
- **Backgrounds**: Use `#EFF6FF` (Primary 50) or `#DBEAFE` (Primary 100)
- **Gradients**: `#3B82F6` → `#2563EB` or `#60A5FA` → `#3B82F6`

---

## Accent Colors (Coral/Orange)

Used sparingly for emotional highlights, achievements, progress indicators, badges, and subtle glows. Not the primary color.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Coral 50 | `#FFF7F5` | `255, 247, 245` | Very light tint |
| Coral 100 | `#FFF5F2` | `255, 245, 242` | Warm card backgrounds |
| Coral 200 | `#FFDCD0` | `255, 220, 208` | Light accents |
| Coral 300 | `#FFC8B2` | `255, 200, 178` | Secondary accents |
| Coral 400 | `#FFB494` | `255, 180, 148` | Progress bars, soft highlights |
| **Coral 500** | `#FF7F50` | `255, 127, 80` | **Achievements, badges, key accents** |
| Coral 600 | `#E66437` | `230, 100, 55` | Hover on coral elements |
| Coral 700 | `#C85028` | `200, 80, 40` | Dark coral |

### For Animations/Visualizations
- **Accent points/nodes**: Use `#FF7F50` (Coral 500)
- **Glows/halos**: Use `#FFB494` (Coral 400) with opacity
- **Warm gradients**: `#FF7F50` → `#FFB494`
- **Progress/success animations**: Coral 400-500 range

---

## Neutral Colors (Text & Backgrounds)

Used for content hierarchy, backgrounds, and structure.

### Backgrounds (Light Mode)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background Primary | `#FFFFFF` | `255, 255, 255` | Main background |
| Background Secondary | `#F5F5F5` | `245, 245, 245` | Cards, sections |
| Background Tertiary | `#F0F0F0` | `240, 240, 240` | Nested elements |
| Background Black | `#141414` | `20, 20, 20` | Dark mode, inverted sections |

### Text Colors (Light Mode)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Content Primary** | `#141414` | `20, 20, 20` | **Main text, headings** |
| Content Secondary | `#666666` | `102, 102, 102` | Secondary text, descriptions |
| Content Tertiary | `#999999` | `153, 153, 153` | Muted text, captions |
| Content Quaternary | `#B3B3B3` | `179, 179, 179` | Placeholder text |
| Content Inverse | `#FFFFFF` | `255, 255, 255` | Text on dark backgrounds |

### Borders
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Border Primary | `#F0F0F0` | `240, 240, 240` | Subtle borders |
| Border Secondary | `#E6E6E6` | `230, 230, 230` | Card borders |
| Border Tertiary | `#B3B3B3` | `179, 179, 179` | Input borders, dividers |

---

## Semantic Colors

| Purpose | Hex | RGB | Usage |
|---------|-----|-----|-------|
| **Success** | `#16A34A` | `22, 163, 74` | Completed states, positive feedback |
| **Warning** | `#F59E0B` | `245, 158, 11` | Warnings, caution |
| **Error** | `#DC2626` | `220, 38, 38` | Errors, destructive actions |

### Soft Semantic (for backgrounds)
| Purpose | Background Hex | Content Hex |
|---------|----------------|-------------|
| Positive | `#E5EDE2` | `#5C8A50` |
| Warning | `#F5ECD7` | `#A0823C` |
| Danger | `#FBEAEA` | `#C84646` |

---

## Typography

### Font Families

| Font | Type | Usage |
|------|------|-------|
| **Plus Jakarta Sans** | Sans-serif | UI elements, body text, headings, buttons, labels |
| **Lora** | Serif | Long-form reading (articles, course content, lessons, notes) |

### Plus Jakarta Sans
- **Source**: Google Fonts
- **Weights**: 200, 300, 400, 500, 600, 700, 800
- **CSS Variable**: `--font-jakarta`
- **Usage**:
  - `font-weight: 400` - Body text, paragraphs
  - `font-weight: 500` - Labels, buttons
  - `font-weight: 600` - Subheadings (h3-h6)
  - `font-weight: 700` - Main headings (h1-h2)

### Lora
- **Source**: Google Fonts
- **Weights**: 400, 500, 600, 700
- **CSS Variable**: `--font-lora`
- **Usage**:
  - Long-form content
  - Course/lesson content
  - Article bodies
  - Reading-focused sections

### Font Size Scale

| Token | Size | Usage |
|-------|------|-------|
| body-xs | 12px | Small captions, metadata |
| body-sm | 14px | Secondary body text |
| body-md | 16px | Main body text |
| body-lg | 18px | Emphasis text |
| label-sm | 12px | Small labels |
| label-md | 14px | Standard labels |
| heading-xs | 16px | Small headings |
| heading-sm | 20px | Section headings |
| heading-md | 24px | Page subheadings |
| heading-lg | 28px | Page headings |
| display-sm | 32px | Hero text, large titles |

---

## Color Combinations for ML/AI Visualizations

### Data Points & Nodes
- **Primary nodes**: `#3B82F6` (Blue 500)
- **Secondary nodes**: `#60A5FA` (Blue 400)
- **Highlight/selected nodes**: `#FF7F50` (Coral 500)
- **Background nodes**: `#93C5FD` (Blue 300)

### Lines & Connections
- **Primary connections**: `#3B82F6` (Blue 500)
- **Secondary connections**: `#BFDBFE` (Blue 200)
- **Highlight path**: `#FF7F50` (Coral 500)

### Gradients for ML Visualizations
```css
/* Primary gradient (learning/processing) */
background: linear-gradient(135deg, #3B82F6, #2563EB);

/* Accent gradient (highlights/achievements) */
background: linear-gradient(135deg, #FF7F50, #FFB494);

/* Soft background gradient */
background: linear-gradient(180deg, #EFF6FF, #FFFFFF);

/* Progress/completion gradient */
background: linear-gradient(90deg, #3B82F6, #FF7F50);
```

### Glow Effects
```css
/* Blue glow (primary elements) */
box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);

/* Coral glow (highlights) */
box-shadow: 0 0 20px rgba(255, 127, 80, 0.4);

/* Soft blue glow */
box-shadow: 0 0 40px rgba(96, 165, 250, 0.3);
```

### Regression/Chart Colors
- **Data line**: `#3B82F6` (Blue 500)
- **Prediction line**: `#FF7F50` (Coral 500)
- **Confidence interval**: `#DBEAFE` (Blue 100) at 30% opacity
- **Grid lines**: `#E6E6E6` (Border Secondary)
- **Axis labels**: `#666666` (Content Secondary)
- **Title text**: `#141414` (Content Primary)

---

## Quick Reference

### Essential Colors
| Purpose | Hex |
|---------|-----|
| Primary Blue | `#3B82F6` |
| Primary Blue Hover | `#2563EB` |
| Accent Coral | `#FF7F50` |
| Black/Text | `#141414` |
| White/Background | `#FFFFFF` |
| Success Green | `#16A34A` |

### CSS Variables
```css
/* Primary Blue */
--lms-primary-500: #3B82F6;
--lms-primary-600: #2563EB;

/* Coral Accent */
--lms-coral-500: #FF7F50;
--lms-coral-400: #FFB494;

/* Text */
--tatva-content-primary: #141414;
--tatva-content-secondary: #666666;

/* Background */
--tatva-background-primary: #FFFFFF;
--tatva-background-secondary: #F5F5F5;
```

### Font CSS
```css
/* Sans-serif (UI, headings) */
font-family: "Plus Jakarta Sans", system-ui, sans-serif;

/* Serif (reading content) */
font-family: "Lora", Georgia, serif;
```

---

## Usage Guidelines Summary

1. **Blue is primary** - Use for all interactive elements, CTAs, links, and to draw attention to learning-focused content
2. **Coral is accent** - Use sparingly for emotional highlights, achievements, progress, and special moments
3. **Black for text** - Primary content uses near-black (`#141414`) for optimal readability
4. **Plus Jakarta Sans for UI** - All interface elements, buttons, labels, and headings
5. **Lora for reading** - Long-form content like course materials and articles
