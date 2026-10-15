import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact · Lavi Games",
};

export default function ContactPage() {
  return (
    <LegalDoc title="Contact">
      <p>
        For questions about {company.brand} or our games, email{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
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
          <a href="https://pw.lavigames.com/terms">Poll Warrior terms</a>
          {" · "}
          <a href="https://pw.lavigames.com/privacy">privacy</a>
        </li>
        <li>
          <a href="https://tc.lavigames.com/terms">Territory Conquest terms</a>
          {" · "}
          <a href="https://tc.lavigames.com/privacy">privacy</a>
        </li>
      </ul>
    </LegalDoc>
  );
}
