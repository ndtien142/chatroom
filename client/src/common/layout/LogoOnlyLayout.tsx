import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LogoOnlyLayout() {
  const isLogin = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login", { replace: true });
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="no-scrollbar overflow-scroll mt-16">
        <Outlet />
      </div>
    </>
  );
}
