import { useState } from 'react';
import { Plus, GripVertical, Edit3, Trash2, Type, Hash, Calendar, FileUp, ListChecks, Repeat2, Sigma } from 'lucide-react';
import { SECTIONS } from '../../../i18n';

type FieldType = 'text' | 'number' | 'date' | 'radio' | 'file' | 'formula' | 'repeater';

interface Question {
  id: string;
  type: FieldType;
  labelEn: string;
  labelTa: string;
  required: boolean;
}

const SAMPLE_QUESTIONS: Record<string, Question[]> = {
  personal: [
    { id: 'q1', type: 'text', labelEn: 'Full Name',    labelTa: 'முழுப் பெயர்',     required: true },
    { id: 'q2', type: 'text', labelEn: 'EMIS ID',      labelTa: 'EMIS ID',         required: true },
    { id: 'q3', type: 'date', labelEn: 'Date of Birth',labelTa: 'பிறந்த தேதி',     required: true },
    { id: 'q4', type: 'radio',labelEn: 'Gender',       labelTa: 'பாலினம்',          required: true },
  ],
  school: [
    { id: 'q5', type: 'text',  labelEn: 'School Name', labelTa: 'பள்ளியின் பெயர்',  required: true },
    { id: 'q6', type: 'number',labelEn: 'UDISE Code',  labelTa: 'UDISE குறியீடு',  required: true },
  ],
  qualification: [
    { id: 'q7',  type: 'text', labelEn: 'UG Degree',    labelTa: 'இளங்கலை',         required: true },
    { id: 'q8',  type: 'text', labelEn: 'PG Degree',    labelTa: 'முதுகலை',         required: false },
  ],
  service: [
    { id: 'q9',  type: 'repeater', labelEn: 'Postings', labelTa: 'பணியிடங்கள்',     required: true },
    { id: 'q10', type: 'formula',  labelEn: 'Total Years', labelTa: 'மொத்த ஆண்டுகள்', required: true },
  ],
  objective: [
    { id: 'q11', type: 'number', labelEn: 'Class X %',   labelTa: '10ஆம் வகுப்பு %', required: true },
    { id: 'q12', type: 'number', labelEn: 'Class XII %', labelTa: '12ஆம் வகுப்பு %', required: true },
  ],
  performance: [
    { id: 'q13', type: 'text', labelEn: 'Awards', labelTa: 'விருதுகள்', required: false },
  ],
  documents: [
    { id: 'q14', type: 'file', labelEn: 'Service Certificate', labelTa: 'பணி சான்றிதழ்', required: true },
    { id: 'q15', type: 'file', labelEn: 'Photo',               labelTa: 'புகைப்படம்',    required: true },
  ],
};

