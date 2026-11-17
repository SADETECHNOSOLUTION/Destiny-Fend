import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import Phonecode from '../components/phonecode';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Icon } from '@iconify/react/dist/iconify.js';

const Signup = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [user,setUser] = useState({ name: '', email: '', phoneNumber:'', password:'', confirmPassword:'' });
  const [passwordError,setPasswordError] = useState(false)
  const [siginOtp,showSigninOtp] = useState(false);
  const [seconds, setSeconds] = useState(300)
  const navigate = useNavigate();
  useEffect(() => {
    let intervalId;
    if (siginOtp && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [siginOtp, seconds]);
  const handleshowotp = () => {

    const { name, email, phoneNumber, password, confirmPassword } = user;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error('Please fill all the required fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    showSigninOtp(true);
  };
  
  const handlecloseotp = ()=>{
    setUser({ name: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
    showSigninOtp(false);
  }
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.some(field => field === '')) {
      toast.error('Please enter the complete OTP.');
      return;
    }
    try {
      const formattedPhoneNumber = country ? `${country.code}${user.phoneNumber}` : `+91${user.phoneNumber}`;
      const formattedOTP = otp.join('')
      const userdata = { ...user, phoneNumber: formattedPhoneNumber ,otp:formattedOTP };
      console.log(formattedOTP)
      console.log('Sending data:', JSON.stringify(userdata));
      const response = await fetch('http://localhost:8080/api/auth/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata),
        credentials: 'include'
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
       toast.success('Account created successfully!');
        console.log('Form data submitted successfully');
        setUser({ name: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
        handlecloseotp()
        setTimeout(() => navigate('/'), 5000);
        setOtp(Array(6).fill(''));
      } 
      else {
        toast.error('OTP is invalid!');
        console.error('Failed to submit data:', await response.text());
        setOtp(Array(6).fill(''));
      }
    } catch (error){
      console.error('Error submitting data:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user.password !== user.confirmPassword || user.password.length < 8) {
      setPasswordError('Passwords do not match or do not meet the criteria');
      return;
    } else if (!emailPattern.test(user.email)) {
      toast.error('Invalid email format.');
      return;
    } else {
      setPasswordError('');
    }
    try {
      const formattedPhoneNumber = country ? `${country.code}${user.phoneNumber}` : `+91${user.phoneNumber}`;
      const userdata = { ...user, phoneNumber: formattedPhoneNumber, role: 'USER' };
      console.log('Sending data:', JSON.stringify(userdata));
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata),
        credentials: 'include'
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const { token } = await response.json();
        handleshowotp()
      } 
      else {
        console.error('Failed to submit data:', await response.text());
      }
    } catch (error){
      console.error('Error submitting data:', error);
    }
  };
        const [languages,showLanguages] = useState(false);
        const [language,setLanguage] = useState(null)
        const [phoneCode,showPhoneCode] = useState(false)
        const [active,setActive] = useState(false);
        const[country,SetCountry] = useState(null);
        
        const handleChanges = (e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
        }; 

        const handleChange = (e) => {
          const { name, value } = e.target;
          if (name === 'phoneNumber') {
            setUser({
              ...user,
              phoneNumber: `${country && country.code ? country.code : '+91'}${value}`
            });
          } else {
            setUser({ ...user, [name]: value });
          }
        };
        const handleOTPChange = (e, index) => {
          const { value } = e.target;
          // Ensure the value is a single digit or empty
          if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move focus to the next input if a value is entered
            if (value && index < otp.length - 1) {
              document.getElementById(`otp-${index + 1}`).focus();
            }
          }
        };
        const handleSelectPhoneCode = (code)=>{
          SetCountry(code);
          showPhoneCode(false);
      }
      const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to the previous input if the current input is empty and backspace is pressed
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };
        const handleSelectLanguage = (lang)=>{
          setLanguage(lang);
          setActive(false);
          showLanguages(false);
        }
        const handleShowLanguages = ()=>{
            showLanguages(!languages);
        }
        const handleShowPhoneCode = ()=>{
          showPhoneCode(!phoneCode);
        }

        const info = [
        {
            id:1,
            heading:"Destiny ©2021"
        },
        {
            id:2,
            heading:"Sign up"
        },
        {
            id:3,
            heading:"Sign in",
            path:"/"
        },
        {
            id:4,
            heading:"Create ad"
        },
        {
            id:5,
            heading:"Create page"
        },
        {
            id:6,
            heading:"User Agreement"
        },
        {
            id:7,
            heading:"Privacy policy"
        },
        {
            id:8,
            heading:"Community Guidelines"
        },
        {
            id:9,
            heading:"Cookie policy"
        },
        {
            id:10,
            heading:"Copyright policy"
        },]
    return(
<>
  <div style={{fontFamily:'revert-layer'}} className="relative max-w-[30rem] w-full h-[41.4rem] bg-gradient-to-tr items-center justify-center from-span-start to-span-end flex flex-col">
    <ToastContainer />
        <div className='absolute top-20'>
        <img className="w-72 h-38" src="logo.png" alt="logo" />
        </div>

      <form onSubmit={handleSubmit} className="flex absolute bottom-0 flex-col w-full text-xs bg-white rounded-t-2xl justify-center items-center px-2 py-6">

        <div className="flex flex-col items-center justify-center mt-3 gap-6 w-full">
          <div className="flex gap-2 w-5/6 flex-col ">
            <input id='name' name='name' onChange={handleChanges} value={user.name} className="px-2 placeholder:text-xs h-8 w-full text-sm border border-gray-300 focus:border-2 focus:border-cta rounded-md focus:outline-none" type="text" maxLength={25} required placeholder="Enter your username" />
          </div>
          <div className="flex gap-2 w-5/6 flex-col ">
            <input id='email' name='email' onChange={handleChanges} value={user.email} className="px-2 placeholder:text-xs h-8 w-full text-sm border border-gray-300 focus:border-2 focus:border-cta rounded-md focus:outline-none focus:border-gray" type="email" required placeholder="Enter your email" />
          </div>
          <div className="flex gap-2 w-5/6 flex-col">
            <div>
            <div className='flex items-center gap-2'>
            <div onClick={handleShowPhoneCode} className='border cursor-pointer  border-gray-300 rounded-md px-2 py-1.5'><img className='w-6 h-4' src={country ? country.flag : 'india.jpg'} alt=''/></div>
            <input id='phoneNumber' name='phoneNumber' onChange={handleChanges} value={user.phoneNumber} className="px-2 py-2 h-8 placeholder:text-xs text-sm w-full focus:border-2 focus:border-cta border border-gray-300 appearance-none rounded-md focus:outline-none focus:border-gray" type="number" required placeholder="Enter your mobile number" />
            </div>
            {phoneCode && <Phonecode setFlag = {handleSelectPhoneCode} />}
            </div>
          </div>
          <div className="flex gap-2 w-5/6 flex-col gap-1">
            <input id='password' name='password' onChange={handleChanges} value={user.password} className="px-2 placeholder:text-xs py-2 h-8 w-full text-sm border focus:border-2 focus:border-cta border-gray-300 rounded-md focus:outline-none focus:border-gray" type="password" required placeholder="Enter your password" />
          </div>
          <div className="flex gap-2 flex-col mb-2 w-5/6 gap-1">
              <input id='confirmPassword' name='confirmPassword' onChange={handleChanges} value={user.confirmPassword} className="px-2 py-2 placeholder:text-xs h-8 w-full text-sm focus:border-2 focus:border-cta border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="password" required placeholder="Confirm your password" />
          </div>
        <div className='flex w-5/6 text-center flex-col'>
        <button type='submit'  className="cursor-pointer px-4 py-1.5 border w-full border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 mb-2 text-sm text-white font-semibold rounded-md">Sign Up</button>
                {passwordError && <span className="text-red text-sm">Passwords do not match!</span>}
        <p className='text-highlight text-xs mt-4 font-semibold'>I am a new member <NavLink to="/"><span className="text-cta text-xs font-semibold cursor-pointer">Log In Here</span></NavLink></p>
        </div>
        </div>
        <div>
        </div>
        <Modal
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor: 'transparent',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '45%',
      overflow: 'hidden', // Ensure content does not overflow
      border: 'none',
    },
  }}
  isOpen={siginOtp}
  onRequestClose={handlecloseotp}
