import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";
import { getOrderDetailsById } from "../../services/apiOrderDetails";

export function useOrderDetails() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: orderDetails,
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    queryKey: ["orderDetails", orderId],
    //Here defines which function will be used to fetch data
    queryFn: () => getOrderDetailsById(orderId),
    //disable auto-retry (3times by default)
    retry: false,
  });

  return { isLoading, orderDetails, error };
}
