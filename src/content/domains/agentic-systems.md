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
