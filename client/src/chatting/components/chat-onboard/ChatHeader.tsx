import { PATH_MAIN } from "@/common/routes/path";
import { IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-[20px] font-bold"></h1>
      <IoImageOutline
        size={30}
        onClick={() => navigate(PATH_MAIN.chatting.room)}
      />
    </div>
  );
};

export default ChatHeader;
