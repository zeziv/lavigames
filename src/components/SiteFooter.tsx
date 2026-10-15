"use client";

import Link from "next/link";
import { company } from "@/data/company";
import { useA11yFlag } from "@/hooks/useA11yFlag";

export default function SiteFooter() {
  const screenReader = useA11yFlag("data-a11y-sr");

  return (
    <footer className="site-footer" aria-label="Site footer">
      <nav className="site-footer__nav" aria-label="Contact">
        <Link
          href="/contact"
          className="site-footer__contact"
          aria-label={
            screenReader
              ? "Contact Lavi Games — company contact details and game support links"
              : undefined
          }
        >
          Contact
        </Link>
      </nav>
      <p className="site-footer__copy">
        <span className="site-footer__owner">
          © {company.copyrightYear} {company.legalName}
        </span>
        <span className="site-footer__rights">All rights reserved.</span>
      </p>
    </footer>
  );
}
