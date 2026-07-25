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


const Aboutmod = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [profile, setProfile] = useState();
  const [openSkillsPopup,setSkillsPopup] = useState(false);
  const [openTechniquesPopup,setTechniquesPopup] = useState(false);
  const [hobbiesPopup,setHobbiesPopup] = useState(false);
const containerRef = useRef(null);
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
  <div className="testimonial-item  relative p-4 h-48 rounded-xl bg-white bg-opacity-5 border-2 border-white/20 flex flex-col gap-4 w-5/6">
    <div>

    <Icon className="w-12 text-cta h-12" icon="ri:double-quotes-l" />
    <p className="text-sm">{review.content}</p>
    </div>
    <div className="absolute right-4 bottom-4 flex items-center gap-4">
    <img alt="" className="w-11 h-11 rounded-full" src={`/profile.jpg`}/>
    <span className="flex  flex-col">
    <span className=" text-sm text-cta font-bold">{review.name.toUpperCase()}</span>
    <span className="text-xs">Photographer</span>
  </span>
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

  return (
    <div className="bg-cta">

    <div className="flex justify-center cursor-noe h-screen bg-[#0F0F0F]  rounded-3xl text-white">
            <BlurCursor />
<div className="flex w-5/6 justify-center scrollbar-hidden overflow-y-auto gap-6" >
  <div className="w-1/4 bg-[#44444440] mt-8 flex flex-col items-center gap-6">
          <div className='w-full bg-black  mt- inline-block overflow-hidden'>
            <img className='w-full h-80 object-fill transition transition-transform cursor-pointer hover:scale-95' src={`/dp.jpg`} alt='' />
          </div>
          

                            <div className="flex flex-col w-full px-8">
                <h1 className="text-3xl font-700 leading-none font-bold">
                    PETER PARKER
                </h1>
                <div className="mt-2 flex gap-10 text-sm text-emerald-500 font-semibold tracking-widest uppercase">
                    <span>Photographer</span>
               
                </div>
            </div>
                  <div className="flex flex-col w-5/6 gap-8">
        <div className="flex flex-col gap-2">
        <div className=' w-full  flex gap-4 flex-wrap'>
          {details.map((info)=>(
          <div key={info.id} className='p-2 flex items-center  bg-[#44444440] text-cta rounded-md text-white gap-2 md:text-xs sm:text-sm border border-emerald-500'><span className='font-semibold flex items-center gap-1'> <span className="text-emerald-500">{info.icon}</span> {info.name}:</span><span className=''>{info.value}</span></div>
          ))}
        </div>
        </div>


        </div>
             <div ref={contactRef} className={`flex px-16 ${contactVisible ? 'slide-in-up' : 'opacity-0'} flex-col gap-12`}>
<div className="flex flex-col justify-center ">
  {footer.map((items) => (
    <div
      key={items.id}
      className="card parent"
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <span className="overlay"></span>
<div className="flex items-center gap-4">
          <div className="icon">
        <span className="icon-text">{items.icon}</span>
      </div>
      <div>

      <p className="value">{items.text}</p>
       <span className="font-semibold">{items.value}</span>
    </div>
    </div>



    </div>
  ))}
</div>

          </div>
                    <div className='flex w-full  justify-center gap-4'>
{social.media.map((socialmedia)=>(

<div  onClick={() => {
          // Check if the link exists, and if so, open the URL in a new tab
          if (socialmedia.link) {
            window.open(socialmedia.link, "_blank");
          }
        }} className='bg-white bg-opacity-20 p-2 hover:bg-emerald-500 hover:text-white cursor-pointer items-center duration-500 ease-in-ease-out rounded-full'>{socialmedia.icon}</div>

)
)}
   </div>
  </div>
<div className="pt-8 flex w-3/5 rounded-md">
          <div ref={scrollableDivRef} className=" flex w-full p-10 scrollbar-hidden rounded-lg overflow-y-auto bg-[#44444440] flex-col gap-16 ">
      <div className="flex flex-col gap-4">

            
<div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">about me</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>
                      <span className="text-[#fff]">My approach combines creativity with functionality. I believe great design isn’t just about how it looks — it’s about how it works. Each project I take on is built on a foundation of research, clarity, and collaboration. Whether it’s designing intuitive interfaces, developing user-centered websites, or building brand visuals that resonate, my goal is to deliver work that feels both beautiful and purposeful.</span>
                       <span className="text-[#fff]">My approach combines creativity with functionality. I believe great design isn’t just about how it looks — it’s about how it works. Each project I take on is built on a foundation of research, clarity, and collaboration. Whether it’s designing intuitive interfaces, developing user-centered websites, or building brand visuals that resonate, my goal is to deliver work that feels both beautiful and purposeful.</span>
      </div>
                            <div className="w-full max-w-4xl gap-8 columns-2 md:columns-3 space-y-5">
            {galerry.map((gallery) => (
                <div className="relative w-full hover:[transform:rotateX(10deg)_rotateY(-15deg)_scale(1.05)]  overflow-hidden group" key={gallery.id}>
                  <img className="image cursor-pointer w-full rounded-md object-cover transition-transform duration-300 transform scale-100 group-hover:scale-110" src={gallery.img} alt={gallery.img} />
                </div>
              ))}
          </div>

                    <div className='flex flex-col gap-4'>

<div className="w-full h-[1px] bg-gray-600 my-2" />
<div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">skillset</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>
        <div className={`md:flex ${resumeVisible ? 'slide-in-up' : 'opacity-0'} w-full  items-start justify-between md:gap-20`}>

          <div className='w-full flex flex-col items-center gap-8'>
<div className="flex gap-16 w-full">
  {progress.map((prog) => (
<div 
  key={prog.id} 
  className={`group w-64 h-[420px] relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] ${prog.id % 2 === 0 ? 'mt-0' : 'mt-12'}`}
>
  {/* Background Pattern (Subtle grid or lines) */}
  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(30deg,#ffffff10_1px,transparent_1px),linear-gradient(150deg,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />

  {/* Top Percentage Section */}
  <div className="absolute top-6 left-6 z-20">
    <div className="flex items-baseline gap-1">
      <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">
        {prog.percentage}
      </span>
      <span className="text-emerald-400 text-xl font-bold">%</span>
    </div>
    <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1 shadow-[0_0_8px_#10b981]" />
  </div>

  {/* Progress Fill Container */}
  <div 
    className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out"
    style={{ height: `${prog.percentage}%` }}
  >
    {/* The Image with a subtle parallax-like scale on hover */}
    <img 
      src={prog.img} 
      alt={prog.name}
      className="absolute bottom-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
    />

    {/* Dynamic Gradient Overlay - Softens the image and blends it */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    
    {/* Top Edge Glow - Adds a "liquid" feel to the progress bar level */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
  </div>

  {/* Content Section */}
  <div className="absolute bottom-0 left-0 w-full p-6 z-30">
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1">
        <h3 className="text-   font-black text-white leading-none">
          {prog.name}
        </h3>
        <p className="text-sm text-gray-400 font-medium line-clamp-2 leading-snug">
          {prog.description}
        </p>
      </div>

      {prog.icon && (
        <div className="flex-shrink-0 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors duration-300">
          <img
            src={prog.icon}
            alt="icon"
            className="w-6 h-6 object-contain brightness-0 invert"
          />
        </div>
      )}
    </div>
  </div>

  {/* Inner Border Glow (Hover state) */}
  <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/30 rounded-2xl transition-all duration-500 pointer-events-none" />
</div>
  ))}
</div>
          {/* <div className='text-cta font-bold text-4xl'>| LANGUAGES</div> */}

        </div>
        </div>

        </div>



{/* <HorizontalScrollGallery 
                scrollContainerRef={scrollableDivRef}
                // Optionally pass a different speed: scrollSpeed={0.7}
            /> */}


      
      <div className='flex flex-col font-lato w-full'>
             <div className="w-full h-[1px] bg-gray-600 my-2 mb-6" />
           <div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">languages</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>
        <div ref={ResumeRef} className={`md:h-auto sm:h-auto flex gap-20 flex-col py-2`}>


        <div className="flex h-auto items-center">

        <div className="w-full flex">
        <div className='flex flex-col items-center justify-center gap-12'>

        <div className="flex flex-wrap justify-center gap-10">
        {progresses.map((languages)=>(
              <div className='flex flex-col items-center p-8  bg-white bg-opacity-10 rounded-lg gap-2'>
        <CircularProgressbar className='md:w-28 md:h-28'
        value={languages.percentage}
        text={`${languages.percentage}%`}
        strokeWidth={10}
        styles={{
          path: { stroke: '#10b981' },
          text: { fill: '#fff', fontSize: '16px' },
        }}
      />
      <span className='text-xl'>{languages.name}</span>
              </div>
          ))}
        </div>
        </div>
        </div>
        </div>
        </div>

      </div>
<div>


      <div ref={experienceRef} className={`font-bold`}>
             <div className="w-full h-[1px] bg-gray-600 my-2 mb-6" />
             <div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">educational and professional details</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>

</div>

      </div>

<div className="w-full flex justify-center"> 
      <div className="w-11/12 flex flex-col lg:flex-row gap-16">

        {/* ================= EDUCATION ================= */}


        {/* ================= EXPERIENCE ================= */}
        <div className="w-full lg:w-1/2">
          <VerticalTimeline layout="1-column-right">
            {experienceData?.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: "#10b981", color: "#fff" }}
                icon={<Icon icon="solar:book-bold" width="22" />}
                contentStyle={{
                  background: "rgba(255,255,255,0.10)",
                  boxShadow: "none",
                  borderRadius: "12px",
                }}
              >
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
                    className="w-full text-left text-white text-lg font-medium flex justify-between items-center"
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
                    {item?.months?.map((monthItem, mIndex) => {
                      const key = `edu-${index}-${mIndex}`;
                      return (
                        <div key={key} className="ml-4 mt-4">
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

                          </button>


                        </div>
                      );
                    })}
                  </div>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

                <div className="w-full lg:w-1/2">

          <VerticalTimeline layout="1-column-left">
            {educationData?.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: "#10b981", color: "#fff" }}
                icon={<Icon icon="solar:book-bold" width="22" />}
                contentStyle={{
                  background: "rgba(255,255,255,0.10)",
                  boxShadow: "none",
                  borderRadius: "12px",
                }}
              >
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
                    className="w-full text-left text-white text-lg font-medium flex justify-between items-center"
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
                    {item?.months?.map((monthItem, mIndex) => {
                      const key = `edu-${index}-${mIndex}`;
                      return (
                        <div key={key} className="ml-4 mt-4">
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

                          </button>


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


      <div className="flex flex-col ">
             <div className="w-full h-[1px] bg-gray-600 my-2 mb-6" />
<div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">Testimonials</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>
<div className="news-ticker-container">
      <div className="news-ticker-track">
        {/* Double the items for seamless looping */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="news-testimonial-card">
            <p className="news-content"><span className="text-5xl text-emerald-500 font-serif">"</span> {item.content} </p>
            
            <div className="news-footer">
              <div className="user-info">
                <img src={item.profileImagePath} alt={item.name} className="user-avatar" />
                <div>
                  <h4 className="user-name">{item.name}</h4>
                  <p className="user-role">Actor</p>
                </div>
              </div>
              <div className="brand-logo-placeholder">
                {/* This mimics the gray logo in your screenshot bottom-right */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      </div>
      <div className="flex flex-col gap-8">
  <div className="flex flex-col  justify-center text-4xl font-semibold">
             <div className="w-full h-[1px] bg-gray-600 my-2 mb-6" />
      <div className="header-container mb-12 group cursor-default">
  {/* Glowing Background Element */}
  <div className="header-circle group-hover:bg-emerald-400 transition-colors duration-500" />
  
  {/* The Heading */}
  <h2 className="header-text text-2xl  font-bold  transition-all duration-300">
    <span className="uppercase">clients</span>
  </h2>
  
  {/* Optional: Underline accent */}
</div>


</div>

<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
  <div
    ref={clientsRef}
    className="flex flex-wrap w-full items-center justify-center gap-8"
  >
    {/* First set of logos */}
    {logo.map((image) => (
      <div key={`original-${image.id}`} className="w-44 h-28 bg-white bg-opacity-10 border- border- rounded-md  flex items-center justify-center">
        <img className="w-24 h-16 object-contain" src={`/${image.img}`} alt="client logo" />
      </div>
    ))}

  </div>
</div>
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

export default Aboutmod;