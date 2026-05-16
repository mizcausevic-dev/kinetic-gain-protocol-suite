# Cross-Model Brief

> **Read this before you scaffold anything in the Kinetic Gain Protocol Suite ecosystem.**

This file exists so that an LLM (Claude, Codex, Gemini, anyone) handed a single repo from the Suite can produce work that *composes* with the rest of the portfolio instead of orphaning. It is the missing prefix that turns a one-shot prompt into a portfolio-aware contribution.

Every Suite repo SHOULD link back here. Repo-level briefs are short addenda; the canonical contract is what's in this file.

---

## 1. What is authoritative — do NOT reinterpret

| Thing | Canonical source | Posture |
| --- | --- | --- |
| The eleven spec documents (AEO, Prompt Provenance, Agent Cards, AI Evidence, MCP Tool Cards, Tutor Cards, Student AI Disclosure, Classroom AI AUP, Clinical AI Disclosure, AI Incident Card, AI Procurement Decision Card) | Each `*-spec` repo's `*.schema.json` + canonical examples | Schemas are stable. New fields are additive. Renaming a field is a breaking change. |
| Discriminator pattern | `<thing>_version` at the top level of every Suite JSON doc | All Suite tooling auto-detects which spec a doc belongs to via this single field. Do not invent alternate detection schemes. |
| Well-known URL paths | `/.well-known/aeo.json`, `/.well-known/agents/<id>.json`, `/.well-known/decisions/<id>.json`, etc. | Path is part of the contract. Do not relocate. |
| Audit-stream contract | [`audit-stream-py`](https://github.com/mizcausevic-dev/audit-stream-py) — `EventKind` Literal + `GovernanceEvent` envelope | Hash-chained, tamper-evident. New event kinds are added by PR to the Literal — do NOT invent parallel hash chains. |
| Canonical-hash convention | SHA-256 over the canonical JSON of the document (sorted keys, no whitespace) | Used by `hash-attestation-rs` for signing and by `audit-stream-py` for chaining. Don't roll your own. |
| Suite vocabulary | See section 3 below | Names matter. They appear in every spec, in spec discriminators, and in the MCP tool surface. |

---

## 2. What's open for reinterpretation

You have freedom to invent in these directions:

- **UI / dashboards / visualizers** — the canonical visualizer is [`kinetic-gain-visualizer`](https://github.com/mizcausevic-dev/kinetic-gain-visualizer); supplemental ones are encouraged. Use the standard Bento + slate-indigo design system (see `docs/design-system.md` once published).
- **Per-language SDKs** — `aeo-sdk-python/typescript/rust/go/swift` is the model. A new spec deserves the same five.
- **Examples + fixtures** — more is more. Real-world EdTech district / HealthTech hospital / Federal agency fixtures, etc.
- **Demo deployments** — a spec landing site at `<subdomain>.kineticgain.com` per spec is the convention.
- **MCP server tool surface** — every spec is eventually exposed as a tool in `mcp-kinetic-gain`. Adding tools is a versioned, additive change.
- **Documentation** — quickstarts, NIST AI RMF crosswalks, vertical playbooks, walkthrough videos.
- **Companion implementations** — Gemini/Codex/whoever may build a TS or Go or Rust sibling of a Python lib for educational comparison purposes. **The Python (or equivalent first-party) version stays the source of truth.**

---

## 3. Vocabulary contract

The Suite uses *specific* nouns. These names appear in JSON schemas, MCP tool names, discriminator field names, and documentation. Do not coin synonyms. Do not overload terms.

| Canonical term | Meaning | Common confusion to avoid |
| --- | --- | --- |
| **The Suite** | The Kinetic Gain Protocol Suite — the 11 specs taken together | "The Suite" never means the implementation stack. The implementation stack is "the Suite Implementation Stack" or "the AEO Reference Stack" etc. |
| **AI Procurement Decision Card** (spec #11) | A *whole buyer-published document* declaring the outcome of a vendor review. Lives at `/.well-known/decisions/<id>.json`. | NOT a single rule inside a runtime bundle. That's a `PolicyRule`. |
| **Decision Card** (shorthand) | Same as above when context is unambiguous. | If the surrounding code talks about "rules", "patterns", "conditions" — those are NOT Decision Cards. They are rules INSIDE a policy bundle that was *derived from* a Decision Card. |
| **PolicyBundle** | A runtime-enforceable collection of rules, typically produced by `policy-as-code-engine` from a single Decision Card's `conditions[]` array. | NOT a Decision Card. NOT a spec. It's the compiled, runtime form. |
| **PolicyRule** | One rule inside a PolicyBundle. Has an id, priority, effect (allow / deny / require_approval), match grammar, and an optional `because` provenance pointer back to the Decision Card condition that produced it. | The visualization layer in the broker dashboard called these "Decision Cards" — that's wrong vocabulary. |
| **Agent Card** | A vendor's published declaration of an AI agent's capabilities + refusal posture. Lives at `/.well-known/agents/<id>.json`. Discriminator: `agent_card_version`. | Not the agent itself. Not the agent's code. Not a runtime registration record. |
| **Tool Card** | An MCP Tool Card — per-tool disclosure of an MCP server's tools. Discriminator: `tool_card_version`. | NOT an Anthropic "tool use" message format. NOT an OpenAI function definition. It's a *disclosure* document. |
| **AEO document** | A vendor's entity declaration at `/.well-known/aeo.json`. Discriminator: `aeo_version`. | Not "the spec." The spec is `aeo-protocol-spec`. The document is what a vendor publishes per the spec. |
| **The broker** | `mcp-permission-broker` — the runtime gate that decides allow/deny/require_approval for an MCP tool call. | NOT a Decision Card editor. NOT a policy generator. Generation is `policy-as-code-engine`'s job. The broker is the enforcement point. |
| **The validator** | `aeo-validator-service` (hosted at `validator.kineticgain.com`) — always-on validator for every Suite spec via discriminator detection. | Not a one-shot CLI. The CLI variants are `aeo-cli` and `kg-validate-action`. |
| **The audit-stream spine** | `audit-stream-py` — the single tamper-evident hash-chained event log every governance moment writes to. | Do not invent parallel logs. Do not embed your own hash chain. Emit `audit_stream_url` POSTs and let the spine do its job. |

---

## 4. What NOT to rebuild

These already exist. If you find yourself reimplementing one, stop and integrate instead.

| Concern | Existing repo |
| --- | --- |
| Hash-chained tamper-evident event log | [`audit-stream-py`](https://github.com/mizcausevic-dev/audit-stream-py) |
| ed25519 signing + verification over canonical-JSON Suite docs | [`hash-attestation-rs`](https://github.com/mizcausevic-dev/hash-attestation-rs) |
| Always-on HTTP validator for every Suite spec | [`aeo-validator-service`](https://github.com/mizcausevic-dev/aeo-validator-service) (hosted at validator.kineticgain.com) |
| BFS crawler over AEO graphs | [`aeo-crawler`](https://github.com/mizcausevic-dev/aeo-crawler) |
| Graph-query layer over crawled AEO output | [`aeo-graph-explorer-rs`](https://github.com/mizcausevic-dev/aeo-graph-explorer-rs) |
| MCP tool surface exposing every Suite spec | [`mcp-kinetic-gain`](https://github.com/mizcausevic-dev/mcp-kinetic-gain) — 47+ tools, one Claude Desktop config entry |
| Unified visualizer that auto-detects which spec via discriminator | [`kinetic-gain-visualizer`](https://github.com/mizcausevic-dev/kinetic-gain-visualizer) |
| Reusable async reliability primitives (Tokio Rust) | [`reliability-toolkit-rs`](https://github.com/mizcausevic-dev/reliability-toolkit-rs) |
| Async server-side feature flags (Rust) | [`feature-flag-rs`](https://github.com/mizcausevic-dev/feature-flag-rs) |
| SLO + error-budget tracking | [`slo-budget-tracker`](https://github.com/mizcausevic-dev/slo-budget-tracker) |

If your spec or library wants any of these capabilities — **add a dependency, don't reinvent**. Decision Card signing? Use `hash-attestation-rs`. A new producer event kind? PR to `audit-stream-py`'s `EventKind` Literal. A graph walk? Use `aeo-graph-explorer-rs`.

---

## 5. Where to look first when starting a sibling implementation

If you are an LLM (or human) handed a single repo from this ecosystem and asked to build a sibling — visualizer, dashboard, alternate-language port, vendor connector — read these in this order before scaffolding anything:

1. **This file** — you're here.
2. **[suite README](README.md)** — the eleven specs, the implementation stack, the cross-ecosystem hooks.
3. **The repo's own `README.md`** — what it does + where it composes.
4. **The discriminator field name** in the schema (`<thing>_version`) — your tooling MUST respect this for auto-detection to work across the Suite.
5. **The producer table in `audit-stream-py/README.md`** — see which event kinds your work should emit + add new ones via PR if needed.
6. **The vocabulary contract above (section 3)** — read it twice. Don't invent synonyms.

---

## 6. Conventions every new repo MUST follow

If you're creating a new repo in the Kinetic Gain org:

1. **License**: spec repos → AGPL-3.0; implementation libraries → MIT (matches `policy-as-code-engine`, `audit-stream-py`, `mcp-permission-broker`).
2. **CI**: Python — ruff lint + ruff format check + mypy strict + pytest on py 3.11/3.12/3.13 (copy `policy-as-code-engine/.github/workflows/ci.yml`). Rust — `cargo fmt --check + cargo clippy -- -D warnings + cargo test`.
3. **Repo metadata**: GitHub **Topics** and **Website** (`homepageUrl`) MUST be set immediately on creation. See sibling repos for the established topic taxonomy.
4. **Audit-stream integration**: optional, opt-in via `AUDIT_STREAM_URL` env var, best-effort POST that never raises. Rust crates put this behind a `--features audit-stream` flag.
5. **Versioning**: semver. v0.1.0 is the first tagged release of a new lib. Specs use `<thing>_version: "0.1"` (no patch in the discriminator).
6. **`docs/ORIGIN.md`** (optional but encouraged): a short note on why this repo exists + which Suite gap it closes.
7. **Discriminator field** (if you're authoring a new spec): `<noun>_version: "0.1"` at the top level. Period. No alternates.

---

## 7. For the human reviewing cross-model output

When a model (Claude / Codex / Gemini / etc.) produces work in this ecosystem, judge it against this brief. Common failure modes to watch for:

- Reimplementing audit hashing instead of using `audit-stream-py`
- Coining new vocabulary ("Decision Card" for a rule, "Agent Manifest" for an Agent Card, etc.)
- Using non-canonical well-known paths
- Building a parallel discriminator detection scheme
- Forgetting to set Topics + Website on the new repo (this one bites consistently)

The fix is rarely a rewrite — it's almost always *renaming + linking to the right canonical dependency*.
