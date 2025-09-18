import type { IChatMessage } from "@/chatting/chatting.interface";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: IChatMessage[];
}

const MessageList = ({ messages }: Props) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    const el = listRef.current;
    if (!el || loadingMore) return;

    if (el.scrollTop === 0) {
      setLoadingMore(true);
      const oldHeight = el.scrollHeight;

      //   const older = await fetchOlderMessages();
      //   messages.unshift(...older);

      requestAnimationFrame(() => {
        if (el) el.scrollTop = el.scrollHeight - oldHeight;
        setLoadingMore(false);
      });
    }
  };

  useEffect(() => {
    // will scroll to bottom 0 after mounted
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 w-full overflow-y-auto p-4 no-scrollbar"
    >
      {loadingMore && <p className="text-center text-gray-500">Đang tải...</p>}
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
