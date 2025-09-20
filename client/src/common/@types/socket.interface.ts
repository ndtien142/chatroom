export interface ISocketState {
  isConnected: boolean;
  messages: string[];
  error: Error | null;
}

export type SocketActions =
  | { type: "socket/connectSocket" }
  | { type: "socket/disconnectSocket" }
  | { type: "socket/sendMessage"; payload: string };
