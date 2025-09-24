import type { IMessageItem } from "@/chatting/chatting.interface";

const MessageContent = (message: IMessageItem) => {
  if (message?.attachment?.type === "image") {
    const hasText = message?.content && message?.content?.trim().length > 0;
    return (
      <div className={!hasText ? "p-1" : ""}>
        <img
          src={message?.attachment?.url}
          alt={message?.attachment?.name}
          className={`max-w-xs rounded-lg object-cover ${
            hasText ? "mb-2" : ""
          }`}
        />
        {hasText && <p className="text-base px-3 pb-3">{message?.content}</p>}
      </div>
    );
  }

  return <p className="text-base p-3">{message?.content}</p>;
};

export default MessageContent;
