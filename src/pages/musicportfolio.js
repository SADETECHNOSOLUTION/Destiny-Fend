import React, { useState, useEffect } from "react";
import { 
  Mic2, Music, Radio, Volume2, Play, Instagram, Linkedin, 
  Youtube, Mail, MapPin, Quote, ExternalLink, Disc,Phone, 
  Layers, Settings, Headphones, Share2, Plus, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MusicDirectorPortfolio = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeYear, setActiveYear] = useState('2024');
  const [isHovered, setIsHovered] = useState(null);

  // --- DATA STRUCTURES ---
  const testimonials = [
    {
      quote: "Aryan's score didn't just accompany the film; it became the heartbeat of the story. His use of silence is as powerful as his orchestration.",
      name: "Sanjay Leela",
      role: "Film Director",
      avatar: "/dir1.jpg"
    },
    {
      quote: "The technical precision of his arrangements combined with raw emotional power is a rare find in modern cinema.",
      name: "Vikram Seth",
      role: "Sound Engineer",
      avatar: "/dir2.jpg"
    }
  ];

  const awards = [
    {
      id: 1,
      year: "2025",
      title: "National Film Awards",
      image: "/award-1.png",
      category: "Best Original Score"
    },
    {
      id: 2,
      year: "2024",
      title: "Cannes Lions",
      image: "/award-2.png",
      category: "Sound Design"
    },
    {
      id: 3,
      year: "2023",
      title: "Grammy Awards",
      image: "/award-3.png",
      category: "Best Immersive Audio"
    }
  ];

  const [index, setIndex] = useState(0);

  // Helper to handle swiping logic
  const handleNext = () => setIndex((prev) => (prev + 1) % awards.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + awards.length) % awards.length);

  const discography = {
    "2024": [
      { title: "Neon Nights (OST)", genre: "Electronic/Synthwave", role: "Composer & Producer", image: "/m1.jpg" },
      { title: "Valley of Silence", genre: "Orchestral", role: "Music Director", image: "/m2.jpg" }
    ],
    "2025": [
      { title: "Midnight Echoes", genre: "Classical Hybrid", role: "Orchestrator", image: "/m3.jpg" },
      { title: "Street Pulse", genre: "Hip-Hop Fusion", role: "Producer", image: "/m4.jpg" }
    ]
  };

  const stats = [
    { label: "Original Scores", value: "18+", icon: <Music size={20}/> },
    { label: "Studio Albums", value: "05", icon: <Disc size={20}/> },
    { label: "Brand Collabs", value: "40+", icon: <Layers size={20}/> },
    { label: "Years in Sound", value: "09", icon: <Settings size={20}/> },
  ];

  const skills = [
    { name: "Orchestral Arrangement", level: 95 },
    { name: "Sound Design & Synthesis", level: 90 },
    { name: "DAW Proficiency (Logic/ProTools)", level: 98 },
    { name: "Mixing & Mastering", level: 85 },
  ];

  const genres = [
  "Filmi",
  "Rock",
  "Indie Folk",
  "Carnatic",
  "Hindustani",
];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-[#030303] text-white min-h-screen selection:bg-purple-500/40">
      
      {/* --- SECTION 1: CINEMATIC HERO --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            <div>
        <div className="relative w-64 h-64 w-full">
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="absolute inset-10 ml-12 w-[calc(100%-180px)] h-[calc(100%-100px)] object-cover rounded-full hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute bottom-10 right-16 bg-black border border-white/20 p-5 rounded-2xl backdrop-blur-md">
                <Headphones className="text-purple-500 animate-bounce" size={32} />
              </div>
            </div>
          <div className="space-y-4">
            
            <h1 className="text-3xl text-center text-red md:text-8xl font-black tracking-tighter leading-[0.9] italic">
              ARYAN <span className="text-500 hover:text-white transition-colors duration-500 cursor-default">BOSE</span>
            </h1>
            <p className="tracking-widest w-full text-center text-sm text-gray-200">MUSIC DIRECTOR</p>

    <div className="space-y-4">

      {/* Phone */}
      <a
        href="tel:+919876543210"
        className="flex items-center gap-4 p-4 bg-gradient-to-br from-red/10 to-black rounded-2xl border-b border-red hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-red/40">
          <Phone className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-gray-300">
          +91 98765 43210
        </span>
      </a>

      {/* Address */}
      <a
        href="#"
        className="flex items-start gap-2 p-4 bg-gradient-to-br from-red/10 to-black rounded-2xl border-b border-red hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-red/40">
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-left text-gray-300 leading-relaxed">
          No:2/361, Porter Colony,<br />
          Saligramam
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:arjunramanfilms@gmail.com"
        className="flex items-center gap-4 p-4 bg-gradient-to-br from-red/10 to-black rounded-2xl border-b border-red hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-red/40">
          <Mail className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-gray-300">
          arjunramanfilms@gmail.com
        </span>
      </a>

    </div>



            <div className="flex  items-center gap-6">

              <div className="flex w-full justify-center gap-4">
                {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-3 rounded-full border-2 border-red/70 text-red-100 hover:border-white/40 hover:bg-white/5 transition-all text-gray-400 hover:text-white">
                    <Icon className="text-white/70" size={20} />
                  </button>
                ))}
              </div>
            </div>

                <section >
                  <div className="flex mt-16  justify-between items-end mb-8">
            <h2 className="text-5xl font-black italic tracking-tighter">About </h2>
          </div>
