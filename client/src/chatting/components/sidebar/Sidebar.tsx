import { useGetListUserSidebar } from "@/chatting/hooks/useGetListUserSidebar";
import ChattingMSGItem from "./ChattingMSGItem";
import ChattingSearch from "./ChattingSearch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateGroupModal } from "../dialog/ModelCreateGroupUser";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LucideUserRoundPlus } from "lucide-react";
import AddFriendModal from "../dialog/ModelAddNewFriend";

const Sidebar = () => {
  const { data, isLoading } = useGetListUserSidebar({
    limit: 10,
    page: 1,
    searchText: "",
  });
  const [openGroup, setOpenGroup] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const conversation = data?.pages?.flatMap((item) => item?.metadata?.items);

  return (
    <aside className="w-full sm:max-w-64 md:max-w-80 p-2 sm:p-1 overflow-hidden  ">
      <div>
        <div className="flex gap-2">
          <ChattingSearch />
          <div className="flex">
            <Button className="p-2" onClick={() => setOpenUser(true)}>
              <LucideUserRoundPlus />
            </Button>
            <Button className="p-2" onClick={() => setOpenGroup(true)}>
              <HiOutlineUserGroup />
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-2 flex-1 items-start overflow-y-auto h-[calc(100vh-12rem)] no-scrollbar overflow-scroll">
          {!isLoading &&
            conversation?.map((conversation, idx) => (
              <ChattingMSGItem
                key={`${conversation?._id} + ${idx}`}
                conversation={conversation}
              />
            ))}
        </div>
        <CreateGroupModal open={openGroup} onOpenChange={setOpenGroup} />
        <AddFriendModal
          open={openUser}
          onOpenChange={setOpenUser}
          onSelectUser={(user) => {
            console.log("user", user);
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
