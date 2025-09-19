import { toast } from "sonner";

export const useToast = () => {
  return {
    showSuccessMessage: (message: string) =>
      toast.success(message || "", {
        style: {
          color: "#6366f1",
        },
      }),
    showErrorMessage: (message: string) =>
      toast.error(message || "", {
        style: {
          color: "#ef4444",
        },
      }),
  };
};
