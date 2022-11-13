import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function CartItems({ item }) {
  const { handleRemoveFromCart } = useShoppingCart();
  // const item = storeItems.find((i) => i.id === id);
  // if (item == null) return null;

  console.log(item.price);

  return (
    <div className="flex border border-gray-300 shadow rounded-md p-4 max-w-md w-full mx-auto justify-between mt-2">
      <div className="flex">
        <img src={item?.image} alt="..error" className="w-28 h-24 mr-3" />
        <div className="display-col my-auto">
          <h2 className="font-bold">{item?.title}</h2>
          <h3>Price: {item?.price}</h3>
        </div>
      </div>
      <div className="display-col my-auto">
        {/* <div> {formatCurrency(item?.price * quantity)}</div> */}
        <button
          onClick={() => handleRemoveFromCart(item?.id)}
          className="p-1 mt-1 text-sm bg-slate-200 rounded-md hover:bg-slate-300"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
