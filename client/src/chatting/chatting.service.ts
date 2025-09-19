import axiosInstance from "@/common/utils/axios";
import type {
  IGetListUserParams,
  IListUserConversationResponse,
} from "./chatting.interface";
import { API_CHATTING_USERS } from "@/common/constants/api.constants";

export const getListUserSidebar = (params: IGetListUserParams) => {
  return axiosInstance.get<unknown, IListUserConversationResponse>(
    API_CHATTING_USERS,
    { params }
  );
};
