import type { CommitteeMember, TeacherApplication } from './types';

export const SEED_TEACHER: TeacherApplication = {
  id: 'APP-2026-0001',
  emisId: '10007883',
  name: 'SARALA J',
  district: 'CHENNAI',
  block: 'VILLIVAKKAM (NORTH) (DSE)',
  school: 'GHSS Villivakkam',
  designation: 'PG Assistant — Mathematics',
  gender: 'F',
  dob: '1966-11-18',
  mobile: '9842012345',
  email: 'sarala.j@tnschools.gov.in',
  qualification: 'M.Sc., B.Ed.',
  pgDegree: 'M.Sc. Mathematics',
  serviceYears: 28,
  postings: [
    { id: 'p1', school: 'GHSS Anna Nagar',     fromDate: '1998-06-01', toDate: '2010-05-30', designation: 'BT Assistant' },
    { id: 'p2', school: 'GHSS Villivakkam',    fromDate: '2010-06-01', toDate: '',           designation: 'PG Assistant' },
  ],
  classXPercent: 96.2,
  classXIIPercent: 93.4,
  innovationsCount: 4,
  awardsReceived: 'Best Teacher (District) 2022; Innovation Award 2023',
  publicationsCount: 6,
  trainingsAttended: 12,
  smcEngagement: 'Member-Secretary of SMC; conducted 8 parent workshops in 2024-25.',
  stage: 'DRAFT',
};

export const APPLICATIONS: TeacherApplication[] = [
  { ...SEED_TEACHER, id: 'APP-2026-0001', emisId: '10017826', name: 'JEYASANTHI J',  school: 'GHSS Ukkadam',     classXPercent: 96.2, classXIIPercent: 93.4, marks: 86.5, stage: 'CEO_REVIEW', submittedAt: '2026-04-22' },
  { ...SEED_TEACHER, id: 'APP-2026-0002', emisId: '10021145', name: 'RAVIKUMAR R',   school: 'GHSS Pollachi',    classXPercent: 91.8, classXIIPercent: 89.0, marks: 84.0, stage: 'CEO_REVIEW', submittedAt: '2026-04-23' },
  { ...SEED_TEACHER, id: 'APP-2026-0003', emisId: '10022031', name: 'PRIYA L',       school: 'GHS Sulur',         classXPercent: 88.4, classXIIPercent: 92.1, marks: 82.5, stage: 'CEO_REVIEW', submittedAt: '2026-04-21' },
  { ...SEED_TEACHER, id: 'APP-2026-0004', emisId: '10025541', name: 'MURUGAN K',     school: 'GHSS Annur',        classXPercent: 84.5, classXIIPercent: 86.7, marks: 80.2, stage: 'CEO_REVIEW', submittedAt: '2026-04-24' },
  { ...SEED_TEACHER, id: 'APP-2026-0005', emisId: '10028877', name: 'KAVITHA S',     school: 'GGHSS Mettupalayam',classXPercent: 79.2, classXIIPercent: 81.4, marks: 78.0, stage: 'CEO_REVIEW', submittedAt: '2026-04-20' },
  { ...SEED_TEACHER, id: 'APP-2026-0006', emisId: '10030012', name: 'SARAVANAN P',   school: 'GHSS Karamadai',    classXPercent: 76.5, classXIIPercent: 80.3, marks: 76.5, stage: 'CEO_REVIEW', submittedAt: '2026-04-19' },
  { ...SEED_TEACHER, id: 'APP-2026-0007', emisId: '10031156', name: 'VIJAYA C',      school: 'GHS Periyanaickenp',classXPercent: 74.0, classXIIPercent: 75.5, marks: 73.8, stage: 'CEO_REVIEW', submittedAt: '2026-04-25' },
];

export const COMMITTEE_SEED: CommitteeMember[] = [
  {
    id: 'cm-chair',
    designation: 'CHAIR',
    designationLabel: { en: 'District CEO - Chairperson', ta: 'மாவட்ட CEO - தலைவர்' },
    name: '',
    emisId: '',
    position: '',
    mobile: '',
    email: '',
    saved: false,
  },
  {
    id: 'cm-principal',
    designation: 'PRINCIPAL',
    designationLabel: { en: 'DIET - Principal - Member', ta: 'DIET முதல்வர் - உறுப்பினர்' },
    name: '',
    emisId: '',
    position: '',
    mobile: '',
    email: '',
    saved: false,
  },
  {
    id: 'cm-deo-1',
    designation: 'DEO',
    designationLabel: { en: 'District Educational Officer(S) - Member', ta: 'மாவட்டக் கல்வி அதிகாரி - உறுப்பினர்' },
    name: '',
    emisId: '',
    position: '',
    mobile: '',
    email: '',
    saved: false,
  },
];

export const DISTRICT_QUOTA = 3;
export const SHORTLIST_TARGET = DISTRICT_QUOTA * 2;
