# Publishing the Kinetic Gain Implementation Stack

This guide records the publishing pattern for six Python and seven Rust
implementation repositories. It is not a current readiness or workflow
inventory. Inspect each repository's actual `publish.yml` and registry state
before creating a release tag.

| Registry | Repos | One-time setup |
| --- | --- | --- |
| **PyPI** | 6 Python repos (see list below) | Trusted Publisher / OIDC — **no secret to manage** |
| **crates.io** | 7 Rust repos | One `CARGO_REGISTRY_TOKEN` repo secret each |

This is setup guidance, not evidence that every repo is ready to publish. Review the exact candidate commit, its CI and dependency checks, registry permissions, artifact contents, and rollback plan before creating a new version tag. Once those gates pass, the tag step is:

```bash
git tag -a v0.1.2 -m "release"
git push origin v0.1.2
```

The intended workflow runs these steps; confirm them in the repository being released:

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

The Rust publish workflows described here expect a `CARGO_REGISTRY_TOKEN` secret.
Use a separate, least-privilege credential for each publishing repo rather than
sharing one token across the stack. Confirm the current registry options and
each workflow before provisioning credentials.

### One-time setup

1. **Generate a repo-specific token**: [crates.io/settings/tokens](https://crates.io/settings/tokens) — grant only the publish permissions needed for that crate and release. **Copy the token immediately**; the registry shows it once.

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

- **PyPI**: the `pypa/gh-action-pypi-publish` step may fail with `403 Forbidden` when publisher setup is missing. Inspect the actual registry and workflow state; do not assume no artifact was published.
- **crates.io**: `cargo publish` may fail with `error: no token found` when its credential is missing. Inspect the actual registry and workflow state before retrying.

Do not force-delete or recreate a release tag. Repair the cause, bump to a new version and tag, and run the release gates again. Registry versions and downstream consumers may already have observed the first attempt.

---

## Maintenance

After registry setup and exact-commit review, the typical release sequence is:

1. Bump version in `pyproject.toml` or `Cargo.toml`.
2. Update CHANGELOG (recommended).
3. Commit, push.
4. Tag: `git tag -a vX.Y.Z -m "release"`.
5. Push tag: `git push origin vX.Y.Z`.
6. Open the GitHub Actions tab and watch the workflow turn green.

Verify the required CI and security checks on the exact commit to be tagged. Tag-triggered publishing can release an untested or unreviewed commit if those checks are not enforced for that commit.
