import React from "react";
import Button from "components/ui/Button";
import "styles/views/Start.scss";
import "styles/index.scss";
import BaseContainer from "components/ui/BaseContainer";

const Start = () => {
  return (
    <BaseContainer>
      <div className={"center-container"}>
        <div className={"start-buttons-container"}>
          <Button
            type={"lg"}
            name={"Play"}>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Start;
