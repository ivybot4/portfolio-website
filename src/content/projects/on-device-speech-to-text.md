---
stack: Python, PyTorch, Whisper, Transformers, Fine-tuning, Quantization, Android
---
# Problem Statement

1. During in-person conversations display code-switched text on phone with real-time streaming for bilingual accessibility. 
2. An alert notification on phone about specific sounds like a glass breaking, a loud thud, or someone calling out your name or an alias you enter.

# Decisions and features

1. **Speech translation:** Hearing loss rates rise noticeably after ages 45–50 based on clinical studies.
2. **Code-Switched:** The most natural way to read bilingual transcriptions are code-switched texts, especially for a language like Hindi with no standardized Roman representations.

# Steps

This project has 2 problem statements.

## Problem Statement 1

Working on the first problem statement requires 3 major steps:
1. Select the best model for converting audio to transcripts
2. Quantize the best model with a runtime for android devices
3. Real-time audio streaming and ASR