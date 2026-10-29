import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  ObservabilityProvider,
  useObservability,
} from "./ObservabilityProvider";
import { ObservabilityDashboard } from "@/components/ObservabilityDashboard";

const webVitalsMocks = vi.hoisted(() => ({
  onCLS: vi.fn<
    (
      callback: (metric: {
        name: string;
        value: number;
        rating: string;
      }) => void,
    ) => void
  >(),
  onINP: vi.fn<
    (
      callback: (metric: {
        name: string;
        value: number;
        rating: string;
      }) => void,
    ) => void
  >(),
  onLCP: vi.fn<
    (
      callback: (metric: {
        name: string;
        value: number;
        rating: string;
      }) => void,
    ) => void
  >(),
}));

vi.mock("web-vitals", () => webVitalsMocks);

function EventControls() {
  const { recordEvent } = useObservability();

  return (
    <button
      type="button"
      onClick={() =>
        recordEvent({
          category: "business",
          name: "feed-first-post-visible",
          value: 42,
          unit: "ms",
        })
      }
    >
      Registrar evento
    </button>
  );
}

describe("ObservabilityProvider", () => {
  it("captures errors, business events and Web Vitals locally", async () => {
    render(
      <ObservabilityProvider>
        <EventControls />
        <ObservabilityDashboard />
      </ObservabilityProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar evento" }));
    act(() => {
      window.dispatchEvent(new ErrorEvent("error"));
    });
    await waitFor(() => expect(webVitalsMocks.onLCP).toHaveBeenCalledOnce());
    const reportLcp = webVitalsMocks.onLCP.mock.calls[0]?.[0];
    act(() => {
      reportLcp?.({ name: "LCP", value: 1234, rating: "good" });
    });

    expect(await screen.findByText("feed-first-post-visible")).toBeInTheDocument();
    expect(screen.getByText("uncaught-error")).toBeInTheDocument();
    expect(screen.getByText("42.00 ms")).toBeInTheDocument();
    expect(screen.getByText("1234.00 ms (good)")).toBeInTheDocument();
  });

  it("clears the in-memory event list", () => {
    render(
      <ObservabilityProvider>
        <EventControls />
        <ObservabilityDashboard />
      </ObservabilityProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Registrar evento" }));
    fireEvent.click(screen.getByRole("button", { name: "Limpar" }));

    expect(
      screen.getByText("Nenhum evento capturado nesta sessão."),
    ).toBeInTheDocument();
  });
});
