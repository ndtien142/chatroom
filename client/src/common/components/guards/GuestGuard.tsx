import { useSelector } from "@/common/redux/store";
import { PATH_MAIN } from "@/common/routes/path";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type GuestGuardProps = {
  children: ReactNode;
};

const GuestGuard = ({ children }: GuestGuardProps) => {
  const isAuthenticated = useSelector(
    (state) => state.authLogin.isAuthenticated
  );
  if (isAuthenticated) {
    return <Navigate to={PATH_MAIN.chatting.room} replace />;
  }
  return <>{children}</>;
};

export default GuestGuard;
