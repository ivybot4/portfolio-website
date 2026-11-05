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
                    "Led the development of a production agentic AI bidding chatbot on AWS Bedrock AgentCore with Strands Agents SDK, Claude Sonnet, and MCP tool calling, planning, and orchestration to cut manual bid processing by 65%",
                    "Built multi-step agentic workflows with grounding in a machine-learning pricing model to handle chat, PDF, or CSV requests and answer follow-ups with concurrent sessions, memory, and state management in Python",
                    "Developed an agent evaluation framework to select the best model and test tool selection and hallucinations across 7 models, 15+ prompts, and 20 past user scenarios",
                    "Owned end-to-end machine learning pipelines to price freight across the US using LightGBM, PyTorch, and scikit-learn to increase quarterly revenue by 20% in Python",
                    "Engineered lane-level pickup and drop-off features and 30-day, 90-day, and 1-year lookback tables to capture recent market trends and lane-specific pricing, and iterated on feedback to improve the models",
                    "Expanded pricing to Canada through transfer learning from the US model and a ratio prediction model with limited data",
                    "Engineered 100+ time-series features for a LightGBM confidence model for pricing models, enabling business stakeholders to set risk thresholds and guardrails on automated quotes",
                    "Integrated an LLM application to convert natural language to SQL with a TypeScript UI by prompt-engineering Gemini Flash on GCP to write SQL queries for messy enterprise data from Snowflake with 93% accuracy across 50 test cases"
                  ],
      },
      {
        role: "Software Engineer, Machine Learning",
        date: "Jul 2024 – Sep 2025",
        bullets: [
                    "Implemented .NET 8 and C# API backend services for internal tools across multiple microservices with Docker, CircleCI (CI/CD), and JWT and Vault-based enterprise authentication",

                    "Deployed the pricing models on Amazon SageMaker AI behind a REST API on EKS (Kubernetes) to serve predictions at p95 latency under 70 ms",
                    "Automated monthly model retraining and cloud deployment on AWS with EventBridge pipelines that version model artifacts and update the SageMaker endpoint under CloudWatch and Datadog monitoring",
                    "Engineered 100+ time-series features for a LightGBM confidence model for pricing models, enabling business stakeholders to set risk thresholds and guardrails on automated quotes",
                    "Conducted a live A/B experiment of the ML pricing model against legacy rule-based pricing, showing a 37% lift in quote acceptance rate to facilitate a data-driven launch decision",
                    "Performed deep-dive analysis and built HTML dashboards with Claude Code to communicate findings to a broad audience of business stakeholders and the Sales team, and mentored a new Data Scientist through onboarding"
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