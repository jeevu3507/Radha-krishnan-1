import { Bell, ChevronDown } from 'lucide-react';
import type { AdminPage } from './SuperAdminPanel';
import { AVAILABLE_YEARS } from '../../adminData';

const PAGE_LABELS: Record<AdminPage, { title: string; subtitle: string }> = {
  questions: { title: 'Question Builder', subtitle: 'Create questions per teacher designation · section-wise · bilingual' },
  dashboard: { title: 'Dashboard',        subtitle: 'Award cycle at a glance — applications, approvals, selections' },
  workflow:  { title: 'Workflow Setting', subtitle: 'Teacher → DEO → CEO → State · designations from EMIS DB' },
  reports:   { title: 'Reports',          subtitle: 'Overall + district-wise progression and final selections' },
  audit:     { title: 'Audit Logs',       subtitle: 'Every admin panel change — tamper-evident' },
};

export default function AdminTopBar({ page, year, setYear }: { page: AdminPage; year: number; setYear: (y: number) => void }) {
  const meta = PAGE_LABELS[page];
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
      <div className="min-w-0">
        <h1 className="text-lg font-bold text-slate-900">{meta.title}</h1>
        <p className="text-xs text-slate-500 truncate">
          Dr. Radhakrishnan Award · {year}
          <span className="mx-2 text-slate-300">·</span>
          {meta.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <label className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 ring-1 ring-slate-200 rounded-md pl-3 pr-1 py-1">
          <span className="font-semibold">Cycle year</span>
          <div className="relative">
            <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="appearance-none bg-white border border-slate-200 rounded pl-2.5 pr-7 py-1 text-sm font-bold text-tnblue cursor-pointer focus:outline-none focus:border-tnblue">
              {AVAILABLE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-tnblue pointer-events-none" />
          </div>
        </label>
        <button className="relative w-9 h-9 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
