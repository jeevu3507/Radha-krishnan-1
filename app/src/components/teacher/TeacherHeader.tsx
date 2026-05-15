import { ChevronDown, LogOut, User } from 'lucide-react';
import { SEED_TEACHER } from '../../data';

const NAV_ITEMS = [
  { label: 'My Profile', hasMenu: true },
  { label: 'TPD', hasMenu: true },
  { label: 'Admin', hasMenu: true },
  { label: 'Activity', hasMenu: true, active: true },
  { label: 'Inbox', hasMenu: false },
  { label: 'Staff Grievance', hasMenu: false },
  { label: 'Evaluation', hasMenu: true },
  { label: 'School/Office Change Request', hasMenu: false },
];

export default function TeacherHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-white">
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-lg">
            ☸
          </div>
          <div className="leading-tight">
            <div className="text-sm font-tamil text-slate-700">
              கல்வியியல் மேலாண்மை தகவல் மையம்
            </div>
            <div className="text-xs text-slate-500">
              Educational Management Information System
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm font-bold text-slate-800 tracking-wide">{SEED_TEACHER.name}</div>
            <div className="text-xs text-slate-500">{SEED_TEACHER.emisId}</div>
          </div>
          <button
            onClick={onLogout}
            className="w-9 h-9 rounded-md bg-tnpink-light text-tnpink-dark hover:bg-tnpink hover:text-white transition flex items-center justify-center"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <nav className="bg-tnpink text-white">
        <div className="px-2 flex flex-wrap items-stretch">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.label}
              className={
                'flex items-center gap-1 px-4 py-3 text-sm font-medium transition relative ' +
                (it.active
                  ? 'bg-white text-tnpink-dark rounded-t-md mt-1'
                  : 'hover:bg-tnpink-dark text-white')
              }
            >
              {it.label === 'My Profile' && <User size={14} className="opacity-80" />}
              {it.label}
              {it.hasMenu && <ChevronDown size={14} className="opacity-80" />}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
