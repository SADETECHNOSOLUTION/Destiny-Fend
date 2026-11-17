import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Trash2, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RequestVerification() {
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
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/verification-requests[cite: 15]
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/verification-requests`, {
        documents: documents
      });

      setStatusMessage(`Success! Verification status updated to: ${response.data.verificationStatus || 'UNDER_REVIEW'}`);
      console.log('Verification Response:', response.data);
    } catch (error) {
      console.error('Error submitting verification request:', error);
      setStatusMessage('Failed to submit verification request. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

        {/* Top Header & Breadcrumb[cite: 15] */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home[cite: 15]
          </a>
          <h1 className="text-2xl font-bold text-slate-900">Request verification[cite: 15]</h1>
          <p className="text-xs text-slate-500 mt-0.5">Ripple Films · earn the ✓ Verified Partner badge[cite: 15]</p>
        </div>

        {/* Upload Documents Card[cite: 15] */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-bold text-base text-slate-900 mb-1">Upload documents[cite: 15]</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Organizations: company registration certificate or GST certificate, plus a document showing the contact address. Individuals: a government photo ID. Documents are seen only by the Destiny review team.[cite: 15]
            </p>
          </div>

          {/* Uploaded Documents List[cite: 15] */}
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{doc.name}</p>
                    <p className="text-[11px] text-slate-400">Uploaded · {doc.size}[cite: 15]</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold transition"
                >
                  Remove[cite: 15]
                </button>
              </div>
            ))}
          </div>

          {/* Upload Box Dropzone[cite: 15] */}
          <label className="border-2 border-dashed border-[#5CBE8F] bg-[#F7FAFA] rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0f7f4] transition">
            <span className="text-xs font-semibold text-[#05878C]">+ Add document (PDF, JPG or PNG · up to 10 MB)[cite: 15]</span>
            <input type="file" accept=".pdf,image/*" onChange={handleDocumentUpload} className="hidden" />
          </label>
        </div>

        {/* What the Badge Means Card[cite: 15] */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900">What the badge means[cite: 15]</h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>Destiny checked that this organization or person is real and the contact details are theirs.[cite: 15]</li>
            <li>It is not an endorsement of any job or project.[cite: 15]</li>
            <li>Admins can remove the badge or suspend a partner after reports or misuse.[cite: 15]</li>
          </ul>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Actions[cite: 15] */}
        <div className="flex items-center space-x-4 pt-2">
          <button 
            onClick={handleSubmitForReview}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit for review[cite: 15]'}
          </button>
          <button 
            type="button" 
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm"
          >
            Cancel
          </button>
        </div>

      </main>
    </div>
  );
}