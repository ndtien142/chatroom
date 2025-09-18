import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IChattingState } from "./chatting.interface";

const initialState: IChattingState = {
  selectedUserOrGroup: null,
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessageLoading: false,
};

const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUserOrGroup = action.payload;
    },
  },
});

export const { setSelectedUser } = chattingSlice.actions;

export default chattingSlice.reducer;
