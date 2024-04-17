import React from "react";
import PlayerCount from "../components/player/PlayerCount";
import GmodServerProvider from "../components/contexts/GmodServerContext";
import ServerOnlineUi from "../components/statuts/ServerOnlineUi";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const GmodPage: React.FC = () => {
  return (
    <div className="h-full p-12 flex flex-col gap-12 w-full">
      <GmodServerProvider>
        <ServerOnlineUi></ServerOnlineUi>
        <div className="w-full flex gap-4">
          <PlayerCount></PlayerCount>
        </div>
      </GmodServerProvider>
    </div>
  );
};

export default GmodPage;
