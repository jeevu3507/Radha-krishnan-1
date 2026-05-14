# Data Model

The canonical, ready-to-run DDL is in [`../blueprint.md`](../blueprint.md) §6.2.
This page records design decisions and migration discipline.

## Key decisions

1. **JSONB for responses.** `dynamic_responses.payload` is JSONB. Cheap schema
   evolution, GIN-indexed for hot paths. The form schema itself lives in
   relational `sections` / `questions` / `question_options` for queryability.
2. **Versioned schemas.** Every `application` records `schema_version`.
   In-flight applications are never migrated to a newer form schema; admins
   publish new versions freely.
3. **Append-only audit ledger.** `audit_logs.row_hash = SHA256(prev_hash || canonical_json(row))`.
   Tamper attempts break the chain and are detected by a daily verifier job.
4. **Partitioning** (planned, Phase 5):
   - `applications` partitioned by `cycle_year`.
   - `audit_logs` partitioned by month.

## Migration discipline

- **Additive first, destructive later.** Add the new column / table /
  constraint; deploy. Backfill. Switch readers. Switch writers. Only then
  drop the old artifact, in a later release.
- **Never rewrite history of `audit_logs`.** Use compensating entries.
- **Migrations gated** by `django-pg-migrate` lock timeouts (`set lock_timeout = '2s'`).

## Reference

- See blueprint §6 for full ERD and DDL.
- See blueprint §12 for retention & encryption posture.
