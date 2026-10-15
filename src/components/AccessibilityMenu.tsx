"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  A11Y_CHANGE_EVENT,
  DEFAULT_A11Y_PREFS,
  TEXT_SCALES,
  applyA11yPrefs,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
  type TextScale,
} from "@/lib/a11yPrefs";

function IconA11y() {
  return (
    <svg
      className="icon-scale icon-scale--lg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M4.5 9.2h15v2.1H15.6v8.2h-2.3v-5.4h-2.6v5.4H8.4v-8.2H4.5z" />
    </svg>
  );
}

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return [
    ...container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].flatMap((el) => {
    if (!(el instanceof HTMLElement)) return [];
    if (el.closest("[hidden]")) return [];
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return [];
    return [el];
  });
}

export default function AccessibilityMenu() {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_A11Y_PREFS);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const initial = loadA11yPrefs();
    setPrefs(initial);
    applyA11yPrefs(initial);
    setReady(true);

    const sync = (e: Event) => {
      const next =
        (e as CustomEvent<A11yPrefs>).detail ?? loadA11yPrefs();
      setPrefs((prev) => {
        if (
          prev.keyboardNav === next.keyboardNav &&
          prev.screenReader === next.screenReader &&
          prev.highContrast === next.highContrast &&
          prev.colorblind === next.colorblind &&
          prev.reduceMotion === next.reduceMotion &&
          prev.textScale === next.textScale
        ) {
          return prev;
        }
        return next;
      });
    };
    window.addEventListener(A11Y_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(A11Y_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveA11yPrefs(prefs, { broadcast: true });
  }, [prefs, ready]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const closeAndRestore = () => {
      setOpen(false);
      window.requestAnimationFrame(() => buttonRef.current?.focus());
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeAndRestore();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = getFocusable(panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);

    window.requestAnimationFrame(() => {
      const focusable = getFocusable(panel);
      const firstInput = focusable.find((el) => el.tagName === "INPUT");
      (firstInput || focusable[0])?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  const update = <K extends keyof A11yPrefs>(key: K, value: A11yPrefs[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const cycleTextScale = (dir: -1 | 1) => {
    const idx = TEXT_SCALES.indexOf(prefs.textScale);
    const next = TEXT_SCALES[
      Math.min(TEXT_SCALES.length - 1, Math.max(0, idx + dir))
    ] as TextScale;
    update("textScale", next);
    setStatus(`Text size ${next}%`);
  };

  const closePanel = () => {
    setOpen(false);
    window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  return (
    <div className="a11y-widget">
      {open && prefs.keyboardNav ? (
        <div className="a11y-status" role="status" aria-live="polite">
          <p>
            <strong>Keyboard mode:</strong> <kbd>Tab</kbd> /{" "}
            <kbd>Shift+Tab</kbd> move between controls · <kbd>Enter</kbd>/
            <kbd>Space</kbd> activate · <kbd>Esc</kbd> closes this menu.
          </p>
        </div>
      ) : null}
      {status ? (
        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}

      <a
        href="#main-content"
        className={`a11y-skip-link${
          prefs.keyboardNav || prefs.screenReader
            ? " a11y-skip-link--visible"
            : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main-content");
          if (!main) return;
          main.focus({ preventScroll: false });
          main.scrollIntoView({ block: "start" });
        }}
        onKeyDown={(e) => {
          if (e.key !== " ") return;
          e.preventDefault();
          const main = document.getElementById("main-content");
          if (!main) return;
          main.focus({ preventScroll: false });
          main.scrollIntoView({ block: "start" });
        }}
      >
        Skip to main content
      </a>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
        hidden={!open}
        className={`a11y-panel${open ? " is-open" : ""}`}
      >
        <div className="a11y-panel__header">
          <h2 id={`${panelId}-title`}>Accessibility</h2>
          <button
            type="button"
            className="a11y-panel__close"
            onClick={closePanel}
            aria-label="Close accessibility menu"
          >
            ×
          </button>
        </div>

        <ul className="a11y-list">
          <li>
            <label className="a11y-row">
              <span id={`${panelId}-kb`}>
                <strong>Keyboard navigation</strong>
                <small>
                  Stronger focus outlines; Tab / Shift+Tab between controls;
                  Enter/Space to activate; Esc closes this menu
                </small>
              </span>
              <input
                type="checkbox"
                checked={prefs.keyboardNav}
                aria-labelledby={`${panelId}-kb`}
                onChange={(e) => {
                  const on = e.target.checked;
                  update("keyboardNav", on);
                  setStatus(
                    on
                      ? "Keyboard navigation enabled. Tab order: logo, game cards, Policies, Skip link, then Accessibility menu. Enter or Space activates links."
                      : "Keyboard navigation disabled.",
                  );
                }}
              />
            </label>
          </li>
          <li>
            <label className="a11y-row">
              <span id={`${panelId}-sr`}>
                <strong>Screen-reader compatibility</strong>
                <small>
                  Clearer labels on game cards, policies links, and footer
                </small>
              </span>
              <input
                type="checkbox"
                checked={prefs.screenReader}
                aria-labelledby={`${panelId}-sr`}
                onChange={(e) => {
                  const on = e.target.checked;
                  update("screenReader", on);
                  setStatus(
                    on
                      ? "Screen-reader mode enabled. Controls expose clearer labels."
                      : "Screen-reader mode disabled.",
                  );
                }}
              />
            </label>
          </li>
          <li>
            <label className="a11y-row">
              <span id={`${panelId}-hc`}>
                <strong>High contrast mode</strong>
                <small>Stronger text, borders, and panel contrast</small>
              </span>
              <input
                type="checkbox"
                checked={prefs.highContrast}
                aria-labelledby={`${panelId}-hc`}
                onChange={(e) => {
                  const on = e.target.checked;
                  update("highContrast", on);
                  setStatus(
                    on ? "High contrast mode on." : "High contrast mode off.",
                  );
                }}
              />
            </label>
          </li>
          <li>
            <label className="a11y-row">
              <span id={`${panelId}-cvd`}>
                <strong>Colorblind mode</strong>
                <small>
                  Accent shifts to amber; game cards use stronger patterned
                  borders
                </small>
              </span>
              <input
                type="checkbox"
                checked={prefs.colorblind}
                aria-labelledby={`${panelId}-cvd`}
                onChange={(e) => {
                  const on = e.target.checked;
                  update("colorblind", on);
                  setStatus(
                    on
                      ? "Colorblind mode on. Accent is amber with patterned card borders."
                      : "Colorblind mode off.",
                  );
                }}
              />
            </label>
          </li>
          <li>
            <label className="a11y-row">
              <span id={`${panelId}-rm`}>
                <strong>Reduce motion</strong>
                <small>
                  Turns off card hover lift and other motion (also follows your
                  system setting on first visit)
                </small>
              </span>
              <input
                type="checkbox"
                checked={prefs.reduceMotion}
                aria-labelledby={`${panelId}-rm`}
                onChange={(e) => {
                  const on = e.target.checked;
                  update("reduceMotion", on);
                  setStatus(
                    on
                      ? "Reduce motion on. Hover animations are minimized."
                      : "Reduce motion off.",
                  );
                }}
              />
            </label>
          </li>
          <li>
            <div
              className="a11y-row a11y-row--scale"
              role="group"
              aria-labelledby={`${panelId}-scale`}
            >
              <span id={`${panelId}-scale`}>
                <strong>Text resizing</strong>
                <small>Scale interface text up to 200%</small>
              </span>
              <div className="a11y-scale">
                <button
                  type="button"
                  onClick={() => cycleTextScale(-1)}
                  disabled={prefs.textScale <= 100}
                  aria-label={`Decrease text size. Current size ${prefs.textScale} percent`}
                >
                  A−
                </button>
                <span aria-live="polite">{prefs.textScale}%</span>
                <button
                  type="button"
                  onClick={() => cycleTextScale(1)}
                  disabled={prefs.textScale >= 200}
                  aria-label={`Increase text size. Current size ${prefs.textScale} percent`}
                >
                  A+
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <button
        ref={buttonRef}
        type="button"
        className="a11y-fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={
          open
            ? "Close accessibility menu"
            : prefs.keyboardNav || prefs.screenReader
              ? "Open accessibility menu. Options for keyboard, screen reader, contrast, colorblind mode, motion, and text size."
              : "Open accessibility menu"
        }
        onClick={() => setOpen((v) => !v)}
      >
        <IconA11y />
      </button>
    </div>
  );
}
