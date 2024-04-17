import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

const MainPage: React.FC = () => {
  return (
    <div className="h-full p-12 flex flex-col gap-12 w-full">
      <div className="font-bold text-5xl">Select Server</div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        <Link to={"/gmod"}>
          <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        </Link>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <button className="hover:brightness-75 transition-all duration-300 bg-slate-50 min-w-72 h-48 rounded-md flex justify-center items-center my-anchor-elementnp">
          <div>
            {" "}
            <FontAwesomeIcon
              icon={["fas", "plus"]}
              className="text-5xl text-slate-300"
            />
          </div>
        </button>
      </div>
      <Tooltip anchorSelect=".my-anchor-element" place="top" float={true}>
        Add Server
      </Tooltip>
    </div>
  );
};

export default MainPage;
