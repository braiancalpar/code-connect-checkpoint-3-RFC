export type ObservabilityCategory = "error" | "web-vital" | "business";

export interface ObservabilityEvent {
  id: number;
  category: ObservabilityCategory;
  name: string;
  timestamp: string;
  value?: number;
  unit?: string;
  rating?: string;
}

export type ObservabilityEventDraft = Omit<
  ObservabilityEvent,
  "id" | "timestamp"
>;
