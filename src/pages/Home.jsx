import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Section from "../components/Section";
import SocialButton from "../components/SocialButton";
import ProjectCard from "../components/ProjectCard";
import RichText from "../components/RichText";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { projects } from "../data/projects";


// Images live in public/domains/ (each image already has its title and topics).
const domains = [
  {
    image: "pricing-systems.png",
    alt: "ML Pricing Systems: regression, neural networks, confidence model, markups, A/B tests, retraining, transfer learning",
  },
  {
    image: "applied-ai.png",
    alt: "Agentic Systems: tools, MCP, multi-agent, eval harness, guardrails, RAG, prompt engineering",
  },
  {
    image: "on-device.png",
    alt: "LLMs, On-Device AI and Inference: transformers, quantization, multimodal, KV cache, runtimes, GPU performance, fine-tuning",
  },
];

function ScrollHint() {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-neutral-800">
      <p className="text-xs uppercase tracking-[0.28em]">Scroll down for more</p>
      <span className="animate-bounce text-2xl leading-none">↓</span>
    </div>
  );
}


export default function Home() {
  const location = useLocation();

  // Project pages link back here with { scrollTo: "domains" }.
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView();
    }
  }, [location.state]);

  return (
    <main className="min-h-screen overflow-x-hidden font-body bg-gradient-to-b from-[#E8D8F0] via-[#F0E6F5] to-[#FFF9FF] text-neutral-950">
      {/* ABOUT / HERO */}
      <section className="mx-auto flex min-h-screen w-full max-w-[1300px] flex-col justify-center px-8 py-16 sm:px-12">
        <p className="text-center text-sm uppercase tracking-[0.35em] text-neutral-800">
          Home
        </p>

        <h1 className="mt-4 text-center text-5xl font-bold uppercase tracking-[0.18em] sm:text-7xl">
          Navya Jain
        </h1>

        <div className="mx-auto mt-10 grid w-full max-w-[1180px] items-center gap-10 md:grid-cols-[260px_1fr]">
          <div className="relative -top-13 flex justify-center md:justify-start">
            <div className="h-[220px] w-[220px] overflow-hidden rounded-full border-2 border-black bg-white sm:h-[250px] sm:w-[250px]">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="Navya Jain"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="w-full">
            {/*<h2 className="text-3xl font-bold">About Me</h2>*/}

            <div className="max-w-[940px] space-y-4 text-lg leading-8 text-neutral-800">
              <p>
                Hi, I am an AI/ML Engineer with over 2 years of experience and an M.S. in Artificial Intelligence from Boston University.
              </p>
              <p>
                My professional experience focuses on building reliable agentic systems, LLM-based applications, and end-to-end machine learning pipelines deployed on cloud platforms.
                I also bring expertise in on-device LLMs (fine-tuning, quantization) and ML inference.
              </p>
              <div>
                <ol className="mt-2 list-decimal space-y-1 pl-6">
                  <li>I was the first ML Engineer at Veritread, and built the entire freight price prediction pipeline from proof of concept to deployment. My models increased quaterly revenue by 20% and quote acceptance rate by 37%.</li>
                  <li>I then automated the entire bidding pipeline with an agent that would price items directly from CSV, group them togther to ship, select freight for multiple pickup and dropoff and more.</li>
                  <li>I fine-tuned and quantized an audio model (Whisper) with code-switching on real-time audio.</li>
                </ol>
              </div>
              <p>
                
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <SocialButton href="https://github.com/ivybot4">
                GitHub
              </SocialButton>

              <SocialButton href="https://linkedin.com/in/navya45">
                LinkedIn
              </SocialButton>

              <SocialButton href={`${import.meta.env.BASE_URL}resume.pdf`}>
                Resume
              </SocialButton>
            </div>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* DOMAINS */}
      <div
        id="domains"
        className="scroll-mt-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background/projects-bg.jpg)` }}
      >
        <Section title="Domains">
          <div className="mx-auto -mt-5 mb-12 max-w-2xl text-center">
            <p className="text-lg font-semibold text-neutral-900 sm:text-xl">
              What you can hand me end to end, from prototype to production.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-800 sm:text-base">
              These are the systems I know inside out. Click a domain for the work behind it, the projects and how they were built.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 justify-items-center gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
            {domains.map((domain) => (
              <div key={domain.image} className="w-full max-w-[300px] aspect-square overflow-hidden border-[2px] border-black bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}domains/${domain.image}`}
                  alt={domain.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <ScrollHint />
        </Section>
      </div>

{/* PROFESSIONAL EXPERIENCE */}
<div id="experience" className="scroll-mt-4">
<Section title="Professional Experience">
  <div className="mx-auto max-w-3xl space-y-8">
    {experience.map((companyItem) => (
      <article
        key={companyItem.company}
        className="border-l-2 border-black pl-5"
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-700">
          {companyItem.date}
        </p>

        <h3 className="mt-1.5 text-xl font-bold">
          {companyItem.company}
        </h3>

        <p className="mt-1 text-xs text-neutral-700">
          {companyItem.location}
        </p>

        {companyItem.note && (
          <p className="mt-3 text-sm italic text-neutral-700">
            {companyItem.note}
          </p>
        )}

        <div className="mt-5 space-y-6">
          {companyItem.positions.map((position) => (
            <div key={`${companyItem.company}-${position.role}`}>
              <h4 className="text-base font-semibold">
                {position.role}
                <span className="ml-2 text-xs font-normal uppercase tracking-[0.16em] text-neutral-600">
                  {position.date}
                </span>
              </h4>

              {position.groups ? (
                <ul className="mt-3 space-y-4">
                  {position.groups.map((group) => {
                    // One visible bullet: your summary if written, otherwise the first bullet.
                    const headline = group.summary || group.bullets[0];
                    const rest = group.summary ? group.bullets : group.bullets.slice(1);

                    return (
                      <li key={group.title}>
                        <p className="text-base font-bold">{group.title}</p>
                        <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-neutral-800">
                          <li>
                            <RichText text={headline} />
                          </li>
                        </ul>
                        {rest.length > 0 && (
                          <details className="group mt-1">
                            <summary className="inline-flex list-none items-center gap-1 text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-black [&::-webkit-details-marker]:hidden">
                              <span className="transition-transform group-open:rotate-90">▸</span>
                              Click for all details
                            </summary>
                            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-neutral-800">
                              {rest.map((bullet) => (
                                <li key={bullet}>
                                  <RichText text={bullet} />
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-neutral-800">
                  {position.bullets.map((bullet) => (
                    <li key={bullet}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
    ))}
  </div>
  <ScrollHint />
</Section>
</div>
      {/* EDUCATION */}
<Section title="Education">
  <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2">
    {education.map((item) => (
      <article
        key={`${item.degree}-${item.school}`}
        className="border border-black bg-white/45 p-4"
      >
        <h3 className="text-xl font-bold">{item.degree}</h3>

        <p className="mt-1.5 text-base">{item.school}</p>

        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-neutral-700">
          {item.date}
        </p>

        <p className="mt-3 text-sm leading-6 text-neutral-800">
          {item.details}
        </p>
      </article>
    ))}
  </div>
  <ScrollHint />
</Section>

      {/* PROJECTS (same cards as Domains for now) */}
      <div id="projects" className="scroll-mt-4">
        <Section title="Projects">
          <div className="grid w-full grid-cols-1 justify-items-center gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}