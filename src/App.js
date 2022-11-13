import { useState, useEffect, useCallback } from "react";
import "./App.css";
import useGetItems from "./hooks/useGetItems";
import FilterCategory from "./components/FilterCategory";
import FilterSort from "./components/FilterSort";
import Cards from "./components/Cards";
import CartButton from "./components/CartButton";
import { useShoppingCart } from "./context/ShoppingCartContext";

export const objects = {
  LOW_TO_HIGH: "Price low to high",
  HIGH_TO_LOW: "Price high to low",
};

const App = () => {
  const [state, setState] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState();
  const { status, data } = useGetItems(selectedFilter ?? "");
  const { openCart } = useShoppingCart();

  useEffect(() => {
    if (status === "success") {
      setState(data);
    }
  }, [status, data]);

  const sortItemsByPrice = useCallback(() => {
    if (selectedSort === "Price low to high") {
      setState((prev) => {
        return [...prev].sort((a, b) => a.price - b.price);
      });
    } else if (selectedSort === "Price high to low") {
      setState((prev) => {
        return [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [selectedSort, setState]);

  // useEffect(() => {
  //   if (selectedSort) {
  //     sortItemsByPrice();
  //   } else if (selectedSort === undefined || selectedSort === "") {
  //     setState(data);
  //   }
  // }, [selectedSort, data, setState]);

  return (
    <section className="w-full h-24 p-6">
      <div className="flex bg-gray-200 p-6 rounded-xl justify-between">
        <div>
          <FilterCategory
            filter={selectedFilter}
            setFilter={setSelectedFilter}
          />
          <FilterSort sort={selectedSort} setSort={setSelectedSort} />
        </div>
        <CartButton open={openCart} />
      </div>
      <div className="w-4/5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {state.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default App;
