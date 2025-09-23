import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../chatting.service";
import type { ICallbackQuery } from "@/common/@types/common.interface";
import { QUERY_KEY } from "@/common/constants/querykey.constant";

export const useCreateGroupChat = ({ onError, onSuccess }: ICallbackQuery) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation({
      mutationFn: createGroup,
      onError,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_LIST_CONVERSATION],
        });
        onSuccess();
      },
    }),
  };
};
