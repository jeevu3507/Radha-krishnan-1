import { useState } from 'react';
import { ArrowRight, Clock, Edit3, X, GitBranch } from 'lucide-react';
import { EMIS_DESIGNATIONS } from '../../../adminData';
import type { EmisDesignation } from '../../../adminData';

interface Stage {
  id: string;
  label: string;
  designationCodes: string[];
  slaHours: number | null;
  type: 'user' | 'approver' | 'parallel' | 'terminal';
  branches?: { name: string; designationCode: string }[];
}

const SEED_WF: Stage[] = [
  { id: 'st1', label: 'Teacher Application', designationCodes: ['SGT', 'PST', 'BT', 'PG', 'PVT_TCH'], slaHours: null, type: 'user' },
  {
    id: 'st2',
    label: 'DEO Approval',
    designationCodes: ['DEEO_PRI', 'DEEO_SEC', 'DEO_PVT'],
    slaHours: 120,
    type: 'parallel',
    branches: [
      { name: 'Private',    designationCode: 'DEO_PVT' },
      { name: 'Elementary', designationCode: 'DEEO_PRI' },
      { name: 'Secondary',  designationCode: 'DEEO_SEC' },
    ],
  },
  { id: 'st3', label: 'CEO Shortlist',      designationCodes: ['CEO'],                   slaHours: 168, type: 'approver' },
  { id: 'st4', label: 'State Final Review', designationCodes: ['STATE_JD', 'STATE_DIR'], slaHours: 336, type: 'approver' },
  { id: 'st5', label: 'Awarded',            designationCodes: [],                        slaHours: null, type: 'terminal' },
];

export default function WorkflowPage({ year }: { year: number }) {
  const [stages, setStages] = useState<Stage[]>(SEED_WF);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);

  const updateStage = (s: Stage) => {
    setStages((arr) => arr.map((x) => (x.id === s.id ? s : x)));
    setEditingStage(null);
  };

  return (
    <div className="space-y-5">
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <span className="text-slate-500">Workflow for:</span>{' '}
          <span className="font-bold text-tnblue">Dr. Radhakrishnan Award - {year}</span>{' '}
          <span className="badge-green ml-2">ACTIVE</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost">Validate</button>
          <button className="btn-primary-blue">Publish workflow</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-slate-900 mb-1">Approval flow</h3>
        <p className="text-xs text-slate-500 mb-6">
          Teacher → DEO (Private / Elementary / Secondary) → CEO → State. Click any stage to edit.
        </p>

        <div className="overflow-x-auto">
          <div className="flex items-center gap-3 min-w-fit pb-2">
            {stages.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 flex-shrink-0">
                <StageCard stage={s} index={i + 1} onClick={() => setEditingStage(s)} />
                {i < stages.length - 1 && <ArrowRight size={18} className="text-slate-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-3">Stage configuration</h3>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 border-b border-slate-200">
            <tr>
              <th className="text-left py-2 font-semibold">Stage</th>
              <th className="text-left py-2 font-semibold">Type</th>
              <th className="text-left py-2 font-semibold">Designations (from EMIS DB)</th>
              <th className="text-right py-2 font-semibold">SLA</th>
              <th className="text-right py-2 font-semibold w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 font-semibold text-slate-900">{s.label}</td>
                <td className="py-3"><span className={typeBadge(s.type)}>{s.type}</span></td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {s.designationCodes.length === 0
                      ? <span className="text-xs text-slate-400 italic">—</span>
                      : s.designationCodes.map((code) => {
                          const d = EMIS_DESIGNATIONS.find((x) => x.code === code);
                          return <span key={code} className="badge-blue">{d?.nameEn ?? code} <span className="opacity-60">({code})</span></span>;
                        })}
                  </div>
                </td>
                <td className="py-3 text-right">
                  {s.slaHours
                    ? <span className="inline-flex items-center gap-1 text-slate-700"><Clock size={12} /> {s.slaHours}h</span>
                    : <span className="text-xs text-slate-400">—</span>}
                </td>
                <td className="py-3 text-right">
                  <button onClick={() => setEditingStage(s)} className="text-tnblue hover:bg-tnblue-light p-1.5 rounded-md">
                    <Edit3 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStage && <StageEditor stage={editingStage} onClose={() => setEditingStage(null)} onSave={updateStage} />}
    </div>
  );
}

