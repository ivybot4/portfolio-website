import { marked } from "marked";

// Turns a domain .md file into { headline, tags, github, try, stats, introHtml, topics }.
//
//   ---                      <- settings block (optional)
//   headline: ...
//   tags: A, B, C
//   stats:
//     - 65% | Less manual bid processing
//   ---
//   Intro paragraph(s)       <- shown in large serif text under the title
//   # Topic                  <- sidebar topic + section heading
//   Optional topic text
//   ## Subtopic              <- sidebar subtopic + subheading
//   Text, lists, links, images...
export function parseDomainMarkdown(source) {
  const { meta, body } = splitFrontmatter(source);
  const tokens = marked.lexer(body);
  const render = (list) => renderTokens(list, tokens.links);

  const usedIds = new Set();
  const intro = [];
  const topics = [];
  let topic = null;
  let subtopic = null;

  for (const token of tokens) {
    if (token.type === "heading" && token.depth <= 2) {
      const section = { id: uniqueId(token.text, usedIds), title: token.text, tokens: [] };

      if (token.depth === 1 || !topic) {
        topic = { ...section, subtopics: [] };
        topics.push(topic);
        subtopic = null;
      } else {
        subtopic = section;
        topic.subtopics.push(subtopic);
      }
      continue;
    }

    (subtopic ?? topic ?? { tokens: intro }).tokens.push(token);
  }

  return {
    // A blank `key:` line parses as an empty list, so only accept text here.
    headline: text(meta.headline),
    tags: splitList(meta.tags),
    github: text(meta.github),
    try: text(meta.try),
    stats: (Array.isArray(meta.stats) ? meta.stats : []).map((line) => {
      const [value, ...label] = line.split("|");
      return { value: value.trim(), label: label.join("|").trim() };
    }),
    introHtml: render(intro),
    topics: topics.map((t) => ({
      id: t.id,
      title: t.title,
      html: render(t.tokens),
      subtopics: t.subtopics.map((s) => ({ id: s.id, title: s.title, html: render(s.tokens) })),
    })),
  };
}

function renderTokens(list, links) {
  if (!list.some((t) => t.type !== "space")) return "";
  const html = marked.parser(Object.assign([...list], { links }));
  // External links open in a new tab.
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

// Minimal settings parser: `key: value` lines, plus `key:` followed by `  - item` lines.
function splitFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: source };

  const meta = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      meta[listKey].push(item[1].trim());
      continue;
    }
    const pair = line.match(/^([\w-]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value === "") {
      meta[key] = [];
      listKey = key;
    } else {
      meta[key] = value.trim();
      listKey = null;
    }
  }
  return { meta, body: source.slice(match[0].length) };
}

function text(value) {
  return typeof value === "string" ? value : "";
}

function splitList(value) {
  if (Array.isArray(value)) return value;
  return (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

function uniqueId(text, used) {
  const base =
    text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}
