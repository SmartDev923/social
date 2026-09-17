import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    // Puzzle piece icon
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="3" y="5" width="8" height="8" rx="2" fill="currentColor" opacity="0.14"/>
        <path d="M5 9a2 2 0 0 1 2-2V5a3 3 0 0 1 3-3h1v2a2 2 0 1 0 2 0V2h1a3 3 0 0 1 3 3v2a2 2 0 1 1 0 4v2a2 2 0 1 1 0 4v2a3 3 0 0 1-3 3h-1v-2a2 2 0 1 0-2 0v2h-1a3 3 0 0 1-3-3v-2a2 2 0 1 1 0-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
    ),
    title: "Custom Assessment Builder",
    paragraph: "Effortlessly assemble video, quiz, and info steps for any role with intuitive drag-and-drop. Templates enable repeatable, scalable evaluations—fast.",
  },
  {
    id: 2,
    // Chart with magnifying glass icon
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="3" y="14" width="3" height="7" rx="1.5" fill="currentColor" opacity="0.12"/>
        <rect x="8" y="10" width="3" height="11" rx="1.5" fill="currentColor" opacity="0.18"/>
        <rect x="13" y="6" width="3" height="15" rx="1.5" fill="currentColor" opacity="0.22"/>
        <rect x="18" y="2" width="3" height="19" rx="1.5" fill="currentColor" opacity="0.27"/>
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        <path d="M19.1 19.1L21 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
    ),
    title: "AI-Powered Insights",
    paragraph: "Instantly surface top candidates with AI-driven communication, leadership, and fit scores. Make objective, informed decisions every step.",
  },
  {
    id: 3,
    // Link+lock icon
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="4" y="10" width="8" height="4" rx="2" fill="currentColor" opacity="0.12"/>
        <rect x="12" y="10" width="8" height="4" rx="2" fill="currentColor" opacity="0.12"/>
        <rect x="8" y="12" width="8" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M11 16v-1a1 1 0 1 1 2 0v1h1a2 2 0 1 1-4 0h1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M9 12v-1.5A3.5 3.5 0 0 1 12.5 7a3.5 3.5 0 0 1 3.5 3.5V12" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    title: "Secure Invite Links",
    paragraph: "Send unique, expiring links for each candidate. Control access, reduce leaks, and ensure every assessment stays confidential and safe.",
  },
  {
    id: 4,
    // Flag on building icon
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="3" y="12" width="18" height="8" rx="2" fill="currentColor" opacity="0.12"/>
        <rect x="8" y="7" width="8" height="5" rx="1.5" fill="currentColor" fillOpacity="0.20"/>
        <rect x="9" y="16" width="2" height="4" rx="1" fill="currentColor"/>
        <rect x="13" y="16" width="2" height="4" rx="1" fill="currentColor"/>
        <path d="M11 7V3h4v4" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M15 3h4v4h-4z" fill="currentColor"/>
      </svg>
    ),
    title: "Branded Company Pages",
    paragraph: "Showcase your brand and culture with logos, videos, and story highlights. Give top talent a memorable first impression of your workplace.",
  },
  {
    id: 5,
    // Video cam icon with dot
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="3" y="7" width="14" height="10" rx="3" fill="currentColor" opacity="0.12"/>
        <rect x="3" y="7" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <polygon points="12 11 16 13 12 15 12 11" fill="currentColor"/>
        <circle cx="20" cy="10" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Video Assessment Tools",
    paragraph: "Candidates respond with webcam videos—review, re-record, and submit with ease. See real communication and presence, not just resumes.",
  },
  {
    id: 6,
    // Funnel/flowchart icon
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" className="fill-none text-primary mx-auto" aria-hidden="true">
        <rect x="4" y="5" width="16" height="4" rx="2" fill="currentColor" opacity="0.14"/>
        <rect x="7" y="11" width="10" height="4" rx="2" fill="currentColor" opacity="0.18"/>
        <rect x="10" y="17" width="4" height="4" rx="2" fill="currentColor" opacity="0.22"/>
        <path d="M4 5h16v4H4zm3 6h10v4H7zm3 6h4v4h-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    title: "Candidate Pipeline Dashboard",
    paragraph: "Visualize your funnel from invite to hire with clear analytics. Manage, track, and act on every step—all on one dashboard.",
  },
];
export default featuresData;
