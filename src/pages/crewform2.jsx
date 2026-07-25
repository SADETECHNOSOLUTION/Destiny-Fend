import React,{useState,useEffect} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "react-modal";

import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from "../slices/professionformslice";

const CrewCollaboration = ()=>{
  const dispatch = useDispatch();
      const formData = useSelector((state) => state.professionform);
      const navigate = useNavigate();
      const [activeSection,SetActiveSection] = useState(2);
      const [SocialmediaPopup,setSocialmediaPopup] = useState(false);
      const [dropdown,setDropdown] = useState();
      const [dropdownMenu,setDropdownMenu] = useState();


                      const handleChange = (e) => {
                          const { name, value } = e.target;
                
                              dispatch(setFormData({ ...formData, [name]: value }));
                
                      };      

// you can maintain individual state for each filtered list like filteredBodyType, filteredHairColor, etc.
const [filteredGender, setFilteredGender] = useState(dropdown?.gender || []);
const [filteredEthnicity, setFilteredEthnicity] = useState(dropdown?.hairLength || []);
// const [filteredEyeColor, setFilteredEyeColor] = useState(dropdown?.eyeColor || []);
// const [filteredFacialHair, setFilteredFacialHair] = useState(dropdown?.facialHair || []);
// const [filteredClothingSize, setFilteredClothingSize] = useState(dropdown?.facialHair || []);
// const [filteredBuild, setFilteredBuild] = useState(dropdown?.facialHair || []);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  handleChange(e); // Update the form data

  // Filtering logic based on input value for each dropdown
  switch(name) {
    case 'Gender':
      setDropdownMenu(1);
      setFilteredGender(dropdown?.gender.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
      break;
    case 'Ethnicity':
      setDropdownMenu(4);
      setFilteredEthnicity(dropdown?.ethnicity.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
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
        navigate('/profession/Professiontype/Crew/Personal')
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

        const fetchDropdown = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/get-dropdown/6794aba9b7957e027a5cd301`, {
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

      const closeSocialmediaPopup = ()=>{
        setSocialmediaPopup(false)
      }

      const toggleSection = (id)=>{
        SetActiveSection(id)
      }


  // const selectedDateString = selectedDate ? selectedDate : dayjs();
    return(
        <div className="flex flex-col gap-4 items-center justify-center">

       <span className="text-cta text-xl font-bold p-4">Crew Details</span>
       <div className="">
      <div className="section">
        <div className="flex flex-col gap-2 items-center">
        <div onClick={()=>{toggleSection(2);toggleFirst()}} className={`circle`}><span className={ ` ${activeSection ===1 ? 'bg-cta w-8 text-white h-8  rounded-full': ''} flex items-center justify-center`}>1</span></div>
        <span>Personal Details</span>
     </div>
        <div className="line"></div>
        <div className="flex flex-col gap-2 items-center">
        <div onClick={()=>{toggleSection(2);toggleSecond()}} className={`circle`}><span className={ ` ${activeSection ===2 ? 'bg-cta w-8 text-white h-8  rounded-full': ''} flex items-center justify-center`}>2</span></div>
        <span>Team Collaboration</span>
         </div>
        <div className="line"></div>
        <div className="flex flex-col gap-2 items-center">
        <div onClick={()=>{toggleSection(2);toggleThird()}} className={`circle`}><span className={ ` ${activeSection ===3 ? 'bg-cta w-8 text-white h-8  rounded-full': ''} flex items-center justify-center`}>3</span></div>
        <span>Professional Experience</span>
       </div>
        <div className="line"></div>
        <div className="flex flex-col gap-2 items-center">
        <div onClick={()=>{toggleSection(2);toggleFourth()}} className={`circle`}><span className={ ` ${activeSection ===4 ? 'bg-cta w-8 text-white h-8  rounded-full': ''} flex items-center justify-center`}>4</span></div>
        <span>Availability</span>
        </div>
         <div className="line"></div>
         <div className="flex flex-col gap-2 items-center">
        <div onClick={()=>{toggleSection(2);toggleFifth()}} className={`circle`}><span className={ ` ${activeSection ===5 ? 'bg-cta w-8 text-white h-8  rounded-full': ''} flex items-center justify-center`}>5</span></div>
        <span>Additional Information</span>
           </div>
      </div>
    </div>
    <div className="flex flex-col items-center">

       <div className="flex flex-wrap items-start w-full gap-8 p-4 justify-center">
     
       <div className="w-1/4 flex flex-col gap-2">
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Preferred TeamSize</label>
              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <input
                id="FullName"
                name="FullName"
                value={formData.FullName}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
              </div>
            </div>

            <div className="w-1/4 flex flex-col gap-2">
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Team Role Preference</label>
              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <input
                id="StageName"
                name="StageName"
                value={formData.StageName}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
              </div>
            </div>
            <div className="w-1/4 flex flex-col gap-2" >
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Preferred Communication Style</label>
              <div className="flex flex-col">
              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300">
              <input
                id="Ethnicity"
                name="Ethnicity"
                value={formData.Ethnicity}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
              <Icon onClick={()=>handleDropdownClick(4)} className="text-cta" icon="mingcute:down-fill" width="24" height="24" />
        
              </div>
 { dropdownMenu === 4 &&(

<div className="relative w-full">
<ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2">
{filteredEthnicity.length > 0 ?  ((filteredEthnicity).map((Ethnicity, index) => (
    <li onClick={() => handleSelectOption(Ethnicity, 'BodyType')}
      key={index}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {Ethnicity}
    </li>
  ))) : ((dropdown?.ethnicity).map((Ethnicity, index) => (
    <li  onClick={() => handleSelectOption(Ethnicity, 'Ethnicity')}
      key={index}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {Ethnicity}
    </li>
  )))}
</ul>
</div>

                )
              }
              </div>

            </div>
            <div className="w-1/4 flex flex-col gap-2" >
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Remote Communication Tools</label>
              <div className="flex flex-col">
              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <input
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
              <Icon onClick={()=>handleDropdownClick(1)} className="text-cta" icon="mingcute:down-fill" width="24" height="24" />
        
              </div>
              {
                dropdownMenu===1 && (

<div className="relative w-full">
  <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2">
  {filteredGender.length > 0 ?  ((filteredGender).map((gender, index) => (
    <li  onClick={() => handleSelectOption(gender, 'Gender')}
      key={index}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {gender}
    </li>
  ))) : ((dropdown?.gender).map((gender, index) => (
    <li  onClick={() => handleSelectOption(gender, 'Gender')}
      key={index}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {gender}
    </li>
  )))}
  </ul>
</div>

                )
              }
              </div>

            </div>

            <div className="w-1/4 flex flex-col gap-2 " >
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Timezone Flexibility</label>

              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <input
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
        
              </div>
            </div>
            <div className="w-1/4 flex flex-col gap-2" >
              <label htmlFor="name" className="block font-semibold text-sm  text-gray-700">Preferred Collaboration Tools</label>
              <div className=" flex items-center h-13 rounded-md px-2 border border-gray-300 ">
              <input
                id="Email"
                name="Email"
 value={formData.Email}
                onChange={handleInputChange}
                className="flex-1 mt-2 p-2 w-full rounded-md focus:outline-none "
                required
              />
              </div>
            </div>
   
   

       </div>
    </div>
    <div className="flex relative w-full">
      {/* <div className="flex absolute left-10">
      <button className="px-4 py-2 rounded-md bg-red text-white">Clear All</button>
      </div> */}

       <div className="flex items-center gap-6 absolute right-10">
       <button className="px-4 py-2 rounded-md border border-gray-400 text-gray-400">Cancel</button>
        <button onClick={toggleSecond}  className="px-4 py-2 rounded-md bg-cta text-white">Next Step</button>
       </div>
    </div>

       <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%,-20%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={SocialmediaPopup} onRequestClose={closeSocialmediaPopup}>
      <div className={`relative w-1/2 bg-white rounded-m h-96 flex rounded-lg shadow-lg flex-col`}>
      <div className='flex items-center p-4 w-full'>

      </div>
    </div>
 </Modal>
        </div>
    )
}

export default CrewCollaboration;