import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../auth.service";
import type { ICallbackQuery } from "@/common/@types/common.interface";
import { dispatch } from "@/common/redux/store";
import { setLogout } from "../auth.slice";

export const useLogout = ({ onError, onSuccess }: ICallbackQuery) => {
  return {
    ...useMutation({
      mutationFn: logoutService,
      onSuccess: () => {
        dispatch(setLogout());
        onSuccess();
      },
      onError: (err: unknown) => {
        console.log("err", err);
        dispatch(setLogout());
        onError();
      },
    }),
  };
};
