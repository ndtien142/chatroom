import { Card, CardContent } from "@/components/ui/card";
import { FiMessageSquare } from "react-icons/fi";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-zinc-900">
      <Card className="w-[350px] max-w-full text-center p-6 bg-zinc-800 shadow-lg border border-zinc-700">
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <div className="text-5xl text-zinc-400 animate-pulse">
            <FiMessageSquare />
          </div>
          <h3 className="text-lg font-semibold text-zinc-200">
            No Conversation Selected
          </h3>
          <p className="text-sm text-zinc-400">
            Please select a chat from the list or start a new conversation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoChatSelected;
