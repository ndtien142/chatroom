import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../chatting.service";

export const useSendMessage = () => {
  return {
    ...useMutation({
      mutationFn: sendMessage,
    }),
  };
};