export default function FormBuilderPage() {
  const [selectedAward] = useState('Dr. Radhakrishnan Award 2026');
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS);

  const remove = (qid: string) =>
    setQuestions((q) => ({
      ...q,
      [selectedSection]: q[selectedSection].filter((x) => x.id !== qid),
    }));

  const addNew = () => {
    const newId = 'q' + Math.random().toString(36).slice(2, 8);
    setQuestions((q) => ({
      ...q,
      [selectedSection]: [
        ...q[selectedSection],
        { id: newId, type: 'text', labelEn: 'New Question', labelTa: 'புதிய கேள்வி', required: false },
      ],
    }));
  };

  return (
    <div className="space-y-5">
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <span className="text-slate-500">Editing schema for:</span>{' '}
          <span className="font-bold text-tnblue">{selectedAward}</span>{' '}
          <span className="badge-amber ml-2">schema v3 · DRAFT</span>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost">Preview as teacher</button>
          <button className="btn-primary-blue">Publish v4</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr_280px] gap-5">
        {/* Sections panel */}
        <div className="card p-3 h-fit">
          <div className="flex items-center justify-between px-2 py-1.5">
            <h3 className="text-xs uppercase tracking-wide font-bold text-slate-500">Sections</h3>
            <button className="text-tnblue hover:bg-tnblue-light p-1 rounded-md" title="Add section">
              <Plus size={14} />
            </button>
          </div>
          <ul className="mt-1 space-y-0.5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelectedSection(s.id)}
                  className={
                    'w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm text-left transition ' +
                    (selectedSection === s.id
                      ? 'bg-tnblue text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100')
                  }
                >
                  <GripVertical size={12} className="opacity-40" />
                  <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-white/20">{i + 1}</span>
                  <div className="flex-1 truncate">
                    <div className="text-sm">{s.title.en}</div>
                    <div className={'text-[10px] font-tamil ' + (selectedSection === s.id ? 'text-white/80' : 'text-slate-500')}>
                      {s.title.ta}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions canvas */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">
                {SECTIONS.find((s) => s.id === selectedSection)?.title.en}
              </h3>
              <p className="text-xs text-slate-500 font-tamil">
                {SECTIONS.find((s) => s.id === selectedSection)?.title.ta}
              </p>
            </div>
            <button onClick={addNew} className="btn-primary-blue">
              <Plus size={14} /> Add question
            </button>
          </div>

          <ul className="space-y-2">
            {(questions[selectedSection] ?? []).map((q) => (
              <li key={q.id} className="flex items-center gap-3 p-3 rounded-lg ring-1 ring-slate-200 hover:ring-tnblue/60 bg-white">
                <GripVertical size={14} className="text-slate-400 cursor-grab flex-shrink-0" />
                <FieldIcon type={q.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {q.labelEn}
                    {q.required && <span className="text-red-500"> *</span>}
                  </div>
                  <div className="text-xs text-slate-500 font-tamil truncate">{q.labelTa}</div>
                </div>
                <span className="text-[10px] uppercase tracking-wide font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {q.type}
                </span>
                <button className="text-slate-500 hover:text-tnblue p-1.5 rounded-md hover:bg-tnblue-light">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => remove(q.id)} className="text-slate-500 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
            {(questions[selectedSection] ?? []).length === 0 && (
              <li className="text-center py-12 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                No questions yet. Click "Add question" to start.
              </li>
            )}
          </ul>
        </div>

        {/* Field palette */}
        <div className="card p-4 h-fit">
          <h3 className="text-xs uppercase tracking-wide font-bold text-slate-500 mb-3 px-1">Field palette</h3>
          <div className="grid grid-cols-2 gap-2">
            <Palette icon={<Type size={14} />}        label="Text" />
            <Palette icon={<Hash size={14} />}        label="Number" />
            <Palette icon={<Calendar size={14} />}    label="Date" />
            <Palette icon={<ListChecks size={14} />}  label="Choice" />
            <Palette icon={<FileUp size={14} />}      label="File" />
            <Palette icon={<Repeat2 size={14} />}     label="Repeater" />
            <Palette icon={<Sigma size={14} />}       label="Formula" />
          </div>
          <div className="mt-4 p-3 bg-tnblue-light/50 rounded-md">
            <p className="text-[11px] text-tnblue leading-relaxed">
              <span className="font-bold">Tip:</span> Drag any field type onto the canvas to insert it at that position. Schema saves draft automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldIcon({ type }: { type: FieldType }) {
  const icons: Record<FieldType, React.ReactNode> = {
    text:     <Type size={14} />,
    number:   <Hash size={14} />,
    date:     <Calendar size={14} />,
    radio:    <ListChecks size={14} />,
    file:     <FileUp size={14} />,
    repeater: <Repeat2 size={14} />,
    formula:  <Sigma size={14} />,
  };
  return (
    <span className="w-8 h-8 rounded-md bg-tnblue-light text-tnblue flex items-center justify-center flex-shrink-0">
      {icons[type]}
    </span>
  );
}

function Palette({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 p-2.5 rounded-md ring-1 ring-slate-200 hover:ring-tnblue hover:bg-tnblue-light text-slate-700 transition">
      <span className="text-tnblue">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
