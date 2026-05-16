import React from "react";

const Social = ({nextStep,prevStep})=>{
    return(
        <div>
               <form className="space-y-4 relative h-[36rem]">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Facebook
            </label>
            <input
              type="text"
              placeholder="Add link"
              className="w-full text-sm placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Twitter
            </label>
            <input
              type="email"
             placeholder="Add link"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Instagram
            </label>
            <input
              type="number"
             placeholder="Add link"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Youtube
            </label>
            <input
              type="address"
              placeholder="Add link"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-b-cta"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Drive 
            </label>
            <input
              type="address"
              placeholder="Add link"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-b-cta"
            />
          </div>
          {/* Portfolio Link */}


          {/* Bio */}

          {/* Submit Button */}
          <div className="flex absolute bottom-0 w-full item-center gap-6">
                    <button onClick={prevStep}
            className="w-full bg-gray-100 text-black py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
           Back
          </button>
          <button
            onClick={nextStep}
            className="w-full bg-cta text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
           Submit
          </button>
          </div>


        </form>
        </div>
    )
}

export default Social;