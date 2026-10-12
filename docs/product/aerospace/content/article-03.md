# Dataset leakage and ODD coverage need different checks

**Status:** Draft for review, 2026-10-12. Proposed primary queries: `aviation ML dataset leakage` and `operational design domain coverage dataset`; search metrics **Not measured**. Reader: ML validation engineer. Intent: understand reproducible data checks and their limits. Business objective: test the offline Rust tool as an evidence-preparation aid.

**Supporting entities:** train/validation/test split; SHA-256; acquisition group; UTC temporal boundary; ODD bin. **Product connection:** draft `aero-dataset-provenance-rs` CLI. **Publication gate:** reviewed code, public repository and CI, and a reproduced synthetic fixture.

A model can appear to perform well when the validation set quietly contains the same underlying material as training. A file copied into two splits is an obvious leak. Two differently cropped frames from the same inspection session are harder: their bytes differ, but their origin is related. Dataset checks need to expose both what the tool can detect and what depends on the dataset owner's metadata.

The draft offline Rust tool takes a strict JSON manifest and an absolute dataset root. The manifest lists each sample's relative path, split, pseudonymous acquisition-group ID, optional UTC capture time, and declared operational design domain (ODD) values. The CLI hashes the exact observed file bytes, compares hashes across train, validation, and test, and flags supplied group IDs that cross splits. If the author declares a time boundary, it also checks whether training captures precede the boundary and evaluation captures follow it.

ODD coverage is a separate calculation. The manifest declares dimensions and bins, such as a synthetic `lighting` dimension. The tool counts validation and test samples in each bin and reports gaps against a **threshold chosen by the manifest author**. A bin count of ten is a count. It does not establish that ten samples are independent, representative, correctly labelled, or enough for the system's safety case. An unknown or missing bin value is reported rather than silently counted as coverage.

The report is deterministic for stable input bytes and a stable manifest. It includes file hashes, the canonical manifest hash, leakage findings, time-split status, ODD counts, and a `declared_checks_passed` boolean. That boolean covers exactly the declared checks. It does not authenticate where the files came from or grant rights to use them. A detached signature can bind the report through the `hash-attestation` v0.2 format; the key's owner, revocation status, and custody require an external trust system.

The tool is deliberately local. It does not upload files to a hosted service. It rejects parent-path traversal and symlink or reparse-point sample paths, caps manifest and file sizes, and refuses to overwrite an existing report. Those controls reduce common intake mistakes. They cannot prevent a hostile process from replacing files during a read, so release evidence should come from an immutable snapshot under controlled permissions. Reports can contain sample IDs and relative paths; review them before sharing.

For a useful synthetic rehearsal, put identical bytes in train and validation and observe an exact-leakage finding. Give two distinct files the same group ID across splits and observe a group-leakage finding. Then leave one declared ODD bin below the chosen minimum and inspect the gap. The resulting report should point a human toward the right questions: which acquisition session did these samples come from, how was it partitioned, and does the evidence support the intended operating conditions?

The Aviation ML Assurance Card can reference the report as data-management evidence. The card validator does not rerun the dataset analysis. A reviewer should examine the report, the underlying manifest, and the controlled dataset separately before using them in an assurance argument.

**CTA for publication:** Reproduce the fictional fixture in the reviewed Rust repository, then compare the report's stated limits with your own dataset-control procedure.

**Internal links:** [One-sheet](../ONE_SHEET.md), [vendor disclosure](article-01.md), [proof index](../PROOF_INDEX.md). **Schema opportunity:** `Article` and, after a verified release, factual `SoftwareApplication` metadata without ratings. **Channel adaptation:** Put the exact/group/ODD distinction in the kineticgain.com explainer, an engineering walk-through on Medium, and the [social derivatives](social-derivatives.md) elsewhere.
