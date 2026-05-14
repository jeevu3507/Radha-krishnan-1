# Architecture Overview

This is a short index. For the complete System Design Document, see
[`../blueprint.md`](../blueprint.md).

## TL;DR

UAMP is a **modular monolith, microservice-ready, API-first** platform built
to host any TN Government award scheme. Forms, workflows, rubrics, committees
and quotas are **data, not code**.

## Module map

| Module | Owns |
|---|---|
| Auth & SSO | `users`, `roles`, `sessions` |
| Dynamic Form Engine | `award_master`, `sections`, `questions`, `dynamic_responses` |
| Workflow Engine | `workflow_definitions`, `workflow_instances`, `workflow_history` |
| Evaluation Engine | `evaluation_criteria`, `marks`, `committees` |
| File Service | `attachments` (S3-backed) |
| Notification Service | `notifications`, `templates` |
| Reports & Analytics | read replica + Elasticsearch |
| Audit Ledger | `audit_logs` (append-only, Merkle-chained) |
| Admin Console | configures all of the above |

## See also

- [`../data/schema.md`](../data/schema.md) — ERD + DDL
- [`../api/rest-conventions.md`](../api/rest-conventions.md) — API standards
- [`../workflow/engine.md`](../workflow/engine.md) — workflow internals
