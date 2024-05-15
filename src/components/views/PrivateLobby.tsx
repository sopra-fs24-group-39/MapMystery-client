import { React } from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";
import BackgroundImage from "./sources/background.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const PrivateLobby = () => {
  const navigate = useNavigate();
  function handleCreatePrivateLobby () {
    navigate("/createPrivateLobby");
  }

  function handleJoinPrivateLobby() {
    navigate("/joinPrivateLobby");
  }

  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="40vh" height="40vh" className="logo" />
        <div className={"text-container-sm"}>
          <p>Create or join a private game!</p>
        </div>
        <div>
          <div onClick={handleCreatePrivateLobby}>
            <Button width={"lg"} name={"Create private lobby"} type={"regular"}></Button>
          </div>
          <div onClick={handleJoinPrivateLobby}
               className={"pt-4"}>
            <Button width={"lg"} name={"Join a private lobby"} type={"regular"}></Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

export default PrivateLobby;