>
  <div className='relative bg-white shadow-lg rounded-md' style={{ width: '100%', height: '100%' }}>
    <div className="absolute flex justify-between items-center top-0 w-full h-12 cursor-pointer px-4 py-2 rounded-md border border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 mb-2 text-white font-semibold">
      <p className='text-xl'>Enter your OTP</p>
      <Icon className='w-6 h-6' onClick={handlecloseotp} icon="ic:baseline-close" />
    </div>
    <div className='flex flex-col items-center justify-center h-full pt-12'>
      <div className='flex flex-col items-center gap-4'>
    <div className='rounded-full w-10 h-10 flex items-center justify-center bg-gray-200'><Icon icon="material-symbols:mail-outline" /></div>

        <div>
          <input
            value={user.email}
            className='w-80 h-10 px-2 border border-gray-400'
            readOnly
          />
          <p className='text-sm text-gray-500'>OTP has been sent to {user.email}</p>
        </div>
        <div className='flex gap-2'>
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              className='px-3 py-2 text-sm border w-12 border-gray rounded-md focus:border-gray text-center'
              type='text'
              maxLength='1'
              onChange={(e) => handleOTPChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={value}
              placeholder='0'
            />
          ))}
        </div>
        <div className='flex w-80 items-center justify-between'>
        <button className='px-4 py-2 bg-gray-100 shadow-md rounded-md'>Resend OTP</button>
        <button
          className="cursor-pointer px-4 py-2 border border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 text-white font-semibold rounded-md"
          onClick={handleVerifyOtp}
          type='submit'
        >
          Submit
        </button>
        </div>
        <span><span> {seconds > 0 ? `Time left: ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` : 'Time’s up!'}</span>
        </span>
      </div>
    </div>
  </div>
</Modal>

      </form>
    
   
    {/* <div className="absolute bottom-0 bg-gradient-to-tr from-span-start to-span-end py-2 flex flex-col w-full sm:items-center sm:gap-2 md:flex-row md:justify-center md:gap-3.5">
  {info.map((detail, index) => (
    <React.Fragment key={index}>
      <NavLink to={detail.path}><p className="cursor-pointer hover:text-white">{detail.heading}</p></NavLink>
      {index !== info.length - 1 && <span className="hidden md:inline-block">|</span>}
    </React.Fragment>
  ))}
</div> */}
  </div>
</>

      );
}

export default Signup;
