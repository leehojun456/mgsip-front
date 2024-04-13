import React from "react";
import PlayerCount from "../components/player/PlayerCount";
import GmodServerProvider from "../components/contexts/GmodServerContext";


const MainPage: React.FC = () => {

    return (
        <div>
            <GmodServerProvider>
                <div className="grid m-24">
                    <PlayerCount></PlayerCount>
                    </div>
            </GmodServerProvider>
        </div>
    );
}

export default MainPage;