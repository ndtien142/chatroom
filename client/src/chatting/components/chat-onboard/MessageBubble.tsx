import type { IChatMessage } from "@/chatting/chatting.interface";
import { FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  message: IChatMessage;
}

const MessageBubble = ({ message }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex ${
        message.isSender ? "justify-end" : "justify-start"
      } mb-2`}
    >
      {!message.isSender && (
        <img
          src={message.avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
      )}

      <div
        className={`p-0 max-w-[300px] ${
          message.isSender ? "bg-white text-black" : "bg-[#D1C5FF] text-black"
        }`}
        style={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: message.isSender ? "20px" : "0px",
          borderBottomRightRadius: message.isSender ? "0px" : "20px",
        }}
      >
        <p className="font-[Inter] text-left px-4 py-3">{message.message}</p>

        {message.attachment && message.attachment.type === "image" && (
          <div className="relative max-w-52 px-4 py-3">
            <img
              src={message.attachment.url}
              alt="attachment"
              className={`rounded-[16px] ${
                message.attachment.isLocked ? "blur-[8px]" : ""
              }`}
            />
            {message.attachment.isLocked && (
              <Button
                variant="outline"
                className="w-full mt-2 bg-transparent hover:bg-transparent border-black rounded-[24px]"
                onClick={() => navigate("/")}
              >
                <FaRegEyeSlash size={35} /> View image
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
