import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProductPreview } from '@/types/shopify'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/helper'


const ProductList = ({ products, className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" }: { products: ShopifyProductPreview[], className?: string }) => {
    return (
        <div className={cn("grid gap-x-2 gap-y-8 w-full", className)} >
            {products.map((product) => (
                <Link href={`/shop/${product.handle}`} key={product.id}>
                    <div className="relative w-full aspect-[3/4] overflow-hidden group">
                        <Image
                            src={product.images[0].src}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        <div className='transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute flex justify-center items-center top-1/2 left-1/2 -translate-1/2 w-[80%] h-[80%] bg-white/50 '>
                            <button className='bg-black text-white px-8 py-2 font-bold tracking-normal text-sm rounded-md'>
                                VIEW
                            </button>
                        </div>

                        {
                            product.variants.some(p => {
                                const compareAt = Number(p.compareAtPrice?.amount)
                                const price = Number(p.price?.amount)
                                return compareAt > 0 && compareAt !== price
                            }) &&
                            <div className='absolute bottom-6 right-6  bg-primary-pink w-18 h-18 flex justify-center items-center text-white text-lg font-semibold rounded-full '>
                                Sale
                            </div>
                        }

                    </div>

                    <div className="py-3 px-4 md:px-6 flex flex-col items-center text-sm tracking-normal">
                        <p className="font-bold">{product.title}</p>
                        <p>
                            {formatPrice(product.variants[0].price.amount, product.variants[0].price.currencyCode)}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductList