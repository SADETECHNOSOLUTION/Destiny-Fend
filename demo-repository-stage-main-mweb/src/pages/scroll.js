import React, { forwardRef } from "react";

const ImageCard = ({ src }) => (
  <div className="w-28 h-24 flex-shrink-0 bg-gray-600 rounded-md overflow-hidden shadow-xl">
    <img
      src={src}
      alt=""
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);

const images = ["/job.jpg", "/post.jfif", "/post.jpg", "/post.jfif", "/job.jpg"];

const HorizontalScrollGallery = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="rounded-2xl w-full flex flex-col gap-6 overflow-hidden "
    >
      <style>{`
        /* Moves from left to right */
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        /* Moves from right to left */
        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-right {
          animation: scrollRight 25s linear infinite;
        }

        .animate-left {
          animation: scrollLeft 25s linear infinite;
        }

        .gallery-container {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      <div className="gallery-container flex flex-col gap-6">
        {/* ROW 1: SCROLLING RIGHT */}
        <div className="flex overflow-hidden">
          <div className="flex gap-6 animate-right whitespace-nowrap">
            {[...images, ...images].map((src, i) => (
              <ImageCard key={`row1-${i}`} src={src} />
            ))}
          </div>
        </div>

        {/* ROW 2: SCROLLING LEFT */}
        <div className="flex overflow-hidden">
          <div className="flex gap-6 animate-left whitespace-nowrap">
            {[...images, ...images].map((src, i) => (
              <ImageCard key={`row2-${i}`} src={src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default HorizontalScrollGallery;