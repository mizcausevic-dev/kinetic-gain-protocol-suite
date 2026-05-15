# Publishing the Kinetic Gain Implementation Stack

All thirteen implementation repos have a `publish.yml` GitHub Actions workflow
that fires on any tag matching `v*`. This document is the **one-time setup**
each repo needs before the workflow can actually push to a public registry.

| Registry | Repos | One-time setup |
| --- | --- | --- |
| **PyPI** | 6 Python repos (see list below) | Trusted Publisher / OIDC — **no secret to manage** |
| **crates.io** | 7 Rust repos | One `CARGO_REGISTRY_TOKEN` repo secret each |

Once the setup is done, releasing is a single command:

```bash
git tag -a v0.1.2 -m "release"
git push origin v0.1.2
```

The workflow then runs:

1. Verify `Cargo.toml` / `pyproject.toml` version matches the tag.
2. Build the artifact (`python -m build` / `cargo publish --dry-run`).
3. Publish.
4. (PyPI only) Attach a [PEP 740 Sigstore attestation](https://peps.python.org/pep-0740/) so consumers can verify provenance.

---

## PyPI (6 repos, OIDC Trusted Publisher)

PyPI's **Trusted Publisher** flow uses GitHub Actions' OIDC tokens to authenticate
to PyPI without any long-lived secret. The pattern is:

1. **First publish** — register the publisher on PyPI **before** tagging.
2. **Every subsequent publish** — just push a tag. The workflow authenticates via OIDC.

### Per-repo setup

For each of the six Python repos:

| Repo | PyPI project URL (after first publish) |
| --- | --- |
| `procurement-decision-api` | https://pypi.org/p/procurement-decision-api |
| `slo-budget-tracker`       | https://pypi.org/p/slo-budget-tracker |
| `policy-as-code-engine`    | https://pypi.org/p/policy-as-code-engine |
| `data-contract-registry`   | https://pypi.org/p/data-contract-registry |
| `aeo-validator-service`    | https://pypi.org/p/aeo-validator-service |
| `audit-stream`             | https://pypi.org/p/audit-stream — note the package name drops the `-py` suffix |

### Step-by-step (per repo, first publish)

1. **Go to PyPI** → [pypi.org/manage/account/publishing/](https://pypi.org/manage/account/publishing/)
2. Click **"Add a new pending publisher"** (this is for a project that doesn't exist yet on PyPI).
3. Fill in the form:
   - **Project name**: e.g. `procurement-decision-api`
   - **Owner**: `mizcausevic-dev`
   - **Repository name**: e.g. `procurement-decision-api`
   - **Workflow filename**: `publish.yml`
   - **Environment name**: `pypi` (matches the `environment.name` in publish.yml)
4. Save. PyPI now trusts that workflow to claim the project name.
5. Tag and push:
   ```bash
   cd <repo>
   git tag -a v0.1.0 -m "release"
   git push origin v0.1.0
   ```
6. GitHub Actions runs `publish.yml`. The workflow authenticates via OIDC, builds the wheel + sdist, publishes, and attaches a PEP 740 Sigstore attestation.

After the first publish, the publisher becomes "active" (no longer pending) and subsequent
tag pushes publish without further configuration.

### Trusted Publisher does NOT need

- ❌ A `PYPI_API_TOKEN` secret in the repo.
- ❌ A `TWINE_USERNAME` / `TWINE_PASSWORD` environment.
- ❌ A `.pypirc` file anywhere.

The OIDC token GitHub mints for each workflow run is exchanged for a short-lived PyPI
upload credential at publish time. Nothing long-lived is stored.

---

## crates.io (7 repos, API token)

crates.io doesn't have an OIDC publisher yet, so each repo needs the same
`CARGO_REGISTRY_TOKEN` secret. (You can use **one** token across all seven repos.)

### One-time setup

1. **Generate the token**: [crates.io/settings/tokens](https://crates.io/settings/tokens) — click "New Token", give it a name like "github-actions-publisher", scope to `publish-update` (covers new versions of existing crates) and `publish-new` (covers first publish). Click create. **Copy the token immediately** — crates.io shows it once.

2. **Add it as a secret to each of the seven Rust repos**:
   ```bash
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/reliability-toolkit-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/feature-flag-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/incident-correlation-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/aeo-graph-explorer-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/hash-attestation-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/request-shadow-rs
   gh secret set CARGO_REGISTRY_TOKEN --repo mizcausevic-dev/csv-data-quality-rs
   ```
   (Paste the token when each prompt appears.)

3. **Tag and push** — same pattern as PyPI:
   ```bash
   cd <repo>
   git tag -a v0.1.0 -m "release"
   git push origin v0.1.0
   ```

### Per-repo: package names on crates.io

The `name` in `Cargo.toml` is what consumers `cargo add`:

| Repo | crates.io name |
| --- | --- |
| `reliability-toolkit-rs`  | `reliability-toolkit` |
| `feature-flag-rs`         | `feature-flag` |
| `incident-correlation-rs` | `incident-correlation` |
| `aeo-graph-explorer-rs`   | `aeo-graph-explorer` |
| `hash-attestation-rs`     | `hash-attestation` |
| `request-shadow-rs`       | `request-shadow` |
| `csv-data-quality-rs`     | `csv-data-quality` |

(The `-rs` suffix is repo-naming convention; the crates themselves drop it.)

### crates.io quirks worth knowing

- **First publish reserves the name forever.** Pick the name once, don't rename.
- **You can't unpublish, only yank** — yanked versions are still resolvable by lockfiles but new builds won't pick them up.
- **The dry-run step in `publish.yml`** catches problems (missing license file, broken README links) before the real publish runs.

---

## Verifying after publish

### PyPI

```bash
pip install --dry-run procurement-decision-api
```

The output should list version `0.1.1` (or whichever tag triggered the workflow) and confirm the package is fetchable.

### crates.io

```bash
cargo search reliability-toolkit
```

Returns the registered crate with the latest version.

---

## What's the failure mode if the workflow fires before setup is done?

- **PyPI**: the `pypa/gh-action-pypi-publish` step fails with `403 Forbidden`. Workflow turns red. **No partial state on PyPI**. Fix the publisher config and re-tag.
- **crates.io**: `cargo publish` fails with `error: no token found`. Workflow turns red. **No partial state on crates.io**. Add the secret and re-tag.

Both failure modes are idempotent — the same tag can be re-pushed after a force-delete-and-recreate, and the workflow re-runs cleanly.

---

## Maintenance

After both registries are set up, the release ceremony for any repo is:

1. Bump version in `pyproject.toml` or `Cargo.toml`.
2. Update CHANGELOG (recommended).
3. Commit, push.
4. Tag: `git tag -a vX.Y.Z -m "release"`.
5. Push tag: `git push origin vX.Y.Z`.
6. Open the GitHub Actions tab and watch the workflow turn green.

The CI matrix and tests already run on every push to `main`. The publish workflow only fires on tags, so there's no risk of accidentally publishing untested code.
