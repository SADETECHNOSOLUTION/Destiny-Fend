import React,{useState,useEffect, useCallback} from 'react'
import { Link, NavLink,useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector,useDispatch } from 'react-redux';
import { changePhoto } from '../slices/photoslice';
import { changecoverPhoto } from '../slices/photoslice';
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { updatePhoto } from '../slices/photoslice';

const ProfileUser = () => {
  const [imageForm,setImageForm] = useState(false);
  const [coverForm,setCoverForm] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const {coverpic} = useSelector((state)=>state.photo)
  const userId = localStorage.getItem('userId')
  const { userID } = useParams(); // Get userId from URL params
  // const [isFollowed,setIsFollowed] = useState(false);
  // const [following,setFollowing] = useState();
  // const [isFollowing,setisFollowing] = useState()
  // const [friends,setFriends] = useState()
  const [profile,setProfile] = useState(null)
  const [profilepic,setProfilepic] = useState(profile?.user.profileImagePath)


  const fetchProfile = useCallback(async()=>{
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`https://destiny-apigateway.onrender.com/home/api/aggregate/${userId}`, {
        method: 'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(response.ok){
        const data = await response.json()
        setProfile(data)
      }
    }
    catch(error){
    console.error('Error fetching user data:', error);
    }
  },[userId])

  useEffect(()=>{
    fetchProfile()
  },[fetchProfile])

  const openImageForm = ()=>{
    setImageForm(true);
  }

  const openCoverForm = ()=>{
    setCoverForm(true);
  }

  const closeImageForm =()=>{
    setImageForm(false)
    setProfilepic(profile?.user.profileImagePath)
  }

  const closeCoverForm =()=>{
    setCoverForm(false)
  }
  
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilepic(reader.result);
        setFile(selectedFile);
        dispatch(updatePhoto(selectedFile))
      };
      reader.readAsDataURL(selectedFile); 
    }
  };

  const cancelImage = () => {
    dispatch(changePhoto(profilepic));
    closeImageForm();
  };

  const cancelCover = ()=>{
    dispatch(changecoverPhoto(coverpic));
    closeCoverForm();
  }

  // const handleButtonClick = () => {
  //  dispatch(updatePhoto(selectedprofilepic));
  // };

  // const handleupdateCover = ()=>{
  //   dispatch(updateCover(selectedcoverpic));
  //   console.log(coverpic)
  // }

    const location = useLocation();
    const isActive = (path) => {
      return location.pathname === path;
    };
      // const isCurrentUser = parseInt(userID) === userId;
    const menu = [
        {id:1,
        name:'Profile',
        path:`/user/${userID}`},
        {id:2,
        name:'Timeline',
        path:`/timelineview/${userID}`},
        {id:3,
          name:'Profession',
          path:`/Professionview/${userID}`},
        {id:4,
        name:'Friends',
        path:`/friendsview/${userID}`},
        {id:5,
        name:'Photos',
        path:`/photosview/${userID}`},
        {id:6,
        name:'Videos',
        path:`/videosview/${userID}`},
        ]

        const handlechangeCover = (event)=>{
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
              dispatch(changecoverPhoto(reader.result)); 
              setFile(selectedFile); 
            };
            reader.readAsDataURL(selectedFile);
          }
        }
        // const fetchUserDetails = useCallback(async () => {
        //   try {
        //     const response = await axios.get(`https://destiny-apigateway.onrender.com/api/users/${userID}`, {
        //       method: 'GET',
        //     });
        //     setUser(response.data);
        //   } catch (error) {
        //     console.error("Error fetching user details:", error);
        //   }
        // },[userID]);

        // const handleFollowStatus = useCallback((data) => {
        //   // Assuming data has a list of followers
        //   setIsFollowed(data.users.some((follower) => follower.id === userId));
        // },[userId]);

        // const fetchFollowers = useCallback(async () => {
        //   try {
        //     const token = localStorage.getItem('token');
        //     if (!token) {
        //       console.error('No token found in localStorage');
        //       return;
        //     }
        //     const response = await fetch(`https://destiny-apigateway.onrender.com/follows/api/followers/${userID}`, {
        //       method: 'GET',
        //       headers: {
        //         'Authorization': `Bearer ${token}`,
        //       },
        //     });
    
        //     if (response.ok) {
        //       const data = await response.json();
        //       setFollowers(data);
        //       // Check if the user is followed
        //       handleFollowStatus(data); 
        //       console.log(isFollowed)
        //     } else {
        //       console.error('Failed to fetch user data:', response.status);
        //     }
        //   } catch (error) {
        //     console.error('Error fetching user data:', error);
        //   }
        // },[handleFollowStatus,isFollowed,userID]);

