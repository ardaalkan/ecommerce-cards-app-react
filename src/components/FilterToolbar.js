import React from "react";
import { useQuery } from "react-query";

const FilterToolbar = ({ filter, setFilter }) => {
  const getCategories = async () =>
    await (await fetch("https://fakestoreapi.com/products/categories")).json();

  const { data, isLoading, error } = useQuery("categories", getCategories);

  if (isLoading) return <span>loading</span>;

  if (error) return <div>Something went wrong...</div>;

  const onChangeCategory = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="bg-gray-200 p-6 rounded-xl">
      <h1>Filter items by category</h1>
      <select
        name="pets"
        id="pet-select"
        value={filter ?? ""}
        onChange={onChangeCategory}
      >
        <option value="">--Please choose an option--</option>
        {data.map((item) => (
          <option>{item}</option>
        ))}
        {filter && (
          <div
            className="p-4 bg-slate-300"
            onClick={() => {
              setFilter("");
            }}
          ></div>
        )}
      </select>
    </div>
  );
};

export default FilterToolbar;
