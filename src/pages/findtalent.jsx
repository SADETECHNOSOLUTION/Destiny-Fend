import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ArrowLeft, Check, Plus, UserPlus } from 'lucide-react';

export default function FindTalent() {
  // Search filter states matching the screen[cite: 16]
  const [filters, setFilters] = useState({
    craft: 'Cinematography',
    role: 'DoP',
    location: 'Chennai',
    verifiedOnly: false,
    availableNow: true
  });

  // Talent search results state[cite: 16]
  const [talents, setTalents] = useState([
    { 
      id: 't1', 
      name: 'Sreeman V K', 
      title: 'DoP · Chennai · 8 yrs · ★ 4.7 · 9 confirmed credits · Available now', 
      initials: 'SV',
      invited: false,
      listed: false 
    },
    { 
      id: 't2', 
      name: 'Vijay M', 
      title: 'DoP · Chennai · 11 yrs · ★ 4.5 · Available from 15 Dec', 
      initials: 'VJ',
      invited: false,
      listed: false 
    },
    { 
      id: 't3', 
      name: 'Nila A', 
      title: 'Camera operator · Chennai · 4 yrs · Not looking', 
      initials: 'NA',
      invited: false,
      listed: false 
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch talent search results on mount or filter change[cite: 16]
  useEffect(() => {
    fetchTalents();
  }, [filters]);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      // Calls Spring Boot endpoint: GET /api/v1/talents/search[cite: 16]
      const response = await axios.get('http://localhost:8080/api/v1/talents/search', {
        params: {
          craft: filters.craft,
          location: filters.location,
          verifiedOnly: filters.verifiedOnly
        }
      });
      if (response.data && Array.isArray(response.data)) {
        console.log('Talent search results:', response.data);
      }
    } catch (error) {
      console.error('Error searching talents, using default state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Invite action for a talent profile[cite: 16]
  const handleInviteTalent = (id) => {
    setTalents((prev) =>
      prev.map((t) => (t.id === id ? { ...t, invited: !t.invited } : t))
    );
    setStatusMessage('Invitation sent with a note to candidate.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Toggle List action (+ List)[cite: 16]
  const handleToggleList = (id) => {
    setTalents((prev) =>
      prev.map((t) => (t.id === id ? { ...t, listed: !t.listed } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

        {/* Top Header & Breadcrumb[cite: 16] */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home[cite: 16]
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Find talent[cite: 16]</h1>
          <p className="text-xs text-slate-500 mt-0.5">Search every professional profile · invite with a note[cite: 16]</p>
        </div>

        {/* Navigation Tabs[cite: 16] */}
        <div className="flex gap-6 border-b border-slate-200 text-xs font-semibold pb-3">
          <span className="text-[#05878C] border-b-2 border-[#05878C] pb-3 -mb-3 cursor-pointer">Search[cite: 16]</span>
          <span className="text-slate-500 hover:text-slate-900 cursor-pointer">Suggested for DoP · Kaval[cite: 16]</span>
          <span className="text-slate-500 hover:text-slate-900 cursor-pointer">Talent lists (3)[cite: 16]</span>
        </div>

        {/* Filter Pills Bar[cite: 16] */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            ✓ Craft: Cinematography[cite: 16]
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            ✓ Role: DoP[cite: 16]
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            ✓ Chennai[cite: 16]
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            ✓ Available now[cite: 16]
          </span>
          <span className="bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-50">
            5+ yrs (from Works)[cite: 16]
          </span>
          <span className="bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-50">
            Tamil[cite: 16]
          </span>
          <span className="bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-50">
            Age 25–45[cite: 16]
          </span>
          <span className="bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-50">
            ★ 4+[cite: 16]
          </span>
          <span className="bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-50">
            Confirmed credits[cite: 16]
          </span>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Talent Results Card Container[cite: 16] */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="space-y-6">
            {talents.map((talent) => (
              <div key={talent.id} className="flex items-center justify-between pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                    {talent.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{talent.name}[cite: 16]</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{talent.title}[cite: 16]</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleToggleList(talent.id)}
                    className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                  >
                    {talent.listed ? '✓ Listed' : '+ List'}[cite: 16]
                  </button>
                  <button 
                    onClick={() => handleInviteTalent(talent.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm ${
                      talent.invited 
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800' 
                        : 'bg-[#5CBE8F] hover:bg-[#4ba87c] text-white'
                    }`}
                  >
                    {talent.invited ? 'Invited' : 'Invite'}[cite: 16]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Talent Lists Section[cite: 16] */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900">Talent lists (shared with your team)[cite: 16]</h2>
          
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-800">Kaval – camera shortlist[cite: 16]</p>
                <p className="text-xs text-slate-500 mt-0.5">12 people · Ravi M[cite: 16]</p>
              </div>
              <button className="text-xs text-[#05878C] font-semibold hover:underline">Invite all[cite: 16]</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-800">Child actors 8–12[cite: 16]</p>
              <p className="text-xs text-slate-500 mt-0.5">7 profiles (guardians contacted)[cite: 16]</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}