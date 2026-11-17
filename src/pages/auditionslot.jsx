
import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Check } from 'lucide-react';

export default function CreateAuditionSlots() {
  // Form state for creating audition slots matching the screen[cite: 16]
  const [slotData, setSlotData] = useState({
    slotType: 'In person',
    date: 'Wed 5 Nov 2026',
    timeRange: '10:00 – 13:00',
    slotLength: '30 min',
    venue: 'AVM Studios, Floor 2, Chennai',
    invitedGroup: '3 shortlisted applicants'
  });

  // Generated preview slots based on time range and length[cite: 16]
  const [previewSlots, setPreviewSlots] = useState([
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit audition slots to backend[cite: 16]
  const handleCreateAndSend = async () => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      ...slotData,
      generatedSlots: previewSlots
    };

    try {
      // Calls Spring Boot endpoint: POST /api/v1/auditions/slots[cite: 16]
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
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

        {/* Top Header & Breadcrumb[cite: 16] */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home[cite: 16]
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Create audition slots[cite: 16]</h1>
          <p className="text-xs text-slate-500 mt-0.5">Applicants pick a slot · reminders 24 h and 1 h before[cite: 16]</p>
        </div>

        {/* Two-Column Grid: Schedule Form vs Preview Area[cite: 16] */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left Column: Schedule Form Card[cite: 16] */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-base text-slate-900">Schedule[cite: 16]</h2>

            {/* Slot Type Toggle[cite: 16] */}
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
                <span>In person[cite: 16]</span>
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
                Online (call link)[cite: 16]
              </button>
            </div>

            {/* Date Input[cite: 16] */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Date[cite: 16]</label>
              <input 
                type="text" 
                name="date"
                value={slotData.date}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              />
            </div>

            {/* Time Range Input[cite: 16] */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Time range[cite: 16]</label>
              <input 
                type="text" 
                name="timeRange"
                value={slotData.timeRange}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              />
            </div>

            {/* Slot Length Select[cite: 16] */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Slot length[cite: 16]</label>
              <select 
                name="slotLength"
                value={slotData.slotLength}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-xs bg-white focus:outline-none focus:border-[#05878C]"
              >
                <option value="15 min">15 min[cite: 16]</option>
                <option value="30 min">30 min[cite: 16]</option>
                <option value="45 min">45 min[cite: 16]</option>
                <option value="60 min">60 min[cite: 16]</option>
              </select>
            </div>

            {/* Venue Input[cite: 16] */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Venue[cite: 16]</label>
              <input 
                type="text" 
                name="venue"
                value={slotData.venue}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              />
            </div>
          </div>

          {/* Right Column: Preview Card[cite: 16] */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-base text-slate-900">Preview · {previewSlots.length} slots[cite: 16]</h2>
            
            {/* Generated Slots Chips[cite: 16] */}
            <div className="flex flex-wrap gap-2.5">
              {previewSlots.map((time, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-800 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-medium">
                  {time}[cite: 16]
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400">Invite[cite: 16]</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{slotData.invitedGroup}[cite: 16]</p>
              </div>
              <button className="text-xs text-[#05878C] font-semibold hover:underline">Change[cite: 16]</button>
            </div>
          </div>

        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Action Buttons[cite: 16] */}
        <div className="flex items-center space-x-4 pt-2">
          <button 
            onClick={handleCreateAndSend}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create & send[cite: 16]'}
          </button>
          <button 
            type="button" 
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm"
          >
            Cancel[cite: 16]
          </button>
        </div>

      </main>
    </div>
  );
}