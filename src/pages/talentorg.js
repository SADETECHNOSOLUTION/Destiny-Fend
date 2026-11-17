import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetupOrg() {
  // Form input state initialized with placeholder values matching your design
  const [formData, setFormData] = useState({
    partnerType: 'ORGANIZATION',
    organizationName: 'Ripple Films',
    orgType: 'Production house',
    location: 'Chennai, Tamil Nadu',
    website: 'https://ripplefilms.in',
    about: 'Independent production house making Tamil features, ads and web series since 2016.',
    contactEmail: 'casting@ripplefilms.in',
    contactPhone: '+91 44 4000 1234',
    userRole: 'Owner',
    logoUrl: ''
  });

  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle standard text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle logo image upload and base64 preview conversion
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData({ ...formData, logoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const backhandling = ()=>{
    navigate(-1)
  }

  // Submit form data to your Spring Boot backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/partners/register-organization', formData);
      setStatusMessage(`Success! Organization registered. Partner ID: ${response.data.partnerId}`);
      console.log('Backend Response:', response.data);
    if (response.ok){
      navigate('/talent/dashboard')
    }
    } catch (error) {
      console.error('Error creating organization:', error);
      setStatusMessage('Failed to connect to backend server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased px-4 py-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Main Container */}
        <main className="space-y-5">

          {/* Breadcrumb / Subheader Section */}
          <div>
            <h1 className="text-xl font-bold text-slate-900">Set up your organization</h1>
            <p className="text-[11px] text-slate-500">Organization · a team can hire under this name</p>
          </div>

          {/* Card Section 1: Upload / Config Area */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <span className='font-semibold text-sm text-slate-900'>Organization</span>
            </div>

            {/* Logo Upload Box */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-emerald-800 rounded-xl flex items-center justify-center text-white overflow-hidden shadow-sm flex-shrink-0">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-5 h-5 text-emerald-200" />
                )}
              </div>
              <label className="border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-xl px-4 py-3 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition w-full">
                <span className="text-xs font-semibold text-[#05878C]">+ Add Logo</span>
                <span className="text-[10px] text-gray-400">Min 400x400px</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>

            {/* Input Stack for Mobile */}
            <div className='space-y-4 pt-2'>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Organization name *</span>
                <input 
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#5CBE8F]' 
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Type *</span>
                <select 
                  name="orgType"
                  value={formData.orgType}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs bg-white focus:outline-none focus:border-[#5CBE8F]'
                >
                  <option value="Production house">Production house</option>
                  <option value="Agency">Agency</option>
                  <option value="Studio">Studio</option>
                  <option value="Brand">Brand</option>
                  <option value="Event company">Event company</option>
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Location *</span>
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#5CBE8F]' 
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Website *</span>
                <input 
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#5CBE8F]' 
                />
              </div>
            </div>

            {/* About Textarea */}
            <div className='flex flex-col gap-1 pt-1'>
              <span className='font-semibold text-xs text-slate-700'>About</span>
              <textarea 
                name="about"
                rows="3"
                value={formData.about}
                onChange={handleChange}
                className='border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#5CBE8F] resize-none' 
              />
            </div>
          </div>

          {/* Card Section 2: Contact Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <span className='font-semibold text-sm text-slate-900'>Organization contact (verified)</span>
            </div>
            
            <div className='space-y-4'>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Contact email *</span>
                <input 
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#5CBE8F]' 
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xs text-slate-700'>Contact phone *</span>
                <input 
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className='border border-slate-300 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#5CBE8F]' 
                  required
                />
              </div>
            </div>
          </div>

          {/* Footer Action Card: Role Notice */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start space-x-3">
            <div className="bg-[#E8F7EF] p-2 rounded-xl text-[#287B57] flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-xs">Your role</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">You'll be the Owner. You can invite Admins and Recruiters after setup.</p>
            </div>
          </div>

          {/* Status Message Display */}
          {statusMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
              {statusMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className='grid grid-cols-2 gap-2 pt-1'>
            <button onClick={backhandling}
              type="button"
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center"
            >
              Back
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              <span>{loading ? 'Processing...' : 'Create & Activate'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </main>
      </form>
    </div>
  );
}