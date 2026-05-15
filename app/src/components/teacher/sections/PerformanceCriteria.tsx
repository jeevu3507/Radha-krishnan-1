import { useState } from 'react';

interface Props { onComplete: () => void; locked: boolean }

export default function PerformanceCriteria({ onComplete, locked }: Props) {
  const [awards, setAwards] = useState('Best Teacher (District) 2022; Innovation Award 2023');
  const [trainings, setTrainings] = useState(12);
  const [smc, setSmc] = useState('Member-Secretary of SMC; conducted 8 parent workshops in 2024-25.');
  const [communityWork, setCommunityWork] = useState('Conducted weekend literacy classes for 60 students; coordinated mid-day meal scheme.');

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
        <div className="md:col-span-2">
          <label className="field-label normal-case tracking-normal">
            <span className="font-tamil text-sm">விருதுகள் / சாதனைகள்</span>
            <span className="text-xs text-slate-500 ml-1">/ Awards &amp; Achievements</span>
          </label>
          <textarea rows={3} value={awards} disabled={locked}
            onChange={(e) => setAwards(e.target.value)}
            className="field-input field-input-pink" />
        </div>
        <div>
          <label className="field-label normal-case tracking-normal">
            <span className="font-tamil text-sm">பயிற்சிகள் கலந்து கொண்டது</span>
            <span className="text-xs text-slate-500 ml-1">/ Trainings Attended</span>
          </label>
          <input type="number" min={0} value={trainings} disabled={locked}
            onChange={(e) => setTrainings(parseInt(e.target.value) || 0)}
            className="field-input field-input-pink" />
        </div>
        <div>
          <label className="field-label normal-case tracking-normal">
            <span className="font-tamil text-sm">SMC ஈடுபாடு</span>
            <span className="text-xs text-slate-500 ml-1">/ SMC Engagement</span>
          </label>
          <input value={smc} disabled={locked}
            onChange={(e) => setSmc(e.target.value)}
            className="field-input field-input-pink" />
        </div>
        <div className="md:col-span-2">
          <label className="field-label normal-case tracking-normal">
            <span className="font-tamil text-sm">சமூகப் பணிகள்</span>
            <span className="text-xs text-slate-500 ml-1">/ Community Work</span>
          </label>
          <textarea rows={3} value={communityWork} disabled={locked}
            onChange={(e) => setCommunityWork(e.target.value)}
            className="field-input field-input-pink" />
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
