import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Loader = (_Component: any) => (_props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <_Component {..._props} />
    </Suspense>
  );
const Layout = Loader(React.lazy(() => import("./layout/index.tsx")));
const AuthLayout = Loader(React.lazy(() => import("./layout/AuthLayout")));

const Home = Loader(React.lazy(() => import("./content/Home")));

const Login = Loader(React.lazy(() => import("./content/Auth/Login")));

const Signup = Loader(React.lazy(() => import("./content/Auth/Signup.tsx")));

const ForgotPassword = Loader(
  React.lazy(() => import("./content/Auth/ForgotPassword"))
);

const Dashboard = Loader(React.lazy(() => import("./content/Dashboard")));

const Product = Loader(React.lazy(() => import("./content/Product")));

const Order = Loader(React.lazy(() => import("./content/Order")));

const routes = (): RouteObject[] => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
];

export default routes;
