import { useState } from 'react';
import { Plus, Search, Copy, Archive, Edit, Eye } from 'lucide-react';
import { AWARDS } from '../../../adminData';
import type { AwardScheme } from '../../../types';

export default function AwardsPage() {
  const [list] = useState<AwardScheme[]>(AWARDS);
  const [q, setQ] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = list.filter((a) =>
    a.nameEn.toLowerCase().includes(q.toLowerCase()) ||
    a.code.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search awards by name or code…"
            className="field-input pl-8 py-2"
          />
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary-blue">
          <Plus size={16} /> Create new award
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Award</th>
              <th className="text-left px-5 py-3 font-semibold">Code</th>
              <th className="text-left px-5 py-3 font-semibold">Cycle</th>
              <th className="text-center px-5 py-3 font-semibold">Status</th>
              <th className="text-right px-5 py-3 font-semibold">Applicants</th>
              <th className="text-right px-5 py-3 font-semibold">Awarded</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="font-semibold text-slate-900">{a.nameEn}</div>
                  <div className="text-xs text-slate-500 font-tamil">{a.nameTa}</div>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-slate-600">{a.code}</td>
                <td className="px-5 py-3 text-slate-700">{a.cycleYear}</td>
                <td className="px-5 py-3 text-center">
                  <Status status={a.status} />
                </td>
                <td className="px-5 py-3 text-right font-mono">{a.applicantsCount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3 text-right font-mono">{a.awardedCount || '—'}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <Btn icon={<Eye size={14} />} title="View" />
                    <Btn icon={<Edit size={14} />} title="Edit" />
                    <Btn icon={<Copy size={14} />} title="Clone for next cycle" />
                    <Btn icon={<Archive size={14} />} title="Archive" />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                  No awards match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreate && <CreateAwardModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function Status({ status }: { status: string }) {
  const map: Record<string, string> = {
    OPEN: 'badge-green',
    DRAFT: 'badge-amber',
    CLOSED: 'badge-blue',
    ARCHIVED: 'badge bg-slate-100 text-slate-600 ring-slate-200',
  };
  return <span className={map[status] ?? 'badge'}>{status}</span>;
}

function Btn({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button title={title} className="w-8 h-8 rounded-md text-slate-500 hover:bg-tnblue hover:text-white flex items-center justify-center transition">
      {icon}
    </button>
  );
}

function CreateAwardModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [nameTa, setNameTa] = useState('');
  const [year, setYear] = useState(2026);
  const [cloneFrom, setCloneFrom] = useState('');

  const submit = () => {
    if (!name || !year) {
      alert('Please fill name and year');
      return;
    }
    alert(`Award "${name}" (${year}) created in DRAFT status${cloneFrom ? ', cloned from ' + cloneFrom : ''}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-lg overflow-hidden">
        <div className="bg-tnblue text-white px-5 py-3 font-semibold">Create new award</div>
        <div className="p-5 space-y-4">
          <Field label="Name (English)" required>
            <input value={name} onChange={(e) => setName(e.target.value)} className="field-input" placeholder="e.g., CM's Best Teacher Award" />
          </Field>
          <Field label="Name (Tamil)">
            <input value={nameTa} onChange={(e) => setNameTa(e.target.value)} className="field-input font-tamil" placeholder="விருது பெயர்" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Cycle year" required>
              <input type="number" value={year} onChange={(e) => setYear(+e.target.value)} className="field-input" />
            </Field>
            <Field label="Clone from (optional)">
              <select value={cloneFrom} onChange={(e) => setCloneFrom(e.target.value)} className="field-input">
                <option value="">— Start blank —</option>
                {AWARDS.map((a) => (
                  <option key={a.id} value={a.code}>{a.nameEn} {a.cycleYear}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={submit} className="btn-primary-blue">Create in draft</button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}{required && <span className="text-red-500"> *</span>}</span>
      {children}
    </label>
  );
}
