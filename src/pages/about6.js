import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import CountUp from 'react-countup';
import { Icon } from "@iconify/react/dist/iconify.js";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { NavLink } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import '../progressstyle.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles.css'
import Modal from 'react-modal'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { color } from "framer-motion";
import HorizontalScrollGallery from "./scroll";
import BlurCursor from "../components/blurCursor";
import { motion, useScroll, useInView,useTransform,useSpring  } from "framer-motion";
import ProjectCard from "./projectCard";
import { icon } from "leaflet";
import { ArrowUpRight, Mail, MapPin, Phone,Instagram, Camera,ArrowRight,Zap,Command,Plus,Globe,Eye,Layers,Cpu,Award } from 'lucide-react';

const AboutArtdirection = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [profile, setProfile] = useState();
  const [openSkillsPopup,setSkillsPopup] = useState(false);
  const [openTechniquesPopup,setTechniquesPopup] = useState(false);
  const [hobbiesPopup,setHobbiesPopup] = useState(false);

  const stats = [
  { id: 1, name: "Visual Concepts", value: "140+" },
  { id: 2, name: "Brand Identities", value: "22" },
  { id: 3, name: "Set Designs", value: "45" },
  { id: 4, name: "Awards Won", value: "12" }
];

const experienceData = [
  {
    title: "Lead Art Director",
    institution: "Vogue Editorial / NYC",
    duration: "2023 — PRESENT",
    description: "Overseeing visual storytelling and layout design for monthly digital covers. Managing a team of stylists and photographers to maintain brand consistency."
  },
  {
    title: "Senior Visual Designer",
    institution: "A24 Film Studio",
    duration: "2021 — 2023",
    description: "Developed theatrical posters and marketing aesthetics for 12 independent feature films. Focused on 'Atmospheric Branding'."
  },
  {
    title: "Concept Artist",
    institution: "Freelance Creative",
    duration: "2018 — 2021",
    description: "Specializing in moodboarding, color theory application, and set styling for high-fashion commercial shoots."
  }
];

const projects = [
  { title: "The Velvet Hour", category: "Cinematography", year: "2025" },
  { title: "Glass Architecture", category: "Set Design", year: "2024" },
  { title: "Monochrome Muse", category: "Art Direction", year: "2024" },
  { title: "Liquid Gold", category: "Fashion Film", year: "2023" }
];

const educationData = [
  {
    title: "B.Sc Visual Communication",
    months: [
      {
        month: "Madras Christian College (2018 – 2021)",
        works: [
          "Programming fundamentals in C & Java",
          "Data Structures and Algorithms",
          "Discrete Mathematics",
          "Computer Organization",
        ],
      },
    ],
  },

  {
    title: "Higher Secondary Education (12th Grade)",
    months: [
      {
        month: "Chettinad Vidyashram (2018 – 2019)",
        works: [
          "Mathematics and Physics",
          "Computer Science basics",
          "C++ programming fundamentals",
          "Academic project presentation",
        ],
      },
    ],
  },

  {
    title: "Secondary School (10th Grade)",
    months: [
      {
        month: "Chettinad Vidyashram (2018 – 2019)",
        works: [
          "Core Mathematics",
          "Science and Technology",
          "Introduction to logical reasoning",
          "School-level science exhibition project",
        ],
      },
    ],
  },
];


// 1. Pre-calculate MAIN rotations for the boxes


  // Put them in arrays so we can access them by index in the map

  
  const handleOpenTechnique = ()=>{
    setTechniquesPopup(true)
  }

  const openHobbies = ()=>{
   setHobbiesPopup(true)
  }

  const closeHobbies = ()=>{
    setHobbiesPopup(false)
   }

  const handleCloseTechnique = ()=>{
    setTechniquesPopup(false)
  }

  const handleOpenSkill = ()=>{
    setSkillsPopup(true)
  }

  const handleCloseSkill = ()=>{
    setSkillsPopup(false)
  }

  // const [shortcut, showShortcut] = useState(false);
  const [hover, setHover] = useState(null);
  // const [activeTitle,setActiveTitle] = useState()
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [clientsVisible, setClientsVisible] = useState(false);
  const [countVisible, setCountVisible] = useState(false);
  const countRef = useRef(null)
  const [interest,setInterest] = useState('');
  const [hobbies,setHobbies] = useState('');
  const [techniques,setTechniques] = useState('');
  const clientsRef = useRef(null);

  const handleInterestChange = (e) => {
    setInterest(e.target.value);
  };

  const handleTechniquesChange = (e) => {
    setTechniques(e.target.value);
  };

  //   const handleHobbiesChange = (e) => {
  //   setHobbies(e.target.value);
  // };


  const call="fa6-solid:phone"
  const address="mdi:address-marker"
  const mail ="material-symbols:mail"
  const linkedin = <Icon className='md:w-5 sm:w-4 md:h-5' icon="bi:linkedin"  />
  const [experienceVisible,setExperienceVisible] = useState(false)
  const [languageVisible,setLanguageVisible] = useState(false)
  const [contactVisible,setContactVisible] = useState(false)
  const [resumeVisible,setResumeVisible] = useState(false)
  const [activeIndex,setActiveIndex] = useState(0)
  const ResumeRef = useRef(null)
  const LanguageRef = useRef(null)
  const experienceRef = useRef(null)
  const contactRef = useRef(null)




      const social = {
        media:[{
          id:1,
          icon:<Icon icon="bi:facebook" width="24" height="24"  style={{color:' #fff'}} />,
          link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Facebook")?.url
        },
      {
        id:2,
        icon:<Icon icon="streamline-logos:x-twitter-logo-block" width="24" height="24"  style={{color: '#fff'}} />,
        link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Twitter")?.url
      },
    {
      id:3,
      icon:<Icon icon="uil:instagram-alt" width="24" height="24"  style={{color: '#fff'}} />,
      link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Instagram")?.url
    },
  {
    id:4,
    icon:<Icon icon="ri:youtube-fill" width="24" height="24"  style={{color: '#fff'}} />,
    link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "youtube")?.url
  }]
      }

