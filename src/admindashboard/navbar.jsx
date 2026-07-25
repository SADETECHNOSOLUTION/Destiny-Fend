import React,{useState,useEffect} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = ()=>{
    return(
        <div className="p-4">
        <div className="bg-gradient-to-br rounded-md flex items-center justify-between px-6 from-span-start to-span-end h-16">
            <div>
                <div className="">
          <div className="flex rounded-lg">
                <img src="logo.png" className="rounded w-48 h-10" />
                </div>
                </div>            </div>
            <div className="flex w-1/3 items-center gap-4">
                           <div className="flex items-center w-full gap-4">
                                                        <div className="relative border-2 rounded-xl bg-white w-full px-8"><input className=" h-8 w-full outline-none" /><Icon className="absolute text-gray-400 left-3 cursor-pointer top-2" icon="tdesign:search" /></div>

                                     </div>
                                     <Icon icon="mdi:bell" className="w-6 h-6 text-white" />
                                     <Icon icon="material-symbols:settings-rounded" className="w-6 h-6 text-white" />
            </div>
  
        </div>
        </div>
    )
}

export default Navbar;