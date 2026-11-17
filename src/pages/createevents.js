import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Check, Upload, Image as ImageIcon } from 'lucide-react';

export default function CreateEvent() {
  const partnerId = 'partner_ripple_01';

  // Form state for creating an event matching the screen
  const [eventData, setEventData] = useState({
    category: 'Audition',
    title: 'Kaval open audition',
    dateTime: 'Sat 15 Nov 2026 · 10:00 – 17:00',
    venueOrLink: 'AVM Studios, Chennai',
    description: 'Open call for supporting roles, ages 18–60.',
    coverUrl: ''
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const categories = ['Audition', 'Workshop', 'Festival', 'Screening', 'Launch'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle cover image upload and preview conversion
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        setEventData((prev) => ({ ...prev, coverUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit event to backend
  const handlePublishEvent = async (actionType = 'PUBLISHED') => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      ...eventData,
      status: actionType
    };

    try {
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/events[cite: 11]
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/events`, payload);

      setStatusMessage(`Success! Event published with ID: ${response.data.eventId || 'EV_' + Date.now()}`);
      console.log('Event Response:', response.data);
    } catch (error) {
      console.error('Error publishing event:', error);
      setStatusMessage('Failed to connect to backend server. Please check your connection.');
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
          <h1 className="text-xl font-bold text-slate-900">Create event[cite: 11]</h1>
          <p className="text-[11px] text-slate-500">Free to list · paid to promote[cite: 11]</p>
        </div>

        {/* Event Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          
          {/* Category Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = eventData.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setEventData({ ...eventData, category: cat })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border flex items-center gap-1 ${
                    isSelected 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-emerald-700" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Title</label>
            <input 
              type="text" 
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              required
            />
          </div>

          {/* Date & Time Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Date & time</label>
            <input 
              type="text" 
              name="dateTime"
              value={eventData.dateTime}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              required
            />
          </div>

          {/* Venue or Link Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Venue or link</label>
            <input 
              type="text" 
              name="venueOrLink"
              value={eventData.venueOrLink}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              required
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <textarea 
              name="description"
              rows="3"
              value={eventData.description}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#05878C] resize-none"
            />
          </div>

          {/* Cover Image Upload / Preview Section */}
          <div className="flex gap-3">
            <div className="w-28 h-28 bg-[#436859] rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center text-white shrink-0">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <ImageIcon className="w-5 h-5 opacity-80 mb-1" />
                  <span className="text-xs font-bold">Cover</span>
                </div>
              )}
            </div>

            <label className="w-full border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition p-4 text-center">
              <Upload className="w-5 h-5 text-[#05878C] mb-1" />
              <span className="text-xs font-semibold text-[#05878C]">+ Upload</span>
              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button 
            onClick={() => handlePublishEvent('PUBLISHED')}
            disabled={loading}
            className="w-full bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish event'}
          </button>
          <button 
            onClick={() => handlePublishEvent('PUBLISHED_AND_PROMOTED')}
            disabled={loading}
            className="w-full bg-white border border-[#05878C] text-[#05878C] hover:bg-slate-50 font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center"
          >
            Publish & promote
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