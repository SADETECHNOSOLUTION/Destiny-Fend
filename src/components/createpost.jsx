import React, { useState,useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { selectPost } from '../slices/postslice';
import { useDispatch, useSelector } from 'react-redux';
import InputEmoji from 'react-input-emoji';
import MapSelector from './mapselector';
import axios from 'axios';
import Modal from 'react-modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Createpost = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.post);
  const [file, setFile] = useState(null);
  const [postType, setPostType] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user,setUser] = useState()
  const [openPost,setOpenPost] =useState(false)
  const [visibility, setVisibility] = useState('PERSONAL');
  const [type,setType] = useState('');
  const [permission,setPermission] = useState();
  const [permissionPopup,setPermissionPopup] = useState(false)

  const handleOpen = ()=>{
    setOpenPost(true)
  }

  const handleClose = ()=>{
    setOpenPost(false)
  }
  const [description,setDescription] = useState('')
  const userId = useSelector((state) => state.auth.userId);
  const img = <Icon className='w-6 h-6 text-cta' icon="ph:image" />;
  const video = <Icon className='w-6 h-6 text-cta' icon="bx:video" />;
  const files = <Icon className='w-6 h-6 text-cta' icon="ic:baseline-attach-file" />;
  const reels = <Icon className='w-6 h-6 text-cta' icon="icon-park-outline:video-two" />;
  
  const icons = [
    {
      id: 1,
      icon: img,
      allowed: 'image/*',
      type: 'IMAGE',
        // Use a human-readable type
    },
    {
      id: 2,
      icon: video,
      allowed: 'video/*',
      type: 'VIDEO',  // Use a human-readable type
    },
    {
      id: 3,
      icon: reels,
      allowed: 'video/*',
      type: 'REELS',  // Use a human-readable type
    },
    {
      id: 4,
      icon: files,
      allowed: '',
      type: 'FILE',  // Generic file type
    },
  ];

  const handleImageChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const selectedData = {
          url: reader.result,
          type: selectedFile.type,
        };
        dispatch(selectPost(selectedData)); // Dispatch action with the selected file data
        setFile(selectedFile); // Store the file object
        setPostType(type);
        handleOpen() // Set postType based on the selected type
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
  };

  const renderMedia = () => {
    if (!selected) return null;
    if (selected.type && selected.type.startsWith('image')) {
      return<div class="w-full">
      <img src={selected.url} class="w-full h-96 object-cover" alt="Description" />
    </div>
    ;
    } else if (selected.type && selected.type.startsWith('video')) {
      return <video className='w-full h-auto' controls><source src={selected.url} type={selected.type} /></video>;
    }
    return null;
  };
  const openPermission = (type)=>{
    setPermissionPopup(true)
    setType(type)
  }
  
  const closePermission = ()=>{
    setPermissionPopup(false)
  }
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowMap(false); // Close the map after selecting the location
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalPostType = file ? postType : 'TEXT';
    // Create a FormData object for the file uploads and form data
    const formDataObj = new FormData();

    // Append userId and postType to FormData
    formDataObj.append('userId', userId);
    formDataObj.append('postType', finalPostType);
    formDataObj.append('postVisibility', visibility);
    formDataObj.append('privacySetting', 'PUBLIC');
    // Append the selected file with the correct key
    if (file) {
      if (postType === 'IMAGE') {
        formDataObj.append('imageFile', file); 
      } else if (postType === 'VIDEO') {
        formDataObj.append('videoFile', file); 
      }

    }
    if (description) {
      formDataObj.append('description', description); // Append description to FormData
    }
    // Append location if selected
    if (selectedLocation) {
      formDataObj.append('location', JSON.stringify(selectedLocation)); // Convert location object to JSON string
    }

    // Log the FormData object for debugging
    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}:`, value);
    }
const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        body: formDataObj,
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
        setFile(null);
        setPostType('');
        setDescription('');
        setSelectedLocation(null);
        dispatch(selectPost(null));
        setVisibility('');
        handleClose();
        const data = await response.json();
        console.log('API Response Data:', data); // Log the response for debugging
      } else {
        // Log detailed error message
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserDetails = useCallback( async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
        'Authorization':`Bearer ${token}`
        },
      });
      
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  },[userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  

  const fetchPermission = useCallback(async ()=>{
    const token = localStorage.getItem('token')
    try{
         const response = await fetch(` ${process.env.REACT_APP_API_URL}/permissions/get-status/${userId}`,{
         method:'GET',
         headers:{
            'Authorization':`Bearer ${token}`,
         }
        })
        if(response.ok){
        const data = await response.json()
        setPermission(data)
        }
        else{
          console.log('failed to post')
          setType('')
        }  
    }
    catch(error){
        console.log(error);
        setType('')
    }
},[userId])

useEffect(()=>{
  fetchPermission();
},[fetchPermission])


const handlePermission =async ()=>{

  const token = localStorage.getItem('token')

  const payload={
      userId:userId,
      permission:type,
      status:true
  }
  try{
       const response = await fetch(`${process.env.REACT_APP_API_URL}/permissions/grant`,{
       method:'POST',
       body: JSON.stringify(payload),
       headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
       }
      })
      if(response.ok){
       fetchPermission();
       closePermission()
       setType('')
      }
      else{
        console.log('failed to post')
        setType('')
      }  
  }
  catch(error){
      console.log(error);
      setType('')
  }
}


  return (
    <form onSubmit={handleSubmit} className='w-full bg-white rounded-md px-6 py-3 flex gap-2 flex-col items-center shadow-lg'>
      <p className='font-semibold text-center'>Create post</p>

      <div className='w-full flex'>
      {/* <img className='w-9 h-9 rounded-full' src={`${process.env.REACT_APP_API_URL}${user?.profileImagePath}`} alt='' /> */}
      {/* <input className='w-full border border-gray-400 rounded-md h-16'
        value=''
        onClick={handleOpen}
        onChange={handleOpen} // Update description state
        placeholder=''
      /> */}
    </div>
      <div className='flex gap-3'>

        {icons.map((item) => (
          <div className='relative cursor-pointer border-2 border-cta rounded-full p-1' key={item.id}>
    {Array.isArray(permission) && permission.some(p => p.permission === "CAMERA" && p.status === true) ?        <label className='flex cursor-pointer'>
              {item.icon}
              <input
                type='file'
                onChange={(e) => handleImageChange(e, item.type)} // Pass the type here
                accept={item.allowed}
                className='opacity-0 w-0 h-0 bg-black'
              />
            </label> : <label onClick={()=>openPermission('CAMERA')} className='flex cursor-pointer'>
              {item.icon}
            </label>}
          </div> 
        ))}
        {Array.isArray(permission) && permission.some(p => p.permission === "LOCATION" && p.status === true) ?       
<div className='border-1 p-1 rounded-full border-cta'>
  <Icon
          className='w-6 h-6 cursor-pointer text-cta'
          icon="carbon:location"
          onClick={() => setShowMap(true)}
        />
  </div>   : 
<div className='border-2 p-1 rounded-full border-cta'>
    <Icon
        className='w-6 h-6 cursor-pointer text-cta'
        icon="carbon:location"
        onClick={()=>openPermission('LOCATION')}
      />
    </div>}
      </div>
      {showMap && (
        <MapSelector
          onSelectLocation={handleSelectLocation}
          onClose={() => setShowMap(false)}
        />
      )}

      <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -40%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={openPost} onRequestClose={handleClose}>
      <div className={`relative w-1/2 bg-white rounded-m ${!selected && 'h-80'} flex rounded-lg shadow-lg flex-col`}>
      <div className='absolute top-0 p-4 w-full flex justify-end'>
      <Icon onClick={()=>{handleClose(); dispatch(selectPost(null))}}  icon="streamline:delete-1-solid" />
      </div>
      <InputEmoji className=''
                      value={description}
                      onChange={(text) => setDescription(text)}
                      placeholder="Write something..."
                    />
 <div className='p-4'>{renderMedia()}</div>
 <div className='absolute bottom-0 bg-white p-4 w-full'>
                 <button onClick={handleSubmit} className='bg-cta p-2 cursor-pointer w-full text-white  text-md font-semibold rounded-md'>
        Post
      </button>
      </div>
    </div>
 </Modal>
 <Modal  appElement={document.getElementById('root')}
style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-40%, -20%)',
          width: '80%',
          height: '60%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={permissionPopup} onRequestClose={closePermission}>
      <div className='relative bg-white h-36 ml-72 w-1/3 rounded-md flex rounded-lg shadow-lg flex-col items-center justify-center gap-4'>
      <span className='text-lg font-semibold'>Allow Destiny to access {type.toLocaleLowerCase()}</span>
      <div className='flex w-full justify-center gap-4'><button onClick={closePermission} className='w-16 px-2 rounded-md hover:bg-gray-100 bg-gray-200 py-1'>Deny</button><button onClick={()=>{handlePermission(type)}} className='w-16 px-2 bg-cta text-white hover:opacity-85 rounded-md py-1'>Allow</button></div>
      <Icon onClick={closePermission} className='absolute cursor-pointer top-2 right-2' icon="mdi:remove" />
    </div>
 </Modal>
    </form>
  );
};

export default Createpost;
