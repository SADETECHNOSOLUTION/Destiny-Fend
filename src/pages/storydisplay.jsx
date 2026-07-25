import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router';
import InputEmoji from 'react-input-emoji';
import Modal from 'react-modal';

const StoryPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state)=>state.auth.userId)
  const [liked, setLiked] = useState(false);
  const [animationPostId, setAnimationPostId] = useState(null);
  const [likeCount,setLikeCount] = useState({});
  const [statusReply,setStatusReply] = useState('')
  const [deletePopup,setDeletePopup] = useState(false)
  const [deleteid,setdeleteId] = useState('')

  const openDeletePopup = (id)=>{
    setDeletePopup(true)
    setdeleteId(id)
  }

  const closeDelete = ()=>{
    setDeletePopup(false)
    setdeleteId('')
  }

  const selectedStory = useSelector((state) => state.story.selectedStory);
  const [story, setStory] = useState([]);
  const [users,setUsers] = useState()
  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
    1600: { items: 1 },
  };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`https://destiny-apigateway.onrender.com/api/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json()
        setUsers(data);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-cta text-cta hover:text-white items-center justify-center bg-gray-100 rounded-full right-4 top-[28rem]"
      onClick={onClick}
      disabled={isDisabled}>
    <Icon icon="grommet-icons:next" />    
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-cta hover:text-white text-cta bg-gray-100 rounded-full left-4 top-[28rem]"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="ic:twotone-arrow-back-ios" />
    </button>
  );

  const handleStoryLike = async (statusId) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`https://destiny-apigateway.onrender.com/likes/toggle-status?statusId=${statusId}&userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });

      if (response.ok) {
        setLiked(prev => ({
          ...prev,
          [statusId]: !prev[statusId]
        }));
        setAnimationPostId(statusId);
        // Re-fetch like count or update locally
        const countResponse = await fetch(`https://destiny-apigateway.onrender.com/likes/status/${statusId}/count`,{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        const countData = await countResponse.json();
        setLikeCount(prev => ({
          ...prev,
          [statusId]: countData
        }));
        setTimeout(() => setAnimationPostId(null), 300); // Reset animation class
      } else {
        console.log('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleComment = async (e,statusId) => {

    e.preventDefault();
    if (!statusReply.trim()) {
      console.log('Comment cannot be empty.');
      return;
    }
    // const parentComment = displayComments[selectedPostId]?.find(comment => comment.id === replyId);
    const jsonData = {
     statusId:statusId,
      userId: userId,
      textContent: statusReply
    };
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`https://destiny-apigateway.onrender.com/comments/comment-status?statusId=${statusId}&userId=${userId}&textContent=${statusReply}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData),
      });
  
      if (response.ok) {
       setStatusReply('')
      } else {
        console.log('An error occurred. Please try again later.');

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchAggregateData = useCallback(async (statusId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://destiny-apigateway.onrender.com/aggregate-media/status/${statusId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Extract like and comment counts
      const likeCount = data.likeStatusDTO.length; // Number of likes

      // Check if the current user has liked this post
      const userHasLiked = data.likeStatusDTO.some(like => like.userId === userId);

      // Update the state with the counts and like status
      setLikeCount((prev) => ({
        ...prev,
        [statusId]: likeCount,
      }));
      setLiked((prev) => ({
        ...prev,
        [statusId]: userHasLiked,
      }));
    } catch (error) {
      console.error('Error fetching aggregate data:', error);
    }
  },[userId]);

  const fetchStory = useCallback( async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://destiny-apigateway.onrender.com/statuses/user/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStory(data);
        // Fetch aggregate data for each story after fetching the list of stories
        data.forEach((post) => {
          fetchAggregateData(post.id); // Make an API call for each story ID
        });
        console.log(data,'data')
      } else {
        console.error('Failed to fetch stories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  },[fetchAggregateData]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteStory = async(storyId)=>{
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`https://destiny-apigateway.onrender.com/statuses/delete/${userId}/${deleteid}`,{
        method:'DELETE',
        headers:{
        'Authorization':`Bearer ${token}`
        }
      })
      if(response.ok){
        console.log('')
        navigate('/newsfeed')
        setdeleteId('')
      }
      else{
        console.log('Failed to delete story')
      }
    }
    catch(error){
      console.error('Error in deleting', error)
    }
  }

  const filteredStories = story?.filter(item => item.id !== selectedStory?.id);

 
  const combinedStories = selectedStory ? [selectedStory, ...filteredStories] : filteredStories;

  useEffect(() => {
    if (story.length > 0) {
      story.forEach(post => {
        if (post.postId) {
          // Fetch comments for each post
             // Fetch likes for each post
          // Fetch like counts for each post
        }
      });
    }
  }, [story]);
  
  console.log(story);
  console.log(selectedStory);


  return( <div className="min-h-screen flex justify-center bg-black">
  <div className="relative w-1/2 bg- px-4 shadow-lg rounded-md">
    <AliceCarousel
      mouseTracking
      touchTracking={false}
      responsive={responsive}
      autoPlay
      disableDotsControls={true}
      infinite
      autoPlayInterval={6000}
      renderNextButton={renderNextButton}
      renderPrevButton={renderBackButton}
    >
      {combinedStories?.map((item) => {
        const currentLikeCount = likeCount[item.id] || 0;
        const calculateTimeDifference = () => {
          const pastDate = moment(item.createdAt);
          const now = moment();
          const diffInDays = now.diff(pastDate, 'days');
          const diffInHours = now.diff(pastDate, 'hours');
          const diffInMinutes = now.diff(pastDate, 'minutes');
          let displayText = '';
        
          if (diffInDays > 0) {
            displayText =` ${diffInDays}d${diffInDays > 1 ? ' ago' : ''}`;
          } else if (diffInHours > 0) {
            displayText = `${diffInHours}h${diffInHours > 1 ? ' ago' : ''}`;
          } else if (diffInMinutes > 0) {
            displayText = `${diffInMinutes}m${diffInMinutes > 1 ? ' ago' : ''}`;
          } else {
            displayText = 'Just now';
          }
        
          return displayText;
        };
        
        const timeDifference = calculateTimeDifference();

        return (
          <div key={item.id} className="relative flex border border-0 h-screen">
            {item.type === 'IMAGE' ? (
              <img src={`https://destiny-apigateway.onrender.com${item.content}`} className=" opacity-90  h-[59rem]" alt={`https://destiny-apigateway.onrender.com${item.content}`} />
            ) : (
              <ReactPlayer url={`https://destiny-apigateway.onrender.com${item.content}`} playing={true} controls={false} width="100%" height="100%" loop={true} />
            )}
            
    { parseInt(userId) === item.userId &&        <div className="absolute bottom-4 left-4 flex items-center gap-4">
              <div className="flex items-center justify-center">
                <Icon className="text-pink w-6 h-6" icon="material-symbols-light:favorite" />
                <span className='text-white'>{currentLikeCount}</span>
              </div>
            </div>}

            {parseInt(userId) === item.userId && (
              <div className="flex flex-col items-center relative">
                {/* <Icon onClick={handleOptions} className="absolute bg-white rounded-full p-4 text-black top-2 right-2 w-4 h-4 cursor-pointer" icon="iconamoon:menu-kebab-vertical-bold" /> */}
      
                  <div onClick={() => openDeletePopup(item.id)} className="">
                    <span className="absolute top-6 right-2 flex items-center justify-center cursor-pointer rounded-full shadow-md bg-white w-9 h-9 hover:text-red">
                      <Icon className="w-5 h-5" icon="mdi:delete-outline" />
                    </span>
                  </div>
        
              </div>
            )}
{users?.map(user=>user.id === item.userId ? 
                <div className='top-4 flex items-center gap-2 p-2 absolute'><img className='w-11 h-11 rounded-full border-2 border-cta' src={`https://destiny-apigateway.onrender.com${item.profileImagePath}`} alt=''/><div className='flex flex-col'><span className='text-white font-semibold  text-sm'>{user.name}</span><span className='text-white text-sm font-semibold'>{timeDifference}</span></div></div>
                :null
    )}
            {parseInt(userId) !== item.userId ? (
              <div className="absolute bottom-4 px-4 w-full flex items-center gap-1">
                <div className="w-11 h-10 flex items-center justify-center border bg-white border-gray-500 rounded-full">
                  <Icon
                    onClick={() => {
                      handleStoryLike(item.id);
                    }}
                    className={`cursor-pointer h-7 w-7 ${liked[item.id] ? 'text-pink' : 'text-gray-700'} ${animationPostId === item.id ? 'like-animate' : ''}`}
                    icon={liked[item.id] ? 'material-symbols-light:favorite' : 'material-symbols-light:favorite-outline'}
                    width="1.2em"
                    height="1.2em"
                  />
                </div>
                <InputEmoji value={statusReply} onChange={(text) => setStatusReply(text)} placeholder="Reply to the story.." />
                <Icon
                  onClick={(e) => {
                    handleComment(e, item.id);
                  }}
                  className={`text-cta cursor-pointer ${!statusReply.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  icon="majesticons:send"
                  width="2.5em"
                  height="2.6em"
                  strokeWidth="2"
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </AliceCarousel>
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
          isOpen={deletePopup} onRequestClose={closeDelete}>
        <div className='relative bg-white h-36 ml-72 w-1/3 rounded-md flex rounded-lg shadow-lg flex-col items-center justify-center gap-4'>
        <span className='text-lg font-semibold'>Are you sure you want to delete</span>
        <div className='flex w-full justify-center gap-4'><button onClick={closeDelete} className='w-16 px-2 rounded-md hover:bg-gray-100 bg-gray-200 py-1'>Cancel</button><button onClick={deleteStory} className='w-16 px-2 bg-red text-white hover:opacity-85 rounded-md py-1'>Yes</button></div>
        <Icon onClick={closeDelete} className='absolute cursor-pointer top-2 right-2' icon="mdi:remove" />
      </div>
   </Modal>
</div>
)
};

export default StoryPage;