//   useEffect(() => {
//     const handleScroll = () => {
//     };
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//         window.removeEventListener("scroll", handleScroll);
//     };
// }, []);

useEffect(() => {
        setResumeVisible(true);  // Set clientsVisible to true when the section is in view
}, []);

useEffect(() => {
  const currentNode = contactRef.current;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setContactVisible(true);  // Set clientsVisible to true when the section is in view
      }
    },
    { threshold: 0.3 }  // Trigger when 50% of the section is visible
  );
  
  if (currentNode) {
    observer.observe(currentNode);
  }

  return () => {
    if (currentNode) {
      observer.unobserve(currentNode);
    }
  };
}, []);


useEffect(() => {
  // Store the current value of the ref in a variable to avoid future issues
  const languageNode = LanguageRef.current;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setLanguageVisible(true);
        console.log(languageVisible);
        // Set languageVisible to true when the section is in view
      }
    },
    { threshold: 0.3 } // Trigger when 30% of the section is visible
  );

  if (languageNode) {
    observer.observe(languageNode);
  }

  // Cleanup the observer when the component unmounts
  return () => {
    if (languageNode) {
      observer.unobserve(languageNode);
    }
  };
}, [languageVisible]);


  useEffect(() => {
    const handleScroll = () => {
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);

useEffect(() => {
  const experienceNode = experienceRef.current
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setExperienceVisible(true);  // Set clientsVisible to true when the section is in view
      }
    },
    { threshold: 0.3 }  // Trigger when 50% of the section is visible
  );
  
  if (experienceNode) {
    observer.observe(experienceNode);
  }

  return () => {
    if (experienceNode) {
      observer.unobserve(experienceNode);
    }
  };
}, []);


  const footer=[{
    id:1,
    icon: call,
    text:'Call me!',
    value:'(+81) 946 159 90'
  },{
    id:2,
    icon: mail,
    text:'Mail!',
    value:'Peterparker_07@gmail.com'
  },{
    id:3,
    icon: address,
    text:'Reach out!',
    value:'AVE 11, NEW YORK, USA'
  }]

const WavyUnderline = () => {
  return (
    <span className="relative inline-block group">
      <span className="text-4xl font-black italic uppercase tracking-tighter">
        Join Us.
      </span>
      {/* The Underline */}
      <span 
        className="absolute left-0 bottom-[-4px] w-full h-[6px]"
        style={{
          background: 'linear-gradient(to right, #4f46e5, #ec4899, #f59e0b)',
          maskImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0 50 10 T 100 10' stroke='black' fill='transparent' stroke-width='10'/%3E%3C/svg%3E")`,
          maskSize: '40px 100%',
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0 50 10 T 100 10' stroke='black' fill='transparent' stroke-width='10'/%3E%3C/svg%3E")`,
          WebkitMaskSize: '40px 100%',
        }}
      />
    </span>
  );
};

  // State to store progress for animation
  const language = [
    { id: 1, name: 'English', percentage: 90 },
    { id: 2, name: 'Spanish', percentage: 60 },
    { id: 3, name: 'French', percentage: 20 },
    { id: 4, name: 'German', percentage: 40 },
];

const [progresses, setProgresses] = useState(
    language.map((lang) => ({ ...lang, currentProgress: 0 })) // Initialize progress at 0
);

  const [progress, setProgressValues] = useState([
    { id: 1, name: 'SHOT PLANNING', percentage: 0,img:'post.jpg' },
    { id: 2, name: 'PHOTOGRAPHY', percentage: 0 },
    { id: 3, name: 'EDITING', percentage: 0 },
    { id: 4, name: 'VISUAL STORYTELLING', percentage: 0 },
  ]);

  useEffect(() => {
    console.log(setProgresses);
    
    // Simulate updating progress after component mount
    setProgressValues([
      { id: 1, name: 'SHOT PLANNING', percentage: 70,img:'post.jpg' },
      { id: 2, name: 'PHOTOGRAPHY', percentage: 85,img:'post.jfif' },
      { id: 3, name: 'EDITING', percentage: 60,img:'cover-img.webp' },
      { id: 4, name: 'VISUAL STORYTELLING', percentage: 70 ,img:'home.avif'},
    ]);
  }, []); 

