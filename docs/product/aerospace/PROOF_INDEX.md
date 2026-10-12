# Aerospace proof index

**Checked 2026-10-12.** This index describes local draft source and public primary sources. It is **not** a live product-status certificate. New repository remote URLs, final commit SHAs, CI, live pages, public MCP availability, and customer evidence are pending separate verification.

| Claim supported | Source inspected | Limit |
| --- | --- | --- |
| Vendor card's draft wire shape and conservative override rule | `aviation-ml-assurance-card-spec/SPEC.md`, `aviation-ml-card.schema.json` | Local draft; 2B/3A override is a Suite profile, not a universal EASA mandate |
| MRO card's embedded signature and finding decision | `mro-ai-signoff-card-spec/SPEC.md`, `mro-ai-signoff-card.schema.json` | Key binding, staff authorisation, and maintenance release are external |
| Dataset CLI checks and report format | `aero-dataset-provenance-rs/README.md`, `docs/MANIFEST.md`, `src/` | Counts and supplied group IDs do not establish representative coverage or origin |
| Structural PR checks | `aviation-ml-card-fleet-summary-action/README.md`, `dist/index.cjs` | No evidence fetching, full-schema check, or signature/authority verification |
| Informative mapping with source status | `aero-assurance-crosswalk/data/crosswalk.json` | Mapping is an editorial aid, not a conformance decision |
| Planned unified MCP integration | local `mcp-kinetic-gain` aviation review branch | Do not infer availability from the current public package or Glama listing |

These source paths are **repository-name/file** references for the draft package. Public GitHub links belong here only after the new repositories and reviewed branches have been created and read back from the remote.

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

Remote repository publication and CI; a hosted `.well-known` aviation card; a private MCP initialize/list/call/auth/privacy drill; real dataset permission and representativeness review; key registry and revocation; operator staff-authority verification; counsel review for any defense-adjacent use; buyer workflow evidence; measured Ahrefs data. Do not substitute a local test, signature, or source citation for those checks.
