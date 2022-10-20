import { useState, useEffect } from "react";
import "./App.css";
import useGetItems from "./hooks/useGetItems";
import FilterToolbar from "./components/FilterToolbar";
import Cards from "./components/Cards";

const App = () => {
  const [state, setState] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const { status, data, isLoading, error } = useGetItems(selectedFilter ?? "");

  console.log(selectedFilter);

  useEffect(() => {
    if (status === "success") {
      setState(data);
    }
  }, [status, data]);

  console.log(state);

  return (
    <div>
      <section className="w-full h-24 p-6">
        <FilterToolbar filter={selectedFilter} setFilter={setSelectedFilter} />
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          {state.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
