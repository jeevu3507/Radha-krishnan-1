import { Bell, ChevronDown, LogOut } from 'lucide-react';

const NAV_PRIMARY = [
  { label: 'Student Admission' },
  { label: 'IFHRMS / Service Register' },
  { label: 'Home', icon: '🏠' },
  { label: 'Component', hasMenu: true },
  { label: 'Staff List' },
  { label: 'Approvals', hasMenu: true, active: true },
  { label: 'ITK Support', hasMenu: true },
  { label: '14417', icon: '📞' },
  { label: 'Competition', hasMenu: true },
  { label: 'Assessment' },
  { label: 'Staff Service Grievance' },
  { label: 'Reports', icon: '⬇' },
];

const NAV_SECONDARY = [
  { label: 'Inbox', icon: '✉' },
  { label: 'Search', hasMenu: true, icon: '🔍' },
  { label: 'EMIS Tickets' },
  { label: 'Document Center', icon: '⬇' },
  { label: 'SLAS Assessment', hasMenu: true },
  { label: 'SMC Dashboard', active: true },
];

export default function AdminHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-white">
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-lg">
            ☸
          </div>
          <div className="leading-tight">
            <div className="text-lg">
              <span className="font-bold text-tnblue tracking-wide">TN EMIS</span>
              <span className="text-slate-400 mx-1">-</span>
              <span className="font-bold text-tnblue-mid tracking-wide">COIMBATORE</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 ring-1 ring-slate-200">
            <div className="w-7 h-7 rounded-full bg-tnblue text-white flex items-center justify-center text-xs font-bold">BR</div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-slate-800 tracking-wide">BALAMURALI R</div>
              <div className="text-[10px] text-emerald-600">Active</div>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </div>
          <button
            onClick={onLogout}
            className="w-9 h-9 rounded-md bg-tnblue-light text-tnblue hover:bg-tnblue hover:text-white transition flex items-center justify-center"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <nav className="bg-tnblue text-white">
        <div className="px-2 flex flex-wrap items-stretch">
          {NAV_PRIMARY.map((it) => (
            <button
              key={it.label}
              className={
                'flex items-center gap-1 px-3 py-3 text-[13px] font-medium transition ' +
                (it.active
                  ? 'bg-white text-tnblue rounded-t-md mt-1 font-bold'
                  : 'hover:bg-tnblue-dark text-white')
              }
            >
              {it.icon && <span className="opacity-80 text-xs">{it.icon}</span>}
              {it.label}
              {it.hasMenu && <ChevronDown size={12} className="opacity-80" />}
            </button>
          ))}
        </div>
        <div className="px-2 flex flex-wrap items-stretch bg-tnblue-dark/40">
          {NAV_SECONDARY.map((it) => (
            <button
              key={it.label}
              className={
                'flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium transition ' +
                (it.active
                  ? 'bg-white text-tnblue rounded-t-md mt-1 font-bold'
                  : 'hover:bg-tnblue-dark text-white')
              }
            >
              {it.icon && <span className="opacity-80 text-xs">{it.icon}</span>}
              {it.label}
              {it.hasMenu && <ChevronDown size={12} className="opacity-80" />}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
