import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="no-scrollbar overflow-scroll">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
