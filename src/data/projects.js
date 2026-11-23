import { parseProjectMarkdown } from "../lib/parseMarkdown";

const files = import.meta.glob("../content/projects/*.md", { query: "?raw", import: "default", eager: true });

const cards = [
  {
    id: "on-device-speech-to-text",
    title: "On-Phone Accessbility: Bilingual Captions and Distress Sound Alerts",
    tagline: "Fine-tuned and quantized Whisper model for Hinglish (Hindi + English) speech to text",
    categories: ["on-device", "inference", "audio", "python"],
    image: `${import.meta.env.BASE_URL}projects/audio-device.png`,
    github: "https://github.com/ivybot4/on-device-hinglish-asr",
    demo: "",
    readmore: "",
  },
  {
    id: "book-recommender",
    title: "NoraBot: Book Recommendation",
    tagline: "Semantic book recommender with two-tower candidate retrieval and LLM ranker",
    categories: ["ai-engineering", "recommenders", "python"],
    image: `${import.meta.env.BASE_URL}projects/book-recommendation.png`,
    github: "https://github.com/ivybot4/book-recommendation",
    demo: "",
  },
  /*{
    id: "mini-vllm",
    title: "Mini vLLM from Scratch",
    tagline: "LLM inference engine with paged KV cache and continuous batching",
    categories: ["inference", "from-scratch", "python"],
    image: `${import.meta.env.BASE_URL}projects/inference-eng.png`,
    github: "",
    demo: "",
    readmore: "",
  },

    {
    id: "world-model",
    title: "World Model",
    tagline: "World model from scratch",
    categories: ["from-scratch", "python"],
    image: `${import.meta.env.BASE_URL}projects/world-model.png`,
    github: "",
    demo: "",
    readmore: "",
  },

  {
    id: "aviation-vlm",
    title: "Aviation-VLM",
    tagline: "Fine-tuning a VLM to read FAA sectional charts",
    categories: ["ai-engineering", "python", "multimodal"],
    image: `${import.meta.env.BASE_URL}projects/aviation-llm.png`,
    github: "https://github.com/ivybot4/finetuning-multimodal-aviation",
    demo: "",
    readmore: "",
  },
  {
    id: "multimodal-model",
    title: "Multimodal Model",
    tagline: "Multimodal vision-language model (PaliGemma) from scratch",
    categories: ["from-scratch", "python"],
    image: `${import.meta.env.BASE_URL}projects/multimodal.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "adam-optimizer",
    title: "Adam Optimizer",
    tagline: "Different optimizers implemented from scratch",
    categories: ["from-scratch", "python"],
    image: `${import.meta.env.BASE_URL}projects/adam-optimizer.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  
  { something with LLM judge and AI Engineering}
  an interactive platform to learn dsa by building games
  like build minesweeper to learn bfs
  
  */
];

// `page` holds the parsed .md write-up: { stack, introHtml, topics }.
export const projects = cards.map((card) => {
  const source = files[`../content/projects/${card.id}.md`];
  return source ? { ...card, page: parseProjectMarkdown(source) } : card;
});

// Filter buttons above the Projects grid, in this order. A project can be in
// several categories; a filter with no projects in it is hidden automatically.
export const projectFilters = [
  { id: "ai-engineering", label: "AI Engineering" },
  { id: "inference", label: "Inference" },
  { id: "on-device", label: "On-Device" },
  { id: "from-scratch", label: "From Scratch" },
  { id: "games", label: "Games" },
];

// Second, smaller grey row of filters under projectFilters.
export const projectSubFilters = [
  { id: "python", label: "Python" },
  { id: "audio", label: "Audio" },
  { id: "recommenders", label: "Recommenders" },
  { id: "multimodal", label: "Multimodal"}
];

// Only projects with a write-up get a detail page (and a Details button).
export const hasDetailPage = (project) => Boolean(project.page);
