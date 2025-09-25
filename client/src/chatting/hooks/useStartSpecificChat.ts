import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findOrCreateConversation } from "../chatting.service";
import { QUERY_KEY } from "@/common/constants/querykey.constant";
import type {
  IDataAddNewFriend,
  IDetailConversationResponse,
} from "../chatting.interface";
import { dispatch } from "@/common/redux/store";
import { setSelectedConversation } from "../chatting.slice";

export const useStartSpecificChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IDataAddNewFriend) => {
      const response = await findOrCreateConversation(data);
      return response.data as IDetailConversationResponse;
    },
    onSuccess: (data: IDetailConversationResponse) => {
      dispatch(setSelectedConversation(data?.metadata?._id));
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DETAIL_CONVERSATION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LIST_CONVERSATION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LIST_MESSAGE],
      });
    },
  });
};
