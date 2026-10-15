"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { useA11yFlag } from "@/hooks/useA11yFlag";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

/** Focusable hub logo with screen-reader name (first content stop after skip). */
export default function HubBrand() {
  const verbose = useA11yVerbose();
  const keyboard = useA11yFlag("data-a11y-keyboard");

  return (
    <h1 className="wordmark">
      <Link
        href="/"
        className="brand-mark-link"
        aria-label={
          verbose
            ? "Lavi Games home. Lions Lead. Not Follow. Studio hub for Poll Warrior and Territory Conquest."
            : "Lavi Games home"
        }
        onKeyDown={(e) => {
          if (!keyboard) return;
          if (e.key !== " ") return;
          e.preventDefault();
          e.currentTarget.click();
        }}
      >
        <BrandMark decorative />
      </Link>
    </h1>
  );
}
