import React from 'react';
import logo from './logo.svg';
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import './App.css';

function App() {
  return (
    <div className="App flex">
      <div className='flex flex-col bg-blue-900 w-96 h-screen border-r gap-6'>
          <a href='#' className='mx-6 text-white hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300'>
            Dashboard
          </a>
          <a href='#' className='mx-6 text-white hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300'>
            Users
          </a>
          <a href='#' className='mx-6 text-white hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300'>
            Dashboard
          </a>
          <a href='#' className='mx-6 text-white hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300'>
            Dashboard
          </a>
          <a href='#' className='mx-6 text-white hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300'>
            Dashboard
          </a>
      </div>
      
      <header className="bg-white w-full border-b h-20">
      <nav>dadsf</nav>
      </header>
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
