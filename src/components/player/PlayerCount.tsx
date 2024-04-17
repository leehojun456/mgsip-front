import React, { useContext, useEffect } from "react";
import { GmodServerContext } from "../contexts/GmodServerContext";
import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerCount: React.FC = () => {
  const globalState = useContext(GmodServerContext);
  console.log(globalState);

  return (
    <div className="w-full bg-slate-50 rounded-md flex p-4 items-center gap-6">
      {globalState.loading === false ? (
        <>
          <FontAwesomeIcon icon={["fas", "user"]} className="text-4xl" />
          <div>
            <div>Joinned Player</div>
            <div className="font-bold text-2xl">
              {globalState.status.totalPlayer}
            </div>
          </div>
        </>
      ) : (
        <div>
          <SyncLoader></SyncLoader>
        </div>
      )}
    </div>
  );
};

export default PlayerCount;
