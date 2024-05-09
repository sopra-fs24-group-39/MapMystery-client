import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import "../../styles/views/Settings.scss";
import BaseElementSettings from "components/ui/SettingsContainer";

const Settings = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-clip">
      <div className={"center-container"}>
        <Header/>
        <Title text="Settings" className="site-title" size="md"></Title>
        <div className={"container-container"}>
          <BaseElementSettings width={"75vw"} height={"65vh"}/>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Settings;