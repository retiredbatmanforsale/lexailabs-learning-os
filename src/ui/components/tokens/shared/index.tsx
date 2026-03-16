import * as React from "react";
import { getCSSVariable, getCSSVariableAsHex } from "../../../lib/utils";
import tailwindPreset from "../../../tailwind-preset";

// ============================================================================
// Configuration
// ============================================================================

export const TOKEN_PREFIX = "tatva";

// ============================================================================
// Tailwind Safelist - explicit class names for JIT detection (do not remove)
// ============================================================================

// prettier-ignore
export const _tw_safelist = [
  // Accent colors
  "bg-tatva-pink-background", "bg-tatva-pink-content",
  "bg-tatva-green-background", "bg-tatva-green-content",
  "bg-tatva-orange-background", "bg-tatva-orange-content",
  "bg-tatva-red-background", "bg-tatva-red-content",
  "bg-tatva-yellow-background", "bg-tatva-yellow-content",
  "bg-tatva-indigo-background", "bg-tatva-indigo-content",
  // Semantic colors
  "bg-tatva-positive-background", "bg-tatva-positive-content",
  "bg-tatva-warning-background", "bg-tatva-warning-content",
  "bg-tatva-danger-background", "bg-tatva-danger-background-hover", "bg-tatva-danger-content",
  // Background colors
  "bg-tatva-background-primary", "bg-tatva-background-primary-hover",
  "bg-tatva-background-secondary", "bg-tatva-background-secondary-hover",
  "bg-tatva-background-tertiary", "bg-tatva-background-tertiary-hover",
  "bg-tatva-background-black", "bg-tatva-background-black-hover",
  // Content colors
  "bg-tatva-content-primary", "bg-tatva-content-secondary", "bg-tatva-content-tertiary",
  "bg-tatva-content-quaternary", "bg-tatva-content-inverse",
  // Surface & Border colors
  "bg-tatva-surface-primary", "bg-tatva-surface-secondary",
  "bg-tatva-border-primary", "bg-tatva-border-secondary", "bg-tatva-border-tertiary",
  // Brand colors
  "bg-tatva-brand-primary", "bg-tatva-brand-primary-hover",
  "bg-tatva-brand-secondary", "bg-tatva-brand-secondary-hover",
  "bg-tatva-brand-content-primary", "bg-tatva-brand-content-secondary",
  // Border radius classes for preview
  "rounded-tatva-xs", "rounded-tatva-sm", "rounded-tatva-md", "rounded-tatva-lg", "rounded-tatva-xl", "rounded-tatva-full",
  // Animation classes for preview
  "animate-tatva-spin", "animate-tatva-fade-in", "animate-tatva-fade-out",
  "animate-tatva-slide-in-from-right", "animate-tatva-slide-out-to-right",
  "animate-tatva-slide-in-from-left", "animate-tatva-slide-out-to-left",
  "animate-tatva-zoom-in", "animate-tatva-zoom-out",
  "animate-tatva-skeleton-shimmer", "animate-tatva-skeleton-pulse",
  // Gradient classes for skeleton shimmer demo
  "from-tatva-background-tertiary", "via-tatva-background-secondary", "to-tatva-background-tertiary",
];

// ============================================================================
// Utility Functions
// ============================================================================

/** Extract CSS variable name from rgb(...) expression */
export const extractCssVar = (rgbExpr: string): string => {
  const match = rgbExpr.match(/var\((--[^)]+)\)/);
  return match ? match[1] : "";
};

/** Get hex value from CSS variable name */
export const getHexFromVar = (cssVar: string): string =>
  getCSSVariableAsHex(cssVar);

/** Get CSS variable value as number */
export const getCSSVarAsNumber = (varName: string): number =>
  parseInt(getCSSVariable(varName), 10) || 0;

/** Extract multiplier from calc expression like "calc(var(...) * 10)" */
export const extractMultiplier = (calcExpr: string): number => {
  const match = calcExpr.match(/\*\s*([\d.]+)/);
  return match ? parseFloat(match[1]) : 1;
};

/** Extract addition from calc expression like "calc(var(...) + 6px)" */
export const extractAddition = (calcExpr: string): number => {
  const match = calcExpr.match(/\+\s*(\d+)px/);
  return match ? parseInt(match[1], 10) : 0;
};

/** Capitalize first letter */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ============================================================================
// Preset Data
// ============================================================================

const presetExtend = tailwindPreset.theme?.extend || {};

