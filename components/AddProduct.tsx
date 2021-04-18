import React from "react";

const AddProduct = () => {
    return (
        <form className="flex flex-col items-center justify-between h-full">
            <label htmlFor="productUrl">Add Product</label>
            <div className="w-full space-y-2 ">
                <input
                    className="w-full p-2 border-black rounded ring-1"
                    id="productUrl"
                    name="productUrl"
                    type="text"
                    placeholder="enter product url"
                />
                <button
                    className="w-full p-2 transform rounded ring-1 hover:bg-blue-400 hover:text-white focus:scale-95"
                    type="button"
                >
                    Track
                </button>
            </div>
        </form>
    );
};

export default AddProduct;
