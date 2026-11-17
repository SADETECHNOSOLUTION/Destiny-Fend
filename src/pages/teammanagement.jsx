import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Shield, CheckCircle2, Clock, Trash2, Edit3, X } from 'lucide-react';

export default function TeamManagement() {
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
        // If backend returns data, map it; otherwise keep mock default
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

      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/team/invite
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/team/invite`, payload);
      
      setStatusMessage(`Invite successfully sent to ${response.data.email} as ${inviteRole}!`);
      
      // Append to local state list as pending
      setTeamMembers((prev) => [
        ...prev,
        { id: Date.now().toString(), name: inviteEmail, role: inviteRole, status: 'Invite pending', avatarColor: 'bg-emerald-400' }
      ]);

      setInviteEmail('');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error sending team invite:', error);
      setStatusMessage('Failed to send invite. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased p-8">
      <main className="max-w-[1276px] mx-auto space-y-6">

        {/* Header Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            <span>←</span> Home
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Team</h1>
          <p className="text-xs text-slate-500">Ripple Films · people who can manage hiring</p>
        </div>

        {/* Members Card Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-base text-slate-900">Members ({teamMembers.length})</h2>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" /> + Invite member
            </button>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-medium">
                  <th className="pb-3">Member</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="text-slate-700">
                    <td className="py-4 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${member.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-sm`}>
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-900">{member.name}</span>
                    </td>
                    <td className="py-4 font-medium">{member.role}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 ${
                        member.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {member.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      {member.status === 'Active' ? (
                        <>
                          {member.role !== 'Owner' && (
                            <>
                              <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                                Change role
                              </button>
                              <button className="border border-red-200 hover:bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                                Remove
                              </button>
                            </>
                          )}
                          {member.role === 'Owner' && <span className="text-slate-400">—</span>}
                        </>
                      ) : (
                        <>
                          <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                            Resend
                          </button>
                          <button className="border border-red-200 hover:bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions Information Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900">What each role can do</h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong className="text-slate-800">Owner</strong> — everything, including transferring ownership and switching off the organization.</li>
            <li><strong className="text-slate-800">Admin</strong> — edit the organization profile, manage the team, and all jobs & projects.</li>
            <li><strong className="text-slate-800">Recruiter</strong> — post and manage jobs & projects, shortlist, schedule auditions and send offers.</li>
            <li><strong className="text-slate-800">Per-post co-managers</strong> can still be added on any job or project (JP-15).</li>
          </ul>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Invite Member Modal / Inline Drawer */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-slate-900">Invite Team Member</h3>
                <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email address *</label>
                  <input 
                    type="email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@ripplefilms.in"
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl h-10 px-3 text-sm bg-white focus:outline-none focus:border-[#05878C]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowInviteModal(false)}
                    className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm disabled:opacity-50"
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