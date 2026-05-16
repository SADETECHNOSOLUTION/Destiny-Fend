import React, { useState, useRef } from "react";
import { 
  Video, Award, Globe, IndianRupee, Instagram, 
  Linkedin, Youtube, Mail, MapPin, Building2,Phone,
  Quote, Play, Camera, Layers, Zap, Eye, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CinematographerPortfolio = () => {
  const [index, setIndex] = useState(0);


  // --- DATA: CINEMATOGRAPHY FOCUS ---
  const stats = [
    { label: "Years of Experience", value: "12+", icon: <IndianRupee size={20}/> },
    { label: "Shoots", value: "142+", icon: <Video size={20}/> },
    { label: "Global Wins", value: "12", icon: <Award size={20}/> },
    { label: "Location Captured", value: "18", icon: <Globe size={20}/> },
  ];
const [hoveredIndex, setHoveredIndex] = useState(null);

  const technicalExpertise = [
    { name: "Anamorphic Composition", level: 98 },
    { name: "Low Light Mastery", level: 95 },
    { name: "DMX Lighting Control", level: 92 },
    { name: "Technocrane / Gimbal", level: 90 },
  ];
const containerRef = useRef(null);
  const testimonials = [
  {
    quote: "THE LIGHTING WORK ON OUR LAST FEATURE WAS NOTHING SHORT OF ARCHITECTURAL. A TRUE MASTER OF THE ANAMORPHIC FRAME.",
    author: "MARCUS VANCE",
    role: "DIRECTOR / LIONSGATE",
    rating: "01"
  },
  {
    quote: "CLEAN, PRECISE, AND TECH-FORWARD. THEY UNDERSTAND THE GEAR AS WELL AS THEY UNDERSTAND THE EMOTION.",
    author: "SARA JENSEN",
    role: "PRODUCER / NETFLIX",
    rating: "02"
  },
  {
    quote: "A VISIONARY EYE THAT CAPTURES THE STUFF BETWEEN THE LINES. THE GO-TO FOR OUR HIGH-END COMMERCIAL PROJECTS.",
    author: "DAVID CHEN",
    role: "CREATIVE DIR. / NIKE",
    rating: "03"
  }
];
  const filmography = [
    {
      year: "2026",
      projects: [
        { title: "Neon Nights", role: "DoP", tech: "Alexa 35 + Master Anamorphics", image: "/weatherb.png" },
        { title: "The Silent Valley", role: "DoP", tech: "Red V-Raptor + Vintage Glass", image: "/weather.jpg" }
      ]
    },
    {
      year: "2025",
      projects: [
        { title: "Thangalaan II", role: "Additional Cinematography", tech: "Sony Venice 2", image: "/post.jpg" },
      ]
    }
  ];


  const initialProjects = filmography.flatMap(era => 
    era.projects.map(project => ({
      ...project,
      year: era.year // We attach the year to the project so we don't lose it
    }))
  );


const [stack, setStack] = useState(initialProjects);
  const [activeYear, setActiveYear] = useState(filmography["0"].year);

const handleSwipe = (index) => {
    setStack((prev) => prev.filter((_, i) => i !== index));
  };

const allProjects = filmography.flatMap(era => era.projects);
  const awards = [
    { id: "01", year: "2025", title: "Best Cinematography", category: "National Film Awards", image: "/aw1.jpg" },
    { id: "02", year: "2024", title: "Visual Excellence", category: "Cannes Lions", image: "/aw2.jpg" },
  ];

  // 1. Create the 'allProjects' array by flattening your data
  // This takes projects from 2024, 2023, etc., and puts them in one list.


  const handleNext = () => setIndex((prev) => (prev + 1) % awards.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + awards.length) % awards.length);

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen selection:bg-green-500/40 font-sans overflow-x-hidden">
      
      {/* --- SECTION 1: THE VIEWFINDER (HERO) --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none border-[1px] border-zinc-800 m-8 flex items-center justify-center">
            <div className="w-full h-px bg-zinc-800 absolute" />
            <div className="h-full w-px bg-zinc-800 absolute" />
            <div className="w-20 h-20 border border-green-500 rounded-full absolute opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center"
          >
                            <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-24 rounded-full border-2 border-green-500 p-1">
                        <img src="/dp.jpg" className="w-full h-full object-cover rounded-full" alt="DoP" />
                    </div>
                    <p className="font-semibold text-xl italic uppercase tracking-widest">Ishaan Verma</p>
                </div>
            <div className="inline-flex items-center mt-2 gap-2 px-4 py-1 border-b-2 border-cta rounded-md bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Camera size={12} /> Director of Photography
            </div>

            


            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-red-800">
                <div className="text-left">
                    <p className="text-zinc-500 text-4xl border-b uppercase font-black tracking-widest mb-4 italic text-green-500">Profile</p>
                    <p className="text-lg font-light leading- text-zinc-400">
                        Crafting light and shadow for India's most ambitious cinematic projects. Specialized in large-format storytelling.
                    </p>
                </div>
                


                <div className="text-right mt-12 flex flex-col items-end">
                    <p className="text-zinc-500 text-4xl border-b w-full uppercase font-black tracking-widest mb-4 italic text-green-500">Contact </p>
                    <div className="flex gap-4">
                        {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                            <button key={i} className="hover: text-green-500 p-4 rounded-full bg-green-500/20 transition-colors">
                                <Icon size={24} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: SENSOR DATA (STATS) --- */}
      <section className=" px-6 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <div key={i} className="group space-y-2 border-2 p-8 border-green-500 rounded-lg relative">

                    <h3 className="text-5xl font-black italic tracking-tighter group-hover:translate-x-2 transition-transform">{stat.value}</h3>
                                    <p className="text-[10px] text-cta uppercase tracking-[0.3em] font-bold mb-2">/ {stat.label}</p>

                </div>
            ))}
        </div>
      </section>

