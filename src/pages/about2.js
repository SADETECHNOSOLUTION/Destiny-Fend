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


const AboutEdit = () => {
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


  const call=<Icon icon="fa6-solid:phone" />
  const address= <Icon icon="mdi:address-marker" width='1.4em' height='1.4em'  />
  const mail = <Icon icon="material-symbols:mail" width='1.4em' height='1.4em' />
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
      const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/get-all-details/1`, {
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
      const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/1/skills?newSkill=${interest}&isAdd=${option}`,{
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
      const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/1/techniques?newTechniques=${technique}&isAdd=${option}`,{
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
      const response = await fetch(`https://destiny-apigateway.onrender.com/api/profession/1/Hobbies?hobbies=${hobbies}&isAdd=${option}`,{
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


  const responsive = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  };

  const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
];

const doubledImages = [...images, ...images];

const carouselItems = [...images, ...images].map((img, index) => (
    <div key={index} className="px-2">
      <div className="relative h-[500px] bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
        <img 
          src={img} 
          alt={`Project ${index}`} 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-all duration-700 hover:scale-105"
        />
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_11px)]"></div>
      </div>
    </div>
  ));

const displayItems = [...testimonials, ...testimonials];

  return (
    <div className="bg-cta">

    <div className="flex justify-center cursor-noe  bg-[#0F0F0F] rounded-3xl text-white">
            <BlurCursor />
<div className="flex flex-col w-full items-center scrollbar-hidden overflow-y-auto gap-6" >

<section className="bg-[#0F0F0F] w-full h-screen flex flex-col md:p-16 font-sans text-white overflow-hidden selection:bg-white selection:text-emerald-600">
      
      {/* Top Content Area */}
<div className=" text-white p-6 md:p-12 lg:p-10 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
        
        {/* Left: Visual & Identity Section */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          
          {/* Main Image with decorative rings */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="/dp.jpg" 
                alt="Peter Parker" 
              />
            </div>
          </div>

          {/* Name & Title */}
          <div className="mt-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              PETER <span className="text-emerald-500">PARKER</span>
            </h1>
            <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="h-[1px] w-12 bg-emerald-500"></span>
              <span className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-500/80">
               Film Editor
              </span>
            </div>
          </div>

          {/* Feature: Minimalist Detail Tags */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start max-w-md">
            {details.map((info) => (
              <div 
                key={info.id} 
                className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="text-emerald-400">{info.icon}</span>
                <span className="text-xs font-medium text-zinc-400">{info.name}:</span>
                <span className="text-xs font-bold text-white">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Statement Card */}
        <div className="relative w-full lg:w-1/2 lg:mt-24">
          <div className="relative z-10 p-8 md:p-12 bg-emerald-500/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden group">
            
            {/* Animated Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-700" />
            
            <span className="text-7xl font-serif text-emerald-500/40 absolute top-4 left-6 select-none">“</span>
            
            <div className="relative z-10 space-y-6">
              <p className="text-xl md:text-4xl text-white/90 leading-snug font-medium tracking-tight">
                A creative professional Editor who transforms raw video footage into a compelling
                and meaningful story.
              </p>
              
              <p className="text-base md:text-xl text-zinc-400 leading-relaxed italic">
                By carefully selecting, trimming, and arranging shots, the editor controls the film’s flow, pacing, and emotional impact. Working closely with directors, I bring the vision of a film to life.
              </p>


            </div>
          </div>

          {/* Decorative geometric element */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-emerald-500/30 rounded-bl-3xl" />
        </div>

      </div>
    </div>

      {/* Footer Navigation (Steps) */}
      <div className="flex items-center justify-between mt-16 pt-12 border-t border-white/20">
        {[
          { step: "Call me!", title: "Call me!", desc: "9876543210",icon:call },
          { step: "Mail me!", title: "Mail me!", desc: "Peterparker_07@gmail.com",icon:mail },
          { step: "Reach out!", title: "Reach out!", desc: "AVE 11, NEW YORK, USA",icon:address },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 group cursor-pointer">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center text-xl font-bold group-hover:bg-white group-hover:text-emerald-500 transition-all duration-300">
                <span className="text-emerald-500">{item.icon}</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-emerald-500 text-[10px]">✓</span>
              </div>
            </div>
            <div>
              <p className="text-sm uppercase font-bold tracking-widest text-emerald-500 -60">{item.step}</p>
              <h4 className="text-2xl uppercase font-black tracking-tight">{item.desc}</h4>
            </div>
            {idx < 2 && (
              <div className="hidden lg:block ml-36 text-white/20 text-xl tracking-tighter">
                &gt;&gt;&gt;
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
<section 
      ref={sectionRef} 
      className="bg-[#041d16] relative flex flex-col lg:flex-row items-center justify-between w-full min-h-[120vh] p-6 md:p-16 text-white overflow-hidden"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[150px]" />
      </div>

      {/* LEFT SIDE: HEADLINE (Parallax) */}
      <motion.div style={{ y: leftY }} className="w-full lg:w-1/5 z-30 flex flex-col gap-6">
        <div className="relative">

          <h1 className="text-5xl md:text-6xl w-max font-['Montserrat'] font-black uppercase leading-[0.8] tracking-[0.1em] -mt-10 ml-2 drop-shadow-2xl">
            Edit <span className="text-emerald-400">Reel</span>
          </h1>
        </div>
        <p className="font-sans text-sm opacity-70 max-w-xs leading-relaxed border-l-2 border-emerald-500/50 pl-4 py-2">
          Technical precision meets narrative pacing. Explore the cinematic theory behind the cut.
        </p>
      </motion.div>

      {/* CENTER: THE DYNAMIC SCALING VIDEO */}
      <div className="flex-1 flex justify-center items-center z-20 w-full min-h-[60vh]">
        <motion.div 
          style={{ 
            width: videoWidth, 
            scale: videoScale, 
            borderRadius: videoRadius 
          }}
          className="relative h-[45vh] md:h-[70vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] group border border-white/10"
        >
          <video 
            autoPlay muted loop playsInline
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          
          {/* Play/Overlay Aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
           
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: FEATURE GRID (Parallax) */}
      <motion.div style={{ y: rightY }} className="w-full lg:w-1/5 flex flex-col gap-4 z-30">
        {features.map((feature) => (
          <motion.div 
            key={feature.id}
            whileHover={{ scale: 1.05, x: -5 }}
            className="group w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-emerald-500/10 transition-all"
          >
            <div className="bg-emerald-500 text-white flex items-center justify-center w-12 h-12 rounded-xl shadow-inner group-hover:scale-110 transition-transform">
              <Icon icon={feature.icon} width="1.5em" height="1.5em" />
            </div>
            <div className="flex flex-col">

              <span className="font-sans text-sm font-bold uppercase tracking-widest text-white">
                {feature.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
{/* We add 'overflow-hidden' to prevent the corners from creating horizontal scroll */}
{/* Remove overflow-hidden from here if you want the slanted edges to "bleed" out naturally */}
<div className="relative group overflow-hidden py-4">
  <span className="text-4xl uppercase font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white animate-gradient-x">
    Skill Set  </span>
  <div className="h-[2px] w-12 bg-emerald-500 mt-2 transition-all duration-500 group-hover:w-full" />
</div>

<section ref={skillSectionRef} className="relative px-6">
  <div className="max-w-7xl mx-auto">
    <div className="mb-1">

    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
      {skills.map((skill, i) => (
        <div 
          key={skill.name}
          className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-8 transition-all hover:border-red-500/50 
            ${ "md:col-span-1"}`}
        >
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-red-500 font-mono text-xs uppercase tracking-widest">{skill.category}</span>
              <h3 className={`${i === 0 ? "text-4xl" : "text-4xl"} font-bold text-white mt-2`}>{skill.name}</h3>
            </div>

            {/* Percentage Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-white/40 text-xs font-mono uppercase tracking-tighter">Proficiency</span>
                <span className="text-2xl font-black text-white group-hover:text-red-500 transition-colors">
                  {skill.percentage}%
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-1000 ease-out origin-left"
                  style={{ 
                    width: `${skill.percentage}%`,
                    transform: `scaleX(${skill.percentage / 100})` // Smoother than width for performance
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  </div>
</section>


    
<div className="relative mt-20 group overflow-hidden py-4">
  <span className="text-4xl uppercase font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white animate-gradient-x">
    Editing Suite
  </span>
  <div className="h-[2px] w-12 bg-emerald-500 mt-2 transition-all duration-500 group-hover:w-full" />
</div>

<div className="relative w-full bg-white text-white">
  
  {/* 1. Added more height (h-32) to give the skew "breathing room" */}
  {/* 2. Added scale-110 to ensure the background covers the full width after skewing */}
  <div className="h-32 flex items-center justify-center transform -skew-y-3 origin-center bg-emerald-500 scale-105">

    {/* 3. Un-skew the content */}
    <div className="flex justify-around items-center w-full max-w-7xl px-8 transform skew-y-3">
      {tools.map((tool) => (
        <div key={tool.id} className="flex items-center -skew-y-6 gap-3">
          <img
            src={tool.icon}
            alt={tool.title}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold whitespace-nowrap">{tool.title}</span>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="relative mt-20 group overflow-hidden py-4">
  <span className="text-4xl uppercase font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white animate-gradient-x">
    Notable Films
  </span>
  <div className="h-[2px] w-12 bg-emerald-500 mt-2 transition-all duration-500 group-hover:w-full" />
</div>

<div className=" mb-10 overflow-hidden w-full">
      <div className="relative flex">
        {/* Scrolling Track */}
        <div className="flex animate-marquee gap-10 whitespace-nowrap">
          {doubledImages.map((img, index) => (
            <div 
              key={index} 
              className="relative w-[200px] md:w-[400px] h-[400px] md:h-[450px] mx-2 flex-shrink-0 border border-zinc-800 overflow-hidden group"
            >
              {/* Image */}
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                alt="Architecture"
              />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_11px)]"></div>
              
              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>

      <div className="flex flex-col w-full">



<div className="flex justify-center w-full">
      <div className="flex w-full flex-col gap-8">

<section className="bg-emerald-950 min-h-[60vh] w-full flex items-center justify-center py-20 px-4">
  <div className="max-w-4xl w-full mx-auto">
    
    {/* Optional: Section Header to match the video style */}


<div className={`w-full max-w-5xl mx-auto transition-all duration-1000 ${testimonialsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} ref={testimonialsRef}>
  <AliceCarousel
    mouseTracking
    items={carousel}
    responsive={{
      0: { items: 1 },
    }}
    infinite
    autoPlay
    disableDotsControls
    disableButtonsControls
    // --- CAROUSEL MODE SETTINGS ---
    autoPlayInterval={5000}      // The card stays centered for 5 seconds
    animationDuration={2000}      // The slide transition itself takes 2 seconds (slow & smooth)
    animationEasingFunction="ease-in-out" // Standard carousel feel
    autoPlayStrategy="default"    // Standard carousel behavior
    paddingLeft={0}               // Ensures the single item is 
    paddingRight={0}              // perfectly centered
  />
</div>
  </div>
</section>

      </div>
</div>



      </div>


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

export default AboutEdit;