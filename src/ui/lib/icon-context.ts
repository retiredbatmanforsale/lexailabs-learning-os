"use client";

// ============================================================================
// Icon Context - For extending icons in consumer projects
// ============================================================================
// This is in a separate file to avoid bundling issues with the heavy
// HugeIcons imports in icons.ts

import * as React from "react";

/**
 * HugeIcon type - matches the icon format from @hugeicons/core-free-icons
 * Icons must be imported from @hugeicons/core-free-icons, NOT @hugeicons/react
 */
export type HugeIconType = readonly [
  tag: string,
  attrs: Record<string, string>,
  children?: HugeIconType[],
];

/**
 * Extended icon components mapping.
 * Keys are custom icon names, values are HugeIcon components from @hugeicons/core-free-icons.
 *
 * @example
 * ```tsx
 * import { ArrowLeftRightIcon, RocketIcon } from "@hugeicons/core-free-icons";
 *
 * const icons: ExtendedIconComponents = {
 *   swap: ArrowLeftRightIcon,
 *   rocket: RocketIcon,
 * };
 * ```
 */
export type ExtendedIconComponents = Record<string, HugeIconType>;

/** Context value type */
interface IconContextValue {
  extendedIcons: ExtendedIconComponents;
}

/** Context for extended icons */
const IconContext = React.createContext<IconContextValue | null>(null);

/** Hook to access extended icons from context */
export function useIconContext(): ExtendedIconComponents | null {
  const context = React.useContext(IconContext);
  return context?.extendedIcons ?? null;
}

export interface IconProviderProps {
  /**
   * Extended icon mappings. Keys are icon names, values are HugeIcon components.
   *
   * @example
   * ```tsx
   * import { RocketIcon } from "@hugeicons/core-free-icons";
   *
   * <IconProvider extend={{ rocket: RocketIcon }}>
   *   <App />
   * </IconProvider>
   * ```
   */
  extend: ExtendedIconComponents;
  children: React.ReactNode;
}

/**
 * Provider for extending the icon registry in consumer projects.
 *
 * Wrap your app (or a subtree) with this provider to add custom icons
 * that can be used with Icon component and all components that accept icon prop
 * (Button, Input, Chip, etc.).
 *
 * @example
 * ```tsx
 * import { IconProvider } from "@sarvam/tatva";
 * import { RocketIcon, SpaceshipIcon } from "@hugeicons/core-free-icons";
 *
 * function App() {
 *   return (
 *     <IconProvider extend={{ rocket: RocketIcon, spaceship: SpaceshipIcon }}>
 *       <Button icon="rocket">Launch</Button>
 *       <Icon name="spaceship" size="lg" />
 *     </IconProvider>
 *   );
 * }
 * ```
 *
 * Note: Extended icons can override built-in icons if they use the same name.
 */
export function IconProvider({ extend, children }: IconProviderProps) {
  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo<IconContextValue>(
    () => ({ extendedIcons: extend }),
    [extend]
  );

  return React.createElement(IconContext.Provider, { value }, children);
}
