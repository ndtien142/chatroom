import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthentication: boolean;
  isSignUp: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: IAuthState = {
  isAuthentication: false,
  isSignUp: false,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthentication = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setLogout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthentication = false;
      state.isSignUp = false;
    },
  },
});

export const { setIsAuthentication } = authSlice.actions;

export default authSlice.reducer;
