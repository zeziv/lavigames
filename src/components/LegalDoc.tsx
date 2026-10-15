import type { ReactNode } from "react";
import LegalDocNav from "@/components/LegalDocNav";

type LegalDocProps = {
  title: string;
  children: ReactNode;
};

export default function LegalDoc({ title, children }: LegalDocProps) {
  return (
    <main id="main-content" className="legal-page" tabIndex={-1}>
      <header className="legal-page__header">
        <LegalDocNav />
      </header>
      <article className="legal-page__article">
        <h1 className="legal-page__title">{title}</h1>
        <div className="legal-page__body">{children}</div>
      </article>
    </main>
  );
}
