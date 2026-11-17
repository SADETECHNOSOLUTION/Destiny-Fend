import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Users, Check, ChevronRight } from 'lucide-react';

export default function Applicants() {
  const partnerId = 'partner_ripple_01';
  const listingId = 'listing_kaval_dop';

  // State for pipeline columns matching the screen
  const [pipelineStages, setPipelineStages] = useState({
    applied: [
      { id: 'app_1', name: 'Vijay M', meta: '★ 4.5 · screening 3/3', initials: 'VI' },
      { id: 'app_2', name: 'Arjun P', meta: 'screening 2/3', initials: 'AR' },
      { id: 'app_3', name: 'Rekha S', meta: 'Invited', initials: 'RE' }
    ],
    shortlisted: [
      { id: 'app_4', name: 'Sreeman V K', meta: 'Score 5 · note by Ravi', initials: 'SR' },
      { id: 'app_5', name: 'Nila A', meta: 'Score 3', initials: 'NI' }
    ],
    audition: [
      { id: 'app_6', name: 'Karan T', meta: 'Thu 10:30', initials: 'KA' }
    ],
    offer: [
      { id: 'app_7', name: 'Mani D', meta: 'Sent · 40 h left', initials: 'MA' }
    ],
    hired: [
      { id: 'app_8', name: '—', meta: '1 to finalize', initials: '—' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch applicants on mount
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      // Calls Spring Boot endpoint: GET /api/v1/partners/{partnerId}/listings/{listingId}/applicants
      const response = await axios.get(`http://localhost:8080/api/v1/partners/${partnerId}/listings/${listingId}/applicants`);
      if (response.data) {
        console.log('Fetched applicant pipeline:', response.data);
      }
    } catch (error) {
      console.error('Error fetching applicants, using default mock pipeline:', error);
    }
  };

  // Move candidate between stages (simulating drag-and-drop action)
  const handleMoveStage = async (applicantId, targetStage) => {
    try {
      // Calls Spring Boot endpoint: PUT /api/v1/applicants/{applicantId}/stage
      await axios.put(`http://localhost:8080/api/v1/applicants/${applicantId}/stage`, { stage: targetStage });
      setStatusMessage(`Applicant moved to ${targetStage} successfully.`);
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Error updating applicant stage:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Kaval · DoP applicants</h1>
          <p className="text-xs text-slate-500 mt-0.5">61 applicants · drag cards between stages</p>
        </div>

        {/* View Tabs (Board / List) */}
        <div className="flex gap-4 border-b border-slate-200 text-xs font-semibold pb-3">
          <span className="text-[#05878C] border-b-2 border-[#05878C] pb-3 -mb-3 cursor-pointer">Board</span>
          <span className="text-slate-500 hover:text-slate-900 cursor-pointer">List</span>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          
          {/* Column 1: Applied */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wide">Applied · 3</h3>
            <div className="space-y-3">
              {pipelineStages.applied.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2 hover:border-[#05878C] transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      {app.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{app.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{app.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Shortlisted */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wide">Shortlisted · 2</h3>
            <div className="space-y-3">
              {pipelineStages.shortlisted.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2 hover:border-[#05878C] transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      {app.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{app.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{app.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Audition */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wide">Audition · 1</h3>
            <div className="space-y-3">
              {pipelineStages.audition.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2 hover:border-[#05878C] transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      {app.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{app.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{app.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Offer */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wide">Offer · 1</h3>
            <div className="space-y-3">
              {pipelineStages.offer.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2 hover:border-[#05878C] transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      {app.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{app.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{app.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 5: Hired */}
          <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wide">Hired · 1</h3>
            <div className="space-y-3">
              {pipelineStages.hired.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-[10px]">
                      {app.initials}
                    </div>
                    <span className="font-bold text-xs text-slate-900">{app.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{app.meta}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Buttons Bar */}
        <div className="flex items-center gap-3 pt-2">
          <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition">
            Invite to audition
          </button>
          <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition">
            Make offer
          </button>
          <button className="text-rose-600 hover:text-rose-700 text-xs font-semibold px-4 py-2 transition">
            Close post
          </button>
        </div>

      </main>
    </div>
  );
}