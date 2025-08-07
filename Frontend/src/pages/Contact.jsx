import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-4'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 '>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="ContactImage" />
        <div className='flex flex-col justify-center items-center gap-6'>
           <p className='font-semibold text-xl text-gray-600'>Our Store</p>
           <p className='text-gray-500'>757 Jenise Crossroad, <br /> New Rooseveltport, CA 16536</p>
           <p>Tel: (415) 555 1324 <br /> Email: infinitystore@gmail.com </p>
           <p className='text-xl font-semibold text-gray-600'>Careers at infinity store </p>
           <p className='text-gray-500'>Lear more about team and job openings</p>
           <button className='border px-8 py-4 text-sm border-black hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
