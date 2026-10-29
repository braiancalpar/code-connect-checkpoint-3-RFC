import { LoginForm } from "@/components/LoginForm";
import { getSafeReturnTo } from "@/lib/auth/redirect";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  const requestedDestination = Array.isArray(next) ? next[0] : next;

  return <LoginForm nextPath={getSafeReturnTo(requestedDestination)} />;
}
