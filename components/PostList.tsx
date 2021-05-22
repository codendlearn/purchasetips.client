import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { IProduct } from '../models/Product'
import AddProduct from './AddProduct'
import ProductCard from './ProductCard'

const PostList = ({ products: products, onAdd, apiInProgress }: { products: IProduct[], onAdd: (product: IProduct) => void, apiInProgress: boolean }) => {
    return (
        <div className="flex flex-wrap mt-5">
            <div className="p-2 m-1 overflow-hidden border rounded shadow-sm bg-gray-50 hover:bg-blue-50 w-72 hover:shadow-lg">
                <AddProduct apiInProgress={apiInProgress} onAdd={onAdd} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {
                    products.map((p, index) => <ProductCard {...p} />)
                }
            </div >
        </div>
    )
}

export default PostList
