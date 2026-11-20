// add projects here
// all of them show in the Projects section on the homepage
// categories: [] ids from projectFilters at the bottom of this file (drives the filter buttons)
// tagline: the caption on the card image, read out by screen readers
// github / demo: "" greys out that button on the card until a link is added
// readmore: "" hides the Read More button
//
// detail page fields:
// stack: [] array of technologies, rendered as PYTHON · PANDAS · NUMPY
// detailIntro: opening paragraph on the detail page (falls back to homeDescription)
// writeup: [] array of { heading, body, image?, caption? }
//          blank lines inside body become separate paragraphs
//          empty array hides the writeup section entirely
//{
    //id: "project-id",
    //title: "",
    //subtitle: "Python, pandas, numpy, scikit-learn, PyTorch",
    //stack: ["Python", "pandas", "numpy", "scikit-learn", "PyTorch"],
    //image: `${import.meta.env.BASE_URL}book-recommendation.png`,
    //detailImage: `${import.meta.env.BASE_URL}book-recommendation-detail.png`,
    //github: "https://github.com/navyascorner/agentic-book-recommendation",
    //demo: "",
    //readmore: "",
    //homeDescription:
      //"I made a book recommender. It has a conversational layer to ask user preferences with LLMs. It uses that to extract mood signals, which are then fed to a two-tower network I built in PyTorch to retrieve candidate books. These books are then ranked beyond keyword match. Basically, this book recommendation goes 1 layer deeper to suggest you a book you will prefer according to your mood.",
    //detailIntro:
      //"A book recommender that asks what you're in the mood for, then finds books that match the feeling rather than the keywords. A conversational LLM layer extracts mood signals, a two-tower network retrieves candidates, and a reranker orders them.",
    //writeup: [
      //{
        //heading: "The Problem",
        //body: "Most book recommenders match on metadata. You liked a mystery, so here are more mysteries. That works until you want something specific in a way that genre tags cannot express.\n\nWhat I actually wanted was a system that could take something like 'something slow and sad but not hopeless' and return books that fit. That is a mood, not a category, and nothing in a standard collaborative filtering setup has a place to put it.",
      //},
      //{
        //heading: "How It Works",
        //body: "The system has three stages. First, a conversational layer built on an LLM asks a short series of questions and extracts structured mood signals from free-text answers.\n\nSecond, those signals feed a two-tower network I built in PyTorch. One tower encodes the query, the other encodes the books, and both project into a shared embedding space where nearest neighbours are the candidate set.\n\nThird, an LLM reranker takes the top candidates and orders them against the original conversation, catching the cases where embedding similarity and actual fit come apart.",
      //},
      //{
        //heading: "What I Learned",
        //body: "The two-tower architecture was the right call for retrieval speed, but most of the quality came from the reranking stage. Embedding similarity gets you into the right neighbourhood; it does not reliably tell you which of twenty similar books is the one this particular person wants right now.\n\nI also underestimated how much the conversational layer mattered. Early versions asked one question and got vague answers. Asking three short questions instead of one open-ended one produced far cleaner mood signals.",
      //},
      //{
        //heading: "What I'd Do Differently",
        //body: "I would build evaluation in from the start. I was judging output by reading recommendations and deciding whether they felt right, which does not scale and is not honest about whether changes helped.\n\nI would also cache the book tower embeddings properly rather than recomputing them, which is the obvious fix I kept postponing.",
      //},],},

export const projects = [
  {
    id: "book-recommender",
    title: "NoraBot: Book Recommendation",
    subtitle: "Python, PyTorch, Gemini, agentic flow, two-tower model, sentence-transformers, pandas",
    //subtitle: "Python, pandas, numpy, scikit-learn, PyTorch",
    stack: [
      "Python",
      "PyTorch",
      "Gemini",
      "Agentic flow",
      "Two-tower model",
      "Sentence Transformers",
      "Vector embeddings",
      "pandas",
      "NumPy",
    ],
    tagline: "Semantic book recommender with two-tower candidate retrieval and LLM ranker",
    categories: ["ai-applications"],
    image: `${import.meta.env.BASE_URL}book-recommendation.png`,
    detailImage: `${import.meta.env.BASE_URL}book-home.png`,
    github: "https://github.com/ivybot4/book-recommendation",
    demo: "https://ivybot4.github.io/book-recommendation/",
    homeDescription:
      "Agentic book recommender that decides how to retrieve and rank candidates (two-tower hybrid, embedding lookup) based on context given by the user.",
    detailIntro:
      "Agentic book recommender that decides how to retrieve and rank candidates (two-tower hybrid, embedding lookup) based on context given by the user.",
    writeup: [
      {
        heading: "3 Modes on the home page",
        body: "Try as a new user without any prior history. Since user login or authentication is not set up, this is the cold-start experience.\n\nTry as Ivy, a fictional persona with a user history.\n\nSee what the recommender would recommend to someone with an extensive reading history, such as Steve Jobs.",
      },
      //{
        //heading: "cos",
        //body: "b",
      //},
      //{
        //heading: "it is",
        //body: "c",
      //},
      //{
        //heading: "what it is",
        //body: "d",
      //},
    ],
  },
  {
    id: "world-model",
    title: "World Model",
    tagline: "World model from scratch",
    categories: ["from-scratch"],
    image: `${import.meta.env.BASE_URL}projects/world-model.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "on-device-speech-to-text",
    title: "On-device Speech to Text",
    tagline: "Fine-tuned and quantized Whisper model for Hinglish (Hindi + English) speech to text",
    categories: ["on-device", "inference", "fine-tuning"],
    image: `${import.meta.env.BASE_URL}projects/audio-device.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "aviation-vlm",
    title: "Aviation-VLM",
    tagline: "Fine-tuning a VLM to read FAA sectional charts",
    categories: ["ai-applications", "fine-tuning"],
    image: `${import.meta.env.BASE_URL}projects/aviation-llm.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "mini-vllm",
    title: "Mini vLLM from Scratch",
    tagline: "LLM inference engine with paged KV cache and continuous batching",
    categories: ["inference", "from-scratch"],
    image: `${import.meta.env.BASE_URL}projects/inference-eng.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "multimodal-model",
    title: "Multimodal Model",
    tagline: "Multimodal vision-language model (PaliGemma) from scratch",
    categories: ["from-scratch"],
    image: `${import.meta.env.BASE_URL}projects/multimodal.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "adam-optimizer",
    title: "Adam Optimizer",
    tagline: "Different optimizers implemented from scratch",
    categories: ["from-scratch"],
    image: `${import.meta.env.BASE_URL}projects/adam-optimizer.png`,
    github: "",
    demo: "",
    readmore: "",
  },
  {
    id: "wordle",
    title: "Wordle",
    tagline: "Wordle in JavaScript and React",
    categories: ["full-stack"],
    image: `${import.meta.env.BASE_URL}projects/wordle.png`,
    github: "",
    demo: "",
    readmore: "",
  },
];

// Filter buttons above the Projects grid, in this order. A project can be in
// several categories; a filter with no projects in it is hidden automatically.
export const projectFilters = [
  { id: "ai-applications", label: "AI Applications" },
  { id: "inference", label: "Inference" },
  { id: "on-device", label: "On-Device" },
  { id: "fine-tuning", label: "Fine-Tuning" },
  { id: "from-scratch", label: "From Scratch" },
  { id: "full-stack", label: "Full-Stack" },
];

// Only projects with a write-up get a detail page (and a Details button).
export const hasDetailPage = (project) =>
  Boolean(project.detailIntro || project.homeDescription || project.writeup?.length);
