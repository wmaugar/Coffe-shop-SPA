import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrderDetailsAfterDate } from "../../services/apiOrderDetails";

export function useRecentOrderDetails() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: orderDetails } = useQuery({
    queryFn: () => getOrderDetailsAfterDate(queryDate),
    queryKey: ["orderDetails", `last-${numDays}`],
  });

  return { isLoading, orderDetails, numDays };
}