export const presetColors = ((presetExtend.colors as Record<string, unknown>)?.[
  TOKEN_PREFIX
] || {}) as Record<string, unknown>;

export const presetSpacing = (presetExtend.spacing || {}) as Record<
  string,
  string
>;

export const presetBorderRadius = (presetExtend.borderRadius || {}) as Record<
  string,
  string
>;

export const presetFontSize = (presetExtend.fontSize || {}) as Record<
  string,
  string
>;

export const presetAnimation = (presetExtend.animation || {}) as Record<
  string,
  string
>;

export const presetBoxShadow = (presetExtend.boxShadow || {}) as Record<
  string,
  string
>;

// ============================================================================
// Types
// ============================================================================

export type ColorToken = {
  name: string;
  token: string;
  cssVar: string;
  hover?: { token: string; cssVar: string };
};

export type SemanticToken = {
  name: string;
  bg: {
    token: string;
    cssVar: string;
    hover?: { token: string; cssVar: string };
  };
  content: { token: string; cssVar: string };
};

export type AccentToken = {
  name: string;
  bg: { token: string; cssVar: string };
  content: { token: string; cssVar: string };
};

// ============================================================================
// Color Parsing Functions
// ============================================================================

/** Parse a color group from preset (e.g., background) */
export const parseColorGroup = (
  groupKey: string,
  group: Record<string, unknown>,
  prefix: string
): ColorToken[] => {
  const tokens: ColorToken[] = [];

  Object.entries(group).forEach(([key, value]) => {
    if (key === "DEFAULT" || key === "default" || /^\d+$/.test(key)) return;

    const name = capitalize(key);
    const token = `${TOKEN_PREFIX}-${prefix}-${key}`;

    if (typeof value === "string") {
      tokens.push({ name, token, cssVar: extractCssVar(value) });
    } else if (typeof value === "object" && value !== null) {
      const nested = value as Record<string, string>;
      if (nested.DEFAULT) {
        const hasHover = !!nested.hover;
        tokens.push({
          name,
          token,
          cssVar: extractCssVar(nested.DEFAULT),
          ...(hasHover && {
            hover: {
              token: `${token}-hover`,
              cssVar: extractCssVar(nested.hover),
            },
          }),
        });
      }
    }
  });

  return tokens;
};

/** Parse semantic colors (positive, warning, danger) */
export const parseSemanticColors = (): SemanticToken[] => {
  const semanticKeys = ["positive", "warning", "danger"];
  return semanticKeys
    .filter((key) => presetColors[key])
    .map((key) => {
      const group = presetColors[key] as Record<string, unknown>;
      const name = capitalize(key);
      const bgValue = group.background;
      const contentValue = group.content;

      const hasBgHover =
        typeof bgValue === "object" &&
        (bgValue as Record<string, string>).hover;

      return {
        name,
        bg: {
          token: `${TOKEN_PREFIX}-${key}-background`,
          cssVar: extractCssVar(
            typeof bgValue === "object"
              ? (bgValue as Record<string, string>).DEFAULT
              : (bgValue as string)
          ),
          ...(hasBgHover && {
            hover: {
              token: `${TOKEN_PREFIX}-${key}-background-hover`,
              cssVar: extractCssVar((bgValue as Record<string, string>).hover),
            },
          }),
        },
        content: {
          token: `${TOKEN_PREFIX}-${key}-content`,
          cssVar: extractCssVar(contentValue as string),
        },
      };
    });
};

/** Parse accent colors */
export const parseAccentColors = (): AccentToken[] => {
  const excludedKeys = [
    "background",
    "content",
    "surface",
    "border",
    "brand",
    "positive",
    "warning",
    "danger",
    "transparent",
    "current",
  ];

  const accentKeys = Object.keys(presetColors).filter((key) => {
    if (excludedKeys.includes(key)) return false;
    const value = presetColors[key];
    if (typeof value !== "object" || value === null) return false;
    const group = value as Record<string, unknown>;
    return group.background !== undefined && group.content !== undefined;
  });

  return accentKeys.map((key) => {
    const group = presetColors[key] as Record<string, string>;
    const name = capitalize(key);
    return {
      name,
      bg: {
        token: `${TOKEN_PREFIX}-${key}-background`,
        cssVar: extractCssVar(group.background),
      },
      content: {
        token: `${TOKEN_PREFIX}-${key}-content`,
        cssVar: extractCssVar(group.content),
      },
    };
  });
};

