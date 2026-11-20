export const experience = [
  {
    company: "Ritchie Bros. / VeriTread",
    date: "Jul 2024 – Present",
    location: "Boston, MA · Remote",
    note: "Ritchie Bros. acquired VeriTread in March 2026.",
    positions: [
      {
        role: "AI/ML Engineer 2",
        date: "Oct 2025 – Present",
        bullets: [
          "Led the development of a production bidding AI agent with LangGraph, AWS Bedrock, Claude Sonnet, and MCP tool orchestration to cut manual bid processing by 65% supporting conversational and CSV inputs",
          "Architected RAG pipelines for the bidding agent to retrieve information from the database not exposed via tools and deployed the agent with FastAPI",
          "Developed an LLM evals and guardrails for the bidding agent across 7 models, 15+ prompts, and 20 scenarios, testing tool selection, groundedness, multi-turn behavior, failure handling, and format compliance",
          "Built a human-in-the-loop handoff layer for an LLM email outreach agent using Claude on AWS Bedrock to classify replies and route edge cases to staff with AI-drafted responses via PostgreSQL job queue and SendGrid",
          "Owned end-to-end machine learning pipelines with PyTorch, LightGBM, and scikit-learn (regressors) to generate price estimations for transporting heavy hauls, increasing quarterly revenue by 20%",
          "Engineered 100+ time-series features and cached recent quotes for a LightGBM confidence model to score price prediction accuracy, enabling stakeholders to set risk thresholds and guardrails on automated quotes",
          "Ran an online A/B test to measure the incremental impact of the pricing model against the legacy pricing procedure that drove the go/no-go launch decision, establishing a 37% lift in acceptance with no revenue degradation",
        ],
      },
      {
        role: "Software Engineer (Machine Learning)",
        date: "Jul 2024 – Oct 2025",
        bullets: [
          "Prompt-engineered Gemini via GCP to extract information from inputs and write SQL queries relevant data from messy enterprise data on Snowflake with 93% execution accuracy on 100+ tests with TypeScript frontend",
          "Deployed pricing models on Amazon SageMaker AI behind a REST API on EKS (Kubernetes), serving real-time predictions to the SaaS platform at p95 latency under 70 ms",
          "Conducted MLOps by automating model retraining with EventBridge and Lambda, maintaining observability across CloudWatch and Datadog, tracking experiments with MLflow, and shipping to dev/QA/prod via Docker and CircleCI",
          "Wrote .NET 8 and C# REST APIs for services enabling reliable SQL-based data access on the backend with JWTAuth",
        ],
      },
    ],
  },
  {
    company: "Realix AI",
    date: "Nov 2024 – Jan 2025",
    location: "Boston, MA · Remote",
    positions: [
      {
        role: "Data Scientist",
        bullets: [
                    "Designed a GPT-4 Turbo RAG pipeline with LlamaIndex and MySQL to convert natural language into executable SQL, streamlining query creation and accelerating analysis turnaround.",
                    "Conducted structured QA with varied question phrasings, achieving consistent SQL accuracy across diverse query formats.",
                    "Automated preprocessing of 500+ transcript files with Python text-cleaning scripts, cutting manual formatting time by 80% and enabling faster ingestion into NLP pipelines.",
                  ],
      },
    ],
  },
  {
    company: "Boston University",
    date: "Jan 2023 – Jan 2024",
    location: "Boston, MA · On-site",
    positions: [
      {
        role: "Graduate Teaching Assistant",
        bullets: [
          "Led discussion sessions and created weekly homework assignments for Foundations of Data Science III.",
          "Explained probability, statistics, Bayesian methods, optimization, and sampling concepts.",
          "Supported Python implementations using pandas, NumPy, SciPy, and scikit-learn.",
        ],
      },
    ],
  },
  {
    company: "Go Girl Organisation",
    date: "Jun 2021 – Jan 2022",
    location: "Delhi, India",
    positions: [
      {
        role: "Data Science Intern",
        bullets: [
          "Hosted data science workshops for a community of 35 aspiring women in tech.",
          "Taught the data science lifecycle, including data collection, wrangling, exploratory data analysis, machine learning prediction, and visualization.",
          "Helped develop a long-term cloud data engineering curriculum covering platforms such as AWS and Azure.",
        ],
      },
    ],
  },
  {
  company: "DoorsTour",
  date: "Mar 2021 – Aug 2021",
  location: "Delhi, India",
  positions: [
    {
      role: "Data Science Intern",
      bullets: [
        "Enhanced website engagement by 23% by using Python for A/B testing and SciPy for statistical analysis.",
        "Collaborated with AWS professionals to streamline migration of MySQL databases for 1,500 users to Amazon S3 using AWS Glue and Athena.",
        "Used Python visualization libraries including Matplotlib and Seaborn to analyze user behavior and inform targeted content strategies.",
      ],
    },
  ],
},
  {
    company: "Nawaazish Crew",
    date: "Feb 2020 – Jan 2021",
    location: "Delhi, India",
    positions: [
      {
        role: "Co-founder",
        bullets: [
          "Co-founded an organization focused on empowerment for women and children in marginalized communities in India.",
          "Led COVID relief initiatives by collaborating with organizations to improve access to affordable healthcare and necessities.",
          "Used data-driven approaches, including clustering-based workflows, to support organizational onboarding and operations.",
        ],
      },
    ],
  },
];