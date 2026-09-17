import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Assessment Builder",
    description:
      "Create tailored candidate assessments using simple drag-and-drop tools. Combine video prompts, quizzes, and forms for any role—setup takes minutes, not hours.",
    img: "/images/product/Dashboard.svg",
    imgAlt: "Dashboard preview"
  },
  {
    id: 2,
    title: "Candidate Timeline",
    description:
      "Track every applicant’s real-time status from invite to completion. Instantly spot progress, drop-offs, and drill down to session details on demand.",
    img: "/images/product/IntroRecording.svg",
    imgAlt: "Recording flow preview"
  },
  {
    id: 3,
    title: "AI Insights",
    description:
      "Get instant AI-powered summaries of candidate communication, leadership, and fit. Key moments are highlighted for smarter, faster hiring decisions.",
    img: "/images/product/Resumeand Hire.svg",
    imgAlt: "AI insights preview"
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 lg:py-28 scroll-mt-20">
      <div className="container">
        <SectionTitle
          title="How talentgauges works"
          paragraph="Transform your recruiting process in three clear steps."
          center
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative rounded-lg bg-white p-8 shadow-one duration-300 hover:shadow-two dark:bg-dark dark:shadow-dark dark:hover:shadow-gray-dark flex flex-col items-center"
            >
              <div className="mb-6 w-full flex items-center justify-center">
                <Image
                  src={step.img}
                  alt={step.imgAlt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded"
                  priority={step.id === 1}
                />
              </div>
              <h3 className="mb-3 text-xl font-bold text-black dark:text-white text-center">
                {step.title}
              </h3>
              <p className="text-base text-body-color dark:text-body-color-dark text-center mb-3">
                {step.description}
              </p>
              <div className="absolute right-4 top-4 text-6xl font-bold text-primary opacity-5 select-none pointer-events-none">
                {step.id.toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

