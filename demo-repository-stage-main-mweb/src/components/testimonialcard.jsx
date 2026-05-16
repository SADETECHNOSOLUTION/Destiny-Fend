import React from 'react';

const TestimonialCard = ({ name, role, text, rating, colorClass,profileImagePath }) => {
  return (
    <div className={`relative bg-white p-8 rounded-2xl shadow-sm border-2 ${colorClass.border} w-96`}>
      
      {/* Floating Quote Icon (Top Left) */}
      {/* <div className={`absolute -top-4 left-6 w-10 h-10 rounded-lg ${colorClass.bg} flex items-center justify-center shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 text-white fill-current"
        >
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.01705 21L6.01705 18C6.01705 16.8954 6.91248 16 8.01705 16H11.0171C11.5693 16 12.0171 15.5523 12.0171 15V9C12.0171 8.44772 11.5693 8 11.0171 8H8.01705C7.46477 8 7.01705 8.44772 7.01705 9V12C7.01705 12.5523 6.56933 13 6.01705 13H5.01705V21H6.01705Z" />
        </svg>
      </div> */}

      {/* Floating Avatar Placeholder (Left Middle) */}
      <div className={`absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-24  rounded-full border-4 border-white shadow-md flex items-center justify-center`}>
              <img className="w-20 h-20 object-fit rounded-full" src={`/${profileImagePath}`} alt="client logo" />
      </div>

      {/* Content Area */}
      <div className="pl-6">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{role}</p>
          </div>
          
          {/* Rating Stars using SVGs */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-3.5 h-3.5 ${i < rating ? 'text-orange-400 fill-current' : 'text-gray-200 fill-current'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100 my-4" />

        <p className="text-gray-500 text-sm leading-relaxed font-medium">
          {text}
        </p>
      </div>

      {/* Floating Bottom Accent */}
      <div className={`absolute -bottom-3 -right-3 w-8 h-8 rounded-full ${colorClass.bg} border-4 border-white shadow-sm flex items-center justify-center`}>
        <div className="w-2 h-2 rounded-full border border-white/60" />
      </div>
    </div>
  );
};

export default TestimonialCard;