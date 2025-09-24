import { QUERY_KEY } from "@/common/constants/querykey.constant";
import { useQuery } from "@tanstack/react-query";
import { getDetailConversation } from "../chatting.service";

export const useGetDetailConversation = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_DETAIL_CONVERSATION, id],
    queryFn: () => getDetailConversation(id),
    enabled: !!id,
  });
};
