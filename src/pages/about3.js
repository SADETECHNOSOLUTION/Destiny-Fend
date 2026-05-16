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


const AboutCostume = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [profile, setProfile] = useState();
  const [openSkillsPopup,setSkillsPopup] = useState(false);
  const [openTechniquesPopup,setTechniquesPopup] = useState(false);
  const [hobbiesPopup,setHobbiesPopup] = useState(false);

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
const experienceData = [
  {
    title: "Previous Projects",
    months: [
      {
        month: "Jan 2024",
        works: [
          "Project A – Frontend Development",
          "Project B – API Integration",
        ],
      },
      {
        month: "Feb 2024",
        works: [
          "Project C – UI Revamp",
        ],
      },
    ],
  },
  {
    title: "Directors Worked With",
    months: [
      {
        month: "2023",
        works: [
          "Director John Doe",
          "Director Jane Smith",
        ],
      },
    ],
  },
  {
    title: "Improvisation Experience",
    months: [
      {
        month: "2022",
        works: [
          "Live improv shows",
          "Workshop participation",
        ],
      },
    ],
  },
];

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
  // const [activeItems, setActiveItems] = useState([]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setActiveItems((prev) => [...prev, entry.target]);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );

  //   const elements = document.querySelectorAll('.testimonial-item');
  //   elements.forEach((element) => observer.observe(element));

  //   return () => {
  //     elements.forEach((element) => observer.unobserve(element));
  //   };
  // }, []);


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

      const projects = [

    { title: "Formal", pos: "top-0 left-10", idx: "",src:"/job.jpg" },

    { title: "190 architekture", pos: "top-20 right-10", idx: "",src:"/frame.jpg" },

    { title: "Blossom", pos: "top-2/3 right-0 ", idx: "",src:"/post.jpg" },

    { title: "MUFC", pos: "top-1/2 right-5/6", idx: "",src:"/post.jfif" },

  ];

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

  

  const skills = [
    { name: "Narrative Cutting", level: 95, color: "from-emerald-500", time: "00:09:50" },
    { name: "Color Grading", level: 88, color: "from-orange-500", time: "00:08:80" },
    { name: "Sound Design", level: 75, color: "from-blue-500", time: "00:07:50" },
    { name: "Motion Graphics", level: 82, color: "from-purple-500", time: "00:08:20" },
  ];




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

