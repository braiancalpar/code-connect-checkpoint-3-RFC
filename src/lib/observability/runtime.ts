import type { ObservabilityEventDraft } from "./types";

type EventSubscriber = (event: ObservabilityEventDraft) => void;

const subscribers = new Set<EventSubscriber>();
let runtimeObserversInitialized = false;
let nextEventId = 1;
let navigationStartedAt = 0;

function publish(event: ObservabilityEventDraft) {
  for (const subscriber of subscribers) subscriber(event);
}

function onDocumentClick(event: MouseEvent) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    !(event.target instanceof Element)
  ) {
    return;
  }

  const anchor = event.target.closest("a");
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return;
  }

  const destination = new URL(anchor.href, window.location.href);
  if (
    destination.origin === window.location.origin &&
    destination.pathname !== window.location.pathname
  ) {
    navigationStartedAt = performance.now();
  }
}

function initializeRuntimeObservers() {
  if (runtimeObserversInitialized || typeof window === "undefined") return;
  runtimeObserversInitialized = true;

  window.addEventListener("error", () => {
    publish({ category: "error", name: "uncaught-error" });
  });
  window.addEventListener("unhandledrejection", () => {
    publish({ category: "error", name: "unhandled-rejection" });
  });
  window.addEventListener("click", onDocumentClick, true);

  void import("web-vitals")
    .then(({ onCLS, onINP, onLCP }) => {
      const recordWebVital = (metric: {
        name: string;
        value: number;
        rating: string;
      }) => {
        publish({
          category: "web-vital",
          name: metric.name,
          value: metric.value,
          unit: metric.name === "CLS" ? "" : "ms",
          rating: metric.rating,
        });
      };

      onCLS(recordWebVital, { reportAllChanges: true });
      onINP(recordWebVital, { reportAllChanges: true });
      onLCP(recordWebVital, { reportAllChanges: true });
    })
    .catch(() => {
      publish({
        category: "error",
        name: "web-vitals-initialization-failed",
      });
    });
}

export function subscribeToObservability(subscriber: EventSubscriber) {
  subscribers.add(subscriber);
  initializeRuntimeObservers();
  return () => {
    subscribers.delete(subscriber);
  };
}

export function createObservabilityEventId() {
  return nextEventId++;
}

export function getNavigationDuration() {
  return Math.max(0, Math.round(performance.now() - navigationStartedAt));
}
