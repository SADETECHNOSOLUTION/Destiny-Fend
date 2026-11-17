import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Plus, Calendar, MapPin, Check, X } from 'lucide-react';

export default function Events() {
  const partnerId = 'partner_ripple_01';

  // Active tab filter state
  const [activeTab, setActiveTab] = useState('Upcoming');

  // Events state matching the design
  const [events, setEvents] = useState([
    { 
      id: 'e1', 
      title: 'Kaval open auditions', 
      date: 'Sat 15 Nov · 10 AM', 
      location: 'AVM Studios', 
      status: 'interested', 
      going: false,
      initials: 'KA'
    },
    { 
      id: 'e2', 
      title: 'Night cinematography masterclass', 
      date: 'Sun 23 Nov · online', 
      location: 'Online', 
      status: 'going', 
      going: true,
      featured: true,
      initials: 'WS'
    }
  ]);

  // Create Event Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: 'Tamil Cinema Pitch Fest',
    date: '30 Nov 2026 · 11 AM',
    location: 'Prasad Labs, Chennai',
    description: 'Pitch your indie scripts to major producers.'
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Toggle Going / Interested status
  const handleToggleGoing = (id) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, going: !ev.going } : ev))
    );
  };

  // Submit new event creation to backend
  const handleCreateEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/events
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/events`, newEvent);

      setStatusMessage(`Success! Event created with ID: ${response.data.eventId || 'EV_' + Date.now()}`);
      
      // Append to local state
      setEvents((prev) => [
        {
          id: Date.now().toString(),
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
          going: true,
          initials: newEvent.title.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        },
        ...prev
      ]);

      setShowCreateModal(false);
      console.log('Event Response:', response.data);
    } catch (error) {
      console.error('Error creating event:', error);
      setStatusMessage('Failed to create event. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <main className="space-y-5">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            
          </a>
          <h1 className="text-xl font-bold text-slate-900">Events</h1>
          <p className="text-[11px] text-slate-500">Auditions, workshops, festivals, screenings, launches</p>
        </div>

        {/* Tabs: Upcoming / Going / My events */}
        <div className="flex bg-slate-200/60 p-1 rounded-xl text-xs font-semibold">
          {['Upcoming', 'Going', 'My events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg transition text-center ${
                activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Events Cards Stack */}
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 truncate mr-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {ev.initials}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xs text-slate-900 truncate">{ev.title}</h3>
                      {ev.featured && (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{ev.date} · {ev.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                {!ev.going ? (
                  <>
                    <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition">
                      Interested
                    </button>
                    <button 
                      onClick={() => handleToggleGoing(ev.id)}
                      className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"
                    >
                      Going
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleToggleGoing(ev.id)}
                    className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Going
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-2 pt-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-[#5CBE8F] hover:bg-[#4ba87c] text-white py-3 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> + Create event
          </button>
          <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-xl text-xs font-bold transition shadow-sm text-center">
            My event attendees
          </button>
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-sm w-full shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Create New Event</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEventSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title *</label>
                  <input 
                    type="text" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date & Time *</label>
                  <input 
                    type="text" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location *</label>
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowCreateModal(false)}
                    className="border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-xs font-semibold text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm disabled:opacity-50 text-center"
                  >
                    {loading ? 'Creating...' : 'Publish Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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