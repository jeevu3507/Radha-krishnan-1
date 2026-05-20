import { useMemo, useState } from 'react';
import { Plus, Trash2, X, Search } from 'lucide-react';
import { EMIS_DESIGNATIONS, EMIS_USERS, DISTRICTS } from '../../../adminData';
import type { EmisUser } from '../../../adminData';

interface CommitteeMember {
  id: string;
  designationCode: string;
  emisId: string;
  name: string;
  email: string;
  mobile: string;
}

const SEED: Record<string, CommitteeMember[]> = {
  Coimbatore: [
    { id: 'm1', designationCode: 'CEO',       emisId: '10000001', name: 'BALAMURALI R',       email: 'ceo.cbe@tnschools.gov.in',      mobile: '9442011111' },
    { id: 'm2', designationCode: 'DIET_PRIN', emisId: '10000007', name: 'DIET PRINCIPAL CBE', email: 'diet.cbe@tnschools.gov.in',     mobile: '9442077777' },
    { id: 'm3', designationCode: 'DEEO_SEC',  emisId: '10000003', name: 'MEENAKSHI S',        email: 'deeo.sec.cbe@tnschools.gov.in', mobile: '9442033333' },
  ],
  Chennai: [
    { id: 'm4', designationCode: 'CEO', emisId: '10000002', name: 'RAJENDRAN K', email: 'ceo.chennai@tnschools.gov.in', mobile: '9442022222' },
  ],
};

export default function CommitteesPage({ year }: { year: number }) {
  const [district, setDistrict] = useState('Coimbatore');
  const [committees, setCommittees] = useState(SEED);
  const [adding, setAdding] = useState(false);
  const members = committees[district] ?? [];

  const remove = (id: string) =>
    setCommittees((c) => ({ ...c, [district]: c[district].filter((m) => m.id !== id) }));

  const add = (m: CommitteeMember) => {
    setCommittees((c) => ({ ...c, [district]: [...(c[district] ?? []), m] }));
    setAdding(false);
  };

  return (
    <div className="space-y-5">
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-700">District Selection Committee for</span>
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="field-input max-w-xs">
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <span className="text-xs text-slate-500">· cycle {year}</span>
        <button onClick={() => setAdding(true)} className="ml-auto btn-primary-blue">
          <Plus size={14} /> Add member
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Designation</th>
              <th className="text-left px-5 py-3 font-semibold">Member</th>
              <th className="text-left px-5 py-3 font-semibold">EMIS ID</th>
              <th className="text-left px-5 py-3 font-semibold">Contact</th>
              <th className="text-right px-5 py-3 font-semibold w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const d = EMIS_DESIGNATIONS.find((x) => x.code === m.designationCode);
              return (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="font-semibold text-slate-900 text-sm">{d?.nameEn}</div>
                    <div className="text-xs text-slate-500 font-mono">{m.designationCode}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-tnblue text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-semibold text-slate-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs">{m.emisId}</td>
                  <td className="px-5 py-3 text-xs text-slate-600">
                    <div>{m.email}</div>
                    <div>{m.mobile}</div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => remove(m.id)} className="text-slate-500 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {members.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-sm text-slate-400">No committee members yet for {district}. Click "Add member" to start.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 italic">
        Committee members are selected from EMIS DB only - no manual entry. Pick a designation, then pick a real EMIS user matching that designation.
      </p>

      {adding && <AddMemberModal district={district} existing={members} onClose={() => setAdding(false)} onAdd={add} />}
    </div>
  );
}

function AddMemberModal({ district, existing, onClose, onAdd }: { district: string; existing: CommitteeMember[]; onClose: () => void; onAdd: (m: CommitteeMember) => void }) {
  const [designationCode, setDesignationCode] = useState('');
  const [emisId, setEmisId] = useState('');
  const [search, setSearch] = useState('');

  const matchingUsers: EmisUser[] = useMemo(() => {
    let arr = EMIS_USERS;
    if (designationCode) arr = arr.filter((u) => u.designationCode === designationCode);
    if (search) {
      const t = search.toLowerCase();
      arr = arr.filter((u) => u.name.toLowerCase().includes(t) || u.emisId.includes(t) || u.district.toLowerCase().includes(t));
    }
    return arr;
  }, [designationCode, search]);

  const chosen = EMIS_USERS.find((u) => u.emisId === emisId);
  const eligibleDesigs = EMIS_DESIGNATIONS.filter((d) => d.level !== 'TEACHING');

  const submit = () => {
    if (!designationCode || !chosen) { alert('Pick a designation and a member from EMIS DB'); return; }
    if (existing.some((m) => m.emisId === chosen.emisId)) { alert('This member is already on the committee'); return; }
    onAdd({
      id: 'm-' + Math.random().toString(36).slice(2, 8),
      designationCode,
      emisId: chosen.emisId,
      name: chosen.name,
      email: chosen.email,
      mobile: chosen.mobile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="bg-tnblue text-white px-5 py-3 flex items-center justify-between">
          <div className="font-semibold">Add committee member for {district}</div>
          <button onClick={onClose}><X size={16} /></button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          <label className="block">
            <div className="flex items-center justify-between mb-1">
              <span className="field-label mb-0">1. Pick designation *</span>
              <span className="text-[10px] text-slate-400 italic">from EMIS DB</span>
            </div>
            <select value={designationCode} onChange={(e) => { setDesignationCode(e.target.value); setEmisId(''); }} className="field-input">
              <option value="">- Select designation -</option>
              {eligibleDesigs.map((d) => <option key={d.code} value={d.code}>{d.nameEn} ({d.code})</option>)}
            </select>
          </label>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="field-label mb-0">2. Pick member *</span>
              <span className="text-[10px] text-slate-400 italic">from EMIS DB</span>
            </div>
            <div className="relative mb-2">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={designationCode ? 'Search by name, EMIS ID, district...' : 'Pick a designation first'} disabled={!designationCode} className="field-input pl-8 disabled:bg-slate-50" />
            </div>
            <div className="max-h-[280px] overflow-y-auto rounded-md ring-1 ring-slate-200 bg-slate-50">
              {!designationCode ? (
                <p className="text-center text-xs text-slate-400 py-8">Choose a designation to see eligible members</p>
              ) : matchingUsers.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-8">No matching users in EMIS DB</p>
              ) : (
                <ul className="divide-y divide-slate-200">
                  {matchingUsers.map((u) => (
                    <li key={u.emisId}>
                      <label className="flex items-center gap-3 p-3 hover:bg-white cursor-pointer">
                        <input type="radio" name="emis-user" checked={emisId === u.emisId} onChange={() => setEmisId(u.emisId)} className="w-4 h-4 accent-tnblue" />
                        <div className="w-8 h-8 rounded-full bg-tnblue text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {u.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">{u.name}</div>
                          <div className="text-xs text-slate-500 truncate"><span className="font-mono">{u.emisId}</span> · {u.district} · {u.email}</div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={submit} className="btn-primary-blue" disabled={!emisId}>Add to committee</button>
        </div>
      </div>
    </div>
  );
}
