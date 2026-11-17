import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Check, Play } from 'lucide-react';

export default function Compare() {
  // State for side-by-side talent comparison (up to 4 candidates)
  const [talents, setTalents] = useState([
    { id: 't1', name: 'Sreeman V K', experience: '8 yrs', rating: '4.7', score: 'Score 5', shortlisted: false, reelTitle: 'Reel' },
    { id: 't2', name: 'Vijay M', experience: '11 yrs', rating: '4.5', score: '—', shortlisted: false, reelTitle: 'Reel' },
    { id: 't3', name: 'Nila A', experience: '4 yrs · new', rating: '2/3', score: 'Score 3', shortlisted: false, reelTitle: 'Reel' },
    { id: 't4', name: 'Arjun P', experience: '6 yrs', rating: '4.1', score: '—', shortlisted: false, reelTitle: 'Reel' }
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch talents on mount
  useEffect(() => {
    fetchTalentComparison();
  }, []);

  const fetchTalentComparison = async () => {
    setLoading(true);
    try {
      // Calls Spring Boot endpoint: GET /api/v1/talents/search
      const response = await axios.get('http://localhost:8080/api/v1/talents/search', {
        params: { craft: 'Editor', verifiedOnly: false }
      });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        console.log('Fetched comparison talents:', response.data);
      }
    } catch (error) {
      console.error('Error fetching talent comparison data, using default state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle shortlist status for a candidate
  const handleToggleShortlist = async (talentId) => {
    setTalents((prev) =>
      prev.map((t) => (t.id === talentId ? { ...t, shortlisted: !t.shortlisted } : t))
    );
    setStatusMessage(`Updated shortlist status for candidate.`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <main className="space-y-5">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Compare
          </a>
          <h1 className="text-xl font-bold text-slate-900">Compare</h1>
          <p className="text-[11px] text-slate-500">Side by side · up to 4</p>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-[11px] font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Talent Comparison Cards Stack */}
        <div className="space-y-4">
          {talents.map((talent) => (
            <div key={talent.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
              
              {/* Candidate Info Header */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {talent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{talent.name}</h3>
                  <p className="text-[10px] text-slate-500">
                    {talent.experience} · ★ {talent.rating} · {talent.score}
                  </p>
                </div>
              </div>

              {/* Reel Preview Box */}
              <div className="relative w-full h-36 bg-[#436859] rounded-xl flex flex-col justify-between p-3 text-white overflow-hidden shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium opacity-90">{talent.reelTitle}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>
                <div className="text-[10px] opacity-75">Click to preview demo reel</div>
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

        {/* Bottom Navigation Bar */}
        <div className="pt-2 pb-4 flex justify-around text-xs text-slate-500 font-medium border-t border-slate-200">
          <span className="cursor-pointer hover:text-[#05878C]">Home</span>
          <span className="cursor-pointer hover:text-[#05878C]">Connect</span>
          <span className="cursor-pointer hover:text-[#05878C]">Messages</span>
          <span className="cursor-pointer hover:text-[#05878C]">Profile</span>
        </div>

      </main>
    </div>
  );
}