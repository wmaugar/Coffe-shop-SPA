import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import { toastError, toastSuccess } from "../../ui/toastify";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  //
  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: createEditProduct,
    onSuccess: () => {
      toastSuccess("New product succesfully created");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      // clear form using reset function from react-hook-form
      //reset();
    },
    onError: (err) => toastError(err.message),
  });

  return { isCreating, createProduct };
}
