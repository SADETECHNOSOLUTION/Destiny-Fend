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

export default function Findtalent() {
  // Navigation & View Mode
  const [navigationHistory, setNavigationHistory] = useState(['home_dashboard', 'find_talent']);
  const [activeTab, setActiveTab] = useState('Connect');
  const [viewMode, setViewMode] = useState('mobile');

  // Search & Filter State
  const [modeToggle, setModeToggle] = useState('search'); // 'search' | 'suggested'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Talent & Team List State
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [teamLists, setTeamLists] = useState(INITIAL_TEAM_LISTS);

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

  // --- Filter Toggle Handler ---
  const toggleFilter = (id) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  // --- Filtered Talent Calculation ---
  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      // Free text search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = talent.name.toLowerCase().includes(query);
        const matchesRole = talent.role.toLowerCase().includes(query);
        const matchesLocation = talent.location.toLowerCase().includes(query);
        if (!matchesName && !matchesRole && !matchesLocation) return false;
      }

      // Filter chips logic
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

      // Update local state to show invited status
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

      // Increment team shortlist count
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

  // --- Handle Invite All for Team List ---
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center sm:p-6">
        <div className="bg-[#f7f9f8] text-slate-800 shadow-2xl overflow-hidden border border-slate-300 flex flex-col min-h-[850px] relative">
          
          {/* Toast Notification */}
          {toast && (
            <div
              className={`absolute top-14 left-4 right-4 z-50 p-3 rounded-xl shadow-xl text-xs font-semibold flex items-center justify-between transition-all animate-in fade-in slide-in-from-top-2 ${
                toast.type === 'error'
                  ? 'bg-rose-600 text-white'
                  : toast.type === 'info'
                  ? 'bg-slate-800 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} className="text-white/80 hover:text-white ml-2">
                ✕
              </button>
            </div>
          )}


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

          {/* Screen Header & Navigation */}
          <div className="px-5 pt-4 pb-2">
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

            {/* Sub-tabs: Search / Suggested */}
            <div className="flex items-center gap-2 mt-4 pl-1">
              <button
                onClick={() => setModeToggle('search')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  modeToggle === 'search'
                    ? 'bg-[#e2f4ed] text-[#0c5351]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Search
              </button>

              <button
                onClick={() => setModeToggle('suggested')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  modeToggle === 'suggested'
                    ? 'bg-[#e2f4ed] text-[#0c5351]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Suggested for DoP · Kaval
              </button>
            </div>
          </div>

          {/* Main Body Content */}
          <div className="flex-1 px-4 sm:px-5 pb-6 space-y-4 overflow-y-auto">
            
            {/* Filter Chips Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Talent lists ({filteredTalents.length})
                </span>
                {filters.some((f) => f.active) && (
                  <button
                    onClick={() => setFilters((prev) => prev.map((f) => ({ ...f, active: false })))}
                    className="text-[11px] font-semibold text-[#0c5351] hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* Badges Container */}
              <div className="flex flex-wrap gap-2 pt-1">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center border ${
                      filter.active
                        ? 'bg-[#e6f4f1] text-[#0c5351] border-[#4db6ac]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
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
                    {/* Left: Avatar & Info */}
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Avatar Circle */}
                      <div className="w-10 h-10 rounded-full bg-[#d0eee6] text-[#0c5351] font-bold text-xs flex items-center justify-center shrink-0">
                        {talent.initials}
                      </div>

                      {/* Info Text */}
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
                          <span
                            className={
                              talent.availability === 'Available now'
                                ? 'text-slate-600'
                                : talent.availability === 'Not looking'
                                ? 'text-slate-400'
                                : 'text-slate-600'
                            }
                          >
                            {talent.availability}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* + List Button */}
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

                      {/* Invite Button */}
                      {talent.isInvited ? (
                        <button
                          onClick={() => openInviteModal(talent)}
                          className="px-4 py-1.5 bg-[#4db6ac] hover:bg-[#3ba096] text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                        >
                          Invite
                        </button>
                      ) : (
                        <button
                          onClick={() => openInviteModal(talent)}
                          className="px-4 py-1.5 bg-white border border-[#4db6ac] hover:bg-[#e6f4f1] text-[#0c5351] text-xs font-bold rounded-xl transition-all"
                        >
                          Invite
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Talent lists (shared with your team) Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5 mt-4">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">
                Talent lists (shared with your team)
              </h3>

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

          {/* Bottom Navigation Footer */}
          <footer className="bg-white border-t border-slate-200/80 px-6 py-2.5 flex justify-between items-center text-slate-500 text-[11px] font-medium">
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