// const fetchFollowing = useCallback(async () => {
// try {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.error('No token found in localStorage');
//     return;
//   }
//   const response = await fetch(`https://destiny-apigateway.onrender.com/follows/api/following/${userID}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     setFollowing(data);
//     fetchProfile()
//     // Check if the user is followed
//     setisFollowing(data.users.some((follower) => follower.id === userId));
//     console.log(isFollowing)
//   } else {
//     console.error('Failed to fetch user data:', response.status);
//   }
// } catch (error) {
//   console.error('Error fetching user data:', error);
// }
// },[isFollowing,userID,userId]);
  // const fetchfriends = useCallback(async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       console.error('No token found in localStorage');
  //       return;
  //     }
  //     const response = await fetch(`https://destiny-apigateway.onrender.com/friend-requests/${isCurrentUser ? userId:userID}/friends`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       setFriends(data);
  //       // Check if the user is followed
  //       console.log(friends)
  //     } else {
  //       console.error('Failed to fetch user data:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  //   },[friends,isCurrentUser,userID,userId]);

// Run this effect whenever userID or userId changes
        
        // const updateProfile = async()=>{
        //   try{
        //     const response = await fetch(`https://destiny-apigateway.onrender.com/api/users/${userId}/profile-image`,{
        //       method:'PATCH',
        //     })
        //     if(response.ok){
        //       console.log('')
        //       fetchFollowers()
        //       fetchFollowing()
        //     }
        //     else{
        //       console.log('error in posting data')
        //     }
        //   }
        //   catch(error){
        //     console.error(error)
        //   }
        // }   
        

        
        const updateProfilePic = async()=>{
          const token = localStorage.getItem('token')
          try {
            const formdata = new FormData();
            formdata.append('profileImagePath',file)
            const response = await fetch(`https://destiny-apigateway.onrender.com/api/users/${userId}/profile-image`, {
              method: 'PATCH',
              body:formdata,
              headers:{
                'Authorization':`Bearer ${token}`
              }
            });
      
            if (response.ok) {
            closeImageForm()
            } else {
              console.error('Failed to fetch user data:', response.status);
              // Optionally handle different status codes (e.g., unauthorized, not found)
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }

        const updatecoverPic = async()=>{
          const token = localStorage.getItem('token')
          try {
            const formdata = new FormData();
            formdata.append('bannerImagePath',file)
            const response = await fetch(`https://destiny-apigateway.onrender.com/api/users/${userId}/banner-image`, {
              method: 'PATCH',
             body:formdata,
             headers:{
              'Authorization':`Bearer ${token}`
             }
            });
      
            if (response.ok) {
            closeCoverForm()
            } else {
              console.error('Failed to fetch user data:', response.status);
              // Optionally handle different status codes (e.g., unauthorized, not found)
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }

  return (
    <div>
    <Modal  appElement={document.getElementById('root')}
style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor:'transparent',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '60%',
      overflowY: 'auto',
      border:'none'
    },}}
    isOpen={imageForm} onRequestClose={closeImageForm}>
  <div className='bg-white h-96 ml-72 w-1/2 flex rounded-lg shadow-lg flex-col items-center gap-4'>
  <div className='flex mt-4 px-4 w-full items-center justify-between'><p className='text-lg font-semibold'>Change Profile picture</p><div onClick={closeImageForm} className='p-1 cursor-pointer hover:bg-red hover:text-white rounded-full bg-gray-100'><IoClose className='w-5 h-5' /></div></div>
  <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
    <div className='flex cursor-pointer justify-center items-center gap-8'>
<img className='h-28 w-28 rounded-full' src={profilepic ? profilepic: profile?.user.profileImagePath} alt=''/><label className="relative cursor-pointer rounded-md px-3 py-2  border border-cta text-white bg-cta border">
<button className='cursor-pointer text-sm'>Upload an Image</button>
<input type="file" accept='image/*' onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
</label></div>
<div className='flex gap-4'>
<button onClick={cancelImage} className='p-2 border border-gray-300 hover:border-none hover:bg-gray-100 rounded-md'>Cancel</button>
<button className='p-2 hover:bg-cta text-cta hover:text-white rounded-md border border-cta' onClick={updateProfilePic}>Submit</button>
</div>
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
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '60%',
      overflowY: 'auto',
      border:'none'
    },}}
    isOpen={coverForm} onRequestClose={closeCoverForm}>
  <div className='bg-white h-96 ml-72 w-1/2 flex rounded-lg shadow-lg flex-col items-center gap-4'>
  <div className='flex mt-4 px-4 w-full items-center justify-between'><p className='text-lg font-semibold'>Change Cover picture</p><div onClick={closeCoverForm} className='p-1 cursor-pointer hover:bg-red hover:text-white rounded-full bg-gray-100'><IoClose className='w-5 h-5' /></div></div>
  <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
    <div className='flex cursor-pointer justify-center items-center gap-8'>
