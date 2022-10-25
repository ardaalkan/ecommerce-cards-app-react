import React from "react";
import { useQuery } from "react-query";

// const SortOptions {
//     LOW_TO_HIGH = "Price low to high",
//     HIGH_TO_LOW = "Price high to low",
//   }

const FilterSort = ({ sort, setSort }) => {
  const onChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
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
        onChange={onChangeSort}
      >
        <option value="">--Please choose an sort--</option>
        {/* {Object.values().map((item) => (
          <option>{item}</option>
        ))} */}
        {sort && (
          <div
            className="p-4 bg-slate-500"
            onClick={() => {
              setSort(undefined);
            }}
          ></div>
        )}
      </select>
    </div>
  );
};

export default FilterSort;
