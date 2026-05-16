import { SmartDisplaySharp } from '@mui/icons-material';
import React, { useRef, useEffect } from 'react';

const ImageCard = ({ src }) => (
  // Key CSS here: w-64 for fixed width, h-80 for fixed height, flex-shrink-0 is crucial
  <div className="w-96 h-64 flex-shrink-0 bg-gray-600 rounded-lg overflow-hidden shadow-xl">
    <img src={src} alt={`Image for ${src}`} className="w-full h-full object-cover" />
  </div>
);
const HorizontalScrollGallery = ({ 
    scrollContainerRef, 
    scrollSpeed = 0.5 
}) => {
    // 1. Initialize all Ref objects for the inner elements
    const sectionRef = useRef(null);
    const row1Ref = useRef(null); 
    const row2Ref = useRef(null); 
    const handleScroll = () => {
        const container = scrollContainerRef?.current || window; 
        
        if (typeof window === 'undefined' || !sectionRef.current || !row1Ref.current || !row2Ref.current) {
            return;
        }
        const scrollY = container === window ? window.scrollY : container.scrollTop;
        
        // Get the element's position relative to the viewport/container's viewable area
        const rect = sectionRef.current.getBoundingClientRect();
        const relativePosition = rect.top; 
        let transformValue = relativePosition * scrollSpeed * -1; 
        // --- Apply Transformations ---
        
        // Row 2 (Upper Row): Moves LEFT (negative transform) as we scroll down
        row2Ref.current.style.transform = `translateX(${-transformValue}px)`;

        // Row 1 (Lower Row): Moves RIGHT (positive transform) as we scroll down
        row1Ref.current.style.transform = `translateX(${transformValue}px)`;
    };

    useEffect(() => {
        const container = scrollContainerRef?.current || window;

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };

    }, [scrollContainerRef, handleScroll]); 

    const projects = [

    { title: "Dom-styr", pos: "top-20 left-10", idx: "011",src:"/job.jpg" },

    { title: "90 stopni architektura", pos: "top-40 left-1/3", idx: "009",src:"/frame.jpg" },

    { title: "Mail-Cat.cc", pos: "bottom-10 left-1/2", idx: "012",src:"/job.jpg" },

    { title: "Biosady", pos: "top-1/2 right-10", idx: "013",src:"/job.jpg" },

  ];


    return (
        <section 
            ref={sectionRef} 
            className="min-h-[64vh] rounded-2xl p-8        bg-white/10
        backdrop-blur-sm
    
        shadow-xl flex flex-col overflow-hidden text-white" 
        >
            {/* Center Name (Stuck at the top) */}
            <div className="h-[40vh]" /> 

            <div 
                ref={row2Ref} 
                className="flex gap-6 mb-10 will-change-transform relative left-[-20%]" // Initial horizontal offset
            >
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/img.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/job.jpg" />
            </div>

            {/* IMAGE ROW 2 (Lower Row - Moves Right) */}
            <div 
                ref={row1Ref} 
                className="flex gap-6 will-change-transform relative right-[0%]" // Initial horizontal offset
            >
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/img.jpg" />
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
            </div>


            {/* Spacer to give content more room to scroll */}
            <div className="h-[20vh]" /> 
        </section>
    );
};

export default HorizontalScrollGallery;
