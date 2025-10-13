"use client";
import React from 'react'
import Sidebar from './Sidebar'
import ProductList from './ProductList'
import { ShopifyProductPreview } from '@/types/shopify'
import { useSort } from '@/context/SortContext'
import { sortProjects } from '@/lib/helper'
import { Sorter } from '../Sorter';

const ShopPageGrid = ({ products }: { products: ShopifyProductPreview[] }) => {
    const { currentSort } = useSort();

    const sortedProducts = sortProjects(products, currentSort);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-[2rem] xl:gap-[4rem]">
            <Sidebar />
            <div>
                <div className="flex justify-between items-center mb-10">
                    <p className="text-xs text-gray-600">
                        SHOWING {sortedProducts.length} PRODUCTS
                    </p>
                    <Sorter />
                </div>

                <ProductList
                    products={sortedProducts}
                    className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                />
            </div>
        </div>
    )
}

export default ShopPageGrid