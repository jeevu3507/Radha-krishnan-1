import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import QuestionBuilderPage from './pages/QuestionBuilderPage';
import DashboardPage from './pages/DashboardPage';
import WorkflowPage from './pages/WorkflowPage';
import ReportsPage from './pages/ReportsPage';
import AuditPage from './pages/AuditPage';
import { DEFAULT_YEAR } from '../../adminData';

export type AdminPage = 'questions' | 'dashboard' | 'workflow' | 'reports' | 'audit';

export default function SuperAdminPanel({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<AdminPage>('dashboard');
  const [year, setYear] = useState<number>(DEFAULT_YEAR);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar current={page} onNavigate={setPage} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar page={page} year={year} setYear={setYear} />
        <main className="flex-1 p-6 overflow-x-auto">
          {page === 'questions' && <QuestionBuilderPage year={year} />}
          {page === 'dashboard' && <DashboardPage year={year} onNavigate={setPage} />}
          {page === 'workflow'  && <WorkflowPage year={year} />}
          {page === 'reports'   && <ReportsPage year={year} />}
          {page === 'audit'     && <AuditPage />}
        </main>
      </div>
    </div>
  );
}
