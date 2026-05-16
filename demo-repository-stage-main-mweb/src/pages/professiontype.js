import React,{useState} from "react"
import { useNavigate } from "react-router"
import { useDispatch,useSelector } from "react-redux"
import {addRole} from '../slices/roleformslice'
import { Icon } from "@iconify/react/dist/iconify.js"

const ProfessionType = ()=>{
    const [selectedOption, setSelectedOption] = useState("");
        const [selectedRole, setSelectedRole] = useState("");
        const [showRoles,setShowRoles] = useState(false);
        const [showOptions,setShowOptions] = useState(true);
         const [step, setStep] = useState(2);

    const navigate = useNavigate();
    const dispatch= useDispatch();
    const Role = useSelector((state)=>state.roleform.role)

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
  const steps = [1, 2];

    const openFormDisplay = ()=>{
        navigate('/profession/form')
    }

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
<div style={{ height: 'calc(100vh - 65px)' }} className="flex items-center bg-gray-50">

  {/* Main Content Area */}
  <div className="flex max-w-[30rem] relative h-full flex-col p-5 gap-2">


{showOptions&& 
<div className="space-y-4">
    <div className="space-y-1">
      <h2 className="text-lg font-bold tracking-tight text-gray-800">
        Select Your Department
      </h2>
    </div>
       <div className="flex flex-wrap gap-4">
      {roles.map((role) => {
        const isActive = selectedOption === role.name;
        return (
          <div
            key={role.id}
            onClick={() => handleOptionChange(role.name)}
            className={`
              group relative px-2 py-1 rounded-2xl cursor-pointer transition-all duration-300 ease-out border-2
              ${isActive 
                ? 'bg-cta border-cta shadow-lg scale-105 -translate-y-1' 
                : 'bg-white border-gray-100 hover:border-cta/30 hover:shadow-md hover:-translate-y-0.5'}
            `}
          >
            <span className={`
              text-sm font-semibold transition-colors
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
    </div>
}
{ showRoles&&
<div className="space-y-4">
    <div className="flex items-center gap-1">
             <Icon style={{color:'#05ABB6'}} icon="oui:app-users-roles" width="24" height="24" />
  <span className="text-lg px-2 font-bold tracking-tight text-gray-800">Select your Subrole</span>
        </div>

<div className="flex flex-wrap gap-2">
      {roles?.map((role) => {
        const isActive = selectedRole === role.name;
        return (
          <div key={role.id}>
       {role.name===selectedOption &&  
       <div className="flex flex-wrap gap-4">
      {role?.subroles?.map((subrole)=>
      (
<div onClick={() => handleRoleChange(subrole.name)}
            className={`
              group relative px-2 py-1 rounded-2xl cursor-pointer transition-all duration-300 ease-out border-2
              ${selectedRole === subrole.name 
                ? 'bg-cta border-cta shadow-lg scale-105 -translate-y-1' 
                : 'bg-white border-gray-100 hover:border-cta/30 hover:shadow-md hover:-translate-y-0.5'}
            `}
          >
            <span className={`
              text-xs font-semibold transition-colors
              ${selectedRole === subrole.name ? 'text-white' : 'text-gray-700 group-hover:text-cta'}
            `}>
              {subrole.name}
            </span>
            
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

{selectedOption && showOptions && <div className="absolute bottom-8 right-24 bg-cta rounded-full  cursor-pointer">
     <span onClick={()=>{setShowRoles(true);setShowOptions(false)}} className="text-white font-semibold">Submit</span>
    </div>}

{selectedRole && <div className="absolute bottom-28 right-8 bg-cta rounded-full h-11 w-11 flex items-center justify-center p-1 cursor-pointer">
     <Icon style={{color:'#fff'}} onClick={()=>{dispatch(addRole(selectedRole));openFormDisplay()}} icon="grommet-icons:link-next" width="16" height="16" />
    </div>}
  </div>
</div>
    </div>
    )
}

export default ProfessionType;