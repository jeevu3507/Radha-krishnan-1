import { FilePlus2, LayoutDashboard, GitBranch, BarChart3, ScrollText, LogOut } from 'lucide-react';
import type { AdminPage } from './SuperAdminPanel';

const ITEMS: { id: AdminPage; label: string; icon: React.ComponentType<{ size?: number }>; primary?: boolean }[] = [
  { id: 'questions', label: 'Question Builder', icon: FilePlus2,       primary: true },
  { id: 'dashboard', label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'workflow',  label: 'Workflow Setting', icon: GitBranch },
  { id: 'reports',   label: 'Reports',          icon: BarChart3 },
  { id: 'audit',     label: 'Audit Logs',       icon: ScrollText },
];

export default function AdminSidebar({ current, onNavigate, onLogout }: { current: AdminPage; onNavigate: (p: AdminPage) => void; onLogout: () => void }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tnpink to-tnblue flex items-center justify-center text-white text-sm font-bold">TN</div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white">Award Admin</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">State User</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          const isActive = current === it.id;
          return (
            <div key={it.id}>
              {it.primary && (
                <div className="px-3 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Build the form</div>
              )}
              <button onClick={() => onNavigate(it.id)} className={'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ' + (isActive ? (it.primary ? 'bg-tnpink text-white font-semibold shadow-soft' : 'bg-tnblue text-white font-semibold shadow-soft') : 'text-slate-300 hover:bg-slate-800 hover:text-white')}>
                <Icon size={16} />
                <span>{it.label}</span>
              </button>
              {i === 0 && (
                <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Manage cycle</div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2.5 px-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-tnblue text-white flex items-center justify-center text-xs font-bold">SA</div>
          <div className="leading-tight min-w-0">
            <div className="text-xs font-semibold text-white truncate">State Admin</div>
            <div className="text-[10px] text-slate-400 truncate">state.admin@tnschools.gov.in</div>
          </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition">
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}
