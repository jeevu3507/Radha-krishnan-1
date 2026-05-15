import { useState } from 'react';
import { SEED_TEACHER } from '../../../data';

interface Props { onComplete: () => void; locked: boolean }

export default function Qualification({ onComplete, locked }: Props) {
  const [ug, setUg] = useState('B.Sc. Mathematics');
  const [pg, setPg] = useState(SEED_TEACHER.pgDegree ?? '');
  const [bEd, setBEd] = useState('B.Ed., Madras University, 1990');
  const [phd, setPhd] = useState('');
  const [other, setOther] = useState('');

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
        <F label="இளங்கலை பட்டம்"          en="UG Degree"                  v={ug}    set={setUg}    disabled={locked} required />
        <F label="முதுகலை பட்டம்"          en="PG Degree"                  v={pg}    set={setPg}    disabled={locked} required />
        <F label="ஆசிரியர் பயிற்சி பட்டம்"  en="B.Ed. / D.El.Ed."           v={bEd}   set={setBEd}   disabled={locked} required />
        <F label="முனைவர் பட்டம் (M.Phil/PhD)" en="M.Phil / Ph.D"           v={phd}   set={setPhd}   disabled={locked} />
        <div className="md:col-span-2">
          <F label="பிற தகுதிகள்" en="Other Qualifications / Certifications" v={other} set={setOther} disabled={locked} />
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

function F({ label, en, v, set, disabled, required }:
  { label: string; en: string; v: string; set: (s: string) => void; disabled?: boolean; required?: boolean }) {
  return (
    <div>
      <label className="field-label normal-case tracking-normal">
        <span className="font-tamil text-sm">{label}</span>
        <span className="text-xs text-slate-500 ml-1">/ {en}</span>
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input value={v} disabled={disabled} onChange={(e) => set(e.target.value)}
        className="field-input field-input-pink" />
    </div>
  );
}
