import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch,useSelector } from "react-redux";
import { updateStory } from "../slices/photoslice";
import { useNavigate } from "react-router";
import Modal from "react-modal";

const StoryUpload = ()=>{
    const navigate = useNavigate();
    // const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [file,setFile] = useState(null);
    // const [text,setText] = useState('')
    const { story } = useSelector((state) => state.photo);
    const userId = useSelector((state)=>state.auth.userId)
    const [type,setType] = useState('');
    const [permission,setPermission] = useState();
    const [permissionPopup,setPermissionPopup] = useState(false)

    const handleStoryChange = (event,type) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            const fileObject = { name: selectedFile };
                setFile(fileObject.name.name); 
                dispatch(updateStory(fileObject))
                console.log(file)
                setType(type)
        }
    };

    const handleroute = () => {
        setTimeout(() => {
          navigate('/newsfeed');
        }, 1000);
      };
    // const handleChange = (e)=>{
    //     setText(e.target.value)
    // }

    const PostStory =async ()=>{
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', story.name);
        formData.append('type', type);
        formData.append('duration', 24);
        formData.append('privacy', 'PUBLIC');
        formData.append('userId', userId);
        try{
             const response = await fetch(`${process.env.REACT_APP_API_URL}/statuses/post`,{
             method:'POST',
             body:formData,
             headers:{
                'Authorization':`Bearer ${token}`,
             }
            })
            if(response.ok){
                dispatch(updateStory(null))
                handleroute()
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
        fetchPermission()
    },[fetchPermission])


    const handlePermission =async ()=>{

        const token = localStorage.getItem('token')

        const payload={
            userId:userId,
            permission:"CAMERA",
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


    const openPermission = ()=>{
        setPermissionPopup(true)
    }

    const closePermission = ()=>{
        setPermissionPopup(false)
     }

    


    console.log(story?.name)
    return(
        <div className="min-h-screen bg-black flex justify-center">
    <div style={{backgroundImage: `url(${story?.name.name})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}} className="relative p-8 min-screen w-3/5 ">
        {/* {isEditing &&
        <input
        onChange={handleChange}
        value={text}
        style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#000',
            border: 'none',
            opacity:0,
            padding: '5px',
            borderRadius: '5px',
            outline: 'none'}} className="w-full h-min-h-screen -0" type="text" />} */}
    <div className="absolute flex w-full justify-center items-center gap-16 top-5">
    {
  Array.isArray(permission) && permission.some(p => p.permission === "CAMERA" && p.status === true) ? (
    <div className="relative cursor-pointer">
      <label className="flex cursor-pointer">
        <Icon className="story-icons" icon="uim:image-v" style={{ color: '#525151' }} />
        <input
          className="w-0 h-0 opacity-0"
          onChange={(e) => handleStoryChange(e, 'IMAGE')}
          type="file"
          accept="image/*"
        />
      </label>
    </div>
  ) : (
    <div onClick={openPermission} className="relative cursor-pointer">
      <label className="flex cursor-pointer">
        <Icon className="story-icons" icon="uim:image-v" style={{ color: '#525151' }} />
      </label>
    </div>
  )
}

{Array.isArray(permission) && permission.some(p => p.permission === "CAMERA" && p.status === true) ? (
  <div className="relative cursor-pointer">
    <label className="flex cursor-pointer">
      <Icon className="story-icons" icon="icon-park-twotone:video" style={{ color: '#525151' }} />
      <input className="w-0 h-0 opacity-0" onChange={(e) => handleStoryChange(e, 'VIDEO')} type="file" accept="video/*" />
    </label>
  </div>
) : (
  <div onClick={openPermission} className="relative cursor-pointer">
    <label className="flex cursor-pointer">
      <Icon className="story-icons" icon="icon-park-twotone:video" style={{ color: '#525151' }} />
    </label>
  </div>
)}

    <Icon className="story-icons"  icon="icon-park-twotone:music"  style={{color: '#525151'}} />
    <Icon className="story-icons"  icon="ion:text"  style={{color: '#525151'}} />
    <Icon className="story-icons"  icon="mdi:sticker-emoji"  style={{color: '#525151'}} />
    </div>
    <button onClick={PostStory} className="absolute bottom-6 right-6 bg-black p-2 rounded-full text-cta text-white flex items-center gap-2 p-2 px-4 text-lg font-semibold">Add to Story <span><Icon icon="fluent:send-20-filled"  style={{color: 'white'}} /></span></button>
    </div>
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
      <span className='text-lg font-semibold'>Allow Destiny to access Camera</span>
      <div className='flex w-full justify-center gap-4'><button onClick={closePermission} className='w-16 px-2 rounded-md hover:bg-gray-100 bg-gray-200 py-1'>Deny</button><button onClick={handlePermission} className='w-16 px-2 bg-cta text-white hover:opacity-85 rounded-md py-1'>Allow</button></div>
      <Icon onClick={closePermission} className='absolute cursor-pointer top-2 right-2' icon="mdi:remove" />
    </div>
 </Modal>
    </div>
    )
}

export default StoryUpload;