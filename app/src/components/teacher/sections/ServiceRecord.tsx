import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SEED_TEACHER } from '../../../data';
import type { Posting } from '../../../types';

interface Props { onComplete: () => void; locked: boolean }

export default function ServiceRecord({ onComplete, locked }: Props) {
  const [postings, setPostings] = useState<Posting[]>(SEED_TEACHER.postings);

  const add = () =>
    setPostings((p) => [
      ...p,
      { id: 'p' + (p.length + 1), school: '', fromDate: '', toDate: '', designation: '' },
    ]);

  const update = (id: string, key: keyof Posting, value: string) =>
    setPostings((p) => p.map((it) => (it.id === id ? { ...it, [key]: value } : it)));

  const remove = (id: string) =>
    setPostings((p) => p.filter((it) => it.id !== id));

  const totalYears = postings.reduce((sum, pst) => {
    if (!pst.fromDate) return sum;
    const to = pst.toDate ? new Date(pst.toDate) : new Date();
    const from = new Date(pst.fromDate);
    return sum + (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  }, 0);

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg ring-1 ring-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-tnpink-light text-tnpink-dark">
            <tr>
              <th className="text-left px-3 py-2 font-semibold">பள்ளி / School</th>
              <th className="text-left px-3 py-2 font-semibold">முதல் / From</th>
              <th className="text-left px-3 py-2 font-semibold">வரை / To</th>
              <th className="text-left px-3 py-2 font-semibold">பணியிடம் / Designation</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {postings.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-3 py-2">
                  <input value={p.school} disabled={locked}
                    onChange={(e) => update(p.id, 'school', e.target.value)}
                    className="field-input field-input-pink py-1.5" />
                </td>
                <td className="px-3 py-2">
                  <input type="date" value={p.fromDate} disabled={locked}
                    onChange={(e) => update(p.id, 'fromDate', e.target.value)}
                    className="field-input field-input-pink py-1.5" />
                </td>
                <td className="px-3 py-2">
                  <input type="date" value={p.toDate} disabled={locked}
                    placeholder="Till date"
                    onChange={(e) => update(p.id, 'toDate', e.target.value)}
                    className="field-input field-input-pink py-1.5" />
                </td>
                <td className="px-3 py-2">
                  <input value={p.designation} disabled={locked}
                    onChange={(e) => update(p.id, 'designation', e.target.value)}
                    className="field-input field-input-pink py-1.5" />
                </td>
                <td className="px-3 py-2 text-right">
                  <button disabled={locked} onClick={() => remove(p.id)}
                    className="text-red-500 hover:text-red-700 disabled:opacity-30">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={add} disabled={locked} className="btn-ghost">
          <Plus size={16} /> Add posting
        </button>
        <div className="text-sm">
          <span className="text-slate-600">Total service: </span>
          <span className="font-bold text-tnpink-dark">{totalYears.toFixed(1)} years</span>
          {totalYears < 15 && (
            <span className="ml-2 text-xs text-amber-600">(minimum 15 required)</span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button className="btn-ghost" disabled={locked}>Save draft</button>
        <button className="btn-primary-pink" onClick={onComplete} disabled={locked}>
          {locked ? 'Submitted' : 'Submit section'}
        </button>
      </div>
    </div>
  );
}
