import React, { useContext } from "react";
import { GmodServerContext } from "../contexts/GmodServerContext";


const PlayerCount: React.FC = () => {
    const globalState = useContext(GmodServerContext);

    return (
        <div className="w-96 h-96 border rounded-md grid place-content-center">
          <div className="">
            <div className="text-2xl">Total Players</div>
            <div className="text-9xl">{globalState.status.totalPlayer}</div>
          </div>
        </div>
    );
}

export default PlayerCount;