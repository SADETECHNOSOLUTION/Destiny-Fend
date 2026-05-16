import React,{useState,useEffect} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from "../slices/professionformslice";
import { useNavigate } from "react-router";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Availability = ()=>{
  const navigate = useNavigate()
      const [activeSection,SetActiveSection] = useState(4);
    const dispatch = useDispatch();
        const formData = useSelector((state) => state.professionform);
      const [dropdown,setDropdown] = useState();
      const [dropdownMenu,setDropdownMenu] = useState();

            
                   const handleChange = (e) => {
                                     const { name, value } = e.target;
     
                                         dispatch(setFormData({ ...formData, [name]: value }));
                           
                                 };      
           
           // you can maintain individual state for each filtered list like filteredBodyType, filteredHairColor, etc.
           const [filteredpreferredWorkLocation, setFilteredpreferredWorkLocation] = useState(dropdown?.preferredWorkLocation || []);
           const [filteredroleTypePreference, setFilteredroleTypePreference] = useState(dropdown?.roleTypePreference || []);
           const [filteredlongTermCommitment, setFilteredlongTermCommitment] = useState(dropdown?.longTermCommitment || []);
           const [filteredworkScheduleFlexibility, setFilteredworkScheduleFlexibility] = useState(dropdown?.workScheduleFlexibility || []);
           const [filteredcontractType, setFilteredContractType] = useState(dropdown?.contractType || []);
           const [filteredworkTypePreference, setFilteredworkTypePreference] = useState(dropdown?.workTypePreference || []);

           const handleInputChange = (e) => {
             const { name, value } = e.target;
             handleChange(e); // Update the form data
           
             // Filtering logic based on input value for each dropdown
             switch(name) {
               case 'PreferredWorkLocations':
                 setDropdownMenu(23);
                 setFilteredpreferredWorkLocation(dropdown?.preferredWorkLocation.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                 break;
               case 'RoleTypePreference':
                 setDropdownMenu(24);
                 setFilteredroleTypePreference(dropdown?.roleTypePreference.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                 break;
               case 'LongTermCommitment':
                 setDropdownMenu(25);
                 setFilteredlongTermCommitment(dropdown?.longTermCommitment.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                 break;
               case 'WorkScheduleFlexibility':
                 setDropdownMenu(26);
                 setFilteredworkScheduleFlexibility(dropdown?.workScheduleFlexibility.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                 break;
                  case 'ContractType':
                    setDropdownMenu(28);
                    setFilteredContractType(dropdown?.contractType.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                    break;
                    case 'WorktypePreferences':
                      setDropdownMenu(29);
                      setFilteredworkTypePreference(dropdown?.workTypePreference.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
                      break;
               
             
               default:
                 break;
             }
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

               const [selectedDate, setSelectedDate] = useState(dayjs()); // State to hold selected date
               const [showCalendar, setShowCalendar] = useState(false);
         
                 useEffect(() => {
                   setSelectedDate(dayjs()); 
                 }, []);
         
           // const selectedDateString = selectedDate ? selectedDate : dayjs();
           const handleDateClick = () => {
             setShowCalendar(!showCalendar); // Toggle calendar visibility
           };
     

      const handleDropdownClick = (id) => {
        // If the clicked dropdown is already open, close it, otherwise open it
        setDropdownMenu(prev => prev === id ? null : id);
      };
      

        const fetchDropdown = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profession/get-dropdown/679c71512ed40716813fb231`, {
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

    return(
<div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center font-sans pb-20">
  
  {/* 1. Progress Header */}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Date Picker Section */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Available Dates</label>
          <div className="bg-gray-50 rounded-2xl p-1 border-2 border-transparent group-focus-within:border-cta/20 group-focus-within:bg-white transition-all">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  value={selectedDate} 
                  onChange={(newValue) => setSelectedDate(newValue)} 
                  views={['year', 'month', 'day']}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSvgIcon-root': { color: '#5CBE8F' },
                    '& .MuiInputBase-input': { fontWeight: 500, color: '#374151' }
                  }} 
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* Preferred Work Locations */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Preferred Work Locations</label>
          <div onClick={() => handleDropdownClick(23)} className="relative">
            <Icon icon="solar:map-point-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.PreferredWorkLocations || 'Select Locations'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 23 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredpreferredWorkLocation.length > 0 ? filteredpreferredWorkLocation : dropdown?.preferredWorkLocation || []).map((loc, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(loc, 'PreferredWorkLocations')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Availability for Workshops */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Availability for Workshops</label>
          <div className="relative">
            <Icon icon="solar:users-group-rounded-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="AvailabilityForWorkshops"
              name="AvailabilityForWorkshops"
              value={formData.AvailabilityForWorkshops}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Work Type Preferences */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Work Type Preferences</label>
          <div onClick={() => handleDropdownClick(29)} className="relative">
            <Icon icon="solar:case-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.WorktypePreferences || 'Select Preferences'}</span>
              <Icon icon="solar:menu-dots-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 29 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredworkTypePreference.length > 0 ? filteredworkTypePreference : dropdown?.workTypePreference || []).map((type, idx) => (
                  <li key={idx} onClick={() => handleMultipleSelectOption(type, 'WorktypePreferences')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Contract Type */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Contract Type</label>
          <div onClick={() => handleDropdownClick(28)} className="relative">
            <Icon icon="solar:document-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.ContractType || 'Select Type'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 28 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredcontractType.length > 0 ? filteredcontractType : dropdown?.contractType || []).map((c, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(c, 'ContractType')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Travel Willingness (Yes/No) */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Willingness to Travel</label>
          <div onClick={() => handleDropdownClick(30)} className="relative">
            <Icon icon="solar:plain-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.WillingnesstoTravel || 'Select'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 30 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <li onClick={() => handleSelectOption('Yes', "WillingnesstoTravel")} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">Yes</li>
              <li onClick={() => handleSelectOption('No', "WillingnesstoTravel")} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">No</li>
            </div>
          )}
        </div>

        {/* Night Shoots (Yes/No) */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Availability For Night Shoots</label>
          <div onClick={() => handleDropdownClick(31)} className="relative">
            <Icon icon="solar:moon-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.AvailabilityForNightshoots || 'Select'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 31 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <li onClick={() => handleSelectOption('Yes', "AvailabilityForNightshoots")} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">Yes</li>
              <li onClick={() => handleSelectOption('No', "AvailabilityForNightshoots")} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">No</li>
            </div>
          )}
        </div>

        {/* Long Term Commitment */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Long-Term Commitment</label>
          <div onClick={() => handleDropdownClick(25)} className="relative">
            <Icon icon="solar:calendar-add-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.LongtermCommitment || 'Select Option'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 25 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredlongTermCommitment.length > 0 ? filteredlongTermCommitment : dropdown?.longTermCommitment || []).map((item, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(item, 'LongtermCommitment')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Schedule Flexibility */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Work Schedule Flexibility</label>
          <div onClick={() => handleDropdownClick(26)} className="relative">
            <Icon icon="solar:clock-circle-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.WorksheduleFlexibility || 'Select Flexibility'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 26 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredworkScheduleFlexibility.length > 0 ? filteredworkScheduleFlexibility : dropdown?.workScheduleFlexibility || []).map((item, idx) => (
                  <li key={idx} onClick={() => handleSelectOption(item, 'WorksheduleFlexibility')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Role Type Preference */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Role Type Preference</label>
          <div onClick={() => handleDropdownClick(24)} className="relative">
            <Icon icon="solar:star-ring-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span className="truncate">{formData.RoleTypePreference || 'Select Preference'}</span>
              <Icon icon="solar:menu-dots-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 24 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {(filteredroleTypePreference.length > 0 ? filteredroleTypePreference : dropdown?.roleTypePreference || []).map((item, idx) => (
                  <li key={idx} onClick={() => handleMultipleSelectOption(item, 'RoleTypePreference')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-16 flex items-center justify-between gap-6 border-t border-gray-100 pt-10">
        <button 
          onClick={toggleThird} 
          className="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
        >
          <Icon icon="solar:arrow-left-bold" width="20" />
          Back
        </button>

        <button 
          onClick={toggleFifth}
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

export default Availability;