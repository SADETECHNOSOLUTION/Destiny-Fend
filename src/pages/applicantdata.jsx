import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Star, FileText, Check, Play } from 'lucide-react';

export default function ApplicantDetailReview() {
  const applicantId = 'app_sreeman_01';

  // Applicant and internal note state matching the design screen
  const [applicant, setApplicant] = useState({
    name: 'Sreeman V K',
    role: 'DoP · Kaval · applied 1 Nov',
    headline: 'Cinematography · 8 yrs · ★ 4.7 · Chennai',
    bio: '"Shot 3 features on ALEXA Mini; night exteriors are my favourite..."',
    question1: { question: 'ARRI feature?', answer: 'Yes' },
    question2: { question: 'Available 10 Jan – 28 Feb?', answer: 'Yes' },
    question3: { question: 'Night work', link: 'vimeo.com/sreeman/kaval-night' },
    internalScore: 5,
    privateNote: 'Strong night work. Check dates with Ravi.',
    stage: 'Shortlisted'
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch applicant details on mount
  useEffect(() => {
    fetchApplicantDetails();
  }, []);

  const fetchApplicantDetails = async () => {
    try {
      // Calls Spring Boot endpoint: GET /api/v1/applicants/{applicantId}
      const response = await axios.get(`http://localhost:8080/api/v1/applicants/${applicantId}`);
      if (response.data) {
        console.log('Fetched applicant details:', response.data);
      }
    } catch (error) {
      console.error('Error fetching applicant, using default state:', error);
    }
  };

  // Update internal notes
  const handleNoteChange = async (e) => {
    const updatedNote = e.target.value;
    setApplicant((prev) => ({ ...prev, privateNote: updatedNote }));

    try {
      // Calls Spring Boot endpoint: PUT /api/v1/applicants/{applicantId}/notes
      await axios.put(`http://localhost:8080/api/v1/applicants/${applicantId}/notes`, { note: updatedNote });
    } catch (error) {
      console.error('Error saving private note:', error);
    }
  };

  // Update applicant workflow stage (e.g., Invite to audition, Make offer)
  const handleUpdateStage = async (newStage) => {
    setLoading(true);
    setStatusMessage('');

    try {
      // Calls Spring Boot endpoint: PUT /api/v1/applicants/{applicantId}/stage
      const response = await axios.put(`http://localhost:8080/api/v1/applicants/${applicantId}/stage`, { stage: newStage });
      setStatusMessage(`Applicant status updated to: ${newStage}`);
      setApplicant((prev) => ({ ...prev, stage: newStage }));
      console.log('Stage update response:', response.data);
    } catch (error) {
      console.error('Error updating stage:', error);
      setStatusMessage('Failed to update applicant stage.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans antialiased">
      <main className="max-w-[1276px] mx-auto px-16 py-8 space-y-6">

        {/* Top Header & Breadcrumb */}
        <div>
          <a href="#" className="text-xs text-[#05878C] font-semibold flex items-center mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home
          </a>
          <h1 className="text-2xl font-bold text-slate-900">{applicant.name}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{applicant.role}</p>
        </div>

        {/* Two-Column Grid: Application vs Team Only Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Application Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  SV
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{applicant.name}</h3>
                  <p className="text-xs text-slate-500">{applicant.headline}</p>
                </div>
              </div>
              <button className="text-xs text-[#05878C] font-semibold hover:underline">Profile</button>
            </div>

            <p className="text-xs text-slate-700 italic">{applicant.bio}</p>

            <div className="space-y-4 text-xs">
              <div>
                <p className="text-slate-400 font-medium">{applicant.question1.question}</p>
                <p className="font-semibold text-slate-800 mt-0.5">{applicant.question1.answer}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">{applicant.question2.question}</p>
                <p className="font-semibold text-slate-800 mt-0.5">{applicant.question2.answer}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Night work</p>
                <a href={`https://${applicant.question3.link}`} target="_blank" rel="noreferrer" className="text-[#05878C] font-semibold hover:underline mt-0.5 block">
                  {applicant.question3.link}
                </a>
              </div>
            </div>

            {/* Showreel & Lookbook Media Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="h-28 bg-[#436859] rounded-xl p-3 flex flex-col justify-between text-white shadow-inner">
                <Play className="w-5 h-5 opacity-90 fill-white" />
                <span className="text-xs font-bold">Showreel</span>
              </div>
              <div className="h-28 bg-[#325244] rounded-xl p-3 flex flex-col justify-between text-white shadow-inner">
                <FileText className="w-5 h-5 opacity-90" />
                <span className="text-xs font-bold">Lookbook</span>
              </div>
            </div>
          </div>

          {/* Right: Team Only Notes Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Team only</h3>
              <p className="text-xs text-slate-500 mt-0.5">Internal score</p>
            </div>

            {/* Star Rating Display */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(applicant.internalScore)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-500 ml-2">(5)</span>
            </div>

            {/* Private Note Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Private note</label>
              <textarea 
                rows="3"
                value={applicant.privateNote}
                onChange={handleNoteChange}
                className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#05878C] resize-none"
              />
              <p className="text-[10px] text-slate-400">Ravi M · 2 h ago: "Top pick for me."</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-500">
              Notes and scores are never visible to applicants.
            </div>
          </div>

        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Pipeline Action Buttons Bar */}
        <div className="flex items-center gap-3 pt-2">
          <button 
            onClick={() => handleUpdateStage('Audition')}
            disabled={loading}
            className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition disabled:opacity-50"
          >
            Invite to audition
          </button>
          <button 
            onClick={() => handleUpdateStage('Offer')}
            disabled={loading}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition"
          >
            Make offer
          </button>
          <button 
            onClick={() => handleUpdateStage('Waiting List')}
            disabled={loading}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition"
          >
            Waiting list
          </button>
          <button 
            onClick={() => handleUpdateStage('Rejected')}
            disabled={loading}
            className="border border-rose-300 hover:bg-rose-50 text-rose-600 px-5 py-2.5 rounded-xl text-xs font-semibold transition"
          >
            Not selected
          </button>
        </div>

      </main>
    </div>
  );
}
