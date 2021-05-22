import React, { useState } from 'react'
import PostList from '../components/PostList'
import { ApiConstants } from '../config/AppConstants'
import { IProduct } from '../models/Product'

export async function getStaticProps() {
  const res = await fetch(`${ApiConstants.BasePath}${ApiConstants.AllProducts}`)

  if (!res.ok)
    return;

  const posts: IProduct[] = await res.json()

  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {

  const [state, setstate] = useState<IProduct[]>(posts)
  const [apiInProgress, setapiInProgress] = useState(false)
  const addPost = async (post: IProduct) => {

    setapiInProgress(true)
    const res = await fetch(`${ApiConstants.BasePath}${ApiConstants.AddProduct}`, {
      method: "POST",
      body: JSON.stringify([{ Title: post.title, Url: post.url, category: post.category, Price: post.price }]),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      mode: "no-cors",
    })
    setapiInProgress(false)

    post.history = []
    setstate([...state, post])
  }

  return (
    <div className="container block w-screen min-h-screen m-auto">
      <main>
        <h1 className="my-2 text-2xl font-bold text-center">
          Monitored Products - {state.length}
        </h1>

        <PostList onAdd={addPost} products={state} apiInProgress={apiInProgress} />
      </main>
      <section className="p-4 mt-5 border rounded-xl">
        <h4 className="my-5 text-lg underline">How this works?</h4>
        <div>
          This app lets you add the amazon listed products you wish to track for price changes.
          <ul className="px-6 list-disc">
            <li className="list-item ">Add the product you wish to track</li>
            <li className="list-item ">This app will check Amazon every 5 minutes for changes in price, and history is displayed in card at the bottom </li>
            <li className="list-item ">ToDo: Sends email if price is reduced</li>
            <li className="list-item ">ToDo: Login for each user (at this point its all one list for everyone)</li>
          </ul>
        </div>
      </section>

      <section className="p-4 mt-5 border rounded-xl">
        <h4 className="my-5 text-lg underline">Made with</h4>
        <ul className="px-6 list-disc">
          <li className="list-item "><a href="https://github.com/codendlearn/purchasetips.client" className="underline">Github</a> - code repo</li>
          <li className="list-item ">Nextjs - Static Site Generation</li>
          <li className="list-item ">Azure Functions - Serverless Archicture for apis and scrape job</li>
          <li className="list-item ">Azure Cosmosdb - NoSql database</li>
          <li className="list-item ">Tailwind css</li>
          <li className="list-item ">Typescript</li>
          <li className="list-item ">Vercel - hosting platform</li>
        </ul>

      </section>
      {/* <Footer /> */}
    </div>
  )
}


