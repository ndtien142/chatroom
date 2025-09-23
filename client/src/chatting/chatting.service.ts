import axiosInstance from "@/common/utils/axios";
import type {
  IGetListUserParams,
  IGetMessageParams,
  IListMessageResponse,
  IListUserConversationResponse,
  IListUserParams,
  IListUserResponse,
} from "./chatting.interface";
import {
  API_CHATTING_USERS,
  API_GROUP_CHAT,
  API_LIST_USER,
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

export const getListUser = (params: IListUserParams) => {
  return axiosInstance.get<unknown, IListUserResponse>(API_LIST_USER, {
    params,
  });
};

// Group chat
export const createGroup = (data: FormData) => {
  return axiosInstance.post(API_GROUP_CHAT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
