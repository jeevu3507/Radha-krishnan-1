import type { AuditEntry, AwardScheme, PlatformUser, WorkflowStageDef } from './types';

/* ── Year handling ───────────────────────────────────────────────── */
const CURRENT_YEAR = new Date().getFullYear();
export const AVAILABLE_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2];
export const DEFAULT_YEAR = CURRENT_YEAR;

/* ── EMIS DB — master designations (NO manual entry, only selection) ─ */
export interface EmisDesignation {
  code: string;
  nameEn: string;
  nameTa: string;
  level: 'TEACHING' | 'ADMIN' | 'SUPERVISOR';
  stream?: 'ELEMENTARY' | 'SECONDARY' | 'PRIVATE' | 'ALL';
}

export const EMIS_DESIGNATIONS: EmisDesignation[] = [
  { code: 'SGT',         nameEn: 'Secondary Grade Teacher',    nameTa: 'இரண்டாம் நிலை ஆசிரியர்', level: 'TEACHING', stream: 'ELEMENTARY' },
  { code: 'PST',         nameEn: 'Primary School Teacher',     nameTa: 'தொடக்கப் பள்ளி ஆசிரியர்', level: 'TEACHING', stream: 'ELEMENTARY' },
  { code: 'BT',          nameEn: 'B.T. Assistant',             nameTa: 'பி.டி. உதவியாளர்',       level: 'TEACHING', stream: 'SECONDARY' },
  { code: 'PG',          nameEn: 'P.G. Assistant',             nameTa: 'பி.ஜி. உதவியாளர்',       level: 'TEACHING', stream: 'SECONDARY' },
  { code: 'HM',          nameEn: 'Headmaster / Headmistress',  nameTa: 'தலைமையாசிரியர்',         level: 'TEACHING', stream: 'ALL' },
  { code: 'PVT_TCH',     nameEn: 'Private School Teacher',     nameTa: 'தனியார் பள்ளி ஆசிரியர்',  level: 'TEACHING', stream: 'PRIVATE' },
  { code: 'BEO',         nameEn: 'Block Educational Officer',  nameTa: 'வட்டார கல்வி அதிகாரி',    level: 'SUPERVISOR' },
  { code: 'DEEO_PRI',    nameEn: 'DEEO (Elementary)',          nameTa: 'மாவட்ட தொடக்கக் கல்வி அதிகாரி', level: 'SUPERVISOR', stream: 'ELEMENTARY' },
  { code: 'DEEO_SEC',    nameEn: 'DEEO (Secondary)',           nameTa: 'மாவட்ட உயர்நிலைக் கல்வி அதிகாரி', level: 'SUPERVISOR', stream: 'SECONDARY' },
  { code: 'DEO_PVT',     nameEn: 'DEO (Private Schools)',      nameTa: 'மாவட்ட தனியார் பள்ளி அதிகாரி', level: 'SUPERVISOR', stream: 'PRIVATE' },
  { code: 'CEO',         nameEn: 'Chief Educational Officer',  nameTa: 'மாவட்ட முதன்மைக் கல்வி அதிகாரி', level: 'ADMIN' },
  { code: 'DIET_PRIN',   nameEn: 'DIET Principal',             nameTa: 'DIET முதல்வர்',          level: 'ADMIN' },
  { code: 'STATE_DIR',   nameEn: 'Director of School Education', nameTa: 'பள்ளிக் கல்வி இயக்குநர்', level: 'ADMIN' },
  { code: 'STATE_JD',    nameEn: 'Joint Director (DSE)',       nameTa: 'இணை இயக்குநர்',          level: 'ADMIN' },
];

/* ── EMIS DB — sample users (selectable by designation) ──────────────── */
export interface EmisUser {
  emisId: string;
  name: string;
  designationCode: string;
  district: string;
  block?: string;
  email: string;
  mobile: string;
}

