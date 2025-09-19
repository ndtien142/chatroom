import {
  API_LOGIN,
  API_LOGOUT,
  API_SIGNUP,
} from "@/common/constants/api.constants";
import axiosInstance, { axiosInstance2 } from "@/common/utils/axios";
import type {
  ILoginForm,
  ILoginResponse,
  ISignUpResponse,
} from "./login/login.interface";
import type { ISignupForm } from "./signup/signup.interface";

export const loginService = (data: ILoginForm): Promise<ILoginResponse> => {
  return axiosInstance2.post(API_LOGIN, data);
};

export const signUpService = (data: ISignupForm) => {
  return axiosInstance.post<unknown, ISignUpResponse>(API_SIGNUP, data);
};

export const logoutService = () => {
  return axiosInstance.post(API_LOGOUT);
};
