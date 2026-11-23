---
stack: Python, PyTorch, Whisper, Transformers, Fine-tuning, Quantization, Android
---
# Problem Statement

1. During in-person conversations display code-switched text on phone with real-time streaming for bilingual accessibility. 
2. An alert notification on phone about specific sounds like a glass breaking, a loud thud, or someone calling out your name or an alias you enter.

# Steps

This project has 2 problem statements.

## Problem Statement 1

Working on the first problem statement requires 3 major steps:
1. Select the best model
    - Zero-shot OpenAI Whisper ASR Model, Qwen3-ASR-0.6B, Trelis Whisper (already fine-tuned on Hinglish data), Srota, Nvidia Nemotron
    - Fine-tune Nvidia Nemotron with OpenSRL 104 Hinglish data (87h, 67+ hours after cleaning)
    - Distilled model with Trelis Whisper as teacher
2. Quantize the best model with a runtime for android devices
3. Real-time audio streaming and ASR

### Methodology

#### Data Cleaning and Analysis

1. Joins the Kaldi files (`segments`, `text`, `utt2spk`, `wav.scp`) into one utterance table and checks IDs and audio format (16 kHz, mono, 16-bit).
2. Splits train/validation by recording (~5% of hours), so no recording is in both.
3. Removes test leaks: recordings shared with the test set and identical transcripts with 3+ words.
4. Drops clips shorter than 0.5 s or longer than 20 s.
5. Finds English words written in Devanagari (e.g. फ़ाइल → file) for conversion to Latin script.
6. Normalizes the transcript text

#### Normalization and Scoring

Every model is scored with the same two modules:

- [utils.py](src/hinglish_asr/utils.py): `Normalizer.normalize` applies the training-data cleaning (NFC, lowercase, punctuation removed, Devanagari loanwords in Latin script). `for_scoring` uses the same cleaning without the loanword mapping, and maps number words 0–100 (English and Hindi) and Devanagari digits to ASCII digits, so "three", "तीन" and "3" match.
- [metrics.py](src/hinglish_asr/metrics.py): corpus-level WER (jiwer), and T-WER, which counts an English word as correct in either script (क्लिक = click) using `data/lists/transliterations.csv`. `score` returns both on normalized text.

### Scoring Fix

The first scoring (v1) ran the loanword mapping on the model output before WER, so कस्टम already matched "custom" and WER always equalled T-WER. The fix (v2):

1. WER is strict: `for_scoring` no longer maps loanwords, so an English word in Devanagari is an error.
2. T-WER uses a new mapping, [transliterations.csv](data/lists/transliterations.csv): every English word in the test references with one or more Devanagari forms, plus all of `loanwords.csv`. Forms that are also normal Hindi words (पास, मेल) are left out. It is built from a review file sorted by word frequency, for a hand check.
3. A Devanagari output word counts as an English word only if that English word is in the same reference, so T-WER is never above WER.
4. Tests cover custom/कस्टम (an error in WER only), a misspelled form, a Hindi word, references against themselves, and T-WER ≤ WER.

### Metrics

#### 1. WER (Word Error Rate)
Minimum number of word changes that make the reference and output equal divided by the number of words in ref

**WER = (S + D + I) / N**

- **S (substitutions):** a wrong word in place of the correct word
- **D (deletions):** a reference word that is missing in the output
- **I (insertions):** an extra word in the output
- **N:** the number of words in the reference

#### 2. T-WER
Transliterated WER has the same formula as WER.

**T-WER = (S + D + I) / N**

The change is that an English word in the reference is correct if the output has it in Latin script or in a correct Devanagari form from the mapping file.

Basically, WER is exact, T-WER is exact but okay without the proper script.

## Fine-Tuning

[nemotron-3.5-asr-streaming-0.6b.ipynb](notebooks/fine-tune/nemotron-3.5-asr-streaming-0.6b.ipynb) fine-tunes all 638M weights of Nemotron 3.5 ASR Streaming 0.6B on the OpenSLR 104 training set (41,531 clips, 67.5 h) in NeMo, following NVIDIA's fine-tuning recipe:

