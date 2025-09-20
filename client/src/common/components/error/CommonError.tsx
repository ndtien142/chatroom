import { PATH_MAIN } from "@/common/routes/path";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  code: string | number;
  message: string;
}

export default function ErrorPage({ code, message }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 dark:bg-black text-center px-4">
      <h1 className="text-7xl font-bold text-[#FF99E2] mb-4">{code}</h1>
      <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8">{message}</p>
      <Button
        variant="default"
        onClick={() => navigate(PATH_MAIN.chatting.room)}
        className="flex items-center space-x-2"
      >
        <Loader2 className="w-4 h-4 animate-spin text-white" />
        <span>Return to chat</span>
      </Button>
    </div>
  );
}
