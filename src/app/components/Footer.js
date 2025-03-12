
import React from 'react'
import Image from 'next/image'
import framer from '../../img/Frame275.png'

export default function Footer() {
  return (
    <div className='bg-gray-200 flex flex-wrap justify-around  mt-20 p-16'>
        <div className=''> 
            <div className='text-gray-500 text-sm'>
             <div className='mb-10'>info</div>
             <div>PRCING</div>
             <div>ABOUTS</div>
             <div>CONTACTS</div>
            </div>
            <div className='text-gray-500 mt-10 text-sm'>
             <div className='mb-10'>LANGUAGES</div>
             <div>ENG</div>
             <div>ESP</div>
             <div>SVE</div>
            </div>
        </div>
        <div className=' flex justify-center md:w-auto'>
            <Image src={framer} alt='' className='max-w-[200px] md:max-w-[200px] lg:max-w-[350px]'/>
        </div>
      
    </div>
  )
}
