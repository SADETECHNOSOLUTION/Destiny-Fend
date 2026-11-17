import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

export default function CreateProject() {
  const partnerId = 'partner_d88b4777';

  // Form state corresponding to the project and roles screen
  const [projectData, setProjectData] = useState({
    title: 'Kaval',
    type: 'Project',
    genre:'Thriller',
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
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <main className="space-y-5">

        {/* Header Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-1 hover:underline">
            <span>←</span> Home
          </a>
          <h1 className="text-xl font-bold text-slate-900">Create project</h1>
          <p className="text-[11px] text-slate-500">Many roles under one project</p>
        </div>

        {/* Section 1: Project Details Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900">Project</h2>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Name *</label>
            <input 
              type="text" 
              name="title"
              value={projectData.title}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Project type · genre *</label>
            <input 
              type="text" 
              name="genre"
              value={projectData.genre}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
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
              className="border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#05878C] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Co-managers</label>
            <input 
              type="text" 
              name="coManagers"
              value={projectData.coManagers}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#05878C]"
            />
          </div>
        </div>

        {/* Section 2: Roles Table Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm text-slate-900">Roles</h2>
            <button 
              onClick={() => setShowAddRoleModal(true)}
              className="text-xs text-[#05878C] font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add role
            </button>
          </div>

          {/* Roles Cards / Table Stack for Mobile */}
          <div className="space-y-3">
            {roles.map((r) => (
              <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-900">{r.roleName}</p>
                  <div className="text-[10px] text-slate-500 flex gap-3">
                    <span>Shortlist: <strong>{r.shortlist}</strong></span>
                    <span>Finalize: <strong>{r.finalize}</strong></span>
                    <span>Deadline: <strong>{r.deadline}</strong></span>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveRole(r.id)} 
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Add Role Form Toggle */}
          {showAddRoleModal && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
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
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleSubmitProject('DRAFT')}
              disabled={loading}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center"
            >
              Save draft
            </button>
                    <button 
              onClick={() => handleSubmitProject('PUBLISHED')}
              disabled={loading}
              className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              <span>{loading ? 'Publishing...' : 'Publish project'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}