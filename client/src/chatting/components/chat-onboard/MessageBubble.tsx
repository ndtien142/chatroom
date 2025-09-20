import type { IMessageItem } from "@/chatting/chatting.interface";
import { useSelector } from "@/common/redux/store";

const MessageBubble = ({ message }: { message: IMessageItem }) => {
  const currentUser = useSelector((state) => state.authLogin.userInfo._id);
  const avatar = useSelector((state) => state.authLogin.userInfo.avatar);
  const isSender =
    currentUser === message?.senderId?._id ||
    currentUser === (message?.senderId as unknown as string);

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      {!isSender ? (
        avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
        ) : (
          <div className="w-8 h-8 rounded-full object-cover mr-2 bg-[#5f74cf]" />
        )
      ) : (
        <></>
      )}

      <div
        className={`p-0 max-w-[300px] ${
          isSender ? "bg-white text-black" : "bg-[#D1C5FF] text-black"
        }`}
        style={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: isSender ? "20px" : "0px",
          borderBottomRightRadius: isSender ? "0px" : "20px",
        }}
      >
        <p className="font-[Inter] text-left px-4 py-3">
          {message.content || ""}
        </p>

        {message?.attachment && message.attachment?.type === "image" && (
          <div className="relative max-w-52 px-4 py-3">
            <img
              src={message.attachment?.url}
              alt="attachment"
              className={`rounded-[16px]`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
