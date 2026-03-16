export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Reads a CSS custom property value from :root
 * @param propertyName - CSS property name (e.g., '--figma-background-primary')
 * @returns The property value as a string
 */
export const getCSSVariable = (propertyName: string): string => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
};

/**
 * Converts space-separated RGB values to hex color
 * @param rgb - Space-separated RGB string (e.g., "255 255 255")
 * @returns Hex color string (e.g., "#FFFFFF")
 */
export const rgbToHex = (rgb: string): string => {
  const parts = rgb.split(/[,\s]+/).map((p) => parseInt(p.trim(), 10));
  if (parts.length < 3 || parts.some(isNaN)) return rgb;
  return (
    "#" +
    parts
      .slice(0, 3)
      .map((n) => n.toString(16).padStart(2, "0").toUpperCase())
      .join("")
  );
};

/**
 * Gets a CSS variable and converts it to hex
 * @param propertyName - CSS property name (e.g., '--figma-background-primary')
 * @returns Hex color string
 */
export const getCSSVariableAsHex = (propertyName: string): string => {
  const value = getCSSVariable(propertyName);
  return rgbToHex(value);
};
