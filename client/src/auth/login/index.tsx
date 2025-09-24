import { useState } from "react";
// Router
import { PATH_AUTH, PATH_MAIN } from "@/common/routes/path";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login.schema";
import type { ILoginForm } from "./login.interface";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/common/hooks/useToast";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { showErrorMessage, showSuccessMessage } = useToast();

  const { mutate } = useAuth({
    onSuccess() {
      showSuccessMessage("Login Successfully");
      navigate(PATH_MAIN.chatting.root);
    },
    onError() {
      showErrorMessage("Something went wrong!");
    },
  });

  const onSubmit = (data: ILoginForm) => {
    if (isLoading) return;
    setIsLoading(true);
    mutate(data);
    setIsLoading(false);
  };

  const handleSignup = () => {
    navigate(PATH_AUTH.signUp);
  };

  const inputClass =
    "w-full bg-[#242424] text-gray-200 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff99e2] transition-colors";
  const buttonClass =
    "w-full bg-[#ff99e2] text-black font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-pink-300/50 disabled:cursor-not-allowed disabled:scale-100";

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#242424] text-gray-200 p-4 font-sans">
      <div className="w-full max-w-md mx-auto bg-[#2F2F2F] p-8 rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-gray-400 mt-2">Sign in to continue to Chatroom</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              placeholder="your_username"
              type="text"
              required
              className={inputClass}
              autoComplete="username"
              {...register("username")}
            />
            {errors?.username?.message && (
              <p className="text-red-400 text-sm text-center bg-transparent pt-1.5 rounded-lg">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password")}
              className={inputClass}
            />
            {errors?.password?.message && (
              <p className="text-red-400 text-sm text-center bg-transparent pt-1.5 rounded-lg">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button type="submit" disabled={isLoading} className={buttonClass}>
              {isLoading ? "Processing..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account
            <button
              onClick={handleSignup}
              className="font-semibold text-[#ff99e2] hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginContainer;
