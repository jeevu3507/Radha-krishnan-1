import type { Bilingual, Locale, SectionDef } from './types';

export const t = (b: Bilingual, locale: Locale) => b[locale];

export const SECTIONS: SectionDef[] = [
  { id: 'personal',      title: { en: 'Personal Details',      ta: 'தனிநபர் விவரங்கள்' },        icon: 'user' },
  { id: 'school',        title: { en: 'School Details',        ta: 'பள்ளி விவரங்கள்' },          icon: 'building' },
  { id: 'qualification', title: { en: "Teacher's Qualification", ta: 'ஆசிரியர் தகுதி' },         icon: 'graduation' },
  { id: 'service',       title: { en: 'Service Record',         ta: 'பணி பதிவு' },              icon: 'briefcase' },
  { id: 'objective',     title: { en: 'Objective Criteria',     ta: 'புறநிலை அளவுகோல்கள்' },     icon: 'list-checks' },
  { id: 'performance',   title: { en: 'Performance Criteria',   ta: 'செயல்திறன் அளவுகோல்கள்' },   icon: 'trophy' },
  { id: 'documents',     title: { en: 'Supporting Documents',   ta: 'ஆதரவு ஆவணங்கள்' },          icon: 'paperclip' },
];

export const STAGE_LABEL: Record<string, Bilingual> = {
  DRAFT:          { en: 'Draft',           ta: 'வரைவு' },
  HM_REVIEW:      { en: 'HM Review',       ta: 'தலைமையாசிரியர் பரிசீலனை' },
  BEO_REVIEW:     { en: 'BEO Review',      ta: 'BEO பரிசீலனை' },
  DEEO_REVIEW:    { en: 'DEEO Review',     ta: 'DEEO பரிசீலனை' },
  CEO_REVIEW:     { en: 'CEO Review',      ta: 'CEO பரிசீலனை' },
  DSE_EVALUATION: { en: 'DSE Evaluation',  ta: 'DSE மதிப்பீடு' },
  STATE_REVIEW:   { en: 'State Review',    ta: 'மாநில பரிசீலனை' },
  AWARDED:        { en: 'Awarded',         ta: 'விருது வழங்கப்பட்டது' },
  REJECTED:       { en: 'Rejected',        ta: 'நிராகரிக்கப்பட்டது' },
};
