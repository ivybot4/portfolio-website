// Topic filter buttons for the Projects section.
// State and the list of items to show come from useCategoryFilters.

const FILTER_BUTTON =
  "border border-black bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-950 transition hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white";
const SUB_FILTER_BUTTON =
  "border border-neutral-400 bg-neutral-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-600 transition hover:border-neutral-600 hover:bg-neutral-600 hover:text-white aria-pressed:border-neutral-600 aria-pressed:bg-neutral-600 aria-pressed:text-white";

// `noun` names the items for screen readers, e.g. ["project", "projects"].
export default function CategoryFilters({ noun, filters, subFilters, filter, subFilter, count, selectFilter, toggleSubFilter }) {
  const [one, many] = noun;
  return (
    <>
      <div className="mb-10 flex flex-col items-center gap-3">
        <div role="group" aria-label={`Filter ${many}`} className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => selectFilter(f.id)}
              aria-pressed={filter === f.id}
              className={FILTER_BUTTON}
            >
              {f.label}
            </button>
          ))}
        </div>

        {subFilters.length > 0 && (
          <div role="group" aria-label={`Narrow ${many}`} className="flex flex-wrap justify-center gap-2">
            {subFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleSubFilter(f.id)}
                aria-pressed={subFilter === f.id}
                className={SUB_FILTER_BUTTON}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {count} {count === 1 ? one : many}
      </p>
    </>
  );
}
