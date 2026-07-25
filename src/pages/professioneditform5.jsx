import React,{useState,useEffect,useRef} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector,useDispatch } from "react-redux";
import { setFormData,addToPortfolio,resetFormData } from "../slices/professionformslice";
import { useNavigate } from "react-router";

const AdditionalInformation = ()=>{
  const fileInputRef = useRef(null);
    const userId = useSelector((state)=>state.auth.userId)
        const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
      const [activeSection,SetActiveSection] = useState(5);
      // const [file,SetFile] = useState();
      const formData = useSelector((state) => state.professionform);
      const [dropdown,setDropdown] = useState();
      const [dropdownMenu,setDropdownMenu] = useState();

      const handleSelectOption = (option, fieldName) => {
        // Update the input value with the selected option
        handleChange({
          target: {
            name: fieldName,
            value: option
          }
        });

        setDropdownMenu(null);
    };

        const handleImageChange = (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                 
                    setFile(selectedFile);
                    dispatch(addToPortfolio(selectedFile)); 
                    console.log(selectedFile)
                    console.log(formData.Portfolio)
            }
        };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
      console.log(file)
      handleChange(e); // Update the form data
    }


      const handleDropdownClick = (id) => {
        // If the clicked dropdown is already open, close it, otherwise open it
        setDropdownMenu(prev => prev === id ? null : id);
      };
      
              
                     const handleChange = (e) => {
                                       const { name, value } = e.target;
                                           dispatch(setFormData({ ...formData, [name]: value }));
                                   };    

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

      const postPhysical = async () => {
      
        const payload={
          "userId": parseInt(userId),
          "height": "5",
          "weight": "70kg",
          "bodyType": "Athletic",
          "hairColor": "Black",
          "hairLength": "Short",
          "eyeColor": "Brown",
          "skinTone": "Fair",
          "facialHair": "Beard",
          "tattoos": "true",
          "piercings": "Ears",
          "distinctFeatures": "Scar on left cheek",
          "shoeSize": 42,
          "clothingSize": "Medium",
          "build": "Muscular",
          "voiceType": "Deep"
        }
    const token = localStorage.getItem('token')
        try {
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/physical-attribute`, {
            method: 'POST',
            body: JSON.stringify(payload),
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          });
    
          if (response.ok) {

          } else {
         console.log(token)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const postSocial = async () => {
      
        const payload= {
          "userId": parseInt(userId),
          "platforms": [
            {
              "platform": "Instagram",
              "url": formData.socialMediaLinks.instagram
            },
            {
              "platform": "Twitter",
              "url": formData.socialMediaLinks.twitter
            },
            {
              "platform": "youtube",
              "url": formData.socialMediaLinks.youtube
            },
            {
              "platform": "linkedin",
              "url": formData.socialMediaLinks.linkedin
            },
            {
              "platform": "Facebook",
              "url": formData.socialMediaLinks.facebook
            }
          ]
        }
        
    const token = localStorage.getItem('token')
        try {
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession//social-media-accounts`, {
            method: 'POST',
            body: JSON.stringify(payload),
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          });
    
          if (response.ok) {

          } else {
         console.log(token)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      const postAdditionalInformation = async () => {
        const formDataObj = new FormData();
    
        formDataObj.append('portfolioAndWorkSample', formData.Portfolio.map((file) => file.name).join(', '));
    
        const additionalInfoJson = {
            "userId": parseInt(userId),
            "references": formData.CareerGoals,
            "socialMediaResearch": formData.SocialMediaReach,
            "equipmentAndPropsOwned": formData.EquipmentPropsOwned,
            "specialRequirements": formData.SpecialRequirements,
            "medicalCondition": formData.MedicalConditions,
            "membershipsAndAffiliations": formData.MembershipsandAffiliations,
            "hobbiesAndInterests": formData.HobbiesandInterests,
            "publicSpeakingExperience": formData.PublicSpeakingExperience,
            "personalTransportationAvailability": formData.PersonalTransportationAvailability,
            "careerGoals": formData.CareerGoals,
        };

        formDataObj.append('additionalInfoJson', JSON.stringify(additionalInfoJson));
    
        const token = localStorage.getItem('token');
        try {
            // Send the request with the 'multipart/form-data' content type
            const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/additional-information`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataObj,
            });
    
            if (response.ok) {
                console.log('Request was successful');
                // Handle success logic here
            } else {
                console.log('Request failed');
                // Handle failure logic here
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };
    
      const postProfessionalExperience = async () => {
      
        const payload={
          "userId": parseInt(userId),
          "actingExperience":parseInt(formData.ActingExperience),
          "actingRoles": formData.ActingRoles,
          "previousProjects":formData.Previousprojects,
          "notableDirectorsWorkedWith": formData.NotableDirectors,
          "vocalRange":formData.VocalRange,
          "skillsAndExpertise":formData.Skills,
          "danceScenes":formData.DanceScenes,
          "accentsAndDialects":formData.AccentDialects,
          "awardsAndAchievements":formData.AwardsandAchievements,
          "methodActingTechniques":formData.MethodActingTechniques,
          "improvisationExperience":formData.ImprovisationExperience,
          "onStageAndTheatreWorks":formData.OnStageWork,
          "fightAndActionScenes":formData.FightActionScenes,
      }
    const token = localStorage.getItem('token')
        try {
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/professional-experience`, {
            method: 'POST',
            body: JSON.stringify(payload),
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          });
    
          if (response.ok) {

          } else {

          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    //   const postAvailability = async () => {

    //     const payload={
    //         "userId": parseInt(userId),
    //         "availableDates":formData.AvailableDates,
    //         "preferredWorkLocation": formData.PreferredWorkLocations,
    //         "availabilityForWorkShops":formData.AvailabilityForWorkshops,
    //         "workTypePreference": formData.WorktypePreferences,
    //         "contractType":formData.ContractType,
    //         "willingnessToTravel":formData.WillingnesstoTravel,
    //         "availabilityForNightShoots":formData.AvailabilityForNightshoots,
    //         "longTermCommitment":formData.LongtermCommitment,
    //         "workScheduleFlexibility":formData.WorksheduleFlexibility,
    //         "roleTypePreference":formData.RoleTypePreference,
    //     }

    // const token = localStorage.getItem('token')
    //     try {
    //       const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/availability`, {
    //         method: 'POST',
    //         body: JSON.stringify(payload),
    //           headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //           }
    //       });
    
    //       if (response.ok) {

    //       } else {

    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };
       
      const postPersonal = async () => {
        const payload={
            "userId": userId,
            "userType":'Artist',
            "fullName": formData.FullName,
            "stageName":formData.StageName,
            "gender": formData.Gender,
            "dob":formData.DOB,
            "email":formData.Email,
            "nationality":formData.Nationality,
            "ethnicity":formData.Ethnicity,
            "maritalStatus":formData.MaritalStatus,
            "languagesKnown":formData.LanguagesKnown,
            "mobileNumber":formData.MobileNumber,
            "address":formData.Address,
            "nativeLanguage":formData.NativeLanguage,
            "emergencyContact":formData.EmergencyContact,
            "currentResidency":formData.CurrentResidency,
            "profileSummary":formData.ProfileSummary,
        }
        

    const token = localStorage.getItem('token')
        try {
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/personal-info`, {
            method: 'POST',
            body: JSON.stringify(payload),
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          });
    
          if (response.ok) {

          } else {

          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const postAvailability = async () => {
        const payload={
            "userId": userId,
            // "userType":'Artist',
            "availableDates": formData.AvailableDates,
            "preferredWorkLocation":formData.PreferredWorkLocations,
            "availabilityForWorkShops": formData.AvailabilityForWorkshops,
            "workTypePreference":formData.WorktypePreferences,
            "contractType":formData.ContractType,
            "willingnessToTravel":formData.WillingnesstoTravel,
            "availabilityForNightShoots": true,
            "longTermCommitment":formData.LongtermCommitment,
            "workScheduleFlexibility":formData.WorksheduleFlexibility,
            "roleTypePreference":formData.RoleTypePreference,
        }
        
    const token = localStorage.getItem('token')
        try {
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/availability`, {
            method: 'POST',
            body: JSON.stringify(payload),
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
          });
    
          if (response.ok) {

          } else {

          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const Submit = ()=>{
        postPersonal();
        postPhysical();
        postAvailability();
        postSocial();
        postAdditionalInformation();
        postProfessionalExperience();
        dispatch(setFormData(resetFormData));
      }

      const handleIconClick = () => {
        fileInputRef.current.click();
      };

    return(
<div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center font-sans pb-32">
  
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
        
        {/* Portfolio / Work Samples (Upload Style) */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Portfolio/Work Samples</label>
          <div 
            onClick={handleIconClick}
            className="relative flex items-center h-16 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-4 cursor-pointer hover:border-cta/50 hover:bg-white transition-all group/upload"
          >
            <Icon icon="solar:upload-minimalistic-bold" className="text-gray-300 group-hover/upload:text-cta mr-3" width="24" />
            <input
              readOnly
              value={formData.Portfolio.map((file) => file.name).join(', ') || 'Upload files...'}
              className="flex-1 bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* References */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">References</label>
          <div className="relative">
            <Icon icon="solar:users-group-two-rounded-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="Reference"
              name="Reference"
              value={formData.Reference}
              onChange={handleInputChange}
              placeholder="Names or Contact Info"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Social Media Reach */}
        < div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Social Media Reach</label>
          <div className="relative">
            <Icon icon="solar:share-circle-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <input
              id="SocialMediaReach"
              name="SocialMediaReach"
              value={formData.SocialMediaReach}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Equipment owned */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Equipment/Props Owned</label>
          <input
            id="EquipmentPropsOwned"
            name="EquipmentPropsOwned"
            value={formData.EquipmentPropsOwned}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Special Requirements */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Special Requirements</label>
          <input
            id="SpecialRequirements"
            name="SpecialRequirements"
            value={formData.SpecialRequirements}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Medical Conditions */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Medical Conditions</label>
          <input
            id="MedicalConditions"
            name="MedicalConditions"
            value={formData.MedicalConditions}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Career Goals */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Career Goals</label>
          <input
            id="CareerGoals"
            name="CareerGoals"
            value={formData.CareerGoals}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Memberships */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Memberships / Affiliations</label>
          <input
            id="MembershipsandAffiliations"
            name="MembershipsandAffiliations"
            value={formData.MembershipsandAffiliations}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Hobbies */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Hobbies & Interests</label>
          <input
            id="HobbiesandInterests"
            name="HobbiesandInterests"
            value={formData.HobbiesandInterests}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Public Speaking */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Public Speaking Experience</label>
          <input
            id="PublicSpeakingExperience"
            name="PublicSpeakingExperience"
            value={formData.PublicSpeakingExperience}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium focus:bg-white focus:border-cta/20 outline-none transition-all"
          />
        </div>

        {/* Transportation Dropdown */}
        <div className="group flex flex-col gap-2 relative">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Personal Transportation</label>
          <div onClick={() => handleDropdownClick(16)} className="relative">
            <Icon icon="solar:bus-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
              <span>{formData.PersonalTransportationAvailability || 'Availability?'}</span>
              <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
            </div>
          </div>
          {dropdownMenu === 16 && (
            <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden mt-2">
              <li onClick={() => handleSelectOption('Yes', 'PersonalTransportationAvailability')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">Yes</li>
              <li onClick={() => handleSelectOption('No', 'PersonalTransportationAvailability')} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium list-none">No</li>
            </div>
          )}
        </div>

      </div>

      {/* Final Action Buttons */}
      <div className="mt-16 flex items-center justify-between gap-6 border-t border-gray-100 pt-10">
        <button 
          onClick={toggleFourth} 
          className="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
        >
          <Icon icon="solar:arrow-left-bold" width="20" />
          Back
        </button>









































































































































        

        <button 
          onClick={Submit}
          className="px-12 py-3 bg-cta text-white rounded-xl font-black text-xl hover:shadow-[0_20px_40px_rgba(92,190,143,0.4)] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default AdditionalInformation;
