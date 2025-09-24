// Types
// React Icon
import type { IConversationItem } from "@/chatting/chatting.interface";
import { setSelectedConversation } from "@/chatting/chatting.slice";
import { dispatch, useSelector } from "@/common/redux/store";
import { formatTimestamp } from "@/common/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChattingMSGItem = ({
  conversation,
}: {
  conversation: IConversationItem;
}) => {
  const currentConversation = useSelector(
    (state) => state.chatting?.selectedConversation
  );
  const handleSelectConversation = () => {
    dispatch(setSelectedConversation(conversation?._id));
  };
  return (
    <li
      onClick={handleSelectConversation}
      className={`flex items-center p-3 cursor-pointer rounded-xl transition-colors duration-200 ${
        currentConversation === conversation._id
          ? "bg-[#ff99e2]/20"
          : "hover:bg-gray-800/60"
      }`}
    >
      <Avatar>
        <AvatarImage src={conversation?.avatar} />
        <AvatarFallback className="bg-zinc-700" />
      </Avatar>
      <div className="ml-4 flex-grow overflow-hidden">
        <div className="flex justify-between items-baseline">
          <p className="text-md font-semibold text-gray-100 truncate">
            {conversation.name}
          </p>
          <p className="text-xs text-gray-400 flex-shrink-0">
            {formatTimestamp(conversation.lastMessage?.createdAt)}
          </p>
        </div>
        <div className="flex justify-between items-start mt-1">
          <p className="text-sm text-gray-400 truncate pr-2">
            {conversation.lastMessage?.content}
          </p>
          {/* {conversation.unreadCount > 0 && (
            <span className="flex-shrink-0 bg-[#ff99e2] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {conversation.unreadCount}
            </span>
          )} */}
        </div>
      </div>
    </li>
  );
};

export default ChattingMSGItem;
