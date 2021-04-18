import React from 'react'
import { IProduct } from '../models/Post'
import AddProduct from './AddProduct'
import clsx from 'clsx'

const PostList = ({ posts, onAdd }: { posts: IProduct[], onAdd: (post: IProduct) => void }) => {

    return (
        <div className="flex flex-wrap p-6 mt-5 border rounded-xl">
            {posts.map((p, index) => {
                if (index == 0) {
                    return <div className="p-2 m-1 overflow-hidden border rounded shadow-sm bg-gray-50 hover:bg-blue-50 w-72 hover:shadow-lg">
                        <AddProduct onAdd={onAdd} />
                    </div>
                }
                else {
                    const isGreen = p.history.length > 0 && p.history[p.history.length - 1] < p.price;
                    const isRed = p.history.length > 0 && p.history[p.history.length - 1] > p.price;
                    return <a className={clsx("p-2 m-1 overflow-hidden border rounded shadow-sm max-h-64 w-44 hover:shadow-lg", isGreen && 'text-green-400', isRed && "text-red-400")}
                        href={p.url}
                        target="_blank" >
                        <div > <h3 className="text" >{p.title} &rarr;</h3>
                            <p>{p.price} - {p.history.map(x => x + " - ")}</p>
                        </div>
                    </a>
                }
            }
            )}
        </div>)
}

export default PostList
