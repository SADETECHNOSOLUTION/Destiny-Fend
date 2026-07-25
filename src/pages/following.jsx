import React,{useCallback, useEffect,useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router";
import { useSelector, } from "react-redux";

const Following = ()=>{
  const [loaded, setLoaded] = useState(false);
    const {userID} = useParams()
    const userId = useSelector((state)=>state.auth.userId)
    const [following,setFollowing] = useState()
  const [searchTerm, setSearchTerm] = useState("");


    const fetchFollowing = useCallback(async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await fetch(`https://destiny-apigateway.onrender.com/follows/api/following/${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowing(data);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },[userID]);
useEffect(()=>{
fetchFollowing()
},[fetchFollowing])
    useEffect(() => {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500); // Adjust the delay time as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }, []);
  
    // If not loaded yet, return a loading indicator or null
    if (!loaded) {
      return <div></div>; // You can customize this loading indicator
    }
    const unfollowUser = async (followId)=>{
      const token = localStorage.getItem('token')
      try{
        const response = await fetch(`https://destiny-apigateway.onrender.com/follows/unfollow/${userId}/${followId}`,{
          method:'DELETE',
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        if(response.ok){
          console.log('')
          fetchFollowing()
        }
        else{
          console.log('error in posting data')
        }
      }
      catch(error){
        console.error(error)
      }

    }

    const filteredFollowing = following?.users?.filter((following) =>
      following.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case insensitive search
    );
  
    return(
        <div className={`w-full flex items-center justify-center `}>
            <div className="w-5/6 shadow-lg flex p-2 flex-col gap-4">
            <div className="flex items-center justify-between gap-2 text-lg font-semibold px-8">
              <div className="flex items-center gap-1">
              <p>Following</p><span>({following?.count})</span>
              </div>

              
                                  <div className="relative">
                                    <input
                                      type="text"
                                      onChange={(e)=>setSearchTerm(e.target.value)}
                                      placeholder="Search"
                                      className=" w-[220px] h-11 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
                                    <button
                                      type="submit"
                                      className="absolute right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none"
                                    >
                                      <Icon icon="ooui:search" width="1.2em" height="1.2em"  className='text-gray-400' />
                                    </button>
                                  </div>
            </div>
            <div  className="flex flex-wrap gap-2">
            {filteredFollowing.map((Following)=>(
            <div key={Following.id} className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center">
            <div className="flex items-center gap-2">
            <img className="w-16 h-16 rounded-full" src={`https://destiny-apigateway.onrender.com${Following.profileImagePath}`} alt=''/>
            <p className="text-lg w-24 truncate">{Following.name}</p>
            </div>
            <span> {Following.work} </span>
            <span>{Following.mutual} Mutuals</span>
            <button onClick={()=>{unfollowUser(Following.id)}} className="p-2 flex bg-cta text-white items-center gap-2 border rounded-md border-cta hover:bg-white hover:text-cta font-semibold"><Icon icon="mingcute:user-follow-fill" />Following</button>
            </div>
            ))}
            </div>
            </div>       
        </div>  
)
}

export default Following;










