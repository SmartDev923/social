import SectionTitle from "../Common/SectionTitle";

const faqs = [
  {
    q: "How do secure invites work?",
    a: (
      <span>
        Each candidate receives a unique, expiring invitation link that is directly tied to your assessment session. This link ensures that only the intended recipient can access your interview or test, offering control against unauthorized access and sharing. As an employer, you can monitor invitation status, set expiration times, and revoke access at any time if necessary. Candidates are given clear instructions and reminders to use their personal invite only. This approach dramatically reduces risk of impersonation and increases the security of your recruitment process.
      </span>
    ),
  },
  {
    q: "How does talentgauges use AI in candidate assessments?",
    a: (
      <span>
        Our platform uses advanced AI algorithms to analyze candidate responses, including video, text, and quiz answers. These models evaluate communication clarity, leadership attributes, and role fit based on both content and behavioral signals. Results are presented as easy-to-read insights and comparisons, supporting human decision-makers, not replacing them. All assessment data is never used to make fully automated decisions—final hiring remains with your team. Proprietary anti-cheating mechanisms ensure authenticity in all responses.
      </span>
    ),
  },
  {
    q: "What are the device and technical requirements for candidates?",
    a: (
      <span>
        Candidates need a modern browser (Chrome, Firefox, Safari, or Edge), stable internet connection, and a computer or mobile device with a working webcam and microphone for video-based tasks. Our guided setup includes device and permission checks and troubleshooting for audio/video issues before the assessment starts. Should candidates encounter problems, they are provided with real-time tips and detailed help articles, and live support is available in the assessment window. We recommend updating browsers and disabling unnecessary background applications to ensure smooth performance.
      </span>
    ),
  },
  {
    q: "How can employers or candidates customize and retake assessments?",
    a: (
      <span>
        Employers have full flexibility to design assessments, selecting the desired combination of video prompts, quizzes, case studies, and info forms tailored for each job role. Retake and appeal policies are configurable—employers may grant additional attempts, especially if technical issues occur, or enable structured appeals for fairness reviews. Candidates requesting retakes due to unforeseen problems should contact support or their recruiter with as much detail as possible.
      </span>
    ),
  },
  {
    q: "What integrations and data exports are available?",
    a: (
      <span>
        Talentgauges is integrating with leading ATS and HRIS systems (such as Greenhouse, Lever, and Workday), and offers API, webhooks, and CSV export options today. Recruiters can automate candidate flows and synchronize hiring data with their internal tools securely. We are committed to continual integration enhancements—companies can request priority support for their specific HR platform. Integration guides and onboarding specialists are available to assist with setup.
      </span>
    ),
  },
  {
    q: "How does talentgauges protect privacy and comply with security standards?",
    a: (
      <span>
        We follow GDPR, CCPA, and global data protection laws, and use strong encryption for information both in transit and at rest. Access controls and regular audits ensure your data is available only to verified members of your organization and our trusted, regulated partners. No data is sold to third parties. Users may request access to or deletion of their data at any time via support@talentgauges.io. For full legal details, refer to our Privacy Policy.
      </span>
    ),
  },
  {
    q: "What safeguards prevent cheating or use of unauthorized AI by candidates?",
    a: (
      <span>
        Our system employs multi-layered anti-cheating checks, including proprietary AI that detects content produced or altered by external AI tools, plagiarism screens, and human-in-the-loop auditing. Candidates are required to confirm original authorship of their work. Suspected violations may result in disqualification, notification to employers, or escalation to further review, per our Terms of Service. We strongly value fairness and platform integrity for all users.
      </span>
    ),
  },
  {
    q: "Is the talentgauges platform accessible for people with disabilities?",
    a: (
      <span>
        Yes. Accessibility is a core mission: our interface is tested for keyboard navigation, color contrast, screen reader compatibility, and adjustable text sizing. Candidates or employers needing further accommodations can reach out before or during an assessment for support. We are continuously improving compliance with WCAG and digital accessibility standards.
      </span>
    ),
  },
  {
    q: "What happens to data and videos after an assessment is completed?",
    a: (
      <span>
        All candidate videos and data are stored in encrypted environments, accessible only to your authorized team for a retention period set in your account. Employers can configure automatic deletion schedules to meet data minimization and privacy requirements. Candidates can request erasure or export of their submissions according to law. Once deleted, data cannot be restored.
      </span>
    ),
  },
  {
    q: "How can I contact talentgauges for feature requests, technical support, or compliance issues?",
    a: (
      <span>
        Our support and product teams are reachable at support@talentgauges.io for technical and compliance questions, or product@talentgauges.io for new feature suggestions. We provide live chat in the platform and a support ticket system for urgent or complex issues. We welcome and encourage feedback from both clients and candidates—your input shapes our ongoing roadmap. Response times may vary depending on the type of request, but all are addressed with priority and confidentiality.
      </span>
    ),
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Frequently Asked Questions"
          paragraph="Answers to the most common questions from hiring teams and candidates."
          center
        />

        <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-dark">
          {faqs.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                <span className="text-base font-semibold text-black dark:text-white">{item.q}</span>
                <span className="text-body-color transition group-open:rotate-180 dark:text-body-color-dark">▼</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-body-color dark:text-body-color-dark">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 bottom-5 z-[-1] opacity-40 dark:opacity-30">
        <svg width="279" height="106" viewBox="0 0 279 106" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <path d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373" stroke="url(#f0)" />
            <path d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373" stroke="url(#f1)" />
          </g>
          <defs>
            <linearGradient id="f0" x1="256.267" y1="53.6717" x2="-40.8688" y2="8.15715" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient id="f1" x1="256.267" y1="42.6717" x2="-40.8688" y2="-2.84285" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default FAQ;


