import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function Promote() {
  // Form state for promoting a listing matching the screen
  const [promoteData, setPromoteData] = useState({
    itemToPromote: 'Editor · Lumina promo (job)',
    selectedPackage: '7 days',
    amount: '₹ 999 + GST',
    durationDays: 7
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Package options matching the design cards
  const packages = [
    { id: 'p1', duration: '3 days', price: '₹ 499 + GST', days: 3, badge: null },
    { id: 'p2', duration: '7 days', price: '₹ 999 + GST', days: 7, badge: 'Popular' },
    { id: 'p3', duration: '15 days', price: '₹ 1,799 + GST', days: 15, badge: null }
  ];

  // Handle choosing a package and initiating checkout
  const handleChoosePackage = async (pkg) => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      itemToPromote: promoteData.itemToPromote,
      packageDuration: pkg.duration,
      price: pkg.price,
      durationDays: pkg.days
    };

    try {
      // Calls Spring Boot endpoint: POST /api/v1/promotions/checkout
      const response = await axios.post('http://localhost:8080/api/v1/promotions/checkout', payload);

      setStatusMessage(`Checkout initialized successfully! Payment ID: ${response.data.paymentId || 'PAY_' + Date.now()}`);
      setPromoteData((prev) => ({ ...prev, selectedPackage: pkg.duration, amount: pkg.price }));
      console.log('Promotion Checkout Response:', response.data);
    } catch (error) {
      console.error('Error initiating promotion checkout:', error);
      setStatusMessage('Failed to connect to checkout service. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC] text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <main className="space-y-5">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            
          </a>
          <h1 className="text-xl font-bold text-slate-900">Promote</h1>
          <p className="text-[11px] text-slate-500">Featured job · shown in discovery and recommended to matching talent</p>
        </div>

        {/* What to Promote Dropdown / Selector Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
          <label className="text-xs font-bold text-slate-900">What to promote</label>
          <select 
            value={promoteData.itemToPromote}
            onChange={(e) => setPromoteData({ ...promoteData, itemToPromote: e.target.value })}
            className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs bg-white focus:outline-none focus:border-[#05878C]"
          >
            <option value="Editor · Lumina promo (job)">Editor · Lumina promo (job)</option>
            <option value="Kaval Season 2 (project)">Kaval Season 2 (project)</option>
            <option value="Director of Photography (job)">Director of Photography (job)</option>
          </select>
        </div>

        {/* Promotion Packages Cards Stack */}
        <div className="space-y-3">
          {packages.map((pkg) => {
            const isSelected = promoteData.selectedPackage === pkg.duration;
            return (
              <div 
                key={pkg.id} 
                className={`bg-white border rounded-2xl p-4 shadow-sm relative transition flex flex-col justify-between ${
                  isSelected ? 'border-[#05878C] ring-1 ring-[#05878C]' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-1 mb-4">
                  <h3 className="font-bold text-sm text-slate-900">{pkg.duration}</h3>
                  <div className="text-lg font-extrabold text-slate-900">{pkg.price}</div>
                  <p className="text-[11px] text-slate-500">
                    Featured {pkg.days > 3 ? '+ recommended' : ''} {pkg.days > 7 ? '+ alerts' : ''}
                  </p>
                </div>

                <button 
                  onClick={() => handleChoosePackage(pkg)}
                  disabled={loading}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#5CBE8F] text-white hover:bg-[#4ba87c]' 
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{loading ? 'Processing...' : 'Choose'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Disclaimer Note */}
        <p className="text-[10px] text-slate-400 text-center leading-relaxed px-2">
          Placeholder prices — packages and prices are set by admins. Labelled "Featured".
        </p>

        {/* Bottom Navigation Bar */}
        <div className="pt-2 pb-4 flex justify-around text-xs text-slate-500 font-medium border-t border-slate-200">
          <span className="cursor-pointer hover:text-[#05878C]">Home</span>
          <span className="cursor-pointer hover:text-[#05878C]">Connect</span>
          <span className="cursor-pointer hover:text-[#05878C]">Messages</span>
          <span className="cursor-pointer hover:text-[#05878C]">Profile</span>
        </div>

      </main>
    </div>
  );
}