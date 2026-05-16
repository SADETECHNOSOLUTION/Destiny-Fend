import React,{useState} from "react";

const Basicdetails = ({nextStep})=>{
  const [showLanguagePopup,setShowLanguagePopup] = useState(false)
  const [languagesList,setLanguagesList] = useState([])
  const [languageName,setLanguageName] = useState('')
  const [languagePercentage,setlanguagePercentage] = useState('')
    return(
        <div>
               <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full text-sm placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 -lg px-2 py-2  focus:focus:border-b-cta focus:outline-none"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Address
            </label>
            <input
              type="address"
              placeholder="Your address"
              className="w-full placeholder:text-sm border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-b-cta"
            />
          </div>

<div className="flex justify-between -black gap-2 items-center">
  <label className="block text-sm font-semibold text-gray-600">
    Languages Known
  </label>
        <span   onClick={() => setShowLanguagePopup(true)} className="w-6 h-6 flex justify-center items-center rounded-full bg-cta text-xl text-white">+</span>
  </div>
  {showLanguagePopup && (
  <div className="fixed inset-0 z-50 flex items-end">
    <div
      className="absolute inset-0 bg-black bg-opacity-40"
      onClick={() => setShowLanguagePopup(false)}
    ></div>

    {/* Bottom Sheet */}
    <div className="relative w-full bg-white rounded-t-2xl p-5 animate-slideUp">
      
      <h3 className="text-sm font-semibold mb-4">Add Language</h3>
      <input
        type="text"
        placeholder="Language Name"
        value={languageName}
        onChange={(e) => setLanguageName(e.target.value)}
        className="w-full placeholder:text-sm border-b border-gray-300 py-2 mb-4 outline-none focus:border-cta"
      />

      <input maxLength={3}
        type="tel"
        placeholder="Proficiency %"
        value={languagePercentage}
        onChange={(e) => setlanguagePercentage(e.target.value)}
        className="w-full placeholder:text-sm border-b border-gray-300 py-2 mb-6 outline-none focus:border-cta"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowLanguagePopup(false)}
          className="flex-1 py-2 rounded-lg bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!languageName || !languagePercentage) return;

            setLanguagesList((prev) => [
              ...prev,
              { name: languageName, year: languagePercentage },
            ]);

            setLanguageName("");
            setlanguagePercentage("");
            setShowLanguagePopup(false);
          }}
          className="flex-1 py-2 rounded-lg bg-cta text-white"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}
<div className="flex flex-wrap gap-2">
  {languagesList.map((award)=>(
    <div className="px-2 py-1 bg-cta text-sm rounded-md text-white w-max">
     {award.name}   ({award.year}%)      <span>✕</span>
      </div>
  ))}
</div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Short Bio
            </label>
            <textarea
              rows="4"
              placeholder="Write a short professional summary..."
              className="w-full placeholder:text-sm border border-gray-300 -lg px-2 py-2 rounded-lg focus:border-cta focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex item-center gap-6">
                    <button
            className="w-full bg-gray-100 text-black py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
           Back
          </button>
          <button
            onClick={nextStep}
            className="w-full bg-cta text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
           Next
          </button>
          </div>


        </form>
        </div>
    )
}

export default Basicdetails;