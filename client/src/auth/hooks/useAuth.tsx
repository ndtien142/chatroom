import { useMutation } from "@tanstack/react-query";
import { loginService } from "../auth.service";
import { dispatch } from "@/common/redux/store";
import {
  setAccessToken,
  setIsAuthenticated,
  setRefreshToken,
  setUser,
} from "../auth.slice";
import type { ICallbackQuery } from "@/common/@types/common.interface";

export const useAuth = ({ onError, onSuccess }: ICallbackQuery) => {
  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      if (!response) return;
      const { metadata } = response;
      console.log("response::: ", response);
      dispatch(setAccessToken(metadata?.tokens?.accessToken));
      dispatch(setRefreshToken(metadata?.tokens?.refreshToken));
      dispatch(setUser(metadata?.user));
      dispatch(setIsAuthenticated(true));
      onSuccess();
    },
    onError,
  });
};
