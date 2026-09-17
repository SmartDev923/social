import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import W3CareerHero from "@/components/Hero/W3CareerHero";
import HowItWorks from "@/components/HowItWorks";
import SecurityIntegrations from "@/components/SecurityIntegrations";
import FAQ from "@/components/FAQ";
import ContactSales from "@/components/ContactSales";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talentgauges - AI-Powered Executive Hiring Platform",
  description: "Transform your recruitment process with AI-powered candidate assessments, secure invites, and comprehensive insights.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <W3CareerHero />
      <HowItWorks />
      <Features />
      <SecurityIntegrations />
      <FAQ />
      <ContactSales />
    </>
  );
}
