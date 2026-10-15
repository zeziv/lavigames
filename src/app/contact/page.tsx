import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Contact · Lavi Games",
};

export default function ContactPage() {
  return (
    <LegalDoc title="Contact">
      <ContactContent />
    </LegalDoc>
  );
}
