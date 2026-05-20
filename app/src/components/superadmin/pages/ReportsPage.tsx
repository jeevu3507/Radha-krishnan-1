import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Globe2, MapPin } from 'lucide-react';
import { DISTRICT_ROLLUP, SCHEMES } from '../../../adminData';

type View = 'overall' | 'district';

export default function ReportsPage({ year }: { year: number }) {
  const [view, setView] = useState<View>('overall');

  const totals = DISTRICT_ROLLUP.reduce(
    (acc, d) => ({
      apps:  acc.apps  + d.totalApps,
      deo:   acc.deo   + d.deoApproved,
      ceo:   acc.ceo   + d.ceoShortlist,
      state: acc.state + d.stateSelected,
    }),
    { apps: 0, deo: 0, ceo: 0, state: 0 }
  );

  return (
    <div className="space-y-5">
      <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900 text-base">Dr. Radhakrishnan Award · {year}</h2>
          <p className="text-xs text-slate-500">Funnel from application to award · state-wide and per-district</p>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button onClick={() => setView('overall')} className={'px-4 py-1.5 text-sm rounded-md flex items-center gap-1.5 font-semibold transition ' + (view === 'overall' ? 'bg-white text-tnblue shadow-soft' : 'text-slate-600')}>
            <Globe2 size={14} /> Overall
          </button>
          <button onClick={() => setView('district')} className={'px-4 py-1.5 text-sm rounded-md flex items-center gap-1.5 font-semibold transition ' + (view === 'district' ? 'bg-white text-tnblue shadow-soft' : 'text-slate-600')}>
            <MapPin size={14} /> District-wise
          </button>
        </div>
      </div>

      {view === 'overall' ? <OverallView totals={totals} year={year} /> : <DistrictView year={year} />}
    </div>
  );
}

