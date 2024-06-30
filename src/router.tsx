import React, { FC, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { LOGIN } from "./route.ts";

interface IProtectedRouter {
  Auth: boolean;
  children: React.ReactNode;
}

const ProtectedRouter: FC<IProtectedRouter> = ({ Auth, children }) => {
  return Auth ? <div>{children}</div> : <Navigate to={LOGIN} />;
};

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

const ResetPassword = Loader(
  React.lazy(() => import("./content/Auth/ResetPassword"))
);

// const Dashboard = Loader(React.lazy(() => import("./content/Dashboard")));

const Product = Loader(React.lazy(() => import("./content/Product")));
const ProductHistory = Loader(
  React.lazy(() => import("./content/Product/ProductHistory"))
);

const Cashier = Loader(React.lazy(() => import("./content/Cashier/index.tsx")));

// const Order = Loader(React.lazy(() => import("./content/Order")));

const Analytic = Loader(React.lazy(() => import("./content/Analytic")));

const Setting = Loader(React.lazy(() => import("./content/Setting")));

const History = Loader(React.lazy(() => import("./content/History")));

const Journal = Loader(React.lazy(() => import("./content/Journal")));

const routes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: "/",
    element: (
      <ProtectedRouter Auth={isAuthenticated}>
        <Layout />
      </ProtectedRouter>
    ),
    children: [
      {
        path: "",
        element: <Cashier />,
      },
      {
        path: "product",
        children: [
          { path: "", element: <Product /> },
          { path: "history/:id", element: <ProductHistory /> },
        ],
      },

      // {
      //   path: "order",
      //   element: <Order />,
      // },
      {
        path: "analytic",
        element: <Analytic />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "journal",
        element: <Journal />,
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
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
