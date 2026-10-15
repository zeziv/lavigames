"use client";

import Link from "next/link";
import { useA11yFlag } from "@/hooks/useA11yFlag";

export default function LegalDocNav() {
  const screenReader = useA11yFlag("data-a11y-sr");

  return (
    <Link
      href="/"
      className="legal-page__back"
      aria-label={
        screenReader ? "Back to Lavi Games hub home page" : undefined
      }
    >
      ← Back to hub
    </Link>
  );
}
