import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ExperienceCarousel from "../components/ExperienceCarousel";
import SectionNav from "../components/SectionNav";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { projects, projectFilters, projectSubFilters } from "../data/projects";
import { domains } from "../data/domains";
import { contactLinks } from "../data/contact";

function ScrollHint({ className = "mt-8" }) {
  return (
    <div className={`${className} flex flex-col items-center gap-2 text-neutral-800`}>
      <p className="text-xs uppercase tracking-[0.28em]">Scroll down for more</p>
      <span className="animate-bounce text-2xl leading-none">↓</span>
    </div>
  );
}

// Pinned bar at the top; ids match the sections below.
const navItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "domains", label: "Domains" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const inCategory = (id) => (project) => project.categories?.includes(id);

// Only offer filters that match at least one project.
const filters = [
  { id: "all", label: "All" },
  ...projectFilters.filter((f) => projects.some(inCategory(f.id))),
];

const FILTER_BUTTON =
  "border border-black bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-950 transition hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white";
const SUB_FILTER_BUTTON =
  "border border-neutral-400 bg-neutral-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-600 transition hover:border-neutral-600 hover:bg-neutral-600 hover:text-white aria-pressed:border-neutral-600 aria-pressed:bg-neutral-600 aria-pressed:text-white";

export default function Home() {
  const location = useLocation();
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectSubFilter, setProjectSubFilter] = useState(null);

  // Grey sub-filters narrow the selected white filter, and only the ones that
  // match a project under it are offered.
  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter(inCategory(projectFilter));
  const subFilters = projectSubFilters.filter((f) => filteredProjects.some(inCategory(f.id)));
  const shownProjects = projectSubFilter
    ? filteredProjects.filter(inCategory(projectSubFilter))
    : filteredProjects;

  const selectFilter = (id) => {
    setProjectFilter(id);
    setProjectSubFilter(null);
  };
  // Clicking the active sub-filter again clears it.
  const toggleSubFilter = (id) => setProjectSubFilter((current) => (current === id ? null : id));

  // Project pages link back here with { scrollTo: "domains" }.
  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView();
    }
  }, [location.state]);

  return (
    <main className="min-h-screen overflow-x-clip font-body bg-gradient-to-b from-[#E8D8F0] via-[#F0E6F5] to-[#FFF9FF] text-neutral-950">
      {/* ABOUT / HERO */}
      <SectionNav items={navItems} />

      <section id="home" className="mx-auto flex w-full max-w-[1300px] scroll-mt-12 flex-col justify-center px-8 py-12 sm:px-12 sm:py-14">
        <h1 className="text-center text-5xl font-bold uppercase tracking-[0.18em] sm:text-7xl">
          Navya Jain
        </h1>

        <div className="mx-auto mt-8 grid w-full max-w-[1180px] items-center gap-8 md:grid-cols-[250px_1fr]">
          <div className="flex justify-center md:justify-start">
            <div className="h-[190px] w-[190px] overflow-hidden rounded-full border-2 border-black bg-white sm:h-[240px] sm:w-[240px]">
              <img
                src={`${import.meta.env.BASE_URL}navya-img.jpeg`}
                alt="Navya Jain"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="max-w-[940px] space-y-3 text-base leading-7 text-neutral-800 sm:text-[17px]">
              <p>
                Hi, I am an AI/ML Engineer with over 2 years of experience and an M.S. in Artificial Intelligence from Boston University.
              </p>
              <p>
                My professional experience focuses on building reliable agentic systems, LLM-based applications, and end-to-end machine learning pipelines deployed on cloud platforms.
                I also bring expertise in on-device LLMs (fine-tuning, quantization) and ML inference.
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-6">
                <li>I was the first ML Engineer at Veritread, and built the entire freight price prediction pipeline from proof of concept to deployment. My models increased quarterly revenue by 20% and quote acceptance rate by 37%.</li>
                <li>I then automated the entire bidding pipeline with an agent that would price items directly from CSV, group them together to ship, select freight for multiple pickup and dropoff and more.</li>
                <li>I fine-tuned and quantized an audio model (Whisper) with code-switching on real-time audio.</li>
              </ol>
            </div>

          </div>
        </div>
        <ScrollHint />
      </section>

{/* PROFESSIONAL EXPERIENCE */}
      <Section id="experience" title="Professional Experience">
        <ExperienceCarousel items={experience} />
      </Section>

      {/* PROJECTS */}
      <div
        id="projects"
        className="scroll-mt-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background/projects-bg.jpg)` }}
      >
        <Section title="Projects">
          <p className="-mt-5 mb-5 text-center text-xs uppercase text-neutral-800">
            Click on a topic to view related projects
          </p>

          <div className="mb-10 flex flex-col items-center gap-3">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => selectFilter(f.id)}
                  aria-pressed={projectFilter === f.id}
                  className={FILTER_BUTTON}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {subFilters.length > 0 && (
              <div role="group" aria-label="Narrow projects" className="flex flex-wrap justify-center gap-2">
                {subFilters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleSubFilter(f.id)}
                    aria-pressed={projectSubFilter === f.id}
                    className={SUB_FILTER_BUTTON}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {shownProjects.length} {shownProjects.length === 1 ? "project" : "projects"}
          </p>

          {/* At most 3 per row (3 x 300px + 2 x 32px = 964px; 4 never fit); a short last row is centred. */}
          <div className="mx-auto flex w-full max-w-[964px] flex-wrap justify-center gap-x-8 gap-y-12 lg:gap-y-14">
            {shownProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      </div>

      {/* DOMAINS */}
      <div id="domains" className="scroll-mt-12">
        <Section title="Domains">
          <div className="mx-auto -mt-5 mb-8 max-w-2xl text-center">
            <p className="text-lg font-semibold text-neutral-900 sm:text-xl">
              What you can hand me end to end, from prototype to production.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-800 sm:text-base">
              These are the systems I know inside out. Click a domain to read about it and the practices I follow. Read the work I've done behind it, the projects (in prod) and how they were built.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 justify-items-center gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
            {domains.map((domain) => (
              <Link
                key={domain.id}
                to={`/domains/${domain.id}`}
                aria-label={`Read about ${domain.title}`}
                className="group block w-full max-w-[300px] aspect-square overflow-hidden border-[2px] border-black bg-white"
              >
                <img
                  src={`${import.meta.env.BASE_URL}domains/${domain.image}`}
                  alt={domain.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* EDUCATION */}
<Section id="education" title="Education">
  <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
    {education.map((item) => (
      // Fixed box size (500x173 on desktop); the card image scales inside it without cropping.
      <article
        key={`${item.degree}-${item.school}`}
        className="h-[197px] overflow-hidden border border-black bg-white md:h-[173px]"
      >
        <img
          src={`${import.meta.env.BASE_URL}education/${item.card}`}
          alt={`${item.degree}, ${item.school}. ${item.details}`}
          className="h-full w-full object-contain"
        />
      </article>
    ))}
  </div>
</Section>
      {/* CONTACT */}
      <Section id="contact" title="Contact Me">
        {/* Same look as the site's buttons, larger: 6 across on desktop, 3 on tablets, 2 on phones. */}
        <ul className="relative left-1/2 grid w-[88vw] -translate-x-1/2 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {contactLinks
            .filter((link) => link.href)
            .map((link) => {
              const isEmail = link.href.startsWith("mailto:");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 border border-black bg-white px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:text-sm"
                  >
                    {/* White tile keeps dark logos (GitHub, X, Medium) visible when the card turns black on hover. */}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-white">
                      <img
                        src={`${import.meta.env.BASE_URL}contact/${link.icon}`}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                    <span className="flex-1 text-center">{link.label}</span>
                  </a>
                </li>
              );
            })}
        </ul>
      </Section>
    </main>
  );
}