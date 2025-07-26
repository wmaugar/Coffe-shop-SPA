import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderDetails } from "../../services/apiOrderDetails";
import { toastError, toastSuccess } from "../../ui/toastify";
import { useParams } from "react-router";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrders";

export function useDeleteOrder() {
  const { orderId } = useParams();
  // useQueryClient to access to cached data
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderDetails,
    onSuccess: () => {
      toastSuccess("Order details succesfully deleted");
      // when delete is completed, changing state to INVALIDATE, so trigger a re-fetch of data and re-render UI
      deleteOrderApi(orderId);
      queryClient.invalidateQueries({
        queryKey: ["orderDetails, orders"],
      });
    },
    onError: (err) => toastError(err.message),
  });

  return { isDeleting, deleteOrder };
}
