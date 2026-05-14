# REST API Conventions

For the full endpoint hierarchy and samples see [`../blueprint.md`](../blueprint.md) §7.

## Baseline

- **Base URL:** `https://api.tnemis.gov.in/uamp/v1/`
- **Versioning:** URI segment (`/v1/`). Breaking changes ship `/v2/` with a
  6-month sunset window on `/v1/` via `Sunset:` headers (RFC 8594).
- **Auth:** `Authorization: Bearer <JWT>` issued by EMIS SSO (OIDC).
- **Content:** `application/json; charset=utf-8`.
- **Errors:** RFC 7807 Problem Details.
- **Pagination:** `?page=1&page_size=25`; `Link` header for next/prev.
- **Idempotency:** mutating endpoints accept `Idempotency-Key`.
- **Time:** all timestamps ISO-8601 with timezone offset (`+05:30`).
- **Tracing:** propagate `traceparent` (W3C Trace Context).

## Naming

- Resources are **plural nouns**: `/applications`, `/awards`, `/committees`.
- Actions are **POST sub-routes**, not verbs in path: `POST /applications/{id}/submit`.
- Bilingual fields appear as objects: `"title": { "en": "...", "ta": "..." }`.

## Response shape

```json
{
  "data": { /* primary resource */ },
  "meta": { "schema_version": 3, "trace_id": "..." }
}
```

For lists:

```json
{
  "data": [ /* items */ ],
  "meta": { "page": 1, "page_size": 25, "total": 142 }
}
```

## Error shape (RFC 7807)

```json
{
  "type": "https://api.tnemis.gov.in/errors/validation",
  "title": "Schema validation failed",
  "status": 422,
  "instance": "/v1/applications/9012345/submit",
  "errors": [ { "question_code": "service_certificate", "message_en": "...", "message_ta": "..." } ]
}
```