function OverallView({ totals, year }: { totals: { apps: number; deo: number; ceo: number; state: number }; year: number }) {
  const steps = [
    { label: 'Total applications', ta: 'மொத்த விண்ணப்பங்கள்', count: totals.apps,  tone: 'blue'   },
    { label: 'DEO shortlist',      ta: 'DEO முன்தேர்வு',      count: totals.deo,   tone: 'amber'  },
    { label: 'CEO shortlist',      ta: 'CEO முன்தேர்வு',      count: totals.ceo,   tone: 'purple' },
    { label: 'State final',        ta: 'மாநில இறுதி',         count: totals.state, tone: 'pink'   },
  ];
  const max = Math.max(...steps.map((s) => s.count), 1);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (<BigKpi key={s.label} label={s.label} ta={s.ta} count={s.count} tone={s.tone} max={max} />))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-bold text-slate-900 mb-1">Application funnel</h3>
          <p className="text-xs text-slate-500 mb-4">From submitted to awarded — state-wide</p>
          <div className="space-y-3">
            {steps.map((s, i) => {
              const pct = (s.count / steps[0].count) * 100;
              return (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{i + 1}. {s.label}</span>
                    <span className="text-slate-500">{s.count.toLocaleString('en-IN')} <span className="text-slate-400">({pct.toFixed(1)}%)</span></span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={'h-full rounded-full ' + funnelColor(s.tone)} style={{ width: pct + '%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-slate-900 mb-1">By stream</h3>
          <p className="text-xs text-slate-500 mb-4">{year} cycle</p>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 border-b border-slate-200">
              <tr>
                <th className="text-left py-2 font-semibold">Stream</th>
                <th className="text-right py-2 font-semibold">Applicants</th>
                <th className="text-right py-2 font-semibold">Shortlisted</th>
                <th className="text-right py-2 font-semibold">Quota</th>
              </tr>
            </thead>
            <tbody>
              {SCHEMES.map((s) => (
                <tr key={s.code} className="border-b border-slate-100">
                  <td className="py-2.5">
                    <div className="font-semibold text-slate-900">{s.nameEn}</div>
                    <div className="text-xs text-slate-500 font-tamil">{s.nameTa}</div>
                  </td>
                  <td className="py-2.5 text-right font-mono">{s.applicantsCount}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-tnblue">{s.shortlistedCount}</td>
                  <td className="py-2.5 text-right">{s.quotaPerDistrict}/dist</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportBar />
    </>
  );
}

function DistrictView({ year }: { year: number }) {
  return (
    <>
      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">District-wise funnel · {year}</h3>
          <span className="text-xs text-slate-500">{DISTRICT_ROLLUP.length} districts shown</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left  px-5 py-3 font-semibold">District</th>
              <th className="text-right px-5 py-3 font-semibold">Total apps</th>
              <th className="text-right px-5 py-3 font-semibold">DEO approved</th>
              <th className="text-right px-5 py-3 font-semibold">CEO shortlist</th>
              <th className="text-right px-5 py-3 font-semibold">State final</th>
              <th className="text-right px-5 py-3 font-semibold">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {DISTRICT_ROLLUP.map((d) => {
              const conv = d.totalApps ? (d.stateSelected / d.totalApps) * 100 : 0;
              return (
                <tr key={d.district} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-900">{d.district}</td>
                  <td className="px-5 py-3 text-right font-mono">{d.totalApps}</td>
                  <td className="px-5 py-3 text-right font-mono text-amber-700">{d.deoApproved}</td>
                  <td className="px-5 py-3 text-right font-mono text-purple-700">{d.ceoShortlist}</td>
                  <td className="px-5 py-3 text-right font-mono text-tnpink-dark">{d.stateSelected}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-tnpink to-tnblue" style={{ width: conv + '%' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 w-10 text-right">{conv.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-slate-100 font-bold">
              <td className="px-5 py-3">All districts</td>
              <td className="px-5 py-3 text-right font-mono">{DISTRICT_ROLLUP.reduce((s, d) => s + d.totalApps, 0)}</td>
              <td className="px-5 py-3 text-right font-mono text-amber-700">{DISTRICT_ROLLUP.reduce((s, d) => s + d.deoApproved, 0)}</td>
              <td className="px-5 py-3 text-right font-mono text-purple-700">{DISTRICT_ROLLUP.reduce((s, d) => s + d.ceoShortlist, 0)}</td>
              <td className="px-5 py-3 text-right font-mono text-tnpink-dark">{DISTRICT_ROLLUP.reduce((s, d) => s + d.stateSelected, 0)}</td>
              <td className="px-5 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <ExportBar />
    </>
  );
}

function BigKpi({ label, ta, count, tone, max }: { label: string; ta: string; count: number; tone: string; max: number }) {
  const pct = (count / max) * 100;
  return (
    <div className="card p-5">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="text-[11px] text-slate-500 font-tamil">{ta}</div>
      <div className="text-3xl font-bold text-slate-900 mt-2">{count.toLocaleString('en-IN')}</div>
      <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={'h-full rounded-full ' + funnelColor(tone)} style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}

function funnelColor(tone: string) {
  const map: Record<string, string> = {
    blue:   'bg-tnblue',
    amber:  'bg-amber-500',
    purple: 'bg-purple-500',
    pink:   'bg-tnpink',
  };
  return map[tone] ?? 'bg-slate-400';
}

function ExportBar() {
  return (
    <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm">
        <span className="font-semibold text-slate-800">Export reports</span>
        <span className="text-xs text-slate-500 ml-2">Includes funnel, stream split, and district rollups</span>
      </div>
      <div className="flex gap-2">
        <button className="btn-ghost"><FileSpreadsheet size={14} /> Export XLSX</button>
        <button className="btn-ghost"><FileText size={14} /> Export PDF</button>
        <button className="btn-primary-blue"><Download size={14} /> Email me</button>
      </div>
    </div>
  );
}
