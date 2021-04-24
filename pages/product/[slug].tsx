import React from 'react'
import { useRouter } from 'next/router'
import { IProduct } from '../../models/Post'
import clsx from 'clsx'

export async function getStaticPaths({ params }) {
    let products = await fetch('https://purchasetips.azurewebsites.net/api/allproducts')
    let productsobj: IProduct[] = await products.json()
    let productParams = productsobj.map(p => { return { params: { slug: p.url } } })
    console.log(productParams)
    return {
        paths: productParams,
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    let products = await fetch('https://purchasetips.azurewebsites.net/api/allproducts')
    let productsobj: IProduct[] = await products.json()
    if (productsobj) {
        console.log(productsobj)
        let product = productsobj.find((a) =>
            a.url == params.slug
        )

        return {
            props: {
                product
            },
            revalidate: 300 // will be passed to the page component as props
        }
    }
}


const ProductDetail = ({ product }: { product: IProduct }) => {
    return (
        <div className={clsx('container border border-red-800 p-4 shadow-md max-w-screen-md mx-auto my-4 h-full')}>
            <a className="underline" href={product.url}>{product.title}</a>
            <span>{product.category}</span>
            <p>Current Price: {product.price}</p>
            <p>Max observed Price: {product.maxPrice}</p>
            <p>Min observed price: {product.minPrice}</p>
            <section className="p-4">
                <p>Previous changes</p>
                {product.history.map(h => <p>{h.previousprice} ---- {h.currentprice} </p>)}
            </section>
        </div>
    )
}

export default ProductDetail
