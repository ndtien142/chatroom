import { useState } from "react";
// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Router
import { PATH_AUTH } from "@/common/routes/path";
import { useNavigate } from "react-router-dom";
import { CenteredContainer } from "@/common/components/CenteredContainer";
import { isDesktop } from "react-device-detect";
// Icon
import { BiArrowBack } from "react-icons/bi";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./signup.schema";
import type { ISignupForm } from "./signup.interface";

const SignupContainer = () => {
  const [show, setShow] = useState(false);

  const { register, handleSubmit } = useForm<ISignupForm>({
    resolver: yupResolver(signupSchema),
  });
  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate(PATH_AUTH.login);
  };

  const handleGoBack = () => {
    console.log("Go back to");
    navigate(PATH_AUTH.login);
  };

  const onSubmit = (data: ISignupForm) => {
    console.log("data: ", data);
  };

  return (
    <CenteredContainer>
      <main className="no-scrollbar">
        <div className="w-full flex items-center justify-between mb-2 min-w-[325px]">
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
        <div className="w-full mb-5">
          <p className="text-[16px]">
            Hey guy, do you want to register?
            <span className="block">So you can remember me</span>
          </p>
        </div>
        <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                placeholder="Name"
                type="name"
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="username"
                {...register("username")}
                placeholder="Username"
                type="text"
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
              />
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Input
                {...register("password")}
                id="password"
                placeholder="Password"
                type={show ? "text" : "password"}
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
              />{" "}
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Input
                {...register("confirmPassword")}
                id="confirm-password"
                placeholder="Confirm Password"
                type={show ? "text" : "password"}
                className="border-none bg-[#333333] rounded-none text-white placeholder:text-white text-[14px]"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent border-none outline-0"
              >
                {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="flex flex-col space-y-1.5 mt-[10px]">
              <Button className="w-full rounded-[68px] text-white capitalize text-[14px] font-semibold bg-[#A53385] hover:bg-[#A53385B3]">
                Sign Up With Email
              </Button>
            </div>
          </div>
        </form>
        <div className="w-full">
          <p className="text-nowrap text-[16px]">
            Already have an account?{" "}
            <Button
              onClick={handleToLogin}
              variant={"link"}
              className="text-primary font-semibold inline-block p-0 text-[16px]"
            >
              Login
            </Button>
          </p>
        </div>
        <div className="w-full mb-4">
          <p className="w-max-[200px] text-[12px] text-[#888888]">
            By continuing, you agree to our{" "}
            <span className="block">Privacy Policy and Terms of Use</span>
          </p>
        </div>
      </main>
    </CenteredContainer>
  );
};

export default SignupContainer;
