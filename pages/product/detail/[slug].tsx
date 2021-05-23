import clsx from "clsx";
import React from "react";
import { IProduct } from "../../../models/Product";
import { ThumbUpIcon, ThumbDownIcon, UserIcon } from "@heroicons/react/solid";

export async function getStaticPaths({ params }) {
  let products = await fetch(
    "https://purchasetips.azurewebsites.net/api/allproducts"
  );
  let productsobj: IProduct[] = await products.json();
  let productParams = productsobj.map((p) => {
    return { params: { slug: p.id } };
  });
  return {
    paths: productParams,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let products = await fetch(
    "https://purchasetips.azurewebsites.net/api/allproducts"
  );
  let productsobj: IProduct[] = await products.json();

  if (productsobj) {
    let product = productsobj.find((a) => a.id == params.slug);
    product.history == product.history ?? [];

    return {
      props: {
        product,
      },
      revalidate: 300,
    };
  } else {
    return {
      notFound: true,
    };
  }
}

type Props = { product: IProduct };

const ProductDetail = ({ product }: { product: IProduct }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  if (product)
    return (
      <div
        className={clsx(
          " container border border-red-800 p-4 shadow-md max-w-md mx-auto my-4 h-full"
        )}>
        <div className='flex justify-between'>
          <div>
            <a className='underline' href={product.url}>
              {product.title}
            </a>
            <p>{product.category}</p>
            <p>Current Price: {product.price}</p>
            <p>Max observed Price: {product.maxPrice}</p>
            <p>Min observed price: {product.minPrice}</p>
          </div>
          <img
            src={product.imageUrl ?? "/assets/imags/NoImage.png"}
            className='w-3/5 h-3/5 objec'
          />
        </div>
        <section className='mt-6'>
          <div className='flow-root'>
            <ul className='-mb-8'>
              {product.history.reverse().map((event, eventIdx) => {
                const isRed = event.previousprice < event.currentprice;
                // const isGreen = event.previousprice > event.currentprice
                const updatedDate = event.updatedOn
                  ? new Date(event.updatedOn)
                  : null;
                return (
                  <li key={Math.random()}>
                    <div className='relative pb-8'>
                      {eventIdx !== product.history.length - 1 ? (
                        <span
                          className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                          aria-hidden='true'
                        />
                      ) : null}
                      <div className='relative flex space-x-3'>
                        <div>
                          <span
                            className={classNames(
                              isRed && "bg-red-600",
                              !isRed && "bg-green-600",
                              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                            )}>
                            {isRed ? (
                              <ThumbDownIcon
                                className='h-5 w-5 text-white'
                                aria-hidden='true'
                              />
                            ) : (
                              <ThumbUpIcon
                                className='h-5 w-5 text-white'
                                aria-hidden='true'
                              />
                            )}
                          </span>
                        </div>
                        <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                          <div>
                            <p className='text-sm text-gray-500'>
                              Price {isRed ? "increased " : "decreased "} from{" "}
                              {event.previousprice} to {event.currentprice}.
                            </p>
                          </div>
                          <div className='text-right text-sm whitespace-nowrap text-gray-500'>
                            {updatedDate && (
                              <time dateTime={updatedDate.toLocaleDateString()}>
                                {updatedDate.toLocaleDateString()}
                              </time>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    );
  else return <div>Error...</div>;
};

export default ProductDetail;
