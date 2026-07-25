import React,{useState,useEffect,useRef,useMemo} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector,useDispatch } from "react-redux";
import { setFormData,addToPortfolio,resetFormData } from "../slices/professionformslice";
import { useNavigate } from "react-router";

const PhysicalAttributes = ()=>{
  const fileInputRef = useRef(null);
    const userId = useSelector((state)=>state.auth.userId)
        const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
      const [activeSection,SetActiveSection] = useState(2);
      const {selectedDepartment} = useSelector((state)=>state.department)
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

      const Roles=[
        {id:1,
          name:'Story Development',
          subrole:[
        {id:1,role:'Story Development'},
        {id:2,role:'Screenplay Writing'},
                {id:3,role:'Dialogue & Detailing'},
                      {id:4,role:'Script Refinement'},
                         {id:5,role:'Support Roles'},
                             {id:6,role:'Research & Consulting'},
                                            {id:7,role:'Specialized / Genre Writers'},
                         {id:8,role:'Franchise / Continuity Roles'},
                        {id:9,role:'Cross-Media / Expansion Writing'},
                        {id:10,role:'Archival / Restoration Writing'},     
          ]
        },
                {id:2,
          name:'Director',
          subrole:[
        {id:1,role:'Director'},
        {id:2,role:'Creative Direction'},
                {id:3,role:'Associate Direction'},
                      {id:4,role:'Assistant Direction'},
                         {id:5,role:'Direction Support Team'},
                             {id:6,role:'Unit Direction Roles'},
                                            {id:7,role:'Special Direction Roles'},
                         {id:8,role:'Post-Production Direction'},
                        {id:9,role:'Research/Consulting'},
                        {id:10,role:'Emerging/Future Roles'},     
          ]
        },
                        {id:3,
          name:'Producer',
          subrole:[
        {id:1,role:'Producer'},
        {id:2,role:'Showrunning & Supervising'},
                {id:3,role:'Production Management'},
                      {id:4,role:'Assistant Production'},
                         {id:5,role:'Finance & Legal'},
                             {id:6,role:'Scheduling & Logistics'},
                                            {id:7,role:'Casting (Production-side)'},
                         {id:8,role:'Post-Production Producing'},
                        {id:9,role:'Specialized Producers'},
                        {id:10,role:'Research & Development'},    
                         {id:11,role:'Emerging / Future Roles'}, 
          ]
        }
          
      ]
	
       const [selectedSubRole, setSelectedSubRole] = useState("");

  const subRoles = useMemo(() => {
    if (!selectedDepartment) return [];
    const match = Roles.find(
      (r) =>
        r.name.toLowerCase().trim() ===
        selectedDepartment.name.toLowerCase().trim()
    );
    return match?.subrole || [];
  }, [selectedDepartment]);

  console.log(subRoles)
// 
	
	
// 	
	
// 	
	
// 	
	
// 
	
// 	
	
// 	Associate Direction
	
// 	Assistant Direction
	
// 	Direction Support Team
	
// 	Unit Direction Roles
	
// 	Special Direction Roles

// 	Post-Production Direction
	
// 	Research/Consulting
	
// 	Emerging/Future Roles
	
// production	Producer
	
// 	Showrunning & Supervising
	
// 	Production Management
	
// 	Assistant Production
	
// 	Finance & Legal
	
// 	Scheduling & Logistics
	
// 	Casting (Production-side)
	
// 	Post-Production Producing
// 	Specialized Producers
	
// 	Research & Development

// 	Emerging / Future Roles
	
// cinemotography	Director of Photography (DoP)
		
// 	Camera Department

// 	Lighting / Electrical
	
// 	Grips Department
	
// 	Digital Imaging & Video
	
// 	Specialty Units
	
// 	Lab, Color & Processing
	
// 	Support & Utilities (India)

// Editing	Editor / Chief Editor
	
// 	Supervising Editing Producer / Creative Director (Post)
	
	
// 	Assistant Editors (AEs)
	
// 	Offline & Online Editing
	
	
// 	Dialogue & Sound Editing

// 	VFX & Conform Editing

// 	DI / Finishing & Graphics

// 	Promo & Marketing Editing

// 	Indian Cinema – Traditional
// 	Indian Cinema – Traditional
	
// 	Data & Media Management

	
// 	Editorial Support (India)

// 	Broadcast / Live Editing

// 	Restoration & Archival

// 	Modern Digital & Outsourcing

// 	Future & Emerging

	
// 	On-Set / Dailies Editing

// 	QC / Technical

// sound Recording	Production Sound Mixer / Sound Designer

// 	Live Recording Head
	
	
// 	ADR & Dubbing Department

// 	Foley Department

// 	Sound Effects & Editing

// 	Re-Recording / Mixing

// 	Music Direction (India + Global)

// 	Studio & Technical

// 	Advanced / Immersive Sound

// 	Management & Archival

// 	Specialized / Rare Roles

// Dubbing	Dubbing / ADR Director

// 	Voice Actor / Dub Artist

// 	ADR / Dialogue Editor

// 	Dialogue Writer / Script Adapter

// 	Casting Director (Voice / ADR)

// 	ADR / Looping Supervisor

// 	Mixing / Re-recording Engineer
	
// 	Foley Artist (ADR context)
	
// 	Language / Dialect Consultant
	
// 	ADR Technical Supervisor / Studio Engineer

// 	ADR Recordist / Sound Recordist

// 	ADR Coordinator (Production Role
// 	Loop Group / Ensemble Coordinator
	
// 	ADR Quality Control / Proof Listener
	
// 	ADR Localization Manager (Indian cinema focus)
	
// 	ADR Studio Manager / Production Manager
	
// 	ADR Supervisor (High-level oversight)
	
// 	ADR Sound Designer
	
// 	ADR Archivist / Data Manager

// 	Animation / Game-specific ADR Roles

// 	Global / Niche ADR Roles

// 	Indian Cinema Niche Roles

// Music direction	Music Director / Composer

// 	Lyricist / Songwriter

// 	Arranger / Orchestrator

// 	Conductor

// 	Music Programmer / Sound Designer

// 	Session Musicians / Instrumentalists

// 	Vocalist / Singer

// 	Music Producer

// 	Music Editor

// 	Soundtrack Coordinator / Music Supervisor

// 	Recording Engineer

// 	Mixing & Mastering Engineer

// 	Choreographer (Music-linked)

// 	Music Copyist / Notation Expert

// 	Music Coordinator / Planner
	
	
// 	Foley / Special Music Effects
	
	
// 	Ethnomusicologist / Cultural Consultant
	
// 	Orchestra Librarian
	
// 	Music Technology Specialist
	
	
// 	Adaptive Music Designer
	
// 	Soundtrack Marketing / Liaison
	
// 	Music Historian / Archivist
	
// 	Choir Arranger / Vocal Director
	
// 	Instrument Builder / Tuner Specialist
	
// 	Orchestral Contractor
	
// 	Music Copy Editor / Proofreader
	
// 	Beat / Rhythm Consultant
	
// 	Music QA / Technical Supervisor
	
// 	Music Localization Specialist
	
// 	Music Ethicist / Legal Advisor
	
// 	Music VR / Spatial Audio Designer
	
// 	Interactive / Game Music Designer
	
// 	Music Data Analyst
	
// 	Music Visualizer / Animator
	
// 	Music Librarian (Digital Archive)
	
// 	Regional Music Director (Indian cinema)
	
// 	Instrument Repair / Maintenance Specialist
	
// 	Recording Studio Coordinator
	
// 	Music Event Coordinator
	
// 	Orchestra Section Leader
	
// 	Vocal Arranger (Multi-language)
	
// 	Music AI Specialist
	
// 	Music Transcriber / Notation Consultant
	
// 	Live Performance Conductor
// 	Music Integration Engineer
	
// 	Cultural Instrument Custodian
// 	On-Set Playback Coordinator
// Lyrics Writing	Head Lyricist / Chief Songwriter
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
// Playback Singing	Playback Singer
	
	
	
	
	
	
	
// 	Vocal Coach / Trainer
	
	
	
	
	
	
	
	
	
// 	Background / Chorus Coordinator
	
	
	
	
// 	Recording Artist / Studio Vocalist
	
	
	
	
	
	
	
	
	
// 	Song Stylist / Vocal Arranger
	
	
	
	
// 	Voice Director / Music Director Liaison
	
	
// 	Lyric Interpreter / Pronunciation Specialist
	
// 	Live Performance Vocalist
	
	
// 	Vocal Sound Designer
// 	Recording Session Coordinator
// 	Sound Engineer (Vocals)
	
// 	Live Recording Engineer (On-Set)
// 	Vocal Script Supervisor
// 	Promotional Singer / Jingle Artist
// 	On-Set Playback Coordinator
// 	Vocal Metadata / Cataloging Specialist
// 	Voice Restoration / Repair Specialist
// Choreography	Choreographer / Dance Director
		
// 	Assistant Choreographer
	
// 	Background / Ensemble Choreography

// 	Fight / Action Choreography
	
	
// 	Music-Dance Integration
	
// 	Cultural / Traditional Dance
// 	Specialized / Technical Roles
	
	
	
	
	
	
	
	
	
	
	
// 	Rehearsal & Training Roles
	
	
	
	
	
	
// 	Filming Support Roles
	
	
	
	
	
// Stunt Direction	Stunt Coordinator / Action Director
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
// 	Stunt Designer / Stunt Conceptual Designer
// 	Second Unit Director (Action)
	
	
	
	
	
	
	
	
// 	Action Supervisor / Stunt Supervisor
// 	Safety Coordinator (Head of Stunt Safety)
	
	
	
	
	
	
// 	Head of Stunt Training / Stunt School Liaison
// 	Director of Stunt Pre-Visualization
	
	
	
	
	
	
	
	
// Costume Designing	Costume Designer
	
	
	
	
	
// 	Costume Design Director
// 	Costume Department Head
// 	Wardrobe Supervisor
// 	Costume Stylist
	
// 	Props & Accessories Coordinator
// 	Costume Cutter / Tailor
	
// 	Fabric / Material Specialist
// 	Costume Concept Artist / Illustrator
// 	Historical Costume Researcher
// 	Vintage / Antique Costume Specialist
// 	Costume Supervisor for Dance Sequences
// 	Costume Visual Effects Coordinator
// 	Character Wardrobe Consultant
// 	3D / Digital Costume Designer
// 	Costume Colorist / Dye Specialist
// 	Stunt / Action Costume Specialist
// 	Stunt Wardrobe Specialist
// 	Costume Safety Coordinator
// 	Makeup & Costume Integration
// 	Costume Buyer / Procurement Assistant
// 	Fitting Coordinator
// 	On-set Costume Coordinator
// 	Wardrobe Runner / On-set Costume Assistant
// 	Wardrobe Logistics Assistant
// 	Costume Maintenance Crew
// 	Costume Props Handler
// 	Regional / Traditional Costume Expert
// 	Embroidery / Embellishment Specialist
// 	Fabric Aging / Distressing Technician
// 	Costume Documentation / Archivist
// 	Wardrobe Photographer
// 	Costume Research Librarian / Reference Curator
// 	Costume Fitting Model / Stand-in
// 	Costume Pattern Grader / Cutter
// 	Textile Conservation Specialist
// 	Costume Assistant for Animation / Motion Capture
// 	Costume Technology Specialist
// 	Costume Sustainability / Eco Consultant
// 	Wardrobe Call Sheet Coordinator
// 	Costume QA / Quality Control Specialist
// 	Regional Textile / Weaving Consultant
// 	Costume Training Specialist
// Makeup & Hairstyling	Makeup Designer / Head Makeup Artist

	
// 	Hairstylist / Hair Designer

	
// 	Makeup & Hair Coordinator
// 	Makeup & Hair Continuity Supervisor
// 	Prosthetics & Special Effects Team
	
	
// 	Extras / Background Makeup Artist
// 	Makeup Effects Supervisor
// Subtitles & Dubbing (Localization)	Dubbing Director / Voice Director

// 	Localization Supervisor / Coordinator

// 	Voice Casting Director

	
// 	Dubbing Artist / Voice Actor

// 	Subtitling Supervisor / Coordinator

// 	Quality Control Specialist
// 	Transcriptionist
// 	ADR Mixer / Engineer
// 	Project Manager / Coordinator
	
	
// Lighting 	Director of Photography (DoP / Cinematographer)
	
	
	
// 	Chief Lighting Director / Gaffer
	
	
	
	
	
	
	
	
	
// 	Lighting Operations Head
	
	
	
	
	
// 	Lighting Design & Visualization Director
	
	
	
	
	
	
	
// 	Lighting Logistics & Equipment Head
	
	
	
	
	
// 	Lighting Safety & Compliance Head
	
	
	
	
// 	Lighting Data & Technical Integration Head
	
	
	
// 	Lighting Sustainability & Development Head
	
	
	
// 	Chief Lighting Supervisor (India)
	
	
	
	
	
// 	Virtual / LED Lighting Head
	
	
	
	
// 	Lighting Art & Creative Integration Head
	
	
	
// 	Emerging / Future Roles
	
	
	
	
	
	
	
	
      
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
<div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center font-sans pb-20">
  
  {/* 1. Header Stepper with home.avif */}
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
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Role Selection Group (Refactored for consistency) */}
        <div className="group flex flex-col gap-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">Main Role</label>
          <div className="relative">
            <Icon icon="solar:ranking-bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
            <div 
              onClick={() => handleDropdownClick(16)}
              className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer focus-within:bg-white focus-within:border-cta/20 transition-all flex items-center"
            >
              {formData.Portfolio.length > 0 ? formData.Portfolio.map(f => f.name).join(', ') : 'Select Main Role'}
              <Icon icon="solar:alt-arrow-down-bold" className="absolute right-4 text-cta" width="18" />
            </div>
          </div>
          
          {/* Conditional Sub-role Select - Styled to match */}
          {subRoles.length > 0 && (
            <select
              value={selectedSubRole}
              onChange={(e) => setSelectedSubRole(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-white border-2 border-cta/20 rounded-xl text-sm font-medium focus:ring-4 focus:ring-cta/5 outline-none transition-all"
            >
              <option value="">Select Subrole</option>
              {subRoles.map((s) => <option key={s.id} value={s.role}>{s.role}</option>)}
            </select>
          )}
        </div>

        {/* Dynamic Inputs Generation */}
        {[
          { label: 'DISTINCTIVE features', id: 'Reference', icon: 'solar:user-speak-bold' },
          { label: 'TATTOOS', id: 'SocialMediaReach', icon: 'solar:users-group-two-rounded-bold' },
          { label: 'HEIGHT', id: 'EquipmentPropsOwned', icon: 'solar:clapperboard-edit-bold' },
          { label: 'WEIGHT', id: 'SpecialRequirements', icon: 'solar:mask-happly-bold' },
          { label: 'BODYTYPE', id: 'MedicalConditions', icon: 'solar:document-text-bold' },
          { label: 'EYE COLOR', id: 'CareerGoals', icon: 'solar:global-bold' },
          { label: 'CLOTHING SIZE', id: 'HobbiesandInterests', icon: 'solar:settings-bold' },
          { label: 'VOICE TYPE', id: 'PublicSpeakingExperience', icon: 'solar:copy-bold' },
        ].map((field) => (
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

        {/* Dropdown Question - Technique/Proficiency */}
        {[
          { label: 'Are you comfortable with...', id: 'PersonalTransportationAvailability', icon: 'solar:smile-circle-bold' },
          { label: 'Experience in Techniques?', id: 'TechniqueExp', icon: 'solar:magic-stick-3-bold' },
          { label: 'Vocal range', id: 'FrameworkExp', icon: 'solar:music-note-bold' },
          { label: 'Software Proficiency', id: 'SoftwareExp', icon: 'solar:laptop-minimalistic-bold' },
          { label: 'Proofreading Skills?', id: 'ProofreadingExp', icon: 'solar:check-read-bold' },
          { label: 'Collaboration Tools', id: 'CollabTools', icon: 'solar:link-bold' },
        ].map((drop) => (
          <div key={drop.id} className="group flex flex-col gap-2 relative">
            <label className="text-xs font-black text-gray-400 uppercase tracking-tighter ml-1 group-focus-within:text-cta">{drop.label}</label>
            <div 
              onClick={() => handleDropdownClick(drop.id === 'PersonalTransportationAvailability' ? 16 : 99)} 
              className="relative"
            >
              <Icon icon={drop.icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-cta" width="20" />
              <div className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition-all flex items-center justify-between">
                <span>{formData[drop.id] || 'Select Option'}</span>
                <Icon icon="solar:alt-arrow-down-bold" className="text-cta" width="18" />
              </div>
            </div>
            {/* Standardized Dropdown Menu */}
            {dropdownMenu === 16 && drop.id === 'PersonalTransportationAvailability' && (
              <div className="absolute top-[100%] left-0 w-full bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {['Yes', 'No'].map(opt => (
                  <div key={opt} onClick={() => handleSelectOption(opt, drop.id)} className="px-5 py-3 hover:bg-cta hover:text-white cursor-pointer transition-colors text-sm font-medium">
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. Action Buttons */}
      <div className="flex items-center justify-between gap-6 border-t border-gray-100 pt-10">
        <button 
          onClick={toggleFirst} 
          className="px-8 py-4 border-2 border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center gap-2"
        >
          <Icon icon="solar:arrow-left-bold" width="20" />
          Back
        </button>

        <button 
          onClick={Submit}
          className="px-12 py-4 bg-cta text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cta/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
        >
          Next step
        <Icon icon="solar:arrow-right-bold" width="22" />
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default PhysicalAttributes;