import React, { useState,useEffect,useRef } from "react";
import { Icon } from '@iconify/react';
import UserList from "./userlist";
import Message from "./message";
import Email from "./email";
import Navbar from "./navbar";
import { PieChart,LineChart, Pie, Line, Cell,Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Promotions from "./promotions";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
    const [sidebar, setSidebar] = useState(false);
    const [menu, setMenu] = useState(false);
        const [uiMenu, setUiMenu] = useState(false);
    const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
const [enabled, setEnabled] = useState(true);
  const options = { month: 'long', day: 'numeric' };
  const userId = useSelector((state) => state.auth.userId);

  const [selectedDate, setSelectedDate] = useState(dayjs()); // State to hold selected date
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setSelectedDate(dayjs()); 
  }, []);

      const date = new Date();
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=01a376e4dbd249ceae244d42328ca657&include=minutely');
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            console.log(data)
          } catch (error) {
            console.error(error.message);
          }
        };
        fetchData();
      }, []);
      
      const weather=[{
        id:1,
        date:'29/04',
        day:'SUN',
        degree:'40°'
      },
      {
        id:2,
        date:'30/04',
        day:'MON',
        degree:'39°'
      },
      {
        id:3,
        date:'01/05',
        day:'TUE',
        degree:'43°'
      },
      {
        id:4,
        date:'02/05',
        day:'WED',
        degree:'32°'
      },
      {
        id:5,
        date:'03/05',
        day:'THU',
        degree:'37°'
      },
      {
        id:6,
        date:'04/05',
        day:'FRI',
        degree:'41°'
      },
      {
        id:7,
        date:'05/05',
        day:'SAT',
        degree:'39°'
      }]
  
          const events=[{
              id:1,
              icon:<Icon className='w-6 h-6' icon="el:mic" />,
              desc:'Open Mic 2025 in Columbia',
              color:'cta'
            },
            {
              id:2,
              icon:<Icon className='w-6 h-6' icon="ph:bowl-food-fill" />,
              desc:'food Festival',
              color:'ctao'
            },]
         

      const today = weather.filter((climate =>climate.day==='MON'))
  
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

  const [open, setOpen] = useState(false);
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
    const filterdate = (date.toLocaleDateString('en-US', options)).toUpperCase();

  // const selectedDateString = selectedDate ? selectedDate : dayjs();
   console.log(selectedDate)

  const filteredUsers = users?.filter((user) => {
    const date = new Date(user.birthday);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(formattedDate);
    console.log(formattedbday);
    return formattedDate === formattedbday;

  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
    const [userlist, setUserlist] = useState(false);
    const [message,setMessage] = useState(false);
    const [mail,setMail] = useState(false);
    const [section,setSection] = useState('Home');


    const gender = [
  { name: 'Male', value: 400 },
  { name: 'Female', value: 300 },
  { name: 'Other', value: 100 },
];

const COLORS = ['#817AEB', '#FF7B7D', '#FFD567'];
    const handleSidebar = () => {
        setSidebar(!sidebar);
    };

const sortedGender = React.useMemo(() => {
  return [...gender].sort((a, b) => {
    // If 'Male' should be first, force it to the front
    if (a.name === 'Male') return -1;
    if (b.name === 'Male') return 1;
    return 0;
  });
}, [gender]);
    const closeMail = ()=>{
    setMail(false)
    }

    const handleMenu = ()=>{
        setMenu(!menu)
        setUiMenu(false)
    }

        const handleUiMenu = ()=>{
        setUiMenu(!uiMenu)
        setMenu(false)
    }

    const closeMessage=()=>{
        setMessage(false)
    }

    const handleUserlist = ()=>{
        closeMessage()
        closeMail()
        setSection('userlist')
    }

    const closeuserlist = ()=>{
        setUserlist(false)
    }

      const handleMessage = ()=>{
        setSection('message')
        closeuserlist();
        closeMail()
    }

    const handleMail = ()=>{
        setSection('mail')
        closeuserlist();
        closeMessage()
    }

    const home = [{
        id:'#45016356',
        name:'Dj paul',
        date:'July 01, 2026',
        status:'Verified'
    },{
        id:'#45016356',
        name:'Jude',
        date:'July 01, 2026',
        status:'Verified'
    },
{
        id:'#45016356',
        name:'Vinicius',
        date:'July 01, 2026',
        status:'Verified'
    },
{
        id:'#45016356',
        name:'Rodrigo',
        date:'July 01, 2026',
        status:'Verified'
    }]


const data = [
  { name: '1st week', Profile: 160, Professional: 80 },
  { name: '2nd week', Profile: 120, Professional: 69 },
  { name: '3rd week', Profile: 94, Professional: 98 },
  { name: '4th week', Profile: 190, Professional: 109 },
];
    return (
        <div className="relative flex flex-col h-screen">
      
                {/* <nav className="relative flex items-center justify-between h-20 px-7 bg-gradient-to-tr from-span-start to-span-end z-30">
                                     <img className="h-8" src="logo.png" />
                                
                </nav> */}
  
            <div className="flex h-full">
                 
                 <div 
                className={`h-full w-64 relative bg-gradient-to-bl from-span-start to-span-end text-white  transform transition-transform duration-300 ease-in-out translate-x-0 z-40`}
            >
                <div className=" absolute w-full px-2 bottom-12">
                    <div className='flex items-center rounded-xl text-white/50 hover:text-white hover:bg-white/5 px-5 py-3 cursor-pointer w-full justify-between'>
       {/* <div className="flex items-center gap-2">
                <img className="w-9 h-9 rounded-full" src="author.jpg" />
                <span className="flex flex-col">
                <span className="text-xs">Name</span>
                <span className="text-xs">Admin</span>
                </span>
                    </div> */}
                    <div className="flex items-center gap-2">
                    <Icon icon="material-symbols:logout" className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                    </div>
                    </div>
             
                   </div>
       <div className="flex mt-8 px-3 items-center gap-2">
                <img className="w-9 h-9 rounded-full" src="author.jpg" />
                <span className="flex flex-col">
                <span className="text-sm">Sade Techno</span>
                <span className="text-xs">Admin</span>
                </span>
                    </div>
                     
<div className="px-3 space-y-2 mt-8">
  {/* Home Item */}
  <div 
    onClick={() => { setSection('Home'); setMenu(false); setUiMenu(false); }} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 
      ${section === 'Home' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
  >
    <Icon icon="heroicons:home" className="w-5 h-5" />
    <span className="font-medium">Home</span>
  </div>

  {/* Clients Section */}
  <div className="rounded-xl overflow-hidden">
    <div onClick={handleMenu} className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${menu ? 'text-white' : 'text-white/60 hover:text-white'}`}>
      <div className="flex items-center gap-3">
        <Icon icon="heroicons:users" className="w-5 h-5" />
        <span className="font-medium">Clients</span>
      </div>
      <Icon icon={menu ? "mingcute:up-line" : "mingcute:down-line"} className="w-4 h-4" />
    </div>
    {menu && (
      <div className="pl-12 pr-4 space-y-1 pb-2">
        {['userlist', 'message', 'mail'].map((item) => (
          <p key={item} onClick={() => setSection(item)} className={`py-2 px-3 text-sm rounded-lg cursor-pointer transition-colors ${section === item ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </p>
        ))}
      </div>
    )}
  </div>

  {/* UI Admin Section */}
  <div className="rounded-xl overflow-hidden">
    <div onClick={handleUiMenu} className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${uiMenu ? 'text-white' : 'text-white/60 hover:text-white'}`}>
      <div className="flex items-center gap-3">
        <Icon icon="heroicons:cog" className="w-5 h-5" />
        <span className="font-medium">UI Admin</span>
      </div>
      <Icon icon={uiMenu ? "mingcute:up-line" : "mingcute:down-line"} className="w-4 h-4" />
    </div>
    {uiMenu && (
      <div className="pl-12 pr-4 space-y-1 pb-2">
        {['Header', 'Widgets', 'Colors'].map((item) => (
          <p key={item} onClick={() => setSection(item)} className={`py-2 px-3 text-sm rounded-lg cursor-pointer transition-colors ${section === item ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}>
            {item}
          </p>
        ))}
      </div>
    )}
  </div>
    <div 
    onClick={() => { setSection('Analytics'); setMenu(false); setUiMenu(false); }} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 
      ${section === 'Analytics' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
  >
    <Icon icon="heroicons:chart-bar-square" className="w-5 h-5" />
    <span className="font-medium">Analytics</span>
  </div>
</div>
                
            </div>
                          <div style={{ backgroundImage: "url('/blurred-image.png')" }} className=" w-full bg-no-repeat bg-cover bg-opacity-40 relative bg-[#F5F7FA]">

                            <Navbar />
                {section === 'userlist' && (
<UserList />
                    )}
                                    {section === 'message' && (
<Message />
                    )}
                                                        {section === 'mail' && (
<Email />
                    )}

                    {section === 'Home' && (
                        <div className="flex flex-col gap-10 p-4">
                        <div className="flex items-center justify-between">
                                                          <div className="h-20 relative overflow-hidden px-6 py-4 w-1/5 flex flex-col gap-1 bg-white/70 shadow-lg bord border-yellow/60 rounded-lg">
                            <span className="font-semibold text-black ">Total Clients</span>
                                                        <span className="font-[700] text-lg text-gray-600">1654</span>
                                <Icon className="absolute -bottom-1 text-cta -right-2 h-12 w-12 -rotate-[25deg]" icon="heroicons:user-solid" />                                                    
<Icon className="absolute -bottom-2 text-cta/40 right-0 h-12 w-12 -rotate-[25deg]" icon="heroicons:user-solid" />   
                            </div>
                                                            <div className="h-20 relative overflow-hidden px-4 py-4 w-1/5 flex flex-col gap-1 bg-white/70 shadow-lg bord border-yellow/60 rounded-lg">
                            <span className="font-semibold text-black">Professionals</span>
                                                        <span className="font-[700] text-lg text-gray-600">765</span>
                       
<Icon className="absolute -bottom-2 text-cta/40 right-1 h-12 w-12 -rotate-[25deg]" icon="mdi:badge-account-horizontal" />       
                                                                <Icon className="absolute -bottom-2 text-cta bg-/50 -right-2 h-12 w-12 -rotate-[25deg]" icon="mdi:badge-account-horizontal" />                                                    

                                                                          </div>
                                                            <div className="h-20 relative overflow-hidden px-4 py-4 w-1/5 flex flex-col gap-1 bg-white/70 shadow-lg bord border-yellow/60 rounded-lg">
                            <span className="font-semibold text-black">Active Clients</span>
                                                        <span className="font-[700]  text-lg text-gray-600">849</span>
                                                                                        <Icon className="absolute -bottom-2 text-cta -right-2 h-12 w-12 -rotate-[25deg]" icon="mdi:view-dashboard" />                                                    
<Icon className="absolute -bottom-2  text-cta/40 right-1 h-12 w-12 -rotate-[25deg]" icon="mdi:view-dashboard" />   
                            </div>
                                <div className="h-20 relative overflow-hidden px-4 py-4 w-1/5 flex flex-col bg-white/70 shadow-lg bord border-yellow/60 rounded-lg">
                            <span className="font-semibold text-black">Verified Clients</span>
                                                        <span className="font-[700] text-lg text-gray-600">1321</span>
                                                        <Icon className="absolute -bottom-2 text-cta/40 right-1 h-12 w-12 -rotate-[25deg]" icon="mdi:database" />   
                                   <Icon className="absolute -bottom-2 text-cta -right-2 h-12 w-12 -rotate-[25deg]" icon="mdi:database" />                                                    
                            </div>
                            </div>
                            <div className="flex gap-10 items-center">
                                                        <div className="px-6 py-6 bg-white/70 h-full rounded-xl w-full">
                                <div className="flex justify-between">
                                                                <span className="font-semibold">Recently Joined</span>
                                <div className="bg-cta px-3 flex items-center gap-1 rounded-lg py-1.5">
                                    <span className="text-sm text-white font-semibold">Today</span>
                                   <Icon className="w-4 h-4 text-white" icon="mingcute:down-line" />
                                    </div>
                                    </div>
                                <div className="flex flex-col mt-4">
                                {
                                    home.map((recent)=>(
                                        <div className="flex text-sm text-gray-600 border-b border-t py-4 items-center justify-between">
                                        <span className="text-xs">
                                            {recent.id}
                                        </span>
                                        <span className="w-28">
                                            {recent.name}
                                        </span>
                                        <span>
                                            {recent.date}
                                        </span>
                                        <span className="text-cta">
                                            {recent.status}
                                        </span>
                                        </div>
                                    ))
                                }
                                </div>
                                </div>
                                <div className="px-6 h-80 bg-white/70 rounded-xl shadow-sm border border-gray-100 w-full max-w-72">
      <h3 className="font-bold text-gray-700 mt-6 mb-4">Clients by Gender</h3>
      
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sortedGender}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {sortedGender.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
      {/* This displays values on hover */}
      <Tooltip 
  content={({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm text-sm">
          <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }}
/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 w-full justify-center">
    {sortedGender.map((entry, index) => (
      <div key={index} className="flex items-center gap-1">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: COLORS[index % COLORS.length] }} 
        />
        <span className="text-sm text-gray-600">{entry.name}</span>
      </div>
    ))}
  </div>
    </div>
                            </div>

                        </div>
                    )

                    }

                    {section === 'promotions' && (
                    <Promotions />
                    )

                    }

                    {section === 'Header' && (
                        <div className="p-6 flex flex-col gap-6">
                            <div className="bg-white/70 rounded-xl py-6 px-10 flex flex-col gap-4 w-full">
                                <span className="font-semibold text-">Logo</span>

      <div 
        onClick={() => fileInputRef.current.click()}
        className="w-56 h-40 border-2 border-dashed border-cta rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 bg-gray-50"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-1/2 h-6 object-cover rounded-xl" />
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
              <path stroke={'#00BBAA'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
            {/* <p className="text-sm">PNG, JPG or WEBP (Max 5MB)</p> */}
          </div>
        )}
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />


                            </div>
<div className="flex items-center bg-white/70 rounded-xl justify-between px-10 py-6">
                                                                  <span className="font-semibold text-">Search bar</span>
      <label className="flex items-center cursor-pointer">
        {/* Hidden Checkbox */}
        <input 
          type="checkbox" 
          className="hidden" 
          checked={enabled} 
          onChange={() => setEnabled(!enabled)} 
        />
        
        {/* Toggle Background */}
        <div className={`w-10 h-5 flex items-center rounded-xl p-1 duration-300 ease-in-out ${enabled ? 'bg-cta' : 'bg-gray-300'}`}>
          {/* Toggle Knob */}
          <div className={`bg-white w-4 h-4 rounded-xl shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </label>
    </div>
    <div className="flex flex-col gap-4 bg-white/70 rounded-xl px-10 py-6">
        <div className="flex items-center justify-center justify-between">
                                                                            <span className="font-semibold text-">Icons</span>
<div>
    <span className="text-cta">+ Add </span>
    </div>
            </div>

                <div className="flex items-center gap-4"> <Icon icon="carbon:home" width="26" height="26" />
 <Icon icon="mingcute:user-add-line" width="24" height="24" />
<Icon icon="si:notifications-line" width="24" height="24" />
            <Icon icon="ic:outline-chat" width="24" height="24" />, 
    </div>
</div>
                        </div>
                    )

                    }

                    {section === 'Analytics' && (
                      <div className="p-4 flex gap-16 items-center">
                  <div className="w-1/2 h-[29rem] bg-white/70 p-4 pt-2 rounded-2xl shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          // 2. Adjust margins: top moves chart up, bottom adds space for labels
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }} 
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            dy={10} // 3. Pushes the labels down further
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey="Profile" stroke="#fda4af" strokeWidth={3} />
          <Line type="monotone" dataKey="Professional" stroke="#60a5fa" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="flex flex-col gap-4 flex-grow p-4 h-[29rem] rounded-xl">
      <div className="flex items-center justify-between">
      <span className="font-semibold text-white">Top Professional Account</span>
                                      <div className="bg-cta px-3 flex items-center gap-1 rounded-lg py-1.5">
                                    <span className="text-sm text-white font-semibold">July</span>
                                   <Icon className="w-4 h-4 text-white" icon="mingcute:down-line" />
                                    </div>
        </div>
                     <div className="px-8 py-6 bg-white/70 flex items-center justify-between rounded-xl">
       <div className="flex items-center gap-4">
                <img src="profile.jpg" className="rounded-full h-12 w-12" />
        <div className="flex flex-col">
         <span className="font-semibold">DJ Rio</span>
         <span className="text-xs text-gray-500 tracking-wider">COUNTRY</span>
        </div>
        </div>

        {/* <span className="text-sm">dj45@gmail.com</span>
            <span className="text-sm">+91 9876543210</span> */}
                  <span className="text-sm font-semibold">Music Mixer</span>
<div className="flex flex-col items-center">
    <span className="text- font-semibold text-cta">448</span>
    <span className="text-gray-400 text-sm">Views</span>
  </div>                            

     </div>
      </div>
                        </div>

                    )
                    }

                    {section === 'Widgets' && (
                      <div className="p-6">
                      <div className="bg-white/70 h-[28rem] flex flex-col gap-6 w-full p-6 rounded-xl">
                        <span className="font-semibold">Widgets</span>
                        <div className="flex flex-wrap gap-10">
                          <div className="w-80 h-72 bg-[#5A288B] flex items-center justify-center relative rounded-xl">
                           
                                                       <div className="w-10 h-10 z-10 p-1 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center absolute bottom-3 left-3">
                                 
<div className="flex items-center justify-center bg-cta p-2 rounded-full">
<Icon 
  icon="ph:check-bold" // This is naturally much thicker than Heroicons
  width="20"           // Increase the size slightly to fill the circle better
  height="20" 
  style={{ color: '#ffffff' }}
  className="stroke-[3]"
/>
</div>

                                    </div>
                            <div className="absolute left-10 top-32">
                              <div className="bg-[#482275] w-1.5 h-1.5 rounded-full">
                                </div>
                                <div className="bg-[#482275] absolute left-4 top-2 w-3 h-3 rounded-full">
                                </div>
                            </div>
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
                                  <div className="text-center absolute bottom-10 text-white py-4 text-lg font-semibold">
                                    {/* <span>No birthdays today</span> */}
                                    <div className="w-full flex justify-center">
                                      <span>Alex Dunphy</span>
                                      <span></span>
                                    </div>
                                  </div>
                                )}

                                                        <div className="absolute right-10 top-32">
                              <div className="bg-[#482275] w-3 h-3 right-4 top-2 rounded-full">
                                </div>
                                <div className="bg-[#482275] absolute right-6  w-1.5 h-1.5 rounded-full">
                                </div>
                            </div>
                          {/* <div className=" bg-[#482275] h-40 flex items-center justify-center w-40 rounded-full"> */}
                          <img src="profile.jpg" className="w-24 h-24 rounded-full border-2 bg-[#482275] p-1 border-[#fff]" />
                          {/* </div> */}
                            <span className=" w-full absolute top-0 h-16 text-xs text-center text-white" onClick={handleDateClick}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* 1. Custom Trigger Component */}
      <div 
        onClick={() => setOpen(true)}
        className="w-full h-16 bg-[#5A288B] rounded-xl flex items-center justify-between px-4 cursor-pointer"
      >
        <span className="text-white font-semibold text-lg">
          {selectedDate ? selectedDate.format('MMMM D') : 'Select Date'}
        </span>
        <span className="text-white text-xl">📅</span>
      </div>

      {/* 2. Hidden DatePicker controlling the calendar */}
      <DatePicker
        open={open}
        onClose={() => setOpen(false)}
        onChange={(newValue) => {
          setSelectedDate(newValue);
          setOpen(false);
        }}
        value={selectedDate}
        slotProps={{
          textField: { style: { display: 'none' } }, // Hides the MUI input field
        }}
      />
    </LocalizationProvider>
                            </span>
                          </div>
                          {/* <div className="w-80 h-72 bg-[#5A288B] flex items-center justify-center relative rounded-xl">
                          </div> */}
                              <div style={{  backgroundImage:"url('weatherb.png')"}} className='w-80 flex flex-col relative justify-between border bg-cover rounded-xl md:h-72'>
                                  <div className="w-10 h-10 z-10 p-1 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center absolute bottom-3 left-3">
                                 
<div className="flex items-center justify-center bg-cta p-2 rounded-full">
<Icon 
  icon="ph:check-bold" // This is naturally much thicker than Heroicons
  width="20"           // Increase the size slightly to fill the circle better
  height="20" 
  style={{ color: '#ffffff' }}
  className="stroke-[3]"
/>
</div>

                                    </div>
                                  <div className='flex items-center justify-between'>
                                  <div className='p-2 bg-cta text-white flex font-semibold rounded-tl-xl h-11 text-center items-center justify-center'><span>{filterdate}</span></div><span className='px-3 flex items-end text-white font-semibold'><span>San Francisco </span><Icon className='w-5 h-5' icon="uil:angle-down" /></span>
                                  </div>
                                  <div className='w-full flex flex-col items-center justify-center h-36'>
                                      <div className='flex flex-col'>
                                     {today.map((climate)=>(
                                      <div>
                                        <div className='flex gap-4 items-center'>
                                                    <div className='flex relative'>
                                                    <Icon className='w-28 sunrot h-16 ml-8 text-sun' icon="ph:sun" /></div>
                                                  <Icon className='w-28 text-white h-16 absolute' icon="ion:cloud-sharp"/>           
                                                  <div className='flex flex-col'> <span className='text-white font-bold text-xl'>{climate.degree}</span>
                                                  <span className='text-sun font-semibold'>Sunny</span>
                          </div>
                          </div>
                                      </div>
                                     ))}
                                      </div>
                                  </div>
                                 
                                  <div className="p-2">
                                                                      <div className='bg-[#fff] bg-opacity-80 rounded-xl flex gap-1 h-20'>
                                    {weather.map((climate)=>(
                                      <div key={climate.id} className='flex items-center py-6 px-2 justify-center text-white flex-col gap-1 w-1/6 text-center'>
                                                                               <span className='text-xs text-gray-600 font-semibold'>{climate.day}</span>

                                        <div className='flex items-center justify-center relative'>
                                        <Icon className=' text-sun' icon="ph:sun" /></div>
                                                                                <span className='text-xs font-semibold text-sun'>{climate.degree}</span>

                                      </div>
                                    ))}
                                  </div>
                                    </div>

                                  
                                </div>
                                                        <div className="w-80 h-72 bg-[#fff] shadow-lg flex flex-col p-4 gap-4 relative rounded-xl">
                                                                                              <div className="w-10 h-10 z-10 p-1 rounded-full bg-white cursor-pointer border-2 border-gray-300 flex items-center justify-center absolute bottom-3 left-3">


                                    </div>
                                                              {events.map((items)=>(
    <div key={items.id} className={`w-full  items-center justify-center flex cursor-pointer bg-${items.color} h-20 rounded-md`}>
    <div className=' flex flex-col items-center justify-center text-white'><span className=''>{items.icon}</span><span className=' font-semibold'>{items.desc}</span></div>
    </div>
      ))}
                                                        </div>
                        </div>
                      </div>
                      </div>
                    )

                    }

                    {section === 'Colors' && (
                      <div className="p-6">
                        <div className="bg-white/70 h-[28rem] flex flex-col gap-4 w-full p-6 rounded-xl">
                        <span className="font-semibold text-lg">Colors</span>
                        <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between gap-1">
                        <span className="">
                        Header
                        </span>
                        <span className="p-2 w-40 text-sm flex shadow-md rounded-xl w-max items-center gap-1">
                          <span className="bg-cta w-6 h-6 rounded-full border-2 border-gray-200"></span>
                          #0a854b
                        </span>
                          </div>
                          <div className="flex items-center justify-between  gap-1">
                        <span className="">
                        Background
                        </span>
                        <span className="p-2 w-40 text-sm flex shadow-md rounded-xl w-max items-center gap-1">
                          <span className="bg-gray-300 w-6 h-6 rounded-full border-2 border-gray-200"></span>
                          #d8d8d8
                        </span>
                          </div>
                          <div className="flex items-center justify-between  gap-1">
                        <span className="">
                        Primary Text
                        </span>
                        <span className="p-2 w-40 text-sm flex shadow-md rounded-xl w-max items-center gap-1">
                          <span className="bg-black w-6 h-6 rounded-full border-2 border-gray-200"></span>
                          #000000
                        </span>
                          </div>
                           <div className="flex items-center justify-between gap-1">
                        <span className="">
                        Secondary Text
                        </span>
                        <span className="p-2 w-40 px-2.5 text-sm flex shadow-md rounded-xl w-max items-center gap-1">
                          <span className="bg-white w-6 h-6 rounded-full border-2 border-gray-200"></span>
                          #FFFFFF
                        </span>
                          </div>
                            <div className="flex items-center justify-between gap-1">
                        <span className="">
                        Buttons
                        </span>
                        <span className="p-2 w-40 text-sm flex shadow-md rounded-xl w-max items-center gap-1">
                          <span className="bg-[#0aca17] w-6 h-6 rounded-full border-2 border-gray-200"></span>
                          #0aca17
                        </span>
                          </div>
                          </div>


                        </div>
                      </div>
                    )

                    }
                </div>
            </div>
                       
        </div>
    );
};

export default Dashboard;
