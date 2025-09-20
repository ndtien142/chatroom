import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatOnboard = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-zinc-900 rounded-r-2xl pb-2.5">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatOnboard;
