import { useEffect, useMemo, useRef, useState } from "react";

// Pinned bar for the homepage. Highlights the section in view and scrolls to a
// section on click. The site uses a hash router, so plain "#id" links would
// change the route; scrolling is done in JavaScript instead.

const BAR_OFFSET = 96; // px: a section counts as "current" once its top passes this line

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      // The last section can never reach the top, so the page bottom selects it.
      if (atBottom) return setActive(ids[ids.length - 1]);

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= BAR_OFFSET) current = id;
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

export default function SectionNav({ items }) {
  // Stable array so the scroll listener isn't re-attached on every render.
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);
  const linkRefs = useRef({});

  // On narrow screens the bar scrolls sideways; keep the active link visible.
  useEffect(() => {
    linkRefs.current[active]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  const goTo = (id) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 border-b border-black/15 bg-[#F0E6F5]/80 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:justify-center sm:gap-2 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              ref={(el) => (linkRefs.current[item.id] = el)}
              onClick={() => goTo(item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className="whitespace-nowrap border border-transparent px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-800 transition hover:border-black aria-[current=location]:border-black aria-[current=location]:bg-black aria-[current=location]:text-white"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
