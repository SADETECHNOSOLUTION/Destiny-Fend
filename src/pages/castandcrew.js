import React from 'react';
import { ArrowLeft, Menu, Plus, Edit2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CastAndCrew({ onBack, onOpenMenu }) {
    const Navigation = useNavigate();
  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Top Teal Header with Back & Title */}
      <div className="bg-[#14b8a6] px-6 pt-6 pb-6 rounded-b-[25px] relative flex items-center justify-between">
        <button 
          onClick={()=>Navigation('/recruiterdashboard')}
          className="text-white flex items-center gap-1 font-medium text-sm cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-white font-bold text-base">Cast & Crew</h2>
        <button onClick={onOpenMenu} className="text-white cursor-pointer">
        </button>
      </div>

      {/* Cast & Crew Content List */}
      <div className="flex-1 px-6 pt-6 pb-6 overflow-y-auto space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-800">Cast & Crew</span>
          <button className="flex items-center gap-1.5 border border-[#14b8a6] text-[#14b8a6] px-3 py-1 rounded-full text-xs font-semibold hover:bg-teal-50 transition cursor-pointer">
            <Plus size={12} /> Add New
          </button>
        </div>

        {/* Item 1 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
              alt="Mathew" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xs font-bold text-gray-900">Mathew</h4>
              <p className="text-[10px] text-gray-500">Protagonist</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-teal-600">
            <button className="hover:opacity-70 cursor-pointer"><Edit2 size={14} /></button>
            <button className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={14} /></button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" 
              alt="Jordan" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xs font-bold text-gray-900">Jordan</h4>
              <p className="text-[10px] text-gray-500">Antagonist</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-teal-600">
            <button className="hover:opacity-70 cursor-pointer"><Edit2 size={14} /></button>
            <button className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={14} /></button>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" 
              alt="Mathew" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xs font-bold text-gray-900">Mathew</h4>
              <p className="text-[10px] text-gray-500">Director</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-teal-600">
            <button className="hover:opacity-70 cursor-pointer"><Edit2 size={14} /></button>
            <button className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}