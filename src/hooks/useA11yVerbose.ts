"use client";

import { useA11yFlag } from "@/hooks/useA11yFlag";

/** True when keyboard nav and/or screen-reader mode should expose fuller labels. */
export function useA11yVerbose(): boolean {
  const keyboard = useA11yFlag("data-a11y-keyboard");
  const screenReader = useA11yFlag("data-a11y-sr");
  return keyboard || screenReader;
}
