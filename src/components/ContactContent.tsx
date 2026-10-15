"use client";

import { company } from "@/data/company";
import { useA11yFlag } from "@/hooks/useA11yFlag";

export default function ContactContent() {
  const screenReader = useA11yFlag("data-a11y-sr");

  return (
    <>
      <p>
        For questions about {company.brand} or our games, email{" "}
        <a
          href={`mailto:${company.email}`}
          aria-label={
            screenReader
              ? `Email Lavi Games at ${company.email}`
              : undefined
          }
        >
          {company.email}
        </a>
        .
      </p>
      <p>
        <strong>Operator:</strong> {company.legalName}
        <br />
        <strong>Address:</strong> {company.address}
      </p>
      <p>
        Legal terms, privacy, and refund policies for each game live on that
        game&apos;s own site.
      </p>
      <ul>
        <li>
          <a
            href="https://pw.lavigames.com/terms"
            aria-label={
              screenReader
                ? "Poll Warrior terms of service (opens on pw.lavigames.com)"
                : undefined
            }
          >
            Poll Warrior terms
          </a>
          {" · "}
          <a
            href="https://pw.lavigames.com/privacy"
            aria-label={
              screenReader
                ? "Poll Warrior privacy policy (opens on pw.lavigames.com)"
                : "Poll Warrior privacy"
            }
          >
            privacy
          </a>
        </li>
        <li>
          <a
            href="https://tc.lavigames.com/terms"
            aria-label={
              screenReader
                ? "Territory Conquest terms of service (opens on tc.lavigames.com)"
                : undefined
            }
          >
            Territory Conquest terms
          </a>
          {" · "}
          <a
            href="https://tc.lavigames.com/privacy"
            aria-label={
              screenReader
                ? "Territory Conquest privacy policy (opens on tc.lavigames.com)"
                : "Territory Conquest privacy"
            }
          >
            privacy
          </a>
        </li>
      </ul>
    </>
  );
}
