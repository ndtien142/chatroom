import { QUERY_KEY } from "@/common/constants/querykey.constant";
import { useQuery } from "@tanstack/react-query";
import type { IListUserParams } from "../chatting.interface";
import { getListUser } from "../chatting.service";

export const useGetListUser = (params: IListUserParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LIST_USER, params],
    queryFn: () => getListUser(params),
    select: (data) => data?.metadata?.items,
  });
};
