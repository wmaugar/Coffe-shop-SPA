import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getOrders } from "../../services/apiOrders";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // status=orderPlaced  & searchBy=companyUID-1 &  sortBy=companyUID-desc

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  //SEARCH BY
  const searchByRaw = searchParams.get("searchBy") || "";
  const [searchField, searchValue] = searchByRaw.split("-");
  const searchBy =
    !searchField || searchField === "all" || !searchValue
      ? null
      : {
          field: searchField,
          value: searchValue,
        };

  // SORT
  const sortyByRaw = searchParams.get("sortBy") || "id-asc";

  const [field, direction] = sortyByRaw.split("-");

  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: orders, count } = {},
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    // it works as a dependency array of useEffect, if any of this parameters changes, it will REFETCH
    queryKey: ["orders", filter, searchBy, sortBy, page],
    //Here defines which function will be used to fetch data
    queryFn: () => getOrders({ filter, searchBy, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, searchBy, sortBy, page + 1],
      queryFn: () => getOrders({ filter, searchBy, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", filter, searchBy, sortBy, page - 1],
      queryFn: () => getOrders({ filter, searchBy, sortBy, page: page - 1 }),
    });

  return { isLoading, orders, error, count };
}
