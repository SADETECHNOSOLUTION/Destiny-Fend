import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TalentPartnerOnboardingMobile() {
  const [partnerType, setPartnerType] = useState('individual');
  const navigate = useNavigate();

    const backhandling = ()=>{
    navigate(-1);
  }

  const handleContinue = () => {
    if (partnerType === 'individual') {
    navigate('/talent/setup-profile')
    } else {
    navigate('/talent/setup-organization')
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased px-4 py-6 max-w-md mx-auto">
      
      <main className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Become a Talent Partner</h1>
          <p className="text-xs text-gray-500 mt-1">
            Hire talent and build teams for your jobs and projects — from this same account.
          </p>
        </div>

        <div className="bg-[#E6F4EA] border border-[#CEEAD6] rounded-xl p-4 relative space-y-2">
          <span className="inline-block bg-[#137333] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
            Free during launch
          </span>
          <h2 className="text-sm font-bold text-gray-900">
            Post jobs, create projects and hire the right people
          </h2>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Your personal profile stays as it is. Switch between "Sree" and your partner identity from the header at any time.
          </p>
        </div>

        {/* Partner Type Selection */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wide">Choose your partner type</h3>

          <div className="space-y-3">
            
            {/* Individual Card */}
            <div 
              onClick={() => setPartnerType('individual')}
              className={`border-2 rounded-xl p-4 cursor-pointer transition flex flex-col justify-between ${
                partnerType === 'individual' ? 'border-[#0A7E8C] bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="mb-4">
                <h4 className="font-bold text-sm text-gray-900 mb-1">Individual</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Hire under your own name — e.g. an independent director, a producer or a college film lead.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-[#0A7E8C]">
                <span className={`w-3 h-3 rounded-full border-2 border-[#0A7E8C] flex items-center justify-center mr-2 ${partnerType === 'individual' ? 'bg-[#0A7E8C]' : ''}`}>
                  {partnerType === 'individual' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                </span>
                {partnerType === 'individual' ? 'Selected' : ''}
              </div>
            </div>

            {/* Organization Card */}
            <div 
              onClick={() => setPartnerType('organization')}
              className={`border-2 rounded-xl p-4 cursor-pointer transition flex flex-col justify-between ${
                partnerType === 'organization' ? 'border-[#0A7E8C] bg-white shadow-sm ring-1 ring-[#0A7E8C]' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="mb-4">
                <h4 className="font-bold text-sm text-gray-900 mb-1">Organization</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Production house, agency, studio, brand, event or pageant company — with a team.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-gray-500">
                <span className={`w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center mr-2 ${partnerType === 'organization' ? 'border-[#0A7E8C] bg-[#0A7E8C]' : ''}`}>
                  {partnerType === 'organization' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                </span>
                {partnerType === 'organization' ? 'Selected' : ''}
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-5 py-2.5 rounded-lg transition">
            Not now
          </button>
          <button 
            onClick={handleContinue}
            className="bg-[#34A853] hover:bg-[#2e944a] text-white font-medium text-xs px-6 py-2.5 rounded-lg transition shadow-sm"
          >
            Continue
          </button>
        </div>

      </main>
    </div>
  );
}