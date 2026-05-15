import { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { COMMITTEE_SEED } from '../../data';
import type { CommitteeMember } from '../../types';

export default function CommitteeMembersTab() {
  const [members, setMembers] = useState<CommitteeMember[]>(COMMITTEE_SEED);

  const update = (id: string, key: keyof CommitteeMember, value: string) =>
    setMembers((m) => m.map((it) => (it.id === id ? { ...it, [key]: value } : it)));

  const save = (id: string) => {
    const m = members.find((x) => x.id === id);
    if (!m) return;
    if (!m.name || !m.emisId || !m.position || !m.mobile || !m.email) {
      alert('Please fill all required fields before saving.');
      return;
    }
    setMembers((arr) => arr.map((it) => (it.id === id ? { ...it, saved: true } : it)));
  };

  const addDEO = () => {
    const count = members.filter((m) => m.designation === 'DEO').length + 1;
    setMembers((arr) => [
      ...arr,
      {
        id: 'cm-deo-' + count,
        designation: 'DEO',
        designationLabel: {
          en: 'District Educational Officer(S) - Member',
          ta: 'மாவட்டக் கல்வி அதிகாரி - உறுப்பினர்',
        },
        name: '', emisId: '', position: '', mobile: '', email: '', saved: false,
      },
    ]);
  };

  const deoCount = members.filter((m) => m.designation === 'DEO').length;

  return (
    <section className="pt-4">
      <h2 className="text-base font-semibold text-slate-800 mb-5">
        District Selection Committee members
      </h2>

      <div className="space-y-4">
        {members.map((m, idx) => {
          const isLastDeo = m.designation === 'DEO' && idx === members.length - 1;
          return (
            <div key={m.id} className="bg-tnblue-light/40 rounded-md p-5 ring-1 ring-tnblue/10 relative">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  {m.designationLabel.en}
                  {m.designation === 'DEO' && deoCount > 1 && (
                    <span className="ml-2 text-xs text-slate-500">
                      #{members.filter(x => x.designation === 'DEO').findIndex(x => x.id === m.id) + 1}
                    </span>
                  )}
                </h3>
                {m.saved && (
                  <span className="badge-green">
                    <CheckCircle2 size={12} /> Saved
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-5 gap-3">
                <F label="Name" required value={m.name}     onChange={(v) => update(m.id, 'name', v)}     disabled={m.saved} />
                <F label="EMIS ID" required value={m.emisId} onChange={(v) => update(m.id, 'emisId', v)}   disabled={m.saved} />
                <F label="Designation" required value={m.position} onChange={(v) => update(m.id, 'position', v)} disabled={m.saved} />
                <F label="Mobile No" required value={m.mobile} onChange={(v) => update(m.id, 'mobile', v)} disabled={m.saved} />
                <div className="flex items-end gap-2">
                  <F label="Email" required value={m.email}   onChange={(v) => update(m.id, 'email', v)} disabled={m.saved} />
                  <button
                    onClick={() => save(m.id)}
                    disabled={m.saved}
                    className="h-[42px] px-5 rounded-md bg-tnblue-mid hover:bg-tnblue text-white text-sm font-semibold disabled:opacity-50"
                  >
                    {m.saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              {isLastDeo && (
                <button
                  onClick={addDEO}
                  className="absolute -top-3 right-5 w-8 h-8 rounded-full bg-tnblue-mid hover:bg-tnblue text-white shadow-card flex items-center justify-center"
                  title="Add another DEO"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function F({
  label, required, value, onChange, disabled,
}: {
  label: string; required?: boolean; value: string;
  onChange: (v: string) => void; disabled?: boolean;
}) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
    </div>
  );
}
