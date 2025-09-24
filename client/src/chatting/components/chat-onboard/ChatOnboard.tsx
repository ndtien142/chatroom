import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatOnboard = () => {
  return (
    <div className="flex flex-col h-full bg-[#242424] rounded-r-2xl">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatOnboard;
