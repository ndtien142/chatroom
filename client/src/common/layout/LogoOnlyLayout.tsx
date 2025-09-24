import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function LogoOnlyLayout() {
  const isLogin = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login", { replace: true });
    }
  }, []);
  return (
    <div className="flex h-screen w-screen text-gray-200 antialiased overflow-hidden relative">
      <Outlet />
    </div>
  );
}
