import type { IChatMessage } from "@/chatting/chatting.interface";
import { useState } from "react";
import { MOCK_DATA_CHATTING } from "./chatting.mock";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatOnboard = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([
    ...MOCK_DATA_CHATTING,
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
};

export default ChatOnboard;
