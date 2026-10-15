"use client";

import Image from "next/image";
import { company } from "@/data/company";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

type BrandMarkProps = {
  compact?: boolean;
  /** When true, image is decorative (parent link/heading already names it). */
  decorative?: boolean;
};

export default function BrandMark({
  compact = false,
  decorative = false,
}: BrandMarkProps) {
  const verbose = useA11yVerbose();

  const alt = decorative
    ? ""
    : verbose
      ? `${company.brand} wordmark — lions lead, not follow`
      : company.brand;

  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}`}
    >
      <Image
        src="/images/lavi-games-wordmark-v5.webp"
        alt={alt}
        width={720}
        height={180}
        className="brand-mark__wordmark"
        priority={!compact}
        sizes={compact ? "220px" : "(max-width: 720px) 80vw, 420px"}
      />
    </span>
  );
}
