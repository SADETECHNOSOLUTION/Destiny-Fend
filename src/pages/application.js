import React, { useState, useMemo } from 'react';

// --- Icon Components ---
const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3 text-slate-700 inline-block -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// --- Mock Data ---
const INITIAL_TALENTS = [
  {
    id: 't-1',
    initials: 'SV',
    name: 'Sreeman V K',
    role: 'DoP',
    location: 'Chennai',
    experienceYears: 8,
    rating: 4.7,
    creditsCount: 9,
    availability: 'Available now',
    status: 'Available now',
    isInvited: true,
    addedToList: false,
    craft: 'Cinematography',
    languages: ['Tamil'],
    age: 32
  },
  {
    id: 't-2',
    initials: 'VJ',
    name: 'Vijay M',
    role: 'DoP',
    location: 'Chennai',
    experienceYears: 11,
    rating: 4.5,
    creditsCount: 14,
    availability: 'Available from 15 Dec',
    status: 'Available from 15 Dec',
    isInvited: false,
    addedToList: false,
    craft: 'Cinematography',
    languages: ['Tamil', 'English'],
    age: 38
  },
  {
    id: 't-3',
    initials: 'NA',
    name: 'Nila A',
    role: 'Camera operator',
    location: 'Chennai',
    experienceYears: 4,
    rating: 4.2,
    creditsCount: 5,
    availability: 'Not looking',
    status: 'Not looking',
    isInvited: false,
    addedToList: false,
    craft: 'Cinematography',
    languages: ['Tamil'],
    age: 27
  }
];

const INITIAL_FILTERS = [
  { id: 'f-1', label: 'Craft: Cinematography', active: true, key: 'craft', value: 'Cinematography' },
  { id: 'f-2', label: 'Role: DoP', active: true, key: 'role', value: 'DoP' },
  { id: 'f-3', label: 'Chennai', active: true, key: 'location', value: 'Chennai' },
  { id: 'f-4', label: 'Available now', active: true, key: 'availability', value: 'Available now' },
  { id: 'f-5', label: '5+ yrs (from Works)', active: false, key: 'minExp', value: 5 },
  { id: 'f-6', label: 'Tamil', active: false, key: 'language', value: 'Tamil' },
  { id: 'f-7', label: 'Age 25–45', active: false, key: 'ageRange', value: [25, 45] },
  { id: 'f-8', label: '★ 4+', active: false, key: 'minRating', value: 4.0 },
  { id: 'f-9', label: 'Confirmed credits', active: false, key: 'hasCredits', value: true }
];

const INITIAL_TEAM_LISTS = [
  {
    id: 'tl-1',
    projectTitle: 'Kaval – camera shortlist',
    peopleCount: 12,
    managedBy: 'Ravi M'
  },
  {
    id: 'tl-2',
    projectTitle: 'Child actors 8–12',
    peopleCount: 7,
    subtitle: 'guardians contacted'
  }
];

const INITIAL_APPLICANTS = [
  {
    id: 'app-1',
    initials: 'SV',
    name: 'Sreeman V K',
    rating: 4.7,
    subtitle: 'DoP · Kaval · applied 1 Nov',
    stage: 'Applied',
    quote: '"Shot 3 features on ALEXA Mini; night exteriors are my favourite..."',
    arriFeature: 'Yes',
    availableDates: 'Yes',
    nightWorkLink: 'vimeo.com/sreeman/kaval-night',
    internalScore: 5,
    privateNote: 'Strong night work. Check dates with Ravi.',
    historyNote: 'Ravi M · 2 h ago: "Top pick for me."'
  },
  {
    id: 'app-2',
    initials: 'VJ',
    name: 'Vijay M',
    rating: 4.5,
    subtitle: 'screening 3/3',
    stage: 'Applied',
    quote: '"Experienced with multi-camera setup and anamorphic lenses."',
    arriFeature: 'Yes',
    availableDates: 'Yes',
    nightWorkLink: 'vimeo.com/vijay/showreel',
    internalScore: 4,
    privateNote: 'Great technical background.',
    historyNote: 'Team · 1 d ago: "Solid portfolio."'
  },
  {
    id: 'app-3',
    initials: 'RE',
    name: 'Rekha S',
    subtitle: 'Invited',
    stage: 'Applied',
    quote: '"Specialized in natural lighting and handheld tracking."',
    arriFeature: 'No',
    availableDates: 'Yes',
    nightWorkLink: 'vimeo.com/rekha/reel',
    internalScore: 4,
    privateNote: 'Very creative visual style.',
    historyNote: 'Ravi M · 3 d ago: "Invited directly."'
  }
];

