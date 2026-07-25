import React,{useState,useEffect} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from "../slices/professionformslice";

const ProfessionalExperience = ()=>{

    const dispatch = useDispatch();
        const formData = useSelector((state) => state.professionform);
       const navigate = useNavigate()
      const [activeSection,SetActiveSection] = useState(3);
      const [dropdown,setDropdown] = useState();
      const [dropdownMenu,setDropdownMenu] = useState();
                const handleChange = (e) => {
                                const { name, value } = e.target;

                                    dispatch(setFormData({ ...formData, [name]: value }));
                      
                            };      
      
      // you can maintain individual state for each filtered list like filteredBodyType, filteredHairColor, etc.
      const [filteredActingRoles, setFilteredActingRoles] = useState(dropdown?.actingRoles || []);
      const [filteredSkills, setFilteredSkills] = useState(dropdown?.skillsAndExpertise || []);
      const [filteredMethodActingTechniques, setFilteredMethodActingTechniques] = useState(dropdown?.methodActingTechniques || []);
      const [filteredVocalRange, setFilteredVocalRange] = useState(dropdown?.vocalRange || []);
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e); // Update the form data
      
        // Filtering logic based on input value for each dropdown
        switch(name) {
          case 'ActingRoles':
            setDropdownMenu(19);
            setFilteredActingRoles(dropdown?.actingRoles.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
            break;
          case 'Skills':
            setDropdownMenu(20);
            setFilteredSkills(dropdown?.skillsAndExpertise.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
            break;
          case 'MethodActingTechniques':
            setDropdownMenu(21);
            setFilteredMethodActingTechniques(dropdown?.methodActingTechniques.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
            break;
          case 'VocalRange':
            setDropdownMenu(22);
            setFilteredVocalRange(dropdown?.vocalRange.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
            break;
        
          default:
            break;
        }
      };
      
      
            const handleSelectOption = (option, fieldName) => {
              // Update the input value with the selected option
              handleChange({
                target: {
                  name: fieldName,
                  value: option
                }
              });
              
              // Optionally close the dropdown after selection
              setDropdownMenu(null);
          };

          const handleMultipleSelectOption = (option, fieldName) => {
            const updatedSelection = [...formData[fieldName]];
            
            console.log('Current selection before change:', updatedSelection);
            
            if (updatedSelection.includes(option)) {
              const index = updatedSelection.indexOf(option);
              updatedSelection.splice(index, 1);
              console.log(`Removed ${option}`);
            } else {
              updatedSelection.push(option);
              console.log(`Added ${option}`);
            }
          
            dispatch(setFormData({
              ...formData,
              [fieldName]: updatedSelection,
            }));
            console.log(formData.methodActingTechniques)
            setDropdownMenu(null);
            console.log('Updated selection after change:', updatedSelection); // Log updated selection
          };
          
          

      const handleDropdownClick = (id) => {
        // If the clicked dropdown is already open, close it, otherwise open it
        setDropdownMenu(prev => prev === id ? null : id);
      };

                const toggleSecond = ()=>{
                  navigate('/profession/Professiontype/Artist/PhysicalAttributes')
                }
                const toggleFirst = ()=>{
                  navigate('/profession/Professiontype/Artist/Personal')
                }
                const toggleThird = ()=>{
                  navigate('/profession/Professiontype/Artist/ProfessionalExperience')
                }
                const toggleFourth = ()=>{
                  navigate('/profession/Professiontype/Artist/Availability')
                }
                const toggleFifth = ()=>{
                  navigate('/profession/Professiontype/Artist/AdditionalInformation')
                }
      const next = ()=>{
        navigate('/profession/Professiontype/Artist/Availability')
      }
      

        const fetchDropdown = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/get-dropdown/679c71512ed40716813fb231`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              setDropdown(data)
            } else {
              console.error('Failed to fetch user data:', response.status);
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
      
        useEffect(() => {
          fetchDropdown();
        }, []);


      const toggleSection = (id)=>{
        SetActiveSection(id)
      }



  // const selectedDateString = selectedDate ? selectedDate : dayjs();

    return(
<div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center font-sans pb-20">
  
  {/* 1. Progress Header with home.avif */}
  <div 
    className="w-full py-10 px-4 flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[220px] relative mb-[-40px]"
    style={{ backgroundImage: "url('/home.avif')" }}
  >
    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>

    <div className="w-full max-w-6xl flex items-center justify-between px-2 relative z-10">
      {[
        { step: 1, label: 'Personal Details', action: toggleFirst },
        { step: 2, label: 'Functional Attributes', action: toggleSecond },
        { step: 3, label: 'Professional Experience', action: toggleThird },
        { step: 4, label: 'Availability', action: toggleFourth },
        { step: 5, label: 'Additional Information', action: toggleFifth }
      ].map((item) => (
        <div key={item.step} className="flex flex-col items-center gap-3 flex-1 relative">
          <div 
            onClick={() => { toggleSection(item.step); item.action(); }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 z-10
            ${activeSection === item.step 
              ? 'bg-cta text-white shadow-[0_0_20px_rgba(92,190,143,0.6)] scale-110' 
              : 'bg-white/90 backdrop-blur-md text-gray-400 border border-white/20 shadow-lg'}`}
          >
            {activeSection > item.step ? <Icon icon="subway:tick" width="18" className="text-cta" /> : item.step}
          </div>
          {item.step !== 5 && (
            <div className="absolute left-[50%] top-6 w-full h-[3px] bg-white/20 -z-0">
              <div className={`h-full bg-cta transition-all duration-700 ${activeSection > item.step ? 'w-full' : 'w-0'}`} />
            </div>
          )}
          <span className={`text-[10px] font-black uppercase tracking-widest text-center px-2 ${activeSection === item.step ? 'text-white' : 'text-white/50'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* 2. Main Form Card */}
  <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative z-20">
    <div className="p-10 lg:p-14">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Simple Input: Acting Experience */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Acting Experience (Years)</label>
          <div className="relative">
            <Icon icon="solar:history-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="ActingExperience"
              name="ActingExperience"
              value={formData.ActingExperience}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Dropdown: Acting Roles */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Acting Roles</label>
          <div onClick={() => handleDropdownClick(19)} className="relative">
            <Icon icon="solar:user-circle-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.ActingRoles || 'Select Roles'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 19 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredActingRoles.length > 0 ? filteredActingRoles : dropdown?.actingRoles || []).map((role, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(role, 'ActingRoles')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Previous Projects */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Previous Projects</label>
          <div className="relative">
            <Icon icon="solar:videocamera-record-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="Previousprojects"
              name="Previousprojects"
              value={formData.Previousprojects}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Notable Directors */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Notable Directors</label>
          <div className="relative">
            <Icon icon="solar:star-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="NotableDirectors"
              name="NotableDirectors"
              value={formData.NotableDirectors}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Vocal Range Dropdown */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">familiar frameworks</label>
          <div onClick={() => handleDropdownClick(22)} className="relative">
            <Icon icon="solar:box-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.VocalRange || 'Select framework'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 22 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredVocalRange.length > 0 ? filteredVocalRange : dropdown?.vocalRange || []).map((range, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(range, 'VocalRange')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {range}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Skills (Multi-select) */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Skills/Expertise</label>
          <div onClick={() => handleDropdownClick(20)} className="relative">
            <Icon icon="solar:medal-ribbon-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.Skills || 'Select Skills'}</span>
              <Icon icon="solar:menu-dots-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 20 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredSkills.length > 0 ? filteredSkills : dropdown?.skillsAndExpertise || []).map((skill, idx) => (
                  <li key={idx} onClick={() => handleMultipleSelectOption(skill, 'Skills')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Simple Inputs: Dance, Accents, Awards */}
        {[
          { id: 'DanceScenes', label: 'Dance Scenes', icon: 'solar:walking-round-bold' },
          { id: 'AccentDialects', label: 'Accents/Dialects', icon: 'solar:chat-square-call-bold' },
          { id: 'AwardsandAchievements', label: 'Awards', icon: 'solar:cup-bold' },
        ].map(field => (
          <div key={field.id} className="group flex flex-col gap-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">{field.label}</label>
            <div className="relative">
              <Icon icon={field.icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
              <input
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
                required
              />
            </div>
          </div>
        ))}

        {/* Method Acting (Multi-select) */}
        <div className="group flex flex-col gap-2 relative lg:col-span-1">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Method Acting Techniques</label>
          <div onClick={() => handleDropdownClick(21)} className="relative">
            <Icon icon="solar:mask-happly-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.MethodActingTechniques.join(', ') || 'Select Techniques'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 21 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredMethodActingTechniques.length > 0 ? filteredMethodActingTechniques : dropdown?.methodActingTechniques || []).map((tech, idx) => (
                  <li key={idx} onClick={() => handleMultipleSelectOption(tech, 'MethodActingTechniques')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Improv, Stage, Fight */}
        {[
          { id: 'ImprovisationExperience', label: 'Improvisation Expertise', icon: 'solar:bolt-bold' },
          { id: 'OnStageWork', label: 'On-stage/Theatre Work', icon: 'solar:theatre-bold' },
          { id: 'FightActionScenes', label: 'Fight/Action Scenes', icon: 'solar:fire-bold' },
        ].map(field => (
          <div key={field.id} className="group flex flex-col gap-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">{field.label}</label>
            <div className="relative">
              <Icon icon={field.icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
              <input
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
                required
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Buttons */}
      <div className=" flex items-center justify-between gap-6 border-t border-gray-100 pt-10">
        <button 
          onClick={toggleSecond} 
          className="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
        >
          <Icon icon="solar:arrow-left-bold" width="20" />
          Back
        </button>

        <button 
          onClick={next}
          className="px-12 py-4 bg-cta text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cta/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
        >
          Next Step
          <Icon icon="solar:arrow-right-bold" width="22" />
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ProfessionalExperience;