import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatOnboard = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatOnboard;
