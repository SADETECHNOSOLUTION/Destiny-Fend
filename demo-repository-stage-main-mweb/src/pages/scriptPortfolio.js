import React,{useState,useEffect} from "react";
import { Crosshair, Drama, Eye,Phone,Mail,Link,Instagram,Linkedin,Youtube,MapPin, Facebook } from "lucide-react";
import { Quote } from "lucide-react";

const Scriptwriter = () => {
  const works = [
    {
      title: "Master",
      year: "2021",
      image: "/master.webp",
    },
    {
      title: "Mask",
      year: "2022",
      image: "/mask.webp",
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % awards.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);


  const awards = [
  {
    image: "/award.png",
    title: "Best Screenplay - Galatta",
    year:2021
  },
  {
    image: "/award.png",
    title: "Best Screenwriter - Vikatan",
    year:2023
  },
];


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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



  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-[30rem] px-8 py-10 space-y-10">

        {/* HERO */}
        <section className="text-center space-y-2">
          <img
            src='/author.jpg'
            alt=""
            className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-gray-700"
          />
          <h1 className="text-2xl font-bold tracking-wide">Arjun Raman</h1>
          <p className="text-gray-400 text-">
            Story/Script Writter
          </p>
<section className="px- py-8 bg-black text-white">

  <div className="max-w-md mx-auto space-y-6">

    {/* Contact Cards */}
        <div className="pb-6 border-b border-gray-800">
      <div className="flex justify-between items-center">

        <a href="#" className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition">
          <Instagram className="w-5 h-5 text-gray-400" />
        </a>

        <a href="#" className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition">
          <Linkedin className="w-5 h-5 text-gray-400" />
        </a>

        <a href="#" className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition">
          <Facebook className="w-5 h-5 text-gray-400" />
        </a>

        <a href="#" className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition">
          <Youtube className="w-5 h-5 text-gray-400" />
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition"
        >
          <Link className="w-5 h-5 text-gray-400" />
        </a>

      </div>
    </div>


    <div className="space-y-4">

      {/* Phone */}
      <a
        href="tel:+919876543210"
        className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-gray-800">
          <Phone className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-gray-300">
          +91 98765 43210
        </span>
      </a>

      {/* Address */}
      <a
        href="#"
        className="flex items-start gap-2 p-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-gray-800">
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
        className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/40 transition-all duration-300"
      >
        <div className="p-2 rounded-lg bg-gray-800">
          <Mail className="w-5 h-5 text-gray-400" />
        </div>
        <span className="text-sm text-gray-300">
          arjunramanfilms@gmail.com
        </span>
      </a>

    </div>

    {/* Social Section */}

  </div>

</section>
        </section>



        {/* ABOUT */}
<section className="space-y-4">
  <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    About
  </h2>

  <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 shadow-xl">
    <p className="text-gray-300 text-sm leading-relaxed">
      Arjun Raman is a Chennai-based screenplay writer who crafts
      emotionally rich, slow-burning narratives rooted in human
      vulnerability. His storytelling lingers in the quiet moments —
      where silence speaks louder than dialogue.
    </p>

    <div className="w-12 h-[1px] bg-gray-700 mt-2"></div>
  </div>
</section>
<section className="space-y-4">
  <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
  Genre Expertise
  </h2>
 <div className="flex flex-wrap gap-2">

    <div className="flex border-2 border-gray-800 rounded-md px-2 py-2 bg-gradient-to-br from-gray-900 to-black items-center gap-3 text-gray-400 hover:text-white transition">
      <Crosshair className="w-5 h-5" />
      <span className="text-sm">Action</span>
    </div>

    <div className="flex border-2 border-gray-800 rounded-md px-2 py-2 bg-gradient-to-br from-gray-900 to-black items-center gap-3 text-gray-400 hover:text-white transition">
      <Drama className="w-5 h-5" />
      <span className="text-sm">Drama</span>
    </div>

    <div className="flex border-2 border-gray-800 rounded-md px-2 py-2 bg-gradient-to-br from-gray-900 to-black items-center gap-3 text-gray-400 hover:text-white transition">
      <Eye className="w-5 h-5" />
      <span className="text-sm">Horror</span>
    </div>

  </div>
  </section>

        {/* SHOWREEL */}
        <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    Writing Skills
  </h2>
<section className="space-y-6">

  <div className="grid grid-cols-2 gap-4">
    
    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition duration-300">
      <h3 className="text-sm font-semibold text-white">
        Character Sketch
      </h3>
    </div>

    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition duration-300">
      <h3 className="text-sm font-semibold text-white">
        Dialogue Writing
      </h3>

    </div>

    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition duration-300">
      <h3 className="text-sm font-semibold text-white">
        Story Structure
      </h3>

    </div>

    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition duration-300">
      <h3 className="text-sm font-semibold text-white">
        Visual Storytelling
      </h3>

    </div>

  </div>
</section>
        </section>

        <section className="space-y-6">
  <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    Languages
  </h2>

  <div className="flex justify-center gap-4 flex-wrap">

    {/* English */}
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"  
            r="40"
            stroke="#1f2937"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251"
            strokeDashoffset="12"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          100%
        </span>
      </div>
      <span className="text-gray-400 text-">Tamil</span>
    </div>

    {/* Tamil */}
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="40"
            stroke="#1f2937"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          100%
        </span>
      </div>
      <span className="text-gray-400 text-">Telugu</span>
    </div>

    {/* Hindi */}
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="40"
            stroke="#1f2937"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeDasharray="251"
            strokeDashoffset="50"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          80%
        </span>
      </div>
      <span className="text-gray-400 text-">Malayalam</span>
    </div>

  </div>
</section>

        {/* SELECTED WORKS */}
        <section className="space-y-4">
     <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    On-Screen works
  </h2>
<div className="flex items-center gap-4 overflow-x-scroll">
          {works.map((work, index) => (
            <div key={index} className="space-y-3">
              <img
                src={`${work.image}`}
                alt={work.title}
                className="rounded-lg w-full h-[8rem] object-cover"
              />
              <div>
                <h3 className="font-semibold flex flex-col items-center">
                  {work.title}{" "}
                  <span className="text-gray-500 text-xs">
                    ({work.year})
                  </span>
                </h3>
              </div>
            </div>
          ))}
</div>

        </section>

                <section className="space-y-4">
     <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    Upcoming Projects  </h2>

            <div className="space-y-3">

              <div className="bg-gradient-to-br from-gray-900 to-black p-3 border-2 rounded-lg border-gray-900">
                <h3 className="font-semibold flex flex-col items-center">
                Major
                  <span className="text-gray-500 text-xs">
                  
                  </span>
                </h3>
              </div>
          
</div>

        </section>
      

        {/* AWARDS */}
        <section className="space-y-3">
    <section className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
        Awards & Recognition
      </h2>

      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
        
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {awards.map((award, i) => (
            <div
              key={i}
              className="min-w-full flex flex-col items-center text-center space-y-2"
            >
              <img
                src={award.image}
                alt="award"
                className="h-32 w-32 object-contain"
              />
              <p className="text-white font-semibold">{award.title}</p>
                 <p className="text-white text-sm">({award.year})</p>
            </div>
          ))}
        </div>

      </div>
    </section>
<section className="space-y-6">
  <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    Testimonials
  </h2>

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
            
            <Quote className="w-8 h-8 text-gray-600" />

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

<section className="space-y-6">
  <h2 className="text-xl font-semibold tracking-tighter text-gray-300">
    Blogs
  </h2>

  <div className="space-y-4">

    {/* Blog Card */}
    <div className="bg-gradient-to-br from-gray-900 to-black flex gap-4 rounded-2xl border border-gray-800 hover:border-gray-600 transition duration-300">
      <img className="h-32 w-40 rounded-t-md" src="/post.jfif" />
      <div className="p-">


      <p className="text-xs text-gray-500 mt-4 mb-1">
        March 12, 2024
      </p>

      <h3 className="text-white font-semibold text-sm mb-2">
        Writing Emotion Without Dialogue
      </h3>
      <button className="text-sm text-white border-b border-gray-600 hover:border-white transition">
        Read More →
      </button>
 </div>


    </div>

    {/* Second Blog */}
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl flex gap-4 border border-gray-800 hover:border-gray-600 transition duration-300">
          <img className="h-32 w-40 rounded-t-md" src="/post.jfif" />


      <div className="flex flex-col">
      <p className="text-xs text-gray-500 mt-4 mb-1">
        February 05, 2024
      </p>
      <h3 className="text-white font-semibold text-sm mb-2">
        The Power of Mass Dialogues in Com...
      </h3>
     <button className="text-sm text-white w-max border-b border-gray-600 hover:border-white transition">
        Read More →
      </button>
      </div>





    </div>

  </div>
</section>
        </section>


      </div>
    </div>
  );
};

export default Scriptwriter;