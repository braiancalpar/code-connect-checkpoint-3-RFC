import React from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/image", () => ({
  default: ({
    priority,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    src: string | { src: string };
  }) => {
    void priority;
    return React.createElement("img", {
      ...props,
      src: typeof src === "string" ? src : src.src,
    });
  },
}));
