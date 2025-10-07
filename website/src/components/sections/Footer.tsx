import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 items-center mt-24 mb-12">
        <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="w-[150px] sm:w-[180px] lg:w-[210px] mb-2" />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 py-22 text-primary padding'>
        <div className='flex flex-col items-center md:items-start'>

          <Image src="/images/logo.png" alt={"Hierloom Naga Logo"} width={200} height={96} className='object-contain w-40 lg:w-50 h-24' />

          <p className='text-gray-500 text-xs'>© 2025 Heirloomnaga.com All rights reserved.</p>
        </div>

        <div className='text-sm text-center mx-auto font-semibold '>
          FIND US ON
          <div className="flex gap-4 lg:gap-8 mt-6">
            <Image
              src={"/images/socials/instagram.svg"}
              alt="instagram"
              width={44}
              height={44}
              className="w-8 h-8 md:w-10 md:h-11 lg:w-12 lg:h-12"
            />
            <Image
              src={"/images/socials/facebook.svg"}
              alt="facebook"
              width={44}
              height={44}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            />
            <Image
              src={"/images/socials/x-twitter.svg"}
              alt="x-twitter"
              width={44}
              height={44}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <p className='text-sm font-semibold'>HELP</p>
          <ul className='text-xs text-gray-500 mt-6 space-y-1 flex flex-col items-center md:items-start'>
            <li>Returns & Refunds</li>
            <li>Shipping</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer