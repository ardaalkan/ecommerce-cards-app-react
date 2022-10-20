import { useQuery } from "react-query";

const useGetItems = (filters)=> {
  const getProducts = async (filter) =>
    await (
      await fetch(
        filter !== ""
          ? `https://fakestoreapi.com/products/category/${filter}`
          : `https://fakestoreapi.com/products`
      )
    ).json();
  return useQuery(["products", filters], () => getProducts(filters));
};

export default useGetItems;