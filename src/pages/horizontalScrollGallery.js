import { SmartDisplaySharp } from '@mui/icons-material';
import React, { useRef, useEffect } from 'react';

const ImageCard = ({ src }) => (
  // Key CSS here: w-64 for fixed width, h-80 for fixed height, flex-shrink-0 is crucial
  <div className="w-16 h-16 flex-shrink-0 bg-gray-600 rounded-lg overflow-hidden shadow-xl">
    {/* <img src={src} alt={`Image for ${src}`} className=" object-cover" /> */}
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

    // Define the scroll handler inside the component
    const handleScroll = () => {
        const container = scrollContainerRef?.current || window; 
        
        if (typeof window === 'undefined' || !sectionRef.current || !row1Ref.current || !row2Ref.current) {
            return;
        }
        const scrollY = container === window ? window.scrollY : container.scrollTop;
        
        // Get the element's position relative to the viewport/container's viewable area
        const rect = sectionRef.current.getBoundingClientRect();
        const relativePosition = rect.top; 
        // We multiply by -1 to reverse the effect, making the horizontal movement happen as we scroll DOWN.
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


    return (
        <section 
            ref={sectionRef} 
            className="min-h-[44vh] rounded-2xl p-8 bg-cta flex flex-col overflow-hidden text-white" 
        >
            {/* Center Name (Stuck at the top) */}
            <div className="h-[20vh]" /> 

            <div 
                ref={row2Ref} 
                className="flex gap-6 mb-4 will-change-transform relative left-[-40%]" // Initial horizontal offset
            >
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/post.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/job.jpg" />
            </div>

            {/* IMAGE ROW 2 (Lower Row - Moves Right) */}
            <div 
                ref={row1Ref} 
                className="flex gap-6 will-change-transform relative right-[66%]" // Initial horizontal offset
            >
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
                <ImageCard src="/post.jpg" />
                <ImageCard src="/job.jpg" />
                <ImageCard src="/frame.jpg" />
            </div>

<div>
    
</div>
            {/* Spacer to give content more room to scroll */}
            <div className="h-[20vh]" /> 
        </section>
    );
};

export default HorizontalScrollGallery;
