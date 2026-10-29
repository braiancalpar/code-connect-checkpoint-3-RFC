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
  DEFAULT_FEATURE_FLAGS,
  FEATURE_FLAGS_STORAGE_KEY,
  parseFeatureFlags,
  type FeatureFlagName,
  type FeatureFlags,
} from "./types";

interface FeatureFlagsContextValue {
  flags: FeatureFlags;
  isReady: boolean;
  storageError: string | null;
  setFlag: (name: FeatureFlagName, enabled: boolean) => void;
  resetFlags: () => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(
  null,
);

export function FeatureFlagsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flags, setFlags] = useState<FeatureFlags>({
    ...DEFAULT_FEATURE_FLAGS,
  });
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setFlags(
        parseFeatureFlags(
          window.localStorage.getItem(FEATURE_FLAGS_STORAGE_KEY),
        ),
      );
    } catch {
      setStorageError(
        "Não foi possível ler a configuração local; as flags opcionais foram desativadas.",
      );
    } finally {
      setIsReady(true);
    }
  }, []);

  const setFlag = useCallback(
    (name: FeatureFlagName, enabled: boolean) => {
      const next = { ...flags, [name]: enabled };
      setFlags(next);

      try {
        window.localStorage.setItem(
          FEATURE_FLAGS_STORAGE_KEY,
          JSON.stringify(next),
        );
        setStorageError(null);
      } catch {
        setStorageError(
          "A alteração vale apenas nesta sessão porque não foi possível salvar a configuração local.",
        );
      }
    },
    [flags],
  );

  const resetFlags = useCallback(() => {
    setFlags({ ...DEFAULT_FEATURE_FLAGS });

    try {
      window.localStorage.removeItem(FEATURE_FLAGS_STORAGE_KEY);
      setStorageError(null);
    } catch {
      setStorageError(
        "As flags foram desativadas nesta sessão, mas não foi possível limpar a configuração local.",
      );
    }
  }, []);

  const value = useMemo(
    () => ({ flags, isReady, storageError, setFlag, resetFlags }),
    [flags, isReady, storageError, setFlag, resetFlags],
  );

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags deve ser utilizado dentro de FeatureFlagsProvider.",
    );
  }
  return context;
}
