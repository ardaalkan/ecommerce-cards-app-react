import { useQuery } from "react-query";

const getProducts = async (filter) =>
  await (
    await fetch(
      filter !== ""
        ? `https://fakestoreapi.com/products/category/${filter}`
        : `https://fakestoreapi.com/products`
    )
  ).json();

const useGetItems = (filters) => {
  return useQuery(
    ["products", filters],
    async () => await getProducts(filters)
  );
};

export default useGetItems;
