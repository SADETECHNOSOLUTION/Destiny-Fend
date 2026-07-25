import React,{ useState,useEffect,useCallback } from "react";
import Checkbox from "./checkbox";
import { useSelector } from "react-redux";


const GeneralSetting = ()=>{
    const [isChecked, setIsChecked] = useState(false);
    const [settings,setSettings] = useState()
    const userId = useSelector((state)=>state.auth.userId)

    const handleCheckboxChange = (newState) => {
        setIsChecked(newState);
      };

        const fetchSettings = useCallback(async ()=>{
          const token = localStorage.getItem('token')
          try{
            const response = await fetch(` https://destiny-apigateway.onrender.com/api/users/general-settings/${userId}`,{
               method:'GET',
               headers:{
                  'Authorization':`Bearer ${token}`,
               }
              })
              if(response.ok){
              const data = await response.json()
              setSettings(data)
              }
              else{
                console.log('failed to post')
              }  
          }
          catch(error){
              console.log(error);
          }
      },[userId])
      
      useEffect(()=>{
        fetchSettings();
      },[fetchSettings])


    const data = [
    {
        id:2,
        name:'Enable Follow Me',
        desc:'Enable this if you want people to follow you',
    },
    {
        id:3,
        name:'Send Me Notifications',
        desc:'Send me notification emails my friends like, share or message me',
    },
    {
        id:4,
        name:'Text Messages',
        desc:'Send me messages to my cell phone',
    },
    {
        id:5,
        name:'Enable Tagging',
        desc:'By enabling this people can tag you',
    },{
        id:6,
        name:'Enable Sound Notification',
        desc:'Notification sound when someone sends you a private message',
    }]
    return(
<div className="w-1/2 px-2 py-2 gap-6 flex flex-col">
    <span className="text-xl font-semibold">General Settings</span>
<div className="flex flex-col gap-4 ">

        <div className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">Enable Follow Me</span>
            <span className="text-sm text-gray-500">Enable this if you want people to follow you</span>
        </div>
        <div>
        <Checkbox initialItemState={settings?.enableFollowMe === true ? true : false} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
        <div className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">Send Me Notifications</span>
            <span className="text-sm text-gray-500">Enable this if you want people to follow you</span>
        </div>
        <div>
        <Checkbox initialItemState={settings?.sendMeNotification === true ? true : false} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
        <div className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">Text Messages</span>
            <span className="text-sm text-gray-500">Enable this if you want people to follow you</span>
        </div>
        <div>
        <Checkbox initialItemState={settings?.textMessage === true ? true : false} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
        <div className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">Enable Tagging</span>
            <span className="text-sm text-gray-500">Enable this if you want people to follow you</span>
        </div>
        <div>
        <Checkbox initialItemState={settings?.enableTagging === true ? true : false} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
        <div className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">Enable Sound Notification</span>
            <span className="text-sm text-gray-500">Enable this if you want people to follow you</span>
        </div>
        <div>
        <Checkbox initialItemState={settings?.enableSoundNotification === true ? true : false} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
    
</div>
<div className="flex items-center gap-4 px-4 bg-black text-yellow">

</div>
<div className="flex flex-col gap-4">
<span className="font-semibold">Account Settings</span>
<div className="flex flex-col gap-4">
<div className="flex h-20 rounded-md deactivate bg-gray-50 cursor-pointer  px-2 justify-center flex-col gap-2">
    <span className="font-semibold child-dt">Deactivate Account</span>
    <span className="text-sm">Temporarily deactivate your account</span>
</div>
<div className="flex h-20 delete rounded-md bg-gray-50 cursor-pointer  px-2 justify-center flex-col gap-2">
    <span className="font-semibold child-d">Delete Account</span>
    <span className="text-sm">Permanently delete your account</span>
</div>
</div>
</div>
</div>
    )
}

export default GeneralSetting