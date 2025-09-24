import { useState } from "react";
// Router
import { PATH_AUTH, PATH_MAIN } from "@/common/routes/path";
import { useNavigate } from "react-router-dom";
// Icon
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./signup.schema";
import type { ISignupForm } from "./signup.interface";
import { useSignup } from "../hooks/useSignup";
import { useToast } from "@/common/hooks/useToast";

const SignupContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signupSchema),
  });
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate(PATH_AUTH.login);
  };

  const { showErrorMessage, showSuccessMessage } = useToast();

  const { mutate } = useSignup({
    onError: () => {
      showErrorMessage("Something went wrong");
    },
    onSuccess: () => {
      showSuccessMessage("Sign Up Successfully!");
      navigate(PATH_MAIN.chatting.root);
    },
  });

  const onSubmit = (data: ISignupForm) => {
    if (isLoading) return;
    setIsLoading(true);
    mutate(data);
    setIsLoading(false);
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
            Create Your Account
          </h1>
          <p className="text-gray-400 mt-2">Get started with a free account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Display name
            </label>
            <input
              id="name"
              placeholder="Your name"
              type="text"
              required
              className={inputClass}
              {...register("name")}
            />
            {errors?.username?.message && (
              <p className="text-red-400 text-sm text-center bg-transparent pt-1.5 rounded-lg">
                {errors.username.message}
              </p>
            )}
          </div>
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
          <div className="text-left">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              {...register("confirmPassword")}
              className={inputClass}
            />
            {errors?.confirmPassword?.message && (
              <p className="text-red-400 text-sm text-center bg-transparent pt-1.5 rounded-lg">
                {errors.confirmPassword.message}
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
            Already have an account?{" "}
            <button
              onClick={handleToLogin}
              className="font-semibold text-[#ff99e2] hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignupContainer;
