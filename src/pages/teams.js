import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, UserPlus, X, Shield, RefreshCw } from 'lucide-react';

export default function TeamManagement() {
  const partnerId = 'partner_ripple_01';

  // State for team members list matching the design screen
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 'm1', 
      name: 'Sreeman V K (you)', 
      role: 'Owner', 
      permissions: 'Owner · everything incl. transfer ownership, switch off, delete organization', 
      status: 'Active', 
      initials: 'SV' 
    },
    { 
      id: 'm2', 
      name: 'Ravi M', 
      role: 'Admin', 
      permissions: 'Admin · organization profile, team, all jobs & projects', 
      status: 'Active', 
      initials: 'RM' 
    },
    { 
      id: 'm3', 
      name: 'Divya K', 
      role: 'Recruiter', 
      permissions: 'Recruiter · create/manage posts, shortlist, auditions, offers', 
      status: 'Active', 
      initials: 'DK' 
    },
    { 
      id: 'm4', 
      name: 'anil@ripple.in', 
      role: 'Recruiter', 
      permissions: 'Invited · Recruiter · expires in 6 days', 
      status: 'Pending', 
      initials: 'AN' 
    }
  ]);

  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
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
      console.error('Error fetching team members:', error);
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

      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/team/invite
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/team/invite`, payload);

      setStatusMessage(`Invitation sent successfully to ${inviteEmail}!`);
      
      // Append to local state
      setTeamMembers((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: inviteEmail,
          role: inviteRole,
          permissions: `Invited · ${inviteRole} · expires in 7 days`,
          status: 'Pending',
          initials: inviteEmail.substring(0, 2).toUpperCase()
        }
      ]);

      setInviteEmail('');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error sending invitation:', error);
      setStatusMessage('Failed to send invite. Please check backend connection.');
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
          <h1 className="text-xl font-bold text-slate-900">Team</h1>
          <p className="text-[11px] text-slate-500">4 of 10 members on the free plan</p>
        </div>

        {/* Members Card Stack Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-start justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-start gap-3 truncate mr-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {member.initials}
                  </div>
                  <div className="truncate">
                    <h3 className="font-bold text-xs text-slate-900 truncate">{member.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{member.permissions}</p>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {member.role === 'Owner' && (
                    <span className="bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-full">
                      Owner
                    </span>
                  )}
                  {member.role === 'Admin' && (
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                      <button className="text-xs text-[#05878C] font-semibold hover:underline">Change</button>
                    </div>
                  )}
                  {member.role === 'Recruiter' && member.status === 'Active' && (
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                        Recruiter
                      </span>
                      <button className="text-xs text-[#05878C] font-semibold hover:underline">Change</button>
                    </div>
                  )}
                  {member.status === 'Pending' && (
                    <button className="text-xs text-[#05878C] font-semibold hover:underline">Resend</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="w-full bg-[#5CBE8F] hover:bg-[#4ba87c] text-white py-3 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> + Invite member
          </button>
          <button className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-xl text-xs font-bold transition shadow-sm text-center">
            Transfer ownership
          </button>
        </div>

        {/* Invite Modal */}
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
                    placeholder="colleague@ripple.in"
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