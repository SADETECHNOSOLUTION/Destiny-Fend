import React from 'react';
import { 
  Building2, 
  HelpCircle, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  FileText, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Activity, 
  Database,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function DashboardOrgdash() {
  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-800 font-sans antialiased">
      
      <div className='px-12 py-8 flex flex-col gap-2'>
<span className='font-bold text-3xl'>You're a Talent Partner</span>
<span className='text-gray-400'>Ripple Films is live · Free during launch</span>
      </div>

      {/* ================= Main Content Container ================= */}
      <main className="max-w-[1276px] mx-auto px-4 space-y-6">

        {/* --- Top Banner Card (Welcome / System Status) --- */}
        <section className="bg-[#E8F7EF] border border-[#CFE9DE] rounded-[13.5px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <CheckCircle2 className="w-8 h-8 text-[#287B57]" />
            </div>
            <div className="space-y-1">
              
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Ripple Films is ready to hire
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                You're now in Talent Partner mode. Use the switcher at the top right to go back to — your posts, messages and notifications are labelled by mode.              </p>
            </div>
          </div>
          <button className="bg-[#14595E] hover:bg-[#0f4448] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-sm transition flex items-center space-x-2 shrink-0">
            <span>Go to partner dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>


        {/* --- Grid Section: Cards / Metrics --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-[#DFE7E6] rounded-[13.5px] p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#05878C] transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C]">
                <Database className="w-6 h-6" />
              </div>
  <div>
              <h3 className="font-bold text-slate-900 text-lg">Post a Job</h3>
              <p className="text-xs text-slate-500 mt-1">One role, e.g. an editor</p>
            </div>            </div>
           
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white text-center px-6 py-2.5 rounded-[10px] text-sm font-bold shadow-sm transition flex items-center justify-center space-x-2">
            <span>Post a Job</span>
            <RefreshCw className="w-4 h-4" />
          </button>
          </div>
             <div className="bg-white border border-[#DFE7E6] rounded-[13.5px] p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#05878C] transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C]">
                <Database className="w-6 h-6" />
              </div>
  <div>
              <h3 className="font-bold text-slate-900 text-lg">Create a Project</h3>
              <p className="text-xs text-slate-500 mt-1">A production with many roles</p>
            </div>            </div>
           
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white text-center px-6 py-2.5 rounded-[10px] text-sm font-bold shadow-sm transition flex items-center justify-center space-x-2">
            <span>Create a Project</span>
            <RefreshCw className="w-4 h-4" />
          </button>
          </div>

  <div className="bg-white border border-[#DFE7E6] rounded-[13.5px] p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#05878C] transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C]">
                <Database className="w-6 h-6" />
              </div>
  <div>
              <h3 className="font-bold text-slate-900 text-lg">Invite your team</h3>
              <p className="text-xs text-slate-500 mt-1">Admins and Recruiters</p>
            </div>            </div>
           
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white text-center px-6 py-2.5 rounded-[10px] text-sm font-bold shadow-sm transition flex items-center justify-center space-x-2">
            <span>Invite your team</span>
            <RefreshCw className="w-4 h-4" />
          </button>
          </div>
          <div className="bg-white border border-[#DFE7E6] rounded-[13.5px] p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#05878C] transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7FAFA] border border-dashed border-[#5CBE8F] flex items-center justify-center text-[#05878C]">
                <Database className="w-6 h-6" />
              </div>
  <div>
              <h3 className="font-bold text-slate-900 text-lg">Get verified</h3>
              <p className="text-xs text-slate-500 mt-1">Earn the ✓ Verified Partner badge</p>
            </div>            </div>
           
            <button className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white text-center px-6 py-2.5 rounded-[10px] text-sm font-bold shadow-sm transition flex items-center justify-center space-x-2">
            <span>Get verified</span>
            <RefreshCw className="w-4 h-4" />
          </button>
          </div>


        </div>

{/* */}

      </main>
    </div>
  );
}