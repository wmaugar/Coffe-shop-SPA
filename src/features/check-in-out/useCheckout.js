import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../starter/services/apiBookings";
import { toastError, toastSuccess } from "../../ui/toastify";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toastSuccess(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toastError("There was an error while checking out "),
  });
  return { checkout, isCheckingOut };
}
