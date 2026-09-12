#!/usr/bin/env node
// Prints the canonical numbers README.md must match, derived only from
// estate/manifest.json (the manifest's own literals) and mcp-kinetic-gain's
// package.json (fetched live, since this repo does not vendor that one).
// No dependencies: built-in fs/https only, matching this repo having no
// package.json of its own.
//
// Usage: node scripts/render-readme-facts.mjs
// Exit 0 always; this script reports facts, it does not judge the README.
// facts-check.yml (CI) is what fails the build when README.md disagrees.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import https from "node:https";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(here, "..", "estate", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "kg-facts-check" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

const specCount = manifest.spec_count_decision.value;
const liveHosts = manifest.hosts.filter((h) => h.status === "live");
const deadHosts = manifest.hosts.filter((h) => h.status.startsWith("dead"));
const unlistedLiveHosts = manifest.hosts.filter((h) => h.status === "unlisted");
const wrongContentHosts = manifest.hosts.filter((h) => h.status === "wrong-content");
// DNS points at the right host now, but the TLS cert on that host (Hostinger
// AutoSSL or GitHub Pages ACME, depending on the host) hasn't caught up yet,
// so the site isn't actually visitable over HTTPS. A real, distinct state
// from "dead" (nothing resolves) and "live" (fully working) -- tracked
// separately so these don't silently fall out of every count below.
const dnsFixedTlsPendingHosts = manifest.hosts.filter((h) => h.status === "dns-fixed-tls-pending");

console.log("=== Canonical facts (from estate/manifest.json) ===");
console.log(`spec_count: ${specCount} (decided ${manifest.spec_count_decision.decided_at})`);
console.log(`live_hosts: ${liveHosts.length}`);
console.log(`dead_hosts: ${deadHosts.length} (${deadHosts.map((h) => h.host).join(", ")})`);
console.log(
  `dns_fixed_tls_pending_hosts: ${dnsFixedTlsPendingHosts.length} (${dnsFixedTlsPendingHosts.map((h) => h.host).join(", ")})`
);
console.log(
  `live_but_unlisted_in_readme: ${unlistedLiveHosts.length} (${unlistedLiveHosts.map((h) => h.host).join(", ")})`
);
console.log(
  `wrong_content_hosts: ${wrongContentHosts.length} (${wrongContentHosts.map((h) => h.host).join(", ")})`
);
console.log(
  `well_known_documents_conforming: 0 of ${manifest.well_known_conformance.verified_this_session.length + manifest.well_known_conformance.not_reverified_this_session_but_unchanged_per_audit.length} sampled/known (see estate/manifest.json well_known_conformance)`
);

console.log("");
console.log("=== mcp-kinetic-gain (fetched live from npm) ===");
try {
  const pkg = await fetchJson("https://registry.npmjs.org/mcp-kinetic-gain/latest");
  console.log(`npm_version: ${pkg.version}`);
  console.log(
    `NOTE: tool/test counts are not in package.json; use the values already recorded under manifest.mcp_kinetic_gain, refreshed by hand against 'npm run test' output, not derived here.`
  );
} catch (e) {
  console.log(`BLOCKED: could not fetch npm registry (${e.message}). Falling back to manifest.mcp_kinetic_gain.`);
}
console.log(
  `manifest_recorded_npm_published_version: ${manifest.mcp_kinetic_gain.npm_published_version} (this is what README should cite)`
);
console.log(`manifest_recorded_tagged_unpublished_version: ${manifest.mcp_kinetic_gain.tagged_unpublished_version}`);
console.log(`manifest_recorded_tools: ${manifest.mcp_kinetic_gain.tools_observed}`);
console.log(`manifest_recorded_tests: ${manifest.mcp_kinetic_gain.tests_observed}`);

console.log("");
console.log("=== README.md currently says (grep, for a human diff) ===");
const readme = readFileSync(join(here, "..", "README.md"), "utf8");
const patterns = [/\b(eleven|twelve|1[12])\b.{0,20}specs?/gi, /\b\d+\s+tools?\b/gi, /\b\d+\s+tests?\b/gi, /\bv0\.\d+\.\d+\b/g, /\b\d+\s+live propert(y|ies)\b/gi];
for (const p of patterns) {
  const hits = [...readme.matchAll(p)].map((m) => m[0]);
  if (hits.length) console.log(`  ${p.source}: ${[...new Set(hits)].join(" | ")}`);
}

// --- Enforcement (this is what facts-check.yml relies on) ---
// Deliberately narrow: catches the clearest, highest-confidence mismatches
// rather than trying to parse every possible phrasing. A check that tries to
// catch everything and gets the grammar wrong is worse than one that catches
// a few things reliably.
console.log("");
console.log("=== Enforcement ===");
const failures = [];

const staleSpecWord = specCount === 12 ? /\beleven\b.{0,15}specs?/i : /\btwelve\b.{0,15}specs?/i;
const staleSpecDigit = specCount === 12 ? /\b11\s+specs?\b/i : /\b12\s+specs?\b/i;
if (staleSpecWord.test(readme) || staleSpecDigit.test(readme)) {
  failures.push(
    `README.md still contains a stale spec count (expected ${specCount}, decided ${manifest.spec_count_decision.decided_at}). Search for "eleven"/"twelve"/"11 specs"/"12 specs".`
  );
}

// Scoped to lines that mention mcp-kinetic-gain by name, not every v0.x.y in
// the document (spec version mentions like "v0.1 draft" are unrelated and
// would otherwise false-positive here).
const mcpLines = readme.split("\n").filter((l) => /mcp-kinetic-gain/i.test(l));
const mcpVersionMatches = mcpLines.flatMap((l) => [...l.matchAll(/\bv(0\.\d+\.\d+)\b/g)].map((m) => m[1]));
const staleVersions = mcpVersionMatches.filter((v) => v !== manifest.mcp_kinetic_gain.npm_published_version);
if (staleVersions.length) {
  failures.push(
    `README.md cites mcp-kinetic-gain version(s) ${[...new Set(staleVersions)].join(", ")} on a line mentioning mcp-kinetic-gain, but the npm-published version is ${manifest.mcp_kinetic_gain.npm_published_version}.`
  );
}

if (failures.length) {
  console.log(`FAIL: ${failures.length} mismatch(es)`);
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exitCode = 1;
} else {
  console.log("PASS: no stale spec-count or version strings detected in README.md");
}
