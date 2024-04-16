import React, { useContext, useEffect } from "react";
import { GmodServerContext } from "../contexts/GmodServerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from "react-spinners";
import PlayerCount from "../player/PlayerCount";

const ServerOnlineUi: React.FC = () => {
  const globalState = useContext(GmodServerContext);
  console.log(globalState);

  return (
    <div className="w-full flex px-6 rounded-md bg-white gap-4">
      {globalState.loading === false ? (
        <div className="flex gap-4">
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
        </div>
      ) : (
        <>
          <FontAwesomeIcon icon={["fab", "check"]} />
          <div className="text-5xl font-bold text-red-400">Offline</div>
        </>
      )}
    </div>
  );
};

export default ServerOnlineUi;
