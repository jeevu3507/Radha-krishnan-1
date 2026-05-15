import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight, XCircle, CheckCircle2 } from 'lucide-react';
import type { SectionDef } from '../../types';

export default function AccordionSection({
  section,
  isOpen,
  isCompleted,
  onToggle,
  children,
}: {
  section: SectionDef;
  isOpen: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg ring-1 ring-slate-200 shadow-soft overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 transition"
      >
        {isOpen ? (
          <ChevronDown size={18} className="text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronRight size={18} className="text-slate-500 flex-shrink-0" />
        )}

        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">
            {section.title.en}
          </span>
          <span className="text-xs text-slate-500 font-tamil">
            · {section.title.ta}
          </span>
        </div>

        {isCompleted ? (
          <span className="badge-green">
            <CheckCircle2 size={12} /> Submitted
          </span>
        ) : (
          <XCircle size={16} className="text-red-500" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-slate-100 p-5 bg-slate-50/50">
          {children}
        </div>
      )}
    </div>
  );
}