<span className="leading-relaxed tracking-wider">
        She has composed music for theatre, dance performances and films. The Icelandic Symphony Orchestra, Icelandic National Theatre, Tate Modern, The British Film Institute, The Royal Swedish Opera in Stockholm and Gothenburg National Theatre are amongst the institutions that have commissioned new works by Hildur. She was nominated for the Nordic Music Council Prize as composer of the year 2014.
</span>
    </section>
          </div>
                </div>

<div className="w-full bg-[#000] border-y border-red/40 py-3 overflow-hidden group">
      <div className="relative flex items-center">
        
        {/* The Scrolling Content */}
        <div className="flex whitespace-nowrap  animate-marquee group-hover:pause">
          {[...genres, ...genres].map((genre, i) => (
            <div key={i} className="flex items-center bg-black px-6">
              {/* Modern "Status" Dot */}
              
              {/* Compact Typography */}
              <span className="font-semibold text-[11px] uppercase tracking-[0.2em] px-3 py-2 bg-black border-2 border-red rounded-xl text-white  duration-300">
                             <span className=" h-5 w-5 rounded-full bg-white " />

                {genre}
              </span>
            </div>
          ))}
        </div>

        {/* Glossy Overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
          <div className="relative flex justify-center lg:justify-end">

          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE MIXER (STATS) --- */}
