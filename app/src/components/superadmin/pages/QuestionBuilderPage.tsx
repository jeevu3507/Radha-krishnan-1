import { useMemo, useState } from 'react';
import {
  Plus, GripVertical, Edit3, Trash2, Type, Hash, Calendar,
  FileUp, ListChecks, Mail, Phone, Repeat2, Sigma, X, Eye, Trophy,
} from 'lucide-react';
import { SECTIONS } from '../../../i18n';
import { EMIS_DESIGNATIONS } from '../../../adminData';
import type { SectionId } from '../../../types';

/* ── Field type catalog ──────────────────────────────────────────────── */
type FieldType =
  | 'text' | 'textarea' | 'number' | 'date'
  | 'radio' | 'checkbox' | 'dropdown'
  | 'file' | 'email' | 'phone' | 'repeater' | 'formula';

const FIELD_TYPES: { code: FieldType; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { code: 'text',     label: 'Single line text', icon: Type },
  { code: 'textarea', label: 'Multi-line text',  icon: Type },
  { code: 'number',   label: 'Number',           icon: Hash },
  { code: 'date',     label: 'Date',             icon: Calendar },
  { code: 'radio',    label: 'Radio (single)',   icon: ListChecks },
  { code: 'checkbox', label: 'Checkbox (multi)', icon: ListChecks },
  { code: 'dropdown', label: 'Dropdown',         icon: ListChecks },
  { code: 'file',     label: 'File upload',      icon: FileUp },
  { code: 'email',    label: 'Email',            icon: Mail },
  { code: 'phone',    label: 'Phone',            icon: Phone },
  { code: 'repeater', label: 'Repeater (rows)',  icon: Repeat2 },
  { code: 'formula',  label: 'Formula (auto)',   icon: Sigma },
];

interface Question {
  id: string;
  type: FieldType;
  labelEn: string;
  labelTa: string;
  required: boolean;
  // validation
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  regex?: string;
  fileMaxMb?: number;
  fileTypes?: string;
  // choice
  options?: { en: string; ta: string }[];
  helpEn?: string;
  helpTa?: string;
  // scoring — hidden from teachers & DEO, visible to CEO during shortlist
  hasScore?: boolean;
  maxMarks?: number;
  scoreDescriptionEn?: string;
  scoreDescriptionTa?: string;
}

/* ── Seed: questions keyed by [designation, section] ─────────────────── */
const designationFilters = ['ALL', ...EMIS_DESIGNATIONS.filter((d) => d.level === 'TEACHING').map((d) => d.code)];

type QStore = Record<string, Record<string, Question[]>>; // [designation][section] -> Question[]

