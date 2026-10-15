import Image from "next/image";
import { company } from "@/data/company";

type BrandMarkProps = {
  compact?: boolean;
};

export default function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}`}
    >
      <Image
        src="/images/lavi-games-wordmark-v5.webp"
        alt={company.brand}
        width={720}
        height={180}
        className="brand-mark__wordmark"
        priority={!compact}
        sizes={compact ? "220px" : "(max-width: 720px) 80vw, 420px"}
      />
    </span>
  );
}
