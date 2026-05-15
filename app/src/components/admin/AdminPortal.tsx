import { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import CommitteeMembersTab from './CommitteeMembersTab';
import DSCApprovalTab from './DSCApprovalTab';
import TeacherMarkListTab from './TeacherMarkListTab';
import { X } from 'lucide-react';

type TabId = 'committee' | 'dsc' | 'marks';

export default function AdminPortal({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<TabId>('committee');
  const [toast, setToast] = useState<string | null>('No Data Found');

  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(id);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-slate-200/60">
      <AdminHeader onLogout={onLogout} />

      {toast && (
        <div className="fixed top-20 right-6 z-40 bg-red-500 text-white text-sm rounded-md shadow-card px-4 py-2 flex items-center gap-3 animate-in fade-in">
          <span className="w-5 h-5 rounded-full bg-white text-red-500 flex items-center justify-center text-xs font-bold">!</span>
          {toast}
          <button onClick={() => setToast(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-soft ring-1 ring-slate-100 overflow-hidden">
          <div className="px-6 py-5">
            <h1 className="text-center text-xl font-bold text-slate-800 mb-6">
              Dr.RadhaKrishnan Application Approval
            </h1>

            <div className="flex flex-wrap justify-end gap-12 px-6 mb-4">
              <ActionButton title="Selection count">
                <span className="italic">
                  <span className="font-bold not-italic">Note:</span>{' '}
                  Based on the given count, select the teachers in a 1:2 ratio.
                </span>
              </ActionButton>
              <ActionButton title="DSC Approval Certificate">
                <span className="italic">
                  <span className="font-bold not-italic">Note:</span>{' '}
                  Download the Committee Approval Certificate and upload it for the
                  selected teachers with the committee members' signatures.
                </span>
              </ActionButton>
              <ActionButton title="DSE User Manual" wide>
                <span className="italic">
                  <span className="font-bold not-italic">Note:</span>{' '}
                  Kindly download and Read the DSE User manual before approving the
                  applications
                </span>
              </ActionButton>
            </div>

            <div className="flex border-b border-slate-200 mt-4">
              <Tab id="committee" active={tab} setTab={setTab}>Committee Members</Tab>
              <Tab id="dsc"       active={tab} setTab={setTab}>DSC Approval</Tab>
              <Tab id="marks"     active={tab} setTab={setTab}>Teacher Mark List</Tab>
            </div>
          </div>

          <div className="bg-white px-6 pb-8">
            {tab === 'committee' && <CommitteeMembersTab />}
            {tab === 'dsc'       && <DSCApprovalTab />}
            {tab === 'marks'     && <TeacherMarkListTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

function ActionButton({
  title, children, wide,
}: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={'flex flex-col items-center text-center ' + (wide ? 'max-w-[180px]' : 'max-w-[200px]')}>
      <button className="bg-tnblue-mid hover:bg-tnblue text-white text-sm font-semibold rounded-md px-5 py-3 shadow-soft leading-tight">
        {title}
      </button>
      <p className="mt-2 text-[11px] text-slate-700 leading-snug">{children}</p>
    </div>
  );
}

function Tab({
  id, active, setTab, children,
}: {
  id: TabId; active: TabId; setTab: (t: TabId) => void; children: React.ReactNode;
}) {
  const isActive = id === active;
  return (
    <button
      onClick={() => setTab(id)}
      className={
        'flex-1 py-3 text-sm font-semibold border-b-2 transition ' +
        (isActive
          ? 'text-tnblue-mid border-tnblue-mid'
          : 'text-slate-500 border-transparent hover:text-tnblue')
      }
    >
      {children}
    </button>
  );
}
