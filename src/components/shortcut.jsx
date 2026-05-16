import React, { useState } from 'react';
import { logout } from '../slices/authslice';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Shortcut = () => {
  const userId = useSelector((state) => state.auth.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shortcut, showShortcut] = useState(false);
  const [hover, setHover] = useState(null);
  // Handle logout logic
  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action
    navigate('/');  // Redirect to home (or login page)
  };

  // Shortcut options
  const options = [
    {
      id: 1,
      name: "Profile",
      icon: <Icon className='optionicon' icon="gravity-ui:person" />,
      path: `/user/${userId}`,
    },
    {
      id: 2,
      name: "Chat",
      icon: <Icon className='optionicon' icon="mingcute:message-4-line" />,
      path: '/messages',
    },
    // {
    //   id: 3,
    //   name: "My Pages",
    //   icon: <Icon className='optionicon' icon="icon-park-solid:web-page" />,
    //   path: '/page',
    // },
    {
      id: 4,
      name: "Friends",
      icon: <Icon className='optionicon' icon="icon-park-outline:peoples-two" />,
      path: `/friendsview/${userId}`,
    },
    {
      id: 5,
      name: "Photos",
      icon: <Icon className='optionicon' icon="ph:image-duotone" />,
      path: `/photosview/${userId}`,
    },
    {
      id: 6,
      name: "Videos",
      icon: <Icon className='optionicon' icon="bxs:videos" />,
      path: `/videosview/${userId}`,
    },
    {
      id: 7,
      name: "Notifications",
      icon: <Icon className='optionicon' icon="mi:notification" />,
      path: `/notifications/${userId}`,
    },
    // {
    //   id: 8,
    //   name: "Saved",
    //   icon: <Icon icon="foundation:book-bookmark" />,
    //   path: '/saved',
    // },
    {
      id: 9,
      name: "Logout",
      icon: <Icon className='optionicon' icon="fe:logout" />,
      onClick: handleLogout,  // Attach logout function here
    },
  ];

  const handleHover = (id) => {
    setHover(id);
  };

  const closeHover = () => {
    setHover(null);
  };

  const handleShortcut = () => {
    showShortcut(!shortcut);
  };

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };

  return (
    <div className='fixed flex flex-col gap-4 top-20 left-0 h-auto'>
      <div onClick={handleShortcut} className='w-11 h-11 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
        <Icon className='w-6 h-6 text-white' icon="mynaui:menu" />
      </div>
      {shortcut && (
        <div className='flex flex-col gap-4 left-0 h-auto'>
          {options.map((option) => (
            option.name === "Logout" ? (
              <div
                key={option.id}
                onClick={option.onClick}  // Trigger the handleLogout function directly
                onMouseEnter={() => handleHover(option.id)}
                onMouseLeave={closeHover}
                className={`relative flex items-center rounded-full bg-gradient-to-tr from-span-start to-span-end ${hover === option.id ? 'w-40' : 'w-11'} transition-all duration-300`}
              >
                <div className='w-11 h-11 slide-in-down duration-500 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
                  <span className='flex items-center justify-center text-white'>
                    {option.icon}
                  </span>
                </div>
                {hover === option.id && <div className='text-white ml-4 flex'>{option.name}</div>}
              </div>
            ) : (
              <NavLink to={option.path} key={option.id}>
                <div
                  onMouseEnter={() => handleHover(option.id)}
                  onMouseLeave={closeHover}
                  className={`relative flex items-center rounded-full cursor-pointer bg-gradient-to-tr from-span-start to-span-end ${hover === option.id ? 'w-40' : 'w-11'} transition-all duration-300`}
                >
                  <div className='w-11 h-11 slide-in-down duration-500 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
                    <span className='flex items-center justify-center text-white'>
                      {option.icon}
                    </span>
                  </div>
                  {hover === option.id && <div className='text-white cursor-pointer ml-4 flex'>{option.name}</div>}
                </div>
              </NavLink>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Shortcut;