const SEED: QStore = {
  ALL: {
    personal: [
      { id: 'q1', type: 'text', labelEn: 'Full Name',            labelTa: 'முழுப் பெயர்',      required: true, maxLength: 120 },
      { id: 'q2', type: 'text', labelEn: 'EMIS ID',              labelTa: 'EMIS ஐடி',         required: true, regex: '^[0-9]{8}$', helpEn: 'Exactly 8 digits' },
      { id: 'q3', type: 'date', labelEn: 'Date of Birth',        labelTa: 'பிறந்த தேதி',       required: true },
      { id: 'q4', type: 'radio',labelEn: 'Gender',               labelTa: 'பாலினம்',           required: true, options: [{ en: 'Male', ta: 'ஆண்' }, { en: 'Female', ta: 'பெண்' }, { en: 'Other', ta: 'மற்றவை' }] },
      { id: 'q5', type: 'phone',labelEn: 'Mobile Number',        labelTa: 'கைபேசி எண்',        required: true, regex: '^[6-9][0-9]{9}$', helpEn: '10-digit Indian mobile' },
    ],
    school: [
      { id: 'q6', type: 'text',     labelEn: 'School Name', labelTa: 'பள்ளியின் பெயர்', required: true },
      { id: 'q7', type: 'number',   labelEn: 'UDISE Code',  labelTa: 'UDISE குறியீடு', required: true },
      { id: 'q8', type: 'dropdown', labelEn: 'Medium',      labelTa: 'பாட மொழி',       required: true, options: [{ en: 'Tamil', ta: 'தமிழ்' }, { en: 'English', ta: 'ஆங்கிலம்' }, { en: 'Both', ta: 'இரண்டும்' }] },
    ],
    qualification: [
      { id: 'q9',  type: 'text', labelEn: 'UG Degree', labelTa: 'இளங்கலை', required: true },
      { id: 'q10', type: 'text', labelEn: 'PG Degree', labelTa: 'முதுகலை', required: false },
    ],
    service: [
      { id: 'q11', type: 'repeater', labelEn: 'Postings',    labelTa: 'பணியிடங்கள்',     required: true },
      { id: 'q12', type: 'formula',  labelEn: 'Total Years', labelTa: 'மொத்த ஆண்டுகள்',  required: true },
    ],
    objective: [
      { id: 'q13', type: 'number', labelEn: 'Class X Pass %',   labelTa: '10ஆம் வகுப்பு %',  required: true, min: 0, max: 100, hasScore: true, maxMarks: 10,
        scoreDescriptionEn: 'Below 50% = 0 marks · 50–75% = 4 marks · 76–90% = 7 marks · above 90% = 10 marks',
        scoreDescriptionTa: '50%-க்கு கீழே = 0 · 50-75% = 4 · 76-90% = 7 · 90%-க்கு மேல் = 10' },
      { id: 'q14', type: 'number', labelEn: 'Class XII Pass %', labelTa: '12ஆம் வகுப்பு %',  required: true, min: 0, max: 100, hasScore: true, maxMarks: 10,
        scoreDescriptionEn: 'Below 50% = 0 marks · 50–75% = 4 marks · 76–90% = 7 marks · above 90% = 10 marks',
        scoreDescriptionTa: '50%-க்கு கீழே = 0 · 50-75% = 4 · 76-90% = 7 · 90%-க்கு மேல் = 10' },
    ],
    performance: [
      { id: 'q15', type: 'textarea', labelEn: 'Awards & Achievements', labelTa: 'விருதுகள் / சாதனைகள்', required: false, maxLength: 1500, hasScore: true, maxMarks: 15,
        scoreDescriptionEn: 'District-level award = 3 marks · State-level = 7 marks · National = 12 marks · International = 15 marks. Award the maximum applicable.',
        scoreDescriptionTa: 'மாவட்ட விருது = 3 · மாநில = 7 · தேசிய = 12 · சர்வதேசம் = 15. பொருந்தும் அதிகபட்ச மதிப்பெண்ணை வழங்கவும்.' },
    ],
    documents: [
      { id: 'q16', type: 'file', labelEn: 'Service Certificate', labelTa: 'பணி சான்றிதழ்', required: true, fileMaxMb: 5,  fileTypes: 'application/pdf' },
      { id: 'q17', type: 'file', labelEn: 'Recent Photo',        labelTa: 'புகைப்படம்',    required: true, fileMaxMb: 15, fileTypes: 'image/png,image/jpeg' },
    ],
  },
  PG: { objective: [], performance: [], school: [], qualification: [], personal: [], service: [], documents: [] },
  BT: { objective: [], performance: [], school: [], qualification: [], personal: [], service: [], documents: [] },
};

