import React from 'react';

export default function TalentPartnerDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50/50 font-sans text-gray-900 items-start justify-center antialiased">
<div className='p-6'>
<div className='flex flex-col p-8 h-max bg-gray-100 rounded-xl'>
<span className='p-2'>Dashboard</span>
<span className='p-2'>My Projects</span>
<span className='p-2'>Post a Job</span>
<span className='p-2'>Applicants</span>
<span className='p-2'>Shortlists</span>
<span className='p-2'>Messages</span>
<span className='p-2'>Settings</span>
</div>
</div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <a href="#" className="text-xs text-[#0A7E8C] font-semibold flex items-center mb-1 hover:underline">
            <span className="mr-1">←</span> Home
          </a>
          <h1 className="text-2xl font-bold text-gray-900">Ripple Films</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Talent Partner dashboard · Free during launch
          </p>
        </div>

        {/* Verification Banner */}
        <div className="bg-[#FFF4E5] border border-[#FFE0B2] rounded-xl p-4 md:px-6 md:py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-gray-800">
            Get the <span className="font-semibold">✓ Verified Partner badge</span> — talent can filter by verified partners and trust your posts more.
          </p>
          <button className="bg-white border border-[#0A7E8C] text-[#0A7E8C] hover:bg-[#0A7E8C] hover:text-white transition font-medium text-xs px-4 py-2 rounded-lg whitespace-nowrap shadow-sm">
            Request verification
          </button>
        </div>

        {/* 4 Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Open jobs</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Open projects</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">1</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">New applicants</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">23</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">Offers awaiting reply</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">3</div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button className="bg-[#34A853] hover:bg-[#2e944a] text-white font-medium text-xs px-4 py-2 rounded-lg transition shadow-sm flex items-center">
            <span className="mr-1 text-sm">+</span> Post a job
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-4 py-2 rounded-lg transition flex items-center shadow-sm">
            <span className="mr-1 text-sm">+</span> Create a project
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-4 py-2 rounded-lg transition shadow-sm">
            View partner profile
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs px-4 py-2 rounded-lg transition shadow-sm">
            Team (3)
          </button>
        </div>

        {/* Lower Content Grid: Jobs Table & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Your jobs & projects table (Span 2) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Your jobs & projects</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] text-gray-400 font-semibold border-b border-gray-100">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Applicants</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="py-4 font-semibold text-gray-900">Kaval Season 2</td>
                    <td className="py-4 text-gray-600">Project · 6 roles</td>
                    <td className="py-4 text-gray-600">41</td>
                    <td className="py-4">
                      <span className="bg-[#E6F4EA] text-[#137333] font-semibold px-2.5 py-1 rounded-md text-[11px]">
                        Open
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="py-4 font-semibold text-gray-900">Editor for promo</td>
                    <td className="py-4 text-gray-600">Job · Freelance</td>
                    <td className="py-4 text-gray-600">14</td>
                    <td className="py-4">
                      <span className="bg-[#E6F4EA] text-[#137333] font-semibold px-2.5 py-1 rounded-md text-[11px]">
                        Open
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="py-4 font-semibold text-gray-900">Zest Cola – "Summer Rush"</td>
                    <td className="py-4 text-gray-600">Job · One-time</td>
                    <td className="py-4 text-gray-600">9</td>
                    <td className="py-4">
                      <span className="bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-md text-[11px]">
                        Closed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Recent activity (Span 1) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Recent activity</h2>
            
            <div className="space-y-4 text-xs text-gray-700">
              <div className="border-b border-gray-100 pb-3">
                <p><span className="font-semibold text-gray-900">Meera S</span> applied to <span className="font-medium text-gray-900">Editor for promo</span></p>
                <span className="text-[10px] text-gray-400 mt-1 block">2h</span>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <p><span className="font-semibold text-gray-900">Arun K</span> accepted the offer for <span className="font-medium text-gray-900">Director of Photography</span></p>
                <span className="text-[10px] text-gray-400 mt-1 block">1d</span>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <p><span className="font-semibold text-gray-900">Priya R</span> was invited to <span className="font-medium text-gray-900">Lead Actress</span></p>
                <span className="text-[10px] text-gray-400 mt-1 block">2d</span>
              </div>
              <div>
                <p><span className="font-semibold text-gray-900">Karthik R (Recruiter)</span> shortlisted <span className="font-medium text-gray-900">5 actors</span></p>
                <span className="text-[10px] text-gray-400 mt-1 block">3d</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Navigation Note */}
        <div className="mt-8 text-xs text-gray-500 space-x-2">
          <a href="#" className="hover:underline">Partner settings</a>
          <span>·</span>
          <a href="#" className="hover:underline text-[#0A7E8C]">Switch off Talent Partner</a>
        </div>

      </main>
    </div>
  );
}