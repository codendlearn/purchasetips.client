import React, { useState } from "react";
import { IProduct } from "../models/Post";

const AddProduct = (props) => {
    const [product, setproduct] = useState<IProduct>(
        {
            addedOn: "",
            history: [],
            isActive: true,
            maxPrice: 0,
            minPrice: 0,
            price: 0,
            title: "",
            id: "",
            url: "",
            category: ""
        }
    )

    return (
        <form className="flex flex-col items-center justify-between h-full">
            <label>Add Product</label>
            <div className="w-full space-y-2 ">
                <input
                    autoFocus
                    className="w-full p-2 border-black rounded ring-1"
                    id="productUrl"
                    name="productUrl"
                    type="text"
                    value={product.url}
                    onChange={(e) => {
                        setproduct({ ...product, url: e.target.value })
                    }}
                    placeholder="product url"
                />
                <input
                    className="w-full p-2 border-black rounded ring-1"
                    id="productTitle"
                    name="productTitle"
                    type="text"
                    value={product.title}
                    onChange={(e) => {
                        setproduct({ ...product, title: e.target.value })
                    }}
                    placeholder="product title"
                />
                <input
                    className="w-full p-2 border-black rounded ring-1"
                    id="productPrice"
                    name="productPrice"
                    type="text"
                    value={product.price}
                    onChange={(e) => {
                        setproduct({ ...product, price: Number(e.target.value ?? "0") })
                    }}
                    placeholder="enter product price"
                />
                <button onClick={(e) => {
                    props.onAdd(product)
                }}
                    className="w-full p-2 transform rounded ring-1 hover:bg-blue-400 hover:text-white focus:scale-95"
                    type="button"
                >
                    Track product
                </button>
            </div>
        </form>
    );
};

export default AddProduct;
