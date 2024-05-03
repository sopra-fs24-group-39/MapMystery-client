import { React, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import Header from "./Header";
import Logo from "../pictures/Logo";
import BackgroundImage from "./sources/background.png";
import { api } from "helpers/api";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const CreatePrivateLobby = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [notactive, setNotActive] = useState(true);
  const callCreatePrivateLobby = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    const id = localStorage.getItem("userId");
    try {
      const requestBody = JSON.stringify({ id });
      const response = await api.post("/Lobby/private/GameMode1", requestBody, config);
      setCode(response.data.authKey);
      localStorage.setItem("authKey", response.data.authKey);
      localStorage.setItem("lobby", response.data.lobbyId);
    } catch (e) {
      setError(e.response.data.message);
    }
    setNotActive(false);
    navigate("/lobby");
  }

  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="400px" height="400px" className="logo" />
        <div className={"text-container-sm"}>
          <p>Create or join a private game!</p>
        </div>
        <div>
          <div className={"center-container"}>
            {notactive? <Button type={"regular"} name={"Get a code to share"} width={"lg"} onClick={callCreatePrivateLobby}></Button>:null}
          </div>
          <div className={"text-container"}>
            <p>Share this code with your Friends: {code}</p>
            {error && <p>error</p>}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

export default CreatePrivateLobby;