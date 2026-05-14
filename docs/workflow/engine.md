# Workflow Engine

For the full design, sample JSON and committee reducer pseudocode, see
[`../blueprint.md`](../blueprint.md) §5.

## Concepts

- **Workflow Definition** — versioned graph of stages and transitions, stored
  as JSON in `workflow_definitions`.
- **Workflow Instance** — one application's journey through the graph.
- **Stage types** — `user`, `single_approver`, `committee`, `terminal`.
- **Transitions** — gated by **guards** (small JSON-LogicX expressions).
- **SLA** — per-stage; on breach, an **Escalation** rule fires.
- **Committee** — N actors must vote; reducer is one of
  `majority`, `unanimous`, `weighted_average`, `quorum`.

## Dr. Radhakrishnan flow

```
DRAFT → HM_REVIEW → BEO_REVIEW → DEEO_REVIEW → CEO_REVIEW
                                                   │
                                                   ▼
                                         DSC_EVALUATION (committee)
                                                   │
                                                   ▼
                                         STATE_REVIEW (committee)
                                                   │
                                           ┌───────┴────────┐
                                           ▼                ▼
                                        AWARDED          REJECTED
```

## Why custom (vs Camunda / Temporal)

Both are excellent. We chose a custom engine for two reasons:

1. **Ownership.** State Education will operate this for decades. A small,
   readable, JSON-driven engine that NIC engineers fully understand beats an
   opaque dependency.
2. **Surface area.** Our workflows are tens of stages, not thousands of
   activities. The marginal value of a heavyweight orchestrator is small;
   the operational cost is not.

We will re-evaluate at 50+ workflows or once parallel branching becomes
common.

## Operational tooling

- **Workflow Monitor** in the Admin Console — React Flow visualisation,
  per-node WIP and SLA health.
- **Workflow Sandbox** — dry-run a definition with synthetic actors before
  publishing to production.
