import { useState } from 'react';
import { Search, Plus, UserX, UserCheck, Edit3 } from 'lucide-react';
import { PLATFORM_USERS } from '../../../adminData';
import type { PlatformUser } from '../../../types';

const ROLE_COLORS: Record<string, string> = {
  TEACHER:         'badge bg-tnpink-light text-tnpink-dark ring-tnpink/20',
  HM:              'badge bg-amber-50 text-amber-800 ring-amber-200',
  BEO:             'badge bg-orange-50 text-orange-700 ring-orange-200',
  DEEO:            'badge bg-teal-50 text-teal-700 ring-teal-200',
  CEO:             'badge bg-tnblue-light text-tnblue ring-tnblue/20',
  DSC_MEMBER:      'badge bg-purple-50 text-purple-700 ring-purple-200',
  STATE_REVIEWER:  'badge bg-indigo-50 text-indigo-700 ring-indigo-200',
  STATE_ADMIN:     'badge bg-emerald-50 text-emerald-700 ring-emerald-200',
  SUPER_ADMIN:     'badge bg-slate-900 text-white ring-slate-900',
  TECH_ADMIN:      'badge bg-slate-200 text-slate-800 ring-slate-300',
};

export default function UsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(PLATFORM_USERS);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filtered = users.filter((u) => {
    const matchesQ = !q ||
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.emisId.includes(q) ||
      u.email.toLowerCase().includes(q.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesQ && matchesRole;
  });

  const toggle = (id: string) =>
    setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, EMIS ID, email…"
              className="field-input pl-8 py-2"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="field-input py-2 max-w-[160px]"
          >
            <option value="">All roles</option>
            {Object.keys(ROLE_COLORS).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button className="btn-primary-blue">
          <Plus size={14} /> Add user
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">User</th>
              <th className="text-left px-5 py-3 font-semibold">EMIS ID</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">District</th>
              <th className="text-left px-5 py-3 font-semibold">Last login</th>
              <th className="text-center px-5 py-3 font-semibold">Active</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-tnblue text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {u.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">{u.name}</div>
                      <div className="text-xs text-slate-500 truncate">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-slate-700">{u.emisId}</td>
                <td className="px-5 py-3">
                  <span className={ROLE_COLORS[u.role] ?? 'badge'}>{u.role}</span>
                </td>
                <td className="px-5 py-3 text-slate-700">{u.district}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{u.lastLogin}</td>
                <td className="px-5 py-3 text-center">
                  {u.active ? <span className="badge-green">Active</span> : <span className="badge bg-red-50 text-red-700 ring-red-200">Inactive</span>}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button title="Edit" className="w-8 h-8 rounded-md text-slate-500 hover:bg-tnblue hover:text-white flex items-center justify-center">
                      <Edit3 size={14} />
                    </button>
                    <button
                      title={u.active ? 'Deactivate' : 'Activate'}
                      onClick={() => toggle(u.id)}
                      className={
                        'w-8 h-8 rounded-md flex items-center justify-center transition ' +
                        (u.active
                          ? 'text-slate-500 hover:bg-red-500 hover:text-white'
                          : 'text-slate-500 hover:bg-emerald-500 hover:text-white')
                      }
                    >
                      {u.active ? <UserX size={14} /> : <UserCheck size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
