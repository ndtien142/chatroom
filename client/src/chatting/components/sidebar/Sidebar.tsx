import { useGetListUserSidebar } from "@/chatting/hooks/useGetListUserSidebar";
import ChattingMSGItem from "./ChattingMSGItem";
import ChattingSearch from "./ChattingSearch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateGroupModal } from "../dialog/ModelCreateGroupUser";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LucideUserRoundPlus } from "lucide-react";
import AddFriendModal from "../dialog/ModelAddNewFriend";
import { useSelector } from "@/common/redux/store";

const Sidebar = () => {
  const { data } = useGetListUserSidebar({
    limit: 10,
    page: 1,
    searchText: "",
  });
  const [openGroup, setOpenGroup] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const selectedConversation = useSelector(
    (state) => state.chatting.selectedConversation
  );

  const conversation = data?.pages?.flatMap((item) => item?.metadata?.items);

  return (
    <div
      className={`
        ${selectedConversation ? "hidden" : "flex"} 
        md:flex flex-col w-full md:w-auto
      `}
    >
      <aside className="relative w-3xs lg:w-80 bg-[#2F2F2F] flex flex-col h-full border-r border-gray-700/50">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex w-full p-2 justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Chats</h1>
            <div className="flex gap-2">
              <Button className="p-2" onClick={() => setOpenUser(true)}>
                <LucideUserRoundPlus />
              </Button>
              <Button className="p-2" onClick={() => setOpenGroup(true)}>
                <HiOutlineUserGroup />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <ChattingSearch />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          <ul>
            {conversation?.map((conversation, idx) => (
              <ChattingMSGItem
                key={`${conversation?._id} + ${idx}`}
                conversation={conversation}
              />
            ))}
          </ul>
        </nav>

        <CreateGroupModal open={openGroup} onOpenChange={setOpenGroup} />
        <AddFriendModal
          open={openUser}
          onOpenChange={setOpenUser}
          onSelectUser={(user) => {
            console.log("user", user);
          }}
        />
      </aside>
    </div>
  );
};

export default Sidebar;
