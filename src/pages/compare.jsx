
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Play, Check } from 'lucide-react';

export default function Compare() {
  // State for side-by-side talent comparison (up to 4 candidates matching the design screen)
  const [talents, setTalents] = useState([
    { id: 't1', name: 'Sreeman V K', meta: '8 yrs · ★ 4.7 · 3/3 · Score 5', initials: 'SV', shortlisted: false },
    { id: 't2', name: 'Vijay M', meta: '11 yrs · ★ 4.5 · 3/3 · —', initials: 'VJ', shortlisted: false },
    { id: 't3', name: 'Nila A', meta: '4 yrs · new · 2/3 · Score 3', initials: 'NA', shortlisted: false },
    { id: 't4', name: 'Arjun P', meta: '6 yrs · ★ 4.1 · 2/3 · —', initials: 'AP', shortlisted: false }
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch comparison talents on mount
  useEffect(() => {
    fetchCompareData();
  }, []);

  const fetchCompareData = async () => {
    setLoading(true);
    try {
      // Calls Spring Boot endpoint: GET /api/v1/talents/search
      const response = await axios.get('http://localhost:8080/api/v1/talents/search', {
        params: { ids: 't1,t2,t3,t4' }
      });
      if (response.data && Array.isArray(response.data)) {
        console.log('Fetched comparison talents:', response.data);
      }
    } catch (error) {
      console.error('Error fetching talent comparison, using fallback state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Shortlist action
  const handleToggleShortlist = (id) => {
    setTalents((prev) =>
      prev.map((t) => (t.id === id ? { ...t, shortlisted: !t.shortlisted } : t))
    );
    setStatusMessage('Updated shortlist status.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Compare</h1>
          <p className="text-xs text-slate-500 mt-0.5">Side by side · up to 4</p>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* 4-Column Grid for Desktop Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {talents.map((talent) => (
            <div key={talent.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                    {talent.initials}
                  </div>
                  <div className="truncate">
                    <h3 className="font-bold text-sm text-slate-900 truncate">{talent.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{talent.meta}</p>
                  </div>
                </div>

                {/* Reel Preview Box */}
                <div className="w-full h-36 bg-[#436859] rounded-xl p-3 flex flex-col justify-between text-white shadow-inner relative overflow-hidden">
                  <span className="text-xs font-semibold opacity-90">Reel</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center self-end">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>
              </div>

              {/* Shortlist Action Button */}
              <div>
                <button 
                  onClick={() => handleToggleShortlist(talent.id)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition border flex items-center justify-center gap-1.5 ${
                    talent.shortlisted 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {talent.shortlisted && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                  <span>{talent.shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
