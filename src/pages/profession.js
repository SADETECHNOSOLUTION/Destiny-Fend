import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";


const Profession = ()=>{
    const navigate = useNavigate()
    const openProfessiontype = ()=>{
        navigate('/profession/professiontype')
    }
    return(
        <div>
                        <div className="flex flex-col max-w-[30rem] items-center justify-center gap-6">
                <img className="w-72 h-64 mt-16"  alt="" src='profession.png' />
                <div className="text-center">
                <p className="text-lg font-semibold">Create your first Project </p>
                <span className="text-xs">Fortunately, it's easy to create new one. </span>
                </div>
                <button onClick={openProfessiontype} className="px-3 py-2 text-sm text-white rounded-md flex items-center bg-cta">
                <Icon icon="si:add-duotone" width="20" height="20" /> Create Profile
                </button>
             </div> 
        </div>

    )
}

export default Profession;;