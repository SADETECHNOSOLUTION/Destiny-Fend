import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PostJob() {
  const partnerId = 'partner_ripple_01';

  // Form state for posting a job matching the Figma layout
  const [jobData, setJobData] = useState({
    title: 'Editing > Film Editor > Promo editor',
    projectType: 'Advertisement / Promo',
    location: 'Chennai - remote OK',
    employmentType: 'Contract · 10 days',
    description: 'Cut a 60 s and 30 s promo from 4 h of footage...',
    shortlistCount: 5,
    finalizeCount: 1,
    applicationDeadline: '12 Nov 2026',
    offerReplyTime: '48 hours',
    status: 'PUBLISHED'
  });

  // Screening questions state
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Have you cut a brand promo?', type: 'Yes / no' },
    { id: 2, text: 'Which software do you use?', type: 'Choice: Premiere · DaVinci · FCP' },
    { id: 3, text: 'Link to your best promo', type: 'Short text' }
  ]);

  const [newQuestion, setNewQuestion] = useState({ text: '', type: 'Short text' });
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.text) return;
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ text: '', type: 'Short text' });
    setShowAddQuestion(false);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Submit job posting to backend
  const handlePublishJob = async (actionStatus = 'PUBLISHED') => {
    setLoading(true);
    setStatusMessage('');

    const payload = {
      ...jobData,
      type: `Job · ${jobData.projectType}`,
      screeningQuestions: questions,
      status: actionStatus
    };

    try {
      // Calls Spring Boot endpoint: POST /api/v1/partners/{partnerId}/listings
      const response = await axios.post(`http://localhost:8080/api/v1/partners/${partnerId}/listings`, payload);

      setStatusMessage(`Success! Job listing posted with ID: ${response.data.listingId} (${actionStatus})`);
      console.log('Job Posted Response:', response.data);
    } catch (error) {
      console.error('Error posting job:', error);
      setStatusMessage('Failed to post job. Please check backend connection.');
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
          <h1 className="text-2xl font-bold text-slate-900">Post a job</h1>
          <p className="text-xs text-slate-500">One role · drafts are visible to your team only</p>
        </div>

        {/* Two Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Role & Job Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="font-bold text-base text-slate-900">Role</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Craft › role › sub-role *</label>
              <input 
                type="text" 
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Project type *</label>
              <input 
                type="text" 
                name="projectType"
                value={jobData.projectType}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Location *</label>
              <input 
                type="text" 
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Employment type *</label>
              <input 
                type="text" 
                name="employmentType"
                value={jobData.employmentType}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">Description</label>
              <textarea 
                name="description"
                rows="3"
                value={jobData.description}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[#05878C] resize-none"
              />
            </div>

            <div className="flex flex-col gap-1 pt-2">
              <span className="text-[11px] text-slate-400">To shortlist / finalize</span>
              <div className="text-sm font-semibold text-slate-800">
                {jobData.shortlistCount} / {jobData.finalizeCount}
              </div>
            </div>
          </div>

          {/* Column 2: Screening Questions & Logistics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-base text-slate-900">Screening questions (up to 5)</h2>
                <span className="text-xs text-slate-400">{questions.length}/5</span>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {questions.map((q, index) => (
                  <div key={q.id} className="flex items-start justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{index + 1}. {q.text}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{q.type}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Question Button / Form */}
              {questions.length < 5 && !showAddQuestion && (
                <button 
                  onClick={() => setShowAddQuestion(true)}
                  className="text-xs text-[#05878C] font-semibold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> + Add question ({questions.length}/5)
                </button>
              )}

              {showAddQuestion && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input 
                    type="text" 
                    placeholder="Enter screening question..."
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg h-8 px-2 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowAddQuestion(false)} className="text-xs text-slate-500 px-2 py-1">Cancel</button>
                    <button onClick={handleAddQuestion} className="bg-[#05878C] text-white px-3 py-1 rounded-lg text-xs font-semibold">Add</button>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-400">Answers rank applicants only — never auto-reject.</p>

              <hr className="border-slate-100" />

              {/* Application Deadline & Reply Time */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Applications close</label>
                  <input 
                    type="text" 
                    name="applicationDeadline"
                    value={jobData.applicationDeadline}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl h-10 px-3 text-sm focus:outline-none focus:border-[#05878C]"
                  />
                  <span className="text-[11px] text-slate-400">Extend any time; post shows "Applications closed" until you close it.</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Offer reply time</label>
                  <select 
                    name="offerReplyTime"
                    value={jobData.offerReplyTime}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl h-10 px-3 text-sm bg-white focus:outline-none focus:border-[#05878C]"
                  >
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="72 hours">72 hours</option>
                  </select>
                  <span className="text-[11px] text-slate-400">24 h – 7 days per role.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Free Plan Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
          3 of 10 open jobs used on the free plan.
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-sm font-medium text-emerald-800">
            {statusMessage}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handlePublishJob('PUBLISHED')}
              disabled={loading}
              className="bg-[#5CBE8F] hover:bg-[#4ba87c] text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
            <button 
              onClick={() => handlePublishJob('DRAFT')}
              disabled={loading}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm"
            >
              Save draft
            </button>
            <button 
              type="button" 
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition shadow-sm"
            >
              Duplicate an old post
            </button>
          </div>
          <a href="#" className="text-xs text-[#05878C] font-semibold hover:underline">Preview</a>
        </div>

      </main>
    </div>
  );
}