"use client";

import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { useA11yFlag } from "@/hooks/useA11yFlag";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

export default function LegalDocNav() {
  const verbose = useA11yVerbose();
  const keyboard = useA11yFlag("data-a11y-keyboard");

  const activateOnSpace = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (!keyboard) return;
    if (e.key !== " ") return;
    e.preventDefault();
    e.currentTarget.click();
  };

  return (
    <>
      <Link
        href="/"
        className="wordmark wordmark--compact"
        aria-label={
          verbose
            ? "Lavi Games home. Return to the studio hub with Poll Warrior and Territory Conquest."
            : "Lavi Games home"
        }
        onKeyDown={activateOnSpace}
      >
        <BrandMark compact decorative />
      </Link>
      <Link
        href="/"
        className="legal-page__back"
        aria-label={
          verbose
            ? "Back to Lavi Games hub home page"
            : "Back to hub"
        }
        onKeyDown={activateOnSpace}
      >
        ← Back to hub
      </Link>
    </>
  );
}
