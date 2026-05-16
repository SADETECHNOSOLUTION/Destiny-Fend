import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Quote,
  Play,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const DirectorPortfolio = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openYear, setOpenYear] = useState(null);
  const testimonials = [
    {
      quote:
        "Arjun creates a calm yet intense atmosphere on set. His clarity of vision inspires every department.",
      name: "Karthik Subramaniam",
      role: "Film Producer",
    },
    {
      quote:
        "He extracts performances that feel lived-in and emotionally authentic. A true actor’s director.",
      name: "Meera Nair",
      role: "Actor",
    },
  ];

  const awards = [
  {
    title: "Best Director - filmtrack",
    issuedBy: "XYZ Film Festival",
    year: "2023",
    description: "Recognized for exceptional storytelling and direction.",
  },
  {
    title: "Audience Choice Award",
    issuedBy: "ABC Festival",
    year: "2022",
    description: "Awarded for highest audience appreciation.",
  },
    {
    title: "Best film - Ca Award",
    issuedBy: "ABC Festival",
    year: "2022",
    description: "Awarded for highest audience appreciation.",
  },
];

  const filmography = {
  2024: [
    {
      title: "Film Title One",
      role: "Director",
      description:
        "A cinematic exploration of human emotions and relationships.",
    },
  ],
  2023: [
    {
      title: "Film Title Two",
      role: "Writer & Director",
      description:
        "An experimental narrative blending visuals and storytelling.",
    },
    {
      title: "Film Title Three",
      role: "Assistant Director",
      description: "A collaborative project focusing on cinematic depth.",
    },
  ],
  2022: [
    {
      title: "Film Title Four",
      role: "Director",
      description: "A short film capturing raw human emotions.",
    },
  ],
};

  const socialLinks = [
  { icon: Instagram, color: "text-pink" },
  { icon: Linkedin, color: "text-blue-400" },
  { icon: Youtube, color: "text-red" },
  { icon: Facebook, color: "text-blue-600" },
];


  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white">

      {/* FULLSCREEN HERO */}
<section className="relative py-16 text-white flex items-center px-8 md:px-20 overflow-hidden">

  {/* Subtle Background Accent */}
  <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-white/5 blur-[140px] rounded-full"></div>

  <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-6 items-center">

    {/* LEFT SIDE */}
    <div className="space-y-3">

      {/* Profile + Name */}
      <div className="flex flex-col items gap-2">
        <img
          className="w-36 h-36 rounded-full object-cover ring-1 ring-gray-700"
          src="/profile.jpg"
        />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
            Arjun
            <span className="text-gray-0"> Raman</span>
          </h1>
          
          <p className="text-sm tracking-[0.35em] text-gray-500 uppercase">
            Film Director
          </p>
        </div>
                  <p className="text-gray-400 leading-relaxed">
            Arjun Raman is a Chennai-based film director known for grounded performances,
            atmospheric storytelling, and emotionally immersive cinema.
          </p>
      </div>

      {/* Social */}
      <div className="flex gap-5 text-gray-500">
{socialLinks.map(({ icon: Icon, color }, i) => (
  <div
    key={i}
    className="p-3 rounded-full bg-neutral-900 hover:bg-white transition duration-300 cursor-pointer"
  >
    <Icon size={18} className={color} />
  </div>
))}
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="">

<div className="space-y- text-gray-400 text-sm">

  <div className="flex items-center gap-3 p-3 rounded-xl bg-]-900/60  border-gray-800 hover:border-gray-600 transition">
    <div className="p-2 rounded-lg bg-gray-800">
      <Phone className="w-5 h-5 text-gray-400" />
    </div>
    <p className="tracking-wide text-gray-300">+91 98765 43210</p>
  </div>

  <div className="flex items-center gap-3 p-3 rounded-xl bg-]-900/60  border-gray-800 hover:border-gray-600 transition">
    <div className="p-2 rounded-lg bg-gray-800">
      <MapPin className="w-5 h-5 text-gray-400" />
    </div>
    <p className="tracking-wide text-gray-300">Chennai, India</p>
  </div>

  <div className="flex items-center gap-3 p-3 rounded-xl bg-]-900/60  border-gray-800 hover:border-gray-600 transition">
    <div className="p-2 rounded-lg bg-gray-800">
      <Mail className="w-5 h-5 text-gray-400" />
    </div>
    <p className="tracking-wide text-gray-300">arjunramanfilms@gmail.com</p>
  </div>

