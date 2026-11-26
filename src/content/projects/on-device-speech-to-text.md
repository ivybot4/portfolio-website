---
stack: Python, PyTorch, Whisper, Transformers, Fine-tuning, Quantization, Android
---
# Problem Statement

1. During in-person conversations display code-switched text on phone with real-time streaming for bilingual accessibility. 

# 

1. **Audio detection and transcription:** Hearing loss rates rise noticeably after ages 45–50 based on clinical studies. A lot of people in that age group are not used to wearing a hearing aid, and find it extremely uncomfortable.
2. **Code-Switched:** The most natural way to read bilingual transcriptions are code-switched texts, especially for a language like Hindi with no standardized Roman representations.
3. **On-device:** The primary demographic for this project lived in India, and most places in India do not have WiFi available at all times. A lot of underground tunnels or remote places sometimes don't have a stable data connection.

# Steps

This project has 2 problem statements.

## Problem Statement 1

Working on the first problem statement requires 3 major steps:
1. Select the best model for converting audio to transcripts
2. Quantize the best model with a runtime for android devices
3. Real-time audio streaming and ASR