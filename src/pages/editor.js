import React, { useState, useEffect, useRef } from "react";
import { 
  Scissors, Film, Play, FastForward, Info, 
  Instagram, Linkedin, Youtube, Mail, MapPin, 
  Layers, Monitor, Zap, Award, Mic2, Tv,
  Phone,Video,
  Highlighter
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const FilmEditorPortfolio = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const scrollRef = useRef(null);

  const stats = [
    { label: "Features Cut", value: "14", icon: <Film size={20}/> },
    { label: "Total Minutes", value: "2.4k", icon: <Monitor size={20}/> },
    { label: "Awards Won", value: "06", icon: <Award size={20}/> },
    { label: "Collabs", value: "40+", icon: <Layers size={20}/> },
  ];


const toolStack= [
  { name: "Premiere", icon: "premierpro.webp", desc: "Cutting" },
  { name: "Resolve", icon: "davinci.jpg", desc: "Color" },
  { name: "After Effects", icon: "aftereffects.png", desc: "VFX" },
  { name: "Topaz Ai", icon:"topaz.webp", desc: "Gen" },
];

      const [index, setIndex] = useState(0);
  
  const testimonials = [
    {
      quote:
        "Arjun brings rare emotional depth to commercial storytelling. His scripts balance silence with intensity beautifully.",
      name: "Karthik Subramaniam",
      role: "Film Producer",
    },
    {
      quote:
        "His dialogue writing feels organic and deeply rooted in realism. Every character feels lived-in.",
      name: "Meera Nair",
      role: "Director",
    },
  ];
  

  const projects = [
    { id: 1, name: "Neon Pulse", genre: "Sci-Fi Thriller", duration: "114 min", img: "/page.png" },
    { id: 2, name: "Midnight Rain", genre: "Noir Drama", duration: "92 min", img: "/weather.jpg" },
    { id: 3, name: "The Last Echo", genre: "Documentary", duration: "45 min", img: "/weatherb.png" },
    { id: 4, name: "Shattered Glass", genre: "Action", duration: "128 min", img: "/denim.png" },
  ];

  const softwareStack = [
    { name: "Narrative Pacing", level: 95 },
    { name: "VFX Compositing", level: 85 },
    { name: "Resolve", level: 90 },
    { name: "Dynamic Sound Design & Mixing", level: 90 },
  ];

  const editStyles = ["Narrative Flow", "Match Cutting", "Color Grading", "Sound Design"];

  // Auto-scroll logic for the "Timeline" project section
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + offsetWidth >= scrollWidth - 10;
        scrollRef.current.scrollTo({
          left: isAtEnd ? 0 : scrollLeft + offsetWidth,
          behavior: "smooth",
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen selection:bg-cyan-500/40 font-mono">
      
      {/* --- SECTION 1: THE MASTER SHOT (HERO) --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Cinematic Scanlines & Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >

<h1 className="text-4xl md:text-[10rem] font-black leading-none text-center tracking-tighter">
  {/* Added pb-2 to give the underline some breathing room */}
  <span className="block uppercase text-white border-b-2 border-cyan-500 pb-2 mb-4 inline-block">
    Ishaan Verma
  </span>

  <span className="block text-base tracking-wider text-cyan-500 uppercase">
    Editor
  </span>
</h1>
              <p className="text-lg text-zinc-400 max-w-xl font-sans italic">
                Crafting rhythm from chaos. Film Editor specializing in non-linear storytelling and high-octane pacing.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4 relative group">
            <div className="relative aspect-square overflow-hidden border-2 border-zinc-800 rounded-sm">
               <img 
                src="/profile.jpg" 
                alt="Ishaan Verma" 
                className="w-full h-full object-cover contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
              {/* Viewfinder Corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />
            </div>
          </div>
        </div>

        {/* Cinematic Marquee */}
        <div className="absolute bottom-0 left-0 w-full bg-zinc-900 border-y border-zinc-800 py-6 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee font-bold uppercase text-4xl">
            {[...editStyles, ...editStyles].map((item, i) => (
              <span key={i} className="mx-12 flex items-center gap-6 text-zinc-700 hover:text-cyan-500 transition-colors">
                {item} <Scissors size={24} className="text-zinc-800"/>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16">
              <h2 className="text-3xl px-6 font-black mb uppercase tracking-tighter">Tools</h2>
<div className="flex flex-row flex-wrap items-center justify-center gap-3 py-6">
      {toolStack.map((tool, i) => (
        <div key={i} className="group relative flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-whi5 rounded-full border-cyan-500/50 transition-all duration-300">
          
          {/* Icon with a subtle cyan glow on hover */}
    <img 
  src={`/${tool.icon}`} 
  className="w-6 h-6 object-contain transition-all" 
  alt="Premiere Pro" 
/>

          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
              {tool.name}
            </span>
          </div>
          
          {/* Subtle dot indicator */}
          <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
        </div>
      ))}
    </div>
</div>

      {/* --- SECTION 2: EDITING SUITE (STATS) --- */}
      <section className=" px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 bg-zinc-950 border border-zinc-800 flex flex-col items-center text-center group hover:border-cyan-500/50 transition-all">
              <div className="text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>




      {/* --- SECTION 3: THE CUTTING ROOM (SKILLS) --- */}
<section className=" max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
    
    {/* --- LEFT: The Skill Stack (4 Columns) --- */}
    <div className="md:col-span-4 bg-zinc-950 px-8 border border-white/5 rounded-2xl">
      <h2 className="text-2xl font-bold uppercase tracking-widest mb-10 text-white flex items-center gap-2">
        Technical Stack
      </h2>
      
      <div className="space-y-10">
        {softwareStack.map((skill, i) => (
          <div key={i} className="group relative">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-medium uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                {skill.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 italic">
                Lvl // {skill.level}
              </span>
            </div>
            {/* Minimalist "Dotted" Progress Line */}
            <div className="relative h-[2px] w-full bg-zinc-900">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
              />
              {/* Glow Effect */}
              <motion.div 
                initial={{ left: 0 }}
                whileInView={{ left: `${skill.level}%` }}
                className="absolute -top-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] z-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* --- RIGHT: Feature Bento (8 Columns) --- */}
    <div className="md:col-span-8 grid grid-cols-2 gap-6">
      
      {/* 1. Large Branding Card */}
      <div className="col-span-2 bg-gradient-to-br from-zinc-900 to-black p-12 border border-zinc-800 rounded-2xl flex justify-between items-center group overflow-hidden relative">
        <div className="z-10">
          <h3 className="text-5xl font-black text-white leading-none">24<span className="text-cyan-500">FPS</span></h3>
          <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2">Cinematic Standard Consistency</p>
        </div>
        <div className="absolute right-[-10%] opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
            <Tv size={200} />
        </div>
      </div>

      {/* 2. Specialized Skill: Audio */}
      <div className="bg-zinc-950 p-6 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 transition-all group">
        <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
          <Mic2 size={24} className="text-cyan-400 group-hover:text-black" />
        </div>
        <h4 className="text-white font-bold uppercase text-sm mb-1">Post-Audio</h4>
        <p className="text-zinc-500 text-xs leading-relaxed">Immersive soundscapes & dialogue mastering.</p>
      </div>

      {/* 3. Specialized Skill: Broadcast */}
      <div className="bg-zinc-950 p-6 border border-zinc-900 rounded-2xl hover:border-cyan-500/50 transition-all group">
        <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
          <Tv size={24} className="text-zinc-500 group-hover:text-black" />
        </div>
        <h4 className="text-white font-bold uppercase text-sm mb-1">Broadcasting</h4>
        <p className="text-zinc-500 text-xs leading-relaxed">Compliance ready for network & streaming delivery.</p>
      </div>

    </div>
  </div>
</section>

      {/* --- SECTION 4: THE TIMELINE (PROJECTS) --- */}
      <section className="py-24 bg-zinc-950 overflow-hidden">
        <div className="px-6 md:px-20 mb-12 flex justify-between items-end">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Showcase</h2>
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-zinc-500 uppercase">Scroll to scrub</p>
            <div className="h-0.5 w-24 bg-cyan-500 mt-2 ml-auto" />
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-20 snap-x snap-mandatory"
        >
          {projects.map((project, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[600px] snap-center group">
              <div className="relative aspect-video overflow-hidden bg-zinc-900 border border-zinc-800">
                <img 
                  src={project.img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-black">
                    <Play fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-[10px] border border-white/10">
                  {project.duration}
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold uppercase">{project.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{project.genre}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

<section className="space-y-6 px-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Testimonials</h2>


  <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">

    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="min-w-full p-8 min-h-[220px] flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            
            <Highlighter className="w-8 h-8 text-gray-600" />

            <p className="text-gray-300 max-w-xs mx-auto text-sm leading-relaxed italic">
              {t.quote}
            </p>

            <div>
              <p className="text-white font-semibold text-sm">
                {t.name}
              </p>
              <p className="text-gray-500 text-xs">
                {t.role}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>

  {/* Dots */}
  <div className="flex justify-center gap-2">
    {testimonials.map((_, i) => (
      <div
        key={i}
        className={`h-2 w-2 rounded-full transition ${
          i === index ? "bg-white" : "bg-gray-700"
        }`}
      />
    ))}
  </div>
</section>

      {/* --- FOOTER: EXPORT SETTINGS (CONTACT) --- */}
      <footer className="py-24 px-6 border-t border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-cyan-500 to-transparent" />
        
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">
          Ready to <span className="text-cyan-500 italic">Export?</span>
        </h2>
        
        <div className="flex  flex-wrap w-full gap-6 mb-16">
                      <a href="mailto:edit@ishaanverma.com" className="px-4 w-full rounded-md text-xs py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors flex items-center gap-3">
            <Phone size={18} /> +91 92383473829
          </a>
                    <a href="mailto:edit@ishaanverma.com" className="px-4 w-full rounded-md text-xs py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors flex items-center gap-3">
            <MapPin size={18} /> Saidapet, Chennai
          </a>
          <a href="mailto:edit@ishaanverma.com" className="px-4 rounded-md  w-full text-xs py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors flex items-center gap-3">
            <Mail size={18} /> arjunramanfilms@gmail.com
          </a>

        </div>

        <div className="flex justify-center gap-8 text-zinc-500">
          <Instagram className="hover:text-cyan-500 cursor-pointer transition-colors" />
          <Linkedin className="hover:text-cyan-500 cursor-pointer transition-colors" />
          <Youtube className="hover:text-cyan-500 cursor-pointer transition-colors" />
        </div>

      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FilmEditorPortfolio;