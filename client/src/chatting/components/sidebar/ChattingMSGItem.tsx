// Types
import type { IChattingMSGProps } from "../../chatting.interface";
// React Icon
import { FaBellSlash } from "react-icons/fa";

const ChattingMSGItem = ({
  avatar,
  msgLatest,
  status,
  timeLatestSent,
  title,
  unread,
  isMute,
}: IChattingMSGProps) => {
  return (
    <div className="flex gap-2 w-full min-h-16 hover:bg-zinc-700/60 cursor-pointer px-1.5">
      <div className="min-w-12 min-h-12 flex items-center justify-center relative">
        <div className="rounded-[50%] w-12 h-12 bg-blue-400">
          {/* Avatar */}
          <img src={avatar[0] ? avatar[0] : "test"} alt="avatar" />
        </div>
        {status === "online" && (
          <div className="bg-lime-600 rounded-full w-2.5 h-2.5 absolute bottom-1.5 right-2" />
        )}
      </div>
      {/* Message and notification */}
      <div className="flex flex-col flex-1 py-2.5">
        <div className="flex items-center justify-between">
          <div className="w-[calc(100% - 4rem)]">
            <h3 className="font-bold text-md text-left truncate max-w-[150px]">
              {title}
            </h3>
          </div>
          <div className="flex gap-0.5">
            {isMute && <FaBellSlash className="w-2.5 h-2.5 shrink-0" />}
            <span className="text-[10px]">{timeLatestSent}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[14px]">{msgLatest?.name}:</span>
            <span className="text-[14px]">{msgLatest?.msg || ""}</span>
          </div>
          <div>
            {unread && (
              <div className="w-3.5 h-3.5 rounded-full bg-blue-300 text-[10px] text-black font-bold">
                {unread}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingMSGItem;