<section className="bg-zinc-950 py-16 px-6 overflow-hidden min-h-screen relative">
      {/* Background Year Watermark (Changes based on top card) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h2 className="text-[30vw] font-black text-white">
          {stack.length > 0 ? stack[stack.length - 1].year : ""}
        </h2>
      </div>

      <div className=" mb-16 relative z-10">
        <h2 className="text-sm font-mono text-green-500 tracking-[0.6em] uppercase mb-4">
        </h2>
        <div className="flex justify-between items-end">
          <h3 className="text-4xl md:text-9xl font-black uppercase italic tracking-tighter text-green-500 border-b w-full">
          Gallery
          </h3>
          <div className="text-right font-mono text-[10px] text-zinc-600 hidden md:block">
            REMAINING_FILES: {stack.length} <br />
            STATUS: ACTIVE_FEED
          </div>
        </div>
      </div>

      <div className="relative px-6 max-w-4xl mx-auto h-[60vh] md:h-[70vh] px-4">
        <AnimatePresence>
          {stack.map((project, i) => {
            // The top card is always the last one in the array
            const isTop = i === stack.length - 1;

            return (
              <motion.div
                key={`${project.title}-${project.year}`}
                style={{ zIndex: i }}
                // Swipe Logic
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 150) {
                    handleSwipe(i);
                  }
                }}
                // Entrance and Exit animations
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ 
                  scale: isTop ? 1 : 1 - (stack.length - 1 - i) * 0.05,
                  y: isTop ? 0 : (stack.length - 1 - i) * -15,
                  opacity: 1, 
                  rotate: isTop ? 0 : i % 2 === 0 ? 2 : -2,
                }}
                exit={{ 
                  x: 1000, 
                  rotate: 20, 
                  opacity: 0,
                  transition: { duration: 0.4 } 
                }}
                whileHover={isTop ? { scale: 1.02 } : {}}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-full bg-zinc-900 border border-zinc-800 p-3 shadow-2xl overflow-hidden">
                  <img 
                    src={project.image} alt={project.image}
                    className="w-full h-full object-cover group-hover:grayscale-0 pointer-events-none"
                  />

                  {/* UI Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-8 flex flex-col justify-between">
                    <div className="flex justify-between font-mono text-[10px] text-green-500">
                      <span>PROJECT_0{i + 1}</span>
                      <span className="bg-green-500/10 px-2 py-1">{project.year}</span>
                    </div>
                    
                    <div>
                      <p className="text-green-500 font-mono text-[10px] uppercase tracking-widest mb-2">{project.tech}</p>
                      <h4 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tighter leading-none">
                        {project.title}
                      </h4>
                    </div>
                  </div>

                  {/* Corner Viewport Brackets */}
                  <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/30" />
                  <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/30" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Refresh State when cards are gone */}
        {stack.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <p className="text-zinc-600 font-mono text-sm mb-6">END OF ARCHIVE</p>
            <button 
              onClick={() => setStack(initialProjects)}
              className="px-10 py-4 bg-white text-black font-black uppercase italic hover:bg-green-500 transition-colors"
            >
              Restart Reel
            </button>
          </motion.div>
        )}
      </div>
    </section>

      {/* --- SECTION 3: THE FILM STRIP (FILMOGRAPHY) --- */}

      {/* --- SECTION 4: OPTICAL MASTERY (SKILLS) --- */}
