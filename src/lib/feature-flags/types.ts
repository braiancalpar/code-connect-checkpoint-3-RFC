export interface FeatureFlags {
  showPostHighlight: boolean;
}

export type FeatureFlagName = keyof FeatureFlags;

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  showPostHighlight: false,
};

export const FEATURE_FLAGS_STORAGE_KEY = "codeconnect:feature-flags:v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseFeatureFlags(value: string | null): FeatureFlags {
  if (value === null) return { ...DEFAULT_FEATURE_FLAGS };

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("A configuração de flags não contém JSON válido.");
  }

  if (
    !isRecord(parsed) ||
    Object.keys(parsed).some((key) => key !== "showPostHighlight") ||
    typeof parsed.showPostHighlight !== "boolean"
  ) {
    throw new Error("A configuração de flags tem um formato inválido.");
  }

  return { showPostHighlight: parsed.showPostHighlight };
}
