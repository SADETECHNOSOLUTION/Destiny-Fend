import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Events = () => {
    const events=[{
        id:1,
        icon:<Icon className='w-6 h-6' icon="el:mic" />,
        desc:'Open Mic 2025 in Columbia',
        color:'cta'
      },
      {
        id:2,
        icon:<Icon className='w-6 h-6' icon="ph:bowl-food-fill" />,
        desc:'food Festival',
        color:'ctao'
      },]
   
      
  return (
    <div className='w-full flex bg-white rounded-md flex-col gap-3 shadow-lg py-3 px-4'>
      <div className='flex items-center justify-between'><span className=' font-semibold'>Explore Events</span> <span className='text-sm text-cta'>See all</span></div>
      {events.map((items)=>(
    <div key={items.id} className={`w-full  items-center justify-center flex cursor-pointer bg-${items.color} h-20 rounded-md`}>
    <div className=' flex flex-col items-center justify-center text-white'><span className=''>{items.icon}</span><span className=' font-semibold'>{items.desc}</span></div>
    <div className='absolute right-0'><img className='' src='clock.png' alt='' /></div>
    </div>
      ))}
    </div>
  )
}

export default Events;
