import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import "../../styles/views/Rankings.scss";
import BaseElement from "components/ui/Container";

const Settings = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
        <Title text="Settings" className="site-title"></Title>
        <div className={"container-container"}>
          <BaseElement width={1000} height={670}/>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Settings;