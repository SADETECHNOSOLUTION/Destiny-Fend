import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Trash2, ArrowRight } from 'lucide-react';

export default function RequestVerificationMobile() {
  const partnerId = 'partner_ripple_01';

  // State for uploaded verification documents matching the screen
  const [documents, setDocuments] = useState([
    { id: 'doc_1', name: 'GST certificate.pdf', size: '1.2 MB', type: 'application/pdf' },
    { id: 'doc_2', name: 'Address proof.jpg', size: '640 KB', type: 'image/jpeg' }
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle adding a new document
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10 MB limit.');
        return;
      }
      const newDoc = {
        id: 'doc_' + Date.now(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type
      };
      setDocuments([...documents, newDoc]);
    }
  };

  // Remove document from list
  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  // Submit verification request to backend
  const handleSubmitForReview = async () => {
    setLoading(true);
    setStatusMessage('');

    try {
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/verification-requests
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/verification-requests`, {
        documents: documents
      });

      setStatusMessage(`Success! Verification status updated to: ${response.data.verificationStatus}`);
      console.log('Verification Response:', response.data);
    } catch (error) {
      console.error('Error submitting verification request:', error);
      setStatusMessage('Failed to submit verification request. Please check backend connection.');
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
          <h1 className="text-xl font-bold text-slate-900">Request verification</h1>
          <p className="text-[11px] text-slate-500">Ripple Films · earn the ✓ Verified Partner badge</p>
        </div>

        {/* Upload Documents Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Upload documents</h2>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Organizations: company registration certificate or GST certificate, plus a document showing the contact address. Individuals: a government photo ID. Documents are seen only by the Destiny review team.
            </p>
          </div>

          {/* Uploaded Documents List */}
          <div className="space-y-2.5">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2.5 truncate mr-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-800 truncate">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">Uploaded · {doc.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Upload Box Dropzone */}
          <label className="border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition">
            <span className="text-xs font-semibold text-[#05878C]">+ Add document</span>
            <span className="text-[10px] text-slate-400 mt-0.5">PDF, JPG or PNG · up to 10 MB</span>
            <input type="file" accept=".pdf,image/*" onChange={handleDocumentUpload} className="hidden" />
          </label>
        </div>

        {/* What the Badge Means Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <h3 className="font-bold text-xs text-slate-900">What the badge means</h3>
          <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4 leading-relaxed">
            <li>Destiny checked that this organization or person is real and the contact details are theirs.</li>
            <li>It is not an endorsement of any job or project.</li>
            <li>Admins can remove the badge or suspend a partner after reports or misuse.</li>
          </ul>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button 
            type="button" 
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-3 rounded-xl transition shadow-sm text-center"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmitForReview}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs py-3 rounded-xl transition shadow-sm flex items-center justify-center space-x-1 disabled:opacity-50 text-center"
          >
            <span>{loading ? 'Submitting...' : 'Submit for review'}</span>
          </button>
        </div>

      </main>
    </div>
  );
}