import axiosInstance from "@/common/utils/axios";
import type {
  IGetListUserParams,
  IGetMessageParams,
  IListMessageResponse,
  IListUserConversationResponse,
} from "./chatting.interface";
import {
  API_CHATTING_USERS,
  API_MESSAGE,
} from "@/common/constants/api.constants";

export const getListUserSidebar = (params: IGetListUserParams) => {
  return axiosInstance.get<unknown, IListUserConversationResponse>(
    API_CHATTING_USERS,
    { params }
  );
};

export const getMessage = (params: IGetMessageParams) => {
  const url = `${API_MESSAGE}/${params.conversationId}`;
  return axiosInstance.get<unknown, IListMessageResponse>(url, {
    params,
  });
};

export const sendMessage = (data: FormData) => {
  return axiosInstance.post(API_MESSAGE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
