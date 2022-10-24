import React from "react";
import { useQuery } from "react-query";

const FilterCategory = ({ filter, setFilter }) => {
  const getCategories = async () =>
    await (await fetch("https://fakestoreapi.com/products/categories")).json();

  const { data, isLoading, error } = useQuery("categories", getCategories);

  if (isLoading) return <span>loading</span>;

  if (error) return <div>Something went wrong...</div>;

  const onChangeCategory = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Filter items by category</h1>
      <select
        className="form-select appearance-none
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        name="filter"
        id="filter-select"
        value={filter ?? ""}
        onChange={onChangeCategory}
      >
        <option value="">--Please choose an option--</option>
        {data.map((item) => (
          <option>{item}</option>
        ))}
        {filter && (
          <div
            className="p-4 bg-slate-500"
            onClick={() => {
              setFilter("");
            }}
          ></div>
        )}
      </select>
    </div>
  );
};

export default FilterCategory;
