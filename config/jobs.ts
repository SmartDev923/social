/**
 * Auto-generated job catalog for hiring assessments.
 * Each job includes requirements, responsibilities, and a 4-step assessment (3 quizzes + 1 video).
 */

export type Company = {
  name: string;
  logo: string;
  url: string;
};

export type AssessmentStep = {
  id: number;
  type: "quiz" | "video";
  time: number; // seconds
  question: string;
};

export type Job = {
  id: string; // 6 letter code
  company: Company;
  title: string;
  requirements: string[];
  responsibilities: string[];
  assessment: {
    totalTime: number;
    steps: AssessmentStep[];
  };
};

export type JobData = { jobs: Job[] };

const companies: Record<string, Company> = {
  "Immunefi": { name: "Immunefi", logo: "/images/logo/immunefi.svg", url: "https://www.immunefi.app/en" },
};

export const immunefiTitles: string[] = [
  "Board Advisor, Commercial Growth",
  "Growth & Partnerships Advisor",
  "Strategic Operations & Investor Relations Advisor",
  "Strategic Board Advisor",
  "Crypto Real Estate Strategist",
]
const pad3 = (n: number) => String(n).padStart(3, "0");

// Generated per-company, per-role content
const jobCatalog: Record<string, Record<string, Omit<Job, "id" | "company" | "title">>> = {
  "Immunefi": {
    "Board Advisor, Commercial Growth":{
      "requirements": [
        "20+ years of experience in commercial growth, business strategy, or board-level advisory roles, preferably in crypto, Web3, fintech, or high-growth technology companies",
        "Proven track record of advising boards or executive teams on commercial strategy, revenue growth, and market expansion",
        "Strong understanding of blockchain protocols, DeFi ecosystems, tokenomics, and Web3 market dynamics",
        "Experience providing governance-level guidance on go-to-market, revenue optimization, and strategic commercial initiatives",
        "Ability to evaluate commercial performance, growth metrics, and strategic impact at a board level",
        "Strong analytical and systems-level thinking across business, product, and ecosystem domains",
        "Extensive network across founders, investors, enterprise partners, and Web3 ecosystem stakeholders",
        "Excellent board-level communication, governance insight, and stakeholder alignment skills"
      ],
      "responsibilities": [
        "Provide board-level guidance on Immunefi’s commercial growth strategy, go-to-market initiatives, and revenue optimization",
        "Advise on strategic commercial initiatives, partnership frameworks, and ecosystem growth opportunities",
        "Evaluate major commercial and growth initiatives through governance, strategic, and long-term value lenses",
        "Offer independent perspective on market expansion, revenue optimization, and business development strategies",
        "Support leadership in aligning commercial strategy with product, partnerships, growth, and ecosystem objectives",
        "Leverage network to facilitate strategic relationships with investors, enterprise partners, and ecosystem stakeholders",
        "Participate in board discussions and strategic planning sessions as required",
        "Contribute insights on emerging trends in Web3 commercial growth, enterprise adoption, and ecosystem monetization"
      ],
      "assessment": {
        "totalTime": 1500,
        "steps": [
          {
            "id": 1,
            "type": "quiz",
            "time": 420,
            "question": "Describe a board or advisory engagement where your guidance materially improved commercial growth, adoption, or strategic outcomes. What frameworks or strategies did you apply?"
          },
          {
            "id": 2,
            "type": "quiz",
            "time": 360,
            "question": "If advising Immunefi’s board on commercial growth strategy, what would be your top priorities over the next 2–3 years, and how would you evaluate impact?"
          },
          {
            "id": 3,
            "type": "quiz",
            "time": 300,
            "question": "How would you assess commercial performance, partnership ROI, and market expansion from a board-level strategic perspective?"
          },
          {
            "id": 4,
            "type": "video",
            "time": 180,
            "question": "Record a short video: why Immunefi, why this Board Advisor – Commercial Growth role, and an example of how your advisory shaped commercial strategy or growth outcomes."
          }
        ]
      }
    },
    "Growth & Partnerships Advisor":{
      "requirements": [
        "10+ years of experience in growth strategy, partnerships, or advisory roles, preferably in crypto, Web3, fintech, or high-growth technology companies",
        "Proven track record advising on growth initiatives, partnership strategies, and operational frameworks that drive adoption, revenue, or ecosystem expansion",
        "Strong understanding of blockchain protocols, DeFi ecosystems, tokenomics, and Web3 operational dynamics",
        "Experience providing strategic guidance to executive teams on scaling, partnership development, and growth frameworks",
        "Ability to design scalable frameworks, playbooks, and processes for partnership execution and growth",
        "Strong analytical skills to evaluate growth metrics, operational efficiency, and partnership outcomes",
        "Excellent executive communication, stakeholder management, and advisory skills",
        "Experience collaborating cross-functionally with product, marketing, growth, partnerships, and leadership teams"
      ],
      "responsibilities": [
        "Advise Immunefi on growth and partnership initiatives to maximize adoption, revenue, and long-term ecosystem value",
        "Provide guidance on operational frameworks, partnership strategies, and cross-functional execution",
        "Support teams in designing scalable processes, workflows, and playbooks for partnership and growth execution",
        "Analyze growth and ecosystem metrics to inform strategic recommendations and optimize outcomes",
        "Develop frameworks and best practices for partnership development, scaling initiatives, and cross-functional collaboration",
        "Collaborate with leadership, product, marketing, and growth teams to align strategies with organizational goals",
        "Mentor and advise teams on partnership strategy, growth frameworks, and execution best practices",
        "Represent Immunefi externally in strategic discussions, industry forums, and partnership-oriented engagements"
      ],
      "assessment": {
        "totalTime": 1500,
        "steps": [
          {
            "id": 1,
            "type": "quiz",
            "time": 420,
            "question": "Describe a growth or partnership advisory engagement where your guidance materially improved adoption, revenue, or strategic outcomes. What frameworks or strategies did you implement?"
          },
          {
            "id": 2,
            "type": "quiz",
            "time": 360,
            "question": "If you joined Immunefi as Growth & Partnerships Advisor tomorrow, what would be your top priorities for growth and partnership strategy, and which metrics would you track?"
          },
          {
            "id": 3,
            "type": "quiz",
            "time": 300,
            "question": "Pick a protocol, ecosystem segment, or functional area. How would you provide actionable operational and partnership recommendations to maximize adoption and strategic value?"
          },
          {
            "id": 4,
            "type": "video",
            "time": 180,
            "question": "Record a short video: why Immunefi, why this Growth & Partnerships Advisor role, and an example of how your advisory impacted adoption, revenue, or partnership outcomes."
          }
        ]
      }
    },
    "Strategic Operations & Investor Relations Advisor":{
      "requirements": [
        "10+ years of experience in strategic operations, investor relations, or advisory roles, preferably in crypto, Web3, fintech, or high-growth technology companies",
        "Proven track record advising on operational frameworks, growth initiatives, and investor relations that drive adoption, efficiency, and capital engagement",
        "Strong understanding of blockchain protocols, DeFi ecosystems, tokenomics, and Web3 operational dynamics",
        "Experience providing strategic guidance to executive teams on operational scaling, investor communications, and ecosystem initiatives",
        "Ability to design scalable frameworks, playbooks, and processes for operational excellence and investor relations",
        "Strong analytical skills to evaluate performance metrics, operational efficiency, and investor engagement outcomes",
        "Excellent executive communication, stakeholder management, and advisory skills",
        "Experience collaborating cross-functionally with product, marketing, growth, partnerships, and leadership teams"
      ],
      "responsibilities": [
        "Advise Immunefi on strategic operations and investor relations initiatives to maximize adoption, efficiency, and long-term value",
        "Provide guidance on operational frameworks, investor communications, and cross-functional execution",
        "Support teams in designing scalable processes, workflows, and playbooks for operational excellence and investor engagement",
        "Analyze operational and ecosystem metrics to inform strategic recommendations and optimize outcomes",
        "Develop frameworks and best practices for operational scaling, investor relations, and cross-functional collaboration",
        "Collaborate with leadership, product, marketing, growth, and partnerships teams to align strategies with organizational goals",
        "Mentor and advise teams on operational strategy, investor communications, and execution best practices",
        "Represent Immunefi externally in strategic discussions, investor forums, and growth-oriented engagements"
      ],
      "assessment": {
        "totalTime": 1800,
        "steps": [
          {
            "id": 1,
            "type": "quiz",
            "time": 480,
            "question": "Describe a strategic operations or investor relations advisory engagement where your guidance materially improved adoption, efficiency, or investor outcomes. What frameworks or strategies did you implement?"
          },
          {
            "id": 2,
            "type": "quiz",
            "time": 420,
            "question": "If you joined Immunefi as Strategic Operations & Investor Relations Advisor tomorrow, what would be your top priorities for operations and investor strategy, and which metrics would you track?"
          },
          {
            "id": 3,
            "type": "quiz",
            "time": 360,
            "question": "Pick a functional area or investor segment. How would you provide actionable operational and investor relations recommendations to maximize efficiency, adoption, and strategic value?"
          },
          {
            "id": 4,
            "type": "video",
            "time": 240,
            "question": "Record a short video: why Immunefi, why this Strategic Operations & Investor Relations Advisor role, and an example of how your advisory impacted operational effectiveness or investor outcomes."
          }
        ]
      }
    },
    "Strategic Board Advisor":{
      "requirements": [
        "20+ years of experience in board-level advisory, corporate strategy, or executive leadership roles, preferably in crypto, Web3, fintech, or high-growth technology companies",
        "Proven track record of advising boards or executive teams on strategy, governance, and organizational growth",
        "Strong understanding of blockchain protocols, DeFi ecosystems, tokenomics, and Web3 market dynamics",
        "Experience providing high-level guidance on go-to-market, growth, partnerships, and operational frameworks",
        "Ability to evaluate organizational performance, strategic initiatives, and long-term value creation at a board level",
        "Strong analytical and systems-level thinking across business, product, and ecosystem domains",
        "Extensive network across founders, investors, enterprise partners, and Web3 ecosystem stakeholders",
        "Excellent board-level communication, governance insight, and stakeholder alignment skills"
      ],
      "responsibilities": [
        "Provide board-level strategic guidance to Immunefi on organizational growth, operational scaling, and ecosystem initiatives",
        "Advise on high-level strategy, go-to-market plans, and cross-functional initiatives to maximize adoption, revenue, and long-term value",
        "Evaluate major strategic initiatives and provide independent recommendations to the board and executive leadership",
        "Offer insight on partnerships, market expansion, and ecosystem engagement from a governance perspective",
        "Support leadership in aligning operational, product, and commercial strategies with organizational goals",
        "Leverage personal and professional network to facilitate strategic relationships and ecosystem growth",
        "Participate in board discussions, strategic planning sessions, and governance reviews as required",
        "Provide thought leadership on emerging trends in Web3, DeFi, and enterprise adoption"
      ],
      "assessment": {
        "totalTime": 1500,
        "steps": [
          {
            "id": 1,
            "type": "quiz",
            "time": 420,
            "question": "Describe a board-level or strategic advisory engagement where your guidance materially improved organizational growth, adoption, or strategic outcomes. What frameworks or strategies did you apply?"
          },
          {
            "id": 2,
            "type": "quiz",
            "time": 360,
            "question": "If advising Immunefi’s board tomorrow, what would be your top priorities for strategic growth and ecosystem impact, and how would you evaluate success?"
          },
          {
            "id": 3,
            "type": "quiz",
            "time": 300,
            "question": "How would you assess organizational performance, strategic initiatives, and ecosystem engagement from a board-level perspective?"
          },
          {
            "id": 4,
            "type": "video",
            "time": 180,
            "question": "Record a short video: why Immunefi, why this Strategic Board Advisor role, and an example of how your advisory shaped organizational strategy or growth outcomes."
          }
        ]
      }
    },
    "Crypto Real Estate Strategist":{
      "requirements": [
        "10+ years of experience in real estate strategy, crypto finance, or digital asset advisory, preferably in Web3, DeFi, or high-growth technology companies",
        "Proven track record of designing and executing crypto-related real estate strategies that drive adoption, investment, and ecosystem growth",
        "Strong understanding of blockchain protocols, tokenized assets, NFT real estate, and DeFi market dynamics",
        "Experience providing strategic guidance on digital asset investment, tokenization frameworks, and real estate-focused financial models",
        "Ability to develop scalable frameworks, playbooks, and processes for crypto real estate initiatives",
        "Strong analytical skills to evaluate market trends, tokenized asset performance, and investment outcomes",
        "Excellent executive communication, stakeholder management, and advisory skills",
        "Experience collaborating cross-functionally with product, growth, partnerships, and leadership teams"
      ],
      "responsibilities": [
        "Advise Immunefi on crypto real estate strategies to maximize adoption, investment, and ecosystem value",
        "Provide guidance on tokenization, NFT real estate, and digital asset frameworks",
        "Support teams in designing scalable processes, workflows, and playbooks for crypto real estate initiatives",
        "Analyze market, tokenized asset, and ecosystem metrics to inform strategic recommendations and optimize outcomes",
        "Develop frameworks and best practices for digital asset investment, real estate tokenization, and cross-functional collaboration",
        "Collaborate with leadership, product, growth, and partnerships teams to align strategies with organizational goals",
        "Mentor and advise teams on crypto real estate strategy, investment frameworks, and execution best practices",
        "Represent Immunefi externally in industry forums, conferences, and strategic crypto real estate engagements"
      ],
      "assessment": {
        "totalTime": 1500,
        "steps": [
          {
            "id": 1,
            "type": "quiz",
            "time": 420,
            "question": "Describe a crypto real estate or tokenized asset initiative where your guidance materially improved adoption, investment, or strategic outcomes. What frameworks or strategies did you implement?"
          },
          {
            "id": 2,
            "type": "quiz",
            "time": 360,
            "question": "If you joined Immunefi as Crypto Real Estate Strategist tomorrow, what would be your top priorities for crypto real estate and tokenization strategy, and which metrics would you track?"
          },
          {
            "id": 3,
            "type": "quiz",
            "time": 300,
            "question": "Pick a real estate segment, tokenization model, or ecosystem opportunity. How would you provide actionable strategic recommendations to maximize adoption and investment outcomes?"
          },
          {
            "id": 4,
            "type": "video",
            "time": 180,
            "question": "Record a short video: why Immunefi, why this Crypto Real Estate Strategist role, and an example of how your advisory impacted adoption, investment, or ecosystem outcomes."
          }
        ]
      }
    },
  },
};

export const buildJobs = (companyKey: string, prefix: string, titles: string[]): Job[] => {
  const company = companies[companyKey];
  if (!company) throw new Error(`Unknown companyKey: ${companyKey}`);
  const catalog = jobCatalog[companyKey] || {};
  return titles.map((title, idx) => {
    const id = `${prefix}${pad3(idx + 1)}`;
    const content = catalog[title];
    if (!content) throw new Error(`Missing job content for ${companyKey} / ${title}`);
    return {
      id,
      company,
      title,
      requirements: content.requirements,
      responsibilities: content.responsibilities,
      assessment: content.assessment
    };
  });
};

export const jobsData: JobData = {
  jobs: [
    ...buildJobs("Immunefi", "IMM", immunefiTitles),
  ]
};
