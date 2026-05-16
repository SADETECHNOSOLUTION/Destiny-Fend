import React,{useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProfessionForm = ()=>{
    const [interest,setInterest] = useState()
    const [interests,setinterests] = useState()
    const [file,setFile] = useState()

    const deleteInterest = (id) => {
        const updatedInterests = interests.filter((i) => i.id !== id);
       setFormData({ ...formData, interests: updatedInterests });
    };
    const addInterest = () => {
        if (interest.trim() === '' || interest.length <= 1) {
          console.log(setinterests);
          
        } else if (interests.find((i) => i.activity === interest.trim())) {
    
        } else if (interests.length >= 10) {
     
        } else {
            const newInterest = { id: Date.now(), activity: interest.trim() }; // Unique ID
            const updatedInterests = [...interests, newInterest];
            setFormData({ interests: updatedInterests });
            setInterest('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      
      const handlechangeCover = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
                setFile(selectedFile); 
                console.log(file)
              
        }
    };
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your form submission logic here (e.g., API call)
        alert("Form Submitted");
      };
    
      const [languages, setLanguages] = useState([
        { language: '', fluency: '' },
      ]);

      const [experience, setExperience] = useState([
        { Year: '', Profession: '',WorkDescription:'' },
      ]);

      // const handleExpYearChange = (index, value) => {
      //   const updatedLanguages = [...languages];
      //   updatedLanguages[index].language = value;
      //   setLanguages(updatedLanguages);
      // };
      
      const handleLanguageChange = (index, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index].language = value;
        setLanguages(updatedLanguages);
      };
    
      const handleFluencyChange = (index, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index].fluency = value;
        setLanguages(updatedLanguages);
      };
    
      const handleAddLanguage = () => {
        if (languages.length < 4) {
          setLanguages([...languages, { language: '', fluency: '' }]);
        } else {
          alert("You can add up to 4 languages only.");
        }
      };

      const handleAddExperience = () => {
        if (experience.length < 4) {
          setExperience([...experience, { Year: '', Profession: '',WorkDescription:'' }]);
        } else {
          alert("You can add up to 4 languages only.");
        }
      };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
    return(
            <div className="px-16 ">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Details Section */}
        <div className="w-full p-4 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div style={{ backgroundImage: `` }} className={`flex flex-col relative w-full h-48 bg-gray-300 rounded-md bg-cover bg-center bg-no-repeat gap-4 justify-end `}>
                    <div className='absolute right-0 top-0 p-2'>
                        <div className='flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'>                     
                            <input type="file" accept="image/*" onChange={handlechangeCover} style={{ display: 'none' }} id="cover-photo-input" />
                            <label htmlFor="cover-photo-input" className='flex items-center gap-2 cursor-pointer'>
                            <span className='font-semibold'>Upload cover photo</span> <Icon icon="mdi:camera" width="1.2em" height="1.2em" />
                            </label>
                        </div>
                    </div>
                    <div className='flex relative  w-max items-center'>
                        <div>
                            <img className={`w-28 border-4 border-white  h-28 rounded-full`} alt='' src='' />
                        </div>
                        <div className='absolute justify-end bottom-0 right-0 flex text-cta hover:bg-cta hover:text-white border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'>
                            <input type="file" accept="image/*" style={{ display: 'none' }} id="profile-photo-input" />
                            <label htmlFor="profile-photo-input" className='cursor-pointer'>
                                <Icon icon="mdi:camera" width="1.2em" height="1.2em" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-full">
              <label htmlFor="message" className="block font-semibold  font-semibold text-gray-700">Name</label>
              <textarea
                id="about"
                name="about"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                rows="4"
                required
              />
            </div>
          <div className="w-full">
              <label htmlFor="message" className="block font-semibold  font-semibold text-gray-700">About</label>
              <textarea
                id="about"
                name="about"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="A brief about your work process"
                rows="4"
                required
              />
            </div>
            <div className='flex flex-col h-max gap-2'>
                        <label className="font-semibold">Skills</label>
                        <div className='flex items-center gap-4'>
                            <input
                                name='skills'
                                id='skills'
                                value={interest}
                                onChange={(e) => { setInterest(e.target.value) }}
                                className='w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type='text'
                                placeholder='What are your skills'
                            />
                            <button
                                type='button'
                                className='border flex items-center justify-center rounded-md bg-cta hover:bg-opacity-90 text-white px-4 h-12 border-cta'
                                onClick={(e) => {
                                    e.preventDefault();
                                    addInterest();
                                }}
                            >
                               <span className="w-max">+ Add Skill</span>
                            </button>
                        </div>
                        <div className='flex flex-wrap gap-4 w-full'>
                            {interests?.map((interest, index) => (
                                <div
                                    className='flex justify-center items-center w-min py-2 px-3 rounded-md gap-2 bg-cta text-white'
                                    key={index}
                                >
                                    {interest.activity}
                                    <Icon icon="ic:baseline-close" className='cursor-pointer' onClick={() => { deleteInterest(interest.id) }} />
                                </div>
                            ))}
                        </div>
                    </div>
            <div className="flex items-center justify-between"> 
            <div>
              <label htmlFor="name" className="block font-semibold  text-gray-700">Clients</label>
              <input
                type="number"
                id="clients"
                name="clients"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of your clients"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold  text-gray-700">Awards</label>
              <input
                type="number"
                id="awards"
                name="awards"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of awards won"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-700">Projects</label>
              <input
                type="number"
                id="projects"
                name="projects"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of your projects done"
                required
              />
            </div>
 
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <div className="flex items-center justify-between">
      <h2 className="text-gray-800 font-semibold">Language & Fluency Form</h2>
      <button
        type="button"
        onClick={handleAddLanguage}
        className="px-4 py-2 bg-cta hover:bg-opacity-90 text-white rounded-md"
      >
       + Add Language
      </button>
