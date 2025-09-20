import { lazy, Suspense, type ElementType, type JSX } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PATH_AUTH, PATH_MAIN } from "./path";
import GuestGuard from "../components/guards/GuestGuard";
import AuthGuard from "../components/guards/AuthGuard";
import { Loader2 } from "lucide-react";
import { Forbidden, NotFound, ServerError } from "../components/error";

const Loadable =
  (Component: ElementType) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 dark:bg-black z-50">
            <Loader2 className="animate-spin w-12 h-12 text-[#FF99E2]" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

export default function Router() {
  return useRoutes([
    // Auth Routes
    {
      path: PATH_AUTH.root,
      element: <AuthLayout />,
      children: [
        {
          path: PATH_AUTH.login,
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: PATH_AUTH.signUp,
          element: (
            <GuestGuard>
              <Signup />
            </GuestGuard>
          ),
        },
      ],
    },
    // Main Routes
    {
      path: "*",
      children: [
        { path: "500", element: <ServerError /> },
        { path: "404", element: <NotFound /> },
        { path: "403", element: <Forbidden /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: PATH_MAIN.root,
      element: (
        <AuthGuard>
          <LogoOnlyLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: PATH_MAIN.chatting.root,
          children: [
            {
              path: PATH_MAIN.chatting.root,
              element: <Navigate to={PATH_MAIN.chatting.room} replace />,
            },
            { path: PATH_MAIN.chatting.room, element: <ChattingContainer /> },
          ],
        },
      ],
    },
  ]);
}

// Layout
const LogoOnlyLayout = Loadable(lazy(() => import("../layout/LogoOnlyLayout")));
const AuthLayout = Loadable(lazy(() => import("../layout/AuthLayout")));

// Authentication
const Login = Loadable(lazy(() => import("../../auth/login")));
const Signup = Loadable(lazy(() => import("../../auth/signup")));

// Chatting
const ChattingContainer = Loadable(lazy(() => import("../../chatting")));
