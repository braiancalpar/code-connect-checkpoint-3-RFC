import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FeedFirstPostMetric } from "./index";
import { ObservabilityProvider } from "@/lib/observability/ObservabilityProvider";
import { ObservabilityDashboard } from "@/components/ObservabilityDashboard";

vi.mock("web-vitals", () => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("FeedFirstPostMetric", () => {
  it("records the navigation-to-first-post event when the first card is visible", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <ObservabilityProvider>
        <article data-feed-first-post="true">Primeiro post</article>
        <FeedFirstPostMetric />
        <ObservabilityDashboard />
      </ObservabilityProvider>,
    );

    expect(
      await screen.findByText("feed-first-post-visible"),
    ).toBeInTheDocument();
    expect(screen.getByText(/\d+\.\d+ ms/)).toBeInTheDocument();
  });
});
