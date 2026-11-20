// Domains shown on the homepage and at /domains/:domainId.
// Each page: Intro (lead + stats), then `topics`, which also build the sidebar.
// Topics and subtopics are placeholders for now. The previous write-ups are saved in
// notes/domains-previous-writeups.txt.
import { Lead, Stats, P } from "../components/editorial";

// Shape: [{ id, title, subtopics: [{ id, title, Body }] }]. Ids must be unique within a page.
function placeholderTopics() {
  return [1, 2, 3].map((t) => ({
    id: `topic-${t}`,
    title: `Topic ${t}`,
    subtopics: [1, 2].map((st) => ({
      id: `topic-${t}-${st}`,
      title: `Subtopic ${t}.${st}`,
      Body: () => (
        <P>
          Placeholder text for subtopic {t}.{st}. Replace this with the real write-up.
        </P>
      ),
    })),
  }));
}

export const domains = [
  {
    id: "agentic-systems",
    image: "applied-ai.png",
    alt: "Agentic Systems: tools, MCP, multi-agent, eval harness, guardrails, RAG, prompt engineering",
    title: "Agentic Systems",
    headline: "Production AI Agents for Freight Bidding, Built and Evaluated End to End",
    tags: ["AWS Bedrock AgentCore", "Strands Agents SDK", "Claude Sonnet", "MCP", "RAG", "Evals"],
    Intro: () => (
      <>
        <Lead>
          I led the development of a production agentic bidding chatbot that prices shipments straight from a chat, PDF or
          CSV, grounded in the ML pricing model I built.
        </Lead>

        <Stats
          items={[
            { value: "65%", label: "Less manual bid processing" },
            { value: "7", label: "Models evaluated" },
            { value: "93%", label: "Text-to-SQL accuracy" },
          ]}
        />
      </>
    ),
    topics: placeholderTopics(),
  },
  {
    id: "pricing-systems",
    image: "pricing-systems.png",
    alt: "ML Pricing Systems: regression, neural networks, confidence model, markups, A/B tests, retraining, transfer learning",
    title: "ML Pricing Systems",
    headline: "Freight Pricing Models, from Proof of Concept to Production",
    tags: ["LightGBM", "PyTorch", "scikit-learn", "Amazon SageMaker", "EKS", "A/B Testing"],
    Intro: () => (
      <>
        <Lead>
          As the first ML Engineer at VeriTread, I built the freight price prediction pipeline end to end, from the first
          proof of concept to production models pricing freight across the US and Canada.
        </Lead>

        <Stats
          items={[
            { value: "+20%", label: "Quarterly revenue" },
            { value: "+37%", label: "Quote acceptance (A/B)" },
            { value: "<70 ms", label: "p95 latency" },
          ]}
        />
      </>
    ),
    topics: placeholderTopics(),
  },
  {
    id: "on-device-ai",
    image: "on-device.png",
    alt: "LLMs, On-Device AI and Inference: transformers, quantization, multimodal, KV cache, runtimes, GPU performance, fine-tuning",
    title: "LLMs, On-Device AI and Inference",
    headline: "Fine-tuning and Quantizing Models to Run Where the Data Is",
    tags: ["PyTorch", "Transformers", "Quantization", "Whisper", "Fine-tuning", "Multimodal"],
    Intro: () => (
      <>
        <Lead>
          I fine-tune and quantize models so they run fast and small enough for real-time and on-device use, from speech
          recognition to vision-language models.
        </Lead>
      </>
    ),
    topics: placeholderTopics(),
  },
];

export const findDomain = (id) => domains.find((domain) => domain.id === id);
