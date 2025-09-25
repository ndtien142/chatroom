import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  InfoIcon,
  LogOutIcon,
  MenuIcon,
  PhoneIcon,
  VideoIcon,
} from "lucide-react";
import { dispatch, useSelector } from "@/common/redux/store";
import { setLogout } from "@/auth/auth.slice";
import { useGetDetailConversation } from "@/chatting/hooks/useGetDetailConversation";

const ChatHeader = () => {
  const handleLogout = () => {
    dispatch(setLogout());
  };
  const currentConversationId = useSelector(
    (state) => state.chatting.selectedConversation
  );
  const currentUser = useSelector((state) => state.authLogin.userInfo._id);

  const { data } = useGetDetailConversation(currentConversationId || "");

  return (
    <header className="flex items-center justify-between p-2.5 bg-[#2F2F2F] border-b border-gray-700/50">
      <div className="flex items-center">
        <button className="mr-2 text-gray-400 hover:text-white md:hidden transition-colors">
          <IoArrowBack className="w-4 h-4" />
        </button>

        <Avatar>
          <AvatarImage src={data?.metadata?.avatar} />
          <AvatarFallback className="dark:bg-zinc-400 bg-zinc-800">
            AV
          </AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="text-sm font-semibold text-white">
            {data?.metadata?.type === "group" && data?.metadata.name}
            {(data?.metadata?.type === "direct" &&
              data?.metadata?.participants?.find(
                (user) => user?.userId?._id !== currentUser
              )?.userId?.name) ||
              ""}
          </h2>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="text-gray-400 hover:text-white transition-colors p-1">
          <PhoneIcon className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors p-1">
          <VideoIcon className="w-4 h-4" />
        </button>
        <button
          title="Conversation Info"
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <InfoIcon className="w-4 h-4" />
        </button>
        <button className="hidden text-gray-400 hover:text-white transition-colors p-1">
          <MenuIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleLogout}
          title="Logout"
          className="hidden sm:block text-gray-400 hover:text-white transition-colors p-1"
        >
          <LogOutIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
