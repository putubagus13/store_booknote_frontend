import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Loader = (_Component: any) => (_props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <_Component {..._props} />
    </Suspense>
  );
const Layout = Loader(React.lazy(() => import("./layout/index.tsx")));

const Home = Loader(React.lazy(() => import("./content/Dashboard")));

const Product = Loader(React.lazy(() => import("./content/Product")));

const routes = (): RouteObject[] => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
];

export default routes;
