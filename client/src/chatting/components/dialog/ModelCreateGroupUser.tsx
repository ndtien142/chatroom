import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import _ from "lodash";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { useGetListUser } from "@/chatting/hooks/useGetListUser";
import type { ICreateGroupModalProps } from "@/chatting/chatting.interface";
import { useCreateGroupChat } from "@/chatting/hooks/useCreateGroupChat";
import { useToast } from "@/common/hooks/useToast";

export function CreateGroupModal({
  open,
  onOpenChange,
}: ICreateGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [searchText, setSearchText] = useState("");
  const [rawSearch, setRawSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { showErrorMessage, showSuccessMessage } = useToast();

  const { data: users, isLoading } = useGetListUser({
    limit: 20,
    page: 1,
    searchText,
  });

  const { mutate } = useCreateGroupChat({
    onError: () => showErrorMessage("Create group chat failed!"),
    onSuccess: () => showSuccessMessage("Create group chat success!"),
  });

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const debounceSearchText = useCallback(
    _.debounce((value: string) => {
      if (value.trim() === "") return;
      setSearchText(value.trim());
    }, 300),
    []
  );

  const handleTextChange = (e: string) => {
    console.log("pre-debounce");
    setRawSearch(e);
    debounceSearchText(e);
  };

  useEffect(() => {
    return () => {
      debounceSearchText.cancel();
    };
  }, [debounceSearchText]);

  const submit = () => {
    if (!groupName.trim() || selectedIds.length === 0) return;

    const formData = new FormData();
    formData.append("name", groupName.trim());
    if (image) formData.append("groupImage", image);
    selectedIds.forEach((id) => formData.append("memberIds[]", id));

    mutate(formData);
    // reset
    setGroupName("");
    setImage(null);
    setSelectedIds([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full bg-[#2f2f2f] border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create chatroom
          </DialogTitle>
        </DialogHeader>

        {/* Group name & Image */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              {image ? (
                <AvatarImage
                  src={URL.createObjectURL(image)}
                  alt="group"
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-amber-50">AVT</AvatarFallback>
              )}
            </Avatar>
            <label
              htmlFor="group-image"
              className="absolute -bottom-2 -right-2 cursor-pointer rounded-full bg-primary text-white p-1 shadow"
            >
              <PlusCircle className="h-4 w-4" />
            </label>
            <input
              id="group-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </div>
          <Input
            placeholder="name..."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {/* Search + User list */}
        <div className="space-y-2">
          <Command>
            <CommandInput
              placeholder="Search user..."
              value={rawSearch}
              onValueChange={handleTextChange}
            />
            <CommandList>
              <CommandEmpty>Not Found</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="max-h-60">
                  {!isLoading &&
                    users?.map((user) => (
                      <CommandItem
                        key={user._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <Checkbox
                          checked={selectedIds.includes(user._id)}
                          onCheckedChange={() => handleToggle(user._id)}
                        />
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!groupName || !selectedIds.length}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
