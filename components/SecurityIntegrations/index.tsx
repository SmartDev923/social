import SectionTitle from "../Common/SectionTitle";

const integrations = [
  { name: "Greenhouse", color: "bg-green-50 dark:bg-green-900", logo: "G" },
  { name: "Lever", color: "bg-gray-50 dark:bg-gray-800", logo: "L" },
  { name: "Workday", color: "bg-blue-50 dark:bg-blue-900", logo: "W" },
  { name: "Slack", color: "bg-purple-50 dark:bg-purple-900", logo: "S" },
  { name: "Google", color: "bg-yellow-50 dark:bg-yellow-900", logo: "G" },
  { name: "Okta", color: "bg-cyan-50 dark:bg-cyan-900", logo: "O" }
];

const securityItems = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="text-primary inline mr-2 align-text-bottom"><path d="M10 2l7 3v5c0 5-3.5 8-7 8s-7-3-7-8V5l7-3z" fill="currentColor" fillOpacity="0.18"/><path d="M10 2l7 3v5c0 5-3.5 8-7 8s-7-3-7-8V5l7-3zm0 0v15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
    ),
    text: "Data encryption in transit and at rest"
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="text-primary inline mr-2 align-text-bottom"><rect x="3" y="7" width="14" height="8" rx="3" fill="currentColor" fillOpacity="0.18"/><rect x="3" y="7" width="14" height="8" rx="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="13" width="2" height="3" rx="1" fill="currentColor"/></svg>
    ),
    text: "Role-based access and secure invite links"
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="text-primary inline mr-2 align-text-bottom"><circle cx="10" cy="10" r="8" fill="currentColor" fillOpacity="0.18"/><path d="M10 8c-1.1 0-2 .9-2 2v0c0 1.1.9 2 2 2s2-.9 2-2v0c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.25"/><path d="M7.5 7.5h5M7.83 13.33h4.34" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
    ),
    text: "Candidate consent and recording controls"
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="text-primary inline mr-2 align-text-bottom"><rect x="3" y="5" width="14" height="10" rx="2" fill="currentColor" fillOpacity="0.18"/><path d="M5 13l3.2-3.5a.85.85 0 011.3 0L15 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect x="5" y="7.5" width="10" height="1.2" rx=".5" fill="currentColor"/></svg>
    ),
    text: "SOC 2 readiness (in progress)"
  }
];

const SecurityIntegrations = () => {
  return (
    <section id="security" className="relative z-10 py-16 md:py-20 lg:py-28 bg-gradient-to-tr from-white via-blue-50 to-white dark:from-dark dark:via-gray-900 dark:to-dark">
      <div className="container">
        <SectionTitle
          title="Security & Integrations"
          paragraph="Enterprise-ready from day one with a growing ecosystem."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
          {/* Security Card */}
          <div className="relative rounded-xl border border-gray-200 bg-white p-8 pb-6 dark:border-gray-800 dark:bg-dark shadow-sm flex flex-col min-h-[290px]">
            <div className="flex items-center mb-5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary mr-3"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".10"/><path d="M12 5l5 2v4c0 4-2.5 6.5-5 6.5s-5-2.5-5-6.5V7l5-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
              <h4 className="text-lg font-semibold text-black dark:text-white">Security</h4>
            </div>
            <ul className="space-y-4 text-base text-body-color dark:text-body-color-dark">
              {securityItems.map((s, i) => (
                <li key={i} className="flex items-start leading-snug">
                  {s.icon}
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Integrations Card (remains unchanged) */}
          <div className="relative rounded-xl border border-gray-200 bg-white p-8 pb-6 dark:border-gray-800 dark:bg-dark shadow-sm flex flex-col min-h-[290px]">
            <div className="flex items-center mb-5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary mr-3"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".10"/><rect x="7.5" y="8.5" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 11.5h5m-5 2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              <h4 className="text-lg font-semibold text-black dark:text-white">Integrations</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-3">
              {integrations.map(i => (
                <div
                  key={i.name}
                  className={`
                    ${i.color} flex flex-col text-center items-center justify-center rounded-lg p-4 font-semibold text-base shadow-sm transition-all border border-transparent hover:border-primary hover:shadow-lg hover:-translate-y-1 duration-200 cursor-pointer`}
                  title={i.name}
                >
                  <div className="flex items-center justify-center w-9 h-9 mb-1 rounded-full bg-white/70 dark:bg-gray-900/50 text-primary font-bold text-lg border border-gray-200 dark:border-none">
                    {i.logo}
                  </div>
                  <span className="text-body-color dark:text-body-color-dark font-medium truncate">
                    {i.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Subtle fade for background accent */}
        <div className="pointer-events-none absolute right-0 top-8 z-[-1] opacity-30 dark:opacity-20">
          <svg width="238" height="531" viewBox="0 0 238 531" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.3" x="422.819" y="-70.8145" width="196" height="541.607" rx="2" transform="rotate(51.2997 422.819 -70.8145)" fill="url(#si0)" />
            <rect opacity="0.3" x="426.568" y="144.886" width="59.7544" height="541.607" rx="2" transform="rotate(51.2997 426.568 144.886)" fill="url(#si1)" />
            <defs>
              <linearGradient id="si0" x1="517.152" y1="-251.373" x2="517.152" y2="459.865" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="si1" x1="455.327" y1="-35.673" x2="455.327" y2="675.565" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default SecurityIntegrations;


