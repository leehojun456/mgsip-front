import React, { useContext, useEffect } from "react";
import { GmodServerContext } from "../contexts/GmodServerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import PlayerCount from "../player/PlayerCount";

const ServerOnlineUi: React.FC = () => {
  const globalState = useContext(GmodServerContext);
  console.log(globalState);

  return (
    <div className="w-full flex rounded-md bg-white gap-4 justify-between">
      <div className="flex gap-4 w-full">
        {globalState.status.status === 1 ? (
          <>
            <FontAwesomeIcon
              icon={["fas", "check"]}
              className="text-green-400 text-5xl"
            />
            <div className="flex flex-col justify-between">
              <div className="text-5xl font-bold text-green-400">Online</div>
              <div className="text-slate-400">
                {globalState.status.serverName}
              </div>
            </div>
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={["fas", "xmark"]}
              className="text-red-400 text-5xl"
            />
            <div className="flex flex-col justify-between">
              <div className="text-5xl font-bold text-red-400">Offline</div>
              <div className="text-slate-400">
                {globalState.status.serverName}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="w-12 h-12 bg-green-400 rounded-md">
          <FontAwesomeIcon icon={["fas", "play"]} className="text-white" />
        </button>
        <button className="w-12 h-12 bg-red-500 rounded-md">
          {" "}
          <FontAwesomeIcon icon={["fas", "stop"]} className="text-white" />
        </button>
        <button className="w-12 h-12 bg-red-500 rounded-md">
          {" "}
          <FontAwesomeIcon icon={["fas", "repeat"]} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ServerOnlineUi;
