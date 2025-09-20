import { useSendMessage } from "@/chatting/hooks/useSendMessage";
import { useToast } from "@/common/hooks/useToast";
import { useSelector } from "@/common/redux/store";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedConversation = useSelector(
    (state) => state.chatting.selectedConversation
  );

  const { mutate } = useSendMessage();

  const { showErrorMessage } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select the correct image format");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    if (!selectedConversation) {
      showErrorMessage("Please select a conversation!");
      return;
    }
    if (!input.trim() && !imagePreview) return;

    try {
      console.log("Sending:", { text: input.trim(), image: imagePreview });
      setInput("");
      mutate({ text: input.trim(), conversationId: selectedConversation });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div className="w-full px-4 flex flex-col gap-2">
      {imagePreview && (
        <div className="relative w-24 h-24">
          <img
            src={imagePreview}
            alt="preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                       bg-black/60 rounded-full text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between relative gap-3">
        <Input
          placeholder="Message"
          className="rounded-[86px] outline-none border-none bg-[#00000042] placeholder:text-white text-[16px] px-3 py-2 focus-visible:outline-none focus-visible:ring-0"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleSendMessage(e)
          }
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-[12px]"
        >
          📷
        </button>

        <div
          className="w-8 h-8 bg-[#FF9BE3] flex items-center justify-center rounded-[12px] p-2
                     cursor-pointer disabled:opacity-50"
          onClick={handleSendMessage}
        >
          <FaPaperPlane size={18} />
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
