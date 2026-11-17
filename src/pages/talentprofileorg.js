import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetUpPartnerProfileMobile() {
  const [formData, setFormData] = useState({
    partnerType: 'INDIVIDUAL',
    displayName: 'Sreeman V K',
    headline: 'Independent director & DOP',
    location: 'Chennai, Tamil Nadu',
    hireType: 'Feature films · Short films · Ads',
    about: 'Making grounded, character-led films in Tamil. Currently casting for a short film.',
    email: 'sreemanvk@gmail.com',
    mobile: '+91 98765 43210'
  });
const navigate = useNavigate();

  const backhandling = ()=>{
    navigate(-1);
  }

  const submit = ()=>{

  }
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for activating and posting to backend
  const handleActivatePartner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/partners/register-individual', formData);
      setStatusMessage(`Success! Partner profile created and registered. ID: ${response.data.partnerId}`);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error registering individual partner:', error);
      setStatusMessage('Failed to connect to the backend server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased px-4 py-6 max-w-md mx-auto">
      <form onSubmit={handleActivatePartner}>
        {/* Main Container */}
        <main className="space-y-5">
          
          {/* Back Link & Header Title */}
          <div>
      
            <h1 className="text-xl font-bold text-gray-900">Set up your partner profile</h1>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Individual · hires under your own name
            </p>
          </div>

          {/* Card 1: Partner Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900">Partner details</h2>
            
            <div className="space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Display name *</label>
                <input 
                  type="text" 
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                  required
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Headline</label>
                <input 
                  type="text" 
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Location *</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                  required
                />
              </div>

              {/* What do you hire for? */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">What do you hire for?</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="hireType"
                    value={formData.hireType}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C] pr-10"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500 text-xs pointer-events-none">⌄</span>
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">About</label>
                <textarea 
                  name="about"
                  rows="3"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C] resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Card 2: Contact Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900">Contact (from your account)</h2>
            
            <div className="space-y-3">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <div className="relative flex items-center">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-3 pr-20 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                    required
                  />
                  <span className="absolute right-2.5 bg-[#E6F4EA] text-[#137333] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center">
                    ✓ Verified
                  </span>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile</label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-3 pr-20 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                    required
                  />
                  <span className="absolute right-2.5 bg-[#E6F4EA] text-[#137333] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500">
              Shown only to people you shortlist or message.
            </p>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
              {statusMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button onClick={backhandling}
              type="button" 
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs py-3 rounded-xl transition text-center"
            >
              Back
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#34A853] hover:bg-[#2e944a] text-white font-medium text-xs py-3 rounded-xl transition shadow-sm disabled:opacity-50 text-center"
            >
              {loading ? 'Activating...' : 'Activate Partner'}
            </button>
          </div>

        </main>
      </form>
    </div>
  );
}