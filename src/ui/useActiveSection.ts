import { useEffect, useState } from "react";

/**
 * Welcher Abschnitt steht gerade im Lesefeld? Ergebnis ist die
 * Abschnitts-ID (z. B. "3.4") für die Hervorhebung in der Navigation.
 *
 * Bewusst per Scroll-Listener statt IntersectionObserver: die Abschnitte
 * tragen `content-visibility: auto` und sind unterschiedlich hoch, ein
 * einzelner Beobachtungsstreifen würde bei langen Abschnitten dauernd
 * zwischen „noch drin" und „schon draußen" pendeln. Hier gilt schlicht:
 * aktiv ist der letzte Abschnitt, dessen Anfang oberhalb der Lesezeile
 * liegt.
 */
export function useActiveSection(ids: string[], ready: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);
  // Abhängigkeit als String: das Array wird bei jedem Render neu gebaut.
  const key = ids.join("|");

  useEffect(() => {
    if (!ready || ids.length === 0) return;
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.28; // Lesezeile im oberen Drittel
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(`sec-${id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top > line) break;
        current = id;
      }
      // Am Seitenende gehört die Markierung an den letzten Abschnitt, auch
      // wenn dessen Anfang noch unter der Lesezeile steht (kurzes Kapitelende).
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      setActive(atEnd ? ids[ids.length - 1] : current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ready]);

  return active;
}
