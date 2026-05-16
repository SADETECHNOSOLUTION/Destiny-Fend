import React,{useState} from "react"
import Navbar from "../components/navbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router"

const ProfessionType = ()=>{
    const [selectedOption, setSelectedOption] = useState("");
        const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();

    const roles = [
        {
            id:1,
            name:'Story/Script Writing',
            subroles:[{
              id:1,
              name:'Story Writer / Concept Creator'
            },{
              id:2,
              name:'Treatment Writer'
            },
          {
              id:3,
              name:'Synopsis Writer'
            },
          {
              id:4,
              name:'Character Bible Writer'
            },
            {
              id:6,
              name:'Franchise / Universe Writer'
            },
            {
              id:5,
              name:'Outliner / Beat Sheet Writer'
            },
            {
              id:7,
              name:'Pitch Writer'
            },
            {
              id:8,
              name:'World-Building Consultant'
            },
            {
              id:9,
              name:'Theme Consultant'
            },
            {
              id:10,
              name:'Concept Researcher'
            },
            {
              id:11,
              name:'Subject Matter Expert (SME)'
            },
            {
              id:12,
              name:'Character Arc Specialist'
            },
            {
              id:13,
              name:'Idea Generator / Concept Contributor'
            }]
        },
                {
            id:1,
            name:'Direction'
        },
                {
            id:1,
            name:'Production'
        },                {
            id:1,
            name:'Actor'
        },
                {
            id:1,
            name:'Cinematography'
        },
                {
            id:1,
            name:'Editing'
        },
                {
            id:1,
            name:'Sound recording'
        },
                {
            id:1,
            name:'Dubbing'
        },
                {
            id:1,
            name:'Music direction'
        },
                {
            id:1,
            name:'Lyricis Writing'
        },
        
                {
            id:1,
            name:'Playback Singing'
        },
                {
            id:1,
            name:'Choreography'
        },
                {
            id:1,
            name:'Stunt Direction'
        },
                {
            id:1,
            name:'Costume Designing'
        },
                {
            id:1,
            name:'Makeup and Hairstylist'
        },
                {
            id:1,
            name:'Subtitles and Dubbing'
        },
                {
            id:1,
            name:'Lighting'
        },
    ]

    const handleOptionChange = (name) => {
        setSelectedOption(name); // Update the state based on radio button selection
      };

      
    const handleRoleChange = (name) => {
        setSelectedRole(name); // Update the state based on radio button selection
      };

    const openForm = ()=>{
        navigate(`${selectedOption}/Personal`)
    }

    return(
        <div>
            <Navbar />
         {/* <div className="w-full mt-4 items-center flex items-center justify-between px-4">
         <span>Profession</span>
         <span className="flex items-center gap-2"><Icon className="text-cta" icon="mdi:clock-outline" width="24" height="24" /><span>Last updated: 09:10:13</span></span>
         </div> */}
<div style={{ height: 'calc(100vh - 65px)' }} className="flex items-center bg-gray-50">
  {/* Left Sidebar - Added subtle gradient and shadow */}
  <div className="flex w-1/4 h-full flex-col items-center bg-gradient-to-t from-cta to-cta py-8 gap-4 shadow-xl">
<Icon icon="ion:person-circle" width="150" height="196"  style={{color:' #fff'}} />
  </div>

  {/* Main Content Area */}
  <div className="flex w-3/4 relative h-full flex-col p-12 gap-10">
    <div className="space-y-2">
      <h2 className="font-extrabold text-3xl tracking-tight text-gray-800">
        Select Your Department
      </h2>
      <p className="text-gray-500">Choose the area that best fits your expertise.</p>
    </div>

    {/* Roles Container */}
    <div className="flex flex-wrap gap-4">
      {roles.map((role) => {
        const isActive = selectedOption === role.name;
        return (
          <div
            key={role.id}
            onClick={() => handleOptionChange(role.name)}
            className={`
              group relative px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out border-2
              ${isActive 
                ? 'bg-cta border-cta shadow-lg scale-105 -translate-y-1' 
                : 'bg-white border-gray-100 hover:border-cta/30 hover:shadow-md hover:-translate-y-0.5'}
            `}
          >
            <span className={`
              text-lg font-bold transition-colors
              ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-cta'}
            `}>
              {role.name}
            </span>
            
            {/* Subtle indicator dot for active state */}
            {isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full animate-pulse" />
            )}
          </div>
        );
      })}
    </div>

{ selectedOption&&
<div className="space-y-4">
  <span className="font-extrabold px-2 text-3xl tracking-tight text-gray-800">Select your Subrole</span>
<div className="flex flex-wrap gap-4">
      {roles?.map((role) => {
        const isActive = selectedRole === role.name;
        return (
          <div key={role.id}>
       {role.name===selectedOption &&  
       <div className="flex flex-wrap gap-6">
      {role?.subroles?.map((subrole)=>
      (
<div
            onClick={() => handleRoleChange(subrole.name)}
            className={`
              group relative px-4 py-2 rounded-2xl cursor-pointer transition-all duration-300 ease-out border-2
              ${selectedRole === subrole.name 
                ? 'bg-cta border-cta shadow-lg scale-105 -translate-y-1' 
                : 'bg-white border-gray-100 hover:border-cta/30 hover:shadow-md hover:-translate-y-0.5'}
            `}
          >
            <span className={`
              text-sm font-bold transition-colors
              ${selectedRole === subrole.name ? 'text-white' : 'text-gray-700 group-hover:text-cta'}
            `}>
              {subrole.name}
            </span>
            
            {/* Subtle indicator dot for active state */}
            {isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full animate-pulse" />
            )}
          </div>
      ))}
          </div>}
        </div>);
      })}
    </div>
    </div>}


{selectedOption&& selectedRole && <div className="absolute bottom-8 right-24 bg-cta rounded-lg py-2 px-4 text-lg cursor-pointer">
     <span className="text-white font-semibold">Submit</span>
    </div>}
  </div>
</div>
     
        </div>
    )
}

export default ProfessionType;