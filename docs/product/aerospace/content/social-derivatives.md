# Aerospace article distribution drafts

**Status:** Unpublished drafts, 2026-10-12. Every example and claim must be rechecked against the final public repository and source status. Replace `[ARTICLE_URL]` only with a live, read-back URL. Do not publish this file's placeholders, imply customer adoption, or describe any card as certification or maintenance-release authority. Set the Medium canonical URL to the verified kineticgain.com article if republishing there.

## 01 | Versioned disclosure

**kineticgain.com**

- Working title: A versioned disclosure for aviation ML needs an evidence boundary
- Meta description: A draft Aviation ML Assurance Card gives suppliers stable fields for intended use, ODD, learning evidence, and the human role while keeping regulatory decisions separate.
- Deck/CTA: See which statements a machine-readable card can make, where evidence checking starts, and how to review the draft schema once published.

**Medium excerpt**

Regulators can describe assurance objectives without prescribing a supplier's JSON format. The draft Aviation ML Assurance Card makes a narrower promise: identify one system version, declare operating limits, point to evidence, and expose gaps. An empty evidence list is an explicit review question. A filled list is still a set of pointers. The article walks through that boundary using EASA's proposed AI material and the FAA roadmap, each labelled by its actual status. Read the full article: [ARTICLE_URL].

**LinkedIn**

An aviation ML supplier can publish a card that says what a specific system version is intended to do, where it is intended to work, and which evidence a reviewer should inspect. The card should also show missing evidence openly. We drafted a machine-readable format for that exchange within the Kinetic Gain Protocol Suite. It is a disclosure format, not an airworthiness decision. The EASA source it references remains a proposal. Technical walkthrough: [ARTICLE_URL]

**X**

An aviation ML card should expose the operating conditions and the evidence gaps for one system version. A URL is a pointer, not proof. Our Suite draft keeps the vendor disclosure separate from certification decisions. [ARTICLE_URL]

**Bluesky**

A draft aviation ML card can show missing ODD evidence before a review. It names one system version, intended use, and the human role. It does not approve an aircraft or a DAL. [ARTICLE_URL]

## 02 | Maintenance finding sign-off

**kineticgain.com**

- Working title: A signed AI maintenance finding still needs a human authority check
- Meta description: A per-finding AI maintenance card can bind model version, artifact digest, and a human finding decision. Staff authority and release to service remain separate checks.
- Deck/CTA: Follow the exact-byte and signer checks, then identify the organisation systems needed before any real maintenance use.

**Medium excerpt**

A model flags an image. A person reviews the finding. An authorised organisation controls the maintenance record and any release to service. Those steps need distinct evidence. The draft MRO AI Sign-off Card binds a finding, original artifact digest, human disposition, and embedded signature. The signature protects record bytes when a trusted key is known; it cannot establish staff privileges. We map that separation to public EASA and U.S. maintenance-record sources. Read the full article: [ARTICLE_URL].

**LinkedIn**

Three questions matter when AI assists a maintenance inspection: which exact artifact did the model inspect, what did the person decide about the finding, and who has authority for the regulated maintenance decision? We drafted a per-finding card to preserve the first two with a signed record. The third needs the operator's authorisation system. A valid signature does not release an aircraft to service. Full explanation: [ARTICLE_URL]

**X**

A signed AI maintenance finding can bind a model version, artifact digest, and human review. It cannot establish certifying-staff authority or release an aircraft to service. Keep those checks in the organisation's controlled process. [ARTICLE_URL]

**Bluesky**

Hash the artifact, record the human finding decision, verify the signature, then check staff authority in the operator's system. Each step answers a different question. [ARTICLE_URL]

## 03 | Dataset leakage and ODD bins

**kineticgain.com**

- Working title: Dataset leakage and ODD coverage need different checks
- Meta description: An offline Rust tool hashes declared dataset files, flags exact and supplied-group split leakage, checks an optional time boundary, and counts declared ODD bins.
- Deck/CTA: Run the synthetic fixture after the reviewed CLI is published, then inspect what its pass flag does and does not mean.

**Medium excerpt**

Duplicate bytes across train and test are easy to spot. Different frames from one acquisition session require a trustworthy group ID. Neither check proves a model can handle every intended operating condition. The draft aero dataset tool reports these issues separately and counts evaluation samples by author-declared ODD bins. Its output is a reproducible engineering aid. It does not authenticate data origin, labels, rights, or operational representativeness. Read the full walkthrough: [ARTICLE_URL].

**LinkedIn**

Dataset quality discussions often compress three questions into one score. Did identical bytes cross splits? Did related samples from one acquisition group cross splits? Which declared operating-condition bins have thin evaluation coverage? Our offline Rust draft reports each separately, with a synthetic fixture and an explicit limits section. The bin threshold comes from the dataset author. It is not a regulatory minimum. Walkthrough: [ARTICLE_URL]

**X**

Exact-byte leakage, group leakage, and ODD-bin gaps are different failures. Our offline Rust draft reports all three and signs a deterministic report. A passing count still cannot prove representativeness or data origin. [ARTICLE_URL]

**Bluesky**

A train/test split can pass file-hash checks and still share one acquisition group. ODD-bin counts add another view, with limits. The draft offline tool reports them separately. [ARTICLE_URL]

## 04 | Proposal-to-field mapping

**kineticgain.com**

- Working title: Mapping aviation AI evidence to a proposal without claiming certification
- Meta description: A dated crosswalk relates draft card fields to public EASA, FAA, NIST, and standards-publisher topics while retaining source status and limits.
- Deck/CTA: Inspect a source row, its applicability, and the statement it cannot support before citing it in a review packet.

**Medium excerpt**

A crosswalk arrow should mean “this field helps ask a relevant question.” It cannot mean that the linked evidence satisfies an objective. Our draft aerospace table records source status, field path, applicability, and limitations together. EASA NPA 2025-07 is proposed material. The FAA AI document is a roadmap. ED-324 was still listed as draft at this review date. Those labels are part of the data, not footnotes to omit. Read the method: [ARTICLE_URL].

**LinkedIn**

If a crosswalk points from an AI card field to an aviation source, what does that connection prove? Usually only that the field is relevant to a review topic. Our draft records the source's status and a limitation on each row. It names licensed standards by identifier without reproducing their text or inventing objective IDs. The result is a reading aid for an assurance conversation, not a compliance score. Method: [ARTICLE_URL]

**X**

EASA NPA 2025-07 is proposed material. The FAA AI document is a roadmap. ED-324 was listed as draft at our review date. A crosswalk should preserve those statuses and show what each field cannot prove. [ARTICLE_URL]

**Bluesky**

A source crosswalk needs a status and a limit on every row. Our draft maps aviation card fields to public topics while leaving certification decisions to the applicable process. [ARTICLE_URL]

## Publication handoff

1. Recheck the exact live regulatory source and repository links on publication day.
2. Replace every placeholder with the published article URL after HTTP/browser readback. Add a canonical link to Medium copies.
3. Read each post once against the live card/tool status. Keep “draft” until the reviewed component exists remotely; avoid ranking, customer, or approval claims.
4. Retain a dated source and published-page readback record. Correct or withdraw posts if the linked status changes.
