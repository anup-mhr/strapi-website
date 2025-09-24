import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { productType } from '@/types/types'


const ProductList = ({ products }: { products: productType[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-8 w-full" >
            {products.map((product, index) => (
                <Link href={"/"} key={index}>
                    <div className="relative w-full aspect-[3/3.7] overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                        />

                    </div>

                    <div className="py-4 px-4 md:px-6 flex justify-between text-xs sm:text-sm xl:text-base">
                        <p className="font-semibold">{product.title}</p>
                        <p>₹ {product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductList