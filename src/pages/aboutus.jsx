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
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./projectCard";
import TestimonialCard from "../components/testimonialcard";


const Aboutus = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [profile, setProfile] = useState();
  const [openSkillsPopup,setSkillsPopup] = useState(false);
  const [openTechniquesPopup,setTechniquesPopup] = useState(false);
  const [hobbiesPopup,setHobbiesPopup] = useState(false);
const containerRef = useRef(null);
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

const educationData = [
  {
    title: "Bachelor of Technology – Computer Science",
    months: [
      {
        month: "2020 – 2021",
        works: [
          "Programming fundamentals in C & Java",
          "Data Structures and Algorithms",
          "Discrete Mathematics",
          "Computer Organization",
        ],
      },
      {
        month: "2021 – 2022",
        works: [
          "Object-Oriented Programming (Java)",
          "Database Management Systems (MySQL)",
          "Operating Systems concepts",
          "Mini project: Student Management System",
        ],
      },
      {
        month: "2022 – 2023",
        works: [
          "Web Development (HTML, CSS, JavaScript)",
          "React fundamentals and hooks",
          "Software Engineering principles",
          "Major project: Full Stack Web Application",
        ],
      },
    ],
  },

  {
    title: "Higher Secondary Education (12th Grade)",
    months: [
      {
        month: "2018 – 2019",
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
        month: "2016 – 2017",
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




  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

// 1. Pre-calculate MAIN rotations for the boxes
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const r2 = useTransform(scrollYProgress, [0, 1], [120, 480]);
  const r3 = useTransform(scrollYProgress, [0, 1], [240, 600]);

  // 2. Pre-calculate COUNTER-rotations for the text (to keep it upright)
  const c1 = useTransform(r1, r => -r);
  const c2 = useTransform(r2, r => -r);
  const c3 = useTransform(r3, r => -r);

  // Put them in arrays so we can access them by index in the map
  const rotations = [r1, r2, r3];
  const counters = [c1, c2, c3];
  
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
          icon:<Icon icon="ri:facebook-fill" color="#000" width="2.2em" height="2.2em" />,
          link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Facebook")?.url
        },
      {
        id:2,
        icon:<Icon icon="fa6-brands:square-x-twitter" width="2.2em" height="2.2em" style={{color:'#000'}}  />,
        link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Twitter")?.url
      },
    {
      id:3,
      icon:<Icon icon="skill-icons:instagram" width="2.2em" height="2.2em" />,
      link:profile?.socialMediaAccounts.platforms.find((platform) => platform.platform === "Instagram")?.url
    },
  {
    id:4,
    icon:<Icon icon="logos:youtube-icon" width="2.2em" height="2.2em" />,
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
    { id: 1, name: 'SHOT PLANNING', percentage: 0 },
    { id: 2, name: 'PHOTOGRAPHY', percentage: 0 },
    { id: 3, name: 'EDITING', percentage: 0 },
    { id: 4, name: 'VISUAL STORYTELLING', percentage: 0 },
  ]);

  useEffect(() => {
    console.log(setProgresses);
    
    // Simulate updating progress after component mount
    setProgressValues([
      { id: 1, name: 'SHOT PLANNING', percentage: 70 },
      { id: 2, name: 'PHOTOGRAPHY', percentage: 85 },
      { id: 3, name: 'EDITING', percentage: 60 },
      { id: 4, name: 'VISUAL STORYTELLING', percentage: 70 },
    ]);
  }, []); 
  
  const details = [{
    id:1,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'BIRTHDAY',
    value:'18-07-1994'
  },
  {
    id:2,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'ADDRESS',
    value:profile?.artistPersonalInformation.address
  },
  {
    id:3,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'NATIONALITY',
    value:profile?.artistPersonalInformation.nationality
  },
  {
    id:4,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'ETHNICITY',
    value:profile?.artistPersonalInformation.ethnicity
  },
  {
    id:5,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'CONTACT',
    value:profile?.artistPersonalInformation.mobileNumber
  },
  {
    id:6,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'MAIL',
    value:profile?.artistPersonalInformation.email
  },{
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
  
  

  const testimonials = [
    {
      id: 1,
      name: "Smith John",
      role: "Client Designation",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      colorClass: { border: "border-orange-100", bg: "bg-cta" },
      profileImagePath:'profile.jpg',
    },
    {
      id: 2,
      name: "David John",
      role: "Client Designation",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      colorClass: { border: "border-rose-100", bg: "bg-cta" },
      profileImagePath:'dp.jpg',
    },
        {
      id: 3,
      name: "Alana Morris",
      role: "Client Designation",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      colorClass: { border: "border-rose-100", bg: "bg-cta" },
      profileImagePath:'post.jpg',
    }
  ];

  const items =[
    {id:1,name:'Angela',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},{id:1,name:'John',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},
    {id:1,name:'Stephen',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},{id:1,name:'Maddy',profileImagePath:'dp.jpg',content:'It is a long established fact that a reader will be distracted by the readable content of a page when'},
 
  ]

  const carousel = testimonials.map((item) => (
  // Padding on the wrapper is CRITICAL for the floating icons not to clip
  <div key={item.id} className="px-16 py-10"> 
    <TestimonialCard {...item} />
  </div>
));
 

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
    img:'logos2.png'
  },
  {
    id:2,
    img:'logos1.png'
  },
  {
    id:3,
    img:'logos3.png'
  },
  {
    id:4,
    img:'logos4.png'
  },
  {
    id:5,
    img:'logos5.png'
  },
  {
    id:6,
    img:'logos1.png'
  },
  {
    id:7,
    img:'logos3.png'
  },
  {
    id:8,
    img:'logos7.png'
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

const handleMouseLeave = (e) => {
  e.currentTarget.classList.remove('hovered')
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

  // 2. Set the effect multiplier
  // Determines how fast the rows move relative to the page scroll
  const speed = 0.5;

  const activities = [
  {
    title: "WORKTYPE PREFERENCE",
    constraints: "(Mínimo 4 anos e <10 anos e menos de 1,40m)",
    description: "Atividade realizada no interior de uma das tendas gigante, a estrutura de Playground e Insufláveis proporciona aos seus filhos horas de muita diversão...",
    howItWorks: "O cliente ao chegar, recebe formação. É proibida a realização da atividade com óculos, jóias, objetos pontiagudos e sem meias.",
    image: "/path-to-playground-image.jpg",
    bgColor: "bg-[#f3f4f1]", // Light gray/off-white
    accentColor: "bg-[#eeb94a]",
    info:[{
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
  },
  {
    title: "HOBBIES/ INTERESTS",
    constraints: "(Mínimo 5 anos e >1,10m, <65 anos e <100kg)",
    description: "O ARBORISMO é uma atividade para toda a família, que consiste na transposição de obstáculos entre plataformas fixadas nas copas das árvores...",
    howItWorks: "Cada percurso termina sempre num slide. No início da atividade, cada participante é equipado com um arnês...",
    image: "/path-to-arborismo-image.jpg",
    bgColor: "bg-[#e8ece3]", // Light Sage
    accentColor: "bg-[#f27b50]",
        info:[{
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
  },
    {
    title: "SKILLS/ ATTRIBUTES",
    constraints: "(Mínimo 5 anos e >1,10m, <65 anos e <100kg)",
    description: "O ARBORISMO é uma atividade para toda a família, que consiste na transposição de obstáculos entre plataformas fixadas nas copas das árvores...",
    howItWorks: "Cada percurso termina sempre num slide. No início da atividade, cada participante é equipado com um arnês...",
    image: "/path-to-arborismo-image.jpg",
    bgColor: "bg-[#e8ece3]", // Light Sage
    accentColor: "bg-[#eeb94a]",
    info:[{
    id:1,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'BIRTHDAY',
    value:'18-07-1994'
  },
  {
    id:2,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'ADDRESS',
    value:profile?.artistPersonalInformation.address
  },
  {
    id:3,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'NATIONALITY',
    value:profile?.artistPersonalInformation.nationality
  },
  {
    id:4,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'ETHNICITY',
    value:profile?.artistPersonalInformation.ethnicity
  },
  {
    id:5,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'CONTACT',
    value:profile?.artistPersonalInformation.mobileNumber
  },
  {
    id:6,
    icon:<Icon icon="icon-park-outline:birthday-cake" />,
    name:'MAIL',
    value:profile?.artistPersonalInformation.email
  },{
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
  },
    {
    title: "ACTING TECHNIQUES",
    constraints: "(Mínimo 5 anos e >1,10m, <65 anos e <100kg)",
    description: "O ARBORISMO é uma atividade para toda a família, que consiste na transposição de obstáculos entre plataformas fixadas nas copas das árvores...",
    howItWorks: "Cada percurso termina sempre num slide. No início da atividade, cada participante é equipado com um arnês...",
    image: "/path-to-arborismo-image.jpg",
    bgColor: "bg-[#e8ece3]", // Light Sage
    accentColor: "bg-[#f27b50]",
        info:[{
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
  },
  // Add Escalada, Paintball, etc., following the same pattern
];

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


  return (
    <div className="bg-cta">

    <div className="flex justify-center cursor-noe h-screen bg-[#0A0A0A] rounded-3xl text-white">
            <BlurCursor />
<div className="flex w-full justify-center scrollbar-hidden overflow-y-auto gap-6" >
  {/* <div className="w-1/4 bg-cta flex flex-col items-center gap-6">
          <div className='  mt-20 inline-block overflow-hidden'>
            <img className='w-full h-36 w-36 rounded-full transition transition-transform cursor-pointer hover:scale-95' src={`/dp.jpg`} alt='' />
          </div>
          <div className='flex w-5/6 flex-col'>
          <div className=' flex-col flex'>

            <span className='md:text-sm  sm:text-xs '><br />{profile?.artistPersonalInformation.profileSummary}</span>
          </div>
          </div>
                  <div className="flex flex-col w-5/6 gap-8">
        <div className="flex flex-col gap-2">
        <div className=' w-full  flex gap-4 flex-wrap'>
          {details.map((info)=>(
          <div key={info.id} className='p-2 flex items-center  bg-white text-cta rounded-md text-cta gap-2 md:text-xs sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'>{info.icon} {info.name}:</span><span className=''>{info.value}</span></div>
          ))}
        </div>
        </div>

        <div className="flex flex-col gap-4">
        <span className="font-semibold text-lg font-semibold">PHYSICAL ATTRIBUTES</span>
        <div className=' w-full flex gap-4 flex-wrap'>
          {physicalAttribute.map((info)=>(
          <div key={info.id} className='p-2 flex items-center bg-white text-cta rounded-md text-cta gap-2 md:text-xs sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'>{info.icon} {info.name}:</span><span className=''>{info.value}</span></div>
          ))}
        </div>
        </div>
        </div>
  </div> */}

      <div ref={scrollableDivRef} className=" flex w-full scrollbar-hidden overflow-y-auto flex-col gap-36 ">
      <div>
            <section className="min-h-screen relative bg-[#0A0A0A] flex items-center justify-between">
      <div className="w-full  mx-auto px-16 grid grid-cols-1 lg:grid-cols-2  gap-12 items-center">
        
        {/* Left Content */}
  

        {/* Right Image */}
<div className="relative flex items-center justify-center">
  {/* Pulse Ring */}
  <span className="absolute w-[360px] h-[360px] lg:w-[440px] lg:h-[440px]
    rounded-full border-2 border-cta animate-ping-slow opacity-70"></span>

  {/* Static Border */}
  <span className="absolute w-[350px] h-[350px] lg:w-[430px] lg:h-[430px]
    rounded-full border border-cta"></span>

  <img
    src="/dp.jpg"
    alt="Profile"
    className="relative w-[350px] sm:w-[340px] lg:w-[420px] rounded-full object-cover"
  />
</div>




      <div>


          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-gray-400">
            Hello! I'm Peter Parker <br />
            <span className="text-gray-400">
              a digital Photographer <br />
              & creative technician <br />
              from Italy.
            </span>
          </h1>

          {/* Signature / Accent */}
          <p className="mt-6 text-orange-500 text-2xl font-script">
 
          </p>
<div className="flex items-center gap-6">


          {/* Social Links */}
<div className="group flex gap-2 items-center text-cta border-2 border-cta py-2 px-4 rounded-full w-max uppercase tracking-wide 
                hover:bg-cta hover:text-white transition">
  
  <span className="w-4 h-4 bg-cta rounded-full transition 
                   group-hover:bg-white"></span>

  <a href="#" className="transition text-sm group-hover:text-white">
    Digitech ↗
  </a>
</div>
<div className="group flex gap-2 items-center text-cta border-2 border-cta py-2 px-4 rounded-full w-max uppercase tracking-wide 
                hover:bg-cta hover:text-white transition">
  
  <span className="w-4 h-4 bg-cta rounded-full transition 
                   group-hover:bg-white"></span>

  <a href="#" className="transition text-sm group-hover:text-white">
    Instagram ↗
  </a>
</div>
<div className="group flex gap-2 items-center text-cta border-2 border-cta py-2 px-4 rounded-full w-max uppercase tracking-wide 
                hover:bg-cta hover:text-white transition">
  
  <span className="w-4 h-4 bg-cta rounded-full transition 
                   group-hover:bg-white"></span>

  <a href="#" className="transition text-sm group-hover:text-white">
    Facebook ↗
  </a>
</div>
<div className="group flex gap-2 items-center text-cta border-2 border-cta py-2 px-4 rounded-full w-max uppercase tracking-wide 
                hover:bg-cta hover:text-white transition">
  
  <span className="w-3 h-3 bg-cta rounded-full transition 
                   group-hover:bg-white"></span>

  <a href="#" className="transition text-sm group-hover:text-white">
    Youtube ↗
  </a>
</div>
</div>

        </div>


      </div>

      <div className='absolute bottom-24 flex w-full justify-center flex-wrap'>

                  <div className="flex flex-col w-3/5 gap-8">



        <div className=' w-full flex w-full justify-center  gap-4 flex-wrap'>
          {physicalAttribute.map((info)=>(
          <div key={info.id} className='p-2 flex items-center bg-cta text-white rounded-md text-cta gap-2 md:text-xs sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'>{info.icon} {info.name}:</span><span className=''>{info.value}</span></div>
          ))}
                    {details.map((info)=>(
          <div key={info.id} className='p-2 flex items-center  bg-cta text-white rounded-md text-cta gap-2 md:text-xs sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'>{info.icon} {info.name}:</span><span className=''>{info.value}</span></div>
          ))}
        </div>
        </div>
        </div>
    </section>
      </div>

                    <div className='flex flex-col bg-[#0A0A0A] gap-8'>


        <div className={`md:flex ${resumeVisible ? 'slide-in-up' : 'opacity-0'} w-full  items-start justify-between bg-[#0A0A0A] md:gap-20`}>
<div className="w-full flex flex-col items-center gap-10">
  <div className="w-5/6 flex flex-col gap-8">
    {progress.map((prog, index) => (
      <div
        key={prog.id}
        className="flex items-center border-b-2 justify-between w-full gap-10"
      >
        {/* LEFT SIDE — TITLE */}
        <div className="flex items-center gap-4 w-1/2">
          <span className="text-gray-400 text-sm font-semibold">
            ({String(index + 1).padStart(2, "0")})
          </span>

        <div>
          <span>
            <p>
              <p>
                <p>
                  <span>
                    <a>
                      
                    </a>
                  </span>
                </p>
              </p>
            </p>
          </span>
          </div>

          <h2 className="text-gray-400 font-extrabold uppercase tracking-tight text-[3vw]">
            {prog.name}
          </h2>

        </div>

        {/* RIGHT SIDE — PROGRESS BAR */}
        <div className="w-1/3">
          <div className="w-full h-16 border-2 border-gray-200 rounded-lg bg-gray-400 overflow-hidden">
            
            {/* Filled Bar */}
            <div
              className="h-full bg-cta flex items-center justify-end pr-4 transition-all duration-700 ease-out"
              style={{ width: `${prog.percentage}%` }}
            >
              {/* Percentage Text */}
              <span className="text-white font-bold text-lg">
                {prog.percentage}%
              </span>
            </div>

          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        </div>

        </div>
        {/* <div className="flex flex-col gap-10">
          <div className="flex justify-center gap-">
                        <span className="relative text-4xl font-semibold text-[#9A9A9A] underline-half">GALLERY</span>
          </div>

                    <div className="relative min-h-screen text-white p-20 overflow-hidden">

      <div className="absolute left-1/4 top-0 bottom-0 w-[1px]" />

      {projects.map((proj, i) => (
        <ProjectCard 
          key={i}
          title={proj.title}
          index={proj.idx}
          positionClasses={proj.pos}
          image={proj.src}
        />
      ))}
    </div>
        </div> */}


<HorizontalScrollGallery 
                scrollContainerRef={scrollableDivRef}
            />


      
      <div className='flex flex-col font-lato w-full px-12 gap-36'>
        <div ref={ResumeRef} className={`md:h-auto sm:h-auto flex gap-20 flex-col py-2`}>


        <div className="flex h-auto items-center">

        <div className="w-full flex justify-center">
        <div className='flex flex-col items-center justify-center gap-12'>
<div className="flex justify-center gap-4 text-4xl font-semibold">
  <span className="relative text-gray-400 underline-half">LANGUAGES</span>

<div className="relative w-9 h-9 cursor-pointer group">
  <div className="bg-cta absolute bottom-0 left-0 w-6 h-6 border border-cta rounded-full transition-all duration-300 group-hover:scale-110"></div>

  <Icon
    className="
      absolute inset-0 m-auto
      transition-transform duration-300 ease-out
      group-hover:rotate-12
      group-hover:scale-110
    "
    icon="material-symbols:edit-rounded"
    width="24"
    height="24"
  />
</div>
</div>


<div className="flex flex-wrap justify-center gap-20">
  {progresses.map((language, index) => (
    <div
      key={index}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-40 h-40">
        <CircularProgressbar
          value={language.percentage}
          text={`${language.percentage}%`}
          strokeWidth={10}
          background
          backgroundPadding={4}
          styles={{
            background: {
              fill: "gray-400", // center circle color
            },
            path: {
              stroke: "#00BBAA",
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.6s ease",
            },
            trail: {
              stroke: "#1f1f1f", // dark ring behind
            },
            text: {
              fill: "#000",
              fontSize: "20px",
              fontWeight: "600",
            },
          }}
        />
      </div>

      <span className="text-xl text-white">
        {language.name}
      </span>
    </div>
  ))}
</div>
        </div>
        </div>
        </div>



        </div>
        {/* <div ref={experienceRef} className={`flex ${experienceVisible ? 'slide-in-up' : 'opacity-0'} flex-col w-full gap-16`}>
        <div className='flex w-full flex-col gap-12'>
      <div className='text-cta font-bold text-4xl'>| EXPERIENCE</div>
      <div className=''>
        <Chrono theme={customTheme} fontSizes={fontSizes}
 items={tems} enableQuickJump={false} cardHeight={100} cardWidth={1000} disableToolbar={true} enableLayoutSwitch={false} mode='VERTICAL' />
 </div>
      </div>
        <div className='flex flex-col gap-12'>
        <div className='text-cta font-bold text-4xl'>| CAREER</div>

        <Chrono theme={customTheme} fontSizes={fontSizes}
 items={item} enableQuickJump={false} cardHeight={100} cardWidth={1000} borderLessCards={true} disableToolbar={true} enableLayoutSwitch={false} mode='VERTICAL' />
      </div>
      </div> */}

      </div>
<div>

<div className="bg- w-full flex flex-col items-center px-4 md:px-10">


      <div className="flex w-1/2 flex-col gap-0">
        {activities.map((act, index) => (
          <section 
            key={index} 
            className={`sticky  top-20 h-96 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden rounded-lg shadow-xl mb-20 bg-white/5
        backdrop-blur-lg`}
          >
                        <div className={`md:col-span-4 p-8 ${act.accentColor || 'bg-orange-400'}`}>
              <h4 className="text-2xl font-white mb- font-semibold uppercase">{act.title}</h4>
              <p className="text-white font-medium leading-snug">
                {act.howItWorks}
              </p>
            </div>
            {/* Left Info Column */}
            <div className="md:col-span-8 p-8 flex flex-col justify-between">
        <div className=' w-full flex gap-4 flex-wrap'>
          {act?.info?.map((infos)=>(
          <div key={infos.id} className='p-2 flex items-center bg-cta bg-opacity-5 rounded-md text-cta gap-1 md:text-md sm:text-sm border border-cta'><span className='font-semibold flex items-center gap-1'><Icon icon="charm:tick" width="16" height="16" /></span><span className='text-white'>{infos.name} :</span></div>
          ))}
        </div>
              {/* <div className="flex gap-4">
                <button className="border-2 border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition">PREÇÁRIO</button>
                <button className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 transition">RESERVAR</button>
              </div> */}
            </div>

            {/* Center Image Column */}


            {/* Right Instructions Column */}

          </section>
        ))}
      </div>
    </div>

      <div ref={experienceRef} className={` px-12 text-center font-bold text-4xl`}><div className="flex justify-center gap-4 text-4xl font-semibold">
  <span className="relative text-[#9A9A9A] underline-half">PROFESSIONAL EXPERIENCE</span>

<div className="relative w-9 h-9 cursor-pointer group">
  <div className="bg-cta absolute bottom-0 left-0 w-6 h-6 border border-cta rounded-full transition-all duration-300 group-hover:scale-110"></div>

  <Icon
    className="
      absolute inset-0 m-auto
      transition-transform duration-300 ease-out
      group-hover:rotate-12
      group-hover:scale-110
    "
    icon="material-symbols:edit-rounded"
    width="24"
    height="24"
  />
</div>
</div>
</div>
<div className="w-full flex justify-center">
 <div className="mt-16 w-1/2">
      <VerticalTimeline>
        {educationData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            
            iconStyle={{ background: "#00BBAA", color: "#fff" }}
            icon={<Icon icon="solar:reel-bold" width="24" height="24" />}
             contentStyle={{
    background: "rgba(255,255,255,0.10)", // or #111 / transparent
    color: "#00BBAA",
    boxShadow: "none",
    borderRadius: "12px",
  }}
          >
            {/* 🔑 REF MUST BE ON A REAL DOM NODE */}
            <div
              ref={(el) => (itemRefs.current[index] = el)}
              className="space-y-1"
            >
              {/* TITLE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenItem(openItem === index ? null : index);
                  setOpenMonth({});
                }}
                className="w-full text-left text-cta text-lg font-medium flex justify-between items-center"
              >
                {item.title}
                <span className="text-2xl">
                  {openItem === index ? "−" : "+"}
                </span>
              </button>

              {/* MONTHS */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItem === index
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.months.map((monthItem, mIndex) => {
                  const key = `${index}-${mIndex}`;
                  return (
                    <div key={key} className="ml-4 mt-4">
                      {/* MONTH TITLE */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMonth((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }));
                        }}
                        className="w-full text-left text-white font-semibold flex justify-between"
                      >
                        {monthItem.month}
                        <span className="text-xl">
                          {openMonth[key] ? "−" : "+"}
                        </span>
                      </button>

                      {/* WORK LIST */}
                      <ul
                        onClick={(e) => e.stopPropagation()}
                        className={`ml-4 mt-2 text-sm text-gray-300 transition-all duration-300 overflow-hidden ${
                          openMonth[key]
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        
                        {monthItem.works.map((work, wIndex) => (
                          <li
                            key={wIndex}
                            className="py-1 list-disc"
                          >
                            {work}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
</div>


      </div>



      <div className="flex flex-wrap justify-between gap-16">

<div className="relative h-[50rem] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
  {/* Background Text */}
  {/* <span className="absolute text-[#1a1a1a] text-center font-black text-9xl tracking-widest select-none">
    SERVICES
  </span> */}

  <div className="relative w-full max-w-3xl flex items-center justify-center">
    
    {/* --- CENTRAL ELEMENT START --- */}
    <div className="absolute z-10 flex items-center justify-center">
      {/* Outer Glow/Ring */}
      <div className="absolute w-64 h-64 rounded-full border border-cta/10 animate-spin-slow" />
      
      {/* Main Circle */}
      <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-cta/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
        {/* Brand Logo or Icon could go here */}
        <div className="w-12 h-12 bg-cta rounded-full mix-blend-difference" />
        
        {/* Inner pulse effect */}
        <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
      </div>
    </div>
    {/* --- CENTRAL ELEMENT END --- */}

    {data.map((info, index) => {
      const totalCards = data.length;
      const angleStep = (2 * Math.PI) / totalCards;
      
      const angle = (index * angleStep) - (activeIndex * angleStep);
      const x = Math.sin(angle) * 320; // Increased radius to clear the center circle
      const y = Math.cos(angle) * -320; 

      return (
        <motion.div
          key={info.id}
          animate={{ 
            x: x, 
            y: y,
            scale: index === activeIndex ? 1 : 0.7,
            opacity: index === activeIndex ? 1 : 0.3,
            rotateZ: 0 // Keeps text horizontal
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            position: "absolute",
            zIndex: index === activeIndex ? 50 : 5,
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 w-[350px] h-[180px] rounded-3xl shadow-2xl flex flex-col justify-center cursor-pointer hover:border-white/30 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white text-xl uppercase tracking-wider">
              {info.name}
            </span>
            <p className="text-white/50 text-sm leading-relaxed">
              {info.service}
            </p>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>

      </div>


<div className="flex justify-center">
      <div className="flex flex-col gap-8 w-5/6">
      <span className="text-4xl text-center font-semibold"><span className="relative text-[#9A9A9A] underline-half">TESTIMONIALS</span></span>
<div className={`w-full ${testimonialsVisible ? 'slide-in-up' : 'opacity-0'}`} ref={testimonialsRef}>
  <AliceCarousel
    mouseTracking
    items={carousel}
    responsive={{
      0: { items: 1 },
      768: { items: 2 },
      1280: { items: 3 },
    }}
    autoPlay
    infinite
    disableDotsControls
    disableButtonsControls
    // Do not use style={{gap: '16px'}} on AliceCarousel itself; 
    // it often breaks the library's internal width calculations.
  />
</div>

      </div>
</div>

      <div className="flex justify-center">
      <div className="flex px-16 w-5/6 flex-col gap-8">
  <div className="flex justify-center gap-4 text-4xl font-semibold">
  <span className="relative text-[#9A9A9A] underline-half">CLIENTS</span>
<div className="relative w-9 h-9 cursor-pointer group">
  <div className="bg-cta absolute bottom-0 left-0 w-6 h-6 border border-cta rounded-full transition-all duration-300 group-hover:scale-110"></div>

  <Icon
    className="
      absolute inset-0 m-auto
      transition-transform duration-300 ease-out
      group-hover:rotate-12
      group-hover:scale-110
    "
    icon="material-symbols:edit-rounded"
    width="24"
    height="24"
  />
</div>

</div>

<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
  <div
    ref={clientsRef}
    className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll gap-8"
  >
    {/* First set of logos */}
    {logo.map((image) => (
      <div key={`original-${image.id}`} className="w-48 h-28 bg-white backdrop-blur-lg rounded-md flex-shrink-0 flex items-center justify-center">
        <img className="w-24 h-16 object-contain" src={`/${image.img}`} alt="client logo" />
      </div>
    ))}

    {/* Duplicate set for seamless looping */}
    {logo.map((image) => (
      <div key={`duplicate-${image.id}`} aria-hidden="true" className="w-48 h-28 bg-white backdrop-blur-lg rounded-md flex-shrink-0 flex items-center justify-center">
        <img className="w-24 h-16 object-contain" src={`/${image.img}`} alt="client logo" />
      </div>
    ))}
  </div>
</div>
      </div>
      </div>

<div className="w-full flex justify-center">
      <div ref={contactRef} className={`flex w-5/6 px-16 ${contactVisible ? 'slide-in-up' : 'opacity-0'} flex-col gap-12`}>
        <div className="flex justify-center  gap-4 text-4xl font-semibold">
  <span className="relative text-[#9A9A9A] underline-half">GET IN TOUCH</span>

<div className="relative w-9 h-9 cursor-pointer group">
  <div className="bg-cta absolute bottom-0 left-0 w-6 h-6 border border-cta rounded-full transition-all duration-300 group-hover:scale-110"></div>

  <Icon
    className="
      absolute inset-0 m-auto
      transition-transform duration-300 ease-out
      group-hover:rotate-12
      group-hover:scale-110
    "
    icon="material-symbols:edit-rounded"
    width="24"
    height="24"
  />
</div>
</div>

<div className="flex justify-between sm:gap-8">
  {footer.map((items) => (
    <div
      key={items.id}
      className="card parent"
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <span className="overlay"></span>

      <div className="icon">
        <span className="icon-text">{items.icon}</span>
      </div>

      <span className="title">{items.text}</span>
      <p className="value">{items.value}</p>
    </div>
  ))}
</div>

          </div>
</div>

          <div className='flex w-full bg-black pb-40 justify-center gap-4'>

   </div>
        <div className=' fixed flex flex-col gap-4 bottom-4 right-4 h-auto'>
          {option.map((option) => (
            option.name === "Logout" ? (
              <div
                key={option.id}
                onClick={option.onClick}  // Trigger the handleLogout function directly
                onMouseEnter={() => handleHover(option.id)}
                onMouseLeave={closeHover}
                className={`relative flex items-center rounded-full bg-gradient-to-tr from-span-start to-span-end ${hover === option.id ? 'w-40' : 'w-11'} transition-all duration-300`}
              >
                <div className='w-11 h-11 slide-in-down duration-500 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
                  <span data-tooltip-content={option.name} data-tooltip-id="mytooltip" className='flex items-center justify-center text-white'>
                    {option.icon}
                  </span>
                </div>
                {hover === option.id && <div className='text-white ml-4 flex'>{option.name}</div>}
              </div>
            ) : (
              <NavLink to={option.path} key={option.id}>
                <div
                  onMouseEnter={() => handleHover(option.id)}
                  onMouseLeave={closeHover}
                  className={`relative flex items-center rounded-full bg-gradient-to-tr from-span-start to-span-end ${hover === option.id ? 'w-40' : 'w-11'} transition-all duration-300`}
                >
                  <div className='w-11 h-11 slide-in-down duration-500 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
                    <span data-tooltip-content={option.name} data-tooltip-id="mytooltip" className='flex items-center justify-center text-white'>
                      {option.icon}
                    </span>
                  </div>
                  {hover === option.id && <div className='text-white ml-4 flex'>{option.name}</div>}
                </div>
              </NavLink>
            )
          ))}
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

export default Aboutus;

