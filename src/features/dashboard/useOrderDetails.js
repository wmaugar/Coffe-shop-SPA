import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../services/apiOrderDetails";

export function useOrderDetails() {
  const {
    isLoading,
    error,
    data: orderDetails,
  } = useQuery({
    queryKey: ["orderDetails"],
    queryFn: getOrderDetails,
  });
  return { isLoading, error, orderDetails };
}
