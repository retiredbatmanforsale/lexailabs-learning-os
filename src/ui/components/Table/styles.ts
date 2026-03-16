import { cva } from "class-variance-authority";

export const tableHeaderCellVariants = cva(
  "overflow-hidden border-b border-tatva-border-secondary p-tatva-8 text-left font-normal"
);

export const tableCellVariants = cva("border-b border-tatva-border-primary", {
  variants: {
    variant: {
      compact: "p-tatva-8",
      relaxed: "px-tatva-8",
    },
  },
  defaultVariants: {
    variant: "compact",
  },
});

export const tableRowVariants = cva("transition-colors", {
  variants: {
    clickable: {
      true: "cursor-pointer hover:bg-tatva-surface-secondary",
      false: "",
    },
  },
  defaultVariants: {
    clickable: false,
  },
});
