"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { IUser } from "@/chatting/chatting.interface";
import { useGetListUser } from "@/chatting/hooks/useGetListUser";
import _ from "lodash";
import { useStartSpecificChat } from "@/chatting/hooks/useStartSpecificChat";

interface AddFriendModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelectUser: (user: IUser) => void;
}

export default function AddFriendModal({
  open,
  onOpenChange,
  onSelectUser,
}: AddFriendModalProps) {
  const [search, setSearch] = useState<string>("");
  const [rawSearch, setRawSearch] = useState<string>("");
  const [selected, setSelected] = useState<IUser | null>(null);

  const { data: users } = useGetListUser({
    limit: 10,
    page: 1,
    searchText: search,
  });

  const { mutate } = useStartSpecificChat();

  const debounceSearchText = useCallback(
    _.debounce((value: string) => {
      if (value.trim() === "") return;
      setSearch(value.trim());
    }, 300),
    []
  );

  const handleConfirm = () => {
    if (!selected) return;
    onSelectUser(selected);
    mutate({ recipientId: selected._id });

    onOpenChange(false);
  };

  useEffect(() => {
    return () => {
      debounceSearchText.cancel();
    };
  }, [debounceSearchText]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full bg-[#2f2f2f] border-none text-white">
        <DialogHeader>
          <DialogTitle>Make friend</DialogTitle>
          <DialogDescription>Choose a friend user know!!</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search user by name or username...."
          value={rawSearch}
          onChange={(e) => {
            setRawSearch(e.target.value);
            debounceSearchText(e.target.value);
          }}
          className="mb-3"
        />

        <ScrollArea className="max-h-72 pr-2">
          <div className="space-y-2">
            {users?.length === 0 && (
              <p className="text-center text-sm text-gray-400 mt-2">
                User not found
              </p>
            )}

            {users?.map((user) => {
              const isSelected = selected?._id === user._id;

              return (
                <button
                  key={user._id}
                  type="button"
                  onClick={() =>
                    setSelected((prev) =>
                      prev?._id === user._id ? null : user
                    )
                  }
                  className={`
            w-full flex items-center justify-between p-3 rounded-xl transition-colors
            ${isSelected ? "bg-blue-600/40" : "hover:bg-gray-800/60"}
          `}
                >
                  <div className="flex items-center gap-3 text-left">
                    <Avatar className="h-10 w-10">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} />
                      ) : (
                        <AvatarFallback className="bg-zinc-700">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            disabled={!selected}
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-[#ff99e2] text-black"
          >
            Start chatting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
