---
headline: Building Agentic Systems
tags: LangGraph, LangChain, MCP, RAG, Evals
github:
try:
stats:
  - 65% | Less manual bid processing
  - 93% | Text-to-SQL accuracy
---

I led the development of a production agentic bidding chatbot that prices shipments straight from chat or CSV, grounded in the ML pricing model I built. It runs on LangGraph and Claude via AWS Bedrock, and I also built its eval harness and guardrails, which I red-teamed against prompt injection.

# An AI Agent

An agent is a model that runs in a loop, uses tools, and keeps memory.

This is before 2023. Let’s say you are moving cities. You make a list of apartment listings, prices, amenities, etc on Zillow. Then you request a tour, email brokers, and call people to schedule them. You then put the details of the schedule on your Calendar.

But now, you give the descriptions of the apartments you liked to Claude, ChatGPT, or Gemini. Let’s call them chatbots that use models. It ranks them. You request a tour, and when brokers email you, you ask a model to write a reply. Great, you have used a model to generate text.

With an agent, you can automate 90% of all of this work. The model will find apartment listings, score and rank them, email brokers on your behalf, check your calendar, schedule a tour, and then add that tour detail to your calendar. If a broker does not reply, the agent will send a follow-up email.

If you imagine a model as a very sophisticated neural network, think of an agent as giving that brain hands or “tools”.

# Multi-agent Systems

In multi-agent systems, more than 1 AI agent work together to achieve a task.

## Framework: CrewAI

This is one of the most common open-source framework for creating multi-agent systems.

`from crewai import Agent, Task, Crew`

The import statement to use CrewAI shows that it uses 3 main components - agent, task, and crew.

A Crew is a team of agents. In *Deeplearning.ai's Multi AI Agent Systems with Crew AI*, the instructor suggests that agents perform better when they have a backstory, and so while defining an agent, it is a good idea to include a backstory. So, in a crew, each agent must have a role, a goal, and a backstory. The role is the area of expertise of the agent. The goal tells the agent what to achieve. The backstory gives context that changes how the agent behaves. Each agent can also use tools.

There are ways a Crew does a task. The first one is a sequential process or a fixed order. The other method or the hierarchical process uses a manager agent to plan the work that assigns the tasks, examines and reviews the results.

A Flow controls the full application. It keeps the state, starts steps from events, and calls a Crew when a step needs teamwork.