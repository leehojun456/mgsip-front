// Header.tsx

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LeftSideUi: React.FC = () => {
  const location = useLocation();

  // 헤더 내용을 기본값으로 설정
  let Content: JSX.Element = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "bg-black"
            : "p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
        }
      >
        Home
      </NavLink>
      <a
        href="#"
        className="p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
      >
        Dashboard
      </a>
      <a
        href="#"
        className="p-4  hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
      >
        Users
      </a>
      <a
        href="#"
        className="p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
      >
        Dashboard
      </a>
      <a
        href="#"
        className="p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
      >
        Dashboard
      </a>
    </>
  );

  // 특정 페이지에서만 헤더 내용을 변경
  if (location.pathname === "/") {
    Content = (
      <>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "p-4 bg-white text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
              : "p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
          }
        >
          Home
        </NavLink>
        <a
          href="#"
          className="p-4 hover:bg-white hover:text-blue-900 h-14 flex flex-col justify-center rounded-md transition-all duration-300"
        >
          Login
        </a>
      </>
    );
  }

  return (
    <nav className="bg-slate-50 flex flex-col gap-4 w-96 h-dvh rounded-r-md">
      {Content}
    </nav>
  );
};

export default LeftSideUi;
