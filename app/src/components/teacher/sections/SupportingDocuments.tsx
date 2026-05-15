import { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

interface Props { onComplete: () => void; locked: boolean }

const DOCS = [
  { id: 'service_cert',   ta: 'பணி சான்றிதழ்',                en: 'Service Certificate',     required: true },
  { id: 'qualification',  ta: 'தகுதி சான்றிதழ்கள்',           en: 'Qualification Certificates', required: true },
  { id: 'awards',         ta: 'விருது சான்றிதழ்கள்',          en: 'Award Certificates',      required: false },
  { id: 'innovations',    ta: 'புதுமைகள் ஆதார ஆவணம்',         en: 'Innovation Proofs',       required: false },
  { id: 'no_disciplinary',ta: 'ஒழுங்கு நடவடிக்கை இல்லை சான்று', en: 'No Disciplinary Action',  required: true },
];

export default function SupportingDocuments({ onComplete, locked }: Props) {
  const [files, setFiles] = useState<Record<string, string>>({});

  const onPick = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFiles((p) => ({ ...p, [id]: f.name }));
  };

  const allRequired = DOCS.filter((d) => d.required).every((d) => files[d.id]);

  const submit = () => {
    if (!allRequired) {
      alert('Please upload all required documents');
      return;
    }
    onComplete();
  };

  return (
    <div className="space-y-3">
      {DOCS.map((d) => (
        <label
          key={d.id}
          className="flex items-center justify-between gap-3 bg-white rounded-lg ring-1 ring-slate-200 px-4 py-3 cursor-pointer hover:ring-tnpink/60"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {d.en}{d.required && <span className="text-red-500"> *</span>}
            </p>
            <p className="text-xs text-slate-500 font-tamil truncate">{d.ta}</p>
            {files[d.id] && (
              <p className="text-xs text-emerald-700 mt-1 truncate">
                <CheckCircle2 size={12} className="inline -mt-0.5" /> {files[d.id]}
              </p>
            )}
          </div>
          <span className="btn-ghost flex-shrink-0 cursor-pointer">
            <Upload size={14} /> {files[d.id] ? 'Replace' : 'Upload PDF'}
          </span>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={locked}
            onChange={(e) => onPick(d.id, e)}
          />
        </label>
      ))}

      <p className="text-xs text-emerald-700">* Upload PDF, max 5 MB each. AV-scanned on upload.</p>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button className="btn-ghost" disabled={locked}>Save draft</button>
        <button className="btn-primary-pink" onClick={submit} disabled={locked}>
          {locked ? 'Submitted' : 'Submit application'}
        </button>
      </div>
    </div>
  );
}
