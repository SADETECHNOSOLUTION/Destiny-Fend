import React,{useState,useEffect, useCallback} from 'react';
import { Icon } from '@iconify/react';
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const Notifications = () => {
  const userId = useSelector((state)=>state.auth.userId)
  const [notification,setNotifications] = useState();

  const fetchNotifications = useCallback(async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
  
        const followApi = await fetch(`${process.env.REACT_APP_API_URL}/follows/notifications/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
  
        const requestApi = await fetch(`${process.env.REACT_APP_API_URL}/friend-requests/notifications/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
  
        const likeApi = await fetch(`${process.env.REACT_APP_API_URL}/likes/notification/${userId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      const commentApi = await fetch(` ${process.env.REACT_APP_API_URL}/comments/notification-comment/post-reply/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
        const followData = await followApi.json();
        const requestData = await requestApi.json();
        const likeData = await likeApi.json();
        const commentData = await commentApi.json();
        // Log the responses to check their structure
        console.log('Follow Notifications:', followData);
        console.log('Friend Request Notifications:', requestData);
  
        const combinedNotifications = [
            ...(Array.isArray(followData.notification) ? followData.notification : []),
            ...(Array.isArray(requestData.notification) ? requestData.notification : []),
            ...(Array.isArray(likeData.notification) ? likeData.notification : []),
            ...(Array.isArray(commentData.notification) ? commentData.notification : [])
        ];
  
        setNotifications(combinedNotifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
  },[userId]);
  
  const deleteNotifications = async (id,type)=>{
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notification/${id}/${type}`,{
        method: 'DELETE',
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.ok){
        console.log(`deleted ${type}, ${id}`)
        fetchNotifications()
      }
      }
    catch(error){
     console.error('could not delete',error)
    }
  }
  
  useEffect(() => {
    fetchNotifications()
  },[fetchNotifications])
  
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
  <div className='flex mt-10 px-6 drop bg-white shadow-lg  rounded-md h-auto w-5/6 flex-col'>
    <div className='flex gap-2 items-center py-4 border-b border-gray-170 '>
      <Icon icon="ion:notifications-outline" width="1.4em" height="1.4em" />
      <span className='font-semibold'>All Notifications</span>
    </div>
    <div>
    {notification?.map((notify) =>{
          const notifytime = () => {
            const pastDate = moment(notify.createdAt);
            const now = moment();
            const diffInDays = now.diff(pastDate, 'days');
            const diffInHours = now.diff(pastDate, 'hours');
            const diffInMinutes = now.diff(pastDate, 'minutes');
            let displayText = '';
      
            if (diffInDays > 0) {
              displayText = `${diffInDays}d${diffInDays > 1 ? ' ago' : ''}`;
            } else if (diffInHours > 0) {
              displayText = `${diffInHours}h${diffInHours > 1 ? ' ago' : ''}`;
            } else if (diffInMinutes > 0) {
              displayText = `${diffInMinutes}m${diffInMinutes > 1 ? ' ago' : ''}`;
            } else {
              displayText = 'Just now';
            }
            return displayText;
          };
      
          const time = notifytime();
     return(
      <>
<div key={notify.id} className='flex cursor-pointer text-sm hover:bg-gray-50 notification-item border-b justify-between border-gray-170 py-4 items-center'>
<NavLink to={`${notify.postId? `/post/${userId}/${notify.postId}`:``}`}>    <div className='flex items-center gap-3'>
          <div>
            <img className='h-9 w-9 rounded-full' alt='' src={`${process.env.REACT_APP_API_URL}${notify.profileImagePath}`} />
          </div>
          <div className='flex flex-col'>
            <p>
              <span className=' cursor-pointer hover:text-cta'>{notify.name}</span> {notify.message}
            </p>
            <div className='flex items-center'>
              <div></div>
              <div className='text-sm'>{time}</div>
            </div>
          </div>
        </div></NavLink>
        <div className='flex items-center gap-4'>
          {/* <div><img className='w-14 h-14' alt='' src={notify.target} /></div> */}
          <div onClick={()=>deleteNotifications(notify.id,notify.type)} className='p-2 cursor-pointer rounded-full hover:bg-gray-400 hover:text-white 500-duration ease-in-ease-out'>
            <Icon icon="carbon:close" width="1.2em" height="1.2em" style={{ color: 'gray-200' }} />
          </div>
        </div>
      </div>
      </>
    )
    } )}
    </div>
  </div>
</div>
</>

  )
}

export default Notifications;
