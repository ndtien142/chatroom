import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessage } from "../chatting.service"; // import hàm axios của bạn
import { QUERY_KEY } from "@/common/constants/querykey.constant";

export const useGetMessage = ({
  limit,
  conversationId,
}: {
  limit: number;
  conversationId: string;
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_LIST_MESSAGE, conversationId],
    queryFn: ({ pageParam = 1 }) =>
      getMessage({ limit, page: pageParam, conversationId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.metadata?.meta?.currentPage;
      const totalPages = lastPage?.metadata?.meta?.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
