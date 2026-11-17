import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Verification() {
  const partnerId = 'partner_ripple_01';

  // State for verification details & uploaded reply documents
  const [replyMessage, setReplyMessage] = useState('Please upload a GST certificate or company registration.');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle document upload for verification reply
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: 'doc_' + Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setUploadedFiles([...uploadedFiles, newDoc]);
    }
  };

  // Submit verification reply / resubmission to backend
  const handleSubmitReply = async () => {
    setLoading(true);
    setStatusMessage('');

    try {
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/verification-requests[cite: 11]
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/verification-requests`, {
        documents: uploadedFiles,
        replyMessage: replyMessage
      });

      setStatusMessage(`Success! Verification reply submitted. Status: ${response.data.verificationStatus || 'Under Review'}`);
      console.log('Verification Reply Response:', response.data);
    } catch (error) {
      console.error('Error submitting verification reply:', error);
      setStatusMessage('Failed to submit reply. Please check backend connection.');
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
          <h1 className="text-xl font-bold text-slate-900">Verification</h1>
          <p className="text-[11px] text-slate-500">Reviewed within 3 working days · re-verify every 2 years</p>
        </div>

        {/* Card 1: More Info Requested (Action Needed) */}
        <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-xs text-slate-900">Upload GST certificate</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Upload your GST certificate or company registration
              </p>
            </div>
            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
              Action needed
            </span>
          </div>

          {/* Uploaded files preview if any */}
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
              <span className="font-medium text-slate-800 truncate">{file.name} ({file.size})</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Attached</span>
            </div>
          ))}

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-xl p-4 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition">
            <Upload className="w-4 h-4 text-[#05878C] mb-1" />
            <span className="text-xs font-semibold text-[#05878C]">+ Upload document</span>
            <input type="file" accept=".pdf,image/*" onChange={handleDocumentUpload} className="hidden" />
          </label>

          <button 
            onClick={handleSubmitReply}
            disabled={loading}
            className="w-full bg-[#5CBE8F] hover:bg-[#4ba87c] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm text-center disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Card 2: Rejected Status */}
        {/* <div className="bg-white border border-rose-200 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-xs text-slate-900">Rejected</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Reason: documents did not match the organization name. You can fix this and resubmit.
              </p>
            </div>
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
              Rejected
            </span>
          </div>
          <button 
            onClick={handleSubmitReply}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
          >
            Resubmit
          </button>
        </div> */}

        {/* Card 3: Verified Status */}
        {/* <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-xs text-slate-900">Verified</h3>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              ✓ Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Valid until 31 Oct 2028 — we'll remind you 30 days before to re-verify.
          </p>
        </div> */}

        {/* Suspended Warning Banner */}
        {/* <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-[11px] text-rose-900 leading-relaxed space-y-1">
          <p className="font-bold">Suspended partners:</p>
          <p>posts hidden, no posting or messaging applicants, applicants told the post is paused. Appeal within 14 days.</p>
        </div> */}

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

      </main>
    </div>
  );
}