import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getProducts } from "../../services/apiProducts";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue1 = searchParams.get("category");
  const filterValue2 = searchParams.get("isAvailable");

  const filter1 =
    !filterValue1 || filterValue1 === "all"
      ? null
      : { field: "category", value: filterValue1 };

  const filter2 =
    !filterValue2 || filterValue2 === "all"
      ? null
      : {
          field: "isAvailable",
          value: filterValue2 === "available" ? true : false,
        };

  // SORT
  const sortyByRaw = searchParams.get("sortBy") || "productName-asc";

  const [field, direction] = sortyByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    // it works as a dependency array of useEffect, if any of this parameters changes, it will REFETCH
    queryKey: ["products", filter1, filter2, sortBy, page],
    //Here defines which function will be used to fetch data
    queryFn: () => getProducts({ filter1, filter2, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["products", filter1, filter2, sortBy, page + 1],
      queryFn: () => getProducts({ filter1, filter2, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", filter1, filter2, sortBy, page - 1],
      queryFn: () => getProducts({ filter1, filter2, sortBy, page: page - 1 }),
    });

  return { isLoading, products, error, count };
}