1. Every clip gets the `hi-IN` language prompt.
2. The model's own config is kept: features, SpecAugment, and streaming attention that trains on 4 latencies (80, 320, 560 and 1,120 ms) picked at random. Only the data, optimizer and trainer settings change.
3. AdamW with Noam annealing (peak learning rate 1e-4 after 100 warmup steps), bf16, and batches of 100 s of audio grouped by clip length.
4. Validation WER and T-WER at 560 ms every 1,000 steps. The checkpoint with the lowest WER is kept, and training stops after 3 validations without a lower WER.
5. Checks before training: streaming settings unchanged, `hi-IN` on every clip, the tokenizer covers the labels (8 of 2.1M characters cannot be encoded, all ऩ), and the model can overfit 50 clips (loss 123 → 10).
6. The best checkpoint transcribes the test set at 560 ms and 1,120 ms.


# Results

## Zero-shot

1. Each model transcribes the full OpenSLR 104 test set (2,942 clips, 4.76 h) with no training, one notebook per model in [notebooks/zero-shot/](notebooks/zero-shot/), on a Colab L4 GPU.
2. Outputs are scored with the normalizer and metrics above.
3. [rescore-zeroshot.ipynb](notebooks/analysis/rescore-zeroshot.ipynb) scores the saved outputs again after a scoring fix, with no model run.

| Model | WER | T-WER | Real-time factor |
|---|---|---|---|
| Whisper Hinglish large-v3 (Trelis) | 0.297 | 0.295 | 0.121 |
| Srota | 0.328 | 0.304 | 0.053 |
| Nemotron 3.5 ASR Streaming 0.6B, 1120 ms latency | 0.604 | 0.399 | 0.009 |
| Nemotron 3.5 ASR Streaming 0.6B, 560 ms latency | 0.605 | 0.403 | 0.009 |
| Qwen3-ASR-0.6B | 0.502 | 0.421 | 0.050 |
| Whisper small | 0.934 | 0.908 | 0.234 |

Real-time factor is processing time divided by audio length on the L4, so lower is faster.

- The first scores mapped Devanagari loanwords to English before WER, so WER equalled T-WER. The table uses the fixed scoring: strict WER, and T-WER as in MUCS 2021. Both versions are in [summary.csv](results/summary.csv) (`scoring` v1 and v2).
- Trelis has the lowest WER and T-WER, which supports using it as the distillation teacher.
- Nemotron has the second-highest WER but the third-lowest T-WER: most of its errors are English words in Devanagari (बैकग्राउंड्स for backgrounds), which fine-tuning should fix.
- Nemotron is the fastest by about 5x, and halving its latency to 560 ms barely changes WER or T-WER.
- Whisper small writes English words in Devanagari and loops on about 6% of clips.
- The 3 test clips longer than 30 s have transcripts that do not match their audio, so every model loses some words there.

## Fine-tuned

Training ran for 0.91 h on a Colab A100 (40 GB). Validation WER was lowest at step 3,000 and training stopped at step 6,000.

| Validation, 560 ms | WER | T-WER |
|---|---|---|
| Step 0 (no training) | 0.480 | 0.297 |
| Step 3,000 (best) | 0.224 | 0.223 |

| Test | WER | T-WER |
|---|---|---|
| Nemotron zero-shot, 560 ms | 0.605 | 0.403 |
| Nemotron fine-tuned, 560 ms | 0.392 | 0.390 |
| Nemotron zero-shot, 1120 ms | 0.604 | 0.399 |
| Nemotron fine-tuned, 1120 ms | 0.377 | 0.375 |

- Test WER fell by about a third. The model now writes English words in Latin script, so WER and T-WER are almost equal.
- Test T-WER barely moved (0.403 → 0.390), while validation T-WER fell from 0.297 to 0.223. The validation clips come from the training corpus, so the test scores are the ones to compare.
- The fine-tuned model outputs nothing for 220 test clips at 560 ms (308 at 1,120 ms), against 15 zero-shot. These clips hold 6.7% of the reference words. On the other 2,722 clips, WER is 0.348 and T-WER 0.346 (zero-shot on the same clips: 0.600 and 0.394).
- Many of the empty clips look misaligned: the zero-shot output has words the reference lacks, e.g. reference "हमने यह भी सीखा कि", zero-shot "क्रमबद्ध कैसे करें। हमने यह भी". The cause is not confirmed.
- Fine-tuned Nemotron is still behind Trelis (0.297) and Srota (0.328) on WER.
- The zero-shot rows come from `transformers` with `language=auto`, the fine-tuned rows from NeMo with `hi-IN`, and the check that NeMo reproduces the zero-shot score was not run. The validation table compares the same setup before and after training.


# Future Scope

1. Deploy the model on laptop for live Zoom or Google Meet calls.
2. When Android permits, deploy the model for live calls on Zoom, Meet or WhatsApp video calling on phone.