export default function QuestionBuilderPage({ year }: { year: number }) {
  const [designation, setDesignation] = useState<string>('ALL');
  const [sectionId, setSectionId] = useState<SectionId>('personal');
  const [store, setStore] = useState<QStore>(SEED);
  const [editing, setEditing] = useState<Question | null>(null);
  const [adding, setAdding] = useState(false);

  const questions = useMemo(
    () => store[designation]?.[sectionId] ?? store.ALL[sectionId] ?? [],
    [store, designation, sectionId]
  );

  const inheritsFromAll = !store[designation]?.[sectionId]?.length;

  const upsertQuestion = (q: Question) => {
    setStore((s) => {
      const next = { ...s };
      next[designation] = { ...(next[designation] ?? {}) };
      const list = [...(next[designation][sectionId] ?? s.ALL[sectionId] ?? [])];
      const idx = list.findIndex((x) => x.id === q.id);
      if (idx >= 0) list[idx] = q;
      else list.push(q);
      next[designation][sectionId] = list;
      return next;
    });
    setEditing(null);
    setAdding(false);
  };

  const removeQuestion = (qid: string) => {
    setStore((s) => {
      const list = (s[designation]?.[sectionId] ?? s.ALL[sectionId] ?? []).filter((x) => x.id !== qid);
      return {
        ...s,
        [designation]: { ...(s[designation] ?? {}), [sectionId]: list },
      };
    });
  };

  return (
    <div className="space-y-5">
      {/* Top context bar */}
      <div className="card p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Designation</span>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="field-input py-1.5 max-w-[260px]"
          >
            <option value="ALL">All teaching designations</option>
            {EMIS_DESIGNATIONS.filter((d) => d.level === 'TEACHING').map((d) => (
              <option key={d.code} value={d.code}>
                {d.nameEn} ({d.code})
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400 italic">↑ from EMIS DB</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="badge-amber">Schema v3 · DRAFT</span>
          <button className="btn-ghost"><Eye size={14} /> Preview as teacher</button>
          <button className="btn-primary-pink">Publish for {year}</button>
        </div>
      </div>

      {/* 3-pane layout */}
      <div className="grid lg:grid-cols-[260px_1fr] gap-5">
        {/* Sections list */}
        <div className="card p-3 h-fit">
          <div className="flex items-center justify-between px-2 py-1.5">
            <h3 className="text-xs uppercase tracking-wide font-bold text-slate-500">Form sections</h3>
            <button className="text-tnblue hover:bg-tnblue-light p-1 rounded-md" title="Add section">
              <Plus size={14} />
            </button>
          </div>
          <ul className="mt-1 space-y-0.5">
            {SECTIONS.map((s, i) => {
              const count = (store[designation]?.[s.id] ?? store.ALL[s.id] ?? []).length;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setSectionId(s.id)}
                    className={
                      'w-full flex items-center gap-2 px-2 py-2.5 rounded-md text-sm text-left transition ' +
                      (sectionId === s.id
                        ? 'bg-tnblue text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100')
                    }
                  >
                    <GripVertical size={12} className="opacity-40" />
                    <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-white/20">
                      {i + 1}
                    </span>
                    <div className="flex-1 truncate">
                      <div className="text-sm leading-tight">{s.title.en}</div>
                      <div className={'text-[10px] font-tamil truncate ' + (sectionId === s.id ? 'text-white/80' : 'text-slate-500')}>
                        {s.title.ta}
                      </div>
                    </div>
                    <span className={'text-[10px] font-mono px-1.5 py-0.5 rounded ' + (sectionId === s.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600')}>
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Questions canvas */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="font-bold text-slate-900">
                {SECTIONS.find((s) => s.id === sectionId)?.title.en}
              </h3>
              <p className="text-xs text-slate-500 font-tamil">
                {SECTIONS.find((s) => s.id === sectionId)?.title.ta}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                const total = questions.reduce((s, qq) => s + (qq.hasScore ? (qq.maxMarks ?? 0) : 0), 0);
                const scored = questions.filter((qq) => qq.hasScore).length;
                return total > 0 ? (
                  <span className="badge-amber inline-flex items-center gap-1" title="Maximum marks total for this section">
                    <Trophy size={11} /> Section total: {total} marks ({scored} scored)
                  </span>
                ) : null;
              })()}
              <button onClick={() => setAdding(true)} className="btn-primary-blue">
                <Plus size={14} /> Add question
              </button>
            </div>
          </div>

          {inheritsFromAll && designation !== 'ALL' && (
            <div className="mt-3 mb-3 bg-amber-50 ring-1 ring-amber-200 text-amber-800 text-xs rounded-md px-3 py-2">
              No designation-specific overrides yet — these questions are inherited from <strong>All teaching designations</strong>. Edit any one to fork.
            </div>
          )}

          <ul className="mt-3 space-y-2">
            {questions.map((q) => (
              <QuestionRow
                key={q.id}
                q={q}
                onEdit={() => setEditing(q)}
                onDelete={() => removeQuestion(q.id)}
              />
            ))}
            {questions.length === 0 && (
              <li className="text-center py-12 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                No questions yet. Click "Add question" to start.
              </li>
            )}
          </ul>
        </div>
      </div>

      {(adding || editing) && (
        <QuestionEditor
          initial={editing ?? undefined}
          onCancel={() => { setEditing(null); setAdding(false); }}
          onSave={upsertQuestion}
        />
      )}
    </div>
  );
}

/* ── Question Row ─────────────────────────────────────────────────────── */
function QuestionRow({ q, onEdit, onDelete }: { q: Question; onEdit: () => void; onDelete: () => void }) {
  const ft = FIELD_TYPES.find((f) => f.code === q.type);
  const Icon = ft?.icon ?? Type;
  return (
    <li className="flex items-center gap-3 p-3 rounded-lg ring-1 ring-slate-200 hover:ring-tnblue/60 bg-white">
      <GripVertical size={14} className="text-slate-400 cursor-grab flex-shrink-0" />
      <span className="w-8 h-8 rounded-md bg-tnblue-light text-tnblue flex items-center justify-center flex-shrink-0">
        <Icon size={14} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate">
          {q.labelEn}
          {q.required && <span className="text-red-500"> *</span>}
        </div>
        <div className="text-xs text-slate-500 font-tamil truncate">{q.labelTa}</div>
        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            {q.type}
          </span>
          {q.required && <span className="text-[10px] uppercase font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">Required</span>}
          {q.hasScore && (
            <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
              <Trophy size={10} /> Scored · max {q.maxMarks ?? 0}
            </span>
          )}
          {q.regex && <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[160px]">/{q.regex}/</span>}
          {q.fileMaxMb && <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">≤{q.fileMaxMb}MB</span>}
          {q.options && <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{q.options.length} options</span>}
        </div>
      </div>
      <button onClick={onEdit} className="text-slate-500 hover:text-tnblue p-1.5 rounded-md hover:bg-tnblue-light">
        <Edit3 size={14} />
      </button>
      <button onClick={onDelete} className="text-slate-500 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50">
        <Trash2 size={14} />
      </button>
    </li>
  );
}

/* ── Question Editor Modal ───────────────────────────────────────────── */
function QuestionEditor({
  initial, onSave, onCancel,
}: {
  initial?: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>(
    initial ?? {
      id: 'q-' + Math.random().toString(36).slice(2, 8),
      type: 'text',
      labelEn: '',
      labelTa: '',
      required: false,
    }
  );

  const set = <K extends keyof Question>(k: K, v: Question[K]) => setQ((p) => ({ ...p, [k]: v }));

  const hasChoices = q.type === 'radio' || q.type === 'checkbox' || q.type === 'dropdown';

  const submit = () => {
    if (!q.labelEn.trim()) {
      alert('English label is required');
      return;
    }
    if (q.hasScore) {
      if (!q.maxMarks || q.maxMarks < 1) {
        alert('Maximum marks is required when the question is scored');
        return;
      }
      if (q.maxMarks > 1 && !(q.scoreDescriptionEn ?? '').trim()) {
        alert('Please add a scoring criteria description (English) for this scored question');
        return;
      }
    }
    onSave(q);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="bg-tnblue text-white px-5 py-3 flex items-center justify-between">
          <div className="font-semibold">{initial ? 'Edit question' : 'New question'}</div>
          <button onClick={onCancel}><X size={16} /></button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {/* Field type */}
          <div>
            <label className="field-label">Field type *</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {FIELD_TYPES.map((ft) => {
                const Icon = ft.icon;
                const active = q.type === ft.code;
                return (
                  <button
                    key={ft.code}
                    onClick={() => set('type', ft.code)}
                    className={
                      'flex flex-col items-center gap-1 p-2.5 rounded-md ring-1 text-xs transition ' +
                      (active
                        ? 'ring-tnblue bg-tnblue text-white font-semibold'
                        : 'ring-slate-200 hover:ring-tnblue text-slate-700')
                    }
                    title={ft.label}
                  >
                    <Icon size={14} />
                    <span>{ft.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Labels */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Label — English" required>
              <input value={q.labelEn} onChange={(e) => set('labelEn', e.target.value)} className="field-input" placeholder="e.g., Full Name" />
            </Field>
            <Field label="Label — Tamil">
              <input value={q.labelTa} onChange={(e) => set('labelTa', e.target.value)} className="field-input font-tamil" placeholder="உதா., முழுப் பெயர்" />
            </Field>
          </div>

          {/* Help text (bilingual) */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Help text — English">
              <input value={q.helpEn ?? ''} onChange={(e) => set('helpEn', e.target.value)} className="field-input" placeholder="Optional hint" />
            </Field>
            <Field label="Help text — Tamil">
              <input value={q.helpTa ?? ''} onChange={(e) => set('helpTa', e.target.value)} className="field-input font-tamil" placeholder="விருப்ப குறிப்பு" />
            </Field>
          </div>

          {/* Mandatory toggle */}
          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-md cursor-pointer">
            <input
              type="checkbox"
              checked={q.required}
              onChange={(e) => set('required', e.target.checked)}
              className="w-4 h-4 accent-red-600"
            />
            <span className="text-sm font-semibold text-slate-800">
              Mandatory <span className="text-red-500">*</span>
            </span>
            <span className="text-xs text-slate-500">Teacher cannot submit the section without filling this</span>
          </label>

          {/* Scoring */}
          <div className="rounded-md ring-1 ring-amber-200 bg-amber-50 p-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!q.hasScore}
                onChange={(e) => {
                  set('hasScore', e.target.checked);
                  if (!e.target.checked) {
                    set('maxMarks', undefined);
                    set('scoreDescriptionEn', undefined);
                    set('scoreDescriptionTa', undefined);
                  }
                }}
                className="w-4 h-4 accent-amber-600"
              />
              <Trophy size={14} className="text-amber-700" />
              <span className="text-sm font-semibold text-slate-800">
                Is this question scored?
              </span>
              <span className="text-xs text-slate-600">CEO uses this for shortlisting</span>
            </label>
            {q.hasScore && (
              <div className="mt-3 pl-7 space-y-3">
                <label className="block">
                  <span className="field-label">Maximum marks for this question *</span>
                  <input
                    type="number"
                    min={1}
                    value={q.maxMarks ?? ''}
                    onChange={(e) => set('maxMarks', e.target.value ? +e.target.value : undefined)}
                    className="field-input max-w-[160px]"
                    placeholder="Enter max marks"
                  />
                </label>

                <label className="block">
                  <span className="field-label">
                    Scoring criteria — English {(q.maxMarks ?? 0) > 1 && <span className="text-red-500">*</span>}
                  </span>
                  <textarea
                    rows={3}
                    value={q.scoreDescriptionEn ?? ''}
                    onChange={(e) => set('scoreDescriptionEn', e.target.value)}
                    className="field-input"
                    placeholder="e.g., 50–75% = 4 marks · 76–90% = 7 marks · above 90% = 10 marks"
                  />
                </label>

                <label className="block">
                  <span className="field-label">Scoring criteria — Tamil</span>
                  <textarea
                    rows={3}
                    value={q.scoreDescriptionTa ?? ''}
                    onChange={(e) => set('scoreDescriptionTa', e.target.value)}
                    className="field-input font-tamil"
                    placeholder="உதா., 50-75% = 4 மதிப்பெண் · 76-90% = 7 · 90%-க்கு மேல் = 10"
                  />
                </label>

                <p className="text-[11px] text-amber-800 italic">
                  Visibility: hidden from <strong>Teacher</strong> (EMIS portal) · hidden from <strong>DEO</strong> (approval) · <strong>visible to CEO</strong> during shortlist along with the scoring criteria above.
                </p>
              </div>
            )}
          </div>

          {/* Validation per type */}
          {(q.type === 'text' || q.type === 'textarea') && (
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Min length"><input type="number" value={q.minLength ?? ''} onChange={(e) => set('minLength', e.target.value ? +e.target.value : undefined)} className="field-input" /></Field>
              <Field label="Max length"><input type="number" value={q.maxLength ?? ''} onChange={(e) => set('maxLength', e.target.value ? +e.target.value : undefined)} className="field-input" /></Field>
              <Field label="Regex pattern"><input value={q.regex ?? ''} onChange={(e) => set('regex', e.target.value)} className="field-input font-mono text-xs" placeholder="^[A-Za-z ]+$" /></Field>
            </div>
          )}

          {q.type === 'number' && (
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Minimum value"><input type="number" value={q.min ?? ''} onChange={(e) => set('min', e.target.value ? +e.target.value : undefined)} className="field-input" /></Field>
              <Field label="Maximum value"><input type="number" value={q.max ?? ''} onChange={(e) => set('max', e.target.value ? +e.target.value : undefined)} className="field-input" /></Field>
            </div>
          )}

          {q.type === 'file' && (
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Max file size (MB)"><input type="number" value={q.fileMaxMb ?? ''} onChange={(e) => set('fileMaxMb', e.target.value ? +e.target.value : undefined)} className="field-input" placeholder="5" /></Field>
              <Field label="Allowed types (MIME)"><input value={q.fileTypes ?? ''} onChange={(e) => set('fileTypes', e.target.value)} className="field-input" placeholder="application/pdf" /></Field>
            </div>
          )}

          {hasChoices && (
            <Field label="Choices">
              <ChoiceEditor
                value={q.options ?? []}
                onChange={(opts) => set('options', opts)}
              />
            </Field>
          )}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-ghost">Cancel</button>
          <button onClick={submit} className="btn-primary-blue">Save question</button>
        </div>
      </div>
    </div>
  );
}

function ChoiceEditor({
  value, onChange,
}: { value: { en: string; ta: string }[]; onChange: (v: { en: string; ta: string }[]) => void }) {
  return (
    <div className="space-y-2">
      {value.map((opt, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={opt.en}
            onChange={(e) => onChange(value.map((o, idx) => (idx === i ? { ...o, en: e.target.value } : o)))}
            placeholder="English"
            className="field-input flex-1"
          />
          <input
            value={opt.ta}
            onChange={(e) => onChange(value.map((o, idx) => (idx === i ? { ...o, ta: e.target.value } : o)))}
            placeholder="தமிழ்"
            className="field-input flex-1 font-tamil"
          />
          <button
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-red-500 hover:bg-red-50 p-2 rounded-md"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...value, { en: '', ta: '' }])}
        className="btn-ghost text-xs"
      >
        <Plus size={12} /> Add choice
      </button>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}{required && <span className="text-red-500"> *</span>}</span>
      {children}
    </label>
  );
}
