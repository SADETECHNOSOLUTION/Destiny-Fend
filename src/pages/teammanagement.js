import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, CheckCircle2, Clock, X } from 'lucide-react';

export default function TeamManagementMobile() {
  const partnerId = 'partner_ripple_01';

  // State for team members list
  const [teamMembers, setTeamMembers] = useState([
    { id: 'u1', name: 'Sreeman V K (you)', role: 'Owner', status: 'Active', avatarColor: 'bg-emerald-700' },
    { id: 'u2', name: 'Anitha N', role: 'Admin', status: 'Active', avatarColor: 'bg-emerald-600' },
    { id: 'u3', name: 'Karthik R', role: 'Recruiter', status: 'Active', avatarColor: 'bg-emerald-500' },
    { id: 'u4', name: 'divya@ripplefilms.in', role: 'Recruiter', status: 'Invite pending', avatarColor: 'bg-emerald-400' }
  ]);

  // Invite modal state & form inputs
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('divya@ripplefilms.in');
  const [inviteRole, setInviteRole] = useState('Recruiter');
  
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch team members on mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/partners/${partnerId}/team`);
      if (response.data && Array.isArray(response.data)) {
        console.log('Fetched team members:', response.data);
      }
    } catch (error) {
      console.error('Error fetching team members, using local fallback state:', error);
    }
  };

  // Handle invite submission
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const payload = {
        email: inviteEmail,
        role: inviteRole
      };

      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/team/invite`, payload);
      
      setStatusMessage(`Invite sent to ${response.data.email}!`);
      
      setTeamMembers((prev) => [
        ...prev,
        { id: Date.now().toString(), name: inviteEmail, role: inviteRole, status: 'Invite pending', avatarColor: 'bg-emerald-400' }
      ]);

      setInviteEmail('');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error sending team invite:', error);
      setStatusMessage('Failed to send invite. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <main className="space-y-5">

        {/* Header Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            <span>←</span> Home
          </a>
          <h1 className="text-xl font-bold text-slate-900">Team</h1>
          <p className="text-[11px] text-slate-500">Ripple Films · people who can manage hiring</p>
        </div>

        {/* Members Card Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm text-slate-900">Members ({teamMembers.length})</h2>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" /> + Invite
            </button>
          </div>

          {/* Members Card Stack for Mobile */}
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <div className={`w-7 h-7 rounded-full ${member.avatarColor} text-white font-bold flex items-center justify-center text-[10px] shadow-sm shrink-0`}>
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">{member.name}</p>
                      <p className="text-[10px] text-slate-500">{member.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold inline-flex items-center gap-1 shrink-0 ${
                    member.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {member.status === 'Active' ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                    {member.status}
                  </span>
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  {member.status === 'Active' ? (
                    <>
                      {member.role !== 'Owner' ? (
                        <>
                          <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium transition">
                            Change role
                          </button>
                          <button className="border border-red-200 hover:bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-[11px] font-medium transition">
                            Remove
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </>
                  ) : (
                    <>
                      <button className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium transition">
                        Resend
                      </button>
                      <button className="border border-red-200 hover:bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-[11px] font-medium transition">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Permissions Information Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <h3 className="font-bold text-xs text-slate-900">What each role can do</h3>
          <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4 leading-relaxed">
            <li><strong className="text-slate-800">Owner</strong> — everything, including transferring ownership and switching off.</li>
            <li><strong className="text-slate-800">Admin</strong> — edit profile, manage team, and all jobs & projects.</li>
            <li><strong className="text-slate-800">Recruiter</strong> — post/manage jobs, shortlist, schedule auditions and send offers.</li>
            <li><strong className="text-slate-800">Per-post co-managers</strong> can be added on any job or project (JP-15).</li>
          </ul>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Invite Member Modal / Inline Drawer */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-sm w-full shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Invite Team Member</h3>
                <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email address *</label>
                  <input 
                    type="email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@ripplefilms.in"
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-xs bg-white focus:outline-none focus:border-[#05878C]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowInviteModal(false)}
                    className="border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-xs font-semibold text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm disabled:opacity-50 text-center"
                  >
                    {loading ? 'Sending...' : 'Send Invite'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}