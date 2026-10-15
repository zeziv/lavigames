"use client";

import { company } from "@/data/company";
import { useA11yFlag } from "@/hooks/useA11yFlag";
import { useA11yVerbose } from "@/hooks/useA11yVerbose";

export default function PoliciesContent() {
  const verbose = useA11yVerbose();
  const keyboard = useA11yFlag("data-a11y-keyboard");

  const activateOnSpace = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
  ) => {
    if (!keyboard) return;
    if (e.key !== " ") return;
    e.preventDefault();
    e.currentTarget.click();
  };

  return (
    <>
      <p>
        <strong>Operator:</strong> {company.legalName}
        <br />
        <strong>Address:</strong> {company.address}
      </p>
      <p>
        Terms and privacy for each game live on that game&apos;s own site.
      </p>
      <ul>
        <li>
          <a
            href="https://pw.lavigames.com/terms"
            aria-label={
              verbose
                ? "Poll Warrior terms of service. Opens on pw.lavigames.com."
                : "Poll Warrior terms"
            }
            onKeyDown={activateOnSpace}
          >
            Poll Warrior terms
          </a>
          {" · "}
          <a
            href="https://pw.lavigames.com/privacy"
            aria-label={
              verbose
                ? "Poll Warrior privacy policy. Opens on pw.lavigames.com."
                : "Poll Warrior privacy"
            }
            onKeyDown={activateOnSpace}
          >
            privacy
          </a>
        </li>
        <li>
          <a
            href="https://tc.lavigames.com/terms"
            aria-label={
              verbose
                ? "Territory Conquest terms of service. Opens on tc.lavigames.com."
                : "Territory Conquest terms"
            }
            onKeyDown={activateOnSpace}
          >
            Territory Conquest terms
          </a>
          {" · "}
          <a
            href="https://tc.lavigames.com/privacy"
            aria-label={
              verbose
                ? "Territory Conquest privacy policy. Opens on tc.lavigames.com."
                : "Territory Conquest privacy"
            }
            onKeyDown={activateOnSpace}
          >
            privacy
          </a>
        </li>
      </ul>
    </>
  );
}