function typeBadge(type: string) {
  const map: Record<string, string> = {
    user:     'badge bg-tnpink-light text-tnpink-dark ring-tnpink/20',
    approver: 'badge bg-tnblue-light text-tnblue ring-tnblue/20',
    parallel: 'badge bg-purple-50 text-purple-700 ring-purple-200',
    terminal: 'badge-green',
  };
  return map[type] ?? 'badge';
}

function cardColor(type: string) {
  const map: Record<string, string> = {
    user:     'border-tnpink/30 bg-tnpink-light/50',
    approver: 'border-tnblue/30 bg-tnblue-light/50',
    parallel: 'border-purple-300 bg-purple-50',
    terminal: 'border-emerald-300 bg-emerald-50',
  };
  return map[type] ?? 'border-slate-200';
}

function StageCard({ stage, index, onClick }: { stage: Stage; index: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className={'w-52 rounded-lg border-2 p-3 relative group hover:shadow-card transition text-left ' + cardColor(stage.type)}>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">{index}</span>
        <span className="text-[10px] uppercase tracking-wide font-bold text-slate-500">{stage.type}</span>
      </div>
      <div className="font-bold text-sm text-slate-900 mb-1">{stage.label}</div>
      {stage.branches ? (
        <div className="space-y-0.5 text-xs">
          {stage.branches.map((b) => (
            <div key={b.name} className="flex items-center gap-1">
              <GitBranch size={10} className="text-slate-500" /> {b.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs text-slate-600 truncate">
          {stage.designationCodes.length === 0 ? '—' : stage.designationCodes.slice(0, 2).join(', ')}
          {stage.designationCodes.length > 2 && ' +' + (stage.designationCodes.length - 2)}
        </div>
      )}
      {stage.slaHours !== null && (
        <div className="flex items-center gap-1 text-xs text-slate-600 mt-1.5">
          <Clock size={11} /> SLA {stage.slaHours}h
        </div>
      )}
    </button>
  );
}

function StageEditor({ stage, onSave, onClose }: { stage: Stage; onSave: (s: Stage) => void; onClose: () => void }) {
  const [s, setS] = useState<Stage>(stage);

  const toggleDesig = (code: string) => {
    setS((p) => ({
      ...p,
      designationCodes: p.designationCodes.includes(code) ? p.designationCodes.filter((c) => c !== code) : [...p.designationCodes, code],
    }));
  };

  const eligible: EmisDesignation[] = s.type === 'user'
    ? EMIS_DESIGNATIONS.filter((d) => d.level === 'TEACHING')
    : EMIS_DESIGNATIONS.filter((d) => d.level !== 'TEACHING');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="bg-tnblue text-white px-5 py-3 flex items-center justify-between">
          <div className="font-semibold">Edit stage: {s.label}</div>
          <button onClick={onClose}><X size={16} /></button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="field-label">Stage label</span>
              <input value={s.label} onChange={(e) => setS({ ...s, label: e.target.value })} className="field-input" />
            </label>
            <label className="block">
              <span className="field-label">SLA (hours)</span>
              <input type="number" value={s.slaHours ?? ''} onChange={(e) => setS({ ...s, slaHours: e.target.value ? +e.target.value : null })} className="field-input" placeholder="e.g., 120" />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="field-label mb-0">Allowed designations *</span>
              <span className="text-[10px] text-slate-400 italic">from EMIS DB · NO manual entry</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[280px] overflow-y-auto p-2 rounded-md ring-1 ring-slate-200 bg-slate-50">
              {eligible.map((d) => (
                <label key={d.code} className="flex items-center gap-2 p-2 rounded-md bg-white ring-1 ring-slate-100 hover:ring-tnblue cursor-pointer">
                  <input type="checkbox" checked={s.designationCodes.includes(d.code)} onChange={() => toggleDesig(d.code)} className="w-4 h-4 accent-tnblue" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{d.nameEn}</div>
                    <div className="text-[11px] text-slate-500 truncate font-mono">{d.code}{d.stream && ' · ' + d.stream}</div>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {s.designationCodes.length} designation{s.designationCodes.length === 1 ? '' : 's'} selected
            </p>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={() => onSave(s)} className="btn-primary-blue">Save stage</button>
        </div>
      </div>
    </div>
  );
}