/** Parse brand colors */
export const parseBrandColors = (): ColorToken[] => {
  const brand = presetColors["brand"] as Record<string, unknown>;
  if (!brand) return [];

  const tokens: ColorToken[] = [];

  ["primary", "secondary"].forEach((key) => {
    const value = brand[key];
    if (typeof value === "object" && value !== null) {
      const nested = value as Record<string, string>;
      tokens.push({
        name: capitalize(key),
        token: `${TOKEN_PREFIX}-brand-${key}`,
        cssVar: extractCssVar(nested.DEFAULT),
        ...(nested.hover && {
          hover: {
            token: `${TOKEN_PREFIX}-brand-${key}-hover`,
            cssVar: extractCssVar(nested.hover),
          },
        }),
      });
    }
  });

  const content = brand.content as Record<string, string> | undefined;
  if (content) {
    Object.entries(content).forEach(([key, value]) => {
      tokens.push({
        name: `Content ${capitalize(key)}`,
        token: `${TOKEN_PREFIX}-brand-content-${key}`,
        cssVar: extractCssVar(value),
      });
    });
  }

  return tokens;
};

// Auto-discover all color categories
export const backgroundColors = parseColorGroup(
  "background",
  presetColors["background"] as Record<string, unknown>,
  "background"
);
export const contentColors = parseColorGroup(
  "content",
  presetColors["content"] as Record<string, unknown>,
  "content"
);
export const surfaceColors = parseColorGroup(
  "surface",
  presetColors["surface"] as Record<string, unknown>,
  "surface"
);
export const borderColors = parseColorGroup(
  "border",
  presetColors["border"] as Record<string, unknown>,
  "border"
);
export const brandColors = parseBrandColors();
export const semanticColors = parseSemanticColors();
export const accentColors = parseAccentColors();

/** Hook to get color data with live hex values */
export const useColorTokens = () => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    forceUpdate();
  }, []);

  const withHex = (tokens: ColorToken[]) =>
    tokens.map((t) => ({
      ...t,
      hex: getHexFromVar(t.cssVar),
      hover: t.hover
        ? { ...t.hover, hex: getHexFromVar(t.hover.cssVar) }
        : undefined,
    }));

  const withSemanticHex = (tokens: SemanticToken[]) =>
    tokens.map((t) => ({
      ...t,
      bg: {
        ...t.bg,
        hex: getHexFromVar(t.bg.cssVar),
        hover: t.bg.hover
          ? { ...t.bg.hover, hex: getHexFromVar(t.bg.hover.cssVar) }
          : undefined,
      },
      content: { ...t.content, hex: getHexFromVar(t.content.cssVar) },
    }));

  const withAccentHex = (tokens: AccentToken[]) =>
    tokens.map((t) => ({
      ...t,
      bgHex: getHexFromVar(t.bg.cssVar),
      contentHex: getHexFromVar(t.content.cssVar),
      bgClass: `bg-${t.bg.token}`,
      contentClass: `bg-${t.content.token}`,
    }));

  return {
    backgroundColors: withHex(backgroundColors),
    contentColors: withHex(contentColors),
    surfaceColors: withHex(surfaceColors),
    borderColors: withHex(borderColors),
    brandColors: withHex(brandColors),
    semanticColors: withSemanticHex(semanticColors),
    accentColors: withAccentHex(accentColors),
  };
};

// ============================================================================
// Other Token Hooks & Generators
// ============================================================================

/** Hook to get base values from CSS variables at runtime */
export const useBaseValues = () => {
  const [bases, setBases] = React.useState({ spacing: 2, radius: 4, font: 12 });

  React.useEffect(() => {
    setBases({
      spacing: getCSSVarAsNumber(`--${TOKEN_PREFIX}-spacing-base`) || 2,
      radius: getCSSVarAsNumber(`--${TOKEN_PREFIX}-radius-base`) || 4,
      font: getCSSVarAsNumber(`--${TOKEN_PREFIX}-font-size-base`) || 12,
    });
  }, []);

  return bases;
};

/** Generate spacing tokens from preset */
export const getSpacing = (base: number) => {
  const prefix = `${TOKEN_PREFIX}-`;
  return Object.entries(presetSpacing)
    .filter(
      ([key]) =>
        key.startsWith(prefix) && /^[\d.]+$/.test(key.replace(prefix, ""))
    )
    .map(([key, value]) => {
      const token = key.replace(prefix, "");
      return {
        token,
        fullToken: key,
        value: `${extractMultiplier(value) * base}px`,
      };
    })
    .sort((a, b) => parseFloat(a.token) - parseFloat(b.token));
};

