import React, { useState, useEffect } from 'react'
import { asset, questions } from '../assets/assets'

const Works = () => {
  const [icon,setIcon] = useState(false)

  const onToggleIcon = (index)=>{
    setIcon((prevClicked)=>(prevClicked===index?null:index))
  }

  return (
    <div className='mt-5'>
        <div className='flex ml-15'>
            {/**Left part // text */}
            <div className='w-[50%] mt-20 ml-7'>
                <h3 className='text-pink-400 font-semibold'>HOW IT WORKS</h3>
                <h1 className='text-5xl mb-8'>Online Learning That Helps Students Succeed</h1>
                <p className='text-xl'>Dedicated teachers, quality curriculum, learning materials, and supportive community make for a great school experience 1-12 provides everything your child needs to thrive.</p>
            </div>
            {/**Right side part // image */}
            <div className='w-[50%]'>
                <img src={asset.devs} alt="" className='w-[450px]' />
            </div>
        </div>
        {/**bottom part */}
        <div className='ml-25 mt-5 justify-center'>
          <ul className='flex gap-2 justify-between mr-40'>
            <li className='outline-none bg-[#F9FAFA] px-6 py-5 rounded w-[190px]'>Personalized learning</li>
            <li className='outline-none bg-[#F9FAFA] px-6 py-5 rounded w-[190px]'>Your Space, Your pace</li>
            <li className='outline-none bg-[#F9FAFA] px-6 py-5 rounded w-[190px]'>Scheduled Live classes</li>
            <li className='outline-none bg-[#F9FAFA] px-6 py-5 rounded w-[190px]'>Graduation Guaranteed</li>
          </ul>
        </div>

        {/** FAQ */}
        <div className='flex flex-col mt-30 gap-2 bg-[#F9FAFA] px-4 py-4 w-[80%] ml-25 rounded-2xl mb-5'>
          <h1 className='text-2xl font-semibold'>What Parents Want To Know About Online School</h1>
          <div>
            {
              questions.map((item,index)=>(
                <div key={index} className='flex justify-between my-4 border-b-2 gap-2 w-full' onClick={()=>onToggleIcon(index)}>
                  <div className='flex flex-col gap-2'>
                  <p className='text-lg font-semibold'>{item.question}</p>
                  {
                    icon===index?<p className='mb-3'>{item.answer}</p>:null
                  }
                  </div>
                  <p><img src={icon===index?asset.minus:asset.plus} alt="" className='cursor-pointer'/></p>
                </div>
                
              ))
            }
            <button className='flex px-12 py-1.5 border-2 border-blue-400 outline-none rounded-full mt-10'>Learn More</button>
          </div>
          
        </div>
    </div>
  )
}

export default Works