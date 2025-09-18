export interface IChattingMSGProps {
  avatar: string[];
  status: string;
  title: string;
  timeLatestSent: string;
  msgLatest: {
    name: string;
    msg: string;
  };
  unread: number;
  isMute: boolean;
}

export interface IChattingState {
  selectedUserOrGroup: string | null;
  messages: [];
  users: [];
  isUsersLoading: boolean;
  isMessageLoading: boolean;
}

export interface IAttachment {
  type: string;
  url: string;
  isLocked?: boolean;
}

export interface IChatMessage {
  sender: string;
  timestamp: string;
  message: string;
  avatarUrl: string;
  isSender: boolean;
  attachment?: IAttachment;
}

export interface IChatroomInfo {
  title: string;
  subtitle: string;
  image: string;
  imageBackground: string;
}
