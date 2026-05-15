import { useState } from 'react';
import { CheckCircle2, AlertCircle, Eye, Upload } from 'lucide-react';
import { APPLICATIONS, SHORTLIST_TARGET, DISTRICT_QUOTA } from '../../data';

export default function DSCApprovalTab() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [certUploaded, setCertUploaded] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size >= SHORTLIST_TARGET) {
        alert(`You can only shortlist ${SHORTLIST_TARGET} teachers (1:2 ratio for ${DISTRICT_QUOTA} awards)`);
        return prev;
      } else next.add(id);
      return next;
    });

  const finalize = () => {
    if (selected.size !== SHORTLIST_TARGET) {
      alert(`Select exactly ${SHORTLIST_TARGET} teachers before finalising.`);
      return;
    }
    if (!certUploaded) {
      alert('Please upload the DSC Approval Certificate before finalising.');
      return;
    }
    alert('Shortlist finalised and forwarded to State Review.');
  };

  return (
    <section className="pt-4 space-y-5">
      <div className="rounded-md bg-tnblue-light/50 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-semibold text-tnblue">District quota:</span>{' '}
          <span className="font-bold">{DISTRICT_QUOTA} awards</span>
          <span className="mx-3 text-slate-400">·</span>
          <span className="font-semibold text-tnblue">Required shortlist (1:2):</span>{' '}
          <span className="font-bold">{SHORTLIST_TARGET} teachers</span>
        </div>
        <div className="text-sm font-bold">
          <span className={selected.size === SHORTLIST_TARGET ? 'text-emerald-700' : 'text-amber-700'}>
            {selected.size} / {SHORTLIST_TARGET} selected
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-tnblue-light text-tnblue">
            <tr>
              <th className="text-center px-3 py-2 font-semibold w-12">Pick</th>
              <th className="text-left px-3 py-2 font-semibold">EMIS ID</th>
              <th className="text-left px-3 py-2 font-semibold">Teacher</th>
              <th className="text-left px-3 py-2 font-semibold">School</th>
              <th className="text-right px-3 py-2 font-semibold">Marks</th>
              <th className="text-left px-3 py-2 font-semibold">Submitted</th>
              <th className="text-center px-3 py-2 font-semibold">Status</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {APPLICATIONS.map((a) => {
              const isPicked = selected.has(a.id);
              return (
                <tr key={a.id} className={isPicked ? 'bg-emerald-50' : 'hover:bg-slate-50'}>
                  <td className="px-3 py-2 text-center">
                    <input type="checkbox" checked={isPicked} onChange={() => toggle(a.id)} className="w-4 h-4 accent-tnblue-mid" />
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{a.emisId}</td>
                  <td className="px-3 py-2 font-semibold">{a.name}</td>
                  <td className="px-3 py-2 text-slate-600">{a.school}</td>
                  <td className="px-3 py-2 text-right font-bold text-tnblue">{a.marks?.toFixed(1)}</td>
                  <td className="px-3 py-2 text-slate-500 text-xs">{a.submittedAt}</td>
                  <td className="px-3 py-2 text-center">
                    {isPicked
                      ? <span className="badge-green"><CheckCircle2 size={12} /> Shortlisted</span>
                      : <span className="badge-blue">Pending</span>}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button className="text-tnblue-mid hover:text-tnblue" title="View application">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md px-5 py-3 flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">DSC Approval Certificate</p>
          <p className="text-xs">
            Download the certificate, get it signed by all DSC committee members, and upload back here.
          </p>
        </div>
        <label className="ml-auto cursor-pointer">
          <span className="btn-primary-blue">
            <Upload size={14} /> {certUploaded ? 'Replace' : 'Upload signed certificate'}
          </span>
          <input type="file" accept="application/pdf" className="hidden"
            onChange={(e) => e.target.files?.[0] && setCertUploaded(true)} />
        </label>
        {certUploaded && (
          <span className="badge-green flex-shrink-0"><CheckCircle2 size={12} /> Uploaded</span>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button className="btn-ghost">Save draft shortlist</button>
        <button onClick={finalize} className="btn-primary-blue">Finalise &amp; forward to State</button>
      </div>
    </section>
  );
}
