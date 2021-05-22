import clsx from 'clsx'
import React from 'react'
import { IProduct } from '../models/Product'
import { TrashIcon, DocumentTextIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'

const ProductCard: React.FC<IProduct> = (product) => {
    const isRed = product.history.length > 0 && product.history[product.history.length - 1].previousprice < product.price
    const isGreen = product.history.length > 0 && product.history[product.history.length - 1].previousprice > product.price

    return (
        <div className={clsx("flex flex-col justify-between bg-white rounded-lg shadow-md divide-y divide-gray-200 hover:shadow-xl", isRed && "bg-red-50", isGreen && "bg-green-50")}>
            <div className="w-full flex-grow flex items-center justify-between p-6 space-x-6">
                <div className="flex-1">
                    <h3 className="text-gray-900 text-sm font-medium">
                        <a href={product.url} className="hover:underline" target="_blank">
                            {product.title.length < 80 ? product.title : product.title.slice(0, 80).concat("...")}
                        </a>
                    </h3>
                    {
                        product.category &&
                        <span className="mt-1 inline-block px-2 py-1 text-xs select-none font-medium bg-indigo-600 bg-opacity-25 rounded-full">
                            {product.category}
                        </span>
                    }
                </div>
                <img
                    src={product.imageUrl ?? '/assets/images/NoImage.png'}
                    className="w-28 h-28 object-cover bg-transparent shadow-lg rounded-md flex-shrink-0"
                />
            </div>
            <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex hover:bg-red-50">
                    <button
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-400 font-medium border border-transparent rounded-bl-l"
                    >
                        <TrashIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                        <span className="ml-3">Delete</span>
                    </button>
                </div>
                <div className="-ml-px w-0 flex-1 flex hover:bg-green-100">
                    <Link key={product.id} href={{
                        pathname: `/product/detail/${product.id}`,
                    }}>
                        <a
                            href={`tel:${product.id}`}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg">
                            <DocumentTextIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Details</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
