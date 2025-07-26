import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../../ui/toastify";
import { updateOrder as updateOrderApi } from "../../services/apiOrders";

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutate: updateOrder, isLoading } = useMutation({
    // can only pass one element to mutation Fn, for this is neccesary to use a callback function to pass 2 elements as arguments
    mutationFn: ({ id, newOrderData }) => updateOrderApi(id, newOrderData),
    onSuccess: () => {
      toastSuccess("order succesfully updated");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      // clear form using reset function from react-hook-form
    },
    onError: (err) => toastError(err.message),
  });

  return { isLoading, updateOrder };
}
