import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, ArrowRight, Plus, Trash2 } from 'lucide-react';

export default function CreateProject() {
  // Partner ID (can be fetched from auth context or props)
  const partnerId = 'partner_ripple_01';

  // Form state corresponding to the project and roles screen
  const [projectData, setProjectData] = useState({
    title: 'Kaval',
    type: 'Feature film · Crime thriller',
    brief: 'Tamil crime thriller, 45 days, Chennai & Kodaikanal',
    coManagers: 'Ravi M (Admin), Divya K (Recruiter)',
    status: 'PUBLISHED'
  });

  // Roles state table
  const [roles, setRoles] = useState([
    { id: 1, roleName: 'Lead actor (male, 30–40)', shortlist: 5, finalize: 1, deadline: '6 Nov' },
    { id: 2, roleName: 'Director of Photography', shortlist: 5, finalize: 1, deadline: '6 Nov' },
    { id: 3, roleName: 'Focus Puller', shortlist: 8, finalize: 2, deadline: '10 Nov' },
    { id: 4, roleName: 'Gaffer', shortlist: 6, finalize: 1, deadline: 'Closed' }
  ]);

  const [newRole, setNewRole] = useState({ roleName: '', shortlist: 1, finalize: 1, deadline: '' });
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle standard input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new role to the list
  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.roleName) return;
    setRoles([...roles, { ...newRole, id: Date.now() }]);
    setNewRole({ roleName: '', shortlist: 1, finalize: 1, deadline: '' });
    setShowAddRoleModal(false);
  };

  // Remove role
  const handleRemoveRole = (id) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  // Submit project and roles to backend
  const handleSubmitProject = async (actionType = 'PUBLISHED') => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      ...projectData,
      status: actionType,
      roles: roles
    };

    try {
      // Connects to your Spring Boot endpoint: /api/v1/partners/{partnerId}/listings
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/listings`, payload);
      setStatusMessage(`Success! Project saved with ID: ${response.data.listingId} (${actionType})`);
      console.log('Project Created:', response.data);
    } catch (error) {
      console.error('Error publishing project:', error);
      setStatusMessage('Failed to connect to backend server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-6 py-8 space-y-6">

        {/* Header Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            <span>←</span> Home
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Create project</h1>
          <p className="text-xs text-slate-500">Many roles under one project</p>
        </div>

        {/* Two Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Project Details Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-base text-slate-900">Project</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Name *</label>
              <input 
                type="text" 
                name="title"
                value={projectData.title}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Project type · genre *</label>
              <input 
                type="text" 
                name="type"
                value={projectData.type}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Brief</label>
              <textarea 
                name="brief"
                rows="3"
                value={projectData.brief}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[#05878C] resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Co-managers</label>
              <input 
                type="text" 
                name="coManagers"
                value={projectData.coManagers}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
              />
            </div>
          </div>

          {/* Column 2: Roles Table Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-base text-slate-900">Roles</h2>
                <button 
                  onClick={() => setShowAddRoleModal(true)}
                  className="text-xs text-[#05878C] font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add role
                </button>
              </div>

              {/* Roles Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-medium">
                      <th className="pb-3">Role</th>
                      <th className="pb-3 text-center">Shortlist</th>
                      <th className="pb-3 text-center">Finalize</th>
                      <th className="pb-3">Deadline</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {roles.map((r) => (
                      <tr key={r.id} className="text-slate-700">
                        <td className="py-3 font-medium">{r.roleName}</td>
                        <td className="py-3 text-center">{r.shortlist}</td>
                        <td className="py-3 text-center">{r.finalize}</td>
                        <td className="py-3 text-slate-500">{r.deadline}</td>
                        <td className="py-3 text-right">
                          <button 
                            onClick={() => handleRemoveRole(r.id)} 
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Add Role Modal / Form Toggle */}
            {showAddRoleModal && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-slate-800">Add New Role</h3>
                <input 
                  type="text" 
                  placeholder="Role Name (e.g., Cinematographer)"
                  value={newRole.roleName}
                  onChange={(e) => setNewRole({...newRole, roleName: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg h-8 px-2 text-xs"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Deadline (e.g. 12 Nov)"
                    value={newRole.deadline}
                    onChange={(e) => setNewRole({...newRole, deadline: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg h-8 px-2 text-xs"
                  />
                  <button 
                    onClick={handleAddRole}
                    className="bg-[#05878C] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                  >
                    Save Role
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Action Buttons */}
        <div className="flex items-center space-x-4 pt-2">
          <button 
            onClick={() => handleSubmitProject('PUBLISHED')}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm flex items-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Publishing...' : 'Publish project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleSubmitProject('DRAFT')}
            disabled={loading}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm"
          >
            Save draft
          </button>
        </div>

      </main>
    </div>
  );
}