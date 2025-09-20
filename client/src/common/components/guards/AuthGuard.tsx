import { useChatSocket } from "@/chatting/hooks/useChatSocket";
import { useSelector } from "@/common/redux/store";
import { PATH_AUTH } from "@/common/routes/path";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useSelector(
    (state) => state.authLogin.isAuthenticated
  );
  const userId = useSelector((state) => state.authLogin.userInfo._id);
  useChatSocket(userId);
  console.log("auth");
  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }
  return <>{children}</>;
};

export default AuthGuard;
