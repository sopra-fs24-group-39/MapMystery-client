import React from "react";
import Button from "components/ui/Button";
import Header from "components/ui/Header";
import Logo from "components/pictures/Logo";
import BaseElement from "components/ui/Container";
import "styles/views/Start.scss";
import BaseContainer from "components/ui/BaseContainer";

const Start = () => {
  return (
    <BaseContainer className="main-body">
      <div className={"center-container"}>
        <Logo width="500px" height="500px" className="logo" />
        <Header text="Welcome"></Header>
        <div className={"container-container"}>
            <BaseElement width={1000} height={500}/>
        </div>
        <div className={"start-buttons-container"}>
          <Button
            type={"lg"}
            name={"Play"}>
          </Button>
        </div>
      </div>
    </BaseContainer>
>>>>>>> Stashed changes
  );
};

export default Start;
