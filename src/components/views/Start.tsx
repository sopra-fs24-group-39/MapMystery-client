import React from "react";
import Button from "components/ui/Button";
import "styles/views/Start.scss";
import "styles/index.scss";
import BaseContainer from "components/ui/BaseContainer";

const Start = () => {
  return (
    <BaseContainer>
      <div className={"start-container flex-center"}>
        <Button
          type={"lg"}
          name={"Create Game"}>
        </Button>
        <Button
          type={"lg"}
          name={"Gamemode Selection"}>
        </Button>
        <div className={"flex-row"}>
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
    </BaseContainer>
  );
};

export default Start;
