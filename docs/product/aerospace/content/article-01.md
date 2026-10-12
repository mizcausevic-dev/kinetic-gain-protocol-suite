# A versioned disclosure for aviation ML needs an evidence boundary

**Status:** Draft for review, 2026-10-12. Proposed primary query: `aviation AI assurance card`; search volume, difficulty, and CPC **Not measured**. Reader: civil-aviation ML supplier or assurance lead. Intent: understand a shareable disclosure format. Business objective: invite a technical review of the open draft, without suggesting regulatory acceptance.

**Supporting entities:** EASA NPA 2025-07; operational design domain; target DAL; learning assurance; human-AI teaming. **Product connection:** draft Aviation ML Assurance Card. **Publication gate:** verify the public repository, schema version, and current regulatory status first.

A regulator can describe an assurance objective without choosing a vendor's file format. Suppliers then spend time packaging the same facts in different PDFs, spreadsheets, and questionnaires. A machine-readable card could make a smaller, useful part of that exchange predictable: one declared system version, a bounded intended use, and pointers to the evidence a reviewer should inspect.

The proposed **Aviation ML Assurance Card v0.1** is deliberately a disclosure. Its top-level version is `aviation_ml_card_version: "0.1"`. The `system` block identifies the product and its intended use. `assurance` contains a **vendor-declared** EASA AI level and a **proposed** target development assurance level. Those fields are separate because one should not be calculated from the other. `odd` lists operating and excluded conditions, plus evidence references for each operating condition. `data_management`, `learning_assurance`, and `human_ai_teaming` point a reviewer toward process and responsibility records.

The card's most useful feature may be a visible gap. A declared operating condition can have an empty evidence list. That is valid as a draft declaration and conspicuous as an unanswered review question. A condition with a URL is still unanswered until someone checks that URL's content, provenance, applicability, and access rights.

The v0.1 profile accepts the declared levels `1A`, `1B`, `2A`, `2B`, and `3A`. It reserves `3B`. For `2B` and `3A`, Kinetic Gain's **conservative format rule** requires a disclosed human override path. This is a format choice. It should never be quoted as an EASA rule for every design. [EASA NPA 2025-07](https://www.easa.europa.eu/en/document-library/notices-of-proposed-amendment/npa-2025-07) is proposed material, with its consultation deadline extended to March 10, 2026. The [FAA AI Safety Assurance Roadmap](https://www.faa.gov/aircraft/air_cert/step/roadmap_for_AI_safety_assurance) describes principles and work ahead. A supplier still needs the applicable certification basis and its own safety argument.

For public discovery, the draft suggests a vendor-hosted HTTPS path such as `/.well-known/aviation-ml/<system_id>.json`. Nothing in the local draft deploys that URL. A supplier should review what is safe to disclose before posting one: no real aircraft identifiers, unreleased findings, personal data, or controlled technical data in a public example. Restricted evidence can stay in authorised systems and be referenced through a controlled process.

The card fits the Suite's existing division of work. It describes the vendor's system. A separate MRO card can travel with one AI-assisted finding. A buyer can reference both from an existing Procurement Decision Card. An Incident Card can provide later incident context. These links help people find records; they do not certify the system.

The practical first exercise is a fictional system with one intentionally missing ODD evidence reference. Validate the JSON, show the missing condition to an assurance engineer, and ask whether the resulting review question is clearer than the current intake packet. That human answer is the proof this draft still needs.

**CTA for publication:** Inspect the draft schema and its fictional example once the reviewed public repository URL is verified; submit field-level feedback before any production use.

**Internal links for adaptation:** [Aerospace one-sheet](../ONE_SHEET.md), [dataset checks](article-03.md), [proposal mapping](article-04.md). **Schema opportunity:** `Article` only after publication; no `Product` ratings or regulatory endorsement markup. **Channel adaptation:** Use the short thesis for kineticgain.com, a method-focused excerpt on Medium, and the [channel derivatives](social-derivatives.md) for social posts.
