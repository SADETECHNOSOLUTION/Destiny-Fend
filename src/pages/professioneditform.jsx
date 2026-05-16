import React,{useState,useEffect} from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from "../slices/professionformslice";

const ProfessionEditForm = ()=>{
  const dispatch = useDispatch();
      const formData = useSelector((state) => state.professionform);
      const navigate = useNavigate();
      const [selectedDate, setSelectedDate] = useState(dayjs()); // State to hold selected date
      const [showCalendar, setShowCalendar] = useState(false);
      const [activeSection,SetActiveSection] = useState(1);
      const [SocialmediaPopup,setSocialmediaPopup] = useState(false);
      const [dropdown,setDropdown] = useState();
      const [dropdownMenu,setDropdownMenu] = useState();


                      const handleChange = (e) => {
                          const { name, value } = e.target;
                
                              dispatch(setFormData({ ...formData, [name]: value }));
                
                      };      

// you can maintain individual state for each filtered list like filteredBodyType, filteredHairColor, etc.
const [filteredGender, setFilteredGender] = useState(dropdown?.gender || []);
const [filteredNationality, setFilteredNationality] = useState(dropdown?.nationality || []);
const [filteredEthnicity, setFilteredEthnicity] = useState(dropdown?.hairLength || []);
const [filteredMaritalStatus, setFilteredMaritalStatus] = useState(dropdown?.voiceType || []);
const [filteredLanguagesKnown, setFilteredLanguagesKnown] = useState(dropdown?.skinTone || []);
// const [filteredEyeColor, setFilteredEyeColor] = useState(dropdown?.eyeColor || []);
// const [filteredFacialHair, setFilteredFacialHair] = useState(dropdown?.facialHair || []);
// const [filteredClothingSize, setFilteredClothingSize] = useState(dropdown?.facialHair || []);
// const [filteredBuild, setFilteredBuild] = useState(dropdown?.facialHair || []);

const handleInputChange = (e) => {
  
  const { name, value } = e.target;
  if (name.startsWith("socialMediaLinks-")) {
              const key = name.split('-')[1];
              dispatch(setFormData({
                  ...formData,
                  socialMediaLinks: {
                      ...formData.socialMediaLinks,
                      [key]: value
                  }
              }));
          } 
          else{
            handleChange(e); 
          }
// Update the form data

  // Filtering logic based on input value for each dropdown
  switch(name) {
    case 'Gender':
      setDropdownMenu(1);
      setFilteredGender(dropdown?.gender.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
    case 'Nationality':
      setDropdownMenu(3);
      setFilteredNationality(dropdown?.nationality.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
    case 'Ethnicity':
      setDropdownMenu(4);
      setFilteredEthnicity(dropdown?.ethnicity.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
    case 'MaritalStatus':
      setDropdownMenu(5);
      setFilteredMaritalStatus(dropdown?.maritalStatus.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
    case 'LanguagesKnown':
      handleDropdownClick(6)
      setFilteredLanguagesKnown(dropdown?.languagesKnown.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
      case 'NativeLanguage':
        handleDropdownClick(7)
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

      const openSocialmediaPopup = ()=>{
        setSocialmediaPopup(true)
      }

      const closeSocialmediaPopup = ()=>{
        setSocialmediaPopup(false)
      }

      const toggleSection = (id)=>{
        SetActiveSection(id)
      }

        useEffect(() => {
          setSelectedDate(dayjs()); 
        }, []);

  // const selectedDateString = selectedDate ? selectedDate : dayjs();
  const handleDateClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };
    return(
<div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center font-sans">
      
      {/* 1. Progress Header - Fixed Width to match Form */}
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
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-md rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-white">
        

        {/* 3. Form Content */}
        <div className="p-10 lg:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Input Wrapper Component for consistency */}
            {[
              { label: 'Full Name', id: 'FullName', icon: 'solar:user-bold' },
              { label: 'Stage Name', id: 'StageName', icon: 'solar:star-bold' },
              { label: 'Email', id: 'Email', icon: 'solar:letter-bold', type: 'email' },
              { label: 'Mobile Number', id: 'MobileNumber', icon: 'solar:phone-bold' },
              { label: 'Emergency Contact', id: 'EmergencyContact', icon: 'solar:shield-user-bold' },
              { label: 'Currect Residency', id: 'CurrentResidency', icon: 'solar:map-point-bold' },
            ].map((item) => (
              <div key={item.id} className="group flex flex-col gap-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta transition-colors">
                  {item.label}
                </label>
                <div className="relative">
                  <Icon icon={item.icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta transition-colors" width="20" />
                  <input
                    id={item.id}
                    name={item.id}
                    value={formData[item.id]}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent border-2 rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 focus:ring-4 focus:ring-cta/5 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Custom Styled Dropdowns */}
            {[
              { label: 'Gender', id: 'Gender', menuId: 1 },
              { label: 'Nationality', id: 'Nationality', menuId: 3 },
              { label: 'Ethnicity', id: 'Ethnicity', menuId: 4 },
              { label: 'Marital Status', id: 'MaritalStatus', menuId: 5 },
              { label: 'Languages Known', id: 'LanguagesKnown', menuId: 6 },
              { label: 'Native Language', id: 'NativeLanguage', menuId: 7 },
            ].map((drop) => (
              <div key={drop.id} className="relative flex flex-col gap-2 group">
                <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta transition-colors">
                  {drop.label}
                </label>
                <div 
                  onClick={() => handleDropdownClick(drop.menuId)}
                  className="flex items-center justify-between w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl cursor-pointer group-focus-within:border-cta/20 hover:bg-gray-100 transition-all"
                >
                  <span className="text-gray-700 font-medium">{formData[drop.id] || `Select ${drop.label}`}</span>
                  <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
                </div>
                
                {dropdownMenu === drop.menuId && (
                  <div className="absolute top-[105%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-60 overflow-y-auto">
                      {(dropdown?.[drop.id.toLowerCase()] || []).map((option, idx) => (
                        <li 
                          key={idx} 
                          onClick={() => handleSelectOption(option, drop.id)}
                          className="px-5 py-3 hover:bg-cta hover:text-white text-gray-600 text-sm cursor-pointer transition-colors"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Profile Summary - Full Width */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1">About</label>
              <textarea
                id="ProfileSummary"
                name="ProfileSummary"
                value={formData.ProfileSummary}
                onChange={handleInputChange}
                className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-3xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all h-24 resize-none"
                placeholder="Tell about yourself"
              />
            </div>
          </div>

          {/* 4. Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center bg-bla justify-between gap-6 border-t border-gray-100">
            <button 
              onClick={openSocialmediaPopup}
              className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              <Icon icon="solar:share-circle-bold" width="22" />
              Social Media Profiles
            </button>

            <button 
              onClick={toggleSecond}
              className="w-full sm:w-auto px-12 py-4 bg-cta text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cta/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Next step
              <Icon icon="solar:arrow-right-bold" width="22" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Enhanced Modal Styling */}
      <Modal 
        isOpen={SocialmediaPopup} 
        onRequestClose={closeSocialmediaPopup}
        className="fixed inset-0 flex items-center justify-center p-4 z-[999]"
        overlayClassName="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[998]"
      >
        <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-8 relative">
          <button onClick={closeSocialmediaPopup} className="absolute right-6 top-6 text-gray-400 hover:text-red transition-colors">
            <Icon icon="solar:close-circle-bold" width="32" />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Icon icon="solar:link-bold" className="text-cta" />
            Connect Profiles
          </h3>
          
          <div className="space-y-4">
            {[
              { id: 'facebook', icon: 'logos:facebook', label: 'Facebook' },
              { id: 'instagram', icon: 'skill-icons:instagram', label: 'Instagram' },
              { id: 'twitter', icon: 'logos:twitter', label: 'Twitter' },
              { id: 'youtube', icon: 'logos:youtube-icon', label: 'YouTube' },
              { id: 'linkedin', icon: 'logos:linkedin-icon', label: 'LinkedIn' },
            ].map((social) => (
              <div key={social.id} className="relative group">
                <Icon icon={social.icon} className="absolute left-4 top-1/2 -translate-y-1/2" width="24" />
                <input
                  id={social.id}
                  name={`socialMediaLinks-${social.id}`}
                  placeholder={`${social.label} Profile URL`}
                  value={formData.socialMediaLinks[social.id]}
                  onChange={handleInputChange}
                  className="w-full pl-14 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-cta/20 outline-none transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
    )
}

export default ProfessionEditForm;