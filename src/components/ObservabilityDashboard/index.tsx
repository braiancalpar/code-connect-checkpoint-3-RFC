"use client";

import { useObservability } from "@/lib/observability/ObservabilityProvider";
import styles from "./observabilitydashboard.module.css";

export function ObservabilityDashboard() {
  const { events, clearEvents } = useObservability();

  return (
    <section
      className={styles.panel}
      aria-labelledby="observability-events-title"
    >
      <div className={styles.heading}>
        <div>
          <h2 id="observability-events-title">Eventos desta sessão</h2>
          <p>Coleta local em memória; nenhum evento é enviado à rede.</p>
        </div>
        <button type="button" onClick={clearEvents} disabled={events.length === 0}>
          Limpar
        </button>
      </div>
      {events.length === 0 ? (
        <p>Nenhum evento capturado nesta sessão.</p>
      ) : (
        <ol className={styles.events} aria-live="polite">
          {[...events].reverse().map((event) => (
            <li key={event.id}>
              <span className={styles.category}>{event.category}</span>
              <strong>{event.name}</strong>
              {typeof event.value === "number" && (
                <span>
                  {event.value.toFixed(2)}
                  {event.unit ? ` ${event.unit}` : ""}
                  {event.rating ? ` (${event.rating})` : ""}
                </span>
              )}
              <time dateTime={event.timestamp}>
                {new Date(event.timestamp).toLocaleTimeString()}
              </time>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
