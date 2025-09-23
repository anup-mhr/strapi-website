import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='grid grid-cols-3 py-22 text-primary-brown padding'>
      <div>
        <div className='w-58 h-24 relative'>
          <Image src="/images/logo.png" alt={"Hierloom Naga Logo"} fill className='w-full h-full object-contain' />
        </div>
        <p className='text-gray-500 text-xs'>© 2025 Heirloomnaga.com All rights reserved.</p>
      </div>

      <div className='text-sm text-center mx-auto font-semibold '>
        FIND US ON
        <div className='flex gap-8 mt-6'>
          <Image src={"/images/socials/instagram.svg"} alt={"instagram"} width={44} height={44} />
          <Image src={"/images/socials/facebook.svg"} alt={"facebook"} width={44} height={44} />
          <Image src={"/images/socials/x-twitter.svg"} alt={"x-twitter"} width={44} height={44} />

        </div>
      </div>

      <div className='mx-auto'>
        <p className='text-sm font-semibold'>HELP</p>
        <ul className='text-xs text-gray-500 mt-6 space-y-1'>
          <li>Returns & Refunds</li>
          <li>Shipping</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer