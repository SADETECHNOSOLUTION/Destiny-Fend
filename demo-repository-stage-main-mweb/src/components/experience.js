import React,{useState} from "react";

const Experience = ({nextStep,prevStep})=>{

   const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    role: "",
    image: null
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFormnat,setFormatOpen] = useState(false);
  const [openMovies,setOpenMovies] = useState(false);
  const [selectedMovies,setSelectedMovies] = useState([]);
const [upcomingWorksList, setUpcomingWorksList] = useState([]);
const [showAwardPopup, setShowAwardPopup] = useState(false);
const [awardName, setAwardName] = useState("");
const [awardYear, setAwardYear] = useState("");
const [awardsList, setAwardsList] = useState([]);

  const handleAddUpcomingWork = () => {
  if (!upcomingWork.trim()) return;

  setUpcomingWorksList((prev) => [...prev, upcomingWork.trim()]);
  setUpcomingWork(""); // clear input
};

const removeUpcomingWork = (indexToRemove) => {
  setUpcomingWorksList((prev) =>
    prev.filter((_, index) => index !== indexToRemove)
  );
};

  const Movies = [{
    id:1,
    name:'Mask',
    img:'mask.webp',
    year:'2025'
  },{
    id:2,
    name:'Mass',
    img:'mass.jpg',
    year:'2017'
  },{
    id:3,
    name:'Master',
    img:'master.webp',
    year:'2025'
  },
]
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

    const toggleFormats = (genre) => {
    if (selectedFormats.includes(genre)) {
      setSelectedFormats(selectedFormats.filter((g) => g !== genre));
    } else {
      setSelectedFormats([...selectedFormats, genre]);
    }
  };
    const formats = [
  "Films",
  "Web series",
  "Tv serials"
];
const [upcomingWork, setUpcomingWork] = useState("");
  const genresList = [
  "Action",
  "Comedy",
  "Drama",
  "Thriller",
  "Romance",
  "Horror",
  "Documentary",
];
  const handleChange = (e) => {
      const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.length >= 3) {
    setOpenMovies(true);
  } else {
    setOpenMovies(false);
  }
  };

  const removeMovie = (id) => {
  setSelectedMovies((prev) =>
    prev.filter((movie) => movie.id !== id)
  );
};

  const handleImage = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

    return(
        <div>
               <form className="space-y-4 relative min-h-[36rem]">

 <div>
  <label className="block text-sm font-semibold text-gray-600 mb-1">
    Years of Experience
  </label>
<input
  type="number"
  placeholder="e.g. 3"
  className="w-full border-b border-gray-400 px-2 py-2 focus:border-blue-500 focus:outline-none"
/>
</div>

<div>
  <label className="block text-sm font-semibold text-gray-600 mb-1">
    Primary Genre
  </label>
  <div className="relative w-full">
      {/* Input Display */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full text-sm border-b border-gray-300 rounded-lg px-2 py-2 cursor-pointer focus-within:border-green-500"
      >
        {selectedGenres.length > 0
          ? selectedGenres.join(", ")
          : "Select Genre"}
      </div>

      {/* Dropdown */}
      {open && (
<div className="absolute w-full bg-white border rounded-lg shadow-md mt-1 z-50 max-h-48 overflow-y-auto">
  {genresList.map((genre) => (
    <label
      key={genre}
      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      <input
        type="checkbox"
        checked={selectedGenres.includes(genre)}
        onChange={() => toggleGenre(genre)}
        className="accent-green-500 w-4 h-4"
      />
      <span
        className={`${
          selectedGenres.includes(genre)
            ? "text-green-600 font-medium"
            : "text-gray-700"
        }`}
      >
        {genre}
      </span>
    </label>
  ))}
</div>
      )}
    </div>
</div>

<div>
  <label className="block text-sm font-semibold text-gray-600 mb-1">
    Formats Worked On
  </label>
  <div className="relative w-full">
      {/* Input Display */}
      <div
        onClick={() => setFormatOpen(!openFormnat)}
        className="w-full text-sm border-b border-gray-300 rounded-lg px-2 py-2 cursor-pointer focus-within:border-green-500"
      >
        {selectedFormats.length > 0
          ? selectedFormats.join(", ")
          : "Select Format"}
      </div>

      {/* Dropdown */}
      {openFormnat && (
<div className="absolute w-full bg-white border rounded-lg shadow-md mt-1 z-50 max-h-48 overflow-y-auto">
  {formats.map((genre) => (
    <label
      key={genre}
      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      <input
        type="checkbox"
        checked={selectedFormats.includes(genre)}
        onChange={() => toggleFormats(genre)}
        className="accent-green-500 w-4 h-4"
      />
      <span
        className={`${
          selectedFormats.includes(genre)
            ? "text-green-600 font-medium"
            : "text-gray-700"
        }`}
      >
        {genre}
      </span>
    </label>
  ))}
</div>
      )}
    </div>
</div>

<div>
        <h2 className="text-sm font-semibold">On-Screen Works</h2>
              <div className="flex flex-wrap gap-2">
        {selectedMovies?.map((movies)=>(
<div className="flex bg-cta text-sm text-white items-center gap-2 border px-2 py-1 mt-2 rounded">
  <img src={`/${movies.img}`} className="w-8 h-8 rounded" />
  <span>{movies.name}</span>
  <button
    onClick={() => removeMovie(movies.id)}
    className="ml-auto text-red-500 text-xs font-bold"
  >
    ✕
  </button>
</div>
        ))}
      </div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full border-b border-gray-400 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
   {openMovies && <div >
        {Movies.map((format)=>(
          <div onClick={()=>{      setSelectedMovies((prev) => {
        // prevent duplicates
        if (prev.find((m) => m.id === format.id)) {
          return prev;
        }
        return [...prev, format];
      });setOpenMovies(false);  setFormData((prev) => ({
    ...prev,
    title: ""
  }));}} key={format.id} className="flex gap-2 items-center border-b border-gray-200 p-2 ">
            <img src={`/${format.img}`} className="w-12 h-12 rounded-md" />
            <span className="flex gap-2 items-center">
              <p className="font-semibold">{format.name}</p><span>({format.year})</span>
            </span>
          </div>
        ))}
      </div>}

</div>

<div>
  <label className="block text-sm font-semibold text-gray-600 mb-1">
    Upcoming Projects
  </label>
  <div className="flex flex-col gap-2 mt-4">
  {upcomingWorksList.map((work,index)=>(
    <div     onClick={() => removeUpcomingWork(index)}
      className="px-3 py-2 w-max gap-2 flex justify-between bg-gray-200 font-semibold rounded-md text-sm"
    >
      {work}
      <span>✕</span>
    </div>
  ))}
  </div>
  <div className="relative flex w-full border-b border-gray-400 px-2 py-2 focus:border-blue-500 focus:outline-none"
>
<input
  type="text"
  onChange={(e) => setUpcomingWork(e.target.value)}
  value={upcomingWork}
  name="upcomingwork"
  placeholder="Add upcoming works"
  className="outline-none"
/>
<div onClick={handleAddUpcomingWork} className={`w-16 flex items-center  justify-center absolute right-2 h-7 rounded transition-colors duration-200 ${
    upcomingWork.trim().length > 0
      ? "bg-cta text-white font-semibold"
      : "bg-gray-300 text-gray-500"
  }`}>
+ Add
</div>
  </div>


</div>
<div className="flex justify-between -black gap-2 items-center">
  <label className="block text-sm font-semibold text-gray-600">
    Awards & Achievements
  </label>
        <span   onClick={() => setShowAwardPopup(true)} className="w-6 h-6 flex justify-center items-center rounded-full bg-cta text-xl text-white">+</span>
  </div>
  <div className="flex flex-wrap gap-2">
  {awardsList.map((award)=>(
    <div className="px-2 py-1 bg-cta text-sm rounded-md text-white w-max">
     🏆 {award.name}   ({award.year})      <span>✕</span>
      </div>
  ))}
</div>
  {showAwardPopup && (
  <div className="fixed inset-0 z-50 flex items-end">
    
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black bg-opacity-40"
      onClick={() => setShowAwardPopup(false)}
    ></div>

    {/* Bottom Sheet */}
    <div className="relative w-full bg-white rounded-t-2xl p-5 animate-slideUp">
      
      <h3 className="text-sm font-semibold mb-4">Add Award</h3>

      <input
        type="text"
        placeholder="Award Name"
        value={awardName}
        onChange={(e) => setAwardName(e.target.value)}
        className="w-full placeholder:text-sm border-b border-gray-300 py-2 mb-4 outline-none focus:border-cta"
      />

      <input
        type="number"
        placeholder="Year"
        value={awardYear}
        onChange={(e) => setAwardYear(e.target.value)}
        className="w-full placeholder:text-sm border-b border-gray-300 py-2 mb-6 outline-none focus:border-cta"
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowAwardPopup(false)}
          className="flex-1 py-2 rounded-lg bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!awardName || !awardYear) return;

            setAwardsList((prev) => [
              ...prev,
              { name: awardName, year: awardYear },
            ]);

            setAwardName("");
            setAwardYear("");
            setShowAwardPopup(false);
          }}
          className="flex-1 py-2 rounded-lg bg-cta text-white"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}


          {/* Submit Button */}
          <div className="flex  bottom-0 w-full  item-center gap-6">
                    <button onClick={prevStep}
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

export default Experience;