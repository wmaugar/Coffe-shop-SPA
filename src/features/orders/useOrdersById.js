import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getOrdersById } from "../../services/apiOrders";

export function useOrdersById() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    queryKey: ["order", orderId],
    //Here defines which function will be used to fetch data
    queryFn: () => getOrdersById(orderId),
    //disable auto-retry (3times by default)
    retry: false,
  });

  return { isLoading, order, error };
}
