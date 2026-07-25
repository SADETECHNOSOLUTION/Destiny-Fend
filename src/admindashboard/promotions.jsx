import React from "react";
import { Icon } from '@iconify/react';

const Promotions = ()=>{
    return(
        <div className="p-4 gap-10 flex items-center">
        <div className="bg-white/70 shadow-lg  py-4 p-4 w-1/3 rounded-xl">
        <span className="font-semibold text-lg">Create a promotion</span>
        <div className="flex flex-col mt-3 gap-2">
        <span className="text-gray-600">Name</span>
       <input className=" border-b mb-6 bg-white/0 border-b-gray-400 outline-none" />
        </div>


        <div className="bg-gray-100 rounded-xl flex items-center justify-center h-32">
        <span className="text-sm">Add a banner</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
        <span className="text-gray-600">Call to action Button</span>
        <input className=" border-b bg-white/0 border-b-gray-400 outline-none" />
        </div>
                <div className="flex flex-col gap-2 mt-4">
        <span className="text-gray-600">Link</span>
        <div className="border-b relative border-b-gray-400">
        <input className=" px-7 bg-white/0 outline-none" />
<Icon icon="heroicons:link" className="w-4 h-4 text-gray-400 absolute top-1 left-1" />
        </div>
        <button className="h-11 mt-4 rounded-lg bg-cta flex items-center justify-center text-white">
        <span className="font-semibold">Post Ad</span>
        </button>

        </div>

        </div>
        <div className="bg-white/70 h-[31rem] shadow-lg p-4 flex-1 rounded-xl">
        <span className="font-semibold text-lg">Promotions</span>
        <div className="w-full flex flex-col mt-4">
        <div className="relative border3 shadow-lg w-full">
        <img className="rounded-xl w-full h-40" src="promo.jpg" />
        <div className="absolute bg-white cursor-pointer rounded-tr-lg rounded-bl-lg px-3 py-1 shadow-lg flex items-center top-0 right-0 ">
        <span className="text-sm">Remove</span>
<Icon icon="material-symbols:close-rounded" className="w-4 h-4" />        </div>
        </div>
        </div>
        </div>
        </div>

    )
}


export default Promotions;