import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useGetMessage } from "@/chatting/hooks/useGetMessage";
import { useSelector } from "@/common/redux/store";

const MessageList = () => {
  const selectedConversation = useSelector(
    (state) => state.chatting.selectedConversation
  );
  const listRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMessage({
      conversationId: selectedConversation || "",
      limit: 10,
    });

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop === 0) {
      const oldHeight = el.scrollHeight;
      console.log("fetch page");
      fetchNextPage().then(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight - oldHeight;
        }
      });
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [selectedConversation]);

  const messages = data?.pages
    ?.flatMap((page) => page.metadata.items)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 w-full overflow-y-auto p-4 no-scrollbar"
    >
      {isFetchingNextPage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      {messages?.map((msg, idx) => {
        return <MessageBubble key={`${msg._id}+${idx}`} message={msg} />;
      })}
    </div>
  );
};

export default MessageList;
