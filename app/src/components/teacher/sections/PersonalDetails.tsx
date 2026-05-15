import { useState } from 'react';
import { Upload } from 'lucide-react';
import { SEED_TEACHER } from '../../../data';

interface Props { onComplete: () => void; locked: boolean }

export default function PersonalDetails({ onComplete, locked }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [father, setFather] = useState('');
  const [selfNote, setSelfNote] = useState('');

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPhoto(URL.createObjectURL(f));
  };

  const submit = () => {
    if (!father.trim() || !selfNote.trim()) {
      alert('Please fill all required fields / தேவையான அனைத்து புலங்களையும் நிரப்பவும்');
      return;
    }
    onComplete();
  };

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload the Recent Pass Port Size photo
            <span className="text-red-500">*</span>
          </label>
          <label className="block w-44 h-44 rounded-md border-2 border-dashed border-slate-300 bg-white hover:border-tnpink hover:bg-tnpink-light cursor-pointer flex items-center justify-center transition overflow-hidden">
            {photo ? (
              <img src={photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <Upload size={26} className="text-slate-400" />
            )}
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={onPick}
              disabled={locked}
            />
          </label>
          <p className="mt-2 text-xs text-emerald-700">
            * Upload png/jpg/jpeg max file size 15MB
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-x-5 gap-y-4">
          <Field label="வருவாய் மாவட்டத்தின் பெயர்" required value={SEED_TEACHER.district} readonly />
          <Field label="கல்வி மாவட்டத்தின் பெயர்" required value={SEED_TEACHER.block} readonly />
          <Field
            label="ஆசிரியர் பெயர் ( திரு/ திருமதி/ செல்வி)"
            required
            value={SEED_TEACHER.name}
            readonly
          />

          <Field label="EMIS ID" required value={SEED_TEACHER.emisId} readonly />
          <Field
            label="பிறந்த தேதி"
            required
            value={fmtDate(SEED_TEACHER.dob)}
            readonly
          />
          <Field label="இனம்" required value="Female" readonly />

          <FieldEditable
            label="தந்தை/ கணவர் பெயர்"
            required
            value={father}
            onChange={setFather}
            disabled={locked}
            placeholder="பெயரை உள்ளிடவும்"
          />

          <div className="md:col-span-2">
            <label className="field-label font-tamil text-sm normal-case tracking-normal">
              ஆசிரியர் தன் குறிப்பு( 250 வார்த்தைகளுக்கு மிகாமல்)
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              rows={4}
              value={selfNote}
              maxLength={1800}
              disabled={locked}
              onChange={(e) => setSelfNote(e.target.value)}
              className="field-input field-input-pink resize-none font-tamil"
              placeholder="உங்களைப் பற்றி 250 வார்த்தைகளுக்குள் எழுதவும்..."
            />
            <p className="mt-1 text-xs text-slate-500 text-right">
              {selfNote.length}/1800 chars · ~
              {selfNote.trim().split(/\s+/).filter(Boolean).length}/250 words
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
        <button className="btn-ghost" disabled={locked}>
          Save draft
        </button>
        <button className="btn-primary-pink" onClick={submit} disabled={locked}>
          {locked ? 'Submitted' : 'Submit section'}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  required,
  readonly,
}: { label: string; value: string; required?: boolean; readonly?: boolean }) {
  return (
    <div>
      <label className="field-label font-tamil normal-case tracking-normal text-sm">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div
        className={
          'field-input ' +
          (readonly ? 'bg-slate-100 text-slate-700 cursor-not-allowed' : '')
        }
      >
        {value || '—'}
      </div>
    </div>
  );
}

function FieldEditable({
  label,
  value,
  onChange,
  required,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="field-label font-tamil normal-case tracking-normal text-sm">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field-input field-input-pink font-tamil"
      />
    </div>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}
