import { useCallback, useEffect, useId, useRef, useState } from "react";
import RichText from "./RichText";

// Logo files live in public/work-exp. Without one, the company name stands in.
function Logo({ item, className = "" }) {
  if (!item.logo) return <p className="text-center text-xl font-bold leading-tight text-neutral-950">{item.company}</p>;
  return (
    <img
      src={`${import.meta.env.BASE_URL}work-exp/${item.logo}`}
      alt={item.company}
      draggable={false}
      className={`h-full w-auto max-w-full object-contain ${className}`}
    />
  );
}

const DRAG_THRESHOLD = 5; // px before a mouse press turns into a drag

// Exactly --per cards fill the row (1 on phones, 2 on tablets, 3 on laptops, 4 on wide screens),
// so the row has the same margin to the left and right screen edges.
const GAP = 20;
const CARD_WIDTH = `calc((100% - (var(--per) - 1) * ${GAP}px) / var(--per))`;

// Distance between neighbouring cards: one card width plus the gap.
function cardPitch(track) {
  const card = track.firstElementChild;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return card ? card.offsetWidth + gap : track.clientWidth;
}

const scrollBehavior = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

function Chevron({ flip }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${flip ? "rotate-180" : ""}`}>
      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A native scroll-snap row: touch, trackpad and keyboard scrolling come from
// the browser. The arrows and mouse-drag are layered on top.
export default function ExperienceCarousel({ items }) {
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const drag = useRef(null);
  const justDragged = useRef(false);
  const [ends, setEnds] = useState({ start: true, end: true });
  const [selected, setSelected] = useState(null);
  const titleId = useId();

  const updateEnds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 1;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setEnds((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  // Fires once on observe and again whenever the row resizes.
  useEffect(() => {
    const ro = new ResizeObserver(updateEnds);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [updateEnds, items]);

  useEffect(() => {
    if (selected) dialogRef.current?.showModal();
  }, [selected]);

  const step = (dir) => {
    const el = trackRef.current;
    el.scrollBy({ left: dir * cardPitch(el), behavior: scrollBehavior() });
  };

  // Mouse drag (touch already scrolls natively). Snapping is switched off while
  // dragging and back on at release, which settles the row on the nearest card.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { id: e.pointerId, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      trackRef.current.setPointerCapture(e.pointerId);
      trackRef.current.dataset.dragging = "true";
    }
    trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const onPointerEnd = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    // Swallow the click that may follow this release, then clear the flag. Browsers
    // don't always send that click, and a leftover flag would eat the next real one.
    justDragged.current = true;
    setTimeout(() => (justDragged.current = false), 0);

    // Pick the card ourselves: re-enabling snap alone sends Chrome back to the
    // card it was on. A drag past ~15% of a card moves at least one card.
    const el = trackRef.current;
    const pitch = cardPitch(el);
    const moved = el.scrollLeft - d.startScroll;
    const cards = Math.max(Math.round(Math.abs(moved) / pitch), Math.abs(moved) > pitch * 0.15 ? 1 : 0);
    const startIndex = Math.round(d.startScroll / pitch);
    delete el.dataset.dragging;
    el.scrollTo({ left: (startIndex + Math.sign(moved) * cards) * pitch, behavior: scrollBehavior() });
  };

  // A drag that ends over a button must not count as a click on it.
  const onClickCapture = (e) => {
    if (justDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
    justDragged.current = false;
  };

  const arrowClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black bg-white/80 text-neutral-950 backdrop-blur-md transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:h-12 sm:w-12";

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Work experience"
        className="relative left-1/2 w-[min(100vw-112px,1210px)] -translate-x-1/2 [--per:1] sm:w-[min(100vw-144px,1210px)] sm:[--per:2] lg:[--per:3] xl:[--per:4]"
      >
        <div
          ref={trackRef}
          onScroll={updateEnds}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          style={{ gap: GAP }}
          className="flex snap-x snap-mandatory scroll-smooth overflow-x-auto py-1 [&>:first-child]:ml-auto [&>:last-child]:mr-auto [scrollbar-width:none] select-none cursor-grab data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <article
              key={`${item.company}-${i}`}
              style={{ width: CARD_WIDTH }}
              className="group relative shrink-0 cursor-pointer snap-start overflow-hidden border-2 border-black bg-white"
            >
              {/* Same hover zoom as the project cards: the content grows inside a fixed border. */}
              <div className="flex h-full flex-col p-4 transition-transform duration-500 motion-safe:group-hover:scale-[1.03] sm:p-5">
                {/* Fixed-height slot so text lines up across logos and plain names. */}
                <div className="flex h-14 items-center justify-center">
                  <Logo item={item} />
                </div>

                <p className="mt-3 self-center bg-[#E8D8F0] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950">
                  {item.date}
                </p>

                <h3 className="mt-2 text-center font-spartan text-lg font-bold leading-tight text-neutral-950">
                  {/* The title is the card's one button; its ::after layer stretches over the whole
                      card, so a click anywhere opens the details while keyboard users get a single stop. */}
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-haspopup="dialog"
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-black"
                  >
                    {item.positions[0]?.role}
                    <span className="sr-only">, {item.company}, view more</span>
                  </button>
                </h3>
                <p className="mt-1.5 font-condensed text-sm font-light leading-[1.4] text-neutral-800">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Nothing to scroll with a single card, so no arrows. */}
        {!(ends.start && ends.end) && (
          <>
            <button type="button" onClick={() => step(-1)} disabled={ends.start} aria-label="Previous experience" className={`${arrowClass} right-full mr-2 sm:mr-4`}>
              <Chevron />
            </button>
            <button type="button" onClick={() => step(1)} disabled={ends.end} aria-label="Next experience" className={`${arrowClass} left-full ml-2 sm:ml-4`}>
              <Chevron flip />
            </button>
          </>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setSelected(null)}
        // Clicks on the backdrop land on the <dialog> itself, not its inner panel.
        onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
        className="m-auto max-h-[90vh] w-[min(94vw,720px)] border-2 border-black bg-white p-0 text-neutral-950 backdrop:bg-black/40"
      >
        {selected && (
          <div className="relative px-5 pb-8 pt-12 sm:px-8">
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-[22px] leading-none transition hover:bg-black hover:text-white"
            >
              &times;
            </button>

            {selected.logo && (
              <div className="mb-5 h-12">
                <Logo item={selected} className="object-left" />
              </div>
            )}

            <h3 id={titleId} className="text-xl font-bold">
              {selected.company}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-600">
              {selected.date} · {selected.location}
            </p>
            {selected.note && <p className="mt-1 text-xs italic text-neutral-600">{selected.note}</p>}

            <div className="mt-5 space-y-5">
              {selected.positions.map((position) => (
                <div key={position.role}>
                  <h4 className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm font-semibold">
                    {position.role}
                    {position.date && <span className="text-xs font-normal text-neutral-600">{position.date}</span>}
                  </h4>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-[13.5px] leading-[1.55] text-neutral-800 marker:text-neutral-400">
                    {position.bullets?.map((bullet) => (
                      <li key={bullet}>
                        <RichText text={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
