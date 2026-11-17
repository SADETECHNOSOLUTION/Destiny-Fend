import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Database,
  RefreshCw
} from 'lucide-react';

export default function DashboardOrgdashMobile() {
  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      
      {/* Header Title Section */}
      <div className='mb-6 flex flex-col gap-1'>
        <h1 className='font-bold text-2xl text-slate-900'>You're a Talent Partner</h1>
        <p className='text-xs text-gray-500'>Ripple Films is live · Free during launch</p>
      </div>

      {/* ================= Main Content Container ================= */}
      <main className="space-y-4">

        {/* --- Top Banner Card (Welcome / System Status) --- */}
        <section className="bg-[#E8F7EF] border border-[#CFE9DE] rounded-2xl p-5 flex flex-col space-y-4 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#287B57]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Ripple Films is ready to hire
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                You're now in Talent Partner mode. Use the switcher at the top right to go back — your posts, messages and notifications are labelled by mode.
              </p>
            </div>
          </div>
          <button className="bg-[#14595E] hover:bg-[#0f4448] text-white w-full py-3 rounded-xl text-xs font-semibold shadow-sm transition flex items-center justify-center space-x-2">
            <span>Go to partner dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* --- Grid Section: Cards / Metrics (Stacked for Mobile) --- */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* Card 1: Post a Job */}
          <div className="bg-white border border-[#DFE7E6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Post a Job</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">One role, e.g. an editor</p>
              </div>
            </div>
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-2">
              <span>Post a Job</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Create a Project */}
          <div className="bg-white border border-[#DFE7E6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Create a Project</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">A production with many roles</p>
              </div>
            </div>
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-2">
              <span>Create a Project</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Invite your team */}
          <div className="bg-white border border-[#DFE7E6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Invite your team</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Admins and Recruiters</p>
              </div>
            </div>
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-2">
              <span>Invite your team</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Get verified */}
          <div className="bg-white border border-[#DFE7E6] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Get verified</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Earn the ✓ Verified Partner badge</p>
              </div>
            </div>
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white w-full py-2.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-2">
              <span>Get verified</span>
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}