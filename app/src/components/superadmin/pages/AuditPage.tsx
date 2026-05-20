import { useState } from 'react';
import { Search, Download, ShieldCheck, Filter } from 'lucide-react';
import { ADMIN_AUDIT_LOG } from '../../../adminData';

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  create_question:         { label: 'Created question',          color: 'badge bg-emerald-50 text-emerald-700 ring-emerald-200' },
  update_question:         { label: 'Updated question',          color: 'badge bg-blue-50 text-blue-700 ring-blue-200' },
  delete_question:         { label: 'Deleted question',          color: 'badge bg-red-50 text-red-700 ring-red-200' },
  create_section:          { label: 'Added section',             color: 'badge bg-emerald-50 text-emerald-700 ring-emerald-200' },
  add_workflow_stage:      { label: 'Added workflow stage',      color: 'badge bg-purple-50 text-purple-700 ring-purple-200' },
  change_sla:              { label: 'Changed SLA',               color: 'badge-amber' },
  assign_committee_member: { label: 'Assigned committee member', color: 'badge bg-tnblue-light text-tnblue ring-tnblue/20' },
  remove_committee_member: { label: 'Removed committee member',  color: 'badge bg-red-50 text-red-700 ring-red-200' },
  publish_schema:          { label: 'Published schema',          color: 'badge bg-tnpink-light text-tnpink-dark ring-tnpink/20' },
  open_award_cycle:        { label: 'Opened award cycle',        color: 'badge-green' },
  login:                   { label: 'Admin login',               color: 'badge bg-slate-100 text-slate-700 ring-slate-200' },
};

const ENTITY_FILTERS = ['ALL', 'question', 'section', 'workflow', 'committee', 'schema', 'cycle', 'session'];

export default function AuditPage() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = ADMIN_AUDIT_LOG.filter((e) => {
    if (filter !== 'ALL' && e.entityType !== filter) return false;
    if (!q) return true;
    const t = q.toLowerCase();
    return e.actorName.toLowerCase().includes(t) || e.action.includes(t) || e.entityId.toLowerCase().includes(t);
  });

  return (
    <div className="space-y-5">
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span className="font-semibold text-slate-800">Chain integrity:</span>
          <span className="badge-green">Verified · all hashes match</span>
          <span className="text-xs text-slate-500 ml-2">Admin-panel changes only</span>
        </div>
      </div>

      <div className="card p-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex gap-2 items-center flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by actor, action, or entity ID..." className="field-input pl-8 py-2" />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 ring-1 ring-slate-200 rounded-md pl-3 pr-1 py-1">
            <Filter size={12} className="text-slate-500" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1 text-sm text-slate-700 outline-none">
              {ENTITY_FILTERS.map((f) => <option key={f} value={f}>{f === 'ALL' ? 'All entities' : f}</option>)}
            </select>
          </div>
        </div>
        <button className="btn-ghost"><Download size={14} /> Export evidence pack</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold w-44">When</th>
              <th className="text-left px-5 py-3 font-semibold">Actor</th>
              <th className="text-left px-5 py-3 font-semibold">Action</th>
              <th className="text-left px-5 py-3 font-semibold">Entity</th>
              <th className="text-left px-5 py-3 font-semibold">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => {
              const action = ACTION_LABELS[e.action] ?? { label: e.action, color: 'badge' };
              return (
                <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-2.5 font-mono text-xs text-slate-600">{e.occurredAt}</td>
                  <td className="px-5 py-2.5">
                    <div className="font-semibold text-slate-900">{e.actorName}</div>
                    <div className="text-xs text-slate-500">{e.actorRole}</div>
                  </td>
                  <td className="px-5 py-2.5"><span className={action.color}>{action.label}</span></td>
                  <td className="px-5 py-2.5">
                    <div className="font-mono text-xs text-slate-700">{e.entityId}</div>
                    <div className="text-[11px] text-slate-400">{e.entityType}</div>
                  </td>
                  <td className="px-5 py-2.5 font-mono text-xs text-slate-600">{e.ip}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-slate-400 text-sm">No audit entries match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 italic">
        This log only records admin panel changes - schema edits, workflow updates, committee assignments, cycle changes.
        Teacher submissions and approver actions are recorded separately in the application audit trail.
      </p>
    </div>
  );
}