<section className=" px-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, i) => (
      <div 
        key={i} 
        className="relative group p-5 rounded-[2rem] bg-neutral-950 border border-white/5 
                   hover:border-red-600/50 transition-all duration-500 overflow-hidden"
      >
        {/* SUBTLE RED GLOW (Appears on Hover) */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red/10 blur-[50px] rounded-full 
                        group-hover:bg-red-600/20 transition-all duration-700" />

        {/* TOP RIGHT: THE "REC" INDICATOR */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-red/60 animate-pulse group-hover:shadow-[0_0_8px_#dc2626]" />
           <div className="text-white/10 group-hover:text-red-500/30 transition-colors">
              {stat.icon}
           </div>
        </div>

        {/* THE DATA */}
        <div className="relative z-10">
          <p className="text-5xl font-black mb-3 tracking-tighter text-white group-hover:text-red/50 group-hover:scale-105 transition-all duration-500 origin-left">
            {stat.value}
          </p>
          
          {/* MINIMAL RED DIVIDER */}
          <div className="w-6 h-[1px] bg-red/30 mb-3 group-hover:w-12 group-hover:bg-red-600 transition-all duration-500" />
          
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-gray-300 transition-colors">
            {stat.label}
          </p>
        </div>

        {/* THE "CTA BORDER" - Bottom Light Beam */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red/60 
                        group-hover:w-1/2 transition-all duration-700 opacity-0 group-hover:opacity-100" />
      </div>
    ))}
  </div>
</section>

<section className="py-16 px-6 max-w-4xl mx-auto">
  <div className="flex flex-col gap-2">
    {/* Header Row */}
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-5xl font-black italic tracking-tighter">Skills </h2>

          </div>

    {/* Compact Skill Rows */}
    <div className="space-y-1">
      {skills.map((skill, i) => (
        <div key={i} className="group space-y-4 items-center gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-lg border border-white/[0.03]">
          
          {/* Index & Name */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-red-900 group-hover:text-red-600 transition-colors">0{i+1}</span>
            <h4 className="text-xs font-bold uppercase text-gray-400 group-hover:text-white transition-colors">
              {skill.name}
            </h4>
          </div>

          {/* LED Segmented Bar */}
          <div className="flex-1 flex gap-1 items-center">
            {[...Array(20)].map((_, step) => (
              <div 
                key={step}
                className={`h-3 flex-1 rounded-sm transition-all duration-700 ${
                  step < (skill.level / 5) 
                    ? 'bg-red/80 shadow-[0_0_8px_rgba(220,38,38,0.2)]' 
                    : 'bg-white/5'
                }`}
                style={{ transitionDelay: `${step * 30}ms` }}
              />
            ))}
          </div>

          {/* Percentage Value */}
          <div className="w-12 text-right">
            <span className="text-sm font-black font-mono text-white">
              {skill.level}<span className="text-[10px] text-red-600 ml-0.5">%</span>
            </span>
          </div>
          
        </div>
      ))}
    </div>

    {/* Footer Detail */}
    <div className="mt-4 flex justify-center">
      <div className="h-[1px] w-12 bg-red-950 group-hover:w-full transition-all duration-1000" />
    </div>
  </div>
</section>

      {/* --- SECTION 4: DISCOGRAPHY REELS --- */}
      <section className=" px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-5xl font-black italic tracking-tighter">Discography</h2>

          </div>
            <div className="flex w-full p-4 gap-6">
              {Object.keys(discography).map(year => (
<button 
  key={year}
  onClick={() => setActiveYear(year)}
  className="relative group pb-2"
>
  <span className={`text-lg tracking-[0.3em] uppercase transition-all duration-500 
    ${activeYear === year ? 'text-white' : 'text-gray-600 group-hover:text-gray-300'}`}>
    {year}
  </span>
  
  {/* The Custom Underline */}
  <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 
    ${activeYear === year 
      ? 'w-full bg-red font-semibold shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
      : 'w-0 bg-gray-800 :w-4'}`}
  />
</button>
              ))}
            </div>
          <div className="grid md:grid-cols-2 gap-8">
            {discography[activeYear].map((track, i) => (
  <div className="group relative bg-[#080808] border border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:border-red-500/20">
    
    {/* FORCED FLEX ROW */}
    <div className="flex flex-row items-center gap-8 md:gap-16">
      
      {/* LEFT: THE DISK (Reduced size slightly to fit row better) */}
      <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
        {/* Progress SVG */}


        {/* Vinyl Body */}
        <div className="relative w-[88%] h-[88%] bg-black rounded-full shadow-2xl overflow-hidden border-2 border-red/60">
          <div className="absolute inset-0 opacity-40 bg-[repeating-radial-gradient(circle,transparent_0,transparent_2px,#000_3px)]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-red-600/30 overflow-hidden animate">
                <img src="/track.png" className="w-full h-full object-cover" alt="track" />
                <div className="absolute inset-0 bg-black/20" />
             </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-black rounded-full border border-white/20 shadow-inner z-20" />
        </div>
      </div>

      {/* RIGHT: THE DATA PANEL (Now takes up the remaining row space) */}
      <div className="flex-1 flex flex-col justify-between h-full">
        
        {/* Track Title Info */}
        <div className="text-left">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />

          </div>
          <h3 className="text-xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">{track.title}</h3>
          <p className="text-gray-500 tracking-[0.2em] uppercase text-[10px] md:text-xs mt-2">Hania Rani</p>
        </div>

        {/* BOTTOM SECTION: Controls and Tech Bar integrated into the row flow */}
        <div className=" space-y-4">
          {/* THE TECHNICAL BAR */}
          <div className="flex items-end justify-between border-t border-white/5 pt-4">
            <div className="flex flex-col gap-1">
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400">03:45</span>
              <p className="text-[8px] text-red-600 uppercase tracking-tighter">Stereo Output</p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  </div>
            ))}

          </div>

        </div>
      </section>

<section className="mt-16 px-6 max-w-6xl mx-auto">
  <div className="flex flex-col lg:flex-row gap-4">
          <div className="">
        <h2 className="text-5xl font-black italic tracking-tighter text-white mb-4">Honours</h2>
        <div className="w-16 h-1 bg-red-600" />
      </div>
    {/* LEFT: THE VISUAL ANCHOR (THE TROPHY) */}
<div className="relative group w-full lg:w-1/2 flex flex-col items-center">
      
      {/* 2. Red Aura - Dynamically reacts to index */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full group-hover:bg-red-600/20 transition-all duration-1000" />
      
      {/* 3. The Swipable Container */}
      <div className="relative z-10 w-full overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={awards[index].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) handleNext();
              if (info.offset.x > 50) handlePrev();
            }}
            className="cursor-grab active:cursor-grabbing p-4 border border-white/5 rounded-[3rem] bg-neutral-900/40 backdrop-blur-sm shadow-2xl"
          >
            <img 
              src='/award.png'
              alt="Award Trophy" 
              className="w-full h-[250px] object-cover rounded-[2.5rem] group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
            />

            {/* Floating Badge - Data coming from the Map */}
            <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl flex justify-between items-center shadow-xl">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-red-500 font-bold mb-1">
                    Award // {awards[index].year}
                </p>
                <h4 className="text-white font-black italic tracking-tighter uppercase leading-none">
                    {awards[index].title}
                </h4>
                <p className="text-[10px] text-gray-500 mt-2 uppercase font-mono">{awards[index].category}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Navigation Dots (Using .map() for indicators) */}
      <div className="flex gap-2 mt-8 z-20">
        {awards.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              index === i ? "w-8 bg-red-600 shadow-[0_0_8px_#dc2626]" : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>


  </div>
</section>

      {/* --- SECTION 6: TESTIMONIALS (EDITORIAL) --- */}
<section className="mt-16 px-6 overflow-hidden">
  <div className="max-w-7xl  mx-auto">
            <h2 className="text-5xl font-black italic tracking-tighter text-white mb-4">Testimonials</h2>

    <AnimatePresence mode="wait">
      <motion.div
        key={testimonialIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="flex items-center"
      >
        {/* LEFT: THE VISUAL & NAME */}

        {/* RIGHT: THE QUOTE */}
        <div className="lg:col-span-7 relative">
          {/* Large Red Drop Cap / Quote Mark */}
          <span className="absolute -top-2 left- text-[6rem] font-black text-red/40 select-none">
            “
          </span>
          
          <div className="relative mt-16 z-10 space-y-8">
            <p className="text-3xl md:text-5xl font-light leading-tight text-white tracking-tight italic">
              {testimonials[testimonialIndex].quote}
            </p>
            
            <div className="flex flex-col gap-1 border-l-2 border-red-600 pl-8 py-2">
              <h4 className="text-xl font-black uppercase tracking-tighter text-white italic">
                {testimonials[testimonialIndex].name}
              </h4>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
                {testimonials[testimonialIndex].role}
              </p>
            </div>

            {/* AUTOPLAY PROGRESS BAR */}
            <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden mt-12">
               <motion.div 
                 key={testimonialIndex}
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 5, ease: "linear" }}
                 className="absolute inset-0 bg-red-600 shadow-[0_0_8px_#dc2626]"
               />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</section>


      {/* --- FOOTER: CONTACT --- */}

    </div>
  );
};

export default MusicDirectorPortfolio;