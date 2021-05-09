import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import {IProduct} from '../models/Product'
import AddProduct from './AddProduct'

const PostList = ({products: products, onAdd, apiInProgress}: {products: IProduct[], onAdd: (product: IProduct) => void, apiInProgress: boolean}) => {
    return (
        <div className="flex flex-wrap p-6 mt-5 border rounded-xl">
            <div className="p-2 m-1 overflow-hidden border rounded shadow-sm bg-gray-50 hover:bg-blue-50 w-72 hover:shadow-lg">
                <AddProduct apiInProgress={apiInProgress} onAdd={onAdd} />
            </div>
            {products.map((p, index) => {
                const isRed = p.history.length > 0 && p.history[p.history.length - 1].previousprice < p.price
                const isGreen = p.history.length > 0 && p.history[p.history.length - 1].previousprice > p.price
                return <Link key={p.id} href={{
                    pathname: `/product/detail/${p.id}`,
                }}>
                    <a className={clsx("p-2 m-1 overflow-hidden border rounded shadow-sm max-h-64 w-44 h-64 hover:shadow-lg")}
                        target="_blank" >
                        <div className="relative h-full">
                            <h3 className="text" >{p.title.length < 120 ? p.title : p.title.slice(0, 120).concat("...")}</h3>
                            <p className={clsx("text-lg", isGreen && 'text-green-400', isRed && "text-red-400")}>Current Price: {p.price}</p>
                            {p.history.length > 0 && <p className={clsx("absolute bottom-0", p.history.length == 0 && "hidden")}> Previous price: {p.history.slice(-1)[0].previousprice}</p>}
                        </div>
                    </a>
                </Link>
            }
            )}
        </div >)
}

export default PostList
