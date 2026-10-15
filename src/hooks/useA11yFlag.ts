"use client";

import { useEffect, useState } from "react";

export type A11yAttr =
  | "data-a11y-keyboard"
  | "data-a11y-sr"
  | "data-a11y-contrast"
  | "data-a11y-colorblind"
  | "data-a11y-reduce-motion";

function readFlag(attr: string): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute(attr) === "on";
}

/** Subscribe to accessibility menu flags applied on <html>. */
export function useA11yFlag(attr: A11yAttr): boolean {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(readFlag(attr));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attr],
    });
    return () => obs.disconnect();
  }, [attr]);

  return on;
}
