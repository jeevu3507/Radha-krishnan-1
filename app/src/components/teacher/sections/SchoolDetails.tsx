import { useState } from 'react';
import { SEED_TEACHER } from '../../../data';

interface Props { onComplete: () => void; locked: boolean }

export default function SchoolDetails({ onComplete, locked }: Props) {
  const [data, setData] = useState({
    schoolName: SEED_TEACHER.school,
    schoolType: 'Government Higher Secondary School',
    udise: '33042001234',
    medium: 'Tamil & English',
    studentStrength: '1240',
    location: 'Rural',
  });

  const set = (k: keyof typeof data) => (v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-3 gap-x-5 gap-y-4">
        <F label="பள்ளியின் பெயர்" subLabel="School Name" value={data.schoolName} onChange={set('schoolName')} disabled={locked} required />
        <F label="பள்ளி வகை" subLabel="School Type" value={data.schoolType} onChange={set('schoolType')} disabled={locked} required />
        <F label="UDISE குறியீடு" subLabel="UDISE Code" value={data.udise} onChange={set('udise')} disabled={locked} required />
        <F label="பாட மொழி" subLabel="Medium of Instruction" value={data.medium} onChange={set('medium')} disabled={locked} required />
        <F label="மாணவர் எண்ணிக்கை" subLabel="Student Strength" value={data.studentStrength} onChange={set('studentStrength')} disabled={locked} type="number" required />
        <F label="பகுதி" subLabel="Location" value={data.location} onChange={set('location')} disabled={locked} required />
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

function F({
  label, subLabel, value, onChange, disabled, type = 'text', required,
}: {
  label: string; subLabel: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="field-label normal-case tracking-normal">
        <span className="font-tamil text-sm">{label}</span>
        <span className="text-xs text-slate-500 ml-1">/ {subLabel}</span>
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="field-input field-input-pink"
      />
    </div>
  );
}
