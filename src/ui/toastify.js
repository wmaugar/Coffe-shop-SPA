import { toast } from "react-toastify";

export function toastSuccess(message) {
  toast.success(message, {
    position: "top-right",
  });
}

export function toastError(message) {
  toast.error(message, {
    position: "top-left",
  });
}
export function toastInfo(message) {
  toast.info(message, {
    position: "top-center",
  });
}

export function toastDark(message) {
  toast.dark("Hey 👋!", {
    position: "bottom-right",
  });
}
export function toastWarn(message) {
  toast.warn(message, {
    position: "bottom-left",
  });
}
