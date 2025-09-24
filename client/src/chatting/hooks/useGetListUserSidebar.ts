import { QUERY_KEY } from "@/common/constants/querykey.constant";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getListUserSidebar } from "../chatting.service";
import type { IGetListUserParams } from "../chatting.interface";
import { useSelector } from "@/common/redux/store";

export const useGetListUserSidebar = (params: IGetListUserParams) => {
  const userId = useSelector((state) => state.authLogin?.userInfo?._id);
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_LIST_CONVERSATION, userId],
    queryFn: ({ pageParam = 1 }) =>
      getListUserSidebar({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.metadata?.meta?.currentPage;
      const totalPages = lastPage?.metadata?.meta?.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
