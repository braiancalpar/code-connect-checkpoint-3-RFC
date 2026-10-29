const INTERNAL_ORIGIN = "http://codeconnect.local";

export function getSafeReturnTo(
  value: string | null | undefined,
  fallback = "/",
): string {
  if (!value?.startsWith("/")) return fallback;

  try {
    const destination = new URL(value, INTERNAL_ORIGIN);
    if (destination.origin !== INTERNAL_ORIGIN) return fallback;
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return fallback;
  }
}
