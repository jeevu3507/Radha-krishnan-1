# Contributing to TNEMIS UAMP

Thank you for working on the Unified Award Management Platform. This repository
hosts both the engineering documentation and (in later phases) the application
codebase. The conventions below keep history clean and reviews fast.

## Branching model

We use **trunk-based development**.

- `main` is always deployable.
- Feature branches: `feat/<short-slug>` — e.g. `feat/form-engine-repeaters`.
- Fix branches: `fix/<short-slug>`.
- Documentation: `docs/<short-slug>`.
- Chore / infra: `chore/<short-slug>` or `infra/<short-slug>`.

Keep branches short-lived (≤ 5 working days). Rebase, do not merge, on `main`.

## Commit messages

Follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body — wrap at 72 cols, explain *why*>
```

Allowed types: `feat`, `fix`, `docs`, `chore`, `refactor`, `perf`, `test`,
`build`, `ci`, `style`.

Examples:

```
feat(form-engine): support repeater min/max row constraints
docs(workflow): add committee reducer pseudocode
fix(rbac): deny CEO action when scope district mismatches
```

## Pull requests

- Open against `main`.
- Reference the work item / issue ID.
- Fill out the PR template completely.
- At least **one approval** from a code owner.
- All checks must be green (lint, tests, security scan).
- Squash-merge by default.

## Documentation discipline

- Diagrams use **mermaid** in Markdown, not external images, so they render
  on GitHub and survive forks.
- SQL DDL and JSON schemas in docs must be **runnable / valid** — broken
  examples are worse than no example.
- Major decisions go in `docs/adr/` as Architecture Decision Records.

## Code style (when code lands in Phase 1+)

| Stack | Tooling |
|---|---|
| Python | `ruff`, `black`, `mypy --strict`, `pytest` |
| TypeScript / React | `eslint`, `prettier`, `tsc --noEmit`, `vitest` |
| SQL | `sqlfluff` |
| Terraform | `terraform fmt`, `tflint` |
| Commit hooks | `pre-commit` mandatory |

## Security

Never commit:
- Secrets, tokens, passwords, private keys, signing certs.
- Real teacher PII or DSC member personal data.
- IFHRMS exports.

If you spot a leak, run `git secrets --scan` locally and email
`tnemis-security@tnschools.gov.in` immediately. Do **not** force-push to
rewrite history without coordinating with the SRE lead.

## Code of Conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Be respectful; we serve four
lakh teachers — the seriousness of the mission is reflected in how we treat
each other.
