import Head from 'next/head'
import React, { useState } from 'react';
import AddProduct from '../components/AddProduct';
import Footer from '../components/Footer';
import PostList from '../components/PostList';
import { ApiConstants } from '../config/AppConstants';
import { IProduct } from '../models/Post';

export async function getStaticProps() {
  const res = await fetch(`${ApiConstants.BasePath}${ApiConstants.AllProducts}`)
  const posts: IProduct[] = await res.json()

  return {
    props: {
      posts
    },
  }
}

export default function Home({ posts }) {

  const [state, setstate] = useState<IProduct[]>(posts)

  const addPost = async (post: IProduct) => {
    post.history = []
    setstate([...state, post])

    const res = await fetch(`${ApiConstants.BasePath}${ApiConstants.AddProduct}`, {
      method: "POST",
      body: JSON.stringify([{ Title: post.title, Url: post.url, category: "Electronics", Price: post.price }]),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      mode: "no-cors",
    })
  }

  return (
    <div className="container block w-screen min-h-screen m-auto ">
      <Head>
        <title>Purchase Tips</title>5
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold text-center">
          Monitored Products
        </h1>

        <PostList onAdd={addPost} posts={state} />

      </main>

      <Footer />
    </div>
  )
}


