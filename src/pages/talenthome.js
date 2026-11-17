import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';

export default function TalentPartnerDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [listings, setListings] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backhandling = () => {
    navigate(-1);
  };

  // Fetch partner profile, metrics, listings, and activity feed on mount
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch user & identities profile data
        const profileRes = await axios.get('http://localhost:8080/api/v1/users/profile', { headers });
        setProfile(profileRes.data);

        // Assuming active partner ID can be extracted or selected from identities
        const activePartnerId = profileRes.data.identities?.[0]?.partnerId || 'partner_default';

        // 2. Fetch dashboard metrics
        try {
          const dashRes = await axios.get(`http://localhost:8080/api/v1/partners/${activePartnerId}/dashboard`, { headers });
          setDashboardData(dashRes.data);
        } catch (e) {
          console.warn("Using fallback dashboard metrics");
        }

        // 3. Fetch listings
        try {
          const listRes = await axios.get(`http://localhost:8080/api/v1/partners/${activePartnerId}/listings`, { headers });
          setListings(listRes.data);
        } catch (e) {
          console.warn("Using fallback listings");
        }

        // 4. Fetch activity feed
        try {
          const actRes = await axios.get(`http://localhost:8080/api/v1/partners/${activePartnerId}/activity-feed`, { headers });
          setActivityFeed(actRes.data);
        } catch (e) {
          console.warn("Using fallback activity feed");
        }

      } catch (error) {
        console.error("Failed to fetch talent partner dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  const handleRequestVerification = async (partnerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Verification requested successfully!");
    } catch (error) {
      console.error("Failed to request verification:", error);
    }
  };

  // Get active organization details
  const activeOrg = profile?.identities?.[0] || { displayName: "Ripple Films", partnerType: "Organization", partnerId: "partner_default" };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 antialiased flex flex-col">


      {menuOpen && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col space-y-2 text-xs font-medium text-gray-700 shadow-sm md:hidden">
          <span className="py-1 px-2 rounded bg-gray-100 font-semibold text-gray-900">Dashboard</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">My Projects</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">Post a Job</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">Applicants</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">Shortlists</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">Messages</span>
          <span className="py-1 px-2 rounded hover:bg-gray-50">Settings</span>
        </div>
      )}

              <div className='bg-cta py-6 px-4'>
                <div className='flex items-center justify-between'>
                      <div className=''>

          <h1 className="text-xl font-bold text-white">{activeOrg.displayName}</h1>
          <p className="text-[11px] text-gray-200 mt-0.5">
            Talent Partner dashboard · Free during launch
          </p>
        </div>
                   <button 
            onClick={() => navigate('/talent/verification')}
            className="bg-white w-max border mt-3 border-[#0A7E8C] text-[#0A7E8C] hover:bg-[#0A7E8C] hover:text-white transition font-medium text-xs py-1.5 px-3 rounded-lg text-center shadow-sm w-full"
          >
             Verify
          </button>
                </div>
    
           <button onClick={()=>{navigate('/talent/team')}} className="bg-white flex items-center gap-1 w-max mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs py-2 px-3 rounded-lg transition shadow-sm text-center">
          <Icon icon="fluent:people-28-filled" width="1.5em" style={{ color: '#35bac2' }} /> <span> Team ({profile?.teamCount || 3})</span>
          </button>
        </div>

      {/* Main Container */}
      <main className="px-4 py-6 max-w-md mx-auto space-y-3 w-full">

        {/* Header Breadcrumb & Title */}



<button onClick={()=>{navigate('/talent/post-a-job')}} className="bg-white w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs py-4 px-3 rounded-lg transition flex items-center justify-center shadow-sm">
            <span className="mr-1 text-sm">+</span> Post a Job
          </button>
        {/* Action Buttons Bar */}
        <div className="grid grid-cols-2 gap-2">
     
          <button onClick={()=>{navigate('/talent/create-project')}} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs py-2.5 px-3 rounded-lg transition flex items-center justify-center shadow-sm">
            <span className="mr-1 text-sm">+</span> Create project
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs py-2 px-3 rounded-lg transition shadow-sm text-center">
           + Create Events
          </button>
          
        </div>
       
        {/* 4 Metrics Summary Cards (2x2 Grid for Mobile) */}
        <div className="grid grid-cols-3 gap-3">
         
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Open jobs</span>
            <div className="text-xl font-bold text-gray-900 mt-1">{dashboardData?.openJobs ?? 2}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Open projects</span>
            <div className="text-xl font-bold text-gray-900 mt-1">{dashboardData?.openProjects ?? 1}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Open Events</span>
            <div className="text-xl font-bold text-gray-900 mt-1">{dashboardData?.newApplicants ?? 23}</div>
          </div>

        </div>



        {/* Lower Content Stack: Jobs & Projects */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Your jobs & projects</h2>
          
          <div className="space-y-3">
            {listings.length === 0 ? (
              <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-3 text-xs text-gray-500 text-center">
                No listings found. Create your first job or project above!
              </div>
            ) : (
              listings.map((item, index) => (
                <div key={item.id || index} className="border border-gray-100 bg-gray-50/50 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.title}</p>
                      {/* <p className="text-[10px] text-gray-500">{item.type || 'Project'} · Active</p> */}
                    </div>
                    <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                      item.status === 'Open' ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status || 'Open'}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-600 flex justify-between pt-1 border-t border-gray-200/60">
                    <span>Applicants: <strong>{item.applicants || 0}</strong></span>
                    <a href="#" className="text-[#0A7E8C] font-semibold">Manage</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Stack */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Recent activity</h2>
          
          <div className="space-y-3 text-xs text-gray-700">
            {activityFeed.length === 0 ? (
              <p className="text-gray-500 text-xs">No recent activity recorded.</p>
            ) : (
              activityFeed.map((feed, index) => (
                <div key={index} className="border-b border-gray-100 pb-2.5 last:border-none last:pb-0">
                  <p>{feed.action}</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">{feed.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Navigation Note */}
        <div className="pt-2 pb-6 text-center text-xs text-gray-500 space-x-2">
          <a href="#" className="hover:underline">Partner settings</a>
          <span>·</span>
          <a href="#" className="hover:underline text-[#0A7E8C]">Switch off Talent Partner</a>
        </div>

      </main>
    </div>
  );
}