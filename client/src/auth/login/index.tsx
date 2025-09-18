// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// React Icon
import { BiArrowBack } from "react-icons/bi";
// Router
import { PATH_AUTH } from "@/common/routes/path";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./login.schema";
import type { ILoginForm } from "./login.interface";
import { isDesktop } from "react-device-detect";
import { CenteredContainer } from "@/common/components/CenteredContainer";

const LoginContainer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    console.log("data: ", data);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate(PATH_AUTH.forgotPassword);
  };

  const handleGoBack = () => {
    console.log("Go back to");
    navigate(PATH_AUTH.signUp);
  };

  return (
    <CenteredContainer>
      <main className="w-full">
        <div className="w-full flex items-center justify-between mb-12 min-w-[325px]">
          {!isDesktop ? (
            <BiArrowBack
              size={"25px"}
              onClick={handleGoBack}
              className="cursor-pointer"
            />
          ) : (
            <div className="w-6 h-6" />
          )}
          <h1 className="text-2xl font-semibold capitalize">Sign In</h1>
          <div className="w-6 h-6" />
        </div>
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="username"
                placeholder="Username"
                type="text"
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 mt-[10px]">
              <Button
                type="submit"
                className="w-full rounded-[68px] text-white capitalize text-[14px] font-semibold bg-[#A53385] hover:bg-[#A53385B3]"
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
        <div className="w-full mb-4">
          <p className="text-nowrap text-[16px]">
            Forgot your password?{" "}
            <Button
              onClick={handleForgotPassword}
              variant={"link"}
              className="text-primary font-semibold inline-block p-0 text-[16px]"
            >
              Reset it here
            </Button>
          </p>
        </div>
      </main>
    </CenteredContainer>
  );
};

export default LoginContainer;
