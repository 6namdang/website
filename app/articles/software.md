---
title: "Why GPT-2-Small Fails at Simple Math: A Circuit-Level Investigation"
category: "AI"
date: "08-29-2025"
---

# Why GPT-2-Small Fails at Simple Math: A Circuit-Level Investigation

I recently dug into a strange, specific bug in GPT-2-small. When you ask it to compare two decimal numbers like "9.11 and 9.8," it consistently and confidently answers that 9.11 is bigger. It prefers the first number, regardless of its actual value.

This wasn't just a random error; it was a systematic failure. My goal was to move past just *observing* this bug and to pinpoint the exact internal "circuit" causing it.

My initial hypothesis was simple: there must be a single, lazy attention head in a late layer that just "attends to and copies the first number".

As it turns out, I was completely wrong. The real mechanism was far more complex.


## The Investigation: From a Simple Bug to a Competing Circuit

I used a process called **causal tracing**, which is a bit like performing targeted brain surgery on the model. I would run a "corrupted" prompt (like "9.11 and 9.8") and then "patch" in activations from a "clean" prompt (like "9.8 and 9.11") at different layers to see which patch *flipped the model's answer*.

### Finding 1: It's a "Battleground," Not a Single Actor

My first experiment immediately falsified my "single head" hypothesis. The results showed the computation was distributed across *multiple* layers:
* **Layers 5 and 9** showed strong *corrective* effects (patching them pushed the model toward the right answer).
* **Layer 10** showed a strong *negative* effect (patching it actually *reinforced the error*).

This wasn't a single lazy component; it was a multi-component system with internal competition.

### Finding 2: Meet the "Oligarchy" of Heads

The next step was to zoom in from *layers* to individual *attention heads* within those layers. This revealed a small "oligarchy" of specific heads responsible for the logic:

* **L9H9: The "Difference-Finder"**. This was the primary actor, contributing the most significant corrective effect.
* **L5H1: The "Mover"**. This head provided a secondary corrective push.
* **L10H2: The "Suppressor"**. This was the culprit from Layer 10, implementing a competing heuristic that reinforced the *wrong* answer.

### Finding 3: It's a Text Heuristic, Not a Calculator

So, what was the most important head, L9H9, actually *doing*? I visualized its attention patterns and found it wasn't performing numerical comparison at all.

Instead, it was executing a sophisticated, text-based **"difference-finding" algorithm**.

When processing the token '8' in "...9.11 and 9.8...", it paid almost all its attention to the '11' in the first number, while ignoring the shared parts like '9.'. It seems to use this algorithm to find the first non-matching tokens and then implement a simple positional bias: "attend to the first number".


## The Plot Twist: A Deeper Hierarchy

I thought I had the main components, but the circuit was deeper than I realized. When I tried to apply my fix to a new prompt ("6.11 vs 6.8"), it suddenly **failed**.

This failure was a crucial clue. It forced me to look for *upstream* components that might be failing *before* L9H9 even got to do its job. This led to two more discoveries:

1.  **L6H11: The "Grouping" Head.** This head's job seems to be grouping the decimal point with the digits (like '.' and '11'). In the failing "6.x" case, this head's activity was dramatically weaker than in the working "9.x" case. If this head fails to "group" the number correctly, the downstream L9H9 "difference-finder" breaks.
2.  **L2H2: The "Binding" Head.** Even earlier, I found a head in Layer 2, L2H2, whose entire job seems to be binding the integer part to the decimal part (like '9' to '.11') to form a single, unified number concept in the first place.

The real mechanism wasn't just a few heads; it was a **multi-stage, hierarchical pipeline**:
1.  **L2H2** binds tokens into a number concept.
2.  **L6H11** groups the decimal components.
3.  **L9H9 & L5H1** execute the "difference-finding" heuristic.
4.  **L10H2** competes with them, pushing a different (incorrect) bias.


## The Final Experiment: Surgical Repair

With the full 5-head circuit identified (L2H2, L6H11, L5H1, L9H9, L10H2), it was time for the final test.

I performed a **cross-context activation patch**. I cached the "clean" activations from these five heads on a *completely different* prompt ("5.8 vs 5.1") and then transplanted them into *all* my "corrupted" test cases ("8.11 vs 8.8", "7.11 vs 7.8", etc.).

The result? **A 100% success rate**. The intervention successfully repaired the error in all 8 test cases, flipping the model's answer from incorrect to correct with massive statistical significance (p < 0.001).

## What This All Means

This investigation demonstrates that a specific, systematic error in a language model can be traced to a complex, hierarchical circuit of competing components.

More importantly, it shows that once this circuit is identified, we can perform **surgical interventions** to reliably repair the failure. We moved from a simple behavioral observation ("the model gets this wrong") to a causal, mechanistic intervention ("patching these five heads fixes it every time").

While this study was narrowly focused on one error, it provides a concrete template for how we can dissect and debug the "black box" of these powerful models, one circuit at a time.