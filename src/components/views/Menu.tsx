import React from "react";
import Button from "components/ui/Button";
import "styles/views/Menu.scss";
import "styles/index.scss";
import BaseContainer from "components/ui/BaseContainer";

const Menu = () => {
  return (
      <BaseContainer>
          <div className={"center-container"}>
              <div className={"menu-buttons-container"}>
                  <Button
                      type={"regular"}
                      width={"lg"}
                      name={"Create Game"}>
                  </Button>
                  <Button
                      type={"regular"}
                      width={"lg"}
                      name={"Gamemode Selection"}>
                  </Button>
                  <div className={"menu-mpsp-select"}>
                      <Button
                          type={"regular"}
                          width={"md"}
                          name={"Multiplayer"}>
                      </Button>
                      <Button
                          type={"regular"}
                          width={"md"}
                          name={"Singleplayer"}>
                      </Button>
                  </div>
              </div>
          </div>
      </BaseContainer>
  );
};

export default Menu;
