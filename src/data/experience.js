// Shown on the homepage carousel: `logo` (file in public/work-exp, optional;
// the company name is shown without one), the latest role (positions[0]),
// `summary` (~30 words) and, under View More, every role and bullet.
export const experience = [
  {
    company: "Ritchie Bros. / VeriTread",
    logo: "ritchie-bros-logo-cropped.jpg",
    summary:
      "Built AI agents and real-time ML pricing models that increased quarterly revenue by 20% and acceptance by 37%.",
    date: "Jul 2024 – Present",
    location: "Boston, MA · Remote",
    note: "Ritchie Bros. acquired VeriTread in March 2026.",
    positions: [
      {
        role: "AI/ML Engineer 2",
        date: "Oct 2025 – Present",
        bullets: [
          "Led the development of a production AI agent that automates shipment planning and pricing, decreasing sales team time per request from 1 hour to under 8 minutes with LangGraph",
          "Owned end-to-end machine learning pipelines for instant freight pricing across the US that increased quarterly revenue by 20% using LightGBM and PyTorch, and built a confidence model that sets risk-based markups and guardrails",
          "Architected agent tools for a CP-SAT (Google OR-Tools), ML pricing models, and embedding-based transport provider recommendations connected to Claude via AWS Bedrock through MCP",
          "Developed LLM evaluations that tested the multi-step workflow of the agent for multi-turn reliability and prompt-injection attacks with concurrent session management and state memory, a FastAPI backend, and a React and TypeScript frontend",
          "Established a 37% lift in instant quote acceptance rate by running an online A/B test for the ML pricing model against legacy algorithmic pricing that drove the launch decision",
          "Launched instant pricing in Canada with limited data with a transfer learning approach that uses a US model and a ratio model that adjusts prices for Canadian shipments",
          "Built a human-in-the-loop handoff layer for an LLM email outreach agent using Claude on AWS Bedrock to classify replies and route edge cases to staff with AI-drafted responses via PostgreSQL job queue and SendGrid",
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
    company: "BU Data Science Mentoring Circle",
    logo: "bu-hariri-logo.png",
    summary:
      "Mentor 3 data science students in weekly one-on-one sessions and teach AI security and prompt injection workshops to 30 mentees.",
    date: "Oct 2026 – Present",
    location: "Remote, US",
    positions: [
      {
        role: "Mentor",
        bullets: [
          "Mentor 3 data science students one-on-one through weekly sessions on portfolio projects and AI/ML theory",
          "Host workshops for 30 mentees on topics like AI Security and prompt injection",
        ],
      },
    ],
  },
  {
    company: "Realix AI",
    logo: "realixai-logo.jpeg",
    summary:
      "Developed a LangChain RAG text-to-SQL pipeline and integrated client databases into an AI assistant that sends emails and Slack messages.",
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
    logo: "bu-ta-logo-cropped.png",
    summary:
      "Managed 2 TAs and 3 graders, wrote all weekly problem sets, and taught probability and Bayesian inference to 150 students.",
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
    company: "Tata Power DDL",
    logo: "tata-power-ddl-logo.jpeg",
    summary:
      "Built a GUI to present Simulink grid models showing high-voltage distribution cuts 20-year costs by 60% and losses by 78%.",
    date: "Dec 2021 – Jan 2022",
    location: "Delhi, India",
    positions: [
      {
        role: "Software Engineer Intern",
        bullets: [],
      },
    ],
  },
  {
    company: "Go Girl Organisation",
    logo: "go-girl-logo.jpeg",
    summary:
      "Hosted data science workshops for 35 women in tech and co-developed a long-term AWS and Azure cloud data engineering curriculum.",
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
  logo: "doorstour-logo-cropped.jpeg",
  summary:
    "Developed PyTorch computer vision models for image segmentation on an AR platform that gives virtual tours of homes and amenities.",
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
    logo: "nawaazish-crew-logo.jpeg",
    summary:
      "Co-founded a 45-volunteer nonprofit and directed COVID-19 relief that raised 2 lakh INR to supply essentials to 100+ underprivileged families.",
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