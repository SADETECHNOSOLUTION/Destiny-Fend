import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

export default function Budget({ onBack, onOpenMenu }) {
  // Sample rows matching your grid pattern
  const tableRows = [
    ['R1C1', 'R1C2', 'R1C3'],
    ['R2C1', 'R2C2', 'R2C3'],
    ['R3C1', 'R3C2', 'R3C3'],
    ['R4C1', 'R4C2', 'R4C3'],
    ['R5C1', 'R5C2', 'R5C3'],
    ['R6C1', 'R6C2', 'R6C3'],
    ['R7C1', 'R7C2', 'R7C3'],
    ['R8C1', 'R8C2', 'R8C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
    ['R9C1', 'R9C2', 'R9C3'],
  ];

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Top Teal Header */}
      <div className="bg-[#14b8a6] px-6 pt-6 pb-6 rounded-b-[25px] relative flex items-center justify-between shrink-0">
        <button 
          onClick={onBack}
          className="text-white flex items-center gap-1 font-medium text-sm cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-white font-semibold  px-3 py-1 rounded-md">Budget</span>
        <button onClick={onOpenMenu} className="text-white cursor-pointer">
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-hidden">
        
        {/* Title and Total Pill Header */}
        <div className="flex justify-between items-center mb-4 shrink-0 px-1">
          <h2 className="text-sm font-bold text-gray-900">Budget</h2>
          <div className="flex items-center gap-1.5 border border-[#14b8a6] px-3 py-1 rounded-full text-xs font-semibold text-[#14b8a6] bg-teal-50/50">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6]"></span>
            <span>Total</span>
          </div>
        </div>

        {/* Scrollable Data Table */}
        <div className="flex-1 overflow-y-auto border border-gray-100 rounded-xl shadow-sm bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#14b8a6] text-white text-[11px] sticky top-0">
                <th className="py-2.5 px-3 font-semibold">Header 1</th>
                <th className="py-2.5 px-3 font-semibold">Header 2</th>
                <th className="py-2.5 px-3 font-semibold">Header 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px] text-gray-700">
              {tableRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-3">{row[0]}</td>
                  <td className="py-2 px-3">{row[1]}</td>
                  <td className="py-2 px-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}