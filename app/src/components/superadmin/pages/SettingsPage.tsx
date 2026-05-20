import { useState } from 'react';
import { Mail, MessageSquare, Bell, Database, ToggleLeft, ToggleRight, Plug } from 'lucide-react';

export default function SettingsPage() {
  const [flags, setFlags] = useState({
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
    bilingualLabels: true,
    autosave: true,
    avScan: true,
    eSign: false,
    publicWinnersList: false,
  });

  const set = (k: keyof typeof flags) => () => setFlags((f) => ({ ...f, [k]: !f[k] }));

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Plug size={16} className="text-tnblue" />
          <h3 className="font-bold text-slate-900">Integrations</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">External systems UAMP talks to</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Integration name="EMIS SSO" status="connected" desc="OIDC · last refresh 2 min ago" />
          <Integration name="IFHRMS" status="connected" desc="Service register sync · 4h ago" />
          <Integration name="SMS Gateway (BSNL)" status="connected" desc="9 messages queued" />
          <Integration name="GovMail SMTP" status="connected" desc="Sender: noreply@tnschools.gov.in" />
          <Integration name="NIC eSign" status="not-configured" desc="Required for DSC certificates" />
          <Integration name="MeghRaj S3" status="connected" desc="245 GB used of 5 TB" />
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Bell size={16} className="text-tnblue" />
          <h3 className="font-bold text-slate-900">Notifications</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Channels used to notify applicants and reviewers</p>
        <Toggle icon={<MessageSquare size={14} />} label="SMS notifications" subLabel="Via BSNL Gateway" on={flags.smsNotifications} onClick={set('smsNotifications')} />
        <Toggle icon={<Mail size={14} />}          label="Email notifications" subLabel="Via GovMail SMTP" on={flags.emailNotifications} onClick={set('emailNotifications')} />
        <Toggle icon={<Bell size={14} />}          label="Push notifications" subLabel="PWA / mobile app" on={flags.pushNotifications} onClick={set('pushNotifications')} />
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Database size={16} className="text-tnblue" />
          <h3 className="font-bold text-slate-900">Feature flags</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Switches that affect the whole platform</p>
        <Toggle label="Bilingual labels (EN + TA)" subLabel="Show Tamil and English labels everywhere" on={flags.bilingualLabels} onClick={set('bilingualLabels')} />
        <Toggle label="Autosave drafts" subLabel="Save every 1.5s of inactivity" on={flags.autosave} onClick={set('autosave')} />
        <Toggle label="Antivirus scan on upload" subLabel="ClamAV scan; quarantines infected files" on={flags.avScan} onClick={set('avScan')} />
        <Toggle label="eSign DSC certificates" subLabel="Requires NIC eSign integration" on={flags.eSign} onClick={set('eSign')} />
        <Toggle label="Public winners list" subLabel="Publish award winners on tnschools.gov.in" on={flags.publicWinnersList} onClick={set('publicWinnersList')} />
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-slate-900 mb-1">Danger zone</h3>
        <p className="text-xs text-slate-500 mb-4">Destructive operations</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <DangerCard title="Purge expired drafts" desc="Removes teacher drafts older than 365 days." />
          <DangerCard title="Reset DSC certificates" desc="Removes uploaded certificates from current cycle. Cannot be undone." />
        </div>
      </div>
    </div>
  );
}

function Integration({
  name, status, desc,
}: { name: string; status: 'connected' | 'not-configured'; desc: string }) {
  return (
    <div className="ring-1 ring-slate-200 rounded-md p-3 flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-900">{name}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
      {status === 'connected'
        ? <span className="badge-green">Connected</span>
        : <span className="badge-amber">Not configured</span>}
    </div>
  );
}

function Toggle({
  icon, label, subLabel, on, onClick,
}: {
  icon?: React.ReactNode; label: string; subLabel?: string; on: boolean; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded-md transition">
      <div className="flex items-center gap-3">
        {icon && <span className="text-tnblue">{icon}</span>}
        <div className="text-left">
          <div className="text-sm font-semibold text-slate-800">{label}</div>
          {subLabel && <div className="text-xs text-slate-500">{subLabel}</div>}
        </div>
      </div>
      {on
        ? <ToggleRight size={28} className="text-emerald-600" />
        : <ToggleLeft size={28} className="text-slate-300" />}
    </button>
  );
}

function DangerCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="ring-1 ring-red-200 rounded-md p-3 bg-red-50">
      <div className="text-sm font-semibold text-red-800">{title}</div>
      <div className="text-xs text-red-700 mt-1">{desc}</div>
      <button className="btn-danger text-xs mt-3 py-1.5">Run</button>
    </div>
  );
}
