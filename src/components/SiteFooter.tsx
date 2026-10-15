import Link from "next/link";
import { company } from "@/data/company";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <nav className="site-footer__nav" aria-label="Contact">
        <Link href="/contact" className="site-footer__contact">
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
