# TNEMIS Unified Award Management Platform (UAMP)

> **One platform. Every award. Zero code changes.**

A metadata-driven, workflow-configurable enterprise platform that hosts the
Dr. Radhakrishnan Award and every future Tamil Nadu Government award scheme
(CM's Best Teacher Award, Anna Centenary Award, State Innovation Award, …)
on a single reusable foundation.

This repository is the **System Design Document (SDD) + PRD** and engineering
home for UAMP, built for the School Education Department, Government of
Tamil Nadu, on TNEMIS.

---

## Why this exists

The current Dr. Radhakrishnan Award implementation on TNEMIS is a single-purpose,
hardcoded application. Every section and every approval stage is wired in code.
Adding a question requires a release. Onboarding a new award costs ~6–8
person-months.

UAMP replaces that with a generic platform where:

- **Forms** are JSON schemas stored in PostgreSQL, edited in an admin UI.
- **Workflows** are JSON graphs, drawn in a visual builder.
- **Evaluation rubrics, committees, quotas and ratios** are configurable.
- **New award schemes** launch in days, not months.

---

## Repository layout

```
.
├── README.md                  ← you are here
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── .editorconfig
├── .gitignore
├── docs/
│   ├── blueprint.md           ← the full SDD+PRD
│   ├── architecture/
│   │   └── overview.md
│   ├── api/
│   │   └── rest-conventions.md
│   ├── data/
│   │   └── schema.md
│   └── workflow/
│       └── engine.md
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── workflows/
        └── docs-lint.yml
```

---

## The blueprint

The full enterprise blueprint — covering executive summary, high- and low-level
architecture, dynamic form engine, workflow engine, full PostgreSQL DDL, REST
API design, RBAC matrix, UI/UX specifications, reports, security & compliance,
tech stack, DevOps, a 5-phase implementation plan, and a risk register — lives
in:

📄 **[`docs/blueprint.md`](docs/blueprint.md)**

It is implementation-ready: SQL DDL, JSON schemas, API samples and mermaid
diagrams are all directly usable by engineering pods.

---

## Vision

| Goal | Outcome |
|---|---|
| Eliminate hardcoded forms | 100% of award forms defined via JSON schema |
| Configurable approval workflows | Workflow Builder UI; zero code for new chains |
| Reusability across schemes | ≥ 5 award schemes hosted within 18 months |
| Bilingual, accessible, mobile-first | WCAG 2.1 AA; Tamil + English parity; PWA |
| Auditability | Tamper-evident, Merkle-chained audit ledger |
| Scale | 4 lakh+ teachers, 38 districts, 99.9% SLO |

---

## Technology Stack (summary)

| Layer | Choice |
|---|---|
| Frontend | React 18 + TypeScript + Vite + Tailwind + shadcn/ui |
| Backend | Django 5 + Django REST Framework |
| DB | PostgreSQL 15 (JSONB heavy) |
| Cache / Queue | Redis 7 + Celery |
| Search | Elasticsearch 8 (Tamil analyzer) |
| Object store | S3 / NIC MeghRaj |
| Auth | OIDC via EMIS SSO + Casbin RBAC |
| Observability | OpenTelemetry → Grafana + Tempo + Loki + Prometheus |
| Orchestration | Kubernetes (EKS / MeghRaj) + ArgoCD |
| IaC | Terraform |

See [`docs/blueprint.md`](docs/blueprint.md) §13 for full rationale.

---

## Phased Implementation (14 months, ~88 person-months)

| Phase | Window | Headline outcome |
|---|---|---|
| 1 — Foundations | M1–M3 | Auth, core models, basic Form Engine, simple award E2E |
| 2 — Workflow | M3–M6 | Approval chains, notifications, audit v1, pilot district |
| 3 — Evaluation | M6–M9 | Committee scoring, 1:2 ratio, eSign, full Dr. Radhakrishnan cycle |
| 4 — Configurability | M9–M11 | Repeaters, formulas, Visual Workflow Builder, **2nd award onboarded with zero code** |
| 5 — Scale & Hardening | M11–M14 | Elasticsearch, dashboards, DR drill, pen-test, statewide rollout |

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for branching, commit conventions,
review expectations, and the documentation linting workflow.

---

## License

Internal — Government of Tamil Nadu, School Education Department.
See [`LICENSE`](LICENSE).

---

## Contact

- **Architecture:** `tnemis-architecture@tnschools.gov.in`
- **Programme Office:** Office of the Director, TNEMIS
