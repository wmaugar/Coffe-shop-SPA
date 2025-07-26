import { useQuery } from "@tanstack/react-query";
import { getOrdersAfterDate } from "../../services/apiOrders";
import { getToday } from "../../utils/helpers";

export function useTodayOrders() {
  const queryDate = getToday();

  const { isLoading, data: orders } = useQuery({
    queryFn: () => getOrdersAfterDate(queryDate),
    queryKey: ["orders", `today`],
  });

  return { isLoading, orders };
}
