import React,{useState, useEffect} from 'react';
import { Mail, Lock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginAdminWizard = () => {

    const [mail,setMail] = useState('')
    const [password,setPassword] = useState('')
  
  // Recommended approach:
  const Submit = (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    if (mail === 'sadetechno@gmail.com' && password === '12345678') {
      navigate('/dashboard');
    } else {
      alert('Invalid Credentials');
    }
  };
  

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" flex w-full h-screen bg-gray-50 justify-between relative shadow-xl overflow-hidden">
           <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-50 p-4 z-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Admin Login
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#817AEB] w-5 h-5" />
              <input onChange={(e)=>setMail(e.target.value)} value={mail}
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#817AEB] w-5 h-5" />
              <input onChange={(e)=>setPassword(e.target.value)} value={password}
                type="password"
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">

            <a href="#" className="text-[#817AEB] cursor-pointer hover:underline">Forgot Password?</a>
          </div>

<button onClick={Submit} className="w-full bg-[#817AEB] cursor-pointer pointer-events-auto hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200">
  Login
</button>
        </form>

        {/* Divider */}
        {/* <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div> */}

        {/* Social Login */}
        {/* <div className="flex justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <button key={i} className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </button>
          ))}
        </div> */}

        {/* Footer */}
         {/* Footer */}
         <div className='w-full text-center mt-4'>
                 <span className="text-gray-600 text-center ">
   Sign in as an User?  <span className='text-white'>4</span>
   <NavLink 
     to="/" 
     className="relative z-20 text-[#817AEB] font-semibold hover:underline cursor-pointer"
   >
     User Login
   </NavLink>
 </span>
         </div>
      </div>
    </div>
        {/* Left Side: Decorative Sidebar */}
        <div className="w-2/3 bg-[#817AEB] p-8 hidden md:flex flex-col justify-center relative z-10 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-pink-300 opacity-50 -skew-x-12 transform origin-top-left"></div>
         
        </div>

        {/* Right Side: Form */}

      </div>
    </div>
  );
};

export default LoginAdminWizard;