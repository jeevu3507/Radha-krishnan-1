import { Download } from 'lucide-react';
import { APPLICATIONS } from '../../data';

export default function TeacherMarkListTab() {
  const ranked = [...APPLICATIONS].sort((a, b) => (b.marks ?? 0) - (a.marks ?? 0));

  return (
    <section className="pt-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Teacher Mark List — ranked by composite score
        </h2>
        <button className="btn-primary-blue">
          <Download size={14} /> Export XLSX
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-tnblue-light text-tnblue">
            <tr>
              <th className="text-center px-3 py-2 font-semibold w-12">Rank</th>
              <th className="text-left   px-3 py-2 font-semibold">EMIS ID</th>
              <th className="text-left   px-3 py-2 font-semibold">Teacher</th>
              <th className="text-left   px-3 py-2 font-semibold">School</th>
              <th className="text-right  px-3 py-2 font-semibold">Class X %</th>
              <th className="text-right  px-3 py-2 font-semibold">Class XII %</th>
              <th className="text-right  px-3 py-2 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {ranked.map((a, i) => (
              <tr key={a.id} className={i < 3 ? 'bg-emerald-50' : 'hover:bg-slate-50'}>
                <td className="px-3 py-2 text-center">
                  <span className={
                    'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ' +
                    (i === 0 ? 'bg-amber-200 text-amber-800' :
                     i === 1 ? 'bg-slate-200 text-slate-800' :
                     i === 2 ? 'bg-orange-200 text-orange-800' :
                     'bg-slate-100 text-slate-600')
                  }>
                    {i + 1}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-xs">{a.emisId}</td>
                <td className="px-3 py-2 font-semibold">{a.name}</td>
                <td className="px-3 py-2 text-slate-600">{a.school}</td>
                <td className="px-3 py-2 text-right">{a.classXPercent.toFixed(1)}</td>
                <td className="px-3 py-2 text-right">{a.classXIIPercent.toFixed(1)}</td>
                <td className="px-3 py-2 text-right font-bold text-tnblue">{a.marks?.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 italic">
        Top 3 highlighted = district award winners (subject to State Review). Shortlist of 6 (1:2 ratio) is selected by DSC; State Review picks the final 3.
      </p>
    </section>
  );
}
