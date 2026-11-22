---
stack: Python, PyTorch, Whisper, Transformers, Fine-tuning, Quantization, Android
---

# The Problem

Most speech recognition models assume one language per sentence. Hinglish does not work that way: a single sentence can start in Hindi, switch to English for a few words, and switch back.

Most transcription also runs in the cloud, so it needs a connection and sends your audio to a server. I wanted captions that keep up with someone talking, handle both languages in the same sentence, and never leave the phone.

# How It Works

**Fine-tuning:** Whisper is adapted on code-switched Hinglish audio so it handles language switches inside a sentence instead of picking one language for the whole clip.

**Quantization:** the fine-tuned model is compressed to a smaller size so it fits within the memory and compute limits of an Android device.

**Real-time streaming:** audio from the microphone is transcribed as it arrives, producing code-switched captions on the device while the person is still speaking.