import React, { useContext, useEffect } from "react";
import { GmodServerContext } from "../contexts/GmodServerContext";
import { SyncLoader } from "react-spinners";


const PlayerCount: React.FC = () => {
    const globalState = useContext(GmodServerContext);
console.log(globalState)


    return (
        <div className="w-96 h-96 border rounded-md grid place-content-center gap-4">
          {globalState.loading === false ?(          <>
            <div className="text-2xl">Total Players</div>
            <div className="text-9xl">{globalState.status.totalPlayer}</div>
            <div>Online</div>
            </>): (
<><SyncLoader></SyncLoader></>
          )}
        </div>
        
    );

}

export default PlayerCount;