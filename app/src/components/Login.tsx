import { GraduationCap, ShieldCheck, Settings2 } from 'lucide-react';
import type { Role } from '../types';

export default function Login({ onSelect }: { onSelect: (r: Role) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tnpink-light via-white to-tnblue-light flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-tnpink to-tnblue flex items-center justify-center text-white text-2xl font-bold shadow-card">
              TN
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">TNEMIS</h1>
              <p className="text-sm text-slate-600">Educational Management Information System</p>
              <p className="text-xs text-slate-500 font-tamil">கல்வியியல் மேலாண்மை தகவல் மையம்</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mt-6">Dr. Radhakrishnan Award</h2>
          <p className="text-slate-600 mt-1">
            Select your role to continue · உங்கள் பணியைத் தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <RoleCard
            onClick={() => onSelect('TEACHER')}
            color="pink"
            icon={<GraduationCap size={22} />}
            title="Teacher Portal"
            subtitle="Apply for the Dr. Radhakrishnan Award"
            ta="ஆசிரியர் இணையதளம் — விண்ணப்பத்தை நிரப்புக"
            cta="Sign in as teacher →"
          />
          <RoleCard
            onClick={() => onSelect('CEO')}
            color="blue"
            icon={<ShieldCheck size={22} />}
            title="CEO / DSC Approval"
            subtitle="Review applications · 1:2 shortlist"
            ta="CEO / DSC ஒப்புதல் — விண்ணப்பங்களை பரிசீலனை"
            cta="Sign in as CEO →"
          />
          <RoleCard
            onClick={() => onSelect('ADMIN')}
            color="slate"
            icon={<Settings2 size={22} />}
            title="State Admin"
            subtitle="Questions · workflow · committee · reports"
            ta="மாநில நிர்வாகி — கேள்விகள் & அமைப்புகள்"
            cta="Sign in as State Admin →"
          />
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          © 2026 School Education Department, Government of Tamil Nadu
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  onClick, color, icon, title, subtitle, ta, cta,
}: {
  onClick: () => void;
  color: 'pink' | 'blue' | 'slate';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  ta: string;
  cta: string;
}) {
  const styles: Record<string, { ring: string; bg: string; text: string; ctaText: string }> = {
    pink:  { ring: 'hover:ring-tnpink', bg: 'bg-tnpink-light group-hover:bg-tnpink',     text: 'text-tnpink-dark', ctaText: 'text-tnpink-dark' },
    blue:  { ring: 'hover:ring-tnblue', bg: 'bg-tnblue-light group-hover:bg-tnblue',     text: 'text-tnblue',      ctaText: 'text-tnblue' },
    slate: { ring: 'hover:ring-slate-700', bg: 'bg-slate-200 group-hover:bg-slate-800',  text: 'text-slate-700',   ctaText: 'text-slate-700' },
  };
  const s = styles[color];
  return (
    <button
      onClick={onClick}
      className={`group card p-6 text-left hover:ring-2 hover:shadow-card transition ${s.ring}`}
    >
      <div className={`w-12 h-12 rounded-lg ${s.bg} ${s.text} group-hover:text-white flex items-center justify-center mb-4 transition`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
      <p className="text-xs text-slate-500 mt-2 font-tamil">{ta}</p>
      <span className={`mt-4 inline-flex items-center text-sm font-semibold ${s.ctaText}`}>
        {cta}
      </span>
    </button>
  );
}
