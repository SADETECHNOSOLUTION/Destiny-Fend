import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import logOff from '@iconify-icons/gg/log-off';
import { NavLink } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // Navigation tracker
  const [metrics, setMetrics] = useState({ totalApplicants: 0, experiencedCount: 0, fresherCount: 0 });
  // const [profiles, setProfiles] = useState([]);
    const MOCK_PROFILES = [
  { id: 1, fullName: 'Alice', email: 'alice@gmail.com', mobile: '1234567890', workStatus: 'Experienced', academicDetails: { highestQualification: 'B.Tech', courseDegree: 'CS', specialization: 'AI' }, professionalDetails: { skills: ['React', 'Java', 'SQL'] } },
  
];

  const [profiles,setProfiles] = useState(MOCK_PROFILES);
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null); // Detail modal anchor



  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/metrics');
      setMetrics({
        totalApplicants: response.data.totalApplicants,
        experiencedCount: response.data.experiencedCount,
        fresherCount: response.data.fresherCount
      });
      // setProfiles(response.data.profiles || []);
    } catch (err) {
      console.error("Error pulling dashboard analytical state:", err);
    }
  };

  const handleExcelDownload = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/download/excel', { responseType: 'blob' });
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const linkAnchor = document.createElement('a');
      linkAnchor.href = blobUrl;
      linkAnchor.setAttribute('download', 'applicants_master_report.xlsx');
      document.body.appendChild(linkAnchor);
      linkAnchor.click();
      linkAnchor.remove();
    } catch (err) {
      alert("Failed to compile and download standard Excel report data matrix.");
    }
  };

  const handleSkillSearch = async () => {
    if (!searchSkill.trim()) { fetchDashboardData(); return; }
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/profiles/search?skill=${searchSkill}`);
      setProfiles(MOCK_PROFILES);
    } catch (err) {
      console.error(err);
    }
  };

  // Mathematical Golden-Spiral Coordinates Multiplier Formula
const computeSpiralCoordinates = (index, total) => {
  // Use 100 for a 200x200 SVG (center of the canvas)
  const centerPoint = 100; 
  
  // Use a smaller multiplier for index to keep the spiral tight
  const angleRotation = index * 0.5; 
  
  // Keep the expansion small so it fits in 200px
  const radiusExpansion = 5 + (index * 8); 

  return {
    x: centerPoint + radiusExpansion * Math.cos(angleRotation),
    y: centerPoint + radiusExpansion * Math.sin(angleRotation)
  };
};

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9', fontFamily: 'sans-serif' }}>

      {/* LEFT COMPREHENSIVE SIDEBAR MENU */}
      <div style={{ width: '260px', background: '#817AEB', color: '#fff',position:'relative' }}>
            <div className='bg-[#817AEB] h-28 flex items-center'>
              <div className='h-full flex items-center gap-2 px-6 w-full rounded-br-xl rounded-bl-xl' style={{backgroundColor:'rgba(255, 255, 255, 0.2)'}}>
<Icon className='w-9 h-9' icon="mdi:account-circle" />    <span className='font-semibold'>Admin</span>          </div>
      </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px',padding:'24px' }}>
          <button  onClick={() => setActiveMenu('dashboard')} style={{ ...menuBtnStyle,color: activeMenu === 'dashboard' ? '#fff':'#fff' , background: activeMenu === 'dashboard' ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}><span style={{ color: '#fff', marginRight: '8px' }}></span> Analytics Summary</button>
          <button  onClick={() => setActiveMenu('spiral')} style={{ ...menuBtnStyle,color: activeMenu === 'spiral' ? '#fff':'#fff' , background: activeMenu === 'spiral' ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}> Spiral Data Matrix</button>
          <button onClick={handleExcelDownload} style={{ ...menuBtnStyle, color: '#fff' }}> Download Master Excel</button>
        </div>
        <div className='absolute bottom-10 px-6 w-full'>
        <NavLink to='/' className='bg-white flex items-center justify-center gap-1 text-[#817AEB] p-2.5 rounded-md w-full'>
         <Icon className='w-5 h-5' icon={logOff} />
        <span className='font-semibold'>Logout</span>
        </NavLink>
        </div>

      </div>

      {/* RIGHT WORKSPACE CONSOLE */}
      <div style={{ flex: 1, padding: '32px' }}>
        
        {/* GLOBAL TOP SEARCH UTILITIES HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
          {/* <div>
            <input className='outline-none' type="text" placeholder="Global Filter by Key Skill..." value={searchSkill} onChange={(e) => setSearchSkill(e.target.value)} style={{ padding: '8px 12px', width: '260px', border: '1px solid #ccc', borderRadius: '4px' }}/>
            <button onClick={handleSkillSearch} style={{ marginLeft: '8px', padding: '8px 16px', background: '#817AEB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
          </div> */}
          {/* <button onClick={handleExcelDownload} style={{ padding: '10px 20px', background: '#817AEB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Export Document Data (.xlsx)</button> */}
        </div>

        {activeMenu === 'dashboard' && (
          <div>
            {/* ANALYTICS HIGH LEVEL METRICS CARDS */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
              <div style={cardStyle}><h3>Total Candidates</h3><p style={{ ...cardNum, color:'#817AEB'}}>1</p></div>
              <div style={cardStyle}><h3>Experienced Profiles</h3><p style={{ ...cardNum, color: '#817AEB' }}>1</p></div>
              <div style={cardStyle}><h3>Fresher Profiles</h3><p style={{ ...cardNum, color: '#817AEB' }}>{metrics.fresherCount}</p></div>
            </div>

            {/* TRADITIONAL COMPREHENSIVE DATA TABLE VIEW */}
            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>All Applicant Records Matrix</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', color: '#666' }}>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th>Email</th>
                    <th>Work Status</th>
                    <th>Qualification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles?.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{p.fullName}</td>
                      <td>{p.email}</td>
                      <td>{p.workStatus}</td>
                      <td>{p.academicDetails?.highestQualification || 'N/A'}</td>
                      <td>
                        <NavLink to='/profileWizard' target="_blank" rel="noopener noreferrer"><button onClick={() => setSelectedProfile(p)} style={{ background: 'none', border: 'none', color: '#817AEB', cursor: 'pointer', fontWeight: 'bold' }}>View</button></NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SPIRAL INTERACTIVE VIEW MODE CONTAINER */}
        {activeMenu === 'spiral' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', display: 'flex', gap: '24px' }}>
            <div>
              <h3>Interactive Spiral Spatial View Map</h3>
              <p style={{ color: '#666', fontSize: '13px' }}>Click individual geometric profile nodes on the spiral path to unpack full micro-records.</p>
              
              <svg width="200" height="200" style={{ background: '#0f172a', borderRadius: '8px', marginTop: '16px' }}>
                {profiles?.map((profile, idx) => {
                  const { x, y } = computeSpiralCoordinates(idx, profiles.length);
                  return (
                    <g key={profile.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedProfile(profile)}>
                      <circle stroke="#ffffff"   // This sets the border color to white
  strokeWidth="2" cx={x} cy={y} r="14" fill={profile.workStatus === 'Experienced' ? '#817AEB' : '#f59e0b'} />
                      <text x={x} y={y + 4} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {profile.fullName ? profile.fullName.charAt(0) : 'C'}
                      </text>
                      <title>{profile.fullName} ({profile.workStatus})</title>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* DYNAMIC SELECTED MICRO-VIEW PANEL */}
            <div style={{ flex: 1, background: '#f8fafc', padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              {selectedProfile ? (
                <div>
                  <h3 style={{ margin: '0 0 12px 0', borderBottom: '2px solid #ddd' }}>Profile Sheet: {selectedProfile.fullName}</h3>
                  <p><strong>Contact:</strong> {selectedProfile.email} || {selectedProfile.mobile}</p>
                  <p><strong>Status:</strong> {selectedProfile.workStatus}</p>
                  <p><strong>Degree:</strong> {selectedProfile.academicDetails?.courseDegree} || ({selectedProfile.academicDetails?.specialization})</p>
                  <p><strong>Target Objective:</strong> {selectedProfile.careerPreferences?.resumeHeadline || 'N/A'}</p>
                  <p><strong>Skills Matrix:</strong> {selectedProfile.professionalDetails?.skills?.join(', ') || 'None Listed'}</p>
                  
                  <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                    {selectedProfile.documents?.resumeUrl && <a href={selectedProfile.documents.resumeUrl} target="_blank" rel="noreferrer" style={linkBtn}>Open Uploaded Resume ↗</a>}
                    {selectedProfile.documents?.photoUrl && <a href={selectedProfile.documents.photoUrl} target="_blank" rel="noreferrer" style={{ ...linkBtn, background: '#64748b' }}>View Photo ↗</a>}
                  </div>
                </div>
              ) : (
                <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '100px' }}>Select an applicant circle element inside the radial spiral canvas matrix to analyze detailed records.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const menuBtnStyle = { width: '100%', padding: '12px', textAlign: 'left', background: 'transparent', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: '0.2s' };
const cardStyle = { flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const cardNum = { fontSize: '28px', margin: '8px 0 0 0', fontWeight: 'bold' };
const linkBtn = { textDecoration: 'none', padding: '8px 14px', background: '#817AEB', color: '#fff', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' };