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


const Musicdirector = ()=>{
    const call="fa6-solid:phone"
  const address="mdi:address-marker"
  const mail ="material-symbols:mail"
    const social = {
  media: [
    {
      id: 1,
      icon: "🎧",
      link: "https://open.spotify.com"
    },
    {
      id: 2,
      icon: "📺",
      link: "https://youtube.com"
    },
    {
      id: 3,
      icon: "📸",
      link: "https://instagram.com"
    },
    {
      id: 4,
      icon: "🎼",
      link: "https://soundcloud.com"
    }
  ]
};


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
<div className="group relative flex items-center gap-5 rounded-2xl 
                bg-white/5 backdrop-blur-xl 
                border border-white/10 
                px-6 py-5 
                transition-all duration-500 
                hover:border-[#FF8A3D]/50 
                hover:shadow-[0_0_30px_rgba(255,138,61,0.15)]">

  {/* Soft Gradient Glow */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                  from-[#FF8A3D]/0 via-[#FF8A3D]/5 to-[#FF8A3D]/0 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500" />

  {/* Icon Container */}
  <div className="relative flex items-center justify-center 
                  w-12 h-12 rounded-xl 
                  bg-gradient-to-br from-[#FF8A3D] to-[#EE5757] 
                  shadow-lg 
                  transition-transform duration-500 
                  group-hover:scale-110">

    <Icon className="text-white text-xl" icon="fa6-solid:phone" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col">
    <span className="text-gray-400 text-sm uppercase tracking-widest">
      {title}
    </span>
    <span className="text-white text-lg md:text-xl font-semibold tracking-tight 
                     group-hover:text-[#FF8A3D] transition-colors duration-300">
      {value}
    </span>
  </div>

</div>

);

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

const genres = [
  "Cinematic",
  "Electronic",
  "Ambient",
  "Hip-Hop",
  "Orchestral",
  "Experimental",
];

const stats = [
    { value: "400", label: "Songs" },
    { value: "100K", label: "Listens" },
    { value: "110", label: "Movies" },
  ];

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
    return(
 <div className="bg-black text-white overflow-hidden">

<section className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex items-center justify-center font-sans">
  
  {/* === 1. ENHANCED ATMOSPHERICS === */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Dynamic Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF8A3D]/10 blur-[160px] rounded-full" />
    
    {/* Subtle Topographic SVG */}
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
      <path d="M0,500 Q250,400 500,500 T1000,500" fill="none" stroke="#FF8A3D" strokeWidth="1" className="animate-pulse" />
      <path d="M0,600 Q250,500 500,600 T1000,600" fill="none" stroke="#FF8A3D" strokeWidth="1" />
    </svg>
  </div>

  <div className="relative z-10 w-5/6 mx-auto px-6 py-12 flex flex-col items-center">
    
    {/* === 2. CENTERED HEADER (Top Layer) === */}
    <div className="text-center space-y-2">
      <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase">
<span className="text-white">SARAN</span>
      </h2>
      <p className="text-[#FF8A3D] text-xs md:text-sm font-bold tracking-[0.5em] uppercase">
        Music Director
      </p>
    </div>

    {/* === 3. THREE-COLUMN CONTENT GRID === */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-0">
      
      {/* LEFT COL: Stats (Spans 3) */}
      <div className="lg:col-span-3 flex flex-col gap-16 text-center lg:text-left order-2 lg:order-1">
        {stats.map((stat, i) => (
          <div key={i} className="group">
            <h3 className="text-6xl font-black text-white group-hover:text-[#FF8A3D] transition-colors duration-500">
              {stat.value}
            </h3>
            <p className="text-sm font-semibold text-[#FF8A3D] uppercase tracking-[0.3em] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* CENTER COL: The Iconic Arch (Spans 6) */}
      <div className="lg:col-span-6 relative flex flex-col items-center justify-end h-[400px] md:h-[600px] order-1 lg:order-2 group">
        {/* The Semi-Circle Backing */}
        <div className="absolute bottom-0 w-[300px] rounded-xl h-[300px] md:w-[400px] md:h-[400px] 
                        border-2 border-[#FF8A3D]  shadow-[0_-30px_100px_rgba(255,138,61,0.2)] 
                        transition-transform duration-1000 group-hover:scale-[1.03]" />
        
        {/* The Profile Image */}
        <div className="absolute left-40 top-40 rounded-xl z-10 w-[280px] md:w-[400px]  overflow-hidden">
          <img 
            src="/profile.jpg" 
            alt="Saran Portfolio" 
            className="w-full h-full object-cover brightness-110 contrast-125 transition-all duration-700 group-hover:grayscale-0"
          />
          {/* Subtle bottom blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        </div>
      </div>

      {/* RIGHT COL: Bio & Contact (Spans 3) */}
      <div className="lg:col-span-3 flex flex-col gap-10 text-center lg:text-right order-3">
        <div className="space-y-4">
          <h4 className="text-sm font-black text-white uppercase tracking-widest border-b border-[#FF8A3D] inline-block pb-1">Biography</h4>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto lg:ml-auto lg:mr-0">
            A highly versatile artist, Saran is an Professional musician who started his career in the 2000s. based in Chennai. I'm very passionate about shaping emotion through sound.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black text-white uppercase tracking-widest border-b border-[#FF8A3D] inline-block pb-1">Contact</h4>
        <div className="flex-1 w-full lg:max-w-lg flex space-y-4 flex-col items-center lg:items-end">
          <div className=" rounded-3xl flex flex-col gap-4  backdrop-blur-xl w-full">
            {contacts.map((item, index) => (
              <ContactItem key={index} Icon={item.Icon} title={item.title} value={item.value} />
            ))}
          </div>
        </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ================= SOCIAL BAR ================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-5 bg-black/60 backdrop-blur px-6 py-3 rounded-full border border-white/10 z-50">
        {social.media.map((s) => (
          <button
            key={s.id}
            onClick={() => window.open(s.link, "_blank")}
            className="text-white/70 hover:text-[#FF8A3D] hover:drop-shadow-[0_0_10px_rgba(255,138,61,0.8)] transition"
          >
            {s.icon}
          </button>
        ))}
      </div>

      {/* ================= GENRES ================= */}
<section className="py-32">
<div className="text-center mb-20">
  <h2 className="text-5xl md:text-6xl font-black tracking-tight">
    Genres & Moods
  </h2>
  <div className="w-24 h-1 bg-[#FF8A3D] mx-auto mt-6 rounded-full" />
</div>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-16 max-w-5xl mx-auto px-6">
    {genres.map((g, i) => (
      <div
        key={i}
        className="relative flex items-center justify-center"
      >
        {/* CD Image */}
        <img
          src="cd.png"
          className="absolute w-32 h-32 -right-0 -top-4 rotate-12 opacity-80"
          alt=""
        />

        {/* Glass Card */}
        <div
          className="group relative h-36 w-36
            rounded-2xl border border-white/20
            bg-[#FF8A3D]/90 backdrop-blur-xl
            shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]
            transition-all duration-500
            scale-110 -rotate-2
            cursor-pointer overflow-hidden"
        >
          {/* Glow */}
          <div className="
            absolute -top-10 -right-10 w-28 h-28
            bg-[#FF8A3D] rounded-full blur-[50px] opacity-40
            opacity-80 scale-150
            transition-all duration-700
          " />

          {/* Glass Shine */}
          <div className="
            absolute inset-0 bg-gradient-to-br
            from-white/20 to-transparent
            opacity-50
            transition-opacity
          " />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <span className="text-sm font-semibold tracking-widest uppercase text-white">
              {g}
            </span>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-1 bg-[#FF8A3D] w-0 w-full transition-all duration-500" />
        </div>
      </div>
    ))}
  </div>
</section>

<div className="text-center mb-20">
  <h2 className="text-5xl md:text-6xl font-black tracking-tight">
    Song Albums
  </h2>
  <div className="w-24 h-1 bg-[#FF8A3D] mx-auto mt-6 rounded-full" />
</div>
      {/* ================= EQUALIZER ================= */}


      {/* ================= PROJECT CARD ================= */}
      <section className="py-12 space-y-8">
        <div className="relative max-w-xl mx-auto bg-black border border-white/10 p-8 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#FF8A3D]" />
          <h3 className="text-2xl font-bold">Midnight Echoes</h3>
          <p className="text-white/50 text-sm">Feature Film • 2024</p>

          <button className="
            mt-6 text-[#FF8A3D]
            hover:underline
            hover:drop-shadow-[0_0_10px_rgba(255,138,61,0.8)]
          ">
            ▶ Play Excerpt
          </button>
        </div>
                <div className="relative max-w-xl mx-auto bg-black border border-white/10 p-8 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#FF8A3D]" />
          <h3 className="text-2xl font-bold">Midnight Echoes</h3>
          <p className="text-white/50 text-sm">Feature Film • 2024</p>

          <button className="
            mt-6 text-[#FF8A3D]
            hover:underline
            hover:drop-shadow-[0_0_10px_rgba(255,138,61,0.8)]
          ">
            ▶ Play Excerpt
          </button>
        </div>
                <div className="relative max-w-xl mx-auto bg-black border border-white/10 p-8 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#FF8A3D]" />
          <h3 className="text-2xl font-bold">Midnight Echoes</h3>
          <p className="text-white/50 text-sm">Feature Film • 2024</p>

          <button className="
            mt-6 text-[#FF8A3D]
            hover:underline
            hover:drop-shadow-[0_0_10px_rgba(255,138,61,0.8)]
          ">
            ▶ Play Excerpt
          </button>
        </div>
      <section className=" flex justify-center">
        <div className="flex gap-2 items-end h-32">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="
                w-3 rounded-full
                bg-[#FF8A3D]
                shadow-[0_0_20px_rgba(255,138,61,0.7)]
              "
              style={{
                height: `${30 + Math.random() * 70}%`,
                animation: `pulse ${0.9 + Math.random()}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </section>
      </section>

{/* --- Hero Section (from previous code) --- */}
<section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
  {/* ...hero code as above... */}
</section>

{/* --- Projects / Albums Carousel --- */}
<section className="relative py-24 bg-black text-white">
  <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
    Featured Works
  </h2>

  <div className="max-w-6xl mx-auto px-6">
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls={true}
      autoPlay={true}
      autoPlayInterval={4000}
      responsive={{
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
      }}
      items={carouselItems.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg border border-white/10">
          <img
            src={item.image} 
            alt={item.title} 
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-80 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-xl font-bold text-[#FF8A3D]">{item.title}</h3>
            <p className="text-white/60 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    />
  </div>
</section>

{/* --- Call to Action Section --- */}



      {/* ================= FINAL CTA ================= */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-6xl font-black mb-6">
            Let’s Make Noise
          </h2>

          <p className="text-white/60 mb-12">
            Film • Albums • Live Performances • Brands
          </p>

          <button className="
            px-14 py-5 text-xl font-bold rounded-full
            bg-[#FF8A3D]
            text-black
            shadow-[0_0_80px_rgba(255,138,61,0.8)]
            hover:scale-110 transition
          ">
            Start a Collaboration
          </button>
        </div>
      </section>
    </div>
    )
}

export default Musicdirector;