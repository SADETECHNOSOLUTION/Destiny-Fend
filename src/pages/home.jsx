import React,{useState, useEffect} from 'react'
import Weather from '../components/weather'
import Createpost from '../components/createpost'
import Events from '../components/events'
import Reels from '../components/reels'
import Birthday from '../components/birthday'
import Story from '../components/story'
import Post from '../components/poste'
import Shortcut from '../components/shortcut'
import { useDispatch } from 'react-redux'
import { setAuth } from '../slices/authslice'
import { useNavigate } from 'react-router'


const Home = () => {
  const dispatch = useDispatch()
  const [user,setUser] = useState()

  const navigate = useNavigate()
  // const navigate = useNavigate();

  // const [hover,setHover] = useState(null);
  // const userId = useSelector((state)=>state.auth.userId)

  // const handleHover = (id)=>{
  //   setHover(id)
  // }

  // const closeHover = ()=>{
  //   setHover(null)
  // }

  // const handleShortcut =()=>{
  //   showShortcut(!shortcut);
  // }

  // const openFriendSuggestion = ()=>{
  //   navigate('/addfriends')
  // }

  // const handleLogout = () => {
  //   navigate('/');
  //   localStorage.removeItem('token');
  // };

  // const options = [{
  //   id:1,
  //   name:"Profile",
  //   icon:<Icon className='optionicon' icon="gravity-ui:person" />,
  //   path:`/user/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:2,
  //   name:"Chat",
  //   icon:<Icon className='optionicon' icon="mingcute:message-4-line" />,
  //   path:'/messages',
  //   task:'none',
  // },

  // {
  //   id:3,
  //   name:"My Pages",
  //   icon:<Icon className='optionicon' icon="icon-park-solid:web-page" />,
  //   path:'/page',
  //   task:'none'
  // },

  // {
  //   id:4,
  //   name:"Friends",
  //   icon:<Icon className='optionicon' icon="icon-park-outline:peoples-two" />,
  //   path:`/friendsview/${userId}`    ,
  //   task:'none'
  // },

  // {
  //   id:5,
  //   name:"Photos",
  //   icon:<Icon className='optionicon' icon="ph:image-duotone" />,
  //   path:`/photosview/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:6,
  //   name:"Videos",
  //   icon:<Icon className='optionicon' icon="bxs:videos" />,
  //   path:`/videosview/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:7,
  //   name:"Notifications",
  //   icon:<Icon className='optionicon' icon="mi:notification" />,
  //   path:`/notifications/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:8,
  //   name:"Saved",
  //   icon:<Icon icon="foundation:book-bookmark" />,
  //   path:'/saved',
  //   task:'none'
  // },

  // {
  //   id:9,
  //   name:"Logout",
  //   icon:<Icon className='optionicon' icon="fe:logout" />,

  // }]

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/adminuser/get-profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data)
          // Check if `ourUsers` exists in the response
          if (data.statusCode === 200 && data.ourUsers) {
            return data.ourUsers; 
          } else {
            console.error('Invalid data format:', data);
            return null;
          }
        } else {
          console.error('Failed to fetch user profile:', response.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    };


  useEffect(() => {
    fetchUserProfile();
}, []);

useEffect(() => {
  if (user && user.id) {
      dispatch(setAuth({ userId: user.id })); // Dispatch setAuth when user is updated
  }
}, [user, dispatch]);

  return(
    <div className='w-full bg-gray-50 small:px-14 custom-px-16 default:px-20 flex flex-col gap-4'>
    <Shortcut />
    <div className='w-full mt-4 justify-between flex flex-wrap gap-4 '>
    <aside className='md:w-1/5  sm:w-full xs:w-full flex flex-col gap-4'>
    <Birthday />
    <Weather />
    <div className='h-60 bg-cta flex items-center rounded-md justify-center'>
     <span className='text-center text-white'>-Advertisement-</span>
    </div>
    </aside> 
    <div className='md:w-1/2  h-[calc(100vh-90px)] flex overflow-y-scroll scrollbar-hidden flex-col gap-4 sm:w-full'>
    <div>
          {/* <div className="w-full top-0 h-10 flex items-center justify-between">
        <div

          className={`p-2 w-full flex text-sm font-semibold border rounded-br cursor-pointer items-center justify-center bg-cta text-white font-semibold`}
        >
          <span>Personal</span>
        </div>
        <div onClick={navigate('/Profession')} className={` p-2 w-full flex rounded-tl text-sm font-semibold border cursor-pointer items-center justify-center `}
        >
          <span>Professifeon</span>
        </div>
      </div> */}
    </div>
    <Createpost />
   <Post />
    </div>
    <aside className='flex flex-col gap-4 md:w-1/5 sm:w-full'>
    {/* <Suggestfriends /> */}
    <Story />
    <Events />
    <div className='h-60 bg-cta flex items-center rounded-md justify-center'>
     <span className='text-center text-white'>-Advertisement-</span>
    </div>
    </aside>
    </div>
    </div>
  )
}
export default Home
