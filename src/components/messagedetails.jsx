import React, { useEffect, useState, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Icon } from "@iconify/react/dist/iconify.js";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router";
import Navbar from "./navbar";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

const MessageDetails = () => {
   const userId = useSelector((state) => state.auth.userId);
   const { messagesId } = useParams();
   const stompClientRef = useRef(null);
   const [chat, setChat] = useState({ messages: [] });
   const [messageInput, setMessageInput] = useState('');
   const [users, setUsers] = useState([]);
   const [replyToMessageId, setReplyToMessageId] = useState(null);
   const [messages,setMessage] = useState()
   const [hoverMsg,setHoverMsg] = useState(null);
   const [showDeleteOption, setShowDeleteOption] = useState(false);
   const [deletePopup,setDeletePopup] = useState(false);
   const [deleteId,setDeleteId] = useState()
   
   
   const openDeletePopup=(id)=>{
      setDeletePopup(true)
      setDeleteId(id)
   }

   const closeDeletePopup=()=>{
      setDeletePopup(false)
   }

   const handleMenuClick = () => {
       setShowDeleteOption(prev => !prev);
   };

   const location = useLocation();
   const fetchUsers = async () => {
      const token = localStorage.getItem('token')
      try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
         const data = await response.json();
         setUsers(data);
      } catch (error) {
         console.error("Error fetching user data:", error);
      }
   };
   const fetchMessage = useCallback(async () => {
    setChat({ messages: [] }); // Reset chat state initially
    const token = localStorage.getItem('token')
    try {
       const response = await fetch(`${process.env.REACT_APP_API_URL}/web-socket/conversation?participantOneId=${userId}&participantTwoId=${messagesId}`, {
          method: 'GET',
          headers:{
            'Authorization':`Bearer ${token}`
          }
       });
       const data = await response.json();
 
       if (response.ok) {
          // Update chat state with fetched messages
          setChat(data);
       }
    } catch (error) {
       console.error(error);
    }
 },[messagesId,userId]);
 
   useEffect(() => {
      fetchUsers();
      fetchMessage();
   }, [fetchMessage]);

   useEffect(() => {
      fetchMessage();
      fetchAllMessage();
   }, [messagesId,fetchMessage]);

   useEffect(() => {
    const socket = new SockJS('http://localhost:8091/ws');
    const client = new Client({
       webSocketFactory: () => socket,
       onConnect: (frame) => {
          console.log('Connected: ' + frame);
          client.subscribe('/topic/messages', (messageOutput) => {
             fetchMessage(); // Fetch updated messages
          });
       },
       onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
       },
    });
 
    client.activate();
    stompClientRef.current = client;
 
    return () => {
       if (client) {
          client.deactivate();
       }
    };
 }, [messagesId,fetchMessage]); // Depend on messagesId to reset subscription if it changes
 
 const fetchAllMessage = async () => {
   const token = localStorage.getItem('token')
   setChat({ messages: [] }); // Reset chat state initially
   try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/web-socket/getAll`, {
         method: 'GET',
         headers:{
            'Authorization':`Bearer ${token}`
         }
      });
      const data = await response.json();
      if (response.ok) {
         // Update chat state with fetched messages
         setMessage(data);
      }
   } catch (error) {
      console.error(error);
   }
};

console.log(messages)

 const sendMessage = async () => {
  const senderId = userId;
  const recipientId = Number(messagesId);
  if (messageInput && stompClientRef.current && stompClientRef.current.connected) {
     const message = {
        senderId,
        recipientId,
        content: messageInput,
        replyTo: replyToMessageId, // Add this line
     };

     stompClientRef.current.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
     });

     console.log(JSON.stringify(message));
     setMessageInput(''); // Clear input after sending
     setReplyToMessageId(null); // Reset reply state
     console.log(message)
     await fetchMessage();
     await fetchAllMessage();
  }
};

const deleteMessageForSelf = async (messageId) => {
   const token = localStorage.getItem('token')
   try {
     const response = await axios.delete(`${process.env.REACT_APP_API_URL}/web-socket/delete-for-self/${messageId}`, {
       params: { userId },
       headers:{
         'Authorization': `Bearer ${token}`
      }
     });
     if(response.status === 200){
      fetchMessage();
      closeDeletePopup();
    }
    else{
      console.log('error'); 
    }
 // Message deleted for everyone
   } catch (error) {
     console.error("Error deleting message for self", error);
   }
 };

 const deleteMessageForEveryone = async (messageId) => {
   const token = localStorage.getItem('token')
   try {
     const response = await axios.delete(`${process.env.REACT_APP_API_URL}/web-socket/delete-for-everyone/${messageId}`, {
      params: { userId },
      headers:{
         'Authorization': `Bearer ${token}`
      }
    });
    if(response.status === 200){
      fetchMessage();
      closeDeletePopup();
    }
    else{
      console.log('error'); 
    }
 // Message deleted for everyone
   } catch (error) {
     console.error("Error deleting message for everyone", error);
   }
 };

const message = users.find(user => user.id === parseInt(messagesId));
   return (
      <div className="w-full h-auto flex flex-col ">
         <Navbar />
         <div className="flex h-[56rem]">
            <div className="w-1/3 overflow-scroll flex flex-col h-inherit shadow-lg h-full">
               <div className="px-4 flex flex-col gap-2">
                  <div className="flex sticky top-0 bg-white py-4 items-center justify-between">
                     <span className="font-semibold ">Chats</span>
                     <Icon className="w-5 h-5" icon="bx:edit" />
                  </div>
                  <div className="flex sticky top-14 bg-white items-center">
                     <input className="w-full px-2 rounded-md h-11 border-none outline-none bg-gray-100" type="text" placeholder="Search Friend" />
                     <div className="w-9 h-11 flex items-center justify-center bg-gray-100"><Icon icon="ooui:search" /></div>
                  </div>
                  <div className="flex w-auto flex-col">
                  {users.filter(user => user.id !== parseInt(userId)).map((item) => {
    // Ensure chat is an array
    const userConversations = Array.isArray(messages) ? messages.map(conversation => {
        const { messages, participantOneId, participantTwoId } = conversation;
        // Get the last message from the messages array
        const lastMessage = messages[messages.length - 1]; 

        // Check if the last message exists
        if (lastMessage) {
            // Determine if the current user or the item is one of the participants
            const isParticipantOne = participantOneId === parseInt(userId) || participantOneId === item.id;
            const isParticipantTwo = participantTwoId === parseInt(userId) || participantTwoId === item.id;
            // If either participant is involved, return the last message
            if (isParticipantOne && isParticipantTwo) {
                return {
                    conversationId: conversation.id,
                    lastMessage: lastMessage.content,
                    sentAt: lastMessage.sentAt,
                };
            }
        }
        return null; // Handle cases where no relevant message
    }).filter(message => message !== null) : []; // Filter out null values

    // Find the last message for the current user
    const userLastMessage = userConversations.length > 0 ? userConversations[0].lastMessage : "No messages";

    return (
        <Link to={`/messages/${item.id}`}><div key={item.id} className="text-sm text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                <div className={`h-24 cursor-pointer border-gray-300 border-b rounded-md flex items-center px-4 ${location.pathname.includes(item.id) ? "active" : ""}`}
       style={location.pathname.includes(item.id) ? { backgroundColor: '#5CBE8F', color: '#fff' } : null}>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 w-full items-center'>
                      
                            <img className='rounded-full w-11 h-11' alt='alt' src={`${process.env.REACT_APP_API_URL}${item?.profileImagePath}`} />
                        <div className='flex w-full flex-col'>
                            <div className=' text-lg w-max'>{item.name}</div>
                            <div className='flex w-full items-center justify-between'>
                                <div className={`text-gray-400 truncate-text text-sm ${location.pathname.includes(item.id) ? "active text-white" : ""}`}>{userLastMessage}</div>
                                <div className='text-gray-400 text-xs'>{item.time}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></Link>
    );
})}

                  </div>
               </div>
            </div>
            <div className="flex flex-col w-full">
               <div className="flex items-center bg-cta text-white px-7 justify-between h-16">
                  <div className="flex items-center gap-2">
                     <img className="w-11 h-11 rounded-full" src={`${process.env.REACT_APP_API_URL}${message?.profileImagePath}`} alt={message?.profileImagePath} />
                     <span className="font-semibold">{message?.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Icon className="w-5 h-5" icon="ion:call-sharp" />
                     <Icon className="w-6 h-6" icon="mdi:video" />
                  </div>
               </div>
               <hr />
               <div className="flex h-full">
               <div className="w-5/6 max-h-[52rem] flex flex-col relative shadow-lg">
    <div className="flex-grow overflow-y-auto p-4">

        {chat.messages && chat.messages.length > 0 ? (
            chat.messages.map((msg) => (
               <div key={msg.id}>
               <div
                 onMouseEnter={() => setHoverMsg(msg.id)}
                 onMouseLeave={() => {
                   setHoverMsg(null);
                   setShowDeleteOption(false); // Hide delete option on mouse leave
                 }}
                 className={`w-full gap-1 ${msg.senderId === parseInt(userId) ? 'flex justify-end' : 'flex justify-start'} h-auto mb-2 relative`} // Ensure parent div is relative
               >
<div className={`w-full ${msg.senderId === parseInt(userId) ? 'flex justify-end' : 'flex justify-start'} h-auto`}>
  {/* Show the message if it's not deleted by the sender or if it's not sent by the user */}
  {(msg.senderId !== parseInt(userId) || msg.deletedBySender === false) && (
    <div 
      className={`rounded-lg cursor-pointer h-max w-auto max-w-48 relative 
        ${msg.content.startsWith('/uploads') ? '' : (msg.senderId === parseInt(userId) ? 'bg-cta text-white' : 'bg-gray-100')}
      `}
    >
      {msg.content.startsWith('/uploads') ? (
        // If the message content starts with "/uploads", render a video (Reels)
        <Link key={msg.id} to={`/reels/${msg.mediaId}`}>
          <div className="relative contain-r w-44 rounded-md group inline-block cursor-pointer h-[16rem] overflow-hidden">
            <div key={msg.id} style={{backgroundImage:`url(${msg.content})`}} className="inline-block cursor-pointer rounded-lg w-56 h-[16rem]">
              <ReactPlayer 
                url={`${process.env.REACT_APP_API_URL}${msg.content}`}  // Replace with your video URL
                controls={false} // Hide controls if desired
                width='200%'
                height='100%'
              />
            </div>
          </div>
        </Link>
      ) : (
        // Otherwise, render the message content as text
        <div className='p-2'>
        <span className="break-words" onClick={() => setReplyToMessageId(msg.id)}>{msg.content}</span>
        </div>
      )}

      {hoverMsg === msg.id && (
        <div className="flex items-center absolute">
          <Icon
            onClick={handleMenuClick} // Toggle delete option on menu icon click
            className={`absolute text-cta w-9 h-9 ${msg.senderId === parseInt(userId) ? 'right-12' : 'left-56'}`} // 2rem gap from the right or left of the message (2rem = 32px)
            icon="majesticons:more-menu"
          />
          <Icon
            onClick={() => setReplyToMessageId(msg.id)}
            icon="mdi:reply"
            className={`absolute text-cta w-6 h-6 ${msg.senderId === parseInt(userId) ? 'right-20' : 'left-48'}`} // 2rem gap from the right or left of the message and between icons
          />
          
          {showDeleteOption && (
            <div className={`absolute ${msg.senderId === parseInt(userId) ? 'right-8 mt-20' : 'left-48 mt-20'} bg-white border rounded p-2`}>
              {msg.senderId === userId ? (
                <button className="text-sm text-black" onClick={() => openDeletePopup(msg.id)}>
                  Delete
                </button>
              ) : (
                <button className="text-sm text-black" onClick={() => openDeletePopup(msg.id)}>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )}
</div>

{msg.replyTo && (
                   <div className="ml-4 mt-2">
                     <span className="text-gray-500">Replying to:</span>
                     <div className={`rounded-lg p-2 ${msg.senderId === userId ? 'bg-cta text-white' : 'bg-gray-100'}`}>
                       {chat.messages.find(reply => reply.id === msg.replyTo)?.content}
                     </div>
                   </div>
                 )}
               </div>
             </div>
             
            ))
        ) : (
            <div className="text-gray-500 text-center py-4">''.</div>
        )}
    </div>
    <div>
  {replyToMessageId && (
    <div className="bg-cta bg-opacity-50 p-2 rounded-md mb-4">
      <span>Replying to:</span>
      <span>
        {
          chat.messages.find(msg => msg.id === replyToMessageId)?.content ||
          "Message not found"
        }
      </span>
    </div>
  )}
  <div className="bg-white flex items-center">
    <InputEmoji
      value={messageInput}
      onChange={(text) => setMessageInput(text)}
      placeholder="Type your message..."
      className="border h-9 rounded-md border-gray-400 flex-1 mr-2"
    />
    <Icon className="text-cta cursor-pointer" icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth="2" onClick={sendMessage} />
  </div>
</div>
</div>

                  <div className="w-1/2 h-full relative flex flex-col shadow-lg">
                     <div>
                        <div key={message?.id}>
                           <div className="flex flex-col items-center justify-center gap-2 w-full h-56">
                              <img className="w-24 h-24 rounded-full" src={`${process.env.REACT_APP_API_URL}${message?.profileImagePath}`} alt="" />
                              <p className="text-lg font-semibold text-highlight">{message?.name}</p>
                           </div>
                           <div className="px-6 flex flex-col gap-4">
                              <div className="flex flex-col gap-2">
                                 <p className="text-lg font-semibold">About</p>
                                 <div className="border h-48 p-2 rounded-md border-gray-300">
                                    {message?.aboutMe}
                                 </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <p className="text-lg font-semibold">Blood Group</p>
                                 <p>{message?.bloodGroup}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <p className="text-lg font-semibold">Phone</p>
                                 <p>{message?.phno}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <p className="text-lg font-semibold">Email</p>
                                 <p>{message?.email}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                 <p className="text-lg font-semibold">Place</p>
                                 <p>{message?.country}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            
            </div>
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
          transform: 'translate(-10%, -10%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={deletePopup} onRequestClose={closeDeletePopup}>
      <div className={`relative w-full bg-white rounded-m flex rounded-lg shadow-lg flex-col`}>
 <div className=' bg-white p-4 w-full flex flex-col gap-4'>
 <button onClick={()=>{deleteMessageForEveryone(deleteId)}} className='bg-cta p-2 cursor-pointer w-full text-white  text-md font-semibold rounded-md'>
        Delete for everyone
      </button>
 <button onClick={()=>{deleteMessageForSelf(deleteId)}} className='bg-cta p-2 cursor-pointer w-full text-white  text-md font-semibold rounded-md'>
        Delete for myself
      </button>
      </div>
    </div>
 </Modal>
      </div>
   );
};

export default MessageDetails;
