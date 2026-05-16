import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Editprofile = ({ profile, close }) => {
  const [name, setName] = useState(profile?.user.name || '');
  const [aboutMe, setAboutMe] = useState(profile?.user.aboutMe || '');
  const [birthday, setBirthday] = useState(profile?.user.birthday || new Date());
  const [bloodGroup, setBloodGroup] = useState(profile?.user.bloodGroup || '');
  const [gender, setGender] = useState(profile?.user.gender || 'Male');
  const [country, setCountry] = useState(profile?.user.country || '');
  const [profession, setProfession] = useState(profile?.user.workExperience.map((profession) => profession.work) || '');
  const [email, setEmail] = useState(profile?.user.email || '');
  const [countries, setCountries] = useState(false);
  const [active, setActive] = useState(false);

  const data = [{ id: '1', name: 'India' }, { id: '2', name: 'Afghanistan' }]; // Sample countries

  useEffect(() => {
    setName(profile?.user.name || '');
    setAboutMe(profile?.user.aboutMe || '');
    setBirthday(profile?.user.birthday || new Date());
    setBloodGroup(profile?.user.bloodGroup || '');
    setGender(profile?.user.gender || 'Male');
    setCountry(profile?.user.country || '');
    setProfession(profile?.user.workExperience.map((profession) => profession.work) || '');
    setEmail(profile?.user.email || '');
  }, [profile]);

  const handleShowCountry = () => {
    setCountries(!countries);
  };

  const handleSetCountry = (selectedCountry) => {
    setCountry(selectedCountry.name);
    setActive(false);
    setCountries(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      aboutMe,
      birthday,
      bloodGroup,
      gender,
      country,
      workExperience: [{ work: profession }],
      email
    };

    // You would send `updatedProfile` to your backend here for saving
    console.log('Profile updated:', updatedProfile);

    // Close the form after submit
    close();
  };

  return (
    <>
      <div className='flex flex-col w-full h-auto items-center'>
        <form onSubmit={handleSubmit} className="absolute flex flex-col bg-white h-auto mt-16 rounded-md px-10 md:mb-14 md:w-1/2 py-8">
          <div className='flex items-center justify-between'>
            <p className="text-xl font-semibold">Edit Profile</p>
            <div onClick={close} className='cursor-pointer bg-gray-200 p-1 hover:bg-red hover:text-white rounded-full'>
              <IoClose className='h-5 w-5 cursor-pointer' />
            </div>
          </div>
          <div className='flex flex-col w-full gap-8'>
            <div className='flex flex-col gap-2'>
              <label className="text-md">Name <span className='text-red'>*</span></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                type="text"
                required
                placeholder="Enter your Display Name"
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="text-md">About Me <span className='text-red'>*</span></label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="px-3 w-auto h-24 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                required
                placeholder="Describe yourself in less than 200 words"
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col w-1/2 gap-3'>
                <label className='text-md'>Birthday</label>
                <DatePicker onChange={setBirthday} value={birthday} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className="text-md">Blood Group <span className='text-red'>*</span></label>
                <input
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                  type="text"
                  required
                  placeholder="Enter your blood group"
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2'>
                <label className="text-md">Gender <span className='text-red'>*</span></label>
                <div className='flex items-center gap-4'>
                  <div className="flex items-center gap-2">
                    <input
                      checked={gender === 'Male'}
                      onChange={() => setGender('Male')}
                      type="radio"
                      name="option"
                      value="Male"
                    />
                    <label>Male</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      type="radio"
                      name="option"
                      value="Female"
                    />
                    <label>Female</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input
                      checked={gender === 'Other'}
                      onChange={() => setGender('Other')}
                      type="radio"
                      name="option"
                      value="Other"
                    />
                    <label>Other</label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label className="text-md">Country <span className='text-red'>*</span></label>
                <div className='flex items-center'>
                  <input
                    className='w-72 px-3 py-2 border border-gray-300'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    required
                    placeholder="Select your Country"
                  />
                  <div className='absolute ml-64'>
                    {active ? (
                      <FaCaretUp onClick={() => { setActive(false); handleShowCountry(); }} />
                    ) : (
                      <FaCaretDown onClick={() => { setActive(true); handleShowCountry(); }} />
                    )}
                  </div>
                </div>
                {countries && (
                  <div className='mt-20 absolute duration-500 ease-in-ease-out slide-in-down w-80 flex flex-col bg-white'>
                    {data.map((country) => (
                      <div key={country.id}>
                        <div className='w-full' key={country.id}>
                          <div
                            className='cursor-pointer p-2 border border-gray-50 hover:bg-gray-100 w-72'
                            onClick={() => handleSetCountry(country)}
                          >
                            {country.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className="text-md">Profession <span className='text-red'>*</span></label>
              <input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                type="text"
                required
                placeholder="Enter your Profession"
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="text-md">Email <span className='text-red'>*</span></label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray"
                type="email"
                required
                placeholder="Enter your Email & Website"
              />
            </div>
          </div>
          <div className='w-full mt-8 gap-6 flex justify-center'>
            <button onClick={close} className='px-4 py-2 bg-gray-200 border rounded-md text-black'>Cancel</button>
            <button type='submit' className='px-4 py-2 bg-cta rounded-md text-white'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Editprofile;
