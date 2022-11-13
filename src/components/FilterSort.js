import React from "react";
import { objects } from "../App";

const FilterSort = ({ sort, setSort }) => {

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <>
      <h1>Filter items by sort</h1>
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
        value={sort ?? ""}
        onChange={handleSortChange}
      >
        <option value="">--Please choose an sort--</option>
        {/* TODO: Define to object values */}
        {objects.values.map((item) => (
          <option key={item}>{item}</option>
        ))}
        {sort && (
          <div
            className="p-4 bg-slate-500"
            onClick={() => {
              setSort(undefined);
            }}
          ></div>
        )}
      </select>
    </>
  );
};

export default FilterSort;