const features = [
  { 
    id: '01', 
    title: 'Rotoscoping', // Updated for that 'pro' feel
    detail: 'Cutting out subjects to tuck text behind them, creating a 3D sense of space.', 
icon: 'lucide:user-square'  },
  { 
    id: '02', 
    title: 'Kinetic Shakes', 
    detail: 'Simulated physical camera impact for high-energy moments.', 
icon: 'lucide:zap'  },
  { 
    id: '03', 
    title: 'Motion Callouts', 
    detail: 'Precision tracking of elements within a moving shot.', 
icon: 'lucide:focus'  },
  { 
    id: '04', 
    title: 'Geometric Continuity', 
    detail: 'Seamless match-cut logic using similar shapes and motion.', 
icon: 'lucide:combine'  },
  { 
    id: '05', 
    title: 'Temporal Ramping', 
    detail: 'Dynamic speed-curve manipulation to control narrative pace.', 
    icon: 'lucide:timer' // Looks like a speed curve/graph
  },
  { 
    id: '06', 
    title: 'Audio Bridges', 
    detail: 'Subliminal J/L-cut transitions for seamless storytelling.', 
    icon: 'lucide:mic-2'// Represents audio frequencies/waves
  }
];

const tools = [
  {
    id: 1,
    icon: "acid.png",
    title: "Avid Media Composer"
  },
  {
    id: 2,
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    title: "Premiere Pro"
  },
  {
    id: 3,
    icon: "finalcut.webp",
    title: "Final Cut Pro"
  },
  {
    id: 4,
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
    title: "DaVinci Resolve"
  }
];


  const timelineRef = useRef(null);
  const [openItem, setOpenItem] = useState(null);
  const [openMonth, setOpenMonth] = useState({});
  const itemRefs = useRef([]);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openItem !== null &&
        itemRefs.current[openItem] &&
        !itemRefs.current[openItem].contains(e.target)
      ) {
        setOpenItem(null);
        setOpenMonth({});
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openItem]);
  
  
  

  const details = [{
    id:1,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'BIRTHDAY',
    value:'18-07-1994'
  },
  {
    id:3,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'NATIONALITY',
    value:profile?.artistPersonalInformation.nationality
  },
  // {
  //   id:4,
  //   icon:<Icon icon="icon-park-outline:birthday-cake" />,
  //   name:'ETHNICITY',
  //   value:profile?.artistPersonalInformation.ethnicity
  // },
{
    id:7,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'GENDER',
    value:profile?.artistPersonalInformation.gender
  },{
    id:9,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'MARITAL STATUS',
    value:profile?.artistPersonalInformation.maritalStatus
  }]

  const physicalAttribute = [{
    id:1,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'DISTINCTIVE FEATURES',
    value:profile?.physicalAttribute.distinctFeatures
  },

  {
    id:3,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'TATTOOS',
    value:profile?.physicalAttribute.tattoos === true ? "Yes" : "No"
  },
  {
    id:4,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'HEIGHT',
    value:profile?.physicalAttribute.height
  },
  {
    id:5,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'WEIGHT',
    value:profile?.physicalAttribute.weight
  },
  {
    id:6,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'BODYTYPE',
    value:profile?.physicalAttribute.bodyType
  }

  ,{
    id:9,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'EYE COLOR',
    value:profile?.physicalAttribute.eyeColor
  },{
    id:10,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'CLOTHING SIZE',
    value:profile?.physicalAttribute.clothingSize
  }

  ,{
    id:12,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'VOICE TYPE',
    value:profile?.physicalAttribute.voiceType
  }]

  const option = [
    {
      id: 1,
      name: "Queries",
      icon: <Icon className="w-8 h-8" icon="material-symbols:help" />,
      path: `/user/${userId}`,
    },
  ];

  const handleHover = (id) => {
    setHover(id);
  };

  const closeHover = () => {
    setHover(null);
  };

  // Ref for storing the element to observe
  const countUpRef = useRef(null);
  const [inView, setInView] = useState(false);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profession/get-all-details/1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Intersection Observer for lazy loading the count-up animation
  useEffect(() => {
    const countNode = countUpRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountVisible(true)
          setInView(true);  // Set inView to true when the section is in the viewport
        }
      },
      { threshold: 0.5 }  // The section should be 50% visible to trigger
    );
    
    if (countNode) {
      observer.observe(countNode);
    }

    return () => {
      if (countNode) {
        observer.unobserve(countNode); // Clean up observer on unmount
      }
    };
  }, []);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const clientNode = clientsRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setClientsVisible(true);  // Set clientsVisible to true when the section is in view
        }
      },
      { threshold: 0.5 }  // Trigger when 50% of the section is visible
    );
    
    if (clientNode) {
      observer.observe(clientNode);
    }

    return () => {
      if (clientNode) {
        observer.unobserve(clientNode);
      }
    };
  }, []);

  useEffect(() => {
    const testinonialNode = testimonialsRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);  // Set clientsVisible to true when the section is in view
        }
      },
      { threshold: 0.9 }  // Trigger when 50% of the section is visible
    );

    if (testinonialNode) {
      observer.observe(testinonialNode);
    }

    return () => {
      if (testinonialNode) {
        observer.unobserve(testinonialNode);
      }
    };
  }, []);
  
  const items =[
    {id:1,name:'Angela',profileImagePath:'wills.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},{id:1,name:'John',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},
    {id:1,name:'Stephen',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},{id:1,name:'Maddy',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},
 
  ]

  const carousel = items.map((review)=>(
// Wrapper for each carousel item

  <div className="px-4 py-10 flex justify-center">
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/10 p-10 md:p-16 rounded-[2rem] shadow-2xl flex flex-col items-center text-center">
      
      {/* Icon */}
      <Icon className="text-emerald-400 w-12 h-12 mb-8 opacity-60" icon="ri:double-quotes-l" />

      {/* Quote */}
      <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-10 tracking-wide italic">
        "{review.content}"
      </p>

      {/* Author */}
      <div className="flex flex-col items-center gap-4">
        <img 
          src="/profile.jpg" 
          className="w-16 h-16 rounded-full border-2 border-emerald-500 grayscale hover:grayscale-0 transition-all duration-700"
          alt={review.name}
        />
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase">{review.name}</h4>
          <p className="text-emerald-500 text-[10px] font-black tracking-[0.2em] uppercase mt-1">
            Photographer
          </p>
        </div>
      </div>
    </div>
  </div>
 ))
 
 const setGallery = [
    { title: "Cyber-Noir Set", location: "Tokyo", category: "Film", size: "col-span-2 row-span-2" },
    { title: "Vogue Spring", location: "Paris", category: "Fashion", size: "col-span-1 row-span-1" },
    { title: "Minimalist Loft", location: "Berlin", category: "Commercial", size: "col-span-1 row-span-1" },
    { title: "Neon Jungle", location: "NYC", category: "Music Video", size: "col-span-2 row-span-1" },
  ];



  const accolades = [
    { year: "2025", title: "Best Visual Concept", event: "Cannes Lions" },
    { year: "2024", title: "Excellence in Production Design", event: "ADG Awards" },
    { year: "2023", title: "Emerging Art Director", event: "Young Guns" }
  ];

  const data = [
    {
      id: 1,
      name: 'PORTRAIT',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 2,
      name: 'ENGAGEMENT',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 3,
      name: 'COMMERCIAL',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 4,
      name: 'PERSONAL',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
  ];

    useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);
  
  const work = [
    {
      id: 1,
      name: 'HAPPY CLIENTS',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 2,
      name: 'WORKING HOURS',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 3,
      name: 'AWARDS WON',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
    {
      id: 4,
      name: 'PROJECTS COMPLETED',
      service: 'You can drag and drop an image from your computer onto the editing screen. After all, if a customer has.',
    },
  ];

  const logo = [{
    id:1,
    img:'icon-2.png'
  },
  {
    id:2,
    img:'icon1.png'
  },
  {
    id:3,
    img:'icon-5.png'
  },
  {
    id:4,
    img:'icon-6.png'
  },
  {
    id:5,
    img:'icon-5.png'
  },
  {
    id:6,
    img:'icon-6.png'
  },
  {
    id:7,
    img:'icon-2.png'
  },
  {
    id:8,
    img:'icon1.png'
  }]

  const startValues = [1, 10, 100, 1000];
  const endValues = [550, 825, 45, 348];



  
const handleMouseEnter = (e) => {
  const card = e.currentTarget
  const { width, height, top, left } = card.getBoundingClientRect()
  const x = e.clientX - left
  const y = e.clientY - top

  const directions = [
    { dir: 'top', value: y },
    { dir: 'bottom', value: height - y },
    { dir: 'left', value: x },
    { dir: 'right', value: width - x },
  ]

  const min = directions.reduce((a, b) => (a.value < b.value ? a : b))
  card.setAttribute('data-dir', min.dir)
  card.classList.add('hovered')
}




  const addInterest = async (interest,option)=>{

    if (!interest.trim()) {
      console.log("No interest provided, request will not be sent.");
      return;
    }
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profession/1/skills?newSkill=${interest}&isAdd=${option}`,{
        method:'PATCH',
        headers:{
          'Authorization':`Bearer ${token}`
        },
      })
      if(response.ok){
        console.log('')
        setInterest('')
        fetchProfile()
      }
      else{
        console.log('error in posting data')
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const handleTechniques = async (technique,option)=>{

    if (!technique.trim()) {
      console.log("No interest provided, request will not be sent.");
      return;
    }
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profession/1/techniques?newTechniques=${technique}&isAdd=${option}`,{
        method:'PATCH',
        headers:{
          'Authorization':`Bearer ${token}`
        },
      })
      if(response.ok){
        console.log('')
        setTechniques('')
        fetchProfile()
      }
      else{
        console.log('error in posting data')
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const handleHobbies = async (hobbies,option)=>{

    if (!hobbies.trim()) {
      console.log("No interest provided, request will not be sent.");
      return;
    }
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profession/1/Hobbies?hobbies=${hobbies}&isAdd=${option}`,{
        method:'PATCH',
        headers:{
          'Authorization':`Bearer ${token}`
        },
      })
      if(response.ok){
        console.log('')
        setHobbies('')
        fetchProfile()
      }
      else{
        console.log('error in posting data')
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const upperImages = ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg'];
  const lowerImages = ['/picA.jpg', '/picB.jpg', '/picC.jpg', '/picD.jpg', '/picE.jpg'];

const ImageCard = ({ src }) => (
  <div className="w-64 h-80 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
    <img src={src} alt="" className="w-full h-full object-cover" />
  </div>
);

  // 1. Get references to the rows
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const sectionRef = useRef(null); // Reference for the main section to determine scroll bounds

  
  // y: starts 100px below its position, slides up to 0
  // 2. Set the effect multiplier
  // Determines how fast the rows move relative to the page scroll
  const speed = 0.5;

const handleScroll = () => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;
    if (typeof window === 'undefined') return; 

    // A. Get the position relative to the viewport.
    const rect = sectionRef.current.getBoundingClientRect();
    
    // B. Calculate the offset based on how far the top of the section is from the top of the viewport.
    // When rect.top is 0, the section is perfectly at the top of the screen.
    // We want the transformation to start from a certain point.
    
    // A great driving value is how far the *center* of the section is from the viewport center, 
    // but the simplest is just using rect.top.
    const relativePosition = rect.top; // When scrolling down, this value goes from positive to negative.
    
    // D. Apply the transform
    const speed = 0.5; // Controls the movement speed
    
    // Use the relative position as the driver
    // NOTE: We multiply by -1 to make the movement occur *as we scroll down*
    let transformValue = relativePosition * speed * -1; 
    
    // --- Apply the Transformation ---
    
    // Row 1 (row1Ref) moves LEFT (negative transformValue)
    if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${-transformValue}px)`;
    }

    // Row 2 (row2Ref) moves RIGHT (positive transformValue)
    if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${transformValue}px)`;
    }
};

function SkillBar({ skill }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative group">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-4">
        <div>
          <span className="text-[10px] text-zinc-500 font-bold tracking-[0.25em] uppercase">
            {skill.time}
          </span>
          <h3 className="text-white text-lg font-light tracking-tight group-hover:text-emerald-400 transition">
            {skill.name}
          </h3>
        </div>

        <span className="text-2xl font-mono text-white/90">
          {skill.level}
          <span className="text-xs text-zinc-600">%</span>
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2 w-full bg-zinc-900/60 rounded-full overflow-hidden flex gap-[3px] px-1">
        {[...Array(40)].map((_, i) => {
          const activeBlocks = Math.round(skill.level / 2.5);
          const isActive = i < activeBlocks;

          return (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView && isActive
                  ? { scaleX: 1, opacity: 1 }
                  : {}
              }
              transition={{
                duration: 0.4,
                delay: i * 0.03,
                ease: "easeOut",
              }}
              className="h-full flex-1 origin-left rounded-sm"
              style={{
                backgroundColor: isActive
                  ? skill.hexColor || "#34d399"
                  : "#27272a",
                opacity: isActive ? 1 : 0.25,
                boxShadow: isActive
                  ? `0 0 12px ${skill.hexColor || "#34d399"}55`
                  : "none",
              }}
            />
          );
        })}
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -bottom-4 left-0 h-[1px] bg-gradient-to-r from-emerald-500 to-transparent opacity-40"
      />
    </div>
  );
}


const scrollableDivRef = useRef(null);
// Ensure this structure exists in your component:
useEffect(() => {
    // 1. Attach Listener
    window.addEventListener('scroll', handleScroll);
    
    // 2. Cleanup Listener
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []); // Empty array!

// This code needs to be placed inside your main functional component (e.g., ParallaxGallery)

useEffect(() => {
    // Attach the scroll listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []); // <-- The empty dependency array [] is essential to run only once on mount

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this runs only on mount and unmount


    // move row2 slightly in opposite direction

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const sectioRef = useRef(null);
  
  // Track scroll progress of this specific section
  // 'start end' means when the top of the section hits the bottom of the viewport
  // 'end start' means when the bottom of the section leaves the top of the viewport
  const { scrollingYProgress } = useScroll({
    target: sectioRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress (0 to 1) into width percentages
  // We want it to reach 100% width when 80% of the section is visible (approx 0.8)
const scrollSectionRef = useRef(null); // 👈 renamed
  const [x, setX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = scrollSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollProgress =
        Math.min(Math.max(-rect.top / rect.height, 0), 1);

      setX(scrollProgress * -800); // horizontal scroll
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galerry = [
    {
      id:1,
      img:'gallery1.webp'
    },
        {
      id:3,
            img:'gallery2.webp'
    },
        {
      id:2,
                  img:'gallery3.webp'
    },
        {
      id:4,
                  img:'gallery5.jpg'
    },
        {
      id:5,
                  img:'gallery6.webp'
    },
        {
      id:6,
                  img:'post.jfif'
    },
  ]

  function SkillCard({ skill }) {
  return (
    <div className="min-w-[420px] h-[250px] rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-between">
      <h3 className="text-lg">{skill.name}</h3>

      <div className="flex gap-[3px] h-2">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background:
                i < skill.level / 2.5
                  ? "#34d399"
                  : "#2a2a2a",
            }}
          />
        ))}
      </div>
    </div>
  );
}

  





const skillSectionRef = useRef(null);      // renamed
  const skillTrackRef = useRef(null);
  const [translateXValue, setTranslateXValue] = useState(0); // renamed

  useEffect(() => {
    const onScroll = () => {
      if (!skillSectionRef.current || !skillTrackRef.current) return;

      const section = skillSectionRef.current;
      const track = skillTrackRef.current;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(
          (viewportHeight - rect.top) /
            (rect.height - viewportHeight),
          0
        ),
        1
      );

      const maxScroll =
        skillTrackRef.current.scrollWidth - window.innerWidth;

      // right → left
      setTranslateXValue(maxScroll * (1 - progress));
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const containerRef = useRef(null);
  
  // Track the scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  const smoothProgress = useSpring(scrollYProgress, { 
  stiffness: 100, 
  damping: 30,
  restDelta: 0.001 
});
  // Map scroll progress to styles:
  // At 0% (start), width is 60%. At 50% (middle), width is 100%.

    const videoWidth = useTransform(smoothProgress, [0.3, 0.6], ["60%", "100%"]);
  const videoScale = useTransform(smoothProgress, [0.3, 0.6], [0.85, 1]);
  const videoRadius = useTransform(smoothProgress, [0.3, 0.6], ["40px", "12px"]);
  
  // 2. Parallax for side elements
  const leftY = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  const skill = [
  { name: 'WEBFLOW', percentage: '48%', description: 'Low-code platform', icon: '⚡' },
  { name: 'FIGMA', percentage: '50%', description: 'UI design tool', icon: '🎨' },
  { name: 'WORDPRESS', percentage: '24%', description: 'Back-end-platform', icon: 'W' },
  { name: 'FRAMER', percentage: '30%', description: 'Design app', icon: 'F' },
]

const testimonials = [
  {
    quote: "REVOX STUDIO HAS CREATED REMARKABLE WORK FOR THE WHITNEY BUILDING THAT HELPED US DEFINE NOT JUST THIS INDIVIDUAL BUILDING BUT THE NEW DIRECTION IN WHICH WE ARE HEADING AS A GROUP",
    name: "MICHAEL SARAH",
    role: "CEO AT ROLLUPLIFE INC",
    image: "https://via.placeholder.com/150", // Replace with actual image paths
  },
  {
    quote: "REVOX STUDIO HAS CREATED REMARKABLE WORK FOR THE WHITNEY BUILDING THAT HELPED US DEFINE NOT JUST THIS INDIVIDUAL BUILDING BUT THE NEW DIRECTION IN WHICH WE ARE HEADING AS A GROUP",
    name: "MICHAEL SARAH",
    role: "CEO AT ROLLUPLIFE INC",
    image: "https://via.placeholder.com/150",
  },
];

const fabrics = [
  {
    id:1,
    name:'cotton.jpg'
  },  {
    id:2,
    name:'silk.png'
  },  {
    id:3,
    name:'modal.png'
  },  {
    id:4,
    name:'acetate.png'
  },  {
    id:5,
    name:'herb.png'
  },  {
    id:6,
    name:'jute.png'
  },
]

  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  };

  const images = [
'wardrobe1.jpg',
'wardrobe2.jpg',
'wardrobe3.jpg',
'wardrobe4.jpg',
'wardrobe5.jpg',
'wardrobe6.jpg',
];

const doubledImages = [...images, ...images];

const timelineData = [
  {
    title: "Bachelor of Film Production",
    institution: "New York Film Academy",
    duration: "2012 – 2016",
    description:
      "Architecting high-impact narratives from capital injection to global distribution. I solve problems before they hit the balance sheet."
  },
    {
    title: "Line Producer",
    institution: "Silverline Studios",
    duration: "2017 – 2020",
    description:
      "Architecting high-impact narratives from capital injection to global distribution. I solve problems before they hit the balance sheet."
  },
  {
    title: "Executive Producer",
    institution: "Silverline Studios",
    duration: "2020 – Present",
    description:
      "Architecting high-impact narratives from capital injection to global distribution. I solve problems before they hit the balance sheet."
  },

];


const reviews = [
    {
      id: 1,
      text: "The attention to historical detail in the Victorian pieces was breathtaking. A true master of silhouette.",
      author: "Sarah Jenkins",
      role: "Production Designer, BBC"
    },
    {
      id: 2,
      text: "Transformed our lead actor's presence through texture and aging. The wardrobe told a story on its own.",
      author: "Marcus Thorne",
      role: "Film Director"
    },
    {
      id: 3,
      text: "Incredible efficiency with budgeting without ever compromising the visual integrity of the costumes.",
      author: "Elena Rossi",
      role: "Executive Producer"
    }
  ];

  const contacts = [
    {
      icon:call,
      title: "Call me!",
      value: "(+81) 946 159 90",
    },
    {
      icon:mail,
      title: "Mail!",
      value: "Peterparker_07@gmail.com",
    },
    {
      icon:address,
      title: "Reach out!",
      value: "AVE 11, NEW YORK, USA",
    },
  ];

  const ContactItem = ({ icon, title, value }) => (
  <div className="flex items-center bg-gradient-to-br from-[#0F0F0F] via-[#0F0F0F] to-[#EE5757]/40 rounded-xl p-8 gap-6 py-6 last:border-none">
    {/* Icon Container */}
<Icon className="text-[#EE5757]" icon="fa6-solid:phone" />
    {/* Text Content */}
    <div className="flex flex-col">
      <span className="text-gray-400 text-lg font-medium">{title}</span>
      <span className="text-white text-2xl font-bold tracking-tight">
        {value}
      </span>
    </div>
  </div>
);



const carouselItems = reviews.map((review) => (
    <div key={review.id} className="px-4 py-12">
      {/* Width-accommodated Card with Border */}
      <div className="max-w-2xl mx-auto bg-[#111111] border  border-[#EE5757] border-2 rounded-xl transition-colors duration-500 p-8 md:p-12 relative">
        
        {/* Accent Corner Detail */}
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#EE5757] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col items-center text-center">
          {/* Reviewer Image */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#EE5757] p-1">
              <img 
                src={review.image} 
                alt={review.author} 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            {/* Quote Badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#EE5757] text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-serif">
              “
            </div>
          </div>
          
          {/* Review Text */}
          <p className="text-xl md:text-2xl font-light tracking-tight text-gray-200 leading-relaxed mb-8 italic">
            "{review.text}"
          </p>

          {/* Author Info */}
          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-sm">
              {review.author}
            </h4>
            <div className="w-8 h-[1px] bg-[#EE5757] my-3" />
            <p className="text-gray-500 font-mono text-xs uppercase tracking-tighter">
              {review.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
  const services = [
    { id: '01', title: 'Fabric Manipulation',pewrcentage:'90%' },
    { id: '02', title: 'Corsetry & Foundation',pewrcentage:'70%' },
    { id: '03', title: 'Millinery & Accessories',pewrcentage:'90%' },
    { id: '04', title: 'Budgeting & Logistics',pewrcentage:'90%' },
    { id: '05', title: 'Digital Rendering',pewrcentage:'80%' },
  ];

  const fashionImages = [
'wardrobe1.jpg',
'wardrobe2.jpg',
'wardrobe3.jpg',
'wardrobe4.jpg',
'wardrobe5.jpg',
'wardrobe6.jpg',
  ];

  const pipeline = [
    { title: 'Development', desc: 'Script acquisition & financing.' },
    { title: 'Pre-Prod', desc: 'Resource scaling & logistics.' },
    { title: 'Production', desc: 'On-set executive oversight.' },
    { title: 'Post-Distribution', desc: 'Market strategy & delivery.' },
  ];

  const capabilities = [
    { title: 'Fiscal Oversight', percentage: '98%' },
    { title: 'Strategic Negotiation', percentage: '95%' },
    { title: 'Risk Management', percentage: '92%' },
    { title: 'Talent Packaging', percentage: '88%' },
  ];

  const awards = [
  { id: 1, year: '2025', title: 'Grand Jury Prize', film: 'The Silent Horizon', festival: 'Sundance Film Festival' },
  { id: 2, year: '2024', title: 'Best Executive Producer', film: 'Neon Nights', festival: 'Cannes Lions' },
  { id: 3, year: '2023', title: 'Golden Statue', film: 'Echoes of Manhattan', festival: 'Academy Awards' },
  { id: 4, year: '2022', title: 'Visionary Award', film: 'Abstract Reality', festival: 'TIFF' },
];

const skills = [
    { name: "Visual Identity", icon: <Eye size={20} />, level: "95%" },
    { name: "Set Design", icon: <Layers size={20} />, level: "88%" },
    { name: "Post Production", icon: <Cpu size={20} />, level: "92%" },
    { name: "Conceptual Art", icon: <Award size={20} />, level: "90%" },
  ];

  const experience = [
    { role: "Senior Art Director", company: "NEON STUDIOS", year: "2024-26", desc: "Crafting visual worlds for high-end cinematic commercials." },
    { role: "Visual Consultant", company: "VOGUE GLOBAL", year: "2022-24", desc: "Editorial styling and aesthetic strategy for digital covers." },
  ];

const displayItems = [...testimonials, ...testimonials];

  return (
<div className="bg-[#0a0c10] text-[#e0e0e0] font-sans selection:bg-[#ccff00] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-end p-6 md:p-16 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-[10px] tracking-[0.5em] uppercase text-[#ccff00] font-bold rotate-90 origin-right">
          Portfolio Archive — 2026
        </div>
        <div className="max-w-7xl w-full z-10">
          <h1 className="text-8xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">
            Art <br /> 
            <span className="italic font-serif font-light text-[#ccff00] lowercase tracking-normal">Directing.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
            <div className="md:col-span-2">
              <p className="text-2xl md:text-4xl font-light leading-snug max-w-2xl border-l-4 border-[#ccff00] pl-8">
                Curating <span className="text-white font-bold">visceral environments</span> where storytelling meets architectural precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SET WORK GALLERY (Asymmetric Grid) */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-7xl font-black uppercase tracking-tighter">Set <br /> Gallery</h2>
            <p className="text-xs tracking-widest font-bold uppercase opacity-40">Visual Environments [04]</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
            {setGallery.map((work, i) => (
              <div key={i} className={`${work.size} relative group overflow-hidden bg-gray-200`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700 z-10" />
                <img 
                  src="gallery1.webp" 
                  alt={work.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-1 uppercase inline-block">{work.category}</p>
                  <h3 className="text-white text-2xl font-black uppercase mt-2">{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SKILLS & TECHNICALS */}
      <section className="py-32 px-6 bg-[#0d0f14]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#ccff00] text-xs tracking-[1em] uppercase mb-20">Technical Skillset</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {skills.map((skill, i) => (
              <div key={i} className="bg-[#14171d] p-12 border border-white/5 hover:border-[#ccff00]/50 transition-all group">
                <div className="text-[#ccff00] mb-12">{skill.icon}</div>
                <h3 className="text-xl font-bold uppercase tracking-tighter">{skill.name}</h3>
                <div className="w-full h-[2px] bg-white/10 mt-6 overflow-hidden">
                  <div className="h-full bg-[#ccff00]" style={{ width: skill.level }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AWARDS SECTION (The Credit Roll) */}
      <section className="py-32 px-6 bg-[#0a0c10] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#ccff00]">Accolades</h2>
              <p className="text-gray-500 mt-4 uppercase text-[10px] tracking-widest font-bold">Recognition for creative excellence</p>
            </div>
            <div className="lg:col-span-8 divide-y divide-white/10">
              {accolades.map((item, i) => (
                <div key={i} className="py-8 flex justify-between items-center group cursor-default">
                  <div>
                    <span className="text-sm font-mono text-[#ccff00]">{item.year}</span>
                    <h3 className="text-2xl font-bold uppercase group-hover:translate-x-4 transition-transform">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 5. TESTIMONIALS (The Narrative) */}
      <section className="py-32 px-6 bg-[#ccff00] text-black">
        <div className="max-w-5xl mx-auto">
/          <div className="space-y-24">
            {testimonials.map((t, i) => (
              <div key={i} className="border-b border-black/10 pb-16 last:border-0">
                <p className="text-3xl md:text-5xl font-serif italic leading-tight mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-black"></div>
                  <div>
                    <p className="font-black uppercase tracking-tighter">{t.name}</p>
                    <p className="text-xs uppercase font-bold opacity-60 tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT HUB */}
      <footer className="bg-black py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
                Let's <br /> Build.
              </h2>
              <p className="text-gray-500 max-w-sm">Open for Art Direction, Set Design, and Aesthetic Consulting for 2026/27.</p>
            </div>
            
            <div className="flex flex-col justify-center space-y-8">
              <div className="group flex items-center justify-between border-b border-white/10 pb-8 hover:border-[#ccff00] transition-colors cursor-pointer">
                <span className="text-4xl font-serif italic">hello@saran.studio</span>
                <ArrowUpRight className="text-[#ccff00] group-hover:rotate-45 transition-transform" size={40} />
              </div>
              <div className="flex gap-12">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Inquiries</p>
                  <p className="text-lg font-bold">+1 (212) 946 0000</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Studio</p>
                  <p className="text-lg font-bold">Brooklyn, NY</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-8 border-t border-white/5 flex justify-between text-[10px] uppercase tracking-[0.5em] text-gray-700">
            <span>Saran Studio © 2026</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutArtdirection;