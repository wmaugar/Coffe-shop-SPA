import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../../ui/toastify";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toastSuccess("User account succesfully updated");
      //this query client method will inmediatelly put our new user in our cache.
      // This is used instead of "invalidateQueries" to trigger a re-render
      queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toastError(err.message),
  });

  return { isUpdating, updateUser };
}
