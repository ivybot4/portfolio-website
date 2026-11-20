import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findDomain } from "../data/domains";
import { Section, SubSection, SubHeading, DomainActions, BUTTON, SANS } from "../components/editorial";

// The site uses a hash router, so "#topic-1" links would change the route.
// Scroll with JavaScript instead.
function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Highlights the heading the reader is currently in.
function useActiveId(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}

function Sidebar({ topics, activeId }) {
  const link = (id, title, isSub) => (
    <button
      type="button"
      onClick={() => scrollToId(id)}
      aria-current={activeId === id ? "location" : undefined}
      className={`block w-full border-l-2 py-1 text-left transition-colors hover:text-[#8c231f] ${
        isSub ? "pl-6 text-[13px]" : "pl-3 text-[14px] font-medium"
      } ${activeId === id ? "border-[#141414] text-[#141414]" : "border-transparent text-[#6d6a63]"}`}
    >
      {title}
    </button>
  );

  return (
    <nav aria-label="On this page">
      <p className="mb-3 pl-3 text-[12px] font-medium uppercase tracking-[0.12em] text-[#6d6a63]">On this page</p>
      <ul className="space-y-1">
        {topics.map((topic) => (
          <li key={topic.id}>
            {link(topic.id, topic.title, false)}
            <ul>
              {topic.subtopics.map((sub) => (
                <li key={sub.id}>{link(sub.id, sub.title, true)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DomainDetail() {
  const { domainId } = useParams();
  const domain = findDomain(domainId);

  const ids = useMemo(
    () => (domain?.topics ?? []).flatMap((t) => [t.id, ...t.subtopics.map((s) => s.id)]),
    [domain]
  );
  const activeId = useActiveId(ids);

  if (!domain) {
    return (
      <main className={`${SANS} min-h-[100dvh] w-full bg-[#faf6f9] px-[6vw] pb-20 pt-7 text-center text-[#141414]`}>
        <Link to="/domains" className={BUTTON}>
          Go Back
        </Link>
        <h1 className="mt-12 text-[clamp(32px,4.2vw,52px)] font-bold">Domain not found</h1>
      </main>
    );
  }

  return (
    <main className={`${SANS} min-h-[100dvh] w-full bg-[#faf6f9] px-[6vw] pb-20 pt-7 text-[#141414]`}>
      <header className="text-center">
        <Link to="/domains" className={BUTTON}>
          Go Back
        </Link>
      </header>

      <div className="mx-auto mt-12 grid max-w-[1060px] gap-x-14 lg:grid-cols-[220px_minmax(0,780px)]">
        {/* Sidebar: sticky on wide screens, a plain list above the article on smaller ones */}
        <aside className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-8">
            <Sidebar topics={domain.topics} activeId={activeId} />
          </div>
        </aside>

        <article className="min-w-0">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[#6d6a63]">{domain.title}</p>
          <h1 className="mb-6 text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.01em] text-[#141414]">
            {domain.headline}
          </h1>
          <div className="mb-7 h-[1.5px] w-12 bg-[#141414]" />

          <SubHeading items={domain.tags} />
          <DomainActions githubUrl={domain.githubUrl} tryUrl={domain.tryUrl} />

          <div className="mt-12">
            <domain.Intro />

            {domain.topics.map((topic) => (
              <Section key={topic.id} id={topic.id} title={topic.title}>
                {topic.subtopics.map((sub) => (
                  <SubSection key={sub.id} id={sub.id} title={sub.title}>
                    <sub.Body />
                  </SubSection>
                ))}
              </Section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
