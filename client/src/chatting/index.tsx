import Sidebar from "@/chatting/components/sidebar/Sidebar";

const ChattingContainer = () => {
  return (
    <div className="w-[100%] flex h-[calc(100vh-4rem)] p-2 md:p-3 shadow-2xl shadow-[rgba(255,255,255,0.1)] rounded-lg">
      <div className="w-full max-w-7xl flex rounded-2xl bg-[#1e1e1e] border border-[rgba(255,255,255,0.08)]         shadow-2xl shadow-[rgba(255,255,255,0.1)] p-3 md:p-4">
        {/* SIDE BAR */}
        <Sidebar />
        {/* MESSAGE */}
        <main className="sm:hidden lg:block flex-1"></main>
        {/* MEDIA */}
      </div>
    </div>
  );
};

export default ChattingContainer;
