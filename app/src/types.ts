export type Role = 'TEACHER' | 'CEO' | 'ADMIN';

export type Locale = 'en' | 'ta';

export type Bilingual = { en: string; ta: string };

export type Stage =
  | 'DRAFT'
  | 'HM_REVIEW'
  | 'BEO_REVIEW'
  | 'DEEO_REVIEW'
  | 'CEO_REVIEW'
  | 'DSE_EVALUATION'
  | 'STATE_REVIEW'
  | 'AWARDED'
  | 'REJECTED';

export interface Posting {
  id: string;
  school: string;
  fromDate: string;
  toDate: string;
  designation: string;
}

export interface TeacherApplication {
  id: string;
  emisId: string;
  name: string;
  district: string;
  block: string;
  school: string;
  designation: string;
  gender: 'M' | 'F' | 'O';
  dob: string;
  mobile: string;
  email: string;
  qualification: string;
  pgDegree?: string;
  serviceYears: number;
  postings: Posting[];
  classXPercent: number;
  classXIIPercent: number;
  innovationsCount: number;
  awardsReceived: string;
  publicationsCount: number;
  trainingsAttended: number;
  smcEngagement: string;
  fileServiceCertificate?: string;
  filePhoto?: string;
  fileSignature?: string;
  stage: Stage;
  marks?: number;
  shortlistRank?: number;
  submittedAt?: string;
}

export interface CommitteeMember {
  id: string;
  designation: 'CHAIR' | 'PRINCIPAL' | 'DEO' | 'MEMBER';
  designationLabel: Bilingual;
  name: string;
  emisId: string;
  position: string;
  mobile: string;
  email: string;
  saved: boolean;
}

export interface SectionDef {
  id: SectionId;
  title: Bilingual;
  icon: string;
}

export type SectionId =
  | 'personal'
  | 'school'
  | 'qualification'
  | 'service'
  | 'objective'
  | 'performance'
  | 'documents';

/* ── Super Admin types ───────────────────────────────────────────── */

export interface AwardScheme {
  id: string;
  code: string;
  nameEn: string;
  nameTa: string;
  cycleYear: number;
  status: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';
  openFrom: string;
  closeAt: string;
  applicantsCount: number;
  shortlistedCount: number;
  awardedCount: number;
  schemaVersion: number;
}

export interface WorkflowStageDef {
  id: string;
  code: string;
  label: string;
  actorRole: string;
  slaHours: number | null;
  type: 'user' | 'single_approver' | 'committee' | 'terminal';
}

export interface PlatformUser {
  id: string;
  emisId: string;
  name: string;
  email: string;
  role: 'TEACHER' | 'HM' | 'BEO' | 'DEEO' | 'CEO' | 'DSC_MEMBER' | 'STATE_REVIEWER' | 'STATE_ADMIN' | 'SUPER_ADMIN' | 'TECH_ADMIN';
  district: string;
  active: boolean;
  lastLogin: string;
}

export interface AuditEntry {
  id: string;
  occurredAt: string;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  ip: string;
}
