import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { toast, Flip } from "react-toastify";
import { correctionItemName } from "../utils/string";
import useGetItems from "../hooks/useGetItems";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const { data, isLoading } = useGetItems(category);

  useEffect(() => {
    setProducts(data);
  }, [data, isLoading]);

  function getTotalItems(items) {
    if (!items) return 0;
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

      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });

    toast.success(`${correctionItemName(clickedItem.title)} added to cart!`, {
      autoClose: 1500,
      position: "bottom-right",
      transition: Flip,
    });
  };

  const handleRemoveFromCart = (id) => {
    let title = "";
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          title = item.title;

          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );

    if (title)
      toast.info(`${correctionItemName(title)} removed from cart!`, {
        autoClose: 1500,
        position: "bottom-right",
        transition: Flip,
      });
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
        products,
        setProducts,
        setCategory,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
