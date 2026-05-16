import React from "react"
import Navbar from "../components/navbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useNavigate } from "react-router"

const ProfessionPage = ()=>{
    const navigate = useNavigate();

    const openProfessionType = ()=>{
        navigate('/Profession/Professiontype')
    }
    return(
        <div>
            <Navbar />
         <div className="w-full mt-4 items-center flex items-center justify-between px-4">
         <span>Profession</span>
         <span className="flex items-center gap-2"><Icon className="text-cta" icon="mdi:clock-outline" width="24" height="24" /><span>Last updated: 09:10:13</span></span>
         </div>
         
         <div style={{ height: 'calc(100vh - 90px)'}} className="flex items-center justify-center">
             <div className="flex flex-col items-center justify-center gap-6">
                <img alt="" src='profession.png' />
                <div className="text-center">
                <p className="text-lg font-semibold">Create your first Project </p>
                <span className="text-xs">Fortunately, it's easy to create new one. </span>
                </div>
                <button onClick={openProfessionType} className="px-3 py-2 text-white rounded-md flex items-center bg-cta">
                <Icon icon="si:add-duotone" width="20" height="20" /> Create Profile
                </button>
             </div>
         </div>
     
        </div>
    )
}

export default ProfessionPage;