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
  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTH.login} />;
  }
  return <>{children}</>;
};

export default AuthGuard;
