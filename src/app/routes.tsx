import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Join from "./pages/Join";
import ServiceDetail from "./pages/ServiceDetail";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "services/:slug",
        element: <ServiceDetail />,
      },
    ],
  },
]);
