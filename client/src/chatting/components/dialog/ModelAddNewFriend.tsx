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
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { IUser } from "@/chatting/chatting.interface";

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
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<IUser | null>(null);

  // Fake search
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleConfirm = () => {
    if (selected) onSelectUser(selected);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Make friend</DialogTitle>
          <DialogDescription>Choose a friend user know!!</DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search user by name or username...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        <ScrollArea className="max-h-72 pr-2">
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user._id}
                type="button"
                onClick={() =>
                  setSelected((prev) => (prev?._id === user._id ? null : user))
                }
                className={`w-full flex items-center justify-between rounded-md px-2 py-2 hover:bg-muted
                  ${selected?._id === user._id ? "bg-muted" : ""}`}
              >
                <div className="flex items-center gap-3 text-left">
                  <Avatar className="h-8 w-8">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} />
                    ) : (
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.name}</span>
                </div>
                {selected?._id === user._id && <Check size={18} />}
              </button>
            ))}
            {users.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                User not found
              </p>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            disabled={!selected}
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            Start chatting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
