import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toastSuccess } from "../../ui/toastify";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toastSuccess(
        "Account successfully created! Please verify the new account form the user's email address."
      );
    },
  });
  return { signup, isLoading };
}
