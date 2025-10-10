import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct } from '@/types/shopify'
import { cn } from '@/lib/utils'


const ProductList = ({ products, className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" }: { products: ShopifyProduct[], className?: string }) => {
    return (
        <div className={cn("grid gap-x-2 gap-y-8 w-full", className)} >
            {products.map((product, index) => (
                <Link href={"/shop/1"} key={index}>
            
                </Link>
            ))}
        </div>
    )
}

export default ProductList