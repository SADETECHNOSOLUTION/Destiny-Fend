import React,{useState,useEffect} from 'react';
import { Plus, Edit2, Calendar, LogOut, ArrowRight,ArrowLeft, Menu } from 'lucide-react';

export default function RecruiterDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab,setActivetab] = useState('Home')
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleFilmClick = (filmName) => {
    setSelectedFilm(filmName);
    setActivetab('Content');
  };
  return (
    <>
          <div className="max-w-[30rem] w-full h-[41.1rem] bg-white overflow-hidden relative flex flex-col">
       {activeTab === 'Content'&&
       <div>
          
          <div className="flex-1 flex flex-col bg-white">
            {/* Top Image Banner with Back Button */}
            <div className="relative h-48 w-full rounded-b-[30px] bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80" 
                alt={selectedFilm} 
                className="w-full h-full object-cover rounded-b-[30px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
              <button onClick={()=>{setActivetab('Home')}}
                
                className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/20 w-8 h-8 justify-center rounded-full text-xs font-medium backdrop-blur-md"
              >
                <ArrowLeft className='' size={20} />
              </button>
            </div>

            {/* Bento Grid Options */}
            <div className="flex-1 px-6 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-center h-28 cursor-pointer hover:bg-gray-100 transition">
                  <span className="text- font-bold text-gray-800 leading-snug">Cast and<br/>Crew</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-center h-28 cursor-pointer hover:bg-gray-100 transition">
                  <span className=" font-bold text-gray-800 leading-snug">Budgeting</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-center h-28 cursor-pointer hover:bg-gray-100 transition">
                  <span className=" font-bold text-gray-800 leading-snug">Equipments<br/>and Tech</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-center h-28 cursor-pointer hover:bg-gray-100 transition">
                  <span className=" font-bold text-gray-800 leading-snug">Promotions</span>
                </div>
              </div>
            </div>
          </div>
                  
        </div>}

        {activeTab === 'Home' && 
        (<>
                <div className="bg-[#14b8a6] px-6 pt-6 pb-16 rounded-b-[20px] relative">
          <div className="flex justify-between items-center mb-6">
          <img className='w-24 h-7' src='logo.png' />
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Menu size={24} />
            </button>
          </div>

          {/* Action Pills Overlaying the Curve */}
          <div className="absolute -bottom-6 left-6 right-6 flex gap-3">
            <div className="flex-1 bg-white shadow-md rounded-2xl px-2 py-3 flex items-center justify-center gap-2 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-[#14b8a6]">
                <Plus size={14} />
              </div>
              <span className="text-[11px] font-semibold text-gray-800 ">Create New<br/>Project</span>
            </div>
            
            <div className="flex-1 bg-white shadow-md rounded-2xl px-2 py-3 flex items-center justify-center gap-1 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-[#14b8a6]">
                <Plus size={14} />
              </div>
              <span className="text-[11px] font-semibold text-gray-800 text-">Create New<br/>Content</span>
            </div>
          </div>
        </div>

        {/* Main Body Content */}
        <div className="flex-1 px-6 pt-12 pb-6 overflow-y-auto">
          
          {/* Active Projects Section */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Active Projects</h2>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {/* Project Card 1 */}
              <div className="min-w-[220px] bg-gray-900 text-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[12px] font-semibold">Project SDrive</span>
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <Edit2 size={10} className="text-white" />
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-400 line-clamp-2 mb-4">
                    A digital scavenger discovers a corrupted file that proves the city...
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-semibold0.2 text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>77%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full w-[77%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="min-w-[220px] bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-900">Commercial</span>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-2 mb-4">
                    A digital scavenger discovers a corrupted file that proves the city...
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full w-fit text-[10px] font-medium">
                  <Calendar size={12} />
                  <span>April 19</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Switcher Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
            <button className="flex-1 py-1.5 bg-[#14b8a6] text-white text-xs font-semibold rounded-lg shadow-sm">
              Active Content
            </button>
            <button className="flex-1 py-1.5 text-gray-500 text-xs font-medium rounded-lg">
              Completed Content
            </button>
          </div>

          {/* Content List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60" 
                  alt="Film A" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-xs font-bold text-gray-800">Film A</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#14b8a6] flex items-center justify-center text-white">
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=100&auto=format&fit=crop&q=60" 
                  alt="Film Z" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-xs font-bold text-gray-800">Film Z</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#14b8a6] flex items-center justify-center text-white">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
        </>
        )

        }
        {/* Top Header Section (Teal Background) */}


<div           onClick={() => setIsMenuOpen(false)}

 className={`absolute inset-0 bg-black/40 transition-opacity duration-900 ${isMenuOpen? 'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`}>
  
</div>

        {/* Side Menu Drawer */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-[75%] h-full bg-[#14b8a6] z-50 shadow-2xl flex flex-col justify-between px-6 pt-12 pb-8 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* User Profile Header */}
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
                alt="Magnes" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/40"
              />
              <div>
                <h3 className="text-white font-bold text-sm">Magnes</h3>
                <p className="text-white/80 text-xs">Film Producer</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-5 text-white font-medium text-sm">
              <button className="w-full text-left hover:opacity-80">Post Ads</button>
              <button className="w-full flex items-center gap-2 hover:opacity-80"><Plus size={16} /> Profile</button>
              <button className="w-full flex items-center gap-2 hover:opacity-80"><Plus size={16} /> Project</button>
              <button onClick={()=>{setActivetab('Content');setIsMenuOpen(false)}} className="w-full flex items-center gap-2 hover:opacity-80"><Plus size={16} /> Content</button>
              <button className="w-full text-left hover:opacity-80">Support</button>
              <button className="w-full text-left hover:opacity-80">Settings</button>
              <button className="w-full text-left hover:opacity-80">Chats</button>
            </div>
          </div>

          {/* Logout Button */}
          <div>
            <button className="flex items-center gap-2 text-white font-semibold text-sm hover:opacity-80">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </>


  );
}