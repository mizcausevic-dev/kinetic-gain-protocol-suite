# Aerospace Suite extension | product summary

**Dated status:** 2026-10-12 public draft sources. Five aerospace repositories were read back with exact-commit CI results in the [proof index](PROOF_INDEX.md). This is an extension of the Kinetic Gain Protocol Suite, not a new product line. Adoption, regulatory acceptance, and hosted aviation operation are unverified.

## Scope

- **Vendor disclosure:** Aviation ML Assurance Card v0.1 for one civil-aviation ML system version. It separates a declared EASA AI typology from a proposed DAL and asks for ODD, data/learning evidence, human role, and standards identifiers.
- **Artifact record:** MRO AI Sign-off Card v0.1 for one AI-assisted maintenance finding, exact-byte artifact digest, human finding decision, and embedded signature.
- **Engineering aid:** Offline Rust dataset tool with file hashes, exact/group split leakage checks, optional UTC time boundary, declared ODD-bin counts, and a signable report.
- **Reading aid:** Informative crosswalk from card fields to public EASA, FAA, NIST, and publisher descriptions of licensed standards.
- **Integration:** A public structural PR Action and five optional tools under review in the existing `mcp-kinetic-gain` server; the public MCP release remains separately gated. An optional aviation profile is under review for the existing AI Incident Card rather than another incident format.

## Non-goals and trust boundaries

The formats do not assign a DAL, approve a design, verify the truth of a linked document, certify a dataset, identify a key holder, prove staff authorisation, or release an aircraft to service. The Action does not perform cryptographic verification. The CLI does not prove data origin, rights, label quality, representativeness, or model safety. Public card examples must contain only fictional, non-sensitive material. Licensed standards are named by identifier; their text is not republished.

## Decision path

The strongest first test is a bounded **synthetic integration**: generate a valid vendor card, run the dataset tool on a fixed fixture, attach an MRO finding card, validate the cards, and show where a human reviewer must use an external key/authority registry. After that, seek a permissioned civil-aviation design partner to learn which fields actually reduce intake work. No such partner is currently identified.

## Where to read next

- [One-sheet](ONE_SHEET.md) for workflow, buyers, and trade-offs.
- [Proof index](PROOF_INDEX.md) for current source and release boundaries.
- [Keyword backlog](KEYWORD_OPPORTUNITIES.md) for unmeasured content opportunities.
- [Advancement notes](ADVANCEMENT_NOTES.md) for product decisions.
- [Four draft articles](content/) and [channel derivatives](content/social-derivatives.md).
