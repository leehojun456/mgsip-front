import React from "react";
import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import "./App.css";

function App() {
  return (
    <div className="App flex">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
