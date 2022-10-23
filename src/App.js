import { useState, useEffect } from "react";
import "./App.css";
import useGetItems from "./hooks/useGetItems";
import FilterCategory from "./components/FilterCategory";
import Cards from "./components/Cards";
import CartButton from "./components/CartButton";
import { useShoppingCart } from "./context/ShoppingCartContext";

const App = () => {
  const [state, setState] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const { status, data, isLoading, error } = useGetItems(selectedFilter ?? "");
  const { openCart } = useShoppingCart();

  useEffect(() => {
    if (status === "success") {
      setState(data);
    }
  }, [status, data]);

  console.log(state);

  return (
    <section className="w-full h-24 p-6">
      <div className="flex bg-gray-200 p-6 rounded-xl justify-between">
        <FilterCategory filter={selectedFilter} setFilter={setSelectedFilter} />
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
