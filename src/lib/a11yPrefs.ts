export const A11Y_STORAGE_KEY = "lg_a11y_prefs";
export const A11Y_CHANGE_EVENT = "lg-a11y-prefs";

export const TEXT_SCALES = [100, 125, 150, 175, 200] as const;
export type TextScale = (typeof TEXT_SCALES)[number];

export type A11yPrefs = {
  keyboardNav: boolean;
  screenReader: boolean;
  highContrast: boolean;
  colorblind: boolean;
  reduceMotion: boolean;
  textScale: TextScale;
};

export const DEFAULT_A11Y_PREFS: A11yPrefs = {
  keyboardNav: false,
  screenReader: false,
  highContrast: false,
  colorblind: false,
  reduceMotion: false,
  textScale: 100,
};

function osPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function loadA11yPrefs(): A11yPrefs {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_PREFS };
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) {
      return {
        ...DEFAULT_A11Y_PREFS,
        reduceMotion: osPrefersReducedMotion(),
      };
    }
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    const scale = parsed.textScale;
    return {
      keyboardNav: Boolean(parsed.keyboardNav),
      screenReader: Boolean(parsed.screenReader),
      highContrast: Boolean(parsed.highContrast),
      colorblind: Boolean(parsed.colorblind),
      reduceMotion:
        typeof parsed.reduceMotion === "boolean"
          ? parsed.reduceMotion
          : osPrefersReducedMotion(),
      textScale: TEXT_SCALES.includes(scale as TextScale)
        ? (scale as TextScale)
        : 100,
    };
  } catch {
    return {
      ...DEFAULT_A11Y_PREFS,
      reduceMotion: osPrefersReducedMotion(),
    };
  }
}

export function applyA11yPrefs(prefs: A11yPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.a11yKeyboard = prefs.keyboardNav ? "on" : "off";
  root.dataset.a11ySr = prefs.screenReader ? "on" : "off";
  root.dataset.a11yContrast = prefs.highContrast ? "on" : "off";
  root.dataset.a11yColorblind = prefs.colorblind ? "on" : "off";
  root.setAttribute(
    "data-a11y-reduce-motion",
    prefs.reduceMotion ? "on" : "off",
  );
  root.dataset.a11yText = String(prefs.textScale);
  root.style.setProperty("--a11y-font-scale", String(prefs.textScale / 100));
}

export function saveA11yPrefs(
  prefs: A11yPrefs,
  { broadcast = true }: { broadcast?: boolean } = {},
) {
  if (typeof window === "undefined") return;
  applyA11yPrefs(prefs);
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  if (broadcast) {
    window.dispatchEvent(
      new CustomEvent(A11Y_CHANGE_EVENT, { detail: prefs }),
    );
  }
}
