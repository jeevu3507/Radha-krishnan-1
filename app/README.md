# Dr. Radhakrishnan Award — Working React App

A faithful, working replica of the two TNEMIS Dr. Radhakrishnan Award screens:

1. **Teacher Portal** (`emis.tnschools.gov.in/staff/dr-radhakrishnan-award`)
   — pink staff theme, Tamil bilingual labels, 7-section accordion form, eligibility modal on first load.
2. **CEO / Approval Portal** (`tnemis.tnschools.gov.in/approval/dr-radha-krishnan-form-ceoapproval`)
   — TN EMIS blue theme, three action buttons (Selection count · DSC Approval Certificate · DSE User Manual),
     three tabs (Committee Members · DSC Approval · Teacher Mark List), 1:2 ratio enforcement.

## Tech stack

- **React 19** + **TypeScript 5.6**
- **Vite 6** (dev server + build)
- **Tailwind CSS 3.4**
- **Lucide React** icons
- No backend — all data is mock data in `src/data.ts`

## Run it locally

You'll need **Node.js 20+** installed (https://nodejs.org).

```bash
cd app
npm install
npm run dev
```

The app opens at http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

Output goes into `dist/`. Static — can be hosted on GitHub Pages, Netlify, Render, anywhere.

## Project structure

```
app/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx                      ← role switch (Login → Teacher / Admin)
    ├── index.css                    ← Tailwind base + custom utilities
    ├── types.ts                     ← shared TypeScript types
    ├── data.ts                      ← seed teacher, mock applications, committee
    ├── i18n.ts                      ← bilingual labels (English + Tamil)
    └── components/
        ├── Login.tsx
        ├── teacher/
        │   ├── TeacherPortal.tsx    ← pink staff portal
        │   ├── TeacherHeader.tsx    ← bilingual header + pink nav
        │   ├── EligibilityModal.tsx ← first-load modal
        │   ├── AccordionSection.tsx ← reusable accordion wrapper
        │   └── sections/
        │       ├── PersonalDetails.tsx
        │       ├── SchoolDetails.tsx
        │       ├── Qualification.tsx
        │       ├── ServiceRecord.tsx     (with repeater + total years)
        │       ├── ObjectiveCriteria.tsx (auto-marks band)
        │       ├── PerformanceCriteria.tsx
        │       └── SupportingDocuments.tsx
        └── admin/
            ├── AdminPortal.tsx      ← TN EMIS blue portal
            ├── AdminHeader.tsx      ← TN EMIS - COIMBATORE branding
            ├── CommitteeMembersTab.tsx
            ├── DSCApprovalTab.tsx   (with 1:2 shortlist enforcement)
            └── TeacherMarkListTab.tsx
```

## Notable features

- **Bilingual labels** — English + Tamil throughout (Noto Sans Tamil font).
- **Section lock** — each teacher section locks after submit, matching the production system's behaviour.
- **1:2 ratio enforcement** — CEO can only shortlist exactly `quota × 2` teachers before forwarding to State.
- **Eligibility modal** — pops up on first load asking the screening question.
- **Photo upload + file uploads** — fully working file inputs with preview, drag-and-drop ready.
- **Auto-computed marks** — Objective Criteria fields apply the band rule (≤50 = 0, ≤75 = 4, ≤90 = 7, >90 = 10).
- **Repeater** — Service Record supports unlimited postings with auto-computed total years.

## What's *not* in this prototype

- No real backend — submissions are local state only.
- No auth — the Login screen is a role chooser, not a real sign-in.
- No PDF generation — the DSC Approval Certificate button is a stub.
- No real EMIS data — seed data is `SARALA J / 10007883 / CHENNAI` and 7 mock Coimbatore applications.

These are intentional. The app demonstrates the **UI/UX and frontend logic** that would sit on top of the
UAMP platform documented in `docs/blueprint.md`.

## Branding

- **TN Pink** `#E91E63` / `#C2185B` — staff portal
- **TN Blue** `#1A237E` / `#3F51B5` — approval portal
- **Fonts:** Inter (Latin), Noto Sans Tamil (Tamil)

## License

© 2026 School Education Department, Government of Tamil Nadu. Internal use.
