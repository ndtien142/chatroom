import Sidebar from "@/chatting/components/sidebar/Sidebar";
import ChatOnboard from "./components/chat-onboard/ChatOnboard";
import { useSelector } from "@/common/redux/store";
import NoChatSelector from "./components/NoChatSelected";

const ChattingContainer = () => {
  const selectedConversation = useSelector(
    (state) => state.chatting.selectedConversation
  );
  return (
    <>
      {/* SIDE BAR */}
      <Sidebar />
      {/* MESSAGE */}
      <main
        className={`
        ${selectedConversation ? "flex" : "hidden"}
        md:flex flex-1 flex-col bg-[#242424] transition-all duration-300
      `}
      >
        {selectedConversation ? <ChatOnboard /> : <NoChatSelector />}
      </main>
      {/* MEDIA */}
    </>
  );
};

export default ChattingContainer;
