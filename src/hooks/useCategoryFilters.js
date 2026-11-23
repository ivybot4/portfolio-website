import { useState } from "react";

// Filter state for <CategoryFilters>. Each item lists the filter ids it
// belongs to in `categories`. White filters pick a topic; the grey sub-filters
// under them narrow it. A filter or sub-filter that matches nothing is hidden.

const inCategory = (id) => (item) => item.categories?.includes(id);

// Returns the items to show and the props for <CategoryFilters>.
export function useCategoryFilters(items, filters, subFilters) {
  const [filter, setFilter] = useState("all");
  const [subFilter, setSubFilter] = useState(null);

  const filtered = filter === "all" ? items : items.filter(inCategory(filter));
  const shown = subFilter ? filtered.filter(inCategory(subFilter)) : filtered;

  return {
    shown,
    filterProps: {
      filters: [{ id: "all", label: "All" }, ...filters.filter((f) => items.some(inCategory(f.id)))],
      subFilters: subFilters.filter((f) => filtered.some(inCategory(f.id))),
      filter,
      subFilter,
      count: shown.length,
      selectFilter: (id) => {
        setFilter(id);
        setSubFilter(null);
      },
      // Clicking the active sub-filter again clears it.
      toggleSubFilter: (id) => setSubFilter((current) => (current === id ? null : id)),
    },
  };
}
