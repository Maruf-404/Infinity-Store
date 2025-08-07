import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='px-4'>
      <div className='text-2xl text-center pt-8 border-t'>
       <Title text1={"About"} text2={"Us"}/>
      </div>
      <div className='my-19 flex flex-col md:flex-row gap-16'>
         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About image" />
         <div className='flex justify-center flex-col gap-6 md:w-2/4 text-gray-600'>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est non libero facilis reprehenderit recusandae, dolores sit ipsum ea doloremque, amet quibusdam error praesentium? Qui minima dolorum corporis recusandae libero optio.
             Voluptatem ipsum sint eius provident pariatur debitise </p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos, et consequatur ratione porro corporis ipsa nulla maxime sit reprehenderit officiis dicta placeat quo deleniti ad dolorem. Nulla, perspiciatis minima.
             Quos facilis quibusdam iusto minima</p>
             <b className='text-gray-800'>Our Misson</b>
             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab labore aspernatur atque repellendus consequuntur! Reprehenderit modi recusandae nisi quos commodi odio quam, aut eum iusto. Veniam reprehenderit mollitia perspiciatis odit.
             Aut ea ipsum quas placeat sit itaque vero .</p>
         </div>

      </div>
      <div className='text-4xl py-4'>
           <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className='flex flex-col md:flex-row mb-20 text-sm'>
         <div className='border flex flex-col gap-2 px-10 md:px-16 py-8 sm:py-20 '>
                 <b>Quality Assurance</b>
                 <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, tempore perspiciatis pariatur Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, obcaecati dignissimos veniam harum libero odit </p>
         </div>
           <div className='border flex flex-col gap-2 px-10 md:px-16 py-8 sm:py-20 '>
                 <b>Convenience</b>
                 <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, tempore perspiciatis pariatur Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, obcaecati dignissimos veniam harum libero odit </p>
         </div>
           <div className='border flex flex-col gap-2 px-10 md:px-16 py-8 sm:py-20 '>
                 <b>Exceptional Customer Service</b>
                 <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, tempore perspiciatis pariatur Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, obcaecati dignissimos veniam harum libero odit </p>
         </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