const displayItems = [...testimonials, ...testimonials];

  return (
    <div className="bg-cta">

    <div className="flex justify-center cursor-noe  bg-[#0F0F0F] rounded-3xl text-white">

<div className="flex flex-col w-full items-center scrollbar-hidden overflow-y-auto gap-6" >

    <section className="relative min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-[#EE5757] selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EE5757]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#EE5757]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT: Designer Statement */}
        <div className="flex-1 space-y-8 bg- text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4">
            <p className="text-white text-lg md:text-xl leading-relaxed font-xl max-w-xl">
              A visionary Costume Designer who constructs the visual identity from the initial sketch to the final fitting, my process is a deep dive into narrative.

          I specialize in <span className="text- font-medium text-[#EE5757]">period-accurate tailoring</span> and

          <span className="text- font-medium text-[#EE5757]"> avant-garde fabrication</span>, ensuring every

          button and drape tells a story of status, era, and emotion.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {details.map((info) => (
              <div key={info.id} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:border-[#EE5757]/50 transition-all">
                <span className="text-[10px] font-bold text-[#EE5757] uppercase tracking-tighter">{info.name}:</span>
                <span className="ml-2 text-xs font-bold text-white uppercase">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Profile Image */}
        <div className="relative group order-1 lg:order-2">
          {/* Animated Rings */}
          <div className="absolute -inset-6 border border-[#EE5757]/20 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none"></div>
          <div className="absolute -inset-10 border border-[#EE5757]/10 rounded-full animate-[spin_35s_linear_infinite_reverse] pointer-events-none"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden border-2 border-[#EE5757]/30 shadow-[0_0_60px_rgba(238,87,87,0.15)] group-hover:border-[#EE5757] transition-all duration-500">
            <img 
              className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
              src="profile.jpg" 
              alt="Designer Profile" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
          </div>

          {/* Floater Text */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-8 py-4 border border-white/10 rounded-xl text-center min-w-[200px]">
            <h1 className="text-4xl font-black tracking-tighter leading-none text-white">
              SARAN <span className="text-transparent stroke-text"></span>
            </h1>
            <h2 className="text-[#EE5757] font-bold tracking-[0.3em] uppercase text-[10px] mt-1">Costume Designer</h2>
          </div>
        </div>

        {/* RIGHT: Contact Info */}
        <div className="flex-1 w-full lg:w-auto flex flex-col items-center lg:items-end  order-3">
          <div className=" p-6 rounded-3xl  backdrop-blur-xl w-full">
            {contacts.map((item, index) => (
              <ContactItem key={index} Icon={item.Icon} title={item.title} value={item.value} />
            ))}
          </div>
        </div>
      </div>


      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
        }
      `}</style>
    </section>

{/* We add 'overflow-hidden' to prevent the corners from creating horizontal scroll */}
{/* Remove overflow-hidden from here if you want the slanted edges to "bleed" out naturally */}
<div className=" w-full overflow-hidden">
      {/* The decorative lines above the text */}
      <div className="flex flex-col gap-1 mb-">
        <div className="h-[2px] bg-[#EE5757] w-full" />
        <div className="h-[4px] bg-[#EE5757] w-full" />
        <div className="h-[6px] bg-[#EE5757] w-full" />
                <div className="h-[8px] bg-[#EE5757] w-full" />
              <div className="h-[10px] bg-[#EE5757] w-full" />
                    <div className="h-[12px] bg-[#EE5757] w-full" />
        <div className="h-[14px] bg-[#EE5757] w-full" />
      </div>

      {/* The Scrolling Container */}
<div className="bg-[#EE5757] w-full flex py-4 whitespace-nowrap overflow-hidden border-y-2 border-black">
  {/* The container that moves */}
  <div className="animate-marquee flex items-center">
    
    {/* 1. First set of logos */}
    <div className="flex items-center space-x-12 px-6">
      <img src="logo-2.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-3.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-4.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-11.png" alt="Logo" className="h-12 md:h-20 object-contain" />
    </div>

    {/* 2. Exact duplicate of the logos for seamless looping */}
    <div className="flex items-center space-x-12 px-6">
      <img src="logo-2.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-3.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-4.png" alt="Logo" className="h-12 md:h-20 object-contain" />
      <img src="logo-11.png" alt="Logo" className="h-12 md:h-20 object-contain" />
    </div>

    {/* 3. Add a third if your screen is ultra-wide */}

    
  </div>
</div>

      {/* Matching lines below if needed, or just a solid black base */}
      <div className="h- bg- w-full" />
    </div>
<div className="relative mt-24 text-center">
  <h2 className="relative z-10 text-lg md:text-5xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#EE5757] via-white to-[#EE5757] animate-gradient-x">
    fabrics stitched
  </h2>

  <div className="absolute inset-x-0 -bottom-6 mx-auto h-12 w-64 bg-emerald-400/20 blur-3xl" />
</div>
  <div className="flex justify-center h-40 w-full mt-10 items-center gap-10">
    {fabrics.map((fabric)=>(
      <div className="flex flex-col items-center gap-4">

<div className="w-40 h-40 border-2 border-white rounded-full ">
<img src={fabric.name} className="w-full h-full rounded-full object-cover" />
</div>
<span className="font-semibold uppercase text-white">
{fabric.name.split('.')[0]}
</span>
</div>
    ))}

  </div>



<section className="relative w-full py-32 px-8 overflow-hidden">
      {/* 1. Subtle Grain Overlay (Makes the dark bg feel like fabric) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-24 relative z-10">
        
        {/* Left: The "Creative Director" Header */}
        <div className="flex flex-col justify- gap-6 min-h-[400px]">
<div className="relative mt-24 text-">
  <h2 className="relative z-10 text-lg md:text-5xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#EE5757] via-white to-[#EE5757] animate-gradient-x">
   Crafting skills
  </h2>

  <div className="absolute inset-x-0 -bottom-6 mx-auto h-12 w-64 bg-emerald-400/20 blur-3xl" />
</div>

          <div className="space-y-4 border-l border-white/60 pl-2">
            <p className="text-gray-500 text- max-w-xs italic">
              "Every stitch tells a story, every silhouette defines a character's behaviour."
            </p>
          </div>
        </div>

        {/* Right: The High-Precision Bars */}
        <div className="flex flex-col gap-12">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              whileHover={{ x: 10 }}
              className="group cursor-crosshair"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-white  transition-colors duration-300">
                  {service.title}
                </h3>
                                <h3 className="text-2xl font-bold text-[#EE5757] transition-colors duration-300">
                  {service.pewrcentage}
                </h3>
              </div>

              {/* The Thick Accent Bar (Modified based on your request) */}
              <div className="relative w-full h-[20px] bg-white/5 overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: service.pewrcentage }}
                  transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
                  viewport={{ once: true }}
                  className="h-full bg-[#EE5757] relative shadow-[0_0_20px_rgba(238,87,87,0.2)]"
                  style={{ width: service.pewrcentage }}
                >
                  {/* Subtle 'Sheen' effect that moves across the bar */}
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .group:hover .stroke-text {
          -webkit-text-stroke: 1px #EE5757;
          transition: 0.5s;
        }
      `}</style>
    </section>
    <div className="relative text-">
  <h2 className="relative z-10 text-lg md:text-5xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#EE5757] via-white to-[#EE5757] animate-gradient-x">
   wardrobe
  </h2>

  <div className="absolute inset-x-0 -bottom-6 mx-auto h-12 w-64 bg-emerald-400/20 blur-3xl" />
</div>

<div className="relative w-full py-20 overflow-hidden flex items-center justify-center">
      
      {/* LEFT SIDE: Experience Card with Enhanced Shadow */}


      {/* THE MAIN CROSS CONTAINER */}
      <div className="relative w-full h-[600px] transform -skew-x-[18deg] flex">
        
        {/* LEFT RED END: Added Texture */}
        <div className="absolute left-[-10%] z-10 w-[20%] h-[550px] bg-[#EE5757] -skew-x-[15deg]">

           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 10px' }}></div>

        </div>

<div className="relative w-full h-[550px] transform -skew-x-[14deg] border-x-[20px] border-[#EE5757] overflow-hidden bg-[#111]">
        
        {/* SCROLLING INNER STRIP */}
        <div className="flex h-full animate-infinite-scroll">
          {doubledImages.map((img, index) => (
            <div 
              key={index} 
              className="min-w-[400px] h-full border-r-4 border-black/40 overflow-hidden relative"
            >
              {/* IMPORTANT: We skew the image +18 degrees to keep the model vertical */}
              {/* We also scale it up to prevent the edges from clipping due to the skew */}
              <img 
                src={img} 
                alt="Fashion Gallery" 
                className="w-full h-full object-cover skew-x-[18deg] scale-150 origin-center" 
              />
              
              {/* Subtle Red Overlay on images to tie it all together */}
              <div className="absolute inset-0 bg-[#EE5757]/10 hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

        {/* RIGHT RED END: Added Vertical Text */}
        <div className="absolute right-[-10%] z-10 w-[20%] h-[550px] bg-[#EE5757] -skew-x-[15deg]">

           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 10px' }}></div>

        </div>


      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>

      <div className="flex flex-col w-full">


<AliceCarousel
  mouseTracking
  infinite
  disableDotsControls={true}
  disableButtonsControls={false}

  items={carouselItems}
  responsive={{
    0: { items: 1 },
    1024: { items: 3 }
  }}

  animationDuration={600}
  animationEasingFunction="ease-out"
  autoPlay={false}

  renderPrevButton={() => (
    <button className="carousel-btn carousel-btn-prev bg-[#EE5757] w-8 h-8 rounded-full">
      ←
    </button>
  )}

  renderNextButton={() => (
    <button className="carousel-btn bg-[#EE5757] rounded-full w-8 h-8 flex items-center justify-center carousel-btn-next">
      →
    </button>
  )}
/>


      </div>

      <section className="relative min-h-screen w-full bg-[] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 1. BACKGROUND GLOWS (Blur Blobs) */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#EE5757]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. DOT GRID BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Top Header */}
        <h1 className="text-6xl md:text-7xl font-semibold text-[#fff] mb-4 tracking-tight">
          Let's start Crafting
        </h1>

        {/* THE "VISUAL IMPACT" GLASS BOX */}
        <div className="relative mt-2">
          
          {/* Tag: Creative (Top Left) */}
          <div className="absolute -top-16 -left-20 flex items-center gap-2">
            <div className="px-5 py-2 bg-[#EE5757] rounded-full text-white text-sm font-medium shadow-lg">
              Creative
            </div>
            <div className="text-[#7C3AED] -ml-2 -mt-2 rotate-[-15deg]">
            
            </div>
          </div>

          {/* Main Glassmorphic Container */}
          <div className="backdrop-blur-xl bg-white/40 border-2 border-[#EE5757] px-16 py-10 rounded-[3rem] shadow-2xl shadow-black/5 rotate-[-2deg]">
            <h2 className="text-7xl md:text-8xl font-bold text-[#EE5757] tracking-tight">
              Visual Impact
            </h2>
          </div>

          {/* Tag: Impactful (Top Right) */}
          <div className="absolute -top-4 -right-24 flex items-center gap-2">
            <div className="text-[#7C3AED] rotate-[165deg] -mr-3">
              
            </div>
            <div className="px-5 py-2 bg-[#EE5757] rounded-full text-white text-sm font-medium shadow-lg">
              Tactile
            </div>
          </div>
        </div>

        {/* START PROJECT BUTTON */}
        <div className="mt-16">
          <button className="px-8 py-3 bg-white text-[#EE5757] rounded-full font-medium text-lg hover:scale-105 transition-transform shadow-xl">
            Start a Project
          </button>
        </div>
      </div>


    </section>


            <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -40%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={openSkillsPopup} onRequestClose={handleCloseSkill}>
      <div className={`relative w-1/2 p-4 bg-white rounded-mD h-64 flex rounded-lg shadow-lg flex-col`}>
      <div className="flex w-full  flex-col gap-4">
        <div className="flex items-center justify-between">
        <span className="font-semibold text-2xl font-semibold">SKILLS/ ATTRIBUTES</span> 
        </div>
        <div className="flex items-center gap-4">
        <input
                id="interest"
                name="interest"
                onChange={handleInterestChange}
                value={interest}
                className="flex-1 mt-2 p-2 w-full border border-gray-400 rounded-md focus:outline-none "
                required
              />
              <button onClick={()=>addInterest(interest,'true')} className="py-2 h-11 px-3  text-sm text-white bg-cta rounded-md">ADD</button>
        </div>

        <div className=' w-full h-28 flex gap-4 flex-wrap overflow-y-scroll'>
          {profile?.professionalExperience.skillsAndExpertise.map((info)=>(
          <div key={info.id} className='h-9 px-2 flex items-center bg-cta bg-opacity-5 rounded-md text-cta gap-1 md:text-md sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'></span><span className='text-black'>{info}</span><Icon onClick={()=>addInterest(info,'false')} icon="ix:cancel" width="1.2em" height="1.2em" /></div>
          ))}
        </div>
        </div>
    </div>

    
 </Modal>
 <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -40%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={openTechniquesPopup} onRequestClose={handleCloseTechnique}>
      <div className={`relative w-1/2 p-4 bg-white rounded-mD h-64 flex rounded-lg shadow-lg flex-col`}>
      <div className="flex w-full  flex-col gap-4">
        <div className="flex items-center justify-between">
        <span className="font-semibold text-2xl font-semibold">ACTING TECHNIQUES</span> 
        </div>
        <div className="flex items-center gap-4">
        <input
                id="techniques"
                name="techniques"
                onChange={handleTechniquesChange}
                value={techniques}
                className="flex-1 mt-2 p-2 w-full border border-gray-400 rounded-md focus:outline-none "
                required
              />
              <button onClick={()=>{handleTechniques(techniques,'true')}} className="py-2 h-11 px-3  text-sm text-white bg-cta rounded-md">ADD</button>
        </div>

        <div className=' w-full h-28 flex gap-4 flex-wrap overflow-y-scroll'>
        {profile?.professionalExperience.methodActingTechniques.map((info)=>(
          <div key={info.id} className='p-2 h-11 flex items-center bg-cta bg-opacity-5 rounded-md text-cta gap-1 md:text-md sm:text-sm border border-cta'><span onClick={()=>{handleTechniques(info,'false')}} className='font-semibold flex items-center gap-1'><span className='text-black'>{info}</span><Icon icon="ix:cancel" width="1.2em" height="1.2em" /></span></div>
          ))}
        </div>
        </div>
    </div>
 </Modal>
 <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -40%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={hobbiesPopup} onRequestClose={closeHobbies}>
      <div className={`relative w-1/2 p-4 bg-white rounded-mD h-64 flex rounded-lg shadow-lg flex-col`}>
      <div className="flex w-full  flex-col gap-4">
        <div className="flex items-center justify-between">
        <span className="font-semibold text-2xl font-semibold">HOBBIES/ INTERESTS</span> 
        </div>
        <div className="flex items-center gap-4">
        <input
                id="hobbies"
                name="hobbies"
                onChange={handleHobbies}
                value={hobbies}
                className="flex-1 mt-2 p-2 w-full border border-gray-400 rounded-md focus:outline-none "
                required
              />
              <button className="py-2 h-11 px-3  text-sm text-white bg-cta rounded-md">ADD</button>
        </div>

        <div className=' w-full flex gap-4 h-28 flex-wrap overflow-y-scroll'>
        {physicalAttribute.map((info)=>(
          <div key={info.id} className='p-2 flex items-center bg-cta bg-opacity-5 rounded-md text-cta gap-1 md:text-md sm:text-sm border border-cta'><span onClick={()=>{handleHobbies(info.value,'false')}} className='font-semibold flex items-center gap-1'><span className='text-black'>{info.value}</span><Icon icon="ix:cancel" width="1.2em" height="1.2em" /></span></div>
          ))}
        </div>
        </div>
    </div>

 </Modal>
</div>

          {/* <nav className='flex top-0 sticky justify-between items-center md:h-11 sm:h-9 py-2 '>
            <div  className="py-2 px-4 flex gap-1 cursor-pointer items-center bg-gradient-to-tr from-span-start to-span-end text-white">
            <Icon className="w-5 h-5" icon="material-symbols:edit" />
             Edit
            </div>
      </nav> */}

      </div>
            
    </div>
  );
};

export default AboutCostume;