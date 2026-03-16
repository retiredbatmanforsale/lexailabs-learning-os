/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        matter: ["var(--tatva-family-matter)"],
        season: ["var(--tatva-family-season)"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        tatva: {
          // Background colors
          background: {
            default: "rgb(var(--tatva-background-primary))",
            primary: {
              DEFAULT: "rgb(var(--tatva-background-primary))",
              hover: "rgb(var(--tatva-background-primary-hover))",
            },
            secondary: {
              DEFAULT: "rgb(var(--tatva-background-secondary))",
              hover: "rgb(var(--tatva-background-secondary-hover))",
            },
            tertiary: {
              DEFAULT: "rgb(var(--tatva-background-tertiary))",
              hover: "rgb(var(--tatva-background-tertiary-hover))",
            },
            black: {
              DEFAULT: "rgb(var(--tatva-background-black) / <alpha-value>)",
              hover: "rgb(var(--tatva-background-black-hover) / <alpha-value>)",
            },
          },

          // Content colors
          content: {
            DEFAULT: "rgb(var(--tatva-content-primary))",
            primary: "rgb(var(--tatva-content-primary))",
            inverse: "rgb(var(--tatva-content-inverse))",
            secondary: "rgb(var(--tatva-content-secondary))",
            tertiary: "rgb(var(--tatva-content-tertiary))",
            quaternary: "rgb(var(--tatva-content-quaternary))",
          },

          // Surface colors
          surface: {
            DEFAULT: "rgb(var(--tatva-surface-primary))",
            primary: "rgb(var(--tatva-surface-primary))",
            secondary: "rgb(var(--tatva-surface-secondary))",
          },

          // Border colors
          border: {
            DEFAULT: "rgb(var(--tatva-border-primary))",
            primary: "rgb(var(--tatva-border-primary))",
            secondary: "rgb(var(--tatva-border-secondary))",
            tertiary: "rgb(var(--tatva-border-tertiary))",
          },

          // Brand colors
          brand: {
            DEFAULT: "rgb(var(--tatva-brand-primary))",
            primary: {
              DEFAULT: "rgb(var(--tatva-brand-primary))",
              hover: "rgb(var(--tatva-brand-primary-hover))",
            },
            secondary: {
              DEFAULT: "rgb(var(--tatva-brand-secondary))",
              hover: "rgb(var(--tatva-brand-secondary-hover))",
            },
            content: {
              primary: "rgb(var(--tatva-brand-content-primary))",
              secondary: "rgb(var(--tatva-brand-content-secondary))",
            },
          },

          // Semantic colors - Positive
          positive: {
            DEFAULT: "rgb(var(--tatva-positive-content))",
            background: "rgb(var(--tatva-positive-background))",
            content: "rgb(var(--tatva-positive-content))",
          },

          // Semantic colors - Warning
          warning: {
            DEFAULT: "rgb(var(--tatva-warning-content))",
            background: "rgb(var(--tatva-warning-background))",
            content: "rgb(var(--tatva-warning-content))",
          },

          // Semantic colors - Danger
          danger: {
            DEFAULT: "rgb(var(--tatva-danger-content))",
            background: {
              DEFAULT: "rgb(var(--tatva-danger-background))",
              hover: "rgb(var(--tatva-danger-background-hover))",
            },
            content: "rgb(var(--tatva-danger-content))",
          },

          // Accent colors - Indigo
          indigo: {
            DEFAULT: "rgb(var(--tatva-indigo-content))",
            50: "rgb(var(--tatva-indigo-50))",
            100: "rgb(var(--tatva-indigo-100))",
            200: "rgb(var(--tatva-indigo-200))",
            300: "rgb(var(--tatva-indigo-300))",
            400: "rgb(var(--tatva-indigo-400))",
            500: "rgb(var(--tatva-indigo-500))",
            600: "rgb(var(--tatva-indigo-600))",
            700: "rgb(var(--tatva-indigo-700))",
            800: "rgb(var(--tatva-indigo-800))",
            900: "rgb(var(--tatva-indigo-900))",
            background: "rgb(var(--tatva-indigo-background))",
            content: "rgb(var(--tatva-indigo-content))",
          },

          // Accent colors - Orange
          orange: {
            DEFAULT: "rgb(var(--tatva-orange-content))",
            50: "rgb(var(--tatva-orange-50))",
            100: "rgb(var(--tatva-orange-100))",
            200: "rgb(var(--tatva-orange-200))",
            300: "rgb(var(--tatva-orange-300))",
            400: "rgb(var(--tatva-orange-400))",
            500: "rgb(var(--tatva-orange-500))",
            600: "rgb(var(--tatva-orange-600))",
            700: "rgb(var(--tatva-orange-700))",
            800: "rgb(var(--tatva-orange-800))",
            900: "rgb(var(--tatva-orange-900))",
            background: "rgb(var(--tatva-orange-background))",
            content: "rgb(var(--tatva-orange-content))",
          },

          // Accent colors - Green
          green: {
            DEFAULT: "rgb(var(--tatva-green-content))",
            50: "rgb(var(--tatva-green-50))",
            100: "rgb(var(--tatva-green-100))",
            200: "rgb(var(--tatva-green-200))",
            300: "rgb(var(--tatva-green-300))",
            400: "rgb(var(--tatva-green-400))",
            500: "rgb(var(--tatva-green-500))",
            600: "rgb(var(--tatva-green-600))",
            700: "rgb(var(--tatva-green-700))",
            800: "rgb(var(--tatva-green-800))",
            900: "rgb(var(--tatva-green-900))",
            background: "rgb(var(--tatva-green-background))",
            content: "rgb(var(--tatva-green-content))",
          },

          // Accent colors - Pink
          pink: {
            DEFAULT: "rgb(var(--tatva-pink-content))",
            50: "rgb(var(--tatva-pink-50))",
            100: "rgb(var(--tatva-pink-100))",
            200: "rgb(var(--tatva-pink-200))",
            300: "rgb(var(--tatva-pink-300))",
            400: "rgb(var(--tatva-pink-400))",
            500: "rgb(var(--tatva-pink-500))",
            600: "rgb(var(--tatva-pink-600))",
            700: "rgb(var(--tatva-pink-700))",
            800: "rgb(var(--tatva-pink-800))",
            900: "rgb(var(--tatva-pink-900))",
            background: "rgb(var(--tatva-pink-background))",
            content: "rgb(var(--tatva-pink-content))",
          },

          // Accent colors - Red
          red: {
            DEFAULT: "rgb(var(--tatva-red-content))",
            50: "rgb(var(--tatva-red-50))",
            100: "rgb(var(--tatva-red-100))",
            200: "rgb(var(--tatva-red-200))",
            300: "rgb(var(--tatva-red-300))",
            400: "rgb(var(--tatva-red-400))",
            500: "rgb(var(--tatva-red-500))",
            600: "rgb(var(--tatva-red-600))",
            700: "rgb(var(--tatva-red-700))",
            800: "rgb(var(--tatva-red-800))",
            900: "rgb(var(--tatva-red-900))",
            background: "rgb(var(--tatva-red-background))",
            content: "rgb(var(--tatva-red-content))",
          },

          // Accent colors - Yellow
          yellow: {
            DEFAULT: "rgb(var(--tatva-yellow-content))",
            50: "rgb(var(--tatva-yellow-50))",
            100: "rgb(var(--tatva-yellow-100))",
            200: "rgb(var(--tatva-yellow-200))",
            300: "rgb(var(--tatva-yellow-300))",
            400: "rgb(var(--tatva-yellow-400))",
            500: "rgb(var(--tatva-yellow-500))",
            600: "rgb(var(--tatva-yellow-600))",
            700: "rgb(var(--tatva-yellow-700))",
            800: "rgb(var(--tatva-yellow-800))",
            900: "rgb(var(--tatva-yellow-900))",
            background: "rgb(var(--tatva-yellow-background))",
            content: "rgb(var(--tatva-yellow-content))",
          },
        },
      },
      borderRadius: {
        "tatva-none": "0px",
        "tatva-xs": "calc(var(--tatva-radius-base) * 1)",
        "tatva-sm": "calc(var(--tatva-radius-base) * 2)",
        "tatva-md": "calc(var(--tatva-radius-base) * 3)",
        "tatva-lg": "calc(var(--tatva-radius-base) * 5)",
        "tatva-xl": "calc(var(--tatva-radius-base) * 7)",
        "tatva-full": "calc(var(--tatva-radius-base) * 999)",
      },
      fontSize: {
        /* Body sizes - base 12px */
        "tatva-body-xs": "var(--tatva-font-size-base)",                      /* 12px */
        "tatva-body-sm": "calc(var(--tatva-font-size-base) + 2px)",          /* 14px */
        "tatva-body-md": "calc(var(--tatva-font-size-base) + 4px)",          /* 16px */
        "tatva-body-lg": "calc(var(--tatva-font-size-base) + 6px)",          /* 18px */
        /* Label sizes */
        "tatva-label-sm": "var(--tatva-font-size-base)",                     /* 12px */
        "tatva-label-md": "calc(var(--tatva-font-size-base) + 2px)",         /* 14px */
        /* Heading sizes - larger increments for clear hierarchy */
        "tatva-heading-xs": "calc(var(--tatva-font-size-base) + 4px)",       /* 16px */
        "tatva-heading-sm": "calc(var(--tatva-font-size-base) + 8px)",       /* 20px */
        "tatva-heading-md": "calc(var(--tatva-font-size-base) + 12px)",      /* 24px */
        "tatva-heading-lg": "calc(var(--tatva-font-size-base) + 16px)",      /* 28px */
        /* Display size */
        "tatva-display-sm": "calc(var(--tatva-font-size-base) + 20px)",      /* 32px */
      },
      boxShadow: {
        "tatva-l1": "0 0 var(--tatva-shadow-blur) 0 rgb(var(--tatva-shadow-l1-color))",
        "tatva-l2": "0 0 var(--tatva-shadow-blur) 0 rgb(var(--tatva-shadow-l2-color))",
      },
      gridTemplateRows: {
        "tatva-0": "0fr",
        "tatva-1": "1fr",
      },
      translate: {
        0: "0",
        "1/2": "50%",
        "-1/2": "-50%",
        full: "100%",
        "-full": "-100%",
      },
      maxWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      spacing: {
        auto: "auto",
        "1/2": "50%",
        full: "100%",
        screen: "100vh",
        px: "1px",
        "tatva-0": "calc(var(--tatva-spacing-base) * 0)",
        "tatva-0.5": "calc(var(--tatva-spacing-base) * 0.5)",
        "tatva-1": "calc(var(--tatva-spacing-base) * 1)",
        "tatva-2": "calc(var(--tatva-spacing-base) * 2)",
        "tatva-3": "calc(var(--tatva-spacing-base) * 3)",
        "tatva-4": "calc(var(--tatva-spacing-base) * 4)",
        "tatva-5": "calc(var(--tatva-spacing-base) * 5)",
        "tatva-6": "calc(var(--tatva-spacing-base) * 6)",
        "tatva-7": "calc(var(--tatva-spacing-base) * 7)",
        "tatva-8": "calc(var(--tatva-spacing-base) * 8)",
        "tatva-9": "calc(var(--tatva-spacing-base) * 9)",
        "tatva-10": "calc(var(--tatva-spacing-base) * 10)",
        "tatva-12": "calc(var(--tatva-spacing-base) * 12)",
        "tatva-14": "calc(var(--tatva-spacing-base) * 14)",
        "tatva-16": "calc(var(--tatva-spacing-base) * 16)",
        "tatva-18": "calc(var(--tatva-spacing-base) * 18)",
        "tatva-20": "calc(var(--tatva-spacing-base) * 20)",
        "tatva-22": "calc(var(--tatva-spacing-base) * 22)",
        "tatva-24": "calc(var(--tatva-spacing-base) * 24)",
        "tatva-26": "calc(var(--tatva-spacing-base) * 26)",
        "tatva-27": "calc(var(--tatva-spacing-base) * 27)",
        "tatva-28": "calc(var(--tatva-spacing-base) * 28)",
        "tatva-30": "calc(var(--tatva-spacing-base) * 30)",
        "tatva-31": "calc(var(--tatva-spacing-base) * 31)",
        "tatva-32": "calc(var(--tatva-spacing-base) * 32)",
        "tatva-34": "calc(var(--tatva-spacing-base) * 34)",
        "tatva-36": "calc(var(--tatva-spacing-base) * 36)",
        "tatva-38": "calc(var(--tatva-spacing-base) * 38)",
        "tatva-40": "calc(var(--tatva-spacing-base) * 40)",
        "tatva-46": "calc(var(--tatva-spacing-base) * 46)",
        "tatva-60": "calc(var(--tatva-spacing-base) * 60)",
        "tatva-72": "calc(var(--tatva-spacing-base) * 72)",
        "tatva-80": "calc(var(--tatva-spacing-base) * 80)",
        "tatva-100": "calc(var(--tatva-spacing-base) * 100)",
        "tatva-120": "calc(var(--tatva-spacing-base) * 120)",
        "tatva-140": "calc(var(--tatva-spacing-base) * 140)",
        "tatva-150": "calc(var(--tatva-spacing-base) * 150)",
        "tatva-160": "calc(var(--tatva-spacing-base) * 160)",
        "tatva-210": "calc(var(--tatva-spacing-base) * 210)",
        "tatva-300": "calc(var(--tatva-spacing-base) * 300)",
        "tatva-400": "calc(var(--tatva-spacing-base) * 400)",
        "tatva-600": "calc(var(--tatva-spacing-base) * 600)",
      },
      keyframes: {
        "tatva-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "tatva-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "tatva-fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "tatva-slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "tatva-slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "tatva-slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "tatva-slide-out-to-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "tatva-zoom-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "tatva-zoom-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        "tatva-dialog-overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "tatva-dialog-overlay-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "tatva-dialog-content-in": {
          from: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        "tatva-dialog-content-out": {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
        },
        "tatva-skeleton-shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "tatva-skeleton-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "tatva-accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "tatva-accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "tatva-linear-loader": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
      animation: {
        "tatva-spin": "tatva-spin 1s linear infinite",
        "tatva-fade-in": "tatva-fade-in 200ms ease-out",
        "tatva-fade-out": "tatva-fade-out 200ms ease-in",
        "tatva-slide-in-from-right": "tatva-slide-in-from-right 300ms ease-out",
        "tatva-slide-out-to-right": "tatva-slide-out-to-right 300ms ease-in",
        "tatva-slide-in-from-left": "tatva-slide-in-from-left 300ms ease-out",
        "tatva-slide-out-to-left": "tatva-slide-out-to-left 300ms ease-in",
        "tatva-zoom-in": "tatva-zoom-in 200ms ease-out",
        "tatva-zoom-out": "tatva-zoom-out 200ms ease-in",
        "tatva-dialog-overlay-in": "tatva-dialog-overlay-in 150ms ease-out forwards",
        "tatva-dialog-overlay-out": "tatva-dialog-overlay-out 150ms ease-in forwards",
        "tatva-dialog-content-in": "tatva-dialog-content-in 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "tatva-dialog-content-out": "tatva-dialog-content-out 150ms ease-in forwards",
        "tatva-skeleton-shimmer": "tatva-skeleton-shimmer 2s infinite linear",
        "tatva-skeleton-pulse": "tatva-skeleton-pulse 2s infinite ease-in-out",
        "tatva-accordion-down": "tatva-accordion-down 200ms ease-out",
        "tatva-accordion-up": "tatva-accordion-up 200ms ease-out",
        "tatva-linear-loader": "tatva-linear-loader 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
