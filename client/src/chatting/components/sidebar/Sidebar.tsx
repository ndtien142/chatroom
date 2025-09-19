import { useGetListUserSidebar } from "@/chatting/hooks/useGetListUserSidebar";
import ChattingMSGItem from "./ChattingMSGItem";
import ChattingSearch from "./ChattingSearch";

const Sidebar = () => {
  const { data } = useGetListUserSidebar({
    limit: 10,
    page: 1,
    searchText: "",
  });

  const conversation = data?.pages?.flatMap((item) => item?.metadata?.items);

  return (
    <aside className="w-full sm:max-w-64 md:max-w-80 p-2 sm:p-1 overflow-hidden sm:border-r-[1px] border-[#000000C7]">
      <div>
        <ChattingSearch />
        <div className="flex flex-col mt-2 flex-1 items-start overflow-y-auto h-[calc(100vh-12rem)] no-scrollbar overflow-scroll">
          {conversation?.map((conversation, idx) => (
            <ChattingMSGItem
              key={`${conversation?._id} + ${idx}`}
              conversation={conversation}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
