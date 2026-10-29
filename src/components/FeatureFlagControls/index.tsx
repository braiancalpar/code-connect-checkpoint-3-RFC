"use client";

import { useFeatureFlags } from "@/lib/feature-flags/FeatureFlagsProvider";
import styles from "./featureflagcontrols.module.css";

export function FeatureFlagControls() {
  const { flags, isReady, storageError, setFlag, resetFlags } =
    useFeatureFlags();

  return (
    <section className={styles.panel} aria-labelledby="feature-flags-title">
      <h2 id="feature-flags-title">Feature flags — demonstração local</h2>
      <p>
        Esta configuração fica neste navegador. Ela não é compartilhada com
        outras pessoas e não concede acesso a dados ou operações.
      </p>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={flags.showPostHighlight}
          disabled={!isReady}
          onChange={(event) =>
            setFlag("showPostHighlight", event.currentTarget.checked)
          }
        />
        Destacar posts no feed
      </label>
      <button
        className={styles.reset}
        type="button"
        onClick={resetFlags}
        disabled={!isReady}
      >
        Restaurar padrão
      </button>
      {storageError && (
        <p role="alert" className={styles.error}>
          {storageError}
        </p>
      )}
    </section>
  );
}
