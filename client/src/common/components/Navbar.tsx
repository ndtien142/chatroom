import { BiMessageSquare } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "../redux/store";
import { LogOut, User } from "lucide-react";
import { useLogout } from "@/auth/hooks/useLogout";
import { useToast } from "../hooks/useToast";

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state) => state.authLogin.isAuthenticated
  );
  const navigate = useNavigate();
  const { showErrorMessage, showSuccessMessage } = useToast();
  const { mutate } = useLogout({
    onError: () => {
      showErrorMessage("Something went wrong!");
    },
    onSuccess: () => {
      showSuccessMessage("Logout Successfully!");
      navigate("/");
    },
  });
  const handleLogout = () => {
    // call api logout
    mutate();
  };
  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 left-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto sm:px-4 md:px-7 h-16">
        <div className="flex items-center justify-between h-full w-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <BiMessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatting</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`flex items-center btn btn-sm gap-2 transition-colors`}
            >
              <IoSettings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 flex items-center`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center flex-nowrap hover:text-zinc-400"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
