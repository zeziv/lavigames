import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import PoliciesContent from "@/components/PoliciesContent";

export const metadata: Metadata = {
  title: "Policies · Lavi Games",
};

export default function PoliciesPage() {
  return (
    <LegalDoc title="Policies">
      <PoliciesContent />
    </LegalDoc>
  );
}
