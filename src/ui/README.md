# Tatva UI Components

Self-contained UI component library extracted from Sarvam Tatva Design System. Ready to drop into any Next.js/React project.

## Quick Start

### 1. Copy the `/ui` folder to your project root

```bash
cp -r /path/to/sarvam-tatva/ui /your-project/ui
```

### 2. Install required dependencies

```bash
npm install class-variance-authority @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip lucide-react sonner react-day-picker date-fns react-dropzone
```

### 3. Update your `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";
import tatvaPreset from "./ui/tailwind-preset";

const config: Config = {
  presets: [tatvaPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [],
};

export default config;
```

### 4. Import globals.css in your root layout

```typescript
// app/layout.tsx
import "@/ui/globals.css";
```

### 5. Add TooltipProvider and Toaster to your root layout

```tsx
// app/layout.tsx
import { TooltipProvider, Toaster } from "@/ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
```

### 6. Start using components

```tsx
import { Button, Card, List, Accordion } from "@/ui";

export default function MyPage() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card heading="My Card" description="Card content" />
    </div>
  );
}
```

## Folder Structure

```
ui/
├── components/          # All UI components
│   ├── Accordion/       # Accordion with badge & subtitle (LMS-ready)
│   ├── Button/          # Button with variants
│   ├── Card/            # Card with compact variant (LMS-ready)
│   ├── List/            # List with status & active props (LMS-ready)
│   ├── ... (40+ components)
│   └── Sidebar/         # Full sidebar with navigation
├── lib/
│   ├── fonts/           # Matter & Season font files
│   ├── fonts.css        # Font face declarations
│   ├── styles.css       # CSS variables & theme tokens
│   ├── utils.ts         # Utility functions (cn, etc.)
│   ├── icons.ts         # Icon definitions
│   └── icon-context.ts  # Icon provider context
├── globals.css          # Main CSS file to import
├── index.ts             # All exports
├── tailwind-preset.js   # Tailwind preset with all tokens
├── tailwind.config.ts   # Sample tailwind config
└── postcss.config.mjs   # PostCSS config
```

## LMS-Enhanced Components

These components have been enhanced with LMS-specific features:

### List Component
- `active` prop - Highlights current/selected item with indigo background
- `status` prop - Auto-renders status icons:
  - `completed` - Green checkmark
  - `in-progress` - Play icon
  - `locked` - Lock icon (auto-disabled)

```tsx
<List
  title="Linear Regression"
  subtitle="35:00"
  status="in-progress"
  active
  rounded="md"
  onClick={() => navigateToLesson(id)}
/>
```

### ListGroup Component
- `variant="seamless"` - No border/dividers, just stacked items (for sidebars)

```tsx
<ListGroup variant="seamless">
  <List title="Lesson 1" status="completed" />
  <List title="Lesson 2" active />
</ListGroup>
```

### Card Component
- `variant="compact"` - Reduced padding, horizontal layout (for resource cards)

```tsx
<Card
  heading="Lesson Notes.pdf"
  description="2.4 MB"
  image="file"
  variant="compact"
  topRightIcon="download"
  onTopRightIconClick={handleDownload}
/>
```

### Accordion Component
- `badge` prop - Shows badge next to heading (e.g., progress: "4/6")
- `subtitle` prop - Secondary text (e.g., "6 lessons")

```tsx
<AccordionItem
  heading="Supervised Learning"
  subtitle="6 lessons"
  badge={{ type: "label", value: "4/6", variant: "green" }}
>
  {/* Lesson list */}
</AccordionItem>
```

## Dark Mode

Toggle dark mode by adding/removing the `dark` class on the `<html>` element:

```tsx
document.documentElement.classList.toggle("dark");
```

## Customization

To customize components, edit files directly in the `ui/components/` folder. All styling uses Tailwind CSS classes with the `tatva-` prefix for design tokens.

### Design Tokens

Colors, spacing, and other tokens are defined in:
- `ui/lib/styles.css` - CSS variables
- `ui/tailwind-preset.js` - Tailwind theme extension

### Adding Custom Icons

Use the `IconProvider` to add custom icons:

```tsx
import { IconProvider } from "@/ui";

<IconProvider icons={{ "custom-icon": CustomIconComponent }}>
  {children}
</IconProvider>
```
