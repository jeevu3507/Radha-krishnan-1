import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function EligibilityModal({
  onSubmit,
}: {
  onSubmit: (alreadyReceived: 'yes' | 'no') => void;
}) {
  const [value, setValue] = useState<'' | 'yes' | 'no'>('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md card overflow-hidden">
        <div className="bg-tnpink text-white px-5 py-3 font-semibold text-sm">
          Dr.Radhakrishnan Award Eligibility
        </div>
        <div className="p-5">
          <p className="text-xs italic text-red-600 mb-3 leading-relaxed">
            <span className="font-bold">Note:</span> Once section is submitted, it
            cannot be edited or modified. Please review your inputs carefully before
            submission.
          </p>

          <label className="block text-sm text-slate-800 mb-2 font-tamil leading-snug">
            இதன் முன்னர் தேசிய/ மாநில அளவில்
            <br />
            Dr.Radhakrishnan Award பெற்றுள்ளீரா? <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <select
              value={value}
              onChange={(e) => setValue(e.target.value as 'yes' | 'no' | '')}
              className="field-input field-input-pink appearance-none pr-9 font-tamil"
            >
              <option value="">தேர்வு செய்யவும்</option>
              <option value="no">இல்லை / No</option>
              <option value="yes">ஆம் / Yes</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>

          <button
            disabled={!value}
            onClick={() => value && onSubmit(value)}
            className="mt-5 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
