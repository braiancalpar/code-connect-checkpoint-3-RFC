import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { FeatureFlagsProvider } from "@/lib/feature-flags/FeatureFlagsProvider";
import { ObservabilityProvider } from "@/lib/observability/ObservabilityProvider";

export const metadata: Metadata = {
  title: "CodeConnect",
  description:
    "Comunidade para compartilhar projetos e conhecimento em programação.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <ObservabilityProvider>
          <FeatureFlagsProvider>
            <AuthProvider>{children}</AuthProvider>
          </FeatureFlagsProvider>
        </ObservabilityProvider>
      </body>
    </html>
  );
}
