import type { IUserInfo } from "@/common/@types/user.interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  isSignUp: boolean;
  accessToken: string;
  refreshToken: string;
  userInfo: IUserInfo;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isSignUp: false,
  accessToken: "",
  refreshToken: "",
  userInfo: {
    _id: "",
    avatar: "",
    name: "",
    username: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setLogout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.isSignUp = false;
      state.userInfo = {
        _id: "",
        avatar: "",
        name: "",
        username: "",
      };
    },
  },
});

export const {
  setIsAuthenticated,
  setAccessToken,
  setRefreshToken,
  setUser,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