/** Generate border radius tokens from preset */
export const getBorderRadius = (base: number) => {
  const prefix = `${TOKEN_PREFIX}-`;
  const order = ["none", "xs", "sm", "md", "lg", "xl", "full"];

  return Object.entries(presetBorderRadius)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => {
      const variant = key.replace(prefix, "");
      return {
        token: `rounded-${key}`,
        variant,
        value:
          variant === "full" || variant === "none"
            ? value.replace(
                /calc\([^)]+\)/,
                variant === "full" ? "999px" : "0px"
              )
            : `${extractMultiplier(value) * base}px`,
      };
    })
    .sort((a, b) => order.indexOf(a.variant) - order.indexOf(b.variant));
};

/** Generate font size map from preset */
export const getFontSizeMap = (base: number) => {
  const prefix = `${TOKEN_PREFIX}-`;
  return Object.entries(presetFontSize)
    .filter(([key]) => key.startsWith(prefix))
    .reduce(
      (acc, [key, value]) => {
        const variant = key.replace(prefix, "");
        if (value.includes("calc")) {
          acc[variant] = `${base + extractAddition(value)}px`;
        } else {
          acc[variant] = `${base}px`;
        }
        return acc;
      },
      {} as Record<string, string>
    );
};

// Typography metadata
export const getTypographyMeta = (variant: string) => {
  const isDisplay = variant.startsWith("display");
  const isHeading = variant.startsWith("heading");
  const isBody = variant.startsWith("body");

  const font = isDisplay || isHeading ? "Season" : "Matter";
  const weight =
    (isHeading && variant.includes("lg")) || variant === "heading-sm"
      ? "Medium"
      : "Regular";
  const lineHeight = isBody
    ? variant.includes("sm") || variant.includes("xs")
      ? "150%"
      : "145%"
    : "120%";

  return { font, weight, lineHeight };
};

// Sort order for typography variants
const typographyOrder = ["display", "heading", "body", "label"];
const sizeOrder = ["lg", "md", "sm", "xs"];

const sortTypography = (a: string, b: string) => {
  const [aType] = a.split("-");
  const [bType] = b.split("-");
  const typeCompare =
    typographyOrder.indexOf(aType) - typographyOrder.indexOf(bType);
  if (typeCompare !== 0) return typeCompare;
  const aSize = a.split("-")[1];
  const bSize = b.split("-")[1];
  return sizeOrder.indexOf(aSize) - sizeOrder.indexOf(bSize);
};

/** Generate typography tokens from preset */
export const getTypography = (fontSizeMap: Record<string, string>) =>
  Object.keys(fontSizeMap)
    .map((variant) => ({
      variant,
      fullToken: `${TOKEN_PREFIX}-${variant}`,
      size: fontSizeMap[variant],
      ...getTypographyMeta(variant),
    }))
    .sort((a, b) => sortTypography(a.variant, b.variant));

/** Get shadows from preset */
export const getShadows = () => {
  const prefix = `${TOKEN_PREFIX}-`;
  return Object.entries(presetBoxShadow)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key]) => {
      const name = key.replace(prefix, "").toUpperCase();
      return {
        name: `Level ${name}`,
        token: `shadow-${key}`,
        description:
          name === "L1"
            ? "Subtle shadow for cards and elevated elements"
            : "More prominent shadow for dropdowns and modals",
      };
    });
};

/** Get animations from preset */
export const getAnimations = () => {
  const prefix = `${TOKEN_PREFIX}-`;
  return Object.entries(presetAnimation)
    .filter(
      ([key]) =>
        key.startsWith(prefix) &&
        !key.includes("skeleton") &&
        !key.includes("accordion") &&
        !key.includes("dialog") &&
        !key.includes("linear")
    )
    .map(([key, value]) => {
      const name = key
        .replace(prefix, "")
        .split("-")
        .map((w) => capitalize(w))
        .join(" ");
      const duration = value.match(/(\d+)ms/)?.[1] || "200";
      return {
        name,
        token: `animate-${key}`,
        duration: `${duration}ms`,
        description: `${key.replace(prefix, "").replace(/-/g, " ")} animation`,
      };
    });
};

