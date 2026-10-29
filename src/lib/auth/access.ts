export const PROTECTED_PATHS = ["/publicar", "/perfil", "/rascunhos"] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
