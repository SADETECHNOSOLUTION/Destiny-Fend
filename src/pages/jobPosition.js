import React from 'react';
import { LucideStepBack, Menu, ArrowLeft } from 'lucide-react';
import Backdrop from '@mui/material/Backdrop';

export default function Positions({ onOpenMenu }) {
  const positionsData = [
    {
      title: 'Assistant Cameraman',
      experience: 'Experience: 1-3 Years',
      applied: '17+ Applied',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=60'
      ]
    },
    {
      title: 'Set Assistant',
      experience: 'Experience: 0 Years',
      applied: '9+ Applied',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=60'
      ]
    },
    {
      title: 'Professional Editor',
      experience: 'Experience: 2-4 Years',
      applied: '3+ Applied',
      avatars: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&auto=format&fit=crop&q=60'
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      <div className="bg-[#14b8a6] px-6 pt-6 pb-6 rounded-b-[25px] relative flex items-center justify-between shrink-0">
        <div className="w-20 text-white">  <ArrowLeft size={20} /></div> {/* Spacer for symmetry */}
                

        <span className="text-white font-semibold  px-3 py-1 rounded-md">Positions</span>
        <button onClick={onOpenMenu} className="text-[#14b8a6] text-sm px-3 py-1 rounded-full bg-white border-none cursor-pointer">
        <span>Add new</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-hidden">
        
        {/* Title Header */}
        <div className="mb-4 shrink-0 px-1 text-center">
        </div>

        {/* Positions List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {positionsData.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.experience}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2 overflow-hidden">
                  {item.avatars.map((avatar, i) => (
                    <img 
                      key={i} 
                      src={avatar} 
                      alt="applicant" 
                      className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-teal-600">{item.applied}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}