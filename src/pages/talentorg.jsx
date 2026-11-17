import React, { useState } from 'react';
import { 
  Building2, 
  HelpCircle, 
  Settings, 
  Bell, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  FileText,
  User,
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import axios from 'axios';

export default function DashboardOrg() {
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

  // Submit form data to your Spring Boot backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/partners/register-organization', formData);
      setStatusMessage(`Success! Organization registered. Partner ID: ${response.data.partnerId}`);
      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Error creating organization:', error);
      setStatusMessage('Failed to connect to backend server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <form onSubmit={handleSubmit}>
        {/* Main Container */}
        <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

          {/* Breadcrumb / Subheader Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-2xl gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Set up your organization</h1>
            </div>
          </div>

          {/* Card Section 1: Upload / Config Area */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <span className='font-semibold text-lg mb-6'>Organization</span>
            </div>

            {/* Logo Upload Box */}
            <div className="flex items-center gap-4 mt-3">
              <div className="w-20 h-20 bg-emerald-800 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-sm">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-6 h-6 text-emerald-200" />
                )}
              </div>
              <label className="border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-2xl px-6 py-4 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition">
                <span className="text-sm font-semibold text-[#05878C]">+ Add Logo</span>
                <span className="text-xs text-gray-400">Min 400x400px</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>

            {/* Input Grid 1 */}
            <div className='flex flex-row mt-6 gap-6 items-center justify-between'>
              <div className='flex flex-col w-1/2 gap-6'>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Organization name *</span>
                  <input 
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 focus:outline-none focus:border-[#5CBE8F]' 
                    required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Location *</span>
                  <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 focus:outline-none focus:border-[#5CBE8F]' 
                    required
                  />
                </div>
              </div>
             
              <div className='flex flex-col w-1/2 gap-6'>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Type *</span>
                  <select 
                    name="orgType"
                    value={formData.orgType}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 bg-white focus:outline-none focus:border-[#5CBE8F]'
                  >
                    <option value="Production house">Production house</option>
                    <option value="Agency">Agency</option>
                    <option value="Studio">Studio</option>
                    <option value="Brand">Brand</option>
                    <option value="Event company">Event company</option>
                  </select>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Website *</span>
                  <input 
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 focus:outline-none focus:border-[#5CBE8F]' 
                  />
                </div>
              </div>
            </div>

            {/* About Textarea */}
            <div>
               <div className='flex flex-col gap-1 mt-6'>
                <span className='font-semibold text-sm'>About</span>
                <textarea 
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className='border-2 border-gray-200 rounded-lg h-28 p-3 focus:outline-none focus:border-[#5CBE8F]' 
                />
              </div>
            </div>
          </div>

          {/* Card Section 2: Contact Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <span className='font-semibold text-lg mb-6'>Organization contact (verified)</span>
            </div>
            
            <div className='flex flex-row mt-3 gap-6 items-center justify-between'>
              <div className='flex flex-col w-1/2 gap-6'>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Contact email *</span>
                  <input 
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 focus:outline-none focus:border-[#5CBE8F]' 
                    required
                  />
                </div>
              </div>
             
              <div className='flex flex-col w-1/2 gap-6'>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-sm'>Contact phone *</span>
                  <input 
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className='border-2 border-gray-200 rounded-lg h-10 px-3 focus:outline-none focus:border-[#5CBE8F]' 
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Card: Role Notice */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#E8F7EF] p-2 rounded-xl text-[#287B57]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Your role</h5>
                <p className="text-xs text-slate-500">You'll be the Owner. You can invite Admins and Recruiters after setup.</p>
              </div>
            </div>
          </div>

          {/* Status Message Display */}
          {statusMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
              {statusMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-row justify-end'>
            <div className='flex flex-row gap-4'>
              <button 
                type="button"
                className="text-gray-500 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm border-2 border-gray-200 hover:bg-gray-50 transition flex items-center space-x-1"
              >
                <span>Back</span>
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition flex items-center space-x-2"
              >
                <span>{loading ? 'Processing...' : 'Create Organization & Activate'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>
      </form>
    </div>
  );
}