import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Birthday = () => {
  const options = { month: 'long', day: 'numeric' };
  const userId = useSelector((state) => state.auth.userId);

  const [selectedDate, setSelectedDate] = useState(dayjs()); // State to hold selected date
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setSelectedDate(dayjs()); 
  }, []);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
    1600: { items: 1 },
  };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-pink hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-32 ml-32"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="grommet-icons:next" />
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-pink hover:text-white bg-gray-100 rounded-full -mt-32 -ml-40"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="ic:twotone-arrow-back-ios" />
    </button>
  );

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://destiny-apigateway.onrender.com/api/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  // const handleDateChange = (e) => {
  //   const date = e.value;
  //   setSelectedDate(date);
  //   setShowCalendar(false); // Hide calendar after selecting date
  // };


// Format the date to display the month name and day
const formattedbday = selectedDate.format('MMMM D');  // 'MMMM' for full month name and 'D' for day of the month

  // const selectedDateString = selectedDate ? selectedDate : dayjs();
   console.log(selectedDate)

  const filteredUsers = users?.filter((user) => {
    const date = new Date(user.birthday);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(formattedDate);
    console.log(formattedbday);
    return formattedDate === formattedbday;

  });

  return (
    <div className="w-full flex flex-col h-auto bg-white gap-6 rounded-md shadow-lg">
      <div className="w-full px-4 py-1 flex flex-col justify-between items-center bg-pink text-lg font-semibold ">
        {/* <span className="text-white">Birthdays</span> */}
        <span className="bg-pink w-full h-16 text-xs text-center" onClick={handleDateClick}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker value={selectedDate} // Set default value to today's date
          onChange={(newValue) => setSelectedDate(newValue)} views={['month', 'day']}           
          sx={{
            fontSize: '0.875rem', // Adjust font size
          // Allow the height to adjust
            // Optional: Control padding
            backgroundColor: '#fff', 
            borderRadius:1
          }} />
      </DemoContainer>
    </LocalizationProvider>
        </span>
      </div>
      {showCalendar && (
        <div className="px-4">
          {/* Calendar is toggled here */}
        </div>
      )}
      {filteredUsers.length > 0 ? (
        <AliceCarousel
          disableDotsControls
          responsive={responsive}
          autoPlay
          infinite
          autoPlayInterval={4000}
          renderNextButton={renderNextButton}
          renderPrevButton={renderBackButton}
        >
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-col gap-2 text-sm items-center justify-center">
              <div className="flex items-center gap-2">
                <img className="w-16 h-16 rounded-full" src={user.profileImagePath} alt={`Profile of ${user.name}`} />
              </div>
              <span className="relative text-lg flex items-center flex-col font-semibold w-64">
                <span className='flex items-center gap-1'>{user.name} <span className='flex '>celebrating </span>{user.gender === 'Male'&& <span>his </span>}{user.gender === 'Female'&& <span>her </span>}{user.gender === 'Other'&& <span>their </span>}
                </span>
                <span className='flex gap-1 items-center'> <span> birthday today </span><span className="text-center items-center gap-1 flex">
                  <Icon className="w-6 h-6" icon="noto:party-popper" />
                </span></span>
              </span>
              <div>
                <img
                  className="w-36 h-36"
                  src="birthday.gif"
                  alt="Birthday celebration"
                />
              </div>
            </div>
          ))}
        </AliceCarousel>
      ) : (
        <div className="text-center py-4 text-lg font-semibold">
          <span>No birthdays today</span>
          <div className="w-full flex justify-center">
            <img
              className="w-36 h-36"
              src="birthday.gif"
              alt="No birthdays"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Birthday;
