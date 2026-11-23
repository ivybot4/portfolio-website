import { useEffect, useMemo, useState } from "react";

// "On this page" contents list for the domain and project detail pages.
// `topics` is the parsed .md structure: [{ id, title, subtopics: [{ id, title }] }].
//
// The site uses a hash router, so "#topic-1" links would change the route.
// Scrolling is done in JavaScript instead.

const ACTIVE_LINE = 120; // px: a heading counts as "current" once its top passes this line

function scrollToId(id) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

// Highlights the heading the reader is currently in.
function useActiveId(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // Short last sections never reach the top, so the page bottom selects the last one.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && ids.length) return setActive(ids[ids.length - 1]);

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
      }
      setActive(current);
    };

    // At most one update per frame, however fast scroll events arrive.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

export default function OnThisPage({ topics }) {
  // Stable array so the scroll listener isn't re-attached on every render.
  const ids = useMemo(() => topics.flatMap((t) => [t.id, ...t.subtopics.map((s) => s.id)]), [topics]);
  const activeId = useActiveId(ids);

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
            {topic.subtopics.length > 0 && (
              <ul>
                {topic.subtopics.map((sub) => (
                  <li key={sub.id}>{link(sub.id, sub.title, true)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
