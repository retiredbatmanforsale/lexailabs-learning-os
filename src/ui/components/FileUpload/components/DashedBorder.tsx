"use client";

import * as React from "react";
import type { DashedBorderProps } from "../types";

export const DashedBorder: React.FC<DashedBorderProps> = ({
  isDragActive,
  hasFile,
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateSize = () => {
      if (svgRef.current?.parentElement) {
        const { width, height } =
          svgRef.current.parentElement.getBoundingClientRect();
        setSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const borderColor = hasFile
    ? "#b3b3b3" // --figma-border-tertiary
    : isDragActive
      ? "#3333cc" // --figma-brand-content-primary
      : "#e6e6e6"; // --figma-border-secondary

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 size-full"
    >
      {size.width > 0 && size.height > 0 && (
        <rect
          x="0.5"
          y="0.5"
          width={size.width - 1}
          height={size.height - 1}
          rx="28"
          ry="28"
          fill="none"
          style={{
            stroke: borderColor,
            strokeWidth: 1,
            strokeDasharray: "10 6",
            strokeLinecap: "round",
          }}
        />
      )}
    </svg>
  );
};
