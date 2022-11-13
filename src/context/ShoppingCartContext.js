import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { ToastContainer, toast, Flip } from "react-toastify";
import { correctionItemName } from "../utils/string";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getTotalItems(items) {
    return items.reduce((acc, item) => acc + item.amount, 0);
  }

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // toast.success(`${correctionItemName(clickedItem.title)} added to cart!`, {
      //   autoClose: 1500,
      //   position: "bottom-right",
      //   transition: Flip,
      // });
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            toast.info(`${correctionItemName(item.title)} removed from cart!`, {
              autoClose: 1500,
              position: "bottom-right",
              transition: Flip,
            });
            return ack;
          }
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      })
    );
  };

  function removeAllItemsFromCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        setCartItems,
        closeCart,
        openCart,
        getTotalItems,
        handleAddToCart,
        handleRemoveFromCart,
        removeAllItemsFromCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
