import { cva } from "class-variance-authority";

export const fileUploadVariants = cva(
  "relative flex cursor-pointer gap-tatva-8 rounded-tatva-xl transition-colors hover:bg-tatva-background-primary-hover",
  {
    variants: {
      layout: {
        horizontal: "flex-row items-center px-tatva-12 py-tatva-16",
        vertical: "flex-col items-center px-tatva-12 py-tatva-31",
      },
      isDragActive: {
        true: "bg-tatva-brand-secondary/10",
        false: "",
      },
      hasFile: {
        true: "",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      layout: "horizontal",
      isDragActive: false,
      hasFile: false,
      disabled: false,
    },
  }
);
