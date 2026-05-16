import React, { useState,useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector,useDispatch } from "react-redux";
import { addReels } from "../slices/videoslice";
import Modal from 'react-modal'
import ReactPlayer from "react-player";
import InputEmoji from "react-input-emoji";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

const Reels=()=>{
    const dispatch = useDispatch()
    const [file,setFile] = useState()
    const [selected,setSelected] = useState(false)
    const reels = useSelector((state)=>state.video.reels)
    const [caption,setCaption] = useState('')
    const userId = useSelector((state)=>state.auth.userId)
    const [reel,setReel] = useState()

    const closeReel = ()=>{
        setSelected(false)
    }

    const handleReelsChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            const fileObject = { name: selectedFile };
                setFile(fileObject.name.name); 
                dispatch(addReels(fileObject))
                console.log(file)
                setSelected(true)
        }
    };

    const PostReels =async ()=>{
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', reels?.name);
        formData.append('caption', caption);
        formData.append('duration', 24);
        formData.append('privacy', 'PUBLIC');
        formData.append('userId', userId);
        try{
             const response = await fetch(`${process.env.REACT_APP_API_URL}/reels/addReel`,{
             method:'POST',
             body:formData,
             headers:{
                'Authorization':`Bearer ${token}`,
             }
            })
            if(response.ok){
                dispatch(addReels(null))
                closeReel()
                setSelected(false)
                fetchReels()
            }
            else{
              console.log('failed to post')
            }  
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchReels = async () => {
        const token = localStorage.getItem('token'); // Fixed typo
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/reels/getAll/reel`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Added space after "bearer"
            }
          });
          if (response.ok) {
            const data = await response.json();
            setReel(data);
            console.log(data,'data')
          } else {
            console.error('Failed to fetch stories:', response.status);
          }
        } catch (error) {
          console.error('Error fetching stories:', error);
        }
      };

      useEffect(() => {
        fetchReels();
      }, []);

      // const fetchUsers = async () => {
      //   const token = localStorage.getItem('token')
      //   try {
      //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/users/descending`, {
      //       method: 'GET',
      //       headers: {
      //         'Authorization': `Bearer ${token}`,
      //       },
      //     });
      //     const usersData = response.data?.map(user => ({
      //       id: user.id,
      //       UserName: user.name,
      //     }));
      //     setUsers(usersData);
      //   } catch (error) {
      //     console.error("Error fetching user data:", error);
      //   }
      // };
    
      // useEffect(() => {
      //   fetchUsers();
      // }, []);

      const renderBackButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 hover:bg-cta hover:text-white text-cta bg-gray-100 rounded-full left-0 bottom-28"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );
    const renderNextButton = ({ isDisabled, onClick }) => (
      <button
          className="absolute p-2 hover:bg-cta hover:text-white text-cta bg-gray-100 rounded-full right-0 bottom-28"
          onClick={onClick}
          disabled={isDisabled}
      >
 <Icon icon="grommet-icons:next" />  </button>
  );
      const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 4 },
        1600: { items: 4 },
      };

      const showNavButtons = reel?.length > 3;
    
return(
    <>
    <div className="w-full relative px-2 py-8 flex rounded-md bg-white flex-col items-center justify-center gap-4 shadow-lg">
        <div className="h-96 w-full flex gap-2">
          <span className="absolute font-semibold top-0 py-4 left-6">Reels</span>
            <button className="text-cta font-semibold cursor-pointer py-4 absolute top-0 right-4">+Add your reels <input onChange={e=>{handleReelsChange(e)}} className="absolute inset-0 cursor-pointer opacity-0" accept="video/*" type="file" /></button>
            {/* <div style={{backgroundImage:"url(coverimg.jpg)"}} className="relative contain-r inline-block cursor-pointer rounded-lg overflow-hidden flex flex-col w-44 h-[22rem]">
            <span className="rounded-full border border-white text-white flex items-center justify-center absolute transition-transform duration-300 hover:scale-110 ml-4 mt-4 w-9 h-9" ><Icon className="w-6 h-6" icon="mingcute:add-line" /></span>
            <div className="absolute w-full text-center child-r p-2 bottom-0">
            <span className="text-white text-lg font-semibold">Upload  reels</span>
            </div>
            <input onChange={e=>{handleReelsChange(e)}} className="absolute inset-0 cursor-pointer opacity-0" accept="video/*" type="file" />
            </div> */}
            {reel?             <AliceCarousel          
          mouseTracking
          touchTracking={false}
          responsive={responsive}
          disableDotsControls={true}
          renderPrevButton={showNavButtons ? renderBackButton : null}
          renderNextButton={showNavButtons ? renderNextButton : null}
   >

        {reel?.map((reel)=>(
                <NavLink key={reel.id} to={`/reels/${reel.id}/reel`}><div  className="relative contain-r w-44 rounded-md group inline-block mt-8 cursor-pointer h-[24rem] overflow-hidden">
                        <div key={reel.id} style={{backgroundImage:`url(${reel.story})`}} className=" group-hover:scale-105 transition-transform duration-300 inline-block cursor-pointer rounded-lg  w-56 h-[22rem]">
                        <ReactPlayer 
        url={`${process.env.REACT_APP_API_URL}${reel.content}`}  // Replace with your video URL
        controls={false} // Hide controls if desired
        width='300%'
        height='100%'
 />
               
      <div className="absolute left-8 top-4">
        <div className="flex items-center text-white font-semibold gap-2">
        <img className="w-6 h-6 rounded-full" src={`${process.env.REACT_APP_API_URL}${reel.profileImagePath}`} alt='' />
          <p key={reel.id} className='text-xs'><span>{reel.name}</span></p>
    </div>

      </div>
                        </div>
                </div></NavLink>
        ))}
        </AliceCarousel> : <span>No Recent reels</span>}

        </div> 
        <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -20%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={selected} onRequestClose={closeReel}>
      <div className='relative w-1/2 bg-white h-[37rem] rounded-md flex rounded-lg p-2 shadow-lg flex-col items-center justify-center'>
      <InputEmoji className='mt-6'
                      value={caption}
                      onChange={(text) => setCaption(text)}
                      placeholder="Write something..."
                    />
      <ReactPlayer
              url={reels?.name.name}  // Replace with your video URL
              playing={true}  // Autoplay the video
              controls={false} // Hide controls if desired
              width='100%'
              height='80%'
              loop={true} 
            />
            <button onClick={PostReels} className="absolute rounded-md py-2 px-4 bg-cta text-white right-4 bottom-4">Post</button>
    </div>
 </Modal>
    </div>
    </>
)
}

export default Reels

