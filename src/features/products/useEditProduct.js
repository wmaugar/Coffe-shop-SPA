import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import { toastError, toastSuccess } from "../../ui/toastify";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    // can only pass one element to mutation Fn, for this is neccesary to use a callback function to pass 2 elements as arguments
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      toastSuccess("product succesfully edited");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      // clear form using reset function from react-hook-form
    },
    onError: (err) => toastError(err.message),
  });

  return { isEditing, editProduct };
}
