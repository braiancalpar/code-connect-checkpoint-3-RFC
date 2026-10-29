"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createObservabilityEventId,
  subscribeToObservability,
} from "./runtime";
import type {
  ObservabilityEvent,
  ObservabilityEventDraft,
} from "./types";

interface ObservabilityContextValue {
  events: ObservabilityEvent[];
  recordEvent: (event: ObservabilityEventDraft) => void;
  clearEvents: () => void;
}

const ObservabilityContext =
  createContext<ObservabilityContextValue | null>(null);

const MAX_EVENTS = 100;

export function ObservabilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<ObservabilityEvent[]>([]);

  const recordEvent = useCallback((event: ObservabilityEventDraft) => {
    const recordedEvent: ObservabilityEvent = {
      ...event,
      id: createObservabilityEventId(),
      timestamp: new Date().toISOString(),
    };
    setEvents((current) => [...current, recordedEvent].slice(-MAX_EVENTS));
  }, []);

  const clearEvents = useCallback(() => setEvents([]), []);

  useEffect(
    () => subscribeToObservability(recordEvent),
    [recordEvent],
  );

  const value = useMemo(
    () => ({ events, recordEvent, clearEvents }),
    [events, recordEvent, clearEvents],
  );

  return (
    <ObservabilityContext.Provider value={value}>
      {children}
    </ObservabilityContext.Provider>
  );
}

export function useObservability() {
  const context = useContext(ObservabilityContext);
  if (!context) {
    throw new Error(
      "useObservability deve ser utilizado dentro de ObservabilityProvider.",
    );
  }
  return context;
}
