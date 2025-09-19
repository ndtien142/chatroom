import type { IMeta } from "@/common/@types/common.interface";

export interface IAttachment {
  type: string;
  url: string;
  isLocked?: boolean;
}

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
  selectedUserOrGroup: string | null;
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
  lastMessage: string;
  participants: IListParticipantItem[];
}

export interface IListParticipantItem {
  joinedAt: string;
  role: "member" | "admin";
  userId: string;
  _id: string;
}
