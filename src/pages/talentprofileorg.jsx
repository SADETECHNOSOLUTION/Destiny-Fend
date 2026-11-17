import React, { useState } from 'react';
import axios from 'axios';

export default function SetUpPartnerProfile() {
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
      // Calls the /api/v1/partners/register-individual endpoint configured in your Spring Boot controller
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
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <form onSubmit={handleActivatePartner}>
        {/* Main Container */}
        <main className="max-w-5xl mx-auto px-6 py-8">
          
          {/* Back Link & Header Title */}
          <div className="mb-6">
            <a href="#" className="text-xs text-[#0A7E8C] font-semibold flex items-center mb-2 hover:underline">
              <span className="mr-1">←</span> Home
            </a>
            <h1 className="text-2xl font-bold text-gray-900">Set up your partner profile</h1>
            <p className="text-xs text-gray-500 mt-1">
              Individual · hires under your own name
            </p>
          </div>

          {/* Card 1: Partner Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-6">Partner details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Display name *</label>
                <input 
                  type="text" 
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                  required
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Headline</label>
                <input 
                  type="text" 
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Location *</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                  required
                />
              </div>

              {/* What do you hire for? */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">What do you hire for?</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="hireType"
                    value={formData.hireType}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C] pr-10"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 text-xs pointer-events-none">⌄</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">About</label>
              <textarea 
                name="about"
                rows="3"
                value={formData.about}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C] resize-none"
              ></textarea>
            </div>
          </div>

          {/* Card 2: Contact Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-6">Contact (from your account)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative flex items-center">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-4 pr-24 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                    required
                  />
                  <span className="absolute right-3 bg-[#E6F4EA] text-[#137333] text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center">
                    ✓ Verified
                  </span>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Mobile</label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl pl-4 pr-24 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#0A7E8C]"
                    required
                  />
                  <span className="absolute right-3 bg-[#E6F4EA] text-[#137333] text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-500">
              Shown only to people you shortlist or message.
            </p>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
              {statusMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#34A853] hover:bg-[#2e944a] text-white font-medium text-xs px-6 py-2.5 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Activating...' : 'Activate Talent Partner'}
            </button>
            <button 
              type="button" 
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-6 py-2.5 rounded-lg transition"
            >
              Back
            </button>
          </div>

        </main>
      </form>
    </div>
  );
}