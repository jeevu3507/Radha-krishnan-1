import { GraduationCap, ShieldCheck } from 'lucide-react';
import type { Role } from '../types';

export default function Login({ onSelect }: { onSelect: (r: Role) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tnpink-light via-white to-tnblue-light flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-tnpink to-tnblue flex items-center justify-center text-white text-2xl font-bold shadow-card">
              TN
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">TNEMIS</h1>
              <p className="text-sm text-slate-600">
                Educational Management Information System
              </p>
              <p className="text-xs text-slate-500 font-tamil">
                கல்வியியல் மேலாண்மை தகவல் மையம்
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mt-6">
            Dr. Radhakrishnan Award
          </h2>
          <p className="text-slate-600 mt-1">
            Select your role to continue · உங்கள் பணியைத் தேர்ந்தெடுக்கவும்
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <button
            onClick={() => onSelect('TEACHER')}
            className="group card p-6 text-left hover:ring-2 hover:ring-tnpink hover:shadow-card transition"
          >
            <div className="w-12 h-12 rounded-lg bg-tnpink-light flex items-center justify-center text-tnpink-dark mb-4 group-hover:bg-tnpink group-hover:text-white transition">
              <GraduationCap size={22} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Teacher Portal</h3>
            <p className="text-sm text-slate-600 mt-1">
              Apply for the Dr. Radhakrishnan Award
            </p>
            <p className="text-xs text-slate-500 mt-2 font-tamil">
              ஆசிரியர் இணையதளம் — விண்ணப்பத்தை நிரப்புக
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-tnpink-dark">
              Sign in as teacher →
            </span>
          </button>

          <button
            onClick={() => onSelect('CEO')}
            className="group card p-6 text-left hover:ring-2 hover:ring-tnblue hover:shadow-card transition"
          >
            <div className="w-12 h-12 rounded-lg bg-tnblue-light flex items-center justify-center text-tnblue mb-4 group-hover:bg-tnblue group-hover:text-white transition">
              <ShieldCheck size={22} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">CEO / DSC Approval</h3>
            <p className="text-sm text-slate-600 mt-1">
              Review applications and approve DSC committee
            </p>
            <p className="text-xs text-slate-500 mt-2 font-tamil">
              CEO / DSC ஒப்புதல் — விண்ணப்பங்களை பரிசீலனை
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-tnblue">
              Sign in as CEO →
            </span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          © 2026 School Education Department, Government of Tamil Nadu
        </p>
      </div>
    </div>
  );
}
