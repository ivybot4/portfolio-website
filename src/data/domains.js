// Domains shown on the homepage and at /domains/:domainId.
// The write-up for each page lives in src/content/domains/<id>.md.
// This file only holds what the homepage card needs.
import { parseDomainMarkdown } from "../lib/parseMarkdown";

const files = import.meta.glob("../content/domains/*.md", { query: "?raw", import: "default", eager: true });

const cards = [
  {
    id: "agentic-systems",
    image: "applied-ai.png",
    alt: "Agentic Systems: tools, MCP, multi-agent, eval harness, guardrails, RAG, prompt engineering",
    title: "Agentic Systems",
  },
  {
    id: "pricing-systems",
    image: "pricing-systems.png",
    alt: "ML Pricing Systems: regression, neural networks, confidence model, markups, A/B tests, retraining, transfer learning",
    title: "ML Pricing Systems",
  },
  {
    id: "on-device-ai",
    image: "on-device.png",
    alt: "LLMs, On-Device AI and Inference: transformers, quantization, multimodal, KV cache, runtimes, GPU performance, fine-tuning",
    title: "LLMs, On-Device AI and Inference",
  },
];

export const domains = cards.map((card) => {
  const source = files[`../content/domains/${card.id}.md`];
  return { ...card, ...(source ? parseDomainMarkdown(source) : { topics: [], stats: [], tags: [] }) };
});

export const findDomain = (id) => domains.find((domain) => domain.id === id);
