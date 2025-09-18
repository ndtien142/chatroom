import { lazy, Suspense, type ElementType, type JSX } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PATH_AUTH, PATH_MAIN } from "./path";

const Loadable =
  (Component: ElementType) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
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
          element: <Login />,
        },
        {
          path: PATH_AUTH.signUp,
          element: <Signup />,
        },
      ],
    },
    // Main Routes
    {
      path: "*",
      element: <span>Logo only layout</span>,
      children: [
        { path: "500", element: <span>error page 500</span> },
        { path: "404", element: <span>error page 404</span> },
        { path: "403", element: <span>error page 403</span> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: PATH_MAIN.root,
      element: <LogoOnlyLayout />,
    },
  ]);
}

// Layout
const LogoOnlyLayout = Loadable(lazy(() => import("../layout/LogoOnlyLayout")));
const AuthLayout = Loadable(lazy(() => import("../layout/AuthLayout")));

// Authentication
const Login = Loadable(lazy(() => import("../../auth/login")));
const Signup = Loadable(lazy(() => import("../../auth/signup")));