export default function Applications() {
  // Navigation & View Mode
  const [navigationHistory, setNavigationHistory] = useState(['home_dashboard', 'find_talent', 'applicants_screen', 'candidate_profile']);
  const [activeTab, setActiveTab] = useState('Connect');
  const [viewMode, setViewMode] = useState('mobile');

  // Search & Filter State
  const [modeToggle, setModeToggle] = useState('search'); // 'search' | 'suggested'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Talent, Team Lists & Applicants State
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [teamLists, setTeamLists] = useState(INITIAL_TEAM_LISTS);
  const [applicants, setApplicants] = useState(INITIAL_APPLICANTS);
  const [selectedCandidate, setSelectedCandidate] = useState(INITIAL_APPLICANTS[0]);
  const [applicantViewMode, setApplicantViewMode] = useState('Board'); // 'Board' | 'List'
  const [activeStage, setActiveStage] = useState('Applied'); // 'Applied' | 'Shortlisted' | 'Audition' | 'Offer' | 'Hired'

  // Candidate Specific Interactive State (Input Handling)
  const [privateNoteInput, setPrivateNoteInput] = useState(INITIAL_APPLICANTS[0].privateNote);
  const [internalScoreInput, setInternalScoreInput] = useState(INITIAL_APPLICANTS[0].internalScore);

  // Invite Modal State
  const [inviteModalTalent, setInviteModalTalent] = useState(null);
  const [inviteNote, setInviteNote] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  // Toast Feedback State
  const [toast, setToast] = useState(null);

  // --- API Simulation Functions (async/await) ---
  const mockApiCall = (endpoint, payload) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.02) {
          resolve({ status: 200, success: true, payload });
        } else {
          reject(new Error('Network error. Please try again.'));
        }
      }, 750);
    });
  };

  // --- Back Navigation ---
  const handleBack = () => {
    if (navigationHistory.length > 1) {
      setNavigationHistory((prev) => prev.slice(0, prev.length - 1));
    } else {
      showToast('You are on the home screen.', 'info');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // --- Candidate Detail Actions ---
  const handleUpdateCandidateStatus = async (newAction) => {
    try {
      await mockApiCall(`/api/v1/applicants/${selectedCandidate.id}/action`, { action: newAction, privateNote: privateNoteInput, score: internalScoreInput });
      showToast(`Candidate status updated: ${newAction}`);
    } catch (err) {
      showToast('Failed to update candidate status', 'error');
    }
  };

  // --- Applicants Actions ---
  const handleInviteToAudition = async () => {
    try {
      await mockApiCall('/api/v1/projects/kaval/invite-audition', { stage: activeStage });
      showToast('Sent audition invitation!');
    } catch (err) {
      showToast('Failed to send audition invites', 'error');
    }
  };

  const handleMakeOffer = async () => {
    try {
      await mockApiCall('/api/v1/projects/kaval/make-offer', { stage: activeStage });
      showToast('Offer dispatch initiated successfully!');
    } catch (err) {
      showToast('Failed to process offers', 'error');
    }
  };

  const handleClosePost = async () => {
    try {
      await mockApiCall('/api/v1/projects/kaval/close-post', {});
      showToast('Project post closed successfully.');
    } catch (err) {
      showToast('Failed to close post', 'error');
    }
  };

  // --- Filter Toggle Handler ---
  const toggleFilter = (id) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  // --- Filtered Talent Calculation ---
  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = talent.name.toLowerCase().includes(query);
        const matchesRole = talent.role.toLowerCase().includes(query);
        const matchesLocation = talent.location.toLowerCase().includes(query);
        if (!matchesName && !matchesRole && !matchesLocation) return false;
      }

      const activeFilters = filters.filter((f) => f.active);
      for (const filter of activeFilters) {
        if (filter.key === 'craft' && talent.craft !== filter.value) return false;
        if (filter.key === 'role' && talent.role !== filter.value) return false;
        if (filter.key === 'location' && talent.location !== filter.value) return false;
        if (filter.key === 'availability' && talent.availability !== filter.value) return false;
        if (filter.key === 'minExp' && talent.experienceYears < filter.value) return false;
        if (filter.key === 'minRating' && talent.rating < filter.value) return false;
        if (filter.key === 'hasCredits' && talent.creditsCount <= 0) return false;
      }

      return true;
    });
  }, [talents, filters, searchQuery]);

  // --- Handle Invite Button Click ---
  const openInviteModal = (talent) => {
    setInviteModalTalent(talent);
    setInviteNote(`Hi ${talent.name.split(' ')[0]}, we are casting for Kaval (Feature Film, DoP role) in Chennai. We'd love to review your work!`);
  };

  const handleSendInvite = async () => {
    if (!inviteModalTalent) return;
    setIsSendingInvite(true);

    try {
      await mockApiCall('/api/v1/talent/invite', {
        talentId: inviteModalTalent.id,
        note: inviteNote
      });

      setTalents((prev) =>
        prev.map((t) => (t.id === inviteModalTalent.id ? { ...t, isInvited: true } : t))
      );

      showToast(`Invitation sent to ${inviteModalTalent.name}!`);
      setInviteModalTalent(null);
    } catch (err) {
      showToast(err.message || 'Failed to send invite', 'error');
    } finally {
      setIsSendingInvite(false);
    }
  };

  // --- Handle Add to List (+ List) ---
  const handleAddToList = async (talent) => {
    try {
      await mockApiCall('/api/v1/talent/add-to-list', { talentId: talent.id });

      setTalents((prev) =>
        prev.map((t) => (t.id === talent.id ? { ...t, addedToList: !t.addedToList } : t))
      );

      setTeamLists((prev) =>
        prev.map((list) =>
          list.id === 'tl-1'
            ? { ...list, peopleCount: talent.addedToList ? list.peopleCount - 1 : list.peopleCount + 1 }
            : list
        )
      );

      showToast(
        talent.addedToList
          ? `Removed ${talent.name} from shortlist`
          : `Added ${talent.name} to Kaval shortlist`
      );
    } catch (err) {
      showToast('Could not update shortlist', 'error');
    }
  };

  const handleInviteAll = async (list) => {
    try {
      await mockApiCall('/api/v1/team-list/invite-all', { listId: list.id });
      showToast(`Invited all ${list.peopleCount} professionals in ${list.projectTitle}!`);
    } catch (err) {
      showToast('Failed to execute bulk invites', 'error');
    }
  };

  const currentScreen = navigationHistory[navigationHistory.length - 1];

  return (
    <div className="min-h-screen text-slate-100 font-sans flex flex-col items-center">
      

      {/* Main Container Phone / Window View */}
      <div
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile' ? 'max-w-[430px]' : 'max-w-3xl'
        }`}
      >
        <div className="bg-[#f7f9f8] text-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-300 flex flex-col min-h-[850px] relative">
          

          {/* Search Bar Collapsible Input */}
          {showSearchInput && (
            <div className="bg-[#0c5351] px-5 pb-3 animate-in slide-in-from-top-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, role, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/10 text-white placeholder-emerald-200/60 border border-emerald-500/40 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400"
                />
                <div className="absolute left-3 top-2.5 text-emerald-200/70">
                  <SearchIcon />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-xs text-emerald-200 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* SCREEN CONDITIONAL RENDER */}
          {currentScreen === 'candidate_profile' ? (
            /* --- SREEMAN V K PROFILE & APPLICATION SCREEN --- */
            <div className="flex-1 flex flex-col p-4 sm:p-5 space-y-4 overflow-y-auto">
              
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={handleBack}
                    className="p-1 -ml-1 text-slate-900 hover:bg-slate-200/60 rounded-full transition-all active:scale-90"
                    title="Navigate Back"
                  >
                    <ArrowLeftIcon />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {selectedCandidate.name}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 pl-7 font-normal">
                  {selectedCandidate.subtitle}
                </p>
              </div>

              {/* Application Details Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d0eee6] text-[#0c5351] font-bold text-xs flex items-center justify-center shrink-0">
                      {selectedCandidate.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {selectedCandidate.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        Cinematography · 8 yrs · <StarIcon /> {selectedCandidate.rating} · Chennai
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Opened full profile for ${selectedCandidate.name}`)}
                    className="text-xs font-bold text-[#0c5351] hover:underline"
                  >
                    Profile
                  </button>
                </div>

                <p className="text-xs italic text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedCandidate.quote}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">ARRI feature?</span>
                    <span className="font-bold text-slate-900">{selectedCandidate.arriFeature}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Available 10 Jan – 28 Feb?</span>
                    <span className="font-bold text-slate-900">{selectedCandidate.availableDates}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">Night work</span>
                    <a href={`https://${selectedCandidate.nightWorkLink}`} target="_blank" rel="noreferrer" className="font-bold text-[#0c5351] hover:underline">
                      {selectedCandidate.nightWorkLink}
                    </a>
                  </div>
                </div>

                {/* Showreel & Lookbook Media Cards */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#386b62] text-white p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden shadow-xs cursor-pointer hover:opacity-95 transition-all">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <span className="text-[10px] font-medium tracking-wide z-10">Showreel</span>
                    <span className="text-xs font-bold z-10">Play video</span>
                  </div>

                  <div className="bg-[#41796e] text-white p-4 rounded-xl flex flex-col justify-between h-28 relative overflow-hidden shadow-xs cursor-pointer hover:opacity-95 transition-all">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <span className="text-[10px] font-medium tracking-wide z-10">Lookbook</span>
                    <span className="text-xs font-bold z-10">View deck</span>
                  </div>
                </div>

              </div>

              {/* Team Only Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">
                    Team only
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Internal score</p>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setInternalScoreInput(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <svg className={`w-5 h-5 ${star <= internalScoreInput ? 'fill-amber-500' : 'fill-slate-200'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">({internalScoreInput})</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Private note
                  </label>
                  <textarea
                    rows={3}
                    value={privateNoteInput}
                    onChange={(e) => setPrivateNoteInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-[#0c5351] focus:ring-1 focus:ring-[#0c5351] resize-none bg-slate-50"
                  ></textarea>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  {selectedCandidate.historyNote}
                </p>

                <div className="bg-[#e2f4ed] text-[#0c5351] p-3 rounded-xl text-[11px] font-medium border border-[#4db6ac]/30">
                  Notes and scores are never visible to applicants.
                </div>

              </div>

              {/* Action Buttons Footer inside Screen */}
              <div className="pt-2 space-y-3 mt-auto">
                <button
                  onClick={() => handleUpdateCandidateStatus('Invite to audition')}
                  className="w-full py-3.5 bg-[#4db6ac] hover:bg-[#3d9c93] text-white font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Invite to audition
                </button>

                <button
                  onClick={() => handleUpdateCandidateStatus('Make offer')}
                  className="w-full py-3.5 bg-white border-2 border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351] font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Make offer
                </button>

                <button
                  onClick={() => handleUpdateCandidateStatus('Waiting list')}
                  className="w-full py-3.5 bg-white border-2 border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351] font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Waiting list
                </button>

                <button
                  onClick={() => handleUpdateCandidateStatus('Not selected')}
                  className="w-full py-3.5 bg-white border-2 border-rose-400 hover:bg-rose-50 text-rose-600 font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Not selected
                </button>
              </div>

            </div>
          ) : currentScreen === 'applicants_screen' ? (
            /* --- KAVAL · DOP APPLICANTS SCREEN --- */
            <div className="flex-1 flex flex-col p-4 sm:p-5 space-y-4 overflow-y-auto">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={handleBack}
                    className="p-1 -ml-1 text-slate-900 hover:bg-slate-200/60 rounded-full transition-all active:scale-90"
                    title="Navigate Back"
                  >
                    <ArrowLeftIcon />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Kaval · DoP applicants
                  </h2>
                </div>
                <p className="text-xs text-slate-500 pl-7 font-normal">
                  61 applicants · drag cards between stages
                </p>
              </div>

              {/* View Switcher (Board / List) */}
              <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200/80 w-fit">
                <button
                  onClick={() => setApplicantViewMode('Board')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    applicantViewMode === 'Board'
                      ? 'bg-[#0c5351] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => setApplicantViewMode('List')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    applicantViewMode === 'List'
                      ? 'bg-[#0c5351] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  List
                </button>
              </div>

              {/* Stage Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  { name: 'Applied', count: 3 },
                  { name: 'Shortlisted', count: 2 },
                  { name: 'Audition', count: 1 },
                  { name: 'Offer', count: 1 },
                  { name: 'Hired', count: 1 }
                ].map((stage) => (
                  <button
                    key={stage.name}
                    onClick={() => setActiveStage(stage.name)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                      activeStage === stage.name
                        ? 'bg-[#d0eee6] text-[#0c5351] border border-[#4db6ac]/50'
                        : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    {stage.name} {stage.count}
                  </button>
                ))}
              </div>

              {/* Applicants Cards List */}
              <div className="space-y-3 pt-1">
                {applicants.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedCandidate(app);
                      setPrivateNoteInput(app.privateNote);
                      setInternalScoreInput(app.internalScore);
                      setNavigationHistory((prev) => [...prev, 'candidate_profile']);
                    }}
                    className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d0eee6] text-[#0c5351] font-bold text-xs flex items-center justify-center shrink-0">
                        {app.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {app.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {app.rating && (
                            <>
                              <StarIcon /> {app.rating} ·{' '}
                            </>
                          )}
                          {app.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
                      {app.stage}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3 mt-auto">
                <button
                  onClick={handleInviteToAudition}
                  className="w-full py-3.5 bg-white border-2 border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351] font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Invite to audition
                </button>

                <button
                  onClick={handleMakeOffer}
                  className="w-full py-3.5 bg-white border-2 border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351] font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center"
                >
                  Make offer
                </button>

                <button
                  onClick={handleClosePost}
                  className="w-full py-3 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-all text-center"
                >
                  Close post
                </button>
              </div>

            </div>
          ) : (
            /* --- FIND TALENT SCREEN (DEFAULT) --- */
            <div className="flex-1 flex flex-col p-4 sm:p-5 space-y-4 overflow-y-auto">
              
              {/* Header Title & Subtitle */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={handleBack}
                    className="p-1 -ml-1 text-slate-900 hover:bg-slate-200/60 rounded-full transition-all active:scale-90"
                    title="Navigate Back"
                  >
                    <ArrowLeftIcon />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Find talent
                  </h2>
                </div>
                <p className="text-xs text-slate-500 pl-7 font-normal">
                  Search every professional profile · invite with a note
                </p>
              </div>

              {/* Search / Suggestions Mode Bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModeToggle('search')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    modeToggle === 'search'
                      ? 'bg-[#d0eee6] text-[#0c5351] border border-[#4db6ac]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Search
                </button>

                <button
                  onClick={() => {
                    setModeToggle('suggested');
                    setSearchQuery('DoP');
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    modeToggle === 'suggested'
                      ? 'bg-[#d0eee6] text-[#0c5351] border border-[#4db6ac]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Suggested for DoP · Kaval
                </button>
              </div>

              {/* Talent lists header & filters */}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2.5">
                  Talent lists ({talents.length})
                </p>

                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                        filter.active
                          ? 'bg-[#d0eee6] text-[#0c5351] border border-[#4db6ac] shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      {filter.active && <CheckIcon />}
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Talent List Cards */}
              <div className="space-y-3 pt-1">
                {filteredTalents.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                    No talent matches your current search or filter criteria.
                  </div>
                ) : (
                  filteredTalents.map((talent) => (
                    <div
                      key={talent.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-emerald-300 transition-all"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#d0eee6] text-[#0c5351] font-bold text-xs flex items-center justify-center shrink-0">
                          {talent.initials}
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm leading-snug truncate">
                            {talent.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {talent.role} · {talent.location} · {talent.experienceYears} yrs
                            {talent.rating && (
                              <span>
                                {' · '}
                                <StarIcon /> {talent.rating}
                              </span>
                            )}
                            {talent.creditsCount > 0 && (
                              <span> · {talent.creditsCount} confirmed credits</span>
                            )}
                            {' · '}
                            <span className="text-slate-600">
                              {talent.availability}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleAddToList(talent)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${
                            talent.addedToList
                              ? 'text-emerald-700 font-bold bg-emerald-50'
                              : 'text-[#0c5351] hover:text-[#063836]'
                          }`}
                        >
                          {talent.addedToList ? '✓ Listed' : '+ List'}
                        </button>

                        <button
                          onClick={() => openInviteModal(talent)}
                          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                            talent.isInvited
                              ? 'bg-[#4db6ac] text-white shadow-xs'
                              : 'bg-white border border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351]'
                          }`}
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Talent lists shared with team */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5 mt-4">
                <div
                  onClick={() => setNavigationHistory((prev) => [...prev, 'applicants_screen'])}
                  className="cursor-pointer group"
                >
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight group-hover:text-[#0c5351] transition-colors flex items-center justify-between">
                    <span>Talent lists (shared with your team)</span>
                    <span className="text-xs text-[#0c5351]">View applicants →</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {teamLists.map((list) => (
                    <div key={list.id} className="flex justify-between items-start pt-1">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{list.projectTitle}</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">
                          {list.peopleCount} people{' '}
                          {list.managedBy && <span className="font-normal text-slate-600">· {list.managedBy}</span>}
                          {list.subtitle && (
                            <span className="font-normal text-slate-600">({list.subtitle})</span>
                          )}
                        </p>
                      </div>

                      {list.managedBy && (
                        <button
                          onClick={() => handleInviteAll(list)}
                          className="text-xs font-bold text-[#0c5351] hover:text-[#063836] transition-colors"
                        >
                          Invite all
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Bottom Navigation Footer */}
          <footer className="bg-white border-t border-slate-200/80 px-6 py-2.5 flex justify-between items-center text-slate-500 text-[11px] font-medium mt-auto">
            <button
              onClick={() => setActiveTab('Home')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'Home' ? 'text-[#0c5351] font-bold' : 'hover:text-slate-800'
              }`}
            >
              <HomeIcon />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('Connect')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'Connect' ? 'text-[#0c5351] font-bold' : 'hover:text-slate-800'
              }`}
            >
              <UsersIcon />
              <span>Connect</span>
            </button>

            <button
              onClick={() => setActiveTab('Messages')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'Messages' ? 'text-[#0c5351] font-bold' : 'hover:text-slate-800'
              }`}
            >
              <ChatIcon />
              <span>Messages</span>
            </button>

            <button
              onClick={() => setActiveTab('Profile')}
              className={`flex flex-col items-center gap-0.5 ${
                activeTab === 'Profile' ? 'text-[#0c5351] font-bold' : 'hover:text-slate-800'
              }`}
            >
              <UserCircleIcon />
              <span>Profile</span>
            </button>
          </footer>

        </div>
      </div>

      {/* --- INVITATION MODAL --- */}
      {inviteModalTalent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4 animate-in fade-in zoom-in duration-150">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#d0eee6] text-[#0c5351] font-bold text-xs flex items-center justify-center">
                  {inviteModalTalent.initials}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Invite {inviteModalTalent.name}</h3>
                  <p className="text-[10px] text-slate-500">{inviteModalTalent.role} · {inviteModalTalent.location}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalTalent(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Personalized Note
              </label>
              <textarea
                rows={4}
                value={inviteNote}
                onChange={(e) => setInviteNote(e.target.value)}
                placeholder="Include project details, timelines, and contact info..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:border-[#0c5351] focus:ring-1 focus:ring-[#0c5351] resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setInviteModalTalent(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendInvite}
                disabled={isSendingInvite}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0c5351] hover:bg-[#073634] rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSendingInvite ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Invitation</span>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}