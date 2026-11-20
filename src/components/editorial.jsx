// Editorial building blocks for domain writeup pages.
// Fonts are loaded in src/index.css (Newsreader, Inter).

const SERIF = "[font-family:'Newsreader',Georgia,serif]";
const SANS = "[font-family:'Inter',system-ui,-apple-system,sans-serif]";

const BUTTON =
  "inline-block border border-[#222222] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.05em] text-[#141414] transition hover:bg-[#222222] hover:text-white";

// Intro text (everything before the first # heading in the .md file).
export function Lead({ html }) {
  return (
    <div
      className={`${SERIF} domain-prose mb-10 text-[clamp(19px,1.8vw,22px)] leading-[1.55] text-[#242424]`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Body text from the .md file; styles live under .domain-prose in index.css.
export function Markdown({ html }) {
  return (
    <div
      className={`${SANS} domain-prose text-[16px] leading-[1.75] text-[#242424]`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// `id` lets the sidebar link to a section; scroll-mt keeps the heading clear of the top edge.
export function Section({ id, title, children }) {
  return (
    <section id={id} className="mt-14 scroll-mt-8">
      <h2 className={`${SANS} mb-5 text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.15] text-[#141414]`}>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function SubSection({ id, title, children }) {
  return (
    <section id={id} className="mt-8 scroll-mt-8">
      <h3 className={`${SANS} mb-3 text-[clamp(18px,1.8vw,21px)] font-semibold leading-[1.3] text-[#141414]`}>
        {title}
      </h3>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function SubHeading({ items }) {
  return (
    <p className={`${SANS} text-[12px] font-medium uppercase leading-6 tracking-[0.12em] text-[#6d6a63]`}>
      {items.join(" | ")}
    </p>
  );
}

// Renders nothing when no links are given.
export function DomainActions({ githubUrl, tryUrl }) {
  const all = [
    githubUrl && { label: "GitHub", href: githubUrl },
    tryUrl && { label: "Try Here!", href: tryUrl },
  ].filter(Boolean);

  if (all.length === 0) return null;

  return (
    <div className={`${SANS} mt-5 flex flex-wrap gap-3`}>
      {all.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={BUTTON}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function Stats({ items }) {
  return (
    <div
      className="my-8 grid grid-cols-1 border-y border-[#222222] sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
      style={{ "--cols": items.length }}
    >
      {items.map((stat) => (
        <div
          key={stat.label}
          className="border-b border-[#222222]/20 px-2 py-5 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
        >
          <p className={`${SERIF} text-[clamp(30px,3.6vw,42px)] font-bold leading-none text-[#141414]`}>
            {stat.value}
          </p>
          <p className={`${SANS} mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#6d6a63]`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export { SANS, BUTTON };
