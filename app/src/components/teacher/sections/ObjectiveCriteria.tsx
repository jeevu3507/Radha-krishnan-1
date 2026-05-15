import { useState } from 'react';

interface Props { onComplete: () => void; locked: boolean }

function band(pct: number) {
  if (pct >= 90) return 10;
  if (pct >= 75) return 7;
  if (pct >= 50) return 4;
  return 0;
}

export default function ObjectiveCriteria({ onComplete, locked }: Props) {
  const [class10, setClass10] = useState(96.2);
  const [class12, setClass12] = useState(93.4);
  const [innovations, setInnovations] = useState(4);
  const [publications, setPublications] = useState(6);

  const totalMarks =
    band(class10) + band(class12) +
    Math.min(innovations, 10) +
    Math.min(publications, 10);

  return (
    <div className="space-y-5">
      <p className="text-xs italic text-slate-600">
        Auto-computed marks based on submitted values. Bands: ≤50 = 0 · ≤75 = 4 ·
        ≤90 = 7 · &gt;90 = 10
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <Metric label="Class X Pass %" labelTa="10ஆம் வகுப்பு தேர்ச்சி %" value={class10} setValue={setClass10} marks={band(class10)} disabled={locked} />
        <Metric label="Class XII Pass %" labelTa="12ஆம் வகுப்பு தேர்ச்சி %" value={class12} setValue={setClass12} marks={band(class12)} disabled={locked} />
        <Metric label="Innovations Count" labelTa="புதுமைகள் எண்ணிக்கை" value={innovations} setValue={setInnovations} marks={Math.min(innovations, 10)} disabled={locked} max={20} />
        <Metric label="Publications Count" labelTa="வெளியீடுகள் எண்ணிக்கை" value={publications} setValue={setPublications} marks={Math.min(publications, 10)} disabled={locked} max={20} />
      </div>

      <div className="rounded-lg bg-tnpink-light px-5 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-tnpink-dark">
          Total objective marks · மொத்த புறநிலை மதிப்பெண்
        </span>
        <span className="text-2xl font-bold text-tnpink-dark">{totalMarks} / 40</span>
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

function Metric({
  label, labelTa, value, setValue, marks, disabled, max = 100,
}: {
  label: string; labelTa: string; value: number; setValue: (n: number) => void;
  marks: number; disabled?: boolean; max?: number;
}) {
  return (
    <div className="bg-white rounded-lg ring-1 ring-slate-200 p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="text-xs text-slate-500 font-tamil">{labelTa}</p>
        </div>
        <span className="badge-pink">+{marks} marks</span>
      </div>
      <input
        type="number"
        min={0}
        max={max}
        step={0.1}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
        className="field-input field-input-pink mt-3"
      />
    </div>
  );
}
