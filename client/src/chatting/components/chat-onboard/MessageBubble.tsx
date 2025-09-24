import type { IMessageItem } from "@/chatting/chatting.interface";
import { formatTimestamp } from "@/common/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageContent from "./MessageContent";

const MessageBubble = ({
  message,
  isSender,
  showSenderName,
}: {
  message: IMessageItem;
  showSenderName: boolean;
  isSender: boolean;
}) => {
  const bubbleBg = isSender
    ? "bg-[#ff99e2] text-black"
    : "bg-[#3A3A3A] text-gray-100";
  const bubbleRadius = isSender
    ? "rounded-l-2xl rounded-tr-2xl"
    : "rounded-r-2xl rounded-tl-2xl";

  if (isSender) {
    return (
      <div className="flex justify-end items-end gap-3 my-2">
        <div className="flex flex-col items-end">
          <div
            className={`${bubbleBg} ${bubbleRadius} max-w-sm md:max-w-md lg:max-w-lg overflow-hidden`}
          >
            <MessageContent {...message} />
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatTimestamp(message.createdAt)}
          </span>
        </div>
        <Avatar>
          <AvatarImage src={message?.senderId?._id} />
          <AvatarFallback className="bg-zinc-800">AV</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-end gap-3 my-2">
      <Avatar>
        <AvatarImage src={message?.senderId?._id} />
        <AvatarFallback className="bg-zinc-700">AV</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        {showSenderName && (
          <p className="text-xs text-gray-400 ml-3 mb-1">
            {message?.senderId?.name}
          </p>
        )}
        <div
          className={`${bubbleBg} ${bubbleRadius} max-w-sm md:max-w-md lg:max-w-lg overflow-hidden`}
        >
          <MessageContent {...message} />
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formatTimestamp(message?.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
