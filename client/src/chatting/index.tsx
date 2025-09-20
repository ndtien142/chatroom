import Sidebar from "@/chatting/components/sidebar/Sidebar";
import ChatOnboard from "./components/chat-onboard/ChatOnboard";
import { useSelector } from "@/common/redux/store";
import NoChatSelector from "./components/NoChatSelected";

const ChattingContainer = () => {
  const selectedConversation = useSelector(
    (state) => state.chatting.selectedConversation
  );
  return (
    <div className="w-[100%] flex h-[calc(100vh-4rem)] p-0 md:p-3 shadow-2xl shadow-[rgba(255,255,255,0.1)] ">
      <div className="w-full max-w-7xl flex bg-[#1e1e1e] sm:rounded-2xl md:border sm:border-[rgba(255,255,255,0.08)] shadow-2xl shadow-[rgba(255,255,255,0.1)] p-3 md:p-4 md:flex-1 ">
        {/* SIDE BAR */}
        <Sidebar />
        {/* MESSAGE */}
        <main className="hidden sm:block sm:flex-1">
          {selectedConversation ? <ChatOnboard /> : <NoChatSelector />}
        </main>
        {/* MEDIA */}
      </div>
    </div>
  );
};

export default ChattingContainer;
