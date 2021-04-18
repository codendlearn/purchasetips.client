import React from 'react'
import { IProduct } from '../models/Post'
import AddProduct from './AddProduct'

const PostList = ({ posts, onAdd }: { posts: IProduct[], onAdd: (post: IProduct) => void }) => {
    return (
        <div className="flex flex-wrap m-2">
            {posts.map((p, index) => {
                if (index == 0) {
                    return <div className="p-2 m-1 overflow-hidden border rounded shadow-sm max-h-64 w-44 hover:shadow-lg">
                        <AddProduct onAdd={onAdd} />
                    </div>
                }
                else
                    return <div className="p-2 m-1 overflow-hidden border rounded shadow-sm max-h-64 w-44 hover:shadow-lg">
                        <a href={p.url}>
                            <h3 className="text" >{p.title} &rarr;</h3>
                            <p>{p.price} - {p.history.map(x => x + " - ")}</p>
                        </a>
                    </div>
            }
            )}
        </div>)
}

export default PostList
