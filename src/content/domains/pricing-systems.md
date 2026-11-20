---
headline: ML Systems for Pricing
tags: LightGBM, PyTorch, scikit-learn, AWS, EKS, A/B Testing, Docker, APIs
stats:
  - +20% | Quarterly revenue
  - +37% | Quote acceptance (A/B)
  - <70 ms | p95 latency
---

As the first ML Engineer at VeriTread, I built the freight price prediction pipeline end to end, from the first proof of concept to production models pricing freight across the US and Canada.

# Machine Learning Pricing Systems

Building a pricing system is not limited to building a regression (or time-series) model that has a low average error and is deployed with FastAPI/Streamlit. 

A good system design involves pricing, finding patterns where it fails, using other models or combinations to fix those patterns, confidence models for each quote, A/B testing before pushing to prod, and selecting margins based on polynomial representation or A/B tests. Deployment to reduce latency, increase throughput, proper authentication, health checks, and deployment on cloud platforms like AWS or GCP with proper Docker containers or Kubernetes cluster integrations of the frontend/backend are also important.

