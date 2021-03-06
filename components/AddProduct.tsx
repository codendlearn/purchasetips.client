import clsx from "clsx";
import React, { useState } from "react";
import { IProduct } from "../models/Product";

const AddProduct = (props) => {
    const [error, setError] = useState(false)
    const [product, setproduct] = useState<IProduct>(
        {
            addedOn: "",
            history: [],
            isActive: true,
            maxPrice: 0,
            minPrice: 0,
            title: "",
            id: "",
            url: "",
            category: ""
        }
    )

    const errorMessage = "Invalid data";

    return (
        <form className="flex flex-col items-center justify-between h-full">
            <label>{props.apiInProgress ? "Adding product..." : "Add Product"}</label>
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
                    id="productTriggerPrice"
                    name="productTriggerPrice"
                    type="text"
                    value={product.price}
                    onChange={(e) => {
                        setproduct({ ...product, price: Number(e.target.value ?? "0") })
                    }}
                    placeholder="enter alert trigger price"
                />

                {
                    error && <label className={clsx('text-red-500')}>{errorMessage}</label>
                }

                <button onClick={(e) => {
                    if (product.url && (product.price ?? 1) > 0) {
                        setError(false)
                        props.onAdd(product)
                    }
                    else
                        setError(true)
                }}
                    className="w-full p-2 transform rounded ring-1 hover:bg-blue-400 hover:text-white focus:scale-95"
                    type="button"
                    disabled={props.apiInProgress}
                >
                    Track product
                </button>
            </div>
        </form>
    );
};

export default AddProduct;
