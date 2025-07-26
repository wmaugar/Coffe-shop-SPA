import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";
import { toastError, toastSuccess } from "../../ui/toastify";

export function useDeleteProduct() {
  // useQueryClient to access to cached data
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toastSuccess("product succesfully deleted");
      // when delete is completed, changing state to INVALIDATE, so trigger a re-fetch of data and re-render UI
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toastError(err.message),
  });

  return { isDeleting, deleteProduct };
}
