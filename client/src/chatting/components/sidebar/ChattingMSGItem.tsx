// Types
// React Icon
import type { IUserConversationItem } from "@/chatting/chatting.interface";
import { setSelectedConversation } from "@/chatting/chatting.slice";
import { dispatch, useSelector } from "@/common/redux/store";

const ChattingMSGItem = ({
  conversation,
}: {
  conversation: IUserConversationItem;
}) => {
  const currentConversation = useSelector(
    (state) => state.chatting?.selectedConversation
  );
  const handleSelectConversation = () => {
    dispatch(setSelectedConversation(conversation?._id));
  };
  return (
    <div
      onClick={handleSelectConversation}
      className={`flex gap-2 w-full min-h-16 hover:bg-zinc-700/60 cursor-pointer px-1.5 rounded-md ${
        currentConversation === conversation?._id &&
        "background-color: bg-zinc-700/60"
      }`}
    >
      <div className="min-w-12 min-h-12 flex items-center justify-center relative">
        <div className="rounded-[50%] w-12 h-12 bg-blue-400">
          {/* Avatar */}
          <img
            src={conversation?.avatar ? conversation?.avatar : "test"}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* {status === "online" && (
          <div className="bg-lime-600 rounded-full w-2.5 h-2.5 absolute bottom-1.5 right-2" />
        )} */}
      </div>
      {/* Message and notification */}
      <div className="flex flex-col flex-1 py-2.5">
        <div className="flex items-center justify-between">
          <div className="w-[calc(100% - 4rem)]">
            <h3 className="font-bold text-md text-left truncate max-w-[150px]">
              {conversation?.name}
            </h3>
          </div>
          {/* <div className="flex gap-0.5">
            {isMute && <FaBellSlash className="w-2.5 h-2.5 shrink-0" />}
            <span className="text-[10px]">{timeLatestSent}</span>
          </div> */}
        </div>
        <div className="flex items-center justify-between truncate">
          <div>
            {conversation?.lastMessage && (
              <>
                <span className="text-[14px]">
                  {conversation?.lastMessage?.senderId?.name || ""} :{" "}
                </span>
                <span className="text-[14px]">
                  {conversation?.lastMessage?.content
                    ? conversation.lastMessage.content.length > 20
                      ? conversation.lastMessage.content.slice(0, 25) + "..."
                      : conversation.lastMessage.content
                    : ""}
                </span>
              </>
            )}
          </div>
          {/* <div>
            {unread && (
              <div className="w-3.5 h-3.5 rounded-full bg-blue-300 text-[10px] text-black font-bold">
                {unread}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChattingMSGItem;