</div>
      {languages.map((lang, index) => (
        <div key={index} className="flex space-x-4">
          <input
            type="text"
            value={lang.language}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="Enter language"
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={lang.fluency}
            onChange={(e) => handleFluencyChange(index, e.target.value)}
            placeholder="Fluency (%)"
            min="0"
            max="100"
            className="w-[30%] p-3 border border-gray-300 rounded-md"
          />
        </div>
      ))}


    </form>

    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <div className="flex items-center justify-between">
      <h2 className="text-gray-800 font-semibold">Work Experience</h2>
      <button
        type="button"
        onClick={handleAddExperience}
        className="px-4 py-2 bg-cta hover:bg-opacity-90 text-white rounded-md"
      >
       + Add Experience
      </button>
</div>
      {experience.map((lang, index) => (
        <div className="flex flex-col gap-4 py-4">
        <div key={index} className="flex gap-4">
          <input
            type="text"
            value={lang.Year}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="Year"
            className="flex-1 p-3 w-[50%] border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={lang.Profession}
            onChange={(e) => handleFluencyChange(index, e.target.value)}
            placeholder="Profession"
            min="0"
            max="100"
            className="w-[50%] p-3 border border-gray-300 rounded-md"
          />
        </div>
        <input
            type="text"
            value={lang.WorkDescription}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="Work description"
            className="flex-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
      ))}


    </form>
            <div className='flex flex-col h-max gap-2'>
                        <label className="font-semibold">Clients</label>
                        <div className='flex items-center gap-4'>
                        <div className='flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'>                     
                            <input type="file" accept="image/*" onChange={handlechangeCover} style={{ display: 'none' }} id="cover-photo-input" />
                            <label htmlFor="cover-photo-input" className='flex items-center gap-2 cursor-pointer'>
                            <span className='font-semibold'>Add Client Company</span> <Icon icon="mdi:camera" width="1.2em" height="1.2em" />
                            </label>
                        </div>
                            <button
                                type='button'
                                className='border rounded-md hover:bg-opacity-90 bg-cta text-white px-6 py-2 border-cta'
                                onClick={(e) => {
                                    e.preventDefault();
                                    addInterest();
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div className='flex flex-wrap gap-4 w-full'>
                            {interests?.map((interest, index) => (
                                <div
                                    className='flex justify-center items-center w-min py-2 px-3 rounded-md gap-2 bg-cta text-white'
                                    key={index}
                                >
                                    {interest.activity}
                                    <Icon icon="ic:baseline-close" className='cursor-pointer' onClick={() => { deleteInterest(interest.id) }} />
                                </div>
                            ))}
                        </div>
                    </div>
<div className="w-full flex justify-end">
<button
              type="submit"
              className="w-max p-3 bg-cta font-semibold text-white rounded-md hover:bg-opacity-90 focus:outline-none"
            >
              Submit
            </button>
</div>

          </form>
        </div>
      </div>
    </div>
    )
}

export default ProfessionForm;