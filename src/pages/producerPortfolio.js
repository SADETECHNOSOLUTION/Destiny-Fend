import React, { useState, useEffect, useRef } from "react";
import { 
  Clapperboard, Briefcase, Play, Users, DollarSign, 
  Instagram, Linkedin, Youtube, Mail, MapPin, 
  Globe, Layout, Award, Coffee, Building2,
  Phone, Video, Quote, IndianRupee
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const ProducerPortfolio = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

const stats = [
  { 
    label: "Budgets Managed", 
    value: "₹85 Cr+", 
    icon: <IndianRupee size={20}/> 
  },
  { 
    label: "Years in Industry", 
    value: "7+", 
    icon: <Users size={20}/> 
  },
  { 
    label: "Awards", 
    value: "08", 
    icon: <Award size={20}/> 
  },
  { 
    label: "Pan-India Shoots", 
    value: "22", 
    icon: <Globe size={20}/> 
  },
];

const accolades = [
  { id: "01", award: "National Film Award", category: "Best Feature Film", project: "Thangalaan II", year: "2025", img: "/award1.jpg" },
  { id: "02", award: "Filmfare South", category: "Best Producer", project: "Metro Silence", year: "2024", img: "/award2.jpg" },
  { id: "03", award: "SIIMA Awards", category: "Outstanding Production", project: "The Monsoon Project", year: "2023", img: "/award3.jpg" },
];

  const executiveCapabilities = [
    { name: "Creative Development", level: 98 },
    { name: "Budget Optimization", level: 92 },
    { name: "Legal & Licensing", level: 88 },
    { name: "Post-Production Oversight", level: 95 },
  ];

  const productionSlates = ["Commercials", "Feature Films", "Music Videos", "Digital Campaigns"];

  const projects = [
    { id: 1, name: "Project Alpha", client: "Global Tech Inc.", budget: "Premium", img: "/prod1.jpg" },
    { id: 2, name: "Urban Echoes", client: "Streetwear Brand", budget: "Mid-Range", img: "/prod2.jpg" },
    { id: 3, name: "The Director's Cut", client: "Indie Studio", budget: "Prestige", img: "/prod3.jpg" },
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

    const handleNext = () => setIndex((prev) => (prev + 1) % awards.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + awards.length) % awards.length);

  const filmography = [
  {
    year: "2026",
    projects: [
      { title: "Thangalaan II", role: "Production", status: "Post-Prod", image: "/p1.jpg" },
      { title: "Untitled Actioner", role: "Co-Prod", status: "Filming", image: "/p2.jpg" }
    ]
  },
  {
    year: "2025",
    projects: [
      { title: "Metro Silence", role: "Line Prod", status: "Released", image: "/p3.jpg" },
      { title: "The Monsoon Project", role: "Executive", status: "Released", image: "/p4.jpg" }
    ]
  },
  {
    year: "2024",
    projects: [
      { title: "Urban Echoes", role: "Production", status: "National Award", image: "/p5.jpg" }
    ]
  }
];

  const testimonials = [
    {
      quote: "Ishaan is the backbone of our productions. He secures the impossible and delivers under budget every single time.",
      name: "Sanjay Gupta",
      role: "Executive Director",
    },
    {
      quote: "A producer with a creative soul. He doesn't just manage money; he manages the vision.",
      name: "Aisha Khan",
      role: "Cinematographer",
    },
  ];

  return (
    <div className="bg-[#050505] text-zinc-100  min-h-screen selection:bg-amber-500/40 font-sans">
      
      {/* --- SECTION 1: THE EXECUTIVE OFFICE (HERO) --- */}
      <section className="relative min-h-screen flex px-6 flex-col justify px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent" />

        <div className="relative z-10 mt-24 grid gap-10 items-">
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
                          <div className="lg:col-span-4 relative">
             <div className="relative flex items-center gap-6 border border-zinc-800 p-4 rounded-full backdrop-blur-xl">
                <img 
                  src="/profile.jpg" 
                  alt="Executive" 
                  className="w-1/3 border-2 border-amber-400 p-1 object-cover rounded-full transition-all duration-1000"
                />

                          <div className="">
           <div className="flex items-center gap-2 text-amber-500 font-bold tracking-widest uppercase text-xs">
                <Building2 size={16} /> Film Producer
              </div>
              
              <h1 className="text-3xl bg md:text-[8rem] font font-light leading-tight tracking-tighter">
                 <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">Ishaan Verma</span>
              </h1>
          </div>
   

             </div>
          </div>


              <p className="text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
                Transforming high-level concepts into cinematic realities. Specialized in **end-to-end production management** and creative financing.
              </p>
            </motion.div>
            <div className="flex justify-between">
                        <div className="bg-amber/40 border border-amber-500 p-8 mt-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <Phone className="text-amber-500 mb-4" />
              <h4 className="font-medium text-sm">+91 9840096997</h4>
     
            </div>

                                    <div className="bg-amber/40 border border-amber-500 p-8 mt-4 rounded-3xl flex flex-col items-center justify-center text-center">
              <MapPin className="text-amber-500 mb-4" />
              <h4 className="font-medium text-sm">Adyar, Chennai</h4>
         
            </div>
            </div>
                                             <div className="bg-amber/40 border border-amber-500 mt-4 rounded-3xl flex items-center justify-center">
              <span><Mail className="text-amber-500 mt-3 mr-2 mb-4" /></span>
              <h4 className="font-medium text-sm">Connect With Us</h4>
           
            </div>
          </div>

            <div className="flex  items-center gap-6">

              <div className="flex w-full justify-center gap-4">
                {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-3 rounded-full border-2 border-amber-500 transition-all">
                    <Icon className="text-amber-100" size={20} />
                  </button>
                ))}
              </div>
            </div>


        </div>

        {/* Industry Marquee */}

      </section>

      {/* --- SECTION 2: PRODUCTION VALUE (STATS) --- */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="">
          <h2 className="text-4xl mb-12 md:text-8xl font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent  bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Stat</span>
      </h2>
    </div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950">

  {/* The Vertical Supporting Stats */}
  <div className="md:col-span-6 flex flex-col">
    {stats.slice(1).map((stat, i) => (
      <div key={i} className="flex-1 p-8 border-b last:border-b-0 border-zinc-900 flex items-center justify-between hover:bg-zinc-900 transition-colors group">
        <div className="flex items-center gap-6">
           <div className="text-zinc-600 group-hover:text-amber-500 transition-colors">{stat.icon}</div>
           <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black">{stat.value}</h3>
           </div>
        </div>
        <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-amber-500 transition-all" />
      </div>
    ))}
  </div>
</div>
      </section>

      {/* --- SECTION 3: THE SLATE (CAPABILITIES & BENTO) --- */}
      <section className="px-6 max-w-7xl mx-auto mt-24 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-5 space-y-12">
            <div>
        <div className="">
          <h2 className="text-4xl mb-12 md:text-8xl font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent  bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">expertise</span>
      </h2>
    </div>
<div className="space-y-3">
  {executiveCapabilities.map((skill, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="group relative"
    >
      {/* 1. The Slanted Background Container */}
      <div className="relative h-16 -skew-x-12 bg-zinc-900 border-l-4 border-amber-500 overflow-hidden flex items-center px-8 transition-all duration-300 group-hover:bg-zinc-800">
        
        {/* 2. The Progress "Fill" (Slanted behind the text) */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600/20 to-amber-500/40 border-r border-amber-500/50"
        />

        {/* 3. The Content (Un-skewed so it stays straight) */}
        <div className="relative z-10 w-full flex justify-between items-center skew-x-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-amber-500/60 font-bold uppercase tracking-tighter">
              Capability // 0{i + 1}
            </span>
            <span className="text-lg font-black uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors">
              {skill.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black italic text-zinc-800 group-hover:text-white/10 transition-colors">
              {skill.level}%
            </span>
          </div>
        </div>

        {/* 4. Decorative Glitch/Scanline effect on hover */}
        <div className="absolute top-0 right-0 w-24 h-full bg-white/5 -skew-x-12 translate-x-12 group-hover:-translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  ))}
</div>
            </div>
          </div>

<section className="py-16 bg-black overflow-hidden">
  {/* Header Section */}
          <div className="">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent  bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">filmography</span>
      </h2>
    </div>
        <div className="text-zinc-500 mt-2 text-[10px] font-bold uppercase tracking-widest pb-2">
      Scroll to Explore →
    </div>
  <div className="px-6 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end">


  </div>

  {/* Horizontal Scroll Container */}
  <div className="flex gap-12 overflow-x-auto px-6 md:px-[10%] no-scrollbar snap-x snap-mandatory">
    {filmography.map((era, i) => (
      <div key={i} className="flex gap-8 snap-start">
        
        {/* Year Anchor */}
        <div className="relative flex flex-col justify-start pt-2">
          <h3 className="text-8xl font-black text-white/50 leading-none sticky left-0 uppercase italic">
            {era.year}
          </h3>
          <div className="h-[2px] w-full bg-amber-500 mt-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        </div>

        {/* Nested Projects for that Year */}
        <div className="flex gap-6">
          {era.projects.map((project, j) => (
            <motion.div 
              key={j}
              whileHover={{ y: -10 }}
              className="w-[280px] md:w-[350px] group relative aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-white/5"
            >
              {/* Image Overlay */}
              <img 
                src={project.image} 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Status Badge */}


              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2 tracking-tighter">
                  Role: {project.role}
                </p>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-amber-500 transition-colors">
                  {project.title}
                </h4>
                
                {/* Decorative Viewfinder detail */}
                <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-amber-500 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Vertical Divider between Years */}
        <div className="w-[1px] h-full bg-zinc-900 mx-4 self-center" />
      </div>
    ))}
  </div>
</section>


<section className="flex flex-col gap-6">
    
            <div className="">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent  bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Testimonials</span>
      </h2>
    </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-zinc-950 border border-zinc-900 p-10 rounded-3xl relative overflow-hidden group">
              <Quote className="absolute top-4 right-4 text-zinc-800" size={80} />
              <p className="text-2xl font-light italic text-zinc-300 relative z-10">
                "Production is not just about budgets; it's about building an environment where art can survive logistics."
              </p>
              <p className="mt-4 text-amber-500 font-bold uppercase text-xs tracking-widest">— Vision Statement</p>
            </div>
            

          </div>
</section>
        </div>
      </section>



      
<section className="px-6 max-w-6xl mx-auto">
  <div className="flex flex-col lg:flex-row gap-4">
        <div className="">
          <h2 className="text-4xl mb-12 md:text-8xl font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent  bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Awards</span>
      </h2>
    </div>
    {/* LEFT: THE VISUAL ANCHOR (THE TROPHY) */}
<div className="relative group w-full lg:w-1/2 flex flex-col items-center">
      
      {/* 2. Red Aura - Dynamically reacts to index */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full group-hover:bg-red-600/20 transition-all duration-1000" />
      
      {/* 3. The Swipable Container */}
      <div className="relative rounded-2xl z-10 w-full overflow-hidden px-4">
<AnimatePresence mode="wait">
  <motion.div
    key={awards[index].id}
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 1.1, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={(e, info) => {
      if (info.offset.x < -50) handleNext();
      if (info.offset.x > 50) handlePrev();
    }}
    className="relative cursor-grab bg-amber-500 active:cursor-grabbing group overflow-hidden rounded-[2.5rem] border border-white/10 -2xl"
  >
    {/* 1. Cinematic Background Image */}
    <div className="relative h-[300px] w-full  overflow-hidden">
      <img 
        src='/'
        className="w-full h-full object-cover opacity-60  group-hover:scale-110 transition-all duration-1000"
        alt="Project Still"
      />
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-transparent" />
    </div>

    {/* 2. Centered Floating Laurel (The "Iconic" look) */}
    <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">

    </div>

    {/* 3. The Info Card (Redesigned for better space usage) */}
    <div className="absolute bottom-6 left-6 right-6 p-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-[2rem] flex flex-col items-start gap-4">
      
      <div className="w-full flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
            {awards[index].year}
          </p>
          <h4 className="text-xl md:text-4xl font-black text-white leading-none uppercase tracking-tighter italic">
            {awards[index].title}
          </h4>
        </div>
        <div className="text-right">
             <span className="text-[40px] font-black text-white/5 leading-none italic">{awards[index].id}</span>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-amber-500/50 to-transparent" />

    </div>

    {/* Viewfinder Decorative Corners */}
    <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 rounded-tl-xl" />
    <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 rounded-br-xl" />
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
              index === i ? "w-8 bg-amber-200 shadow-[0_0_8px_#dc2626]" : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>


  </div>
</section>


      {/* --- SECTION 4: PRODUCTION GALLERY --- */}
      <section className="py-24 px-8 bg-zinc-900/20">
<div>
          <h2 className="text-4xl md:text-8xl pb-12 font-black uppercase tracking-tighter leading-none">
     <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Upcoming</span>
      </h2>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-800">
          {projects.map((project, i) => (
            <div key={i} className="group relative h-36 rounded-2xl overflow-hidden border-r border-zinc-800 last:border-r-0">
              <img src='/weatherb.png' className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-2xl font-bold uppercase leading-none">{project.name}</h3>
                <button className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all text-white">
                  View Specs <Play size={12} fill="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>



      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProducerPortfolio;