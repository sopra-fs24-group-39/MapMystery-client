import React from "react";
import Button from "components/ui/Button";
import "styles/views/Start.scss";
import "styles/index.scss";
import BaseContainer from "components/ui/BaseContainer";

const Start = () => {
  return (
    <BaseContainer>
      <div className={"start-container flex-center"}>
        <div className={"start-buttons-container"}>
          <Button
            type={"lg"}
            name={"Create Game"}>
          </Button>
          <Button
            type={"lg"}
            name={"Gamemode Selection"}>
          </Button>
          <div className={"start-mpsp-select"}>
            <Button
              type={"md"}
              name={"Multiplayer"}>
            </Button>
            <Button
              type={"md"}
              name={"Singleplayer"}>
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Start;