</div>

    </div>

  </div>
</section>

      {/* SPLIT ABOUT SECTION */}
<section className="space-y-6 px-8">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      Creative metrics
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>


  <div className="grid grid-cols-2 gap-4">

    {[
      { label: "Scripts Written", value: "25+" },
      { label: "Films Completed", value: "29" },
      { label: "Festival Selections", value: "6" },
      { label: "Years Experience", value: "4" },
    ].map((stat) => (
      <div
        key={stat.label}
        className="relative overflow-hidden p-4 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black"
      >

        {/* Subtle Glow Background */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-gray-700 via-black to-gray-900 blur-2xl" />

        <div className="relative z-10">
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-xs text-gray-400">{stat.label}</p>
        </div>

      </div>
    ))}

  </div>
</section>

<section className="space-y-6 px-8 py-16">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      skills
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {[
      { name: "Storytelling", percent: 95 },
      { name: "Visual Composition", percent: 90 },
      { name: "Dialogue Writing", percent: 88},
      { name: "Emotional Depth", percent: 92 },
    ].map((skill) => (
      <div
        key={skill.name}
        className="relative group overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-5 transition-all duration-300 hover:border-gray-600"
      >

        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{skill.icon}</span>
            <span className="text-sm text-white">{skill.name}</span>
          </div>

          <div className="px-2 py-1 rounded-full bg-white/10 text-white text-xs">
            {skill.percent}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-white to-gray-400 transition-all duration-700"
            style={{ width: `${skill.percent}%` }}
          />
        </div>

        {/* Subtle Glow */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition" />

      </div>
    ))}

  </div>
</section>

      {/* FILM GALLERY */}
      <section className="px-8 bg-neutral-950">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      notable films
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>

        <div className="flex gap-6 overflow-x-auto">
          {["/master.webp", "/mask.webp", "/master.webp"].map(
            (img, i) => (
              <div key={i} className="min-w-[300px]">
                <img
                  src={img}
                  className="rounded-xl h-[400px] object-cover hover:scale-105 transition duration-500"
                />
              </div>
            )
          )}
        </div>
      </section>

<section className="py-12 pl-6 md:px-20">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      Filmography
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>

  <div className="overflow-x-auto pb-6">
    <div className="flex space-x-6 snap-x snap-mandatory">

      {Object.entries(filmography)
        .sort((a, b) => b[0] - a[0])
        .map(([year, films]) => (
          <div
            key={year}
            className="min-w-[200px] md:min-w-[340px] snap-center"
          >
            <div
              className="p-5 rounded-2xl
                          backdrop-blur-xl
                         border border-white/40
                         shadow-lg
                         hover:shadow-xl transition"
            >
              {/* Year Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenYear(openYear === year ? null : year)}
              >
                <h3 className="text-lg font-semibold">{year}</h3>
                <span className="text-gray-500">
                  {openYear === year ? "−" : "+"}
                </span>
              </div>

              {/* Films (inside card) */}
              {openYear === year && (
                <div className="mt-4 space-y-3">
                  {films.map((film, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl
                                 border border-gray-200
                                 hover:bg-gray-50 transition"
                    >
                      <img src="/mask.webp" />
                      <h4 className="text-base font-medium">{film.title}</h4>
                      <p className="text-sm text-gray-500">{film.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

    </div>
  </div>
</section>

{/* AWARDS SECTION */}
<section className="px-6 max-w-6xl mx-auto">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      Awards
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>


  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {awards.map((award, index) => (
      <div
        key={index}
        className="group relative flex flex-col items-center p-6 rounded-2xl 
                   bg-white/5 border border-white/10 backdrop-blur-sm
                   hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        {/* Subtle Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <img 
          src="/award.png" 
          alt="Award Icon"
          className="w-12 h-12 mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 group-hover:grayscale-0"
        />
        
        <div className="text-center z-10">
          <h3 className="text-sm font-medium text-gray-200 leading-tight">
            {award.title}
          </h3>
          {award.year && (
            <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-2 block">
              {award.year}
            </span>
          )}
        </div>
      </div>
    ))}

<button className="group relative flex flex-col items-center justify-center p-8 rounded-2xl 
                   bg-[#0a0a0a] border border-white/10 overflow-hidden 
                   transition-all duration-700 hover:border-purple-500/40 min-h-[160px] w-40">
  
  {/* THE "BEHIND THE SCREEN" TROPHY */}
  <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
    <img 
      src="/award.png" 
      alt="Award Trophy"
      /* 1. CHECK PATH: Ensure 'award.png' is in your /public folder */
      /* 2. VISIBILITY: Increased opacity from 0.07 to 0.2 so you can actually see it */
      className="w-28 h-28 object-contain opacity-[0.2] blur-[4px] grayscale 
                 group-hover:blur-[2px] group-hover:opacity-[0.4] group-hover:scale-110
                 transition-all duration-1000 ease-out"
      /* 3. FALLBACK: If the image is broken, this border will show you the box */
      onError={(e) => { e.target.style.border = "1px solid red"; }} 
    />
  </div>

  {/* FRONT CONTENT - Ensure z-10 so it sits ABOVE the trophy */}
  <div className="relative z-10 flex flex-col items-center pointer-events-none">
    <span className="text-3xl font-semibold text-white tracking-tighter group-hover:text-purple-200 transition-colors duration-500">
      +7
    </span>
    
    <div className="h-[px] w-4 bg-white/20 my-2 group-hover:w-8 group-hover:bg-purple-500/50 transition-all duration-500" />
    
    <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 group-hover:text-gray-300 transition-colors duration-500">
      Honours
    </span>
  </div>
</button>
  </div>
</section>

      {/* TESTIMONIAL SECTION - FADE STYLE */}
<section className="px-6 max-w-5xl mx-auto mt-16">
  {/* Header with a thin, modern line */}
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
      Testimonials
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>

  <section className="relative bg-neutral-950/50 border border-white/5 rounded-3xl p-4 flex flex-col overflow-hidden group">

    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-64 bg-white blur-[120px] pointer-events-none" />

    <div className="relative z-10 flex flex-col justify-center items-center">

      <Quote 
        className="mb-4 text-purple-500/30 group-hover:text-purple-500/50 transition-colors duration-700" 
        size={32} 
        strokeWidth={1}
      />

      <blockquote className="max-w-3xl mx-auto text-center">
        <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-200 tracking-tight transition-all duration-700">
          "{testimonials[testimonialIndex].quote}"
        </p>
      </blockquote>

      <div className="mt-1 flex flex-col items-center">
        <div className=" w-[1px] bg-gradient-to-b from-purple-500 to-transparent mb-4"></div>
        
        <p className="text-base font-medium tracking-wide text-white">
          {testimonials[testimonialIndex].name}
        </p>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">
          {testimonials[testimonialIndex].role}
        </p>
      </div>

      <div className="flex gap-2">
        {testimonials.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === testimonialIndex ? "w-8 bg-purple-500" : "w-2 bg-gray-800"
            }`}
          />
        ))}
      </div>
    </div>
  </section>
</section>

      <section className="px-6 pb-10 max-w-6xl mt-16 mx-auto">
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-lg uppercase tracking-[0.3em] text-gray-500 font-medium">
    Journal
    </h2>
    <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2].map((i) => (
            <div key={i}>
              <img
                src="/post.jpg"
                className="h-44 w-full object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold">
                Directing Emotion Through Silence
              </h3>
                            <p className="text-gray-500 text-sm mb-2">
               with a strong interest in building efficient and user-friendly applications. Always eager to ...
              </p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default DirectorPortfolio;