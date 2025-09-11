import React from 'react'
import Link from 'next/link'

const Button = ({children , href="/"}:{children:React.ReactNode , href?:string}) => {
    return (
        <Link
            href={href}
            className="bg-black text-white py-5 px-10 mt-2 w-max uppercase font-light tracking-widest text-sm"
        >
            {children}
        </Link>
    )
}

export default Button