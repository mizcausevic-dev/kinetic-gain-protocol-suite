# Aerospace proof index

**Checked 2026-10-12.** Five public aerospace draft repositories and their GitHub Actions results were read back at the exact `main` commits below. This is source and CI evidence, not proof of a hosted aviation service, regulatory acceptance, customer use, or release of the optional MCP tools.

| Public draft | `main` commit checked | Hosted check at that commit | Scope and limit |
| --- | --- | --- | --- |
| [Aviation ML Assurance Card](https://github.com/mizcausevic-dev/aviation-ml-assurance-card-spec) | [`6995c12`](https://github.com/mizcausevic-dev/aviation-ml-assurance-card-spec/commit/6995c12453a5ac588b7d9c1de5d285fed7fe2fe1) | [CI success](https://github.com/mizcausevic-dev/aviation-ml-assurance-card-spec/actions/runs/38275270323) | Draft wire shape and conservative 2B/3A override rule; the rule is a Suite profile, not a universal EASA mandate. |
| [MRO AI Sign-off Card](https://github.com/mizcausevic-dev/mro-ai-signoff-card-spec) | [`c3cf35b`](https://github.com/mizcausevic-dev/mro-ai-signoff-card-spec/commit/c3cf35b8955194266d70eb855b307ddb6c1bd1dd) | [CI success](https://github.com/mizcausevic-dev/mro-ai-signoff-card-spec/actions/runs/38275303866) | Embedded signature and per-finding human decision; key binding, staff authorisation, and maintenance release are external. |
| [Dataset provenance CLI](https://github.com/mizcausevic-dev/aero-dataset-provenance-rs) | [`d708239`](https://github.com/mizcausevic-dev/aero-dataset-provenance-rs/commit/d7082399ea431d327e4c4ac729be8ce840b0a240) | [CI success](https://github.com/mizcausevic-dev/aero-dataset-provenance-rs/actions/runs/38275330570) | Observed file hashes, split leakage, declared ODD-bin counts, and a signable report; counts and supplied group IDs do not establish representative coverage or origin. |
| [Source crosswalk](https://github.com/mizcausevic-dev/aero-assurance-crosswalk) | [`6fb159e`](https://github.com/mizcausevic-dev/aero-assurance-crosswalk/commit/6fb159e16ebc6dd7e3bea9422e85c52069c02320) | [CI success](https://github.com/mizcausevic-dev/aero-assurance-crosswalk/actions/runs/38275830323) | Informative source mapping with status and limitations, not a conformance decision. A live crosswalk page requires separate readback. |
| [Fleet summary Action](https://github.com/mizcausevic-dev/aviation-ml-card-fleet-summary-action) | [`90bad4f`](https://github.com/mizcausevic-dev/aviation-ml-card-fleet-summary-action/commit/90bad4f77c11689e6674f234a1f14c0d79eb6966) | [CI success](https://github.com/mizcausevic-dev/aviation-ml-card-fleet-summary-action/actions/runs/38275397056) | Structural PR checks; no evidence fetching, full-schema check, cryptographic verification, or signer-authority verification. |

The optional [aviation incident profile](https://github.com/mizcausevic-dev/ai-incident-card-spec) is under review in the existing Incident Card repository. The five aviation tools are on a review branch of the existing [MCP server](https://github.com/mizcausevic-dev/mcp-kinetic-gain). Neither should be inferred from the current public package or Glama listing. The twelve established Suite specs and published MCP version remain separately counted in the [manifest](../../../estate/manifest.json).

## Primary sources checked

| Source | What it supports | Status boundary |
| --- | --- | --- |
| [EASA NPA 2025-07](https://www.easa.europa.eu/en/document-library/notices-of-proposed-amendment/npa-2025-07) | Proposed detailed AI trustworthiness specifications; consultation extended to 2026-03-10 | Proposal, not a final approval basis for these cards |
| [FAA Roadmap for AI Safety Assurance, Version I](https://www.faa.gov/aircraft/air_cert/step/roadmap_for_AI_safety_assurance) | FAA's safety-assurance direction and learned/learning distinction | Roadmap, not an applicant-specific certification method |
| [EUROCAE WG-114](https://www.eurocae.net/working-group/wg-114/) | ED-324 work listed as draft, with a 2026-12-31 target as checked | Target dates and text may change; no unpublished objective claim |
| [SAE ARP4754B public description](https://saemobilus.sae.org/standards/arp4754b-guidelines-development-civil-aircraft-systems) | Identifier and scope of civil aircraft/system development guidance | Licensed text and objective IDs were not inspected or reproduced |
| [RTCA DO-178C public overview](https://www.rtca.org/do-178/) | Identifier and public scope of airborne software guidance | Licensed text and objective IDs were not inspected or reproduced |
| [NIST AI RMF 1.0 Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Voluntary risk-management functions | Not aviation certification |
| [EASA continuing-airworthiness rules](https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-continuing-airworthiness?erules-id=ERULES-1963177438-272) | Part-145 certifying-staff and maintenance-release context | Check current revision and specific organisation authorisations before actual use |
| [14 CFR 43.9](https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-43/section-43.9) | U.S. maintenance record content and signer context | U.S. rule; applicability depends on the operation |

## Evidence still missing

A supplier-hosted `.well-known` aviation card; a private MCP initialize/list/call/auth/privacy drill; real dataset permission and representativeness review; key registry and revocation; operator staff-authority verification; counsel review for any defense-adjacent use; buyer workflow evidence; measured Ahrefs data. Do not substitute public CI, a local test, signature, or source citation for those checks.
