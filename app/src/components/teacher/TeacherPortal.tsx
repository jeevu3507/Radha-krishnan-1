import { useState } from 'react';
import TeacherHeader from './TeacherHeader';
import EligibilityModal from './EligibilityModal';
import AccordionSection from './AccordionSection';
import PersonalDetails from './sections/PersonalDetails';
import SchoolDetails from './sections/SchoolDetails';
import Qualification from './sections/Qualification';
import ServiceRecord from './sections/ServiceRecord';
import ObjectiveCriteria from './sections/ObjectiveCriteria';
import PerformanceCriteria from './sections/PerformanceCriteria';
import SupportingDocuments from './sections/SupportingDocuments';
import { SECTIONS } from '../../i18n';
import type { SectionId } from '../../types';

export default function TeacherPortal({ onLogout }: { onLogout: () => void }) {
  const [showEligibility, setShowEligibility] = useState(true);
  const [openSection, setOpenSection] = useState<SectionId>('personal');
  const [completed, setCompleted] = useState<Record<SectionId, boolean>>({
    personal: false,
    school: false,
    qualification: false,
    service: false,
    objective: false,
    performance: false,
    documents: false,
  });

  const toggle = (id: SectionId) =>
    setOpenSection((prev) => (prev === id ? prev : id));

  const markComplete = (id: SectionId) => {
    setCompleted((c) => ({ ...c, [id]: true }));
    // auto-advance to next section
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx >= 0 && idx < SECTIONS.length - 1) {
      setOpenSection(SECTIONS[idx + 1].id);
    }
  };

  const renderSection = (id: SectionId) => {
    const props = { onComplete: () => markComplete(id), locked: completed[id] };
    switch (id) {
      case 'personal':      return <PersonalDetails {...props} />;
      case 'school':        return <SchoolDetails {...props} />;
      case 'qualification': return <Qualification {...props} />;
      case 'service':       return <ServiceRecord {...props} />;
      case 'objective':     return <ObjectiveCriteria {...props} />;
      case 'performance':   return <PerformanceCriteria {...props} />;
      case 'documents':     return <SupportingDocuments {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <TeacherHeader onLogout={onLogout} />

      {showEligibility && (
        <EligibilityModal onSubmit={() => setShowEligibility(false)} />
      )}

      <div className="px-6 py-4 text-sm text-slate-700">
        <span className="font-bold">Staff</span>
        <span className="mx-2 text-slate-400">›</span>
        <span>Dr.Radhakrishnan Award Application</span>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-slate-200/60 rounded-lg p-6 mb-6">
          <h1 className="text-center text-2xl font-bold text-slate-800 mb-3">
            Dr.Radhakrishnan Award Application Form
          </h1>
          <p className="text-sm text-center">
            <span className="text-red-600 italic font-bold">Note:</span>{' '}
            <span className="text-slate-700 italic">
              Once each section is submitted, it cannot be edited or modified. Please
              review your inputs carefully before submission.
            </span>
          </p>
        </div>

        <div className="space-y-3">
          {SECTIONS.map((s) => (
            <AccordionSection
              key={s.id}
              section={s}
              isOpen={openSection === s.id}
              isCompleted={completed[s.id]}
              onToggle={() => toggle(s.id)}
            >
              {renderSection(s.id)}
            </AccordionSection>
          ))}
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          © 2026 School Education Department, Government of Tamil Nadu
        </div>
      </main>
    </div>
  );
}
