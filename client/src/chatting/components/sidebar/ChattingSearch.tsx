import { Input } from "@/components/ui/input";
import _ from "lodash";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ChattingSearch = () => {
  const [searchText, setSearchText] = useState<string>("");

  const debounceSearchText = useCallback(
    _.debounce((value: string) => {
      if (value.trim() === "") return;
      console.log("hello", value);
      // call api
    }, 300),
    []
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("pre-debounce");
    setSearchText(e.target.value);
    debounceSearchText(e.target.value);
  };

  useEffect(() => {
    return () => {
      debounceSearchText.cancel();
    };
  }, [debounceSearchText]);

  return (
    <div className="w-full relative">
      <Input
        placeholder="Search..."
        className="rounded-[8px] outline-none border-none bg-[#00000042] placeholder:text-white text-[16px] placeholder:text-[16px] px-3 py-2 focus-visible:outline-none focus-visible:border-none focus-visible:ring-0"
        value={searchText}
        onChange={handleTextChange}
      />
      <SearchIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2" />
    </div>
  );
};

export default ChattingSearch;
