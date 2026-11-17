import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, FileText, Plus, Check } from 'lucide-react';

export default function MakeOffer() {
  // Form state for making an offer matching the screen
  const [offerData, setOfferData] = useState({
    talentName: 'Sreeman V K',
    role: 'Director of Photography',
    dates: '10 Jan – 28 Feb 2027 · 45 shoot days',
    location: 'Chennai & Kodaikanal',
    message: "We'd love you to shoot Kaval. Call sheet attached.",
    replyTime: '48 hours',
    attachments: [
      { id: 'att_1', name: 'Callsheet.pdf', size: '1.4 MB' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [offerSent, setOfferSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file attachment upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAttachment = {
        id: 'att_' + Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setOfferData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));
    }
  };

  // Submit offer to backend
  const handleSendOffer = async () => {
    setLoading(true);
    setStatusMessage('');

    try {
      // Calls Spring Boot endpoint: POST /api/v1/offers
      const response = await axios.post('http://localhost:8080/api/v1/offers', offerData);

      setStatusMessage(`Success! Offer sent to ${offerData.talentName}.`);
      setOfferSent(true);
      console.log('Offer Response:', response.data);
    } catch (error) {
      console.error('Error sending offer:', error);
      setStatusMessage('Failed to send offer. Please check backend connection.');
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
            <ArrowLeft className="w-3.5 h-3.5 mr-1`" /> Back
          </a>
          <h1 className="text-xl font-bold text-slate-900">Make an offer</h1>
          <p className="text-[11px] text-slate-500">{offerData.talentName} · {offerData.role}</p>
        </div>

        {/* Offer Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          
          {/* Dates / Schedule */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Dates / schedule</label>
            <input 
              type="text" 
              name="dates"
              value={offerData.dates}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Location</label>
            <input 
              type="text" 
              name="location"
              value={offerData.location}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Message</label>
            <textarea 
              name="message"
              rows="3"
              value={offerData.message}
              onChange={handleChange}
              className="border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#05878C] resize-none"
            />
          </div>

          {/* Attachments Section */}
          <div className="flex gap-3 overflow-x-auto py-1">
            {offerData.attachments.map((att) => (
              <div key={att.id} className="w-28 h-28 bg-[#436859] rounded-xl p-3 flex flex-col justify-between text-white shrink-0 shadow-inner">
                <FileText className="w-5 h-5 opacity-80" />
                <div>
                  <p className="text-xs font-bold truncate">{att.name}</p>
                  <p className="text-[9px] opacity-75">{att.size}</p>
                </div>
              </div>
            ))}

            <label className="w-28 h-28 border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition shrink-0">
              <Plus className="w-5 h-5 text-[#05878C] mb-1" />
              <span className="text-xs font-semibold text-[#05878C]">+ Attach</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Reply Time Selection */}
          <div className="flex flex-col gap-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-700">Reply time</label>
            <div className="flex gap-2">
              {['24 h', '48 h', '72 h', '7 days'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setOfferData({ ...offerData, replyTime: time })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                    offerData.replyTime === time 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-400">Pay is agreed directly with the talent — not part of the offer.</p>
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
            onClick={handleSendOffer}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send offer'}
          </button>
        </div>

        {/* Active Sent Offer Notice Box */}
        {offerSent && (
          <div className="bg-white border border-rose-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div>
              <h3 className="text-xs font-bold text-rose-600">Sent offer · Mani D (Focus Puller)</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Expires in 40 h. You can withdraw before it is accepted — a reason is required and Mani is notified.
              </p>
            </div>
            <button className="w-full border border-rose-300 hover:bg-rose-50 text-rose-600 py-2 rounded-xl text-xs font-semibold transition">
              Withdraw offer...
            </button>
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