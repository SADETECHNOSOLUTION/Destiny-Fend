import React, { useState } from 'react';

export default function TalentPartnerOnboarding() {
  const [partnerType, setPartnerType] = useState('individual');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Back Link & Header Title */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-900">Become a Talent Partner</h1>
          <p className="text-sm text-gray-500 mt-1">
            Hire talent and build teams for your jobs and projects — from this same account.
          </p>
        </div>

        {/* Promo Launch Banner */}
        <div className="bg-[#E6F4EA] border border-[#CEEAD6] rounded-xl p-6 mb-8 relative">
          <span className="inline-block bg-[#137333] text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
            Free during launch
          </span>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Post jobs, create projects and hire the right people
          </h2>
          <p className="text-xs text-gray-600">
            Your personal profile stays as it is. Switch between "Sree" and your partner identity from the header at any time.
          </p>
        </div>

        {/* Partner Type Selection */}
        <h3 className="font-bold text-sm text-gray-900 mb-4">Choose your partner type</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Individual Card */}
          <div 
            onClick={() => setPartnerType('individual')}
            className={`border-2 rounded-xl p-5 cursor-pointer transition flex flex-col justify-between ${
              partnerType === 'individual' ? 'border-[#0A7E8C] bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-2">Individual</h4>
              <p className="text-xs text-gray-600 mb-6">
                Hire under your own name — e.g. an independent director, a producer or a college film lead.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-[#0A7E8C]">
              <span className={`w-3 h-3 rounded-full border-2 border-[#0A7E8C] flex items-center justify-center mr-2 ${partnerType === 'individual' ? 'bg-[#0A7E8C]' : ''}`}>
                {partnerType === 'individual' && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
              </span>
              ● Selected
            </div>
          </div>

          {/* Organization Card */}
          <div 
            onClick={() => setPartnerType('organization')}
            className={`border rounded-xl p-5 cursor-pointer transition flex flex-col justify-between ${
              partnerType === 'organization' ? 'border-[#0A7E8C] bg-white shadow-sm ring-1 ring-[#0A7E8C]' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-2">Organization</h4>
              <p className="text-xs text-gray-600 mb-6">
                Production house, agency, studio, brand, event or pageant company — with a team.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-gray-500">
              <span className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center mr-2"></span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className='flex justify-end'>
        <div className="flex items-center space-x-4">
      
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-6 py-2.5 rounded-lg transition">
            Not now
          </button>
              <button className="bg-cta hover:bg-[#2e944a] text-white font-medium text-xs px-6 py-2.5 rounded-lg transition shadow-sm">
            Continue
          </button>
        </div>
        </div>


      </main>
    </div>
  );
}