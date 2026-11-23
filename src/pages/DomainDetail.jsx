import { Link, useParams } from "react-router-dom";
import { findDomain } from "../data/domains";
import OnThisPage from "../components/OnThisPage";
import { Section, SubSection, SubHeading, DomainActions, Lead, Stats, Markdown, BUTTON, SANS } from "../components/editorial";

export default function DomainDetail() {
  const { domainId } = useParams();
  const domain = findDomain(domainId);

  if (!domain) {
    return (
      <main className={`${SANS} min-h-[100dvh] w-full bg-[#faf6f9] px-[6vw] pb-20 pt-7 text-center text-[#141414]`}>
        <Link to="/domains" className={BUTTON}>
          Go Back
        </Link>
        <h1 className="mt-12 text-[clamp(30px,4vw,50px)] font-bold">Domain not found</h1>
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
            <OnThisPage topics={domain.topics} />
          </div>
        </aside>

        <article className="min-w-0">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[#6d6a63]">{domain.title}</p>
          <h1 className="mb-6 text-[clamp(30px,4vw,50px)] font-bold leading-[1.08] tracking-[-0.01em] text-[#141414]">
            {domain.headline}
          </h1>
          <div className="mb-7 h-[1.5px] w-12 bg-[#141414]" />

          <SubHeading items={domain.tags} />
          <DomainActions githubUrl={domain.github} tryUrl={domain.try} />

          <div className="mt-6">
            {domain.introHtml && <Lead html={domain.introHtml} />}
            {domain.stats.length > 0 && <Stats items={domain.stats} />}

            {domain.topics.map((topic) => (
              <Section key={topic.id} id={topic.id} title={topic.title}>
                {topic.html && <Markdown html={topic.html} />}
                {topic.subtopics.map((sub) => (
                  <SubSection key={sub.id} id={sub.id} title={sub.title}>
                    <Markdown html={sub.html} />
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
