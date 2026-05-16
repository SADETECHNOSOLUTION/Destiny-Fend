import { useEffect, useState } from "react";

export default function BlurCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
const [isOverEmerald, setIsOverEmerald] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check the element under the cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      // Check if the element or its parent has our emerald class
      const isEmeraldSection = element?.closest('.bg-premium-emerald');
      setIsOverEmerald(!!isEmeraldSection);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
<div className={`pointer-events-none fixed top-0 left-0 z-[9999]
           w-4 h-4 rounded-full
           /* Dynamic Background Color */
           ${isOverEmerald ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-emerald-500'}
           
           animate-blink
           -translate-x-1/2 -translate-y-1/2 
           transition-all duration-300 ease-out`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
