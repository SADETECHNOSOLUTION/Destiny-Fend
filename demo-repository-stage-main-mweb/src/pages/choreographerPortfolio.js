import React, { useState, useEffect, useRef } from "react";
import { 
  Scissors, PenTool, Shirt, Sparkles, Instagram, Linkedin, 
  Youtube, Mail, MapPin, ExternalLink, Camera, Phone, 
  Palette, ShoppingBag, User, Share2, Plus, ArrowRight, Layers
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CostumeDesignerPortfolio = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeProject, setActiveProject] = useState('Film');
  
const projects = [
    { id: 1, name: "Victorian Noir", img: "/wardrobe1.jpg", pos: "justify-start" },
    { id: 2, name: "Cyber Nomad", img: "/wardrobe5.jpg", pos: "justify-end" },
    { id: 3, name: "Silk Dynasty", img: "/wardrobe6.jpg", pos: "justify-start" },
    { id: 4, name: "Glass Armor", img: "/wardrobe3.jpg", pos: "justify-end" },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
        
        // If we are at the end, jump back to start, otherwise move by one card width
        const isAtEnd = scrollLeft + offsetWidth >= scrollWidth - 10;
        const nextScroll = isAtEnd ? 0 : scrollLeft + (offsetWidth * 0.8);

        scrollRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 3000); // Swipes every 3 seconds

    return () => clearInterval(interval);
  }, [projects]);

  const { scrollYProgress } = useScroll();
  
  // 2. Create one transform that we can reuse or offset
  // This moves the "inner" images vertically as the page scrolls
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // --- DATA STRUCTURES ---
  const testimonials = [
    {
      quote: "The costumes didn't just dress the characters; they told their secrets. The choice of silk for the finale was a masterstroke.",
      name: "Zoya Akhtar",
      role: "Director",
    },
    {
      quote: "Technically impeccable. The period-accuracy of the 1920s corsetry was the highlight of the production.",
      name: "Rohit Bal",
      role: "Fashion Critic",
    }
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

  const honors = [
    { id: 1, year: "2025", title: "Filmfare Awards", category: "Best Costume Design" },
    { id: 2, year: "2024", title: "Vogue Fashion Fund", category: "Emerging Designer" },
  ];

  const lookbook = {
    "Film": [
      { title: "Kingdom of Silk", season: "Epic Drama", role: "Head Designer", image: "/c1.jpg" },
      { title: "Neon Streets", season: "Cyberpunk", role: "Stylist", image: "/c2.jpg" }
    ],
    "Editorial": [
      { title: "Vogue India Cover", season: "Summer 25", role: "Lead Stylist", image: "/c3.jpg" },
      { title: "Bazaar Bride", season: "Winter 24", role: "Concept Artist", image: "/c4.jpg" }
    ]
  };

  const dresses = [
    { id: 1, name: "Silk Gala", img: "/wardrobe1.jpg", size: "h-80" },
    { id: 2, name: "Velvet Cloak", img: "/wardrobe1.jpg", size: "h-96" }, // Taller
    { id: 3, name: "Leather Armor", img: "/wardrobe5.jpg", size: "h-64" }, // Shorter
    { id: 4, name: "Tulle Gown", img: "/wardrobe6.jpg", size: "h-80" },
  ];

  const stats = [
    { label: "Films", value: "32", icon: <Scissors size={20}/> },
    { label: "Custom Silhouettes", value: "200+", icon: <Shirt size={20}/> },
    { label: "Brand Stylings", value: "45", icon: <ShoppingBag size={20}/> },
    { label: "Textile Sourcing", value: "08", icon: <Palette size={20}/> },
  ];

  const craftsmanship = [
    { name: "Fabric Manipulation", level: 95 },
    { name: "Corsetry & Foundation", level: 88 },
    { name: "Millinery & Accessories", level: 92 },
    { name: "Budgeting & Logistics", level: 80 },
  ];


  const aesthetics = ["Avant Garde", "Minimalism", "Haute Couture"];

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-purple-500/40 font-sans">
      
      {/* --- SECTION 1: EDITORIAL HERO --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        {/* Fabric-like Mesh Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-purple-600/20 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-end">
          {/* Left Column: Big Typography */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-5xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase italic">
             <span className="text-transparent stroke-white stroke-1 hover:text-purple-500 transition-all duration-700" style={{ WebkitTextStroke: '1px white' }}>Arjun Kapur</span>

              </h1>
                                          <span className="text-purple font-mono tracking-[0.5em] text-sm uppercase">Costume Designer</span>

            </motion.div>
          </div>

          {/* Right Column: Profile & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative group aspect-[3/4] overflow-hidden rounded-tr-[100px]">
              <img 
                src="/profile.jpg" 
                alt="Maya Kapur" 
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute top-4 left-4 bg-purple p-3 rounded-full shadow-lg">
                <Sparkles size={24} className="text-white animate-pulse" />
              </div>
            </div>

          </div>
        </div>

        {/* The Marquee - Fabric/Aesthetic Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-purple text-black py-4 transform -rotate-1 origin-left">
          <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl">
            {[...aesthetics, ...aesthetics].map((item, i) => (
              <span key={i} className="mx-4 flex items-center gap-4">
                {item} <div className="w-2 h-2 bg-purple-600 rounded-full"/>
              </span>
            ))}
          </div>
        </div>
      </section>

            <section className="py-16 px-6 max-w-7xl mx-auto">
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-5">About</h2>
<span className="leading-relaxed">A costume designer dedicated to [Philosophy—e.g., uncovering the psychological truth of characters through silhouette and texture]. With over 7 years of experience across Genres</span>
</section>

      {/* --- SECTION 2: THE MEASUREMENTS (STATS) --- */}
      <section className=" px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-neutral-950 hover:bg-purple-950/20 border-r border-white/10 transition-all group">
              <div className="text-purple-500 mb-6 group-hover:scale-125 transition-transform duration-500 origin-left">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-black mb-2 italic">{stat.value}</h3>
              <p className="text-sm uppercase tracking-[0.3em] text-purple">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
<div className="w-full bg-black py-10"> {/* Added a dark background for contrast */}
      <div className="relative group">
                          <h2 className="text-5xl px-6 font-black italic uppercase tracking-tighter mb-10">fabrics</h2>

        {/* Scroll Container */}
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth items-start justify-start md:justify-center gap-6 md:gap-12 px-8">
          
          {fabrics.map((fabric, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center gap-4 snap-center flex-shrink-0 group/item"
            >
              {/* Circular Image Container */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover/item:">
                <div className="absolute inset-0 border-2 border-purple/70 rounded-full group-hover/item:border-white transition-colors duration-300" />
                <img 
                  src={`/${fabric.name}`} 
                  alt={fabric.name}
                  className="w-full h-full rounded-full object-cover p-1" 
                />
              </div>

              {/* Label: Clean, spaced, and small */}
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/70 group-hover/item:text-white transition-colors">
                {fabric.name.split('.')[0].replace(/-/g, ' ')}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>


      {/* --- SECTION 3: CRAFTSMANSHIP (SKILLS) --- */}
      <section className=" py-8 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter">skills</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
  {craftsmanship.map((skill, i) => (
    <div key={i} className="group relative">
      <div className="flex items-end justify-between mb-3">
        <div className="space-y-1">
          <h4 className="text-sm font-light uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors">
            {skill.name}
          </h4>
        </div>
        <span className="text-xs font-mono text-purple-500 italic">{skill.level}%</span>
      </div>
      
      {/* Stepped Bar Design */}
      <div className="flex gap-1 h-[3px] w-full">
        {[...Array(10)].map((_, bit) => (
          <motion.div
            key={bit}
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: bit * 10 < skill.level ? 1 : 0.1 }}
            transition={{ delay: bit * 0.05, duration: 0.5 }}
            className="h-full flex-1 bg-purple shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          />
        ))}
      </div>
    </div>
  ))}
</div>
      </section>

      {/* --- SECTION 4: LOOKBOOK (PROJECTS) --- */}
<section className="py-8 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 items-center overflow-hidden">
      
      {/* Title Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
          Wardrobe
        </h2>
      </div>

      {/* The Scroll Container */}
      <div className="bg-black text-white w-full relative font-sans overflow-hidden rounded-2xl border border-white/5">
        
        <div 
          ref={scrollRef}
          className="relative z-10 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory touch-pan-x no-scrollbar items-center py-10"
        >
          {/* Left spacer */}
          <div className="flex-shrink-0 w-[5vw]" />

          {projects?.map((item, i) => (
            <div 
              key={item.id || i} 
              className="flex-shrink-0 w-[75vw] md:w-[40vw] px-3 snap-center group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/10 shadow-2xl">
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-[10px] tracking-[0.4em] text-purple-500 font-bold uppercase mb-1">
                    Look {i + 1}
                  </p>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center opacity-30 px-1">
                <span className="text-[8px] tracking-widest uppercase font-mono italic">Ref.00{i+1}</span>
                <span className="text-[8px] tracking-widest uppercase font-mono tracking-[0.3em]">Couture_26</span>
              </div>
            </div>
          ))}

          {/* Right spacer */}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>

        {/* Auto-Slide Indicator */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center h-[1px]">
          <div className="w-24 bg-white/10 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 bg-purple-500"
            />
          </div>
        </div>
      </div>
    </section>
      {/* --- FOOTER: CONTACT --- */}
      <footer className="py-12 px-6 text- border-t border-white/5">
        <h2 className="text-5xl mb-10 md:text-7xl font-black italic uppercase tracking-tighter leading-none">
          contact
        </h2>        <div className="flex flex-col gap-4"> 
                <a 

          className="inline-block px-6 py-2 bg-purple/60 rounded-full font-black text-sm tracking-widest hover:bg-purple-400 hover:scale-105 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
        >
        +91 9232893320
        </a>
                <a 

          className="inline-block px-6 py-2 bg-purple/60 rounded-full font-black text-sm tracking-widest hover:bg-purple-400 hover:scale-105 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
        >
          No:29, Neelaankarai, Chennai
        </a>
        <a 
          href="mailto:maya@couture.com" 
          className="inline-block px-6 py-2 bg-purple/60 rounded-full font-black text-sm tracking-widest hover:bg-purple-400 hover:scale-105 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
        >
          Contact Studio
        </a>
        </div>

        
        <div className="mt-10 flex justify-center gap-8 text-gray-500">
           <Instagram className="text-purple cursor-pointer" />
           <Linkedin className="text-purple cursor-pointer" />
           <Youtube className="text-purple cursor-pointer" />
        </div>
      </footer>

      {/* CSS For Marquee */}
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

export default CostumeDesignerPortfolio;