export const EMIS_USERS: EmisUser[] = [
  { emisId: '10000001', name: 'BALAMURALI R',       designationCode: 'CEO',       district: 'Coimbatore', email: 'ceo.cbe@tnschools.gov.in',     mobile: '9442011111' },
  { emisId: '10000002', name: 'RAJENDRAN K',        designationCode: 'CEO',       district: 'Chennai',    email: 'ceo.chennai@tnschools.gov.in', mobile: '9442022222' },
  { emisId: '10000003', name: 'MEENAKSHI S',        designationCode: 'DEEO_SEC',  district: 'Coimbatore', email: 'deeo.sec.cbe@tnschools.gov.in', mobile: '9442033333' },
  { emisId: '10000004', name: 'PRAKASH V',          designationCode: 'DEEO_PRI',  district: 'Coimbatore', email: 'deeo.pri.cbe@tnschools.gov.in', mobile: '9442044444' },
  { emisId: '10000005', name: 'LAKSHMI R',          designationCode: 'DEO_PVT',   district: 'Coimbatore', email: 'deo.pvt.cbe@tnschools.gov.in', mobile: '9442055555' },
  { emisId: '10000006', name: 'KARTHIKEYAN M',      designationCode: 'BEO',       district: 'Coimbatore', block: 'Pollachi', email: 'beo.pollachi@tnschools.gov.in', mobile: '9442066666' },
  { emisId: '10000007', name: 'DIET PRINCIPAL CBE', designationCode: 'DIET_PRIN', district: 'Coimbatore', email: 'diet.cbe@tnschools.gov.in',   mobile: '9442077777' },
  { emisId: '10000008', name: 'SARITHA G',          designationCode: 'DIET_PRIN', district: 'Chennai',    email: 'diet.chn@tnschools.gov.in',   mobile: '9442088888' },
  { emisId: '10000009', name: 'VIJAYA C',           designationCode: 'DEEO_SEC',  district: 'Chennai',    email: 'deeo.sec.chn@tnschools.gov.in', mobile: '9442099999' },
  { emisId: '10000010', name: 'SUBRAMANI N',        designationCode: 'DEO_PVT',   district: 'Chennai',    email: 'deo.pvt.chn@tnschools.gov.in', mobile: '9442010101' },
  { emisId: '10000011', name: 'KAMAL S',            designationCode: 'STATE_DIR', district: '—',         email: 'state.dir@tnschools.gov.in',   mobile: '9442011010' },
  { emisId: '10000012', name: 'PADMINI L',          designationCode: 'STATE_JD',  district: '—',         email: 'state.jd@tnschools.gov.in',    mobile: '9442012121' },
];

/* ── Award schemes (streams) ─────────────────────────────────────────── */
export interface Scheme {
  code: 'ELEMENTARY' | 'SECONDARY' | 'PRIVATE';
  nameEn: string;
  nameTa: string;
  applicantsCount: number;
  shortlistedCount: number;
  awardedCount: number;
  quotaPerDistrict: number;
}

export const SCHEMES: Scheme[] = [
  { code: 'ELEMENTARY', nameEn: 'Elementary Schools', nameTa: 'தொடக்கப் பள்ளிகள்', applicantsCount: 178, shortlistedCount: 38, awardedCount: 0, quotaPerDistrict: 2 },
  { code: 'SECONDARY',  nameEn: 'Secondary Schools',  nameTa: 'உயர்நிலைப் பள்ளிகள்', applicantsCount: 196, shortlistedCount: 32, awardedCount: 0, quotaPerDistrict: 2 },
  { code: 'PRIVATE',    nameEn: 'Private Schools',    nameTa: 'தனியார் பள்ளிகள்',    applicantsCount: 38,  shortlistedCount:  6, awardedCount: 0, quotaPerDistrict: 1 },
];

/* ── District-wise performance for reports ───────────────────────────── */
export interface DistrictRollup {
  district: string;
  totalApps: number;
  deoApproved: number;
  ceoShortlist: number;
  stateSelected: number;
  awardedElementary: number;
  awardedSecondary: number;
  awardedPrivate: number;
}

