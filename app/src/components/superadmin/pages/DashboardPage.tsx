import { useMemo, useState } from 'react';
import { Users2, CheckSquare, Send, Award, ArrowRight, GraduationCap, School, Building2, Calendar, Edit3, X } from 'lucide-react';
import { SCHEMES, DISTRICT_ROLLUP, ADMIN_AUDIT_LOG } from '../../../adminData';
import type { AdminPage } from '../SuperAdminPanel';

export default function DashboardPage({ year, onNavigate }: { year: number; onNavigate: (p: AdminPage) => void }) {
  const totalApps     = DISTRICT_ROLLUP.reduce((s, d) => s + d.totalApps, 0);
  const deoApproved   = DISTRICT_ROLLUP.reduce((s, d) => s + d.deoApproved, 0);
  const ceoToState    = DISTRICT_ROLLUP.reduce((s, d) => s + d.ceoShortlist, 0);
  const stateSelected = DISTRICT_ROLLUP.reduce((s, d) => s + d.stateSelected, 0);
  const el  = SCHEMES.find((s) => s.code === 'ELEMENTARY')!;
  const sec = SCHEMES.find((s) => s.code === 'SECONDARY')!;
  const pvt = SCHEMES.find((s) => s.code === 'PRIVATE')!;

  // Application window dates - editable by State Admin, keyed per year
  const [windows, setWindows] = useState<Record<number, { start: string; end: string }>>({
    2025: { start: '2025-04-01', end: '2025-05-31' },
    2026: { start: '2026-04-01', end: '2026-05-31' },
    2027: { start: '2027-04-01', end: '2027-05-31' },
    2028: { start: '2028-04-01', end: '2028-05-31' },
  });
  const [editing, setEditing] = useState(false);

  const w = windows[year] ?? { start: year + '-04-01', end: year + '-05-31' };
  const status = useMemo(() => statusFor(w.start, w.end), [w.start, w.end]);

  const saveWindow = (start: string, end: string) => {
    setWindows((prev) => ({ ...prev, [year]: { start, end } }));
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="card p-5 flex flex-wrap items-center gap-4 justify-between">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Module</div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Dr. Radhakrishnan Award <span className="text-tnpink">- {year}</span>
          </h2>
          <p className="text-xs text-slate-500 font-tamil mt-0.5">டாக்டர். ராதாகிருஷ்ணன் விருது {year}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={statusBadge(status)}>Cycle {status}</span>
        </div>
      </div>

      {/* Application window — editable */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-tnblue-light text-tnblue flex items-center justify-center flex-shrink-0">
              <Calendar size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 leading-tight">Application window for teachers</h3>
              <p className="text-xs text-slate-500">Teachers in EMIS can submit only between these dates · {year} cycle</p>
            </div>
          </div>
          <button onClick={() => setEditing(true)} className="btn-primary-blue">
            <Edit3 size={14} /> Edit dates
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <DatePill label="Application starts on" date={w.start} ta="விண்ணப்பம் தொடங்கும் தேதி" tone="green" />
          <DatePill label="Application ends on"   date={w.end}   ta="விண்ணப்பம் முடிவடையும் தேதி" tone="red" />
          <StatusPill status={status} start={w.start} end={w.end} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi step={1} label="Total applications from teachers" value={totalApps}     icon={<Users2 size={18} />}      tone="blue"   pct={100} />
        <Kpi step={2} label="Approved by DEO"                  value={deoApproved}   icon={<CheckSquare size={18} />} tone="amber"  pct={(deoApproved/totalApps)*100} />
        <Kpi step={3} label="Sent to State by CEO"             value={ceoToState}    icon={<Send size={18} />}        tone="purple" pct={(ceoToState/totalApps)*100} />
        <Kpi step={4} label="Finally selected for award"       value={stateSelected} icon={<Award size={18} />}       tone="pink"   pct={(stateSelected/totalApps)*100} />
      </div>

      <div className="card p-5">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="font-bold text-slate-900">Finally selected — by stream</h3>
          <span className="text-xs text-slate-500">{year} cycle</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Stream icon={<School size={18} />}        label="Elementary" ta="தொடக்க"  c={el.awardedCount  || el.shortlistedCount}  of={el.applicantsCount}  tone="pink" />
          <Stream icon={<GraduationCap size={18} />} label="Secondary"  ta="உயர்நிலை" c={sec.awardedCount || sec.shortlistedCount} of={sec.applicantsCount} tone="blue" />
          <Stream icon={<Building2 size={18} />}     label="Private"    ta="தனியார்"   c={pvt.awardedCount || pvt.shortlistedCount} of={pvt.applicantsCount} tone="purple" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900">Scheme breakdown</h3>
            <button onClick={() => onNavigate('reports')} className="text-xs text-tnblue font-semibold hover:underline inline-flex items-center gap-1">
              Open reports <ArrowRight size={12} />
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 border-b border-slate-200">
              <tr>
                <th className="text-left py-2 font-semibold">Scheme</th>
                <th className="text-right py-2 font-semibold">Applicants</th>
                <th className="text-right py-2 font-semibold">Shortlist</th>
                <th className="text-right py-2 font-semibold">Quota/dist</th>
              </tr>
            </thead>
            <tbody>
              {SCHEMES.map((s) => (
                <tr key={s.code} className="border-b border-slate-100">
                  <td className="py-3">
                    <div className="font-semibold text-slate-900">{s.nameEn}</div>
                    <div className="text-xs text-slate-500 font-tamil">{s.nameTa}</div>
                  </td>
                  <td className="py-3 text-right font-mono">{s.applicantsCount}</td>
                  <td className="py-3 text-right font-mono font-bold text-tnblue">{s.shortlistedCount}</td>
                  <td className="py-3 text-right">{s.quotaPerDistrict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900">Recent admin changes</h3>
            <button onClick={() => onNavigate('audit')} className="text-xs text-tnblue font-semibold hover:underline inline-flex items-center gap-1">
              All <ArrowRight size={12} />
            </button>
          </div>
          <ul className="space-y-3">
            {ADMIN_AUDIT_LOG.slice(0, 5).map((e) => (
              <li key={e.id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-2 rounded-full bg-tnblue flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-slate-800 truncate">
                    <span className="text-slate-500">{e.action.replace(/_/g, ' ')}</span>{' '}
                    <span className="font-mono text-xs text-slate-600">{e.entityId}</span>
                  </div>
                  <div className="text-xs text-slate-400">{e.occurredAt}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editing && <EditDatesModal year={year} initialStart={w.start} initialEnd={w.end} onCancel={() => setEditing(false)} onSave={saveWindow} />}
    </div>
  );
}

function statusFor(start: string, end: string): 'UPCOMING' | 'OPEN' | 'CLOSED' {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const s = new Date(start); s.setHours(0, 0, 0, 0);
  const e = new Date(end); e.setHours(0, 0, 0, 0);
  if (now < s) return 'UPCOMING';
  if (now > e) return 'CLOSED';
  return 'OPEN';
}

function statusBadge(s: string) {
  const map: Record<string, string> = {
    OPEN: 'badge-green',
    UPCOMING: 'badge-amber',
    CLOSED: 'badge bg-slate-100 text-slate-600 ring-slate-200',
  };
  return map[s];
}

function DatePill({ label, date, ta, tone }: { label: string; date: string; ta: string; tone: 'green' | 'red' }) {
  const t = tone === 'green'
    ? 'bg-emerald-50 ring-emerald-200 text-emerald-800'
    : 'bg-red-50 ring-red-200 text-red-800';
  return (
    <div className={'ring-1 rounded-lg p-4 ' + t}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</div>
      <div className="text-2xl font-bold mt-1">{fmt(date)}</div>
      <div className="text-[11px] font-tamil mt-1 opacity-80">{ta}</div>
    </div>
  );
}

function StatusPill({ status, start, end }: { status: 'UPCOMING' | 'OPEN' | 'CLOSED'; start: string; end: string }) {
  let detail = '';
  const now = new Date();
  if (status === 'OPEN') {
    const days = Math.max(0, Math.ceil((new Date(end).getTime() - now.getTime()) / 86400000));
    detail = days + ' day' + (days === 1 ? '' : 's') + ' remaining';
  } else if (status === 'UPCOMING') {
    const days = Math.ceil((new Date(start).getTime() - now.getTime()) / 86400000);
    detail = 'opens in ' + days + ' day' + (days === 1 ? '' : 's');
  } else {
    detail = 'cycle closed';
  }
  return (
    <div className={'ring-1 rounded-lg p-4 ' + (status === 'OPEN' ? 'bg-tnblue-light ring-tnblue/20 text-tnblue' : 'bg-slate-50 ring-slate-200 text-slate-700')}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Current status</div>
      <div className="text-2xl font-bold mt-1">{status}</div>
      <div className="text-[11px] mt-1 opacity-80">{detail}</div>
    </div>
  );
}

function fmt(iso: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function EditDatesModal({ year, initialStart, initialEnd, onCancel, onSave }: { year: number; initialStart: string; initialEnd: string; onCancel: () => void; onSave: (s: string, e: string) => void }) {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const submit = () => {
    if (!start || !end) { alert('Both start and end dates are required'); return; }
    if (new Date(end) < new Date(start)) { alert('End date must be after start date'); return; }
    onSave(start, end);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-md overflow-hidden">
        <div className="bg-tnblue text-white px-5 py-3 flex items-center justify-between">
          <div className="font-semibold">Edit application window — {year}</div>
          <button onClick={onCancel}><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600">
            Teachers can submit applications on the EMIS portal only between these dates.
            Changing this will immediately affect the EMIS teacher login.
          </p>
          <label className="block">
            <span className="field-label">Application start date *</span>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="field-input" />
          </label>
          <label className="block">
            <span className="field-label">Application end date *</span>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="field-input" />
          </label>
          <div className="text-xs text-slate-500 italic">
            Tip: leave a buffer of 3-5 days before the end date for technical issues. Change is logged in audit.
          </div>
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-ghost">Cancel</button>
          <button onClick={submit} className="btn-primary-blue">Save dates</button>
        </div>
      </div>
    </div>
  );
}

function Kpi({ step, label, value, icon, tone, pct }: { step: number; label: string; value: number; icon: React.ReactNode; tone: 'blue'|'amber'|'purple'|'pink'; pct: number }) {
  const t: Record<string, { bg: string; text: string; bar: string }> = {
    blue:   { bg: 'bg-tnblue-light', text: 'text-tnblue',      bar: 'bg-tnblue' },
    amber:  { bg: 'bg-amber-100',    text: 'text-amber-700',   bar: 'bg-amber-500' },
    purple: { bg: 'bg-purple-100',   text: 'text-purple-700',  bar: 'bg-purple-500' },
    pink:   { bg: 'bg-tnpink-light', text: 'text-tnpink-dark', bar: 'bg-tnpink' },
  };
  const s = t[tone];
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={'w-10 h-10 rounded-lg flex items-center justify-center ' + s.bg + ' ' + s.text}>{icon}</div>
        <span className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Step {step}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 leading-tight">{value.toLocaleString('en-IN')}</div>
      <div className="text-xs text-slate-600 mt-1 leading-snug">{label}</div>
      <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={'h-full rounded-full ' + s.bar} style={{ width: Math.min(100, pct) + '%' }} />
      </div>
      <div className="text-[10px] text-slate-400 mt-1">{pct.toFixed(1)}% of total</div>
    </div>
  );
}

function Stream({ icon, label, ta, c, of, tone }: { icon: React.ReactNode; label: string; ta: string; c: number; of: number; tone: 'pink'|'blue'|'purple' }) {
  const t: Record<string, string> = {
    pink:   'bg-tnpink-light text-tnpink-dark',
    blue:   'bg-tnblue-light text-tnblue',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <div className="ring-1 ring-slate-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-soft transition">
      <div className={'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ' + t[tone]}>{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-slate-500 font-semibold">{label} <span className="font-tamil text-[11px]">· {ta}</span></div>
        <div className="text-2xl font-bold text-slate-900 leading-none mt-1">{c}</div>
        <div className="text-xs text-slate-500 mt-1">of {of.toLocaleString('en-IN')}</div>
      </div>
    </div>
  );
}
