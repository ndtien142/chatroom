import type { IMeta } from "@/common/@types/common.interface";

export interface IChatMessage {
  _id: string;
  senderId: string;
  senderName: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  isSender: boolean;
  attachments?: IAttachment[];
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  avatar: string;
  online: boolean;
}

export interface IChattingState {
  selectedConversation: string | null;
  messages: IChatMessage[];
  users: IUser[];
  isUsersLoading: boolean;
  isMessageLoading: boolean;
}

export interface IGetListUserParams {
  page: number;
  limit: number;
  searchText: string;
}

export interface IListUserConversationResponse {
  message: string;
  status: number;
  metadata: { items: IUserConversationItem[]; meta: IMeta };
}

export interface IUserConversationItem {
  _id: string;
  avatar: string;
  name: string;
  createdAt: string;
  type: "direct" | "group";
  updatedAt: string;
  lastMessage: {
    _id: string;
    content: string;
    createdAt: string;
  };
  participants: IListParticipantItem[];
}

export interface IListParticipantItem {
  joinedAt: string;
  role: "member" | "admin";
  userId: string;
  _id: string;
}

export interface IGetMessageParams {
  page: number;
  limit: number;
  conversationId: string;
}

export interface IListMessageResponse {
  message: string;
  status: number;
  metadata: { items: IMessageItem[]; meta: IMeta };
}

export interface IMessageItem {
  _id: string;
  senderId: {
    _id: string;
    avatar: string;
    name: string;
  };
  conversationId: string;
  content: string;
  attachments: IAttachment;
  isDeleted: boolean;
  readBy: [];
}

export interface IAttachment {
  type: string;
  url: string;
  size: number;
  name: string;
}

export interface IFormSendMessage {
  text: string;
  conversationId: string;
}
