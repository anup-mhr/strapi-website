import React from 'react'
import Image from 'next/image';
import { cn } from '../lib/utils';

const Header = ({
    className=""
}: {className:string}) => {
    return (
        <header className={cn('padding z-100 w-full fixed flex items-center justify-between font-semibold text-lg',className)}>
            <div className='w-58 h-24 relative'>
                <Image src="/images/logo.png" alt={"Hierloom Naga Logo"} fill className='w-full h-full object-contain' />
            </div>

            <ul className='flex gap-4'>
                <li>SHOP</li>
                <li>JOURNAL</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
                <li>CART(0)</li>
            </ul>
        </header>
    )
}

export default Header