import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GlobeGuesserDistance from "components/ui/GlobeGuesserDistance";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";

const GlobeGuesserDistanceScreen = () => {
    const location = useLocation();
    const { panoramaCoords, markerCoords } = location.state;
    const [timerTime, setTimerTime] = useState(120);

    const handleSetTimerTime = (time) => {
        setTimerTime(time);
    };

    return (
        <BaseContainer backgroundImage={BackgroundImage} className="main-body">
            <div className={"center-container"}>
                <Header className={"header-element"} />
                <ScoreBoard/>
            </div>
            <GlobeGuesserDistance panoramaCoords={panoramaCoords} markerCoords={markerCoords} />
        </BaseContainer>
    );
};

export default GlobeGuesserDistanceScreen;