export const getLoopingAnimations = () => {
  const prefix = `${TOKEN_PREFIX}-`;
  return Object.entries(presetAnimation)
    .filter(([key]) => key.startsWith(prefix) && key.includes("skeleton"))
    .map(([key, value]) => {
      const name = key
        .replace(prefix, "")
        .split("-")
        .map((w) => capitalize(w))
        .join(" ");
      const duration = value.match(/(\d+)s/)?.[1] || "2";
      return {
        name,
        token: `animate-${key}`,
        duration: `${duration}s loop`,
        description: key.includes("shimmer")
          ? "Shimmer effect for loading skeletons"
          : "Pulse opacity effect for loading states",
        demoClass: key.includes("shimmer")
          ? `animate-${key} bg-gradient-to-r from-${TOKEN_PREFIX}-background-tertiary via-${TOKEN_PREFIX}-background-secondary to-${TOKEN_PREFIX}-background-tertiary bg-[length:2000px_100%]`
          : `animate-${key} bg-${TOKEN_PREFIX}-background-tertiary`,
      };
    });
};

// ============================================================================
// UI Components
// ============================================================================

export const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-season text-tatva-display-sm font-medium tracking-tight text-tatva-content-primary">
    {children}
  </h1>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-tatva-6 font-season text-tatva-heading-lg text-tatva-content-primary">
    {children}
  </h2>
);

export const SubsectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <h3 className="mb-tatva-4 font-matter text-tatva-label-sm font-medium uppercase tracking-wider text-tatva-content-secondary">
    {children}
  </h3>
);

export const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-tatva-body-xs text-tatva-content-tertiary">
    {children}
  </p>
);

export const SubLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-tatva-label-xs font-mono text-tatva-content-quaternary">
    {children}
  </p>
);

// Generic color swatch
export const ColorSwatch = ({
  name,
  token,
  hex,
  hover,
}: {
  name: string;
  token: string;
  hex: string;
  hover?: { token: string; hex: string };
}) => (
  <div className="flex flex-col">
    <div className="flex gap-tatva-2">
      <div className="flex-1">
        <div
          className="h-tatva-30 rounded-tatva-sm border border-tatva-border-secondary"
          style={{ backgroundColor: hex }}
        />
        <SubLabel>default</SubLabel>
      </div>
      {hover && (
        <div className="flex-1">
          <div
            className="h-tatva-30 rounded-tatva-sm border border-tatva-border-secondary"
            style={{ backgroundColor: hover.hex }}
          />
          <SubLabel>hover</SubLabel>
        </div>
      )}
    </div>
    <div className="mt-tatva-3 space-y-tatva-0.5">
      <p className="font-matter text-tatva-body-md font-medium text-tatva-content-primary">
        {name}
      </p>
      <Label>{token}</Label>
      <SubLabel>{hex}</SubLabel>
      {hover && (
        <>
          <Label>{hover.token}</Label>
          <SubLabel>{hover.hex}</SubLabel>
        </>
      )}
    </div>
  </div>
);

// Type for color grid
export type ColorGridItem = {
  name: string;
  token: string;
  hex: string;
  hover?: { token: string; hex: string };
};

// Grid column classes
const gridColsClass: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

// Generic color grid renderer
export const ColorGrid = ({
  colors,
  cols,
}: {
  colors: ColorGridItem[];
  cols: number;
}) => (
  <div className={`grid ${gridColsClass[cols] || "grid-cols-4"} gap-tatva-6`}>
    {colors.map((c) => (
      <ColorSwatch
        key={c.token}
        name={c.name}
        token={c.token}
        hex={c.hex}
        hover={c.hover}
      />
    ))}
  </div>
);

// Generic token table
export const TokenTable = <T extends Record<string, unknown>>({
  headers,
  data,
  renderRow,
}: {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border-b border-tatva-border-primary pb-tatva-3 text-left font-matter text-tatva-body-xs font-medium uppercase tracking-wider text-tatva-content-secondary"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  </div>
);

export const Cell = ({
  children,
  mono,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) => (
  <td
    className={`min-w-tatva-80 border-b border-tatva-border-primary py-tatva-4 text-tatva-body-md ${
      mono
        ? "font-mono text-tatva-content-secondary"
        : "font-matter text-tatva-content-primary"
    }`}
  >
    {children}
  </td>
);

// Page wrapper
export const Page = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-tatva-background-primary font-matter">
    <div className="mx-auto max-w-6xl px-tatva-8 py-tatva-16">
      <div className="mb-tatva-16">
        <PageTitle>{title}</PageTitle>
        <p className="mt-tatva-3 max-w-2xl text-tatva-body-lg text-tatva-content-secondary">
          {desc}
        </p>
      </div>
      {children}
    </div>
  </div>
);