export const DISTRICT_ROLLUP: DistrictRollup[] = [
  { district: 'Coimbatore',  totalApps: 142, deoApproved: 118, ceoShortlist: 12, stateSelected: 5, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Chennai',     totalApps: 128, deoApproved: 102, ceoShortlist: 12, stateSelected: 5, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Madurai',     totalApps:  87, deoApproved:  74, ceoShortlist: 10, stateSelected: 4, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Salem',       totalApps:  64, deoApproved:  52, ceoShortlist: 10, stateSelected: 4, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Tiruchirappalli', totalApps: 58, deoApproved: 48, ceoShortlist: 10, stateSelected: 4, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Tirunelveli', totalApps:  42, deoApproved:  36, ceoShortlist:  8, stateSelected: 3, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Vellore',     totalApps:  38, deoApproved:  31, ceoShortlist:  6, stateSelected: 3, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Erode',       totalApps:  32, deoApproved:  27, ceoShortlist:  6, stateSelected: 2, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Dindigul',    totalApps:  25, deoApproved:  21, ceoShortlist:  4, stateSelected: 2, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
  { district: 'Kanchipuram', totalApps:  22, deoApproved:  18, ceoShortlist:  4, stateSelected: 2, awardedElementary: 0, awardedSecondary: 0, awardedPrivate: 0 },
];

/* ── Legacy seeds kept for compatibility ─────────────────────────────── */
export const AWARDS: AwardScheme[] = [];
export const WORKFLOW_STAGES: WorkflowStageDef[] = [];
export const PLATFORM_USERS: PlatformUser[] = [];

/* ── Audit log — admin panel actions ONLY ─────────────────────────────── */
export const ADMIN_AUDIT_LOG: AuditEntry[] = [
  { id: 'a1',  occurredAt: '2026-05-15 11:42', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'create_question',  entityType: 'question',  entityId: 'q-objective-class10', ip: '10.10.1.2' },
  { id: 'a2',  occurredAt: '2026-05-15 11:38', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'update_question',  entityType: 'question',  entityId: 'q-personal-name',     ip: '10.10.1.2' },
  { id: 'a3',  occurredAt: '2026-05-15 10:24', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'add_workflow_stage', entityType: 'workflow', entityId: 'wf-rad-2026',         ip: '10.10.1.2' },
  { id: 'a4',  occurredAt: '2026-05-15 09:50', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'assign_committee_member', entityType: 'committee', entityId: 'cmt-cbe',     ip: '10.10.1.2' },
  { id: 'a5',  occurredAt: '2026-05-14 17:05', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'publish_schema',   entityType: 'schema',    entityId: 'schema-v3',           ip: '10.10.1.2' },
  { id: 'a6',  occurredAt: '2026-05-14 16:48', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'change_sla',       entityType: 'workflow',  entityId: 'wf-rad-2026',         ip: '10.10.1.2' },
  { id: 'a7',  occurredAt: '2026-05-14 14:12', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'remove_committee_member', entityType: 'committee', entityId: 'cmt-chn',  ip: '10.10.1.2' },
  { id: 'a8',  occurredAt: '2026-05-14 11:00', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'open_award_cycle', entityType: 'cycle',     entityId: 'rad-2026',            ip: '10.10.1.2' },
  { id: 'a9',  occurredAt: '2026-05-13 16:30', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'create_section',   entityType: 'section',   entityId: 'sec-performance',     ip: '10.10.1.2' },
  { id: 'a10', occurredAt: '2026-05-13 14:00', actorName: 'STATE ADMIN', actorRole: 'STATE_ADMIN', action: 'login',            entityType: 'session',   entityId: 'sess-9921',           ip: '10.10.1.2' },
];

export const AUDIT_LOG = ADMIN_AUDIT_LOG;
export const DISTRICTS = DISTRICT_ROLLUP.map((d) => d.district);
