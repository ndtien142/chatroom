import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IChattingState, IChatMessage, IUser } from "./chatting.interface";

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
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserOrGroup = action.payload;
      state.messages = []; // reset messages khi chọn user mới
    },

    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setUsersLoading: (state, action: PayloadAction<boolean>) => {
      state.isUsersLoading = action.payload;
    },

    setMessages: (state, action: PayloadAction<IChatMessage[]>) => {
      state.messages = action.payload;
    },
    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.isMessageLoading = action.payload;
    },

    addMessage: (state, action: PayloadAction<IChatMessage>) => {
      state.messages.push(action.payload);
    },

    updateMessage: (state, action: PayloadAction<IChatMessage>) => {
      const idx = state.messages.findIndex((m) => m._id === action.payload._id);
      if (idx !== -1) state.messages[idx] = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setUsers,
  setUsersLoading,
  setMessages,
  setMessagesLoading,
  addMessage,
  updateMessage,
} = chattingSlice.actions;

export default chattingSlice.reducer;