<section className="bg-zinc-950 mt- ">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-12">
          <h3 className="text-4xl font-black border-b uppercase italic tracking-tighter text-green-500"> Projects</h3>
        </div>

        <div className="space-y-4">
          {filmography.map((era, i) => {
            const isOpen = activeYear === era.year;
            
            return (
              <div key={i} className="border-b px-6 bg-green-800/10 border-zinc-900 last:border-none">
                {/* Year Trigger Button */}
                <button 
                  onClick={() => setActiveYear(isOpen ? null : era.year)}
                  className="w-full flex items-center justify-between py-8 group transition-all"
                >
                  <div className="flex items-baseline gap-6">
                    <span className={`text-6xl md:text-8xl font-black transition-colors duration-500 ${isOpen ? 'text-green-500' : 'text-zinc-800 group-hover:text-zinc-500'}`}>
                      {era.year}
                    </span>
                    <span className="text-zinc-600 font-mono text-sm hidden md:block">
                      [{era.projects.length} PROJECTS]
                    </span>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`text-4xl font-light transition-transform duration-500 ${isOpen ? 'rotate-45 text-green-500' : 'rotate-0 text-zinc-700'}`}>
                    +
                  </div>
                </button>

                {/* Nested Films (Conditional Rendering with Animation) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                        {era.projects.map((project, j) => (
                          <motion.div 
                            key={j}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: j * 0.1 }}
                            className="group relative aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden"
                          >
                            <img 
                              src={project.image} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-6 flex flex-col justify-end">
                              <p className="text-[8px] font-mono text-green-500 uppercase tracking-widest">{project.tech}</p>
                              <h4 className="text-xl font-bold uppercase italic text-white">{project.title}</h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
      {/* --- SECTION 5: THE ACCOLADES SLIDER --- */}
      <section className="px-6 py-24 c-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end">
            <h2 className="text-4xl mb-12 font-black border-b text-green-500 w-full uppercase italic tracking-tighter">Recognitions</h2>

          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={awards[index].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative grid md:grid-cols-2 gap-0 border border-zinc-800 rounded-[2rem] overflow-hidden"
            >
              <div className="aspect-video md:aspect-auto h-[350px] relative overflow-hidden bg-green-500">
                <img src='/award.png' className="w-5/6 h-full object-cover " />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-8 left-8">
                    <Award size={60} className="text-white mb-4" />
                    <span className="text-4xl font-black italic text-white uppercase">{awards[index].year}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-center backdrop-blur-xl">
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">{awards[index].category}</p>
                <div className="h-px w-20 bg-green-500 mb-6" />
              </div>
            </motion.div>
            <div className="w-full flex mt-4 justify-center">
                                        <div className="flex gap-20">
                <button onClick={handlePrev} className="p-4 border bg-white/20 border--400 rounded-full hover:bg-green-500 hover:text-black transition-all">
                    <ChevronRight className="text-white-400/50 rotate-180" size={20} />
                </button>
                <button onClick={handleNext} className="p-4 border bg-white/20 border--400 rounded-full hover:bg-green-500 hover:text-black transition-all">
                    <ChevronRight className="text-white-400/50" size={20} />
                </button>
            </div>
                </div>

          </AnimatePresence>
        </div>
      </section>

          <div className="flex px-6 mb- justify-end">
            <h2 className="text-4xl mb-16 font-black border-b text-green-500 w-full uppercase italic tracking-tighter">Testimonials</h2>

          </div>
<section className="relative py-4  overflow-hidden min-h-[400px] flex items-center">
      {/* The Circular Background Element */}
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4">
        <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-green -500/50 blur-[120px]" />
        <div className="absolute inset-0 w-full h-full rounded-full border  bg-green-500/50 border-green-500/10 scale-75 animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Empty Space or Decorative Element */}
          <div className="hidden md:block">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[1em] rotate-90 inline-block origin-left">
              Endorsements_2026
            </span>
          </div>

          {/* Right Bottom Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:text-right flex flex-col items-start md:items-end justify-end mt-20"
          >
            <div className="mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-green-500 opacity-50">
                <path d="M10 11L8 15H11V20H5V15L7 11H5V4H11V11H10ZM19 11L17 15H20V20H14V15L16 11H14V4H20V11H19Z" fill="currentColor"/>
              </svg>
            </div>

            <blockquote className="text-2xl md:text-4xl font-light leading-snug text-zinc-200 tracking-tight italic max-w-xl">
              "The way they manipulate <span className="text-white font-bold">natural light</span> transforms a standard location into something otherworldly. A master of the craft."
            </blockquote>

            <div className="mt-8 border-t border-zinc-800 pt-6 md:w-64">
              <p className="text-white font-black uppercase tracking-tighter text-xl">
                Sarah Drasner
              </p>
              <p className="text-green-500 font-mono text-xs uppercase tracking-[0.2em] mt-1">
                Executive Producer / A24
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
      {/* --- SECTION 6: THE FINAL CUT (FOOTER) --- */}
<footer className="relative bg-zinc-950 border-t border-zinc-900 overflow-hidden">
  {/* Technical Detail: Subtle scanline at the top */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500/20" />

  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
      
      {/* 1. THE HOOK: Large but compact text */}
      <div className="md:col-span-5 p-6 mt-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-900">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white">
          Ready to <br />
          <span className="text-green-500 italic">Render?</span>
        </h2>
      </div>

      {/* 2. CONTACT CHANNELS: High-density grid */}
      <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2">
        
<div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2">
  
  {/* Email - Primary CTA */}
  <a href="mailto:arjunramanfilms@gmail.com" className="p-5 border-b border-zinc-900 sm:border-r flex flex-col justify-between min-h-[90px]">
    <div className="flex items-center gap-2 opacity-40">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
      <span className="text-green-400 font-bold text-[9px] uppercase tracking-[0.2em]">Mail me!</span>
    </div>
    <div className="flex items-center gap-3">
      <Mail size={18} className="text-green-500 shrink-0" />
      <span className="text-sm md:text-base font-black text-zinc-100 uppercase tracking-tight break-all leading-tight">
        arjunramanfilms@gmail.com
      </span>
    </div>
  </a>

  {/* Phone */}
  <a href="tel:+9192383473829" className="p-5 border-b border-zinc-900 flex flex-col justify-between min-h-[90px]">
    <div className="flex items-center gap-2 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />

      <span className="text-green-400 font-mono text-[9px] uppercase tracking-[0.2em]">Call me!</span>
    </div>
    <div className="flex items-center gap-3">
      <Phone size={18} className="text-green-500 shrink-0" />
      <span className="text-base font-black text-zinc-100 uppercase tracking-tighter">
        +91 92383 473829
      </span>
    </div>
  </a>

  {/* Location */}
  <div className="p-5 sm:border-r border-zinc-900 flex flex-col justify-between min-h-[90px]">
    <div className="flex items-center gap-2 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />

      <span className="text-green-400 font-mono text-[9px] uppercase tracking-[0.2em]">Reach me!</span>
    </div>
    <div className="flex items-center gap-3">
      <MapPin size={18} className="text-green-500 shrink-0" />
      <span className="text-base font-black text-zinc-400 uppercase tracking-widest">
        Chennai, India
      </span>
    </div>
  </div>


</div>

        {/* Metadata / CTA Button */}
        <div className="p-1 flex items-center justify-center bg-zinc-900/20">
          <button className="w-full h-full bg--500 hover:bg-green-400 text-black font-black uppercase text-[10px] tracking-[0.3em] transition-all py-8">
            Initiate Project
          </button>
        </div>

      </div>
    </div>

    {/* Bottom System Bar */}

  </div>
</footer>
    </div>
  );
};

export default CinematographerPortfolio;