import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Createjob = ()=>{
return(
    <div style={{backgroundImage:'url(job.jpg)'}} className="w-full h-48 shadow-lg flex flex-col items-center justify-center rounded-md">
    <div className="w-1/2 flex flex-col gap-4 items-center justify-center text-center">
        <div>
        </div>
        
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white"><Icon className="text-cta w-6 h-6" icon="fluent:briefcase-search-20-regular" /></div>
        <span className="text-sm font-semibold text-white">Create a new Job post to hire Talented Crew</span>


        <button className="bg-cta text-white font-semibold text-sm py-1 px-2 rounded-md">Post Job</button>
    </div>
    </div>
)
}

export default Createjob;
