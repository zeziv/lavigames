"use client";

import Link from "next/link";
import { company } from "@/data/company";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

export default function SiteFooter() {
  const verbose = useA11yVerbose();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <nav className="site-footer__nav" aria-label="Site policies navigation">
        <Link
          href="/policies"
          className="site-footer__link"
          aria-label={
            verbose
              ? "Policies. Operator details and links to game terms and privacy."
              : "Policies"
          }
        >
          Policies
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
