import React from 'react';

const ProjectCard = ({ title, image, index, positionClasses }) => {
  return (
    <div className={`absolute ${positionClasses} group perspective-1000`}>
      {/* Label and Index */}
      <div className="mb-2">
        <span className="text-xs opacity-50 block">{index}</span>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <div className="h-[1px] w-12 bg-white/30 mt-1" />
      </div>

      {/* Image Container with 3D Hover */}
      <div className="relative w-80 h-64 transition-transform duration-500 ease-out transform-gpu 
                      group-hover:[transform:rotateX(10deg)_rotateY(-15deg)_scale(1.05)] 
                      preserve-3d cursor-pointer">
        <img 
          src={image} 
          alt={title} 
          className="w-80 h-64 object-cover rounded shadow-2xl"
        />
        {/* Optional: Glossy overlay for extra 3D feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export default ProjectCard;