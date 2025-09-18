import ChattingMSGItem from "./ChattingMSGItem";
import ChattingSearch from "./ChattingSearch";

const Sidebar = () => {
  return (
    <aside className="w-full sm:max-w-64 md:max-w-80 p-2 sm:p-1 overflow-hidden sm:border-r-[1px] border-[#000000C7]">
      <div>
        <ChattingSearch />
        <div className="flex flex-col mt-2 flex-1 items-start overflow-y-auto h-[calc(100vh-12rem)] no-scrollbar overflow-scroll">
          {Array.from({ length: 20 }).map((_, idx) => (
            <ChattingMSGItem
              avatar={[""]}
              msgLatest={{
                msg: "Message",
                name: "TIen nguyen",
              }}
              status="online"
              timeLatestSent=""
              title=""
              unread={10}
              isMute={idx % 2 == 0 ? true : false}
              key={idx}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