<img className='h-28 w-28 rounded-full' src={profile?.user.bannerImagePath} alt=''/><label className="relative cursor-pointer rounded-md px-3 py-2  border border-cta text-white bg-cta border">
<button className='cursor-pointer text-sm'>Upload an Image</button>
<input type="file" accept='image/*' onChange={handlechangeCover} className="absolute inset-0 opacity-0 cursor-pointer" />
</label></div>
<div className='flex gap-4'>
<button onClick={cancelCover} className='p-2 border border-gray-300 hover:border-none hover:bg-gray-100 rounded-md'>Cancel</button>
<button className='p-2 hover:bg-cta text-cta hover:text-white rounded-md border border-cta' onClick={updatecoverPic}>Submit</button>
</div>
</div>
</div>
</Modal>
<div className='w-full flex items-center justify-center'>
<div className='flex w-5/6 flex items-center justify-center'>
  <div style={{backgroundImage:`url('https://destiny-apigateway.onrender.com${profile?.user.bannerImagePath}')`}} alt={profile?.user.bannerImagePath} className='flex flex-col relative border w-full h-96 mt-4 bg-cover bg-center  bg-no-repeat gap-4 justify-end'>
 <div onClick={openCoverForm} className='absolute right-4 top-4 flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /><span className='font-semibold'>Change cover photo</span> </div>

  <div className='absolute right-0 top-0 p-2'>
    </div>
<div className='flex px-11 items-center'>
       <div>
        <img  className='w-36 border-4 border-gray-300e h-36 rounded-full' alt='' src={`https://destiny-apigateway.onrender.com${profile?.user.profileImagePath}`} /></div> 
    <div onClick={openImageForm} className='absolute justify-end mt-20 ml-28 flex text-cta bg-cta hover:text-cta border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /></div>
        </div>
    <div className='flex flex-wrap justify-between relative md:px-11 sm:px-6 items-center md:w-full sm:w-auto h-20 bg-white'>
        <div className='flex flex-col'>
                <div>
                <p className='text-xl text-cta font-semibold'>{profile?.user.name}</p>
                </div>
                <p className='text-gray-500'>{profile?.user.country}</p>
        </div>
        {/* <NavLink to='/profession'><span className='cursor-pointer text-lg hover:text-cta font-semibold'>Profession</span></NavLink> */}
        <div className='flex gap-12'>
        {menu.map((items)=>(
                <div key={items.id}>
              <NavLink to={{ pathname: items.path, state: { profile } }} className={`text-lg hover:text-cta font-semibold ${isActive(items.path) ? 'active-link' : ''}`}  ><p className='text-lg hover:text-cta'>{items.name}</p></NavLink>
                </div> 
                    ))}
        </div>
        <div className='flex items-center gap-6 font-semibold'>
        {/* <div className='flex items-center flex-col'>
        <span>Posts</span>
        <span>{profile.posts}</span>
        </div> */} 
        <Link to={`/following/${userID}`}>
        <div className='flex items-center flex-col'>
        <span>Following</span>
        <span>{profile?.following?.count}</span>
        </div></Link>
        <Link to={`/followers/${userID}`}>
        <div className='flex items-center flex-col'>
        <span>Followers</span>
        <span>{profile?.followers?.count}</span>
        </div></Link>
        </div>
        <div className='p-2 bg-gray-50 cursor-pointer rounded-full'><Icon icon="system-uicons:menu-vertical" width="1.2em" height="1.2em"  /></div>
    </div>
    
  </div>
  </div>
  </div>

</div>
  )
}

export default ProfileUser;





