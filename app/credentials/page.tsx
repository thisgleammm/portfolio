import { Metadata } from "next";
import CredentialsContent from "@/app/credentials/CredentialsContent";

export const metadata: Metadata = {
  title: "Credentials & Licenses",
  description: "Official certifications, licenses, and professional recognition of Muhammad Gleam Mulyawan.",
};

export default function CredentialsPage() {
  return <CredentialsContent />;
}
