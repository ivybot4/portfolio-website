import { Link, useParams } from "react-router-dom";
import { projects, hasDetailPage } from "../data/projects";

const BUTTON =
  "inline-block border border-black bg-white px-3 py-1.5 text-[11px] uppercase tracking-wide transition hover:bg-black hover:text-white";

function BackLink() {
  return (
    <Link to="/" state={{ scrollTo: "projects" }} className={BUTTON}>
      ← Back to Projects
    </Link>
  );
}

// Text from the .md file; styles live under .domain-prose in index.css.
function Prose({ html }) {
  if (!html) return null;
  return (
    <div
      className="domain-prose mt-2 text-base leading-7 text-neutral-800 sm:text-[17px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function PagerLink({ project, label, alignRight }) {
  return (
    <div className={`max-w-[45%] ${alignRight ? "text-right" : ""}`}>
      {project && (
        <Link
          to={`/projects/${project.id}`}
          className="group block uppercase tracking-[0.2em] text-neutral-700 hover:text-black"
        >
          {label}
          <span className="mt-1 block text-sm normal-case tracking-normal text-neutral-800 group-hover:underline">
            {project.title}
          </span>
        </Link>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F8F2FA] px-6 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <BackLink />
      </main>
    );
  }

  // Previous/next skip projects that have no detail page yet.
  const linked = projects.filter(hasDetailPage);
  const position = linked.indexOf(project);
  const previous = position > 0 ? linked[position - 1] : undefined;
  const next = position >= 0 ? linked[position + 1] : undefined;

  // Write-up from src/content/projects/<id>.md, if the file exists.
  const { image, stack = [], introHtml = "", topics = [] } = project.page ?? {};

  const links = [
    { label: "GitHub", href: project.github },
    { label: "Demo", href: project.demo },
    { label: "Read More", href: project.readmore },
  ].filter((link) => link.href);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F2FA] px-4 py-6 font-body text-neutral-950 sm:px-6">
      <div className="mx-auto w-full max-w-[900px]">
        <BackLink />

        {/* HEADER: title, stack and links, kept compact so the write-up starts above the fold */}
        <header className="mt-6 text-center">
          <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">{project.title}</h1>

          {stack.length > 0 && (
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-neutral-600">{stack.join(" · ")}</p>
          )}

          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={BUTTON}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Only when the .md file sets `image:` */}
        {image && (
          <div className="mt-6 border-[2px] border-black bg-white">
            <img src={image} alt={project.title} className="block h-auto w-full object-contain" />
          </div>
        )}

        {/* WRITEUP */}
        {(introHtml || topics.length > 0) && (
          <>
            <hr className="mt-6 border-neutral-400" />

            <article className="mx-auto mt-6 max-w-[720px]">
              <Prose html={introHtml} />

              {topics.map((topic) => (
                <section key={topic.id} className="mt-8 first:mt-0">
                  <h2 className="text-xl font-bold">{topic.title}</h2>
                  <Prose html={topic.html} />

                  {topic.subtopics.map((sub) => (
                    <section key={sub.id} className="mt-5">
                      <h3 className="text-lg font-semibold">{sub.title}</h3>
                      <Prose html={sub.html} />
                    </section>
                  ))}
                </section>
              ))}
            </article>
          </>
        )}

        {/* PREV / NEXT */}
        <hr className="mt-10 border-neutral-400" />

        <nav className="mt-5 flex items-start justify-between gap-6 text-xs">
          <PagerLink project={previous} label="← Previous" />
          <PagerLink project={next} label="Next →" alignRight />
        </nav>
      </div>
    </main>
  );
}
