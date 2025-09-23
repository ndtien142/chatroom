import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../chatting.service";
import { QUERY_KEY } from "@/common/constants/querykey.constant";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return {
    ...useMutation({
      mutationFn: sendMessage,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEY.GET_LIST_CONVERSATION,
            QUERY_KEY.GET_LIST_MESSAGE,
          ],
        });
      },
    }),
  };
};
