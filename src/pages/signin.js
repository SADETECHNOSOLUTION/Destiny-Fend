import React, { useState,useEffect } from 'react'
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Languages from '../components/languages';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAuth } from '../slices/authslice';
import { fetchUserProfile } from '../admindashboard/fetchuser';
import CryptoJS from 'crypto-js';

const Signin = () => {
    const [user,setUser] = useState({ email: '', password:''});
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [signinOtp,showOtp] = useState(false);
    const [otpPage,showOtpPage] = useState(false);
    const [languages,setLanguages] = useState(false);
    const [language,setLanguage] = useState(null)
    const [active,setActive] = useState(false);
    const [seconds, setSeconds] = useState(300)
    const [error,setError] = useState('')
  
    const navigate = useNavigate()

    const handleChange = (e) => {
      setError('')
        const { name, value } = e.target;
          setUser({ ...user, [name]: value });
      };
      const handleCloseOTP = ()=>{
        showOtp(false);
      }
      const handleotpPage = ()=>{
        showOtpPage(true);
        showOtp(false);
      }
      const handlecloseotpPage = ()=>{
        showOtpPage(false);
      }

    const handleShowLanguages = ()=>{
        setLanguages(!languages);
    }
    const handleActive = ()=>{
        setActive(!active);
    }

    const encryptData = (password) => {
      const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRET_KEY); // Use a secure key
      const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_IV); // Use a secure IV (Initialization Vector)
      const encrypted = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    };

    const info = [
    {
        id:1,
        heading:"Destiny ©2021"
    },
    {
        id:2,
        heading:"Sign up",
        path:"/signup"
    },
    {
        id:3,
        heading:"Sign in"
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

     const fetchUserdata = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://destiny-apigateway.onrender.com/api/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          return data;
        }
         else {
          console.error('Failed to fetch user profile:', response.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    };

    const fetchuser = async () => {
      const token = localStorage.getItem('token');
      const userProfile = await fetchUserProfile();
      try {
        const response = await fetch(`https://destiny-apigateway.onrender.com/api/users/getBy-email?email=${userProfile.email}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.userid)
          return data;
        }
         else {
          console.error('Failed to fetch user profile:', response.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    };
    const handleSendOtp = async (e) => {
        e.preventDefault();
        
        // Construct the payload
        const payload = {
          email: user.loginmail
        };
        try {
          console.log('Sending payload:', JSON.stringify(payload));
          // Send the OTP request
          const response = await fetch(`https://destiny-apigateway.onrender.com/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
      
          if (response.ok) {
            handleotpPage();
            toast.success('OTP sent successfully! Please check your email.');
            console.log(1);

            if (!response.ok) {
            toast.error('Incorrect Username/Password');
            console.log(2);
            } else {
              setError('Incorrect Username/Password');
              console.log(3);
            }
          } else {

            const errorText = await response.text();
            toast.error(`Error: ${errorText}`);
            console.log(4);
          }
        } catch (error) {
          console.error('Error sending OTP:', error);
          toast.error('An error occurred while sending OTP.');
          console.log(5);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (user.password.length < 8) {
          toast.error('Password must be at least 8 characters long.');
          return;
        }
        if (!user.email) {
          toast.error('Email cannot be empty.');
          return;
        } else if (!emailPattern.test(user.email)) {
          toast.error('Invalid email format.');
          return;
        }
        console.log(JSON.stringify(CryptoJS.enc.Utf8.parse(process.env.REACT_APP_SECRET_KEY)))
        console.log(JSON.stringify(CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_IV)))
        console.log(encryptData(user.password))


        try {


          const response = await fetch(`https://destiny-apigateway.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(user),
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          if (response.ok) {
            const data = await response.json();
            if (data.token) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('refreshToken',data.refreshToken)
              setUser({ email: '', password: '' });
              console.log('Form data submitted successfully');
              const userProfile = await fetchUserProfile(data.token);
              const userdetails = await fetchUserdata();
              const fetchedUser = await fetchuser(); // Await fetchuser

              // const userIdAsciiInt = stringToAsciiInt(userProfile.id).asciiAsInt
              if (userdetails.some(user => user.email === userProfile.email)) {
                dispatch(setAuth({ userId: fetchedUser.id, token: data.token }));
                setTimeout(() => navigate('/newsfeed'), 5000);
                toast.success(`Welcome ${userProfile.name}`);
                console.log(userProfile.id);
                setError('');
              } else if (userProfile) {
                // dispatch(setAuth({ userId: user.id, token: data.token }));
                console.log('Navigating to /gw');
                dispatch(setAuth({ userId: fetchedUser.id, token: data.token }));
                toast.success(`Welcome ${userProfile.name}`);
                setTimeout(() => navigate('/gw'), 5000);
                console.log(userProfile.id);
                setError('');
              }
            } else {
                setError('Invalid credentials. Please try again.');
                console.log(process.env.API_URL)
            }
          } else {
            toast.error(`Invalid Email/Password`);
            setError('Incorrect Username/Password');
            console.log(process.env.API_URL)
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('An error occurred while fetching data');
          console.log(process.env.API_URL)
        }
      };
      const handleSelectLanguage = (lang)=>{
        setLanguage(lang);
        setActive(false);
        handleShowLanguages(false);
      }
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
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.some(field => field === '')) {
      toast.error('Please enter the complete OTP.');
      return;
    } 
    const payload = {
        email: user.loginmail,
        otp: otp.join('')  // Assuming OTP is an array of strings
      };

    try {
      console.log('Sending data:', JSON.stringify(payload));
      const response = await fetch(`https://destiny-apigateway.onrender.com/api/auth/login-with-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log('Form data submitted successfully');
        handleCloseOTP()
        handlecloseotpPage()
        setError('');
        const userProfile = await fetchUserProfile(token);
        if (userProfile) {
          toast.success(`Welcome ${userProfile.name}`);
          dispatch(setAuth({ userId: userProfile.userId, }));
          setTimeout(() => navigate('/gw'), 5000);
        }
        else {
          toast.error('Failed to fetch user profile');
          setError('Incorrect Username/Password');
        }
      } 
      else {
        toast.error(`OTP is invalid`);
        console.error('Failed to submit data:', await response.text());
      }
    } catch (error){
      console.error('Error submitting data:', error);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
        // Move focus to the previous input if the current input is empty and backspace is pressed
        document.getElementById(`otp-${index - 1}`).focus();
    }
};
  useEffect(() => {
    let intervalId;
    if (otpPage && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [otpPage, seconds]);

    return (
        <>
         <div style={{fontFamily:'revert-layer'}}  className="relative bg-[image-url]  min-h-screen justify-center items-center bg-gradient-to-tr from-span-start to-span-end flex flex-col ">
          <div  className='w-full text-font-mono flex items-center justify-between'>
            <div className='relative flex flex-col bg-white h-screen items-center justify-center  w-1/2'>
              <img className='absolute top-56 w-96 h-38' src='logo.png' alt='logo' />
                <img className='absolute -bottom-12 w-full h-80' src='filmcity.png' alt='background' />
            </div>
            <div className='w-1/2 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex custom:text-sm default:text-base flex-col bg-white px-4 rounded-md justify-center items-center md:w-3/5 '>
              <div className='flex flex-wrap mt-6 w-full justify-center items-center gap-5 mb-6'>
          <div className='flex gap-2'>
          <input onChange={handleChange} className='checked:bg-[#817AEB]  form-radio' type="radio" name="option" checked={true} value="Individual" />
          <label>Individual</label>
          </div><span>|</span>
          <div className='flex gap-2'>
            <input onChange={handleChange} type="radio" name="option"  value="Identifier"/>
            <label>Identifier</label>
          </div>
          <div className='flex items-center relative'>
              <div className='flex flex-col'>
              <div className='w-20 flex justify-end items-center'>
              <p>{language ? language.name : 'English'}</p>
              <div className=''>{active ? <FaCaretUp onClick={()=>{handleActive(); handleShowLanguages()}} /> : <FaCaretDown  onClick={()=>{handleActive(); handleShowLanguages()}}  />}</div>
              </div>
              {languages && <Languages selectLanguage = {handleSelectLanguage} />}
              </div>
              </div>
          </div>
          <div className='flex flex-col w-full md:w-5/6 gap-3 mb-8'>
          <div className='flex gap-2 flex-col'>
          <label className='text-md'>Email <span className='text-red'>*</span></label>
          <input id='email' name='email' onChange={handleChange} value={user.email} className=" px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type='email' required placeholder='Enter your email' />
          </div>
          <div className='flex gap-2 flex-col'>
          <label className='text-md'>Password <span className='text-red'>*</span></label>
          <input id='password' name='password' onChange={handleChange} value={user.password} className=" px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type='password' required placeholder='Enter your password' />
          </div>
          <NavLink to='/forgotpassword'><p className=' text-sm hover:underline'>Forgot your password?</p></NavLink>
          <span className='text-red'>{error}</span>
          {/* <div className='cursor-pointer' onClick={handleShowOTP}>
            Login with OTP
          </div> */}
          <div className='flex flex-col text-center w-full gap-3' >
          <button type='submit' className="px-4 py-2 items-center border border-gray-300 bg-gradient-to-tr from-span-start w-full to-span-end text-white-800 hover:bg-custom-hover text-white font-semibold rounded-md">Log In</button>
          <p>I am a new user <NavLink to='/signup'><span className='text-highlight font-semibold hover:text-button cursor-pointer'>Sign Up here</span></NavLink></p>
          </div>
          </div>
            </form>
            </div>
          </div>
          <div></div>
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
  isOpen={signinOtp}
  onRequestClose={handleCloseOTP}
>
  <form onSubmit={handleSendOtp} className='relative bg-white shadow-lg rounded-md' style={{ width: '100%', height: '100%' }}>
    <div className="absolute flex justify-between items-center top-0 w-full h-12 cursor-pointer px-4 py-2 rounded-md border border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 mb-2 text-white font-semibold">
      <p className='text-xl'>Email</p>
      <Icon className='w-6 h-6' onClick={handleCloseOTP} icon="ic:baseline-close" />
    </div>
    <div className='flex flex-col items-center justify-center h-full pt-12'>
      <div className='flex flex-col items-center gap-4'>
    <div className='rounded-full w-10 h-10 flex items-center justify-center bg-gray-200'><Icon className='w-6 h-6' icon="et:phone" /></div>
          <input id='loginmail' name='loginmail'
            onChange={handleChange} value={user.loginmail}
            className='w-80 h-10 px-2 border border-gray-300'
            placeholder='Enter you email'
          />
        <div className='flex w-80 items-center justify-between'>
        <button type='submit'
          className="cursor-pointer px-4 py-2 border border-gray-300 bg-gradient-to-lr from-span-start to-span-end text-white-800 text-white font-semibold rounded-md"
        >
          Send OTP
        </button>
        </div>
      </div>
    </div>
  </form>
</Modal>
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
  isOpen={otpPage}
  onRequestClose={handlecloseotpPage}>
  <div className='relative bg-white shadow-lg rounded-md' style={{ width: '100%', height: '100%' }}>
    <div className="absolute flex justify-between items-center top-0 w-full h-12 cursor-pointer px-4 py-2 rounded-md border border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 mb-2 text-white font-semibold">
      <p className='text-xl'>Enter your OTP</p>
      <Icon className='w-6 h-6' onClick={handlecloseotpPage} icon="ic:baseline-close" />
    </div>
    <div className='flex flex-col items-center justify-center h-full pt-12'>
      <div className='flex flex-col items-center gap-4'>
    <div className='rounded-full w-10 h-10 flex items-center justify-center bg-gray-200'><Icon icon="material-symbols:mail-outline" /></div>
        <div>
          <input name='email' id='email'
            value={user.loginmail}
            className='w-80 h-10 px-2 border border-gray-300'
            readOnly
          />
          <p className='text-sm text-gray-500'>OTP has been sent to {user.loginmail}</p>
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

{/* <div className="absolute  bg-gradient-to-tr from-span-start to-span-end bottom-0 flex flex-col w-full sm:items-center py-2 sm:gap-2 md:flex-row md:justify-center md:gap-3.5">
  {info.map((detail, index) => (
    <React.Fragment key={index}>
      <NavLink to={detail.path}><p className="cursor-pointer custom:text-sm default:text-base hover:text-white">{detail.heading}</p></NavLink>
      {index !== info.length - 1 && <span className="hidden md:inline-block">|</span>}
    </React.Fragment>
  ))}
</div> */}
<ToastContainer />
         </div>
        </>
      );
}

export default Signin;


