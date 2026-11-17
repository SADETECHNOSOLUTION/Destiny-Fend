import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Check } from 'lucide-react';

export default function CreateAudition() {
  // Form state for creating audition slots matching the screen
  const [slotData, setSlotData] = useState({
    slotType: 'In person',
    date: 'Wed 5 Nov 2026',
    timeRange: '10:00 – 13:00',
    slotLength: '30 min',
    venue: 'AVM Studios, Floor 2, Chennai',
    invitedGroup: '3 shortlisted applicants'
  });

  // Generated preview slots based on time range and length
  const [previewSlots, setPreviewSlots] = useState([
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit audition slots to backend
  const handleCreateAndSend = async () => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      ...slotData,
      generatedSlots: previewSlots
    };

    try {
      // Calls Spring Boot endpoint: POST /api/v1/auditions/slots
      const response = await axios.post('http://localhost:8080/api/v1/auditions/slots', payload);

      setStatusMessage(`Success! Audition slots created and invitations sent.`);
      console.log('Audition Slots Response:', response.data);
    } catch (error) {
      console.error('Error creating audition slots:', error);
      setStatusMessage('Failed to create slots. Please check backend connection.');
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
          <h1 className="text-xl font-bold text-slate-900">Create audition slots</h1>
          <p className="text-[11px] text-slate-500">Applicants pick a slot · reminders 24 h and 1 h before</p>
        </div>

        {/* Schedule Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900">Schedule</h2>

          {/* Slot Type Toggle */}
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setSlotData({ ...slotData, slotType: 'In person' })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                slotData.slotType === 'In person' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              {slotData.slotType === 'In person' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
              <span>In person</span>
            </button>
            <button 
              type="button"
              onClick={() => setSlotData({ ...slotData, slotType: 'Online' })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                slotData.slotType === 'Online' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Online (call link)
            </button>
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Date</label>
            <input 
              type="text" 
              name="date"
              value={slotData.date}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>

          {/* Time Range Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Time range</label>
            <input 
              type="text" 
              name="timeRange"
              value={slotData.timeRange}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>

          {/* Slot Length Select */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Slot length</label>
            <select 
              name="slotLength"
              value={slotData.slotLength}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs bg-white focus:outline-none focus:border-[#05878C]"
            >
              <option value="15 min">15 min</option>
              <option value="30 min">30 min</option>
              <option value="45 min">45 min</option>
              <option value="60 min">60 min</option>
            </select>
          </div>

          {/* Venue Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Venue</label>
            <input 
              type="text" 
              name="venue"
              value={slotData.venue}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900">Preview · {previewSlots.length} slots</h2>
          
          {/* Generated Slots Chips */}
          <div className="flex flex-wrap gap-2">
            {previewSlots.map((time, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium">
                {time}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400">Invite</p>
              <p className="text-xs font-bold text-slate-800">{slotData.invitedGroup}</p>
            </div>
            <button className="text-xs text-[#05878C] font-semibold hover:underline">Change</button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button 
            type="button" 
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-3 rounded-xl transition text-center shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateAndSend}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create & send'}
          </button>
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