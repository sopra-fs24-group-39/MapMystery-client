import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import "../../styles/views/Rankings.scss";
import BaseElementRankings from "components/ui/RankingsContainer";
import TabSelector from "components/ui/Selector";

const Rankings = () => {
  const [selectedTab, setSelectedTab] = useState("GlobeGuesser");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-clip">
      <div className={"center-container"}>
        <Header/>
        <div className={"input-container"}>
          <TabSelector
            width="700px"
            height="46px"
            options={["GlobeGuesser", "FlagFinder", "GeoGenius"]}
            onChange={handleTabChange}
          />
        </div>
        <Title text="Rankings" className="site-title" size="md"></Title>
        <div className={"element-container"}>
          {selectedTab === "FlagFinder" ? (
            <p className="info-text-rankings">Ranking will be available soon for this gamemode</p>
          ) : selectedTab === "GeoGenius" ? (
            <p className="info-text-rankings">Gamemode coming soon</p>
          ) : (
            <BaseElementRankings width={"75vw"} height={"50vh"} withStripes/>
          )}
        </div>
      </div>
    </BaseContainer>
  );
};

export default Rankings;
