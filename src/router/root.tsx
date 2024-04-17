import React from "react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layouts/Layout";
import MainPage from "../pages/MainPage";
import GmodPage from "../pages/GmodPage";
library.add(fas);

const Loading = <div>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "gmod",
        element: <GmodPage />,
      },
    ],
  },
]);

export default root;
