import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import "../../styles/views/Rankings.scss";
import BaseElement from "components/ui/Container";
import TabSelector from "components/ui/Selector";

const Rankings = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
        <div className={"input-container"}>
          <TabSelector
            width="700px"
            height="46px"
            options={["GlobeGuesser", "FlagFinder", "GeoGenius"]}
          />
        </div>
        <Title text="Rankings" className="site-title"></Title>
        <div className={"container-container"}>
          <BaseElement width={1000} height={570}/>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Rankings;