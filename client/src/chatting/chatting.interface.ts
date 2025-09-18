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
