import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Cards = ({ item }) => {
  const { handleAddToCart } = useShoppingCart();

  return (
    <div className="mt-5 mb-5 m-auto max-w-sm min-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg max-h-80 mx-auto rounded-md mt-6 h-96 w-60"
        src={item?.image}
        alt="hata-resim"
      />
      <div className="p-5 bg-slate-800 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item?.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <span
          onClick={() => handleAddToCart(item)}
          href="#"
          className="cursor-pointer   inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Cards;
