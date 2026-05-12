# Kinetic Gain Protocol Suite

> **A family of ten open JSON specifications for the answer-engine and agent era.**
> Five core specs · three EdTech extensions · one HealthTech extension · one cross-cutting incident-disclosure spec · one unified visualizer · one unified MCP server · **seven live properties on kineticgain.com** · all AGPL-3.0.
>
> Public front door: **[suite.kineticgain.com](https://suite.kineticgain.com)**.

This repository is the **single landing** for the Suite. Each spec lives in its own repo with full normative text, JSON Schema, examples, and a permissive cross-link table. This meta-repo is where you start when you want the map.

---

## 🧭 The suite at a glance

```
┌──────────────────── Core (Answer Engine / Agent layer) ────────────────────┐
│                                                                            │
│  AEO Protocol ──── entity declaration at /.well-known/aeo.json             │
│  Prompt Provenance ─ versioned, lineaged, reviewable LLM prompts          │
│  Agent Cards ───── capability + refusal disclosure for AI agents          │
│  AI Evidence Format ─ structured citations for LLM-generated claims       │
│  MCP Tool Cards ── per-tool disclosure for MCP servers                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ pairs with
                                    ▼
┌──────────────────── EdTech trio (vendor / district / student) ─────────────┐
│                                                                            │
│  AI Tutor Cards ── what an AI tutor does (vendor-side)                    │
│      ↕                                                                     │
│  Classroom AI AUP ─ what AI use is permitted (district / school / course) │
│      ↕                                                                     │
│  Student AI Disclosure ─ what the student actually did (per artifact)     │
│                                                                            │
│  A grader, LMS, or compliance checker joins all three:                    │
│      "Is this submission allowed?" → O(1) lookup.                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌──────────────── HealthTech extension (vendor-side disclosure) ─────────────┐
│                                                                            │
│  Clinical AI Disclosure ── what a healthcare AI system does               │
│  HIPAA / FDA / SaMD posture · bias audits · EHR (FHIR / CDS Hooks)        │
│  references → Agent Card · AI Evidence · AI Incident Card                  │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ when things break
                                    ▼
┌──────────────── Cross-cutting (vendor-published, references all) ──────────┐
│                                                                            │
│  AI Incident Card ── post-incident disclosure ("CVE for AI agents")       │
│  references → Agent / Tutor / Tool Cards · Prompt Provenance · AI Evidence │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📐 Specifications

Every spec carries a top-level `<name>_version` field. The unified visualizer detects which spec a document is in by inspecting that single field.

| Spec | Repo | Detect via | Well-known path |
|---|---|---|---|
| **AEO Protocol** | [`aeo-protocol-spec`](https://github.com/mizcausevic-dev/aeo-protocol-spec) | `aeo_version` | `/.well-known/aeo.json` |
| **Prompt Provenance** | [`prompt-provenance-spec`](https://github.com/mizcausevic-dev/prompt-provenance-spec) | `provenance_version` | — |
| **Agent Cards** | [`agent-cards-spec`](https://github.com/mizcausevic-dev/agent-cards-spec) | `agent_card_version` | `/.well-known/agents/<agent_id>.json` |
| **AI Evidence Format** | [`ai-evidence-format-spec`](https://github.com/mizcausevic-dev/ai-evidence-format-spec) | `evidence_version` | — |
| **MCP Tool Cards** | [`mcp-tool-card-spec`](https://github.com/mizcausevic-dev/mcp-tool-card-spec) | `tool_card_version` | `/.well-known/mcp-tools/<tool_name>.json` |
| **AI Tutor Cards** _(EdTech)_ | [`ai-tutor-card-spec`](https://github.com/mizcausevic-dev/ai-tutor-card-spec) | `tutor_card_version` | `/.well-known/tutors/<tutor_id>.json` |
| **Student AI Disclosure** _(EdTech)_ | [`student-ai-disclosure-spec`](https://github.com/mizcausevic-dev/student-ai-disclosure-spec) | `disclosure_version` | — (travels with the artifact) |
| **Classroom AI AUP** _(EdTech)_ | [`classroom-ai-aup-spec`](https://github.com/mizcausevic-dev/classroom-ai-aup-spec) | `aup_version` | `/.well-known/ai-aup.json` |
| **Clinical AI Disclosure** _(HealthTech)_ | [`clinical-ai-disclosure-spec`](https://github.com/mizcausevic-dev/clinical-ai-disclosure-spec) | `clinical_ai_card_version` | `/.well-known/clinical-ai/<system_id>.json` |
| **AI Incident Card** _(cross-cutting)_ | [`ai-incident-card-spec`](https://github.com/mizcausevic-dev/ai-incident-card-spec) | `incident_card_version` | `/.well-known/ai-incidents/<id>.json` (+ index at `/.well-known/ai-incidents.json`) |

All ten: AGPL-3.0 spec text, freely implementable, v0.1 draft, JSON Schema draft 2020-12, tagged [`kinetic-gain-protocol-suite`](https://github.com/topics/kinetic-gain-protocol-suite).

---

## 🔌 One MCP server. 34 tools. Eight of the nine specs.

[`mcp-kinetic-gain`](https://github.com/mizcausevic-dev/mcp-kinetic-gain) (v0.4.0) is the unified [Model Context Protocol](https://modelcontextprotocol.io) server exposing every runtime Kinetic Gain spec as callable tools. One Claude Desktop / Cursor / MCP-client config entry; 34 tools across eight specs (AI Incident Card is spec-only in v0.4.0; cards are usually authored by humans on incident discovery, so a v0.5 will add `incident_validate` + `incident_inspect` + an `incident_index_fetch` tool).

| Spec | Tools |
|---|---|
| AEO Protocol | `aeo_fetch` · `aeo_inspect` · `aeo_get_claim` · `aeo_well_known_url` |
| Prompt Provenance | `prompt_provenance_validate` · `prompt_provenance_inspect` · `prompt_provenance_eval_result` |
| Agent Cards | `agent_card_well_known_url` · `agent_card_inspect` · `agent_card_tool_disclosure` · `agent_card_validate` |
| AI Evidence Format | `ai_evidence_validate` · `ai_evidence_inspect` · `ai_evidence_verify_hash` |
| MCP Tool Cards | `tool_card_well_known_url` · `tool_card_inspect` · `tool_card_tested_with` · `tool_card_validate` |
| AI Tutor Cards | `tutor_card_well_known_url` · `tutor_card_fetch` · `tutor_card_validate` · `tutor_card_inspect` · `tutor_card_subject_check` · `tutor_card_coppa_check` |
| Student AI Disclosure | `disclosure_validate` · `disclosure_inspect` · `disclosure_verify_artifact_hash` · `disclosure_verify_prompt_hash` · `disclosure_aup_check` |
| Classroom AI AUP | `aup_well_known_url` · `aup_fetch` · `aup_validate` · `aup_inspect` · **`aup_check_compliance`** (headline: joins AUP + Disclosure into a single allow/deny call) |

61 tests pass · typecheck clean · stdio MCP server, drops into any MCP-compatible client.

---

## 🖼️ One visualizer. Eight specs.

[`kinetic-gain-visualizer`](https://mizcausevic-dev.github.io/kinetic-gain-visualizer/) auto-detects the spec from the top-level `*_version` field and renders the appropriate procurement-grade view. Live on GitHub Pages.

- **Visualize** — the auto-detected renderer (FERPA / COPPA / GDPR badges for tutor cards, role-tone pills + artifact-hash binding for disclosures, vendor-requirements card in dark/authority tone for AUPs, etc.)
- **Editor** — paste any spec document and watch the right view light up
- **Architecture** — the 8-spec map
- **Tools** — searchable catalog of all 34 MCP tools
- **About** — detection model + cross-links

---

## 🛡️ Testing artifact

| Repo | What it does |
|---|---|
| [`prompt-injection-bench`](https://github.com/mizcausevic-dev/prompt-injection-bench) | Open 30-attack prompt-injection corpus + Python harness. Every record carries an `agent_card_refusal_categories` back-ref to the [Agent Card](https://github.com/mizcausevic-dev/agent-cards-spec) `refusal_taxonomy[].category` it tests. A vendor can grep their declared categories against the corpus to verify their stated commitments hold under attack — and failed runs become natural inputs for [AI Incident Cards](https://github.com/mizcausevic-dev/ai-incident-card-spec). **Visual harness live at [bench.kineticgain.com](https://bench.kineticgain.com).** |

The bench is **not a tenth spec** — it's the *testing-counterpart* to the disclosure layer. The Suite tells you what an agent should refuse; the bench tells you whether it actually does.

---

## 🌐 Live properties

| URL | What it serves |
|---|---|
| **[suite.kineticgain.com](https://suite.kineticgain.com)** | **Canonical front door for the entire Suite** — 10-spec map, full spec table, two-front-doors section, all 4 live properties (static HTML) |
| [aeo.kineticgain.com](https://aeo.kineticgain.com) | Dedicated AEO Protocol visualizer (React 19 + TypeScript) |
| [tutor.kineticgain.com](https://tutor.kineticgain.com) | AI Tutor Card spec landing — EdTech vertical (static HTML) |
| [clinical.kineticgain.com](https://clinical.kineticgain.com) | **Clinical AI Disclosure spec landing** — HealthTech vertical (static HTML); CMIO / compliance / procurement pitch |
| [bench.kineticgain.com](https://bench.kineticgain.com) | **prompt-injection-bench visual harness** — paste a JSONL transcript, see pass rates by category and severity, critical failures called out. Client-side React + TS. |
| [walker.kineticgain.com](https://walker.kineticgain.com) | **well-known-walker** — type any domain, see every Kinetic Gain disclosure it publishes. Client-side parallel `/.well-known/` probe. Procurement-grade summary. |
| [mizcausevic-dev.github.io/kinetic-gain-visualizer](https://mizcausevic-dev.github.io/kinetic-gain-visualizer/) | Unified visualizer for all eight runtime specs |

---

## 🪜 Quickstart paths

Pick the entry that matches what you want to do:

**I want to declare my entity / agent / tool.**
Start at the relevant spec's `examples/` folder, fork an example, validate against the schema, serve at the well-known URL.

**I want to consume Kinetic Gain documents from an LLM agent.**
Install [`mcp-kinetic-gain`](https://github.com/mizcausevic-dev/mcp-kinetic-gain), add one entry to your Claude Desktop config, get 34 tools.

**I want to see what a document looks like.**
Open the [unified visualizer](https://mizcausevic-dev.github.io/kinetic-gain-visualizer/), pick an example from the Editor view.

**I'm a school district choosing AI vendors.**
Read the [Classroom AI AUP spec](https://github.com/mizcausevic-dev/classroom-ai-aup-spec). Author your AUP. Require [Tutor Cards](https://github.com/mizcausevic-dev/ai-tutor-card-spec) from vendors. Require [Student AI Disclosures](https://github.com/mizcausevic-dev/student-ai-disclosure-spec) from learners. Three JSON documents, two joins, one allow/deny answer per submission.

**I'm a vendor trying to sell into K-12.**
Publish a [Tutor Card](https://github.com/mizcausevic-dev/ai-tutor-card-spec) at `/.well-known/tutors/<id>.json`. A district AUP can then validate your card against its `vendor_requirements` in milliseconds.

**I'm a healthcare AI vendor selling into hospitals.**
Publish a [Clinical AI Disclosure](https://github.com/mizcausevic-dev/clinical-ai-disclosure-spec) at `/.well-known/clinical-ai/<system_id>.json` with your FDA / SaMD / HIPAA / EHR-integration posture. A CMIO can read it in seconds; the bias-audit URI is procurement-blocking for SaMD class II+.

**An agent of mine misbehaved and I need to disclose.**
Publish an [AI Incident Card](https://github.com/mizcausevic-dev/ai-incident-card-spec) at `/.well-known/ai-incidents/<id>.json` and add it to your `/.well-known/ai-incidents.json` index. The card cross-references every other affected document — Agent Card, Tutor Card, Tool Card, Prompt Provenance record, AI Evidence — so a reviewer can walk the document graph in one pass.

**I want to verify my agent's declared refusals hold under attack.**
Run [`prompt-injection-bench`](https://github.com/mizcausevic-dev/prompt-injection-bench) against your agent. Every attack carries an `agent_card_refusal_categories` back-ref to your Agent Card's `refusal_taxonomy[].category` values, so the pass rate per category is direct evidence of whether your stated commitments hold. Drop the result into your Agent Card's `evaluations[]` field.

---

## 📦 AEO Reference Stack (depth example)

The AEO Protocol is the oldest spec in the suite and has the most complete tooling. It's the canonical depth example — every layer you'd want for any spec.

| Layer | Repos |
|---|---|
| **SDKs** | [`aeo-sdk-python`](https://github.com/mizcausevic-dev/aeo-sdk-python) (live on [PyPI](https://pypi.org/project/aeo-protocol/)) · [`aeo-sdk-typescript`](https://github.com/mizcausevic-dev/aeo-sdk-typescript) · [`aeo-sdk-rust`](https://github.com/mizcausevic-dev/aeo-sdk-rust) · [`aeo-sdk-go`](https://github.com/mizcausevic-dev/aeo-sdk-go) · [`aeo-sdk-swift`](https://github.com/mizcausevic-dev/aeo-sdk-swift) |
| **CLI** | [`aeo-cli`](https://github.com/mizcausevic-dev/aeo-cli) — `aeo validate / fetch / inspect / claim` against a live well-known URL |
| **Crawler** | [`aeo-crawler`](https://github.com/mizcausevic-dev/aeo-crawler) — BFS over AEO graphs, JSONL output |
| **MCP server (AEO-only)** | [`mcp-aeo-server`](https://github.com/mizcausevic-dev/mcp-aeo-server) — superseded by `mcp-kinetic-gain` but useful as a single-spec install |

---

## 🤝 Status & contribution

**v0.1 draft across all ten specs.** Stable enough to publish; designed to evolve. Issues and pull requests welcome on any spec repo. Discussion of cross-spec concerns happens here in this meta-repo.

A future v0.2 sweep will probably add: detached cryptographic signing across the family, a `kinetic-gain-protocol-suite` validator that walks document references and joins the EdTech trio, and a conformance suite for MCP servers claiming Kinetic Gain support.

## 📜 License

Specifications, JSON Schemas, examples, and this meta-README: **AGPL-3.0**.
Implementations and supporting sites are unrestricted under their own licenses.

## 👤 Author

**Miz Causevic** · Director / Principal Platform Engineering · Boston, MA
[GitHub](https://github.com/mizcausevic-dev) · [LinkedIn](https://www.linkedin.com/in/mirzacausevic/) · [Kinetic Gain](https://kineticgain.com) · [Medium](https://medium.com/@mizcausevic/) · [Skills](https://mizcausevic.com/skills/)
