"use client";

import { useEffect, useRef } from "react";
import { getNavigationDuration } from "@/lib/observability/runtime";
import { useObservability } from "@/lib/observability/ObservabilityProvider";

export function FeedFirstPostMetric() {
  const { recordEvent } = useObservability();
  const recorded = useRef(false);

  useEffect(() => {
    const firstPost = document.querySelector("[data-feed-first-post]");
    if (!firstPost) return;

    const recordVisiblePost = () => {
      if (recorded.current) return;
      recorded.current = true;
      recordEvent({
        category: "business",
        name: "feed-first-post-visible",
        value: getNavigationDuration(),
        unit: "ms",
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      recordVisiblePost();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        recordVisiblePost();
        observer.disconnect();
      }
    });
    observer.observe(firstPost);
    return () => observer.disconnect();
  }, [recordEvent]);

  return null;
}
