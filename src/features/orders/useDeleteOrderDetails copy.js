import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrderDetails as deleteOrderDetailsApi } from "../../services/apiOrderDetails";
import { toastError, toastSuccess } from "../../ui/toastify";

export function useDeleteOrderDetails() {
  // useQueryClient to access to cached data
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteOrderDetails } = useMutation({
    mutationFn: deleteOrderDetailsApi,
    onSuccess: () => {
      toastSuccess("Order details succesfully deleted");
      // when delete is completed, changing state to INVALIDATE, so trigger a re-fetch of data and re-render UI
      queryClient.invalidateQueries({
        queryKey: ["orderDetails"],
      });
    },
    onError: (err) => toastError(err.message),
  });

  return { isDeleting, deleteOrderDetails